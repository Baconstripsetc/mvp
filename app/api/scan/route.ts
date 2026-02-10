import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
interface ScanRequest {
  barcode?: string | null;
  imageBase64?: string | null;
}

interface ScanResponse {
  product_name: string;
  risk_level: "High" | "Moderate" | "Low";
  pros: string[];
  cons: string[];
  verdict_summary: string;
  safe_swap_category: string;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------
const OFF_TIMEOUT_MS = 3000;

const SYSTEM_PROMPT = `You are Sana, a pediatric nutrition auditor built to protect children.
Your job is to compare a product's ingredients against strict EU & WHO Safety Standards and flag anything harmful for children.

ALWAYS flag the following substances as dangerous:
- Red 40 (Allura Red AC, E129)
- Yellow 5 (Tartrazine, E102)
- Yellow 6 (Sunset Yellow, E110)
- BHT (Butylated Hydroxytoluene, E321)
- BHA (Butylated Hydroxyanisole, E320)
- Carrageenan (E407)
- High Fructose Corn Syrup (HFCS)
- Sodium Nitrite / Sodium Nitrate (E250/E251)
- Potassium Bromate
- Titanium Dioxide (E171)
- Artificial sweeteners (Aspartame E951, Acesulfame-K E950)
- Partially Hydrogenated Oils (Trans Fats)

Rules:
1. Be blunt. Parents need clarity, not diplomacy.
2. If the product is mostly synthetic additives, say so.
3. "pros" should list genuinely positive nutritional attributes (e.g. high fiber, good protein). If there are none, return an empty array.
4. "cons" should list every flagged ingredient or concern, each as a short sentence.
5. "verdict_summary" must be ONE blunt sentence a tired parent can read in 2 seconds.
6. "safe_swap_category" should suggest a healthier product category (e.g. "Organic popcorn", "Fresh fruit").
7. "risk_level" must be "High" if ANY banned substance is present, "Moderate" if borderline additives exist, "Low" only if clean.

You MUST respond with valid JSON matching this exact schema and nothing else:
{
  "product_name": "string",
  "risk_level": "High" | "Moderate" | "Low",
  "pros": ["string"],
  "cons": ["string"],
  "verdict_summary": "string",
  "safe_swap_category": "string"
}`;

// ---------------------------------------------------------------------------
// Step B: Open Food Facts lookup
// ---------------------------------------------------------------------------
async function fetchFromOpenFoodFacts(
  barcode: string
): Promise<{ productName: string | null; ingredientsText: string | null }> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), OFF_TIMEOUT_MS);

  try {
    const res = await fetch(
      `https://world.openfoodfacts.org/api/v2/product/${encodeURIComponent(barcode)}.json`,
      {
        headers: { "User-Agent": "SanaWeb/1.0" },
        signal: controller.signal,
      }
    );

    if (!res.ok) return { productName: null, ingredientsText: null };

    const data = await res.json();
    const product = data?.product;

    return {
      productName: product?.product_name || null,
      ingredientsText: product?.ingredients_text || null,
    };
  } catch {
    // Timeout or network error — fail silently per spec
    return { productName: null, ingredientsText: null };
  } finally {
    clearTimeout(timeout);
  }
}

// ---------------------------------------------------------------------------
// Step C + D: Gemini analysis
// ---------------------------------------------------------------------------
async function analyzeWithGemini(
  ingredientsText: string | null,
  productName: string | null,
  imageBase64: string | null
): Promise<ScanResponse> {
  const apiKey = process.env.GOOGLE_API_KEY;
  if (!apiKey) throw new Error("GOOGLE_API_KEY is not configured");

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    generationConfig: {
      responseMimeType: "application/json",
    },
  });

  // Build the prompt parts
  const parts: Array<{ text: string } | { inlineData: { mimeType: string; data: string } }> = [];

  parts.push({ text: SYSTEM_PROMPT });

  if (ingredientsText) {
    // Text-based analysis (from OFF or extracted)
    const userPrompt = productName
      ? `Analyze this product:\nProduct Name: ${productName}\nIngredients: ${ingredientsText}`
      : `Analyze these ingredients:\n${ingredientsText}`;
    parts.push({ text: userPrompt });
  } else if (imageBase64) {
    // Vision-based analysis — send the image directly
    parts.push({
      text: "Analyze the ingredients visible in this product image. Read all text on the label and assess every ingredient.",
    });

    // Strip data URI prefix if present (e.g. "data:image/jpeg;base64,...")
    const base64Data = imageBase64.includes(",")
      ? imageBase64.split(",")[1]
      : imageBase64;

    // Infer mime type from data URI or default to jpeg
    let mimeType = "image/jpeg";
    if (imageBase64.startsWith("data:")) {
      const match = imageBase64.match(/^data:(image\/\w+);/);
      if (match) mimeType = match[1];
    }

    parts.push({
      inlineData: {
        mimeType,
        data: base64Data,
      },
    });
  } else {
    throw new Error("No ingredients text or image provided to Gemini");
  }

  const result = await model.generateContent(parts);
  const response = result.response;
  const text = response.text();

  // Parse and validate the JSON response
  const parsed: ScanResponse = JSON.parse(text);

  // Ensure required fields exist with sensible defaults
  return {
    product_name: parsed.product_name || "Unknown Product",
    risk_level: (["High", "Moderate", "Low"].includes(parsed.risk_level)
      ? parsed.risk_level
      : "Moderate") as ScanResponse["risk_level"],
    pros: Array.isArray(parsed.pros) ? parsed.pros : [],
    cons: Array.isArray(parsed.cons) ? parsed.cons : [],
    verdict_summary: parsed.verdict_summary || "Could not determine a verdict.",
    safe_swap_category: parsed.safe_swap_category || "Whole foods",
  };
}

// ---------------------------------------------------------------------------
// Route handler
// ---------------------------------------------------------------------------
export async function POST(req: NextRequest) {
  try {
    const body: ScanRequest = await req.json();
    const { barcode, imageBase64 } = body;

    // Step A: Validate input
    if (!barcode && !imageBase64) {
      return NextResponse.json(
        { error: "Either 'barcode' or 'imageBase64' must be provided." },
        { status: 400 }
      );
    }

    let ingredientsText: string | null = null;
    let productName: string | null = null;

    // Step B: Open Food Facts lookup (barcode path)
    if (barcode) {
      const offResult = await fetchFromOpenFoodFacts(barcode);
      ingredientsText = offResult.ingredientsText;
      productName = offResult.productName;
    }

    // Step C + D: Gemini analysis
    // If OFF returned ingredients, use text mode. Otherwise fall back to image.
    const scanResult = await analyzeWithGemini(
      ingredientsText,
      productName,
      !ingredientsText ? (imageBase64 ?? null) : null
    );

    // Override product name from OFF if Gemini didn't get a good one
    if (productName && scanResult.product_name === "Unknown Product") {
      scanResult.product_name = productName;
    }

    return NextResponse.json(scanResult, { status: 200 });
  } catch (err) {
    console.error("[Sana Scan API] Error:", err);

    if (err instanceof SyntaxError) {
      return NextResponse.json(
        { error: "Invalid request body. Expected JSON." },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Scan failed. Please try again." },
      { status: 500 }
    );
  }
}

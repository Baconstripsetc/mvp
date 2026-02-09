import { NextRequest, NextResponse } from "next/server";

const WHOP_API_KEY = process.env.WHOP_API_KEY;
const WHOP_API_BASE = "https://api.whop.com/api/v5";

export async function POST(req: NextRequest) {
  try {
    const { email, userId } = await req.json();
    if (!email || !userId) {
      return NextResponse.json({ error: "Missing email or userId" }, { status: 400 });
    }
    if (!WHOP_API_KEY) {
      return NextResponse.json({ error: "Whop API key not configured" }, { status: 500 });
    }

    // Check if user has an active membership on Whop
    const res = await fetch(`${WHOP_API_BASE}/memberships?email=${encodeURIComponent(email)}&valid=true`, {
      headers: {
        Authorization: `Bearer ${WHOP_API_KEY}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      console.error("[Whop] API error:", res.status, await res.text());
      return NextResponse.json({ subscribed: false, error: "Whop API error" }, { status: 200 });
    }

    const data = await res.json();
    const memberships = data.data || [];
    const activeMembership = memberships.find(
      (m: { status: string }) => m.status === "active" || m.status === "trialing"
    );

    if (activeMembership) {
      return NextResponse.json({
        subscribed: true,
        plan: activeMembership.plan_id,
        status: activeMembership.status,
      });
    }

    return NextResponse.json({ subscribed: false });
  } catch (err) {
    console.error("[Whop] Verify error:", err);
    return NextResponse.json({ subscribed: false, error: "Internal error" }, { status: 200 });
  }
}

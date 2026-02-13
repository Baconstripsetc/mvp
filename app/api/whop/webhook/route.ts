import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase Admin Client
// note: requires SUPABASE_SERVICE_ROLE_KEY to bypass RLS policies
const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY || "",
    {
        auth: {
            autoRefreshToken: false,
            persistSession: false,
        },
    }
);

const WHOP_APP_ID = process.env.NEXT_PUBLIC_WHOP_APP_ID;

export async function POST(req: NextRequest) {
    try {
        if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
            console.error("[Whop Webhook] Missing SUPABASE_SERVICE_ROLE_KEY");
            return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
        }

        const payload = await req.json();
        const { action, data } = payload;

        console.log(`[Whop Webhook] Received action: ${action}`, data?.id);

        if (!action || !data) {
            return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
        }

        // Identify user email from payload
        // different events might have different structures, but generally matched by email
        const email = data.user?.email || data.email;

        if (!email) {
            console.warn("[Whop Webhook] No email found in payload", data);
            return NextResponse.json({ message: "No email key found, ignored" }, { status: 200 });
        }

        // Find user profile by email
        const { data: profile, error: fetchError } = await supabaseAdmin
            .from("profiles")
            .select("id")
            .eq("email", email)
            .single();

        if (fetchError || !profile) {
            console.warn(`[Whop Webhook] User not found for email: ${email}`);
            return NextResponse.json({ message: "User not found" }, { status: 200 }); // Return 200 to ack webhook
        }

        const userId = profile.id;

        // Handle Events
        switch (action) {
            case "membership.went_valid":
            case "payment.succeeded":
                await supabaseAdmin.from("profiles").update({
                    subscription_plan: data.plan_id || "active",
                    subscription_status: "active",
                }).eq("id", userId);
                console.log(`[Whop Webhook] Updated ${email} to active`);
                break;

            case "membership.went_invalid":
            case "subscription.canceled":
            case "payment.failed":
                await supabaseAdmin.from("profiles").update({
                    subscription_plan: "free",
                    subscription_status: "cancelled", // or 'past_due'
                }).eq("id", userId);
                console.log(`[Whop Webhook] Updated ${email} to free/cancelled`);
                break;

            default:
                console.log(`[Whop Webhook] Unhandled action: ${action}`);
        }

        return NextResponse.json({ success: true }, { status: 200 });
    } catch (err) {
        console.error("[Whop Webhook] Error processing request:", err);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

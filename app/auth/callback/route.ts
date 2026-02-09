import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase-server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");

  if (code) {
    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      // Redirect to home — the client-side SanaApp will detect
      // the session + pending localStorage data and save onboarding.
      return NextResponse.redirect(origin);
    }
  }

  // If code exchange failed, redirect home anyway
  return NextResponse.redirect(origin);
}

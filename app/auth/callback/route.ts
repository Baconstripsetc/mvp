import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase-server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");

  if (code) {
    // PKCE flow: exchange code for session (server-side)
    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(origin);
    }
  }

  // Implicit flow: tokens are in the URL hash (not visible to server)
  // Redirect to home — the client-side Supabase will detect tokens via detectSessionInUrl
  // We redirect to /?auth=callback so the client knows this is a callback
  return NextResponse.redirect(`${origin}?auth=callback`);
}

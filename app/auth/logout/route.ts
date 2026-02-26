
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const requestUrl = new URL(request.url);
    const cookieStore = await cookies();

    // 1. Clear Supabase session
    const supabase = await createClient();
    if (supabase) {
        await supabase.auth.signOut();
    }

    // 2. Clear demo session cookie
    cookieStore.delete("demo_session");

    return NextResponse.redirect(`${requestUrl.origin}/login`);
}

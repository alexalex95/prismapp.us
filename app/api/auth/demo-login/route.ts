
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const body = await request.json();
    const { username, password } = body;

    // Hardcoded check for demo user
    if (username === "alex95" && password === "12345") {
        const cookieStore = await cookies();

        // Set a "demo_session" cookie
        // This will be read by middleware to bypass Supabase check
        cookieStore.set("demo_session", "true", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24 * 7, // 1 week
            path: "/",
        });

        return NextResponse.json({ success: true });
    }

    return NextResponse.json({ success: false, error: "Invalid credentials" }, { status: 401 });
}

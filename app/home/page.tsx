import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import HomeHeader from "@/components/home-header";
import HomeGrid from "@/components/home-grid";
import Nav from "@/components/nav";
import { demoProfiles } from "@/lib/demo-data";

export default async function HomePage() {
  const cookieStore = await cookies();
  const isDemoSession = cookieStore.get("demo_session")?.value === "true";

  if (!isDemoSession) {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) redirect("/login");
  }

  // For demo sessions or when Supabase tables don't exist, use demo data
  let profiles = demoProfiles;

  if (!isDemoSession) {
    try {
      const supabase = await createClient();
      const { data: realProfiles } = await supabase
        .from("mini_profiles")
        .select("id, display_name, role, intent, age, looking_now, active")
        .eq("active", true)
        .order("looking_now", { ascending: false })
        .order("created_at", { ascending: false });

      if (realProfiles && realProfiles.length > 0) {
        profiles = realProfiles.map((p) => ({
          ...p,
          photo_url: "",
          photos: [],
          bio: "",
          distance: "",
          height: 0,
          weight: 0,
        }));
      }
    } catch {
      // Supabase tables may not exist yet
    }
  }

  return (
    <div className="min-h-screen pb-20 bg-base">
      <HomeHeader />
      <HomeGrid allProfiles={profiles} />
      <Nav />
    </div>
  );
}

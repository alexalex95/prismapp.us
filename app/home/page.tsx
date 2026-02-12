import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import HomeHeader from "@/components/home-header";
import HomeGrid from "@/components/home-grid";
import Nav from "@/components/nav";
import { demoProfiles } from "@/lib/demo-data";

export default async function HomePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  // Try real profiles first
  const { data: realProfiles } = await supabase
    .from("mini_profiles")
    .select("id, display_name, role, intent, age, looking_now, active")
    .eq("active", true)
    .order("looking_now", { ascending: false })
    .order("created_at", { ascending: false });

  const profiles =
    realProfiles && realProfiles.length > 0
      ? realProfiles.map((p) => ({ ...p, photo_url: undefined }))
      : demoProfiles;

  return (
    <div className="min-h-screen pb-20 bg-base">
      <HomeHeader />
      <HomeGrid allProfiles={profiles} />
      <Nav />
    </div>
  );
}

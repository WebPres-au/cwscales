import { getNavItems } from "@/app/supabase-server";
import Navbar from "./Navbar";

export default async function Navigation() {
  const navigation = await getNavItems(true);

  console.log("navigation", navigation);

  return (
    <Navbar navigation={navigation} />
  );
}

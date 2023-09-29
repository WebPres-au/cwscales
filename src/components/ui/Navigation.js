import { getNavItems } from "@/app/supabase-server";
import Navbar from "./Navbar";

export default async function Navigation() {
  const navigation = await getNavItems();

  return (
    <Navbar navigation={navigation} />
  );
}

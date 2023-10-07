import { getServerCategories, getSession } from "@/app/supabase-server";
import Body from "./body";
import { snake_case_string } from "@/lib/functions";
import { redirect } from "next/navigation";

export default async function DashboardLayout({ children }) {
  
  const session = await getSession();

  if (!session) {
    return redirect("/auth/login");
  }

  let navigation = [{ name: "All", href: "/dashboard/" }];

  const categories = await getServerCategories(true);

  navigation.push(
    ...categories.map((category) => {
      return {
        name: category.name,
        href: `/dashboard?category=${snake_case_string(category.name)}`,
      };
    })
  );

  return <Body navigation={navigation}>{children}</Body>;
}

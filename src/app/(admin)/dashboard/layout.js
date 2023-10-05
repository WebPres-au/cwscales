import { getServerCategories } from "@/app/supabase-server";
import Body from "./body";
import { snake_case_string } from "@/lib/functions";

export default async function DashboardLayout({ children }) {
  let navigation = [{ name: "All", href: "/dashboard/" }];

  const categories = await getServerCategories(true);

  navigation.push(
    ...categories.map((category) => {
      return {
        name: category.name,
        href: `/dashboard/${snake_case_string(category.name)}`,
      };
    })
  );

  return <Body navigation={navigation}>{children}</Body>;
}

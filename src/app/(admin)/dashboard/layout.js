import { getNavItems } from "@/app/supabase-server";
import { requireAdmin } from "@/lib/supabase/auth";
import Body from "./body";
import { snake_case_string } from "@/lib/functions";

export default async function DashboardLayout({ children }) {
  await requireAdmin({ redirectTo: "/auth/login" });

  let navigation = [{ name: "All", href: "/dashboard/" }];

  const { categories = [], pages = [] } = (await getNavItems(false)) || {};

  navigation.push(
    ...categories.map((category) => {
      const subcategories = [
        ...(category.featured || []),
        ...(category.subcategories || []),
      ]
        .filter((subcategory) => subcategory?.name !== "Browse All")
        .map(({ name }) => ({ name }));

      return {
        name: category.name,
        href: `/dashboard?category=${snake_case_string(category.name)}`,
        subcategories,
      };
    })
  );

  navigation.push(
    ...pages.map((page) => {
      return {
        name: page.name,
        href: `/dashboard?category=${snake_case_string(page.name)}`,
      };
    })
  );

  return <Body navigation={navigation}>{children}</Body>;
}

import { getNavItems, getSession } from "@/app/supabase-server";
import Body from "./body";
import { snake_case_string } from "@/lib/functions";
import { redirect } from "next/navigation";

export default async function DashboardLayout({ children }) {
  
  const session = await getSession();

  if (!session) {
    return redirect("/auth/login");
  }

  let navigation = [{ name: "All", href: "/dashboard/" }];

  const {categories, pages} = await getNavItems(false);

  navigation.push(
    ...categories.map((category) => {
      category.subcategories = category.subcategories.map((subcategory) => {
        delete subcategory.href;
        delete subcategory.imageSrc;
        delete subcategory.imageAlt;
        if(subcategory.name != "Browse All")return subcategory;
      }
      );
      delete category.featured;
      delete category.href;
      return {
        ...category,
        name: category.name,
        href: `/dashboard?category=${snake_case_string(category.name)}`,
      };
    })
  );

  navigation.push(
    ...pages.map((page) => {
      delete page.href;
      return {
        ...page,
        name: page.name,
        href: `/dashboard?category=${snake_case_string(page.name)}`,
      };
    })
  );

  return <Body navigation={navigation}>{children}</Body>;
}

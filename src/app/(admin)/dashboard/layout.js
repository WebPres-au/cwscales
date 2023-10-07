import { getNavItems, getServerCategories, getSession } from "@/app/supabase-server";
import Body from "./body";
import { snake_case_string } from "@/lib/functions";
import { redirect } from "next/navigation";

export default async function DashboardLayout({ children }) {
  
  const session = await getSession();

  if (!session) {
    return redirect("/auth/login");
  }

  let navigation = [{ name: "All", href: "/dashboard/" }];

  const {categories} = await getNavItems();

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

  return <Body navigation={navigation}>{children}</Body>;
}

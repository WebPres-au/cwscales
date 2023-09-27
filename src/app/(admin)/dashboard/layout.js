
import { getServerCategories } from "@/app/supabase-server";
import Body from "./body";
import { snake_case_string } from "@/lib/functions";

// const navigation = [
//   { name: "All", href: "/dashboard/", current: true },
//   {
//     name: "Scales",
//     href: "/dashboard/weighing-scales",
//     current: false,
//   },
//   {
//     name: "Packaging",
//     href: "/dashboard/packaging-equipment",
//     current: false,
//   },
//   { name: "Printers", href: "/dashboard/", current: false },
//   { name: "Loadcells", href: "/dashboard/", current: false },
//   { name: "Accessories", href: "/dashboard/", current: false },
// ];

export default async function DashboardLayout({ children }) {

  let navigation = [{ name: "All", href: "/dashboard/"}]

  const categories = await getServerCategories();

  navigation.push(...categories.map((category) => {return {name: category.name, href: `/dashboard/${snake_case_string(category.name)}`}}));

  return (
    <Body navigation={navigation}>
      {children}
    </Body>
  );
}

import { getFilteredProducts, getServerCategories } from "@/app/supabase-server";
import ContentHero from "@/components/ContentHero";

const sections = [
  {
    name: "Counting Scales",
    href: "#",
    image: "/categories/range/counting-scales.jpeg",
  },
  {
    name: "Crane Scales",
    href: "#",
    image: "/categories/range/crane-scales.jpeg",
  },
  {
    name: "Digital Table Scales",
    href: "#",
    image: "/categories/range/table-scales.jpeg",
  },
  {
    name: "Electronic Weighing Indicators",
    href: "#",
    image: "/categories/range/indicators.jpeg",
  },
  {
    name: "Floor Scales/Pallet Scales",
    href: "#",
    image: "/categories/range/floor-scales.jpeg",
  },
  {
    name: "Food/Portion Scales",
    href: "#",
    image: "/categories/range/portion-scales.jpeg",
  },
  {
    name: "Freight/Parcel Scales",
    href: "#",
    image: "/categories/range/freight-scales.jpeg",
  },
  // { name: "Household Scales", href: "#", image: "" },
  // { name: "Kitchen Scales/Bathroom Scales", href: "#", image: "" },
  {
    name: "Laboratory Scales",
    href: "#",
    image: "/categories/range/lab-scales.jpeg",
  },
  {
    name: "Medical/Personal Weighing Scales",
    href: "#",
    image: "/categories/range/med-scales.jpeg",
  },
  {
    name: "Money Scales/Coin Sorters",
    href: "#",
    image: "/categories/range/money-scales.jpeg",
  },
  {
    name: "Platform Scales",
    href: "#",
    image: "/categories/range/platform-scales.jpeg",
  },
  {
    name: "Retail Scales/Labelling Scales",
    href: "#",
    image: "/categories/range/trade-scales.jpeg",
  },
  {
    name: "Vet/Animal Scales",
    href: "#",
    image: "/categories/range/animal-scales.jpeg",
  },
  {
    name: "Trade Approved Scales",
    href: "#",
    image: "/categories/range/trade-scales.jpeg",
  },
];

export default async function CategoryPage({ params }) {
  const categories = await getServerCategories();

  const category = categories.find(category => category.snake_case_name === params.category)
  // const title = "Our Range";
  let products = await getFilteredProducts(params.category);
  products = products.map(product => { return {...product, image: product?.images[0]?.signedUrl, href:'#'}})

  return (
    <div>
      <ContentHero
        category={category}
        content={products}
      />
      <div className="mt-32" />
    </div>
  );
}

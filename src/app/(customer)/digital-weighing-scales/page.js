import {
  getCategory,
  getCategoryWithSubcategories,
  getProductsFromCategory,
} from "@/app/supabase-server";
import ContentHero from "@/components/ContentHero";

export async function generateMetadata() {
  const category = await getCategory("digital-weighing-scales");

  return {
    title: category.name,
    description: category.description,
    openGraph: {
      title: category.name,
      description: category.description,
      images: [
        {
          url: category.image,
          width: 500,
          height: 500,
          alt: category.name,
        },
      ],
    },
  };
}

export default async function CategoryPage() {
  const data = await getCategoryWithSubcategories("digital-weighing-scales");

  let category = { ...data };
  delete category.subcategories;

  let subCategories = data.subcategories;
  const isParent = subCategories.length > 0 ? true : false;

  let products;

  if (isParent) {
    products = [];
  } else {
    products = await getProductsFromCategory("digital-weighing-scales");
  }

  return (
    <div>
      <PageHeader />
      <ContentHero
        category={category}
        content={isParent ? subCategories : products}
        type={isParent ? "Subcategory" : "Product"}
      />
      <div className="mt-32" />
    </div>
  );
}

function PageHeader() {
  return (
    <div className="bg-white px-6 pt-44 mt-16 lg:px-8">
      <div className="mx-auto max-w-4xl text-left sm:text-center space-y-6">
        <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          WEIGHING SCALES PRODUCT RANGE
        </h2>
        <p className="text-lg leading-8 text-gray-600">
          Correct Weight Scales offer a wide range of Digital Weighing Scales to
          suit all Capacities, Sizes and Budgets.
        </p>
        <p className="text-lg leading-8 text-gray-600">
          CWScales extensive line of weighing solutions and measurement systems
          can be found anywhere.
        </p>
        <ul className="list-disc list-inside text-left text-lg leading-8 text-gray-600 space-y-2">
          <li>
            Industrial: (Factories, Manufacturing Sites, Chemical Industry, )
          </li>
          <li>Medical: (Hospitals, Gyms, Clinics, Maternal Centers)</li>
          <li>
            Retail: (Shops, Market Stalls, Butchers, Bakers, Supermarkets,
            Seafood Shops)
          </li>
          <li>
            Food Processing: (Meat Processing Plants, Fish Processing Plants,
            Bakery and Bread Making Factories)
          </li>
          <li>
            Logistics: (Freight Forwarding Companies, Airport Operations,
            Packing Warehouses) just to name a few
          </li>
        </ul>
        <p className="text-lg leading-8 text-gray-600">
          Whatever the need, and wherever the installation CWScales products can
          provide the correct weighing solution.
        </p>
        <p className="text-lg leading-8 text-gray-600">
          We also offer a full Customisation Service for any Weighing
          Application so if you need a specific Size, Shape or Capacity We can
          help!! Please discuss your specific Requirements with us
        </p>
        <p className="py-4 uppercase font-semibold text-white text-center bg-green/90 hover:bg-green/60 rounded-md w-2/3 mx-auto">
          See our range below
        </p>
      </div>
    </div>
  );
}

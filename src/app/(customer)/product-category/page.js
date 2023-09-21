import Categories from "@/components/Categories";

export default function ProductCategoryPage() {
  return (
    <>
      <div className="mt-32">
        <PageHeader
          title="Product Categories"
          description="Categories that can help you find what you're looking for"
        />
      </div>
      <Categories />
    </>
  );
}

function PageHeader({ title, description }) {
  return (
    <div className="bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          {title}
        </h2>
        <p className="mt-6 text-lg leading-8 text-gray-600">{description}</p>
      </div>
    </div>
  );
}

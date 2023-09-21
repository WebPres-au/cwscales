export default function PageHeader({ title, description }) {
  return (
    <div className="bg-white px-6 py-24 sm:py-32 mt-32 lg:px-8">
      <div className="mx-auto max-w-6xl text-center">
        <h1 className="mt-2 text-4xl font-extralight tracking-tight text-gray-900 sm:text-6xl">
          {title}
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-600">{description}</p>
      </div>
    </div>
  );
}

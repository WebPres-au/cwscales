"use client";

const images = [
  {
    image: "/banner/bakery.jpg",
    name: "Bakery",
    description: "Products to help measure to your exact measurements",
    href: "/bakery",
  },
  {
    image: "/banner/meat.jpeg",
    name: "Meat",
    description: "High-quality cuts of meat",
    href: "/meat",
  },
  {
    image: "/banner/medical.jpg",
    name: "Medical",
    description: "Healthcare products and services",
    href: "/medical",
  },
  {
    image: "/banner/mounting.jpeg",
    name: "Mounting",
    description: "Sturdy and reliable mounting solutions",
    href: "/mounting",
  },
  {
    image: "/banner/multihead.jpeg",
    name: "Multihead",
    description: "Advanced multihead technology",
    href: "/multihead",
  },
  {
    image: "/banner/retail.jpeg",
    name: "Retail",
    description: "The latest trends in retail",
    href: "/retail",
  },
];

export default function Hero() {
  return (
    <div className="relative bg-gray-900 mt-32">
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
        <img
          src={images[0].image}
          alt={images[0].description}
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gray-900 opacity-10"
      />

      <div className="relative mx-auto flex max-w-3xl flex-col items-center px-6 py-32 text-center sm:py-64 lg:px-0">
        <h1 className="text-4xl font-bold tracking-tight text-white lg:text-6xl">
          {`Shop ${images[0].name} Products`}
        </h1>
        <p className="mt-4 text-xl text-white">{images[0].description}</p>
        <a
          href={images[0].href}
          className="mt-8 inline-block rounded-md border border-transparent bg-white px-8 py-3 text-base font-medium text-gray-900 hover:bg-gray-100"
        >
          {`Shop ${images[0].name}`}
        </a>
      </div>
    </div>
  );
}

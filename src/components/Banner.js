"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const images = [
  {
    image: "/banner/bakery.jpg",
    name: "Bakery",
    description: "Products to help measure to your exact measurements",
    href: "/product-category/digital-weighing-scales/food-portion-scales/",
  },
  {
    image: "/banner/meat.jpeg",
    name: "Meat",
    description: "High-quality cuts of meat",
    href: "/product-category/digital-weighing-scales/food-portion-scales",
  },
  {
    image: "/banner/medical.jpg",
    name: "Medical",
    description: "Healthcare products and services",
    href: "/product-category/digital-weighing-scales/medical-personal-weighing-scales",
  },
  {
    image: "/banner/mounting.jpeg",
    name: "Mounting",
    description: "Sturdy and reliable mounting solutions",
    href: "/product-category/digital-weighing-scales/loadcells-accesories",
  },
  {
    image: "/banner/multihead.jpeg",
    name: "Multihead",
    description: "Advanced multihead technology",
    href: "/product-category/digital-weighing-scales/packaging-equipment/multihead-weighers",
  },
  {
    image: "/banner/warehouse.jpeg",
    name: "Warehouse",
    description: "Scales and equipment to help in the warehouse",
    href: "product-category/floor-scales-pallet-scales",
  },
  {
    image: "/banner/retail.jpeg",
    name: "Retail",
    description: "The latest trends in retail",
    href: "/product-category/digital-weighing-scales/retail-scales-labelling-scales",
  },
];

export default function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const currentImage = images[currentImageIndex];

  return (
    <div className="relative bg-gray-900 mt-32">
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
        <Image
          src={currentImage.image}
          alt={currentImage.description}
          className="h-full w-full object-cover object-center"
          fill={true}
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gray-900 opacity-40"
      />

      <div className="relative mx-auto flex max-w-3xl flex-col items-center px-6 py-32 text-center sm:py-64 lg:px-0">
        <h1 className="text-4xl font-bold tracking-tight text-white lg:text-6xl">
          {`${currentImage.name} Products`}
        </h1>
        <p className="mt-4 text-xl text-white">{currentImage.description}</p>
        <a
          href={currentImage.href}
          className="mt-8 inline-block rounded-md border border-transparent bg-green px-8 py-3 text-base font-medium text-gray-900 hover:bg-green/80"
        >
          {`${currentImage.name} Range`}
        </a>
      </div>
    </div>
  );
}

"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const images = [
  {
    image: "/banner/bakery.jpg",
    name: "Bakery",
    href: "/product-category/digital-weighing-scales/food-portion-scales/",
  },
  {
    image: "/banner/meat.jpeg",
    name: "Meat",
    href: "/product-category/digital-weighing-scales/food-portion-scales",
  },
  {
    image: "/banner/medical.jpg",
    name: "Medical",
    href: "/product-category/digital-weighing-scales/medical-personal-weighing-scales",
  },
  {
    image: "/banner/mounting.jpeg",
    name: "Mounting",
    href: "/product-category/digital-weighing-scales/loadcells-accesories",
  },
  {
    image: "/banner/multihead.jpeg",
    name: "Multihead",
    href: "/product-category/digital-weighing-scales/packaging-equipment/multihead-weighers",
  },
  {
    image: "/banner/warehouse.jpeg",
    name: "Warehouse",
    href: "product-category/floor-scales-pallet-scales",
  },
  {
    image: "/banner/retail.jpeg",
    name: "Retail",
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
    <div className="relative bg-gray-900 mt-28">
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
          {`${currentImage.name} Weighing`}
        </h1>
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

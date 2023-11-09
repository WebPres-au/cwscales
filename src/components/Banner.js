"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const images = [
  {
    image: "/banner/bakery.jpg",
    name: "Bakery Manufacturing Weighing",
    href: "/product-category/digital-weighing-scales/food-portion-scales/",
  },
  {
    image: "/banner/meat.jpeg",
    name: "Food Manufacturing Weighing",
    href: "/product-category/digital-weighing-scales/food-portion-scales",
  },
  {
    image: "/banner/medical.jpg",
    name: "Medical and Healthcare Weighing",
    href: "/product-category/digital-weighing-scales/medical-personal-weighing-scales",
  },
  {
    image: "/banner/mounting.jpeg",
    name: "Loadcells & Accesories",
    href: "/product-category/digital-weighing-scales/loadcells-accesories",
  },
  {
    image: "/banner/multihead.jpeg",
    name: "Packaging and Food Processing",
    href: "/product-category/digital-weighing-scales/packaging-equipment/multihead-weighers",
  },
  {
    image: "/banner/warehouse.jpeg",
    name: "Warehouse and Logistics Weighing",
    href: "product-category/floor-scales-pallet-scales",
  },
  {
    image: "/banner/retail.jpeg",
    name: "Retail Weighing",
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
    <div className="relative bg-gray-900 mt-32" style={{ height: "70vh" }}>
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
        <Image
          src={currentImage.image}
          alt={currentImage.name}
          className="h-full w-full object-cover object-center"
          fill={true}
          priority
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gray-900 opacity-40"
      />

      <div className="relative mx-auto flex max-w-3xl flex-col items-center px-6 py-32 text-center sm:py-64 lg:px-0">
        <h1 className="text-4xl font-bold tracking-tight text-white lg:text-6xl">
          {currentImage.name}
        </h1>
        <motion.a
          href={currentImage.href}
          className="mt-8 inline-block rounded-md border border-transparent bg-green px-8 py-3 text-base text-white font-semibold hover:bg-green/80"
          whileHover={{
            scale: 1.15,
          }}
        >
          View Range
        </motion.a>
      </div>
    </div>
  );
}

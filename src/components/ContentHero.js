"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import ProductInfo from "./ProductInfo";
// import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"

export default function ContentHero({ category, content }) {
  const [columnCount, setColumnCount] = useState(2);

  useEffect(() => {
    const updateColumnCount = () => {
      setColumnCount(window.innerWidth <= 768 ? 1 : 2);
    };

    window.addEventListener("resize", updateColumnCount);
    updateColumnCount();

    return () => window.removeEventListener("resize", updateColumnCount);
  }, []);

  if (!category) return <div>loading...</div>;
  return (
    <>
      <div className="relative mt-32 -mb-32">
        <div className="relative lg:sticky w-full lg:w-1/2 h-screen inset-0">
          <div className="absolute bottom-0 left-0 p-20 z-10 text-white">
            <h1 className="capitalize text-3xl sm:text-6xl md:text-8xl">
              {category.name}
            </h1>
            <p className="pt-4">{category.description}</p>
            <button className="px-4 py-2 bg-blue-400 rounded-md mt-2">
              Enquire now
            </button>
          </div>
          <Image
            src="https://images.unsplash.com/photo-1586671267731-da2cf3ceeb80?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=935&q=80"
            className="object-cover opacity-90 w-full h-full"
            alt=""
            fill={true}
            sizes="(max-width: 600px) 100vw, 600px"
          />
        </div>
        <div className="w-full lg:w-1/2 min-h-screen h-full inset-0 ml-auto sm:mt-[0vh] lg:mt-[-100vh]">
          <div
            style={{
              columnCount: columnCount,
              columnGap: "0px",
            }}
          >
            {content.map((item, index) => (
              <div
                key={index}
                style={{ breakInside: "avoid", padding: 0, margin: 0 }}
              >
                <div className="h-full w-full group hover:border hover:border-gray-400 border border-white delay-75">
                  {item.image && (
                    <Image
                      className="h-auto w-full object-cover"
                      width={400}
                      height={400}
                      src={item.image}
                      alt={item.name}
                      style={{ padding: 0, margin: 0 }}
                    />
                  )}
                  <ProductInfo
                    categoryName={category.name}
                    product={item}
                    style={{ padding: 0, margin: 0 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

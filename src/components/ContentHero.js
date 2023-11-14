"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import ProductInfo from "./ProductInfo";
import Link from "next/link";

export default function ContentHero({
  category,
  content,
  type = "Product",
  isOne = false,
}) {
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

  if (isOne)
    return (
      <>
        <div className="relative mt-44 -mb-32">
          <div className="relative lg:sticky w-full lg:w-1/2 h-screen inset-0 bg-black grid grid-rows-4">
            <div className="row-span-3 relative w-full h-full">
              <Image
                src={category.image || "/placeholder.jpeg"}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/placeholder.jpeg";
                }}
                className="object-cover opacity-50 w-full h-full"
                alt=""
                fill={true}
                sizes="(max-width: 600px) 100vw, 600px"
              />
            </div>
            <div className="p-2 z-10 text-black bg-green row-span-1">
              <h1 className="capitalize text-xl text-white font-semibold sm:text-2xl md:text-4xl line-clamp-6 pb-1">
                {category.name}
              </h1>
              <p className="pt-4 text-white">{category.short_description}</p>
              <a href="#contact">
                <button className="px-4 py-2 bg-white hover:bg-black/60 text-black hover:text-white rounded-md mt-4">
                  Enquire now
                </button>
              </a>
            </div>
          </div>
          <div className="w-full lg:w-1/2 min-h-screen h-full inset-0 ml-auto sm:mt-[0vh] lg:mt-[-100vh]">
            <ProductInfo
              categoryName={category.name}
              product={content[0]}
              style={{ padding: 0, margin: 0 }}
              type={type}
              isOne={isOne}
            />
            <h3 className="product-images-heading">Product Images</h3>
            <div
              style={{
                columnCount: columnCount,
                columnGap: "0px",
              }}
            >
              {content.map((item, index) => (
                <div className="h-full w-full group" key={index}>
                  {item.image.length > 0 &&
                    item.images.map((image, index) => (
                      <Image
                        key={index}
                        className="h-auto w-full object-cover border border-white hover:border-gray-400 delay-75"
                        width={400}
                        height={400}
                        src={image.signedUrl}
                        alt={item.name}
                        style={{ padding: 0, margin: 0 }}
                      />
                    ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </>
    );

  return (
    <>
      <div className="relative mt-44 -mb-32">
        <div className="relative lg:sticky w-full lg:w-1/2 h-screen inset-0 bg-black grid grid-rows-4">
          <div className="row-span-3 relative w-full h-full">
            <Image
              src={category.image || "/placeholder.jpeg"}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/placeholder.jpeg";
              }}
              className="object-cover opacity-50 w-full h-full"
              alt=""
              fill={true}
              sizes="(max-width: 600px) 100vw, 600px"
            />
          </div>
          <div className="p-2 z-10 text-black bg-green row-span-1">
            <h1 className="capitalize text-xl text-white font-semibold sm:text-4xl md:text-5xl line-clamp-6 pb-1">
              {category.name}
            </h1>
            <p className="pt-4 text-white">{category.description}</p>
            <a href="#contact">
              <button className="px-4 py-2 bg-white hover:bg-black/60 text-black hover:text-white rounded-md mt-4">
                Enquire now
              </button>
            </a>
          </div>
        </div>
        <div className="w-full lg:w-1/2 min-h-screen h-full inset-0 ml-auto sm:mt-[0vh] lg:mt-[-100vh]">
          <div
            style={{
              columnCount: columnCount,
              columnGap: "0px",
            }}
          >
            {content.map((item, index) => (
              <Link href={item.href} key={index}>
                <div
                  style={{ breakInside: "avoid", padding: 0, margin: 0 }}
                  className="cursor-pointer"
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
                      type={type}
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

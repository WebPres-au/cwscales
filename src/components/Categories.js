import Image from "next/image";
import Link from "next/link";

const categories = [
  {
    title: "Digital Weighing Scales",
    href: "/product-category/digital-weighing-scales",
    description: "Image of a digital weighing scale",
    imageUrl: "/categories/digiscales.jpg",
  },
  {
    title: "Packaging Equipment",
    href: "/product-category/packaging-equipment",
    description: "Image of a multihead packing machine",
    imageUrl: "/categories/multisetup.jpg",
  },
  {
    title: "Label Printers & Consumables",
    href: "/product-category/label-receipt-printers-consumables",
    description: "Image of a label printer",
    imageUrl: "/categories/printer.png",
  },
  {
    title: "Loadcell & Accessories",
    href: "/product-category/loadcells-accesories",
    description: "Image of a loadcell",
    imageUrl: "/categories/loadcell.png",
  },
  {
    title: "Service Repairs & Calibration",
    href: "/service-repairs-calibration/",
    description: "Image of car that we use to do services and repairs",
    imageUrl: "/categories/servicing.png",
  },
];

export default function Categories() {
  return (
    <div className="bg-white mt-24">
      <div className="mx-auto max-w-full">
        <div className="grid auto-rows-fr grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-5">
          {categories.map((item, index) => (
            <article
              key={index}
              className={`relative isolate flex flex-col justify-end overflow-hidden bg-white px-8 pb-8 pt-48 ${
                index === 0 ? "col-span-2 lg:col-span-1" : ""
              } zoom-article`}
            >
              <Image
                src={item.imageUrl}
                alt={item.description}
                className="zoom-image absolute inset-0 -z-10"
                fill={true}
              />
              <div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/10" />

              <h3 className="mt-3 text-lg font-semibold leading-6 text-center text-white">
                <Link href={item.href}>
                  <span className="absolute inset-0" />
                  {item.title}
                </Link>
              </h3>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

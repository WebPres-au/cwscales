import Image from "next/image";

const posts = [
  {
    title: "Digital Weighing Scales",
    href: "/weighing-scales",
    description: "Image of a digital weighing scale",
    imageUrl: "/categories/digiscales.jpeg",
  },
  {
    title: "Packing Equipment",
    href: "#",
    description: "Image of a multihead packing machine",
    imageUrl: "/categories/multihead.jpeg",
  },
  {
    title: "Label Printers & Consumables",
    href: "#",
    description: "Image of a label printer",
    imageUrl: "/categories/printers.jpeg",
  },
  {
    title: "Loadcell & Accessories",
    href: "#",
    description: "Image of a loadcell",
    imageUrl: "/categories/loadcell.png",
  },
  {
    title: "Service Repairs & Calibration",
    href: "#",
    description: "Image of car that we use to do services and repairs",
    imageUrl: "/categories/servicing.jpeg",
  },
];
export default function Categories() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-full">
        <div className="mx-auto grid max-w-full auto-rows-fr grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-5">
          {posts.map((post, index) => (
            <article
              key={index}
              className={`relative isolate flex flex-col justify-end overflow-hidden bg-gray-900 px-8 pb-8 pt-80 sm:pt-48 lg:pt-80 ${
                index === 0 ? "col-span-2 lg:col-span-1" : ""
              }`}
            >
              <Image
                src={post.imageUrl}
                alt={post.description}
                className="absolute inset-0 -z-10 h-full w-full object-cover"
                fill={true}
              />
              <div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/10" />

              <h3 className="mt-3 text-lg font-semibold leading-6 text-center text-white">
                <a href={post.href}>
                  <span className="absolute inset-0" />
                  {post.title}
                </a>
              </h3>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

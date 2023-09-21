import Image from "next/image";
import ProductInfo from "./ProductInfo";

export default function ContentHero({ title, description, content }) {
  return (
    <>
      <div className="relative mt-32 -mb-32">
        <div className="relative lg:sticky w-full lg:w-1/2 h-screen inset-0">
          <div className="absolute bottom-0 left-0 p-20 z-10 text-white">
            <h1 className="capitalize text-3xl sm:text-6xl md:text-8xl">
              {title}
            </h1>
            <p className="pt-4">{description}</p>
            <button className="px-4 py-2 bg-blue-400 rounded-md mt-2">
              Enquire now
            </button>
          </div>
          <Image
            src="https://images.unsplash.com/photo-1586671267731-da2cf3ceeb80?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=935&q=80"
            className="object-cover opacity-90 w-full h-full"
            alt=""
            fill={true}
          />
        </div>
        <div className="w-full lg:w-1/2 h-full inset-0 ml-auto sm:mt-[0vh] lg:mt-[-100vh]">
          <div className="w-full grid grid-cols-1 gap-0 pt-0 custom-grid-cols-2 inset-0">
            {content.map((item, index) => {
              if (index % 3 === 0) {
                return (
                  <div key={index} className="grid gap-0 ">
                    <div className="h-full w-full group hover:border hover:border-gray-400 border border-white delay-75">
                      <Image
                        className="h-auto w-full object-cover"
                        width={400}
                        height={400}
                        src={item.image}
                        alt={item.name}
                      />
                      <ProductInfo />
                    </div>
                  </div>
                );
              } else {
                return (
                  <>
                    <div
                      key={index}
                      className="h-full w-full group hover:border hover:border-gray-400 border border-white delay-75"
                    >
                      <Image
                        className="h-auto w-full object-cover"
                        width={400}
                        height={400}
                        src={item.image}
                        alt={item.name}
                      />
                      <ProductInfo />
                    </div>
                  </>
                );
              }
            })}
          </div>
        </div>
      </div>
    </>
  );
}

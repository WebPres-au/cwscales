import { ArrowRightIcon } from "@heroicons/react/24/outline";

export default function Hero() {
  return (
    <div className="relative sm:pt-[110px]">
      <div className="relative lg:fixed w-full lg:w-1/2 h-screen inset-0">
        <div className="absolute bottom-0 left-0 p-20 z-10 text-white">
          <h1 className="text-8xl">Digital Scales</h1>
          <p className="pt-4">
            We offer a range of NMI Trade Approved industrial and commercial
            scales to standardise manufacturing and ensure product consistency
            for your business.
          </p>
          <button className="px-4 py-2 bg-blue-400 rounded-md mt-2">
            Enquire now
          </button>
        </div>
        <img
          src="https://images.unsplash.com/photo-1586671267731-da2cf3ceeb80?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=935&q=80"
          className="object-cover opacity-90 w-full h-full"
        />
      </div>
      <div className="w-full lg:w-1/2 h-full inset-0 ml-auto">
        <div className="w-full grid grid-cols-1 pt-0 xl:grid-cols-2 inset-0">
          <div className="grid">
            <div>
              <img
                className="h-auto w-full hover:opacity-60"
                src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image.jpg"
                alt=""
              />
            </div>
            <div>
              <img
                className="h-auto w-full hover:opacity-60"
                src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-1.jpg"
                alt=""
              />
            </div>
            <div>
              <img
                className="h-auto w-full hover:opacity-60"
                src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-2.jpg"
                alt=""
              />
            </div>
          </div>
          <div className="grid">
            <div>
              <img
                className="h-auto w-full hover:opacity-60"
                src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-3.jpg"
                alt=""
              />
            </div>
            <div>
              <img
                className="h-auto w-full hover:opacity-60"
                src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-4.jpg"
                alt=""
              />
            </div>
            <div>
              <img
                className="h-auto w-full hover:opacity-60"
                src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-5.jpg"
                alt=""
              />
            </div>
          </div>
          <div className="grid">
            <div>
              <img
                className="h-auto w-full hover:opacity-60"
                src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-6.jpg"
                alt=""
              />
            </div>
            <div>
              <img
                className="h-auto w-full hover:opacity-60"
                src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-7.jpg"
                alt=""
              />
            </div>
            <div>
              <img
                className="h-auto w-full hover:opacity-60"
                src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-8.jpg"
                alt=""
              />
            </div>
          </div>
          <div className="grid">
            <div>
              <img
                className="h-auto w-full hover:opacity-60"
                src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-9.jpg"
                alt=""
              />
            </div>
            <div>
              <img
                className="h-auto w-full hover:opacity-60"
                src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-10.jpg"
                alt=""
              />
            </div>
            <div>
              <img
                className="h-auto w-full hover:opacity-60"
                src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-11.jpg"
                alt=""
              />
            </div>
          </div>
        </div>
        <div className="grid cols-2 bg-gray-600">
          <button
            type="button"
            className="m-auto py-2 inline-flex items-center text-center text-4xl font-semibold text-white"
          >
            Button text
            <ArrowRightIcon className="-mr-0.5 h-10 w-10" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}

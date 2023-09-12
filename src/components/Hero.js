export default function Hero() {
  return (
    <div className="relative">
      <div className="relative md:fixed w-full md:w-1/2 h-full inset-0">
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
          src=""
          className="bg-black/40 object-cover opacity-90 sm:pt-[110px] w-full h-full"
        />
      </div>
      <div className="w-full h-screen md:w-1/2 ml-auto">
        <div className="grid grid-cols-1 sm:pt-[110px] md:grid-cols-2">
          <div className="grid">
            <div>
              <img
                className="h-auto max-w-full hover:opacity-60"
                src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image.jpg"
                alt=""
              />
            </div>
            <div>
              <img
                className="h-auto max-w-full hover:opacity-60"
                src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-1.jpg"
                alt=""
              />
            </div>
            <div>
              <img
                className="h-auto max-w-full hover:opacity-60"
                src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-2.jpg"
                alt=""
              />
            </div>
          </div>
          <div className="grid">
            <div>
              <img
                className="h-auto max-w-full hover:opacity-60"
                src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-3.jpg"
                alt=""
              />
            </div>
            <div>
              <img
                className="h-auto max-w-full hover:opacity-60"
                src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-4.jpg"
                alt=""
              />
            </div>
            <div>
              <img
                className="h-auto max-w-full hover:opacity-60"
                src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-5.jpg"
                alt=""
              />
            </div>
          </div>
          <div className="grid">
            <div>
              <img
                className="h-auto max-w-full hover:opacity-60"
                src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-6.jpg"
                alt=""
              />
            </div>
            <div>
              <img
                className="h-auto max-w-full hover:opacity-60"
                src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-7.jpg"
                alt=""
              />
            </div>
            <div>
              <img
                className="h-auto max-w-full hover:opacity-60"
                src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-8.jpg"
                alt=""
              />
            </div>
          </div>
          <div className="grid">
            <div>
              <img
                className="h-auto max-w-full hover:opacity-60"
                src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-9.jpg"
                alt=""
              />
            </div>
            <div>
              <img
                className="h-auto max-w-full hover:opacity-60"
                src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-10.jpg"
                alt=""
              />
            </div>
            <div>
              <img
                className="h-auto max-w-full hover:opacity-60"
                src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-11.jpg"
                alt=""
              />
            </div>
          </div>
        </div>
        <div className="grid cols-2">
          <div className="bg-red-400">Something</div>
        </div>
      </div>
    </div>
  );
}

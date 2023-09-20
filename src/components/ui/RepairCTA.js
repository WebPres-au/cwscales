export default function RepairCTA() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl sm:px-6 pb-32 lg:px-8">
        <div
          className="relative isolate overflow-hidde px-6 py-24 text-center shadow-2xl sm:rounded-3xl sm:px-16"
          style={{
            backgroundImage: "url('/categories/servicing.jpeg')",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        >
          <div className="bg-black/50 p-10 mx-10 sm:mx-20 rounded-xl">
            <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Looking For Service & Repairs?
            </h2>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="#"
                className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Click here
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

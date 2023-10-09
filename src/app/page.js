import Banner from "@/components/Banner";
import Categories from "@/components/Categories";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/ui/Footer";
import Navigation from "@/components/ui/Navigation";

export default function Home() {
  return (
    <div>
      <Navigation />

      <Banner />
      <Categories />
      <Information />
      {/* <LogoCloud /> */}
      <ContactForm />

      <Footer />
    </div>
  );
}

function Information() {
  return (
    <div className="bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-6xl text-center">
        <h2 className="mt-2 text-4xl font-extralight tracking-tight text-gray-900 sm:text-6xl">
          Welcome to Correct Weight Scales
        </h2>
        <p className="mt-6 text-lg font-light leading-8 text-gray-600">
          Correct Weight Scales has derived from over 20 years experience in the
          Weighing and Packaging Industry. We can assist in helping your
          business&apos; weighing applications through the perfect combination
          of unsurpassed experience and loyal committed customer service that is
          unfortunately hard to find in this era we live in. We offer a Full
          Repairs and Breakdown service on all Digital Weighing Scales,
          WEIGHBRIDGES, Packaging Equipmentas well as Scales Calibration, NMI
          Verification, Weighing Scales Hire and Preventative Maintenance
          Agreement Service 24/7 to any type of Weighing Equipment in Melbourne
          and surrounding Areas including Dandenong, Geelong and the Bellarine
          and have experience with every make and model from Laboratory Balances
          through to Large Scale Batching Equipment with everything in between.
        </p>
        <p className="mt-6 text-lg font-light leading-8 text-gray-600">
          Looking for a Hire option for a Weighing Project you may have? Or
          Scales to assist in that Stocktake? Ask us about our Hire range! We
          look forward to your most valuable enquiry. C.W.S offer a
          comprehensive range of Digital Weighing Scales, Packaging Equipment
          and Bottle & Drum Filling machinery to suit an array of any industry.
        </p>
      </div>
    </div>
  );
}

// function LogoCloud() {
//   return (
//     <div className="bg-white pb-24 sm:pb-32">
//       <div className="mx-auto max-w-7xl px-6 lg:px-8">
//         <h2 className="text-center text-lg font-semibold leading-8 text-gray-900">
//           Trusted some well known companies
//         </h2>
//         <div className="mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
//           <img
//             className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
//             src="https://tailwindui.com/img/logos/158x48/transistor-logo-gray-900.svg"
//             alt="Transistor"
//             width={158}
//             height={48}
//           />
//           <img
//             className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
//             src="https://tailwindui.com/img/logos/158x48/reform-logo-gray-900.svg"
//             alt="Reform"
//             width={158}
//             height={48}
//           />
//           <img
//             className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
//             src="https://tailwindui.com/img/logos/158x48/tuple-logo-gray-900.svg"
//             alt="Tuple"
//             width={158}
//             height={48}
//           />
//           <img
//             className="col-span-2 max-h-12 w-full object-contain sm:col-start-2 lg:col-span-1"
//             src="https://tailwindui.com/img/logos/158x48/savvycal-logo-gray-900.svg"
//             alt="SavvyCal"
//             width={158}
//             height={48}
//           />
//           <img
//             className="col-span-2 col-start-2 max-h-12 w-full object-contain sm:col-start-auto lg:col-span-1"
//             src="https://tailwindui.com/img/logos/158x48/statamic-logo-gray-900.svg"
//             alt="Statamic"
//             width={158}
//             height={48}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

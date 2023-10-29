import Banner from "@/components/Banner";
import Categories from "@/components/Categories";
import Footer from "@/components/ui/Footer";
import Navigation from "@/components/ui/Navigation";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Navigation />
      <Banner />
      <Categories />
      <Information />
      <Association />
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

function Association() {
  return (
    <div className="bg-white px-6 pb-16 lg:px-8">
      <div className="mx-auto max-w-6xl text-center">
        <h2 className="mt-2 text-2xl font-bold tracking-tight text-gray-900 sm:text-2xl">
          Correct Weight Scales is a Proud member of the Weighing Industry
          Association of Australia
        </h2>
        <div className="mx-auto">
          <Image
            height={400}
            width={400}
            src="wiaa.jpg"
            alt="Image"
            className="mx-auto mt-12 mb-6"
          />
        </div>
      </div>
    </div>
  );
}

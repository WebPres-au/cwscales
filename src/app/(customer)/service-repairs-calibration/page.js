import ContactForm from "@/components/ContactForm";
import Image from "next/image";

export default function ServiceRepairPage() {
  return (
    <>
      <div className="overflow-hidden mt-16 bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl md:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:grid-cols-2 lg:items-start">
            <div className="px-6 lg:px-0 lg:pr-4 lg:pt-4">
              <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-lg">
                <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  Scale Repairs Service & Calibration
                </h1>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                  Correct Weight Scales Service experience in the Weighing and
                  Packaging Industry has amassed from Numerous employment
                  opportunities over a 20 year period which has covered all
                  aspects of High end Weighing and Packaging Equipment and is
                  what makes us an easy choice when it comes to a reliable
                  service provider.
                </p>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                  We offer a Full Scale Repairs, Scale Calibration, Scale
                  Verification, Hire and Preventative Maintenance Agreement
                  Service 24/7 to ALL MAKES AND MODELS of weighing Equipment and
                  Packaging Equipment in Melbourne and surrounding areas
                  including Geelong and the Bellarine and have experience with
                  every make and model from Laboratory Balances through to Large
                  Scale Batching Equipment and everything in between.
                </p>
              </div>
            </div>
            <Image
              src="/categories/servicing.jpeg"
              alt="Product screenshot"
              className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
              width={2432}
              height={1442}
            />
          </div>
          <div className="mx-auto mt-16 max-w-6xl lg:text-center">
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              &quot;That&apos;s a service with a tick&quot;
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              We support our range of weighing equipment with a full spare parts
              inventory and offer a Hire Service on most forms of weighing
              equipment if that is a more viable option for your business
              requirements. We can also source all makes and models of weighing
              equipment spare parts through our number of dealers in all
              Industry.
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              We will leave no stone unturned with any Service enquiry to ensure
              our customers needs are met on time and on budget. We will
              endeavor to attend breakdowns where possible SAME DAY and we do
              offer an after hours service if required.
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              We also offer repairs on certain forms of Packaging Equipment,
              Inline Check Weighers, labelling Equipment and both Net and Gross
              Linear Weighers. Please call me to discuss your packaging
              equipment queries to see if we can assist and feel free to ask
              about our Packaging Consumables including replacement Print heads
              for your printing requirements as well as label replacement for
              all Label Printing and Retail scales.
            </p>
            <p className="mt-6 text-lg max-w-xl mx-auto leading-8 text-gray-600">
              Contact us on <a href="tel:+61402980089">0402980089</a> for expert
              no obligation <strong>HIGHLY COMPETITIVE</strong> free quotes on
              ALL Service and Repairs on Weighing and Packaging Equipment.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-6xl lg:text-center">
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Brands serviced
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              CAS, A&D, Digi, Mettler Toledo, Ohaus, Rinstrum, Nuweigh, Nagata,
              T Scale, @weigh, Charder, Ishida, Bizerba, Avery, U.W.E, Gedge
              Healthweigh, Wedderburn, Stevens Systems, A.W.E, just to name a
              few!
            </p>
            <p className="mt-6 font-bold tracking-tight text-gray-900 ">
              We are fully Insured and NMI Certified Lic: SL 0653
            </p>
          </div>
        </div>
      </div>
      <ContactForm />
    </>
  );
}

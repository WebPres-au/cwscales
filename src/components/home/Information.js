"use client";

import { motion } from "framer-motion";

const industries = [
  "Industrial",
  "Retail",
  "Medical",
  "Logistics",
  "Oil",
  "Household",
  "Manufacturing",
  "Food Processing",
  "Food Packaging",
];

export default function Information() {
  return (
    <>
      <div className="bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-6xl text-center">
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{
              opacity: 1,
              y: [null, -20, 0],
            }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="mt-2 text-4xl font-extralight tracking-tight text-gray-900 sm:text-6xl">
              Welcome to Correct Weight Scales
            </h2>
            <p className="mt-6 text-lg font-light leading-8 text-gray-600">
              Correct Weight Scales has derived from over 20 years experience in
              the Weighing and Packaging Industry. We can assist in helping your
              business&apos; weighing applications through the perfect
              combination of unsurpassed experience and loyal committed customer
              service that is unfortunately hard to find in this era we live in.
              We offer a Full Repairs and Breakdown service on all Digital
              Weighing Scales, WEIGHBRIDGES, Packaging Equipmentas well as
              Scales Calibration, NMI Verification, Weighing Scales Hire and
              Preventative Maintenance Agreement Service 24/7 to any type of
              Weighing Equipment in Melbourne and surrounding Areas including
              Dandenong, Geelong and the Bellarine and have experience with
              every make and model from Laboratory Balances through to Large
              Scale Batching Equipment with everything in between.
            </p>
            <p className="mt-6 text-lg font-light leading-8 text-gray-600">
              Looking for a Hire option for a Weighing Project you may have? Or
              Scales to assist in that Stocktake? Ask us about our Hire range!
              We look forward to your most valuable enquiry. C.W.S offer a
              comprehensive range of Digital Weighing Scales, Packaging
              Equipment and Bottle & Drum Filling machinery to suit an array of
              any industry.
            </p>
          </motion.div>
          <ul className="mt-12 text-lg uppercase leading-8 text-white font-semibold grid grid-cols-1 sm:grid-cols-3 gap-4">
            {industries.map((industry, index) => (
              <motion.li
                key={index}
                className="p-1 bg-green/90 hover:bg-green/60 rounded-md w-full mx-auto"
                initial={{ opacity: 0, y: -100 }}
                animate={{
                  opacity: 1,
                  y: [null, -20, 0],
                }}
                transition={{ delay: index * 0.2 }}
              >
                {industry}
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

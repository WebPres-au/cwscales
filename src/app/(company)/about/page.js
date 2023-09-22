import RepairCTA from "@/components/ui/RepairCTA";

export default function About() {
  return (
    <>
      <div className="bg-white px-6 py-24 sm:py-32 mt-32 lg:px-8">
        <div className="mx-auto max-w-6xl text-center">
          <h1 className="mt-2 text-4xl font-extralight tracking-tight text-gray-900 sm:text-6xl">
            About Correct Weight Scales
          </h1>
          <p className="mt-6 text-lg font-light leading-8 text-gray-600">
            Correct Weight Scales is and Australian owned and ran company and
            has derived from over 20 years of experience in the Weighing and
            Packaging Industry. Our experience covers all facets of the Weighing
            and Packaging industry including Manufacturing, Breakdown and, Fault
            Finding, Technical Support, Report writing, Calibration and
            Verification Services and a full Technical Solutions Sales
            capability.
          </p>
          <p className="mt-6 text-lg font-light leading-8 text-gray-600">
            We offer complete solutions to all your Weighing, Packaging and
            Processing requirements and offer a full-customised design and
            manufacturing service to adapt to your specific requirements
          </p>
        </div>
      </div>
      <RepairCTA />
    </>
  );
}

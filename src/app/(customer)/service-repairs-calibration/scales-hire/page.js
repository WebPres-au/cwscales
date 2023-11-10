import PageHeader from "@/components/ui/PageHeader";
import Image from "next/image";

export default function page() {
  return (
    <>
      <PageHeader
        title="Scales Hire"
        description="Correct Weight Scales offer a Large range of Hire Scales to suit all Industries and Hire Periods."
      />
      <div className="-mt-32 pt-6 mb-16 px-6 mx-auto max-w-6xl text-center">
        <p className="mt-6 text-lg leading-8 text-gray-600">
          Often times, the purchase of weighing equipment is not the most
          economical or practical option. Instead renting is a great option.
          Scale Hire is often used for inventories or for temporary projects.
          CWScales have a range of rental scales that are ready to send out on
          short notice. We offer counting scales, bench scales, floor scales,
          crane scales, Portion scales and many more. Hire periods can be as
          short as a week or as long as multiple months depending on your
          applicaions.
        </p>
        <p className="mt-6 text-lg font-bold leading-8 text-gray-600">
          CONTACT US TO DISCUSS YOUR HIRE NEEDS
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 max-w-2xl mx-auto">
        <Image
          src="/hire/floorscale.jpg"
          alt="Image of a floor scale to hire"
          width={100}
          height={100}
          className="w-full p-4 mx-auto"
        />
        <Image
          src="/hire/jc.jpg"
          alt="Image of the JC series scale to hire"
          width={100}
          height={100}
          className="w-full p-4 mx-auto"
        />
      </div>
    </>
  );
}

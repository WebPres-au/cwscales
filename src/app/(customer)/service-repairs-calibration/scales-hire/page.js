import ContactForm from "@/components/ContactForm";
import PageHeader from "@/components/ui/PageHeader";

export default function page() {
  return (
    <>
      <PageHeader
        title="Scales Hire"
        description="Correct Weight Scales offer a Large range of Hire Scales to suit all Industries and Hire Periods."
      />
      <div className="-mt-32 mb-32 mx-auto max-w-6xl text-center">
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
      <ContactForm />
    </>
  );
}

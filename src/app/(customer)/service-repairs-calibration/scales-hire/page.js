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
          Floor Scales, Counting Scales, Platform Scales, Table Scales, Linear
          Weighers, Crane Scales
        </p>
        <p className="mt-6 text-lg font-bold leading-8 text-gray-600">
          Contact Us Now To Discuss Your Short or Long Term HIRE OPTIONS
        </p>
      </div>
      <ContactForm />
    </>
  );
}

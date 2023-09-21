import ContactForm from "@/components/ContactForm";
import RepairCTA from "@/components/ui/RepairCTA";

export default function Contact() {
  return (
    <>
      <div className="mt-32">
        <PageHeader
          title="Contact Us"
          description="Get in touch with us today!"
        />
        <ContactForm />
        <div className="mt-32">
          <RepairCTA />
        </div>
      </div>
    </>
  );
}

function PageHeader({ title, description }) {
  return (
    <div className="bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          {title}
        </h2>
        <p className="mt-6 text-lg leading-8 text-gray-600">{description}</p>
      </div>
    </div>
  );
}

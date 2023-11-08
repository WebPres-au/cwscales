import ContactForm from "@/components/ContactForm";
import PageHeader from "@/components/ui/PageHeader";

export default function Contact() {
  return (
    <>
      <div className="mt-32">
        <PageHeader
          title="Contact Us"
          description="There are multiple ways to contact Correct Weight Scales, the fastest way is to call us on 0402 980 089 or alternatively fill out the form below."
        />
        <ContactForm />
      </div>
    </>
  );
}

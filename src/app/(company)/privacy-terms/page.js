import ContactForm from "@/components/ContactForm";
import PageHeader from "@/components/ui/PageHeader";

export default function PrivacyAndTermsPage() {
  return (
    <>
      <div className="mt-32">
        <PageHeader
          title="Privacy Policy and Terms & Conditions"
          description="This Privacy Policy outlines how Correct Weight Scales ('we,' 'our,' or 'us') collects, uses, discloses, and protects your personal information. By accessing or using our website or services, you consent to the practices described in this policy."
        />
        <div className="mx-6 lg:mx-auto -mt-16 max-w-4xl text-left">
          <h1 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
            Privacy Policy
          </h1>
          <h2 className="mt-6 text-2xl font-extralight tracking-tight text-gray-900">
            Information We Collect
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            <span className="font-semibold">Personal Information:</span> We may
            collect personal information, such as your name, contact
            information, and billing details, when you interact with our website
            or services.
          </p>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            <span className="font-semibold">Usage Information:</span> We may
            collect information about how you use our website and services,
            including IP addresses, browser type, and pages viewed.
          </p>
          <h2 className="mt-6 text-2xl font-extralight tracking-tight text-gray-900">
            How We Use Your Information
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            We may use your information for the following purposes:
          </p>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            To provide and improve our services.
          </p>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            To communicate with you about your inquiries and requests.
          </p>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            To send you updates, promotions, and newsletters (if you opt in).
          </p>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            To comply with legal obligations.
          </p>
          <h2 className="mt-6 text-2xl font-extralight tracking-tight text-gray-900">
            Information Sharing
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            We do not sell or rent your personal information to third parties.
            We may share your information with trusted service providers who
            assist us in delivering our services.
          </p>
          <h2 className="mt-6 text-2xl font-extralight tracking-tight text-gray-900">
            Data Security
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            We take reasonable measures to protect your data from unauthorized
            access and use.
          </p>
          <h2 className="mt-6 text-2xl font-extralight tracking-tight text-gray-900">
            Your Choices
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            You can opt out of marketing communications by following the
            unsubscribe instructions in our emails.
          </p>
          <h1 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
            Terms and Conditions
          </h1>
          <h2 className="mt-6 text-2xl font-extralight tracking-tight text-gray-900">
            Acceptance of Terms
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            By using our website and services, you agree to these Terms and
            Conditions.
          </p>
          <h2 className="mt-6 text-2xl font-extralight tracking-tight text-gray-900">
            Use of Our Services
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            You agree to use our services only for lawful purposes and in
            compliance with all applicable laws and regulations.
          </p>
          <h2 className="mt-6 text-2xl font-extralight tracking-tight text-gray-900">
            Intellectual Property
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            All content on our website is protected by intellectual property
            laws. You may not use our content without our permission.
          </p>
          <h2 className="mt-6 text-2xl font-extralight tracking-tight text-gray-900">
            Limitation of Liability
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            We are not liable for any damages or losses arising from your use of
            our services.
          </p>
          <h2 className="mt-6 text-2xl font-extralight tracking-tight text-gray-900">
            Termination
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            We reserve the right to terminate or suspend your access to our
            services at any time, for any reason.
          </p>
          <h2 className="mt-6 text-2xl font-extralight tracking-tight text-gray-900">
            Governing Law
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            These Terms and Conditions are governed by the laws of Australia.
          </p>
          <h2 className="mt-6 text-2xl font-extralight tracking-tight text-gray-900">
            Changes to Terms and Conditions
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            We may update these Terms and Conditions at any time, and the
            updated version will be effective upon posting on our website.
          </p>
          <p className="mt-2 mb-16 text-lg leading-8 text-gray-600">
            Any questions or concerns about the above, please contact us using
            the form below.
          </p>
        </div>
        <ContactForm />
      </div>
    </>
  );
}

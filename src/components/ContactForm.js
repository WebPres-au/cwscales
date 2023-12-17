"use client";

import { useState } from "react";
import { validateEmail, validatePhoneNumber } from "@/lib/functions";
import {
  BuildingOffice2Icon,
  EnvelopeIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";
import ReCAPTCHA from "react-google-recaptcha";
import { toast } from "react-hot-toast";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function ContactForm() {
  const URLpath = usePathname()
  const [data, setData] = useState({
    firstName: "",
    email: "",
    company: "",
    enquiryType: "",
    number: "",
    suburb: "",
    message: "",
  });
  const [captcha, setCaptcha] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const captchaComplete = () => {
    setCaptcha(true);
  };

  const validateData = (data) => {
    if (!validateEmail(data.email)) {
      toast.error("Please enter a valid email address");
      return false;
    }
    if (!validatePhoneNumber(data.number)) {
      toast.error("Please enter a valid phone number (04XXXXXXXX)");
      return false;
    }
    if (!captcha) {
      toast.error("Please complete the captcha");
      return false;
    }
    return true;
  };

  const sendEmail = async (e) => {
    e.preventDefault();

    if (!validateData(data)) {
      return;
    }

    const dataWithUrl = {
      ...data,
      URLpath,
    };

    const response = await fetch("/api/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataWithUrl),
    });
    if (response.status === 200) {
      setData({
        firstName: "",
        email: "",
        company: "",
        enquiryType: "",
        number: "",
        suburb: "",
        message: "",
      });
      toast.success(`Message sent successfully!`);
    } else {
      toast.error("Oops! Something went wrong. Please try again");
    }
  };

  return (
    <div id="contact">
      <div className="grid grid-cols-2 gap-4 m-6 pt-12 border border-black/10 rounded-md shadow-2xl h-full">
        {/* Company information */}
        <div className="col-span-2 lg:col-span-1 h-full p-12">
          <h2 className="text-3xl mb-4 font-bold tracking-tight text-gray-900">
            Get in touch
          </h2>
          <p className="text-lg leading-8 text-gray-600">
            You can reach out to us via multiple ways! You can call or email
            directly below, or fill out the form and we will get back to you as
            soon as possible.
          </p>
          <dl className="mt-10 space-y-4 text-base leading-7 text-gray-600">
            <div className="flex gap-x-4">
              <dt className="flex-none">
                <span className="sr-only">Address</span>
                <BuildingOffice2Icon
                  className="h-7 w-6 text-gray-400"
                  aria-hidden="true"
                />
              </dt>
              <dd>
                75/2 Thomsons Road
                <br />
                Keilor Park, VIC 3042
              </dd>
            </div>
            <div className="flex gap-x-4">
              <dt className="flex-none">
                <span className="sr-only">Telephone</span>
                <PhoneIcon
                  className="h-7 w-6 text-gray-400"
                  aria-hidden="true"
                />
              </dt>
              <dd>
                <a className="hover:text-gray-900" href="tel:+61402980089">
                  0402980089
                </a>
              </dd>
            </div>
            <div className="flex gap-x-4">
              <dt className="flex-none">
                <span className="sr-only">Email</span>
                <EnvelopeIcon
                  className="h-7 w-6 text-gray-400"
                  aria-hidden="true"
                />
              </dt>
              <dd>
                <a
                  className="hover:text-gray-900"
                  href="mailto:louis@cwscales.com.au?subject=Website%20contact&body=Hello%20Louis,"
                >
                  louis@cwscales.com.au
                </a>
              </dd>
            </div>
          </dl>
          <div>
            <Image
              src="/servicewithtick.jpg"
              width={300}
              height={200}
              alt="Service with a tick"
              className="mx-auto mt-12"
            />
            <div className="mx-auto">
              <Image
                height={400}
                width={400}
                src="/wiaa.jpg"
                alt="Image"
                className="mx-auto w-[300px] mt-12 mb-6"
              />
              <div className="mx-auto text-center text-lg">
                CWS is a proud member of the Weighing Industry Association
              </div>
            </div>
          </div>
        </div>
        {/* Contact form */}
        <div className="col-span-2 lg:col-span-1 h-full">
          <form
            onSubmit={sendEmail}
            className="pb-24 sm:pb-32 px-8 pt-8 mx-auto my-auto"
          >
            <div className="lg:mr-0">
              <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="first-name"
                    className="block text-sm font-semibold leading-6 text-gray-900"
                  >
                    First name
                  </label>
                  <div className="mt-2.5">
                    <input
                      required
                      type="text"
                      name="firstName"
                      id="first-name"
                      autoComplete="given-name"
                      className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green sm:text-sm sm:leading-6"
                      value={data.firstName}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold leading-6 text-gray-900"
                  >
                    Email
                  </label>
                  <div className="mt-2.5">
                    <input
                      required
                      type="email"
                      name="email"
                      id="email"
                      autoComplete="email"
                      className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green sm:text-sm sm:leading-6"
                      value={data.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="company"
                    className="block text-sm font-semibold leading-6 text-gray-900"
                  >
                    Company
                  </label>
                  <div className="mt-2.5">
                    <input
                      required
                      type="text"
                      name="company"
                      id="company"
                      autoComplete="company"
                      className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green sm:text-sm sm:leading-6"
                      value={data.company}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="enquiryType"
                    className="block text-sm font-semibold leading-6 text-gray-900"
                  >
                    Enquiry type
                  </label>
                  <div className="mt-2.5">
                    <select
                      required
                      name="enquiryType"
                      id="enquiryType"
                      className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green sm:text-sm sm:leading-6"
                      value={data.enquiryType}
                      onChange={handleChange}
                    >
                      <option value="">Select an option</option>
                      <option value="product">Product</option>
                      <option value="rentals">Rentals</option>
                      <option value="repair">Repair</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="number"
                    className="block text-sm font-semibold leading-6 text-gray-900"
                  >
                    Phone number
                  </label>
                  <div className="mt-2.5">
                    <input
                      required
                      type="tel"
                      name="number"
                      id="number"
                      autoComplete="tel"
                      className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green sm:text-sm sm:leading-6"
                      value={data.number}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="suburb"
                    className="block text-sm font-semibold leading-6 text-gray-900"
                  >
                    Suburb
                  </label>
                  <div className="mt-2.5">
                    <input
                      type="text"
                      name="suburb"
                      id="suburb"
                      autoComplete="tel"
                      className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green sm:text-sm sm:leading-6"
                      value={data.suburb}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="message"
                    className="block text-sm font-semibold leading-6 text-gray-900"
                  >
                    Message
                  </label>
                  <div className="mt-2.5">
                    <textarea
                      required
                      name="message"
                      id="message"
                      rows={4}
                      className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green sm:text-sm sm:leading-6"
                      value={data.message}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <ReCAPTCHA
                  sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                  onChange={captchaComplete}
                />
              </div>
              <div className="mt-8 flex justify-end">
                <button
                  type="submit"
                  className="rounded-md bg-green px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-green/90"
                >
                  Send message
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

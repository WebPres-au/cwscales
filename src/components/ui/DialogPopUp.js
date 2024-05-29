'use client'

import { useState, useEffect } from "react";
import { useIdle } from "@uidotdev/usehooks";
import { useMediaQuery } from 'usehooks-ts'

import { validateEmail, validatePhoneNumber } from "@/lib/functions";
import ReCAPTCHA from "react-google-recaptcha";
import { toast } from "react-hot-toast";
import { usePathname } from "next/navigation";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

export default function DialogPopUp() {
  const [ open, setOpen ] = useState(false);
  const idle = useIdle(5000);
  const isDesktop = useMediaQuery('(min-width: 768px)')

  useEffect(() => {
    if (idle) {
      setOpen(true);
    }
  }, [idle]);

  if (isDesktop) {
    return (
      <Dialog open={open}>
        <DialogContent className="sm:max-w-lg md:max-w-6xl p-12">
          <DialogHeader>
            <DialogTitle className="text-xl text-center">We are here to help!</DialogTitle>
            <DialogDescription className="text-md text-center">
              We&quot;re just a message away if you need anything. Send a message and we&quot;ll get back to you within 24 hours.
            </DialogDescription>
          </DialogHeader>
          <ContactForm setOpen={setOpen} />
          <DialogFooter className="flex flex-row items-center justify-center space-x-4">
            <DialogClose asChild>
              <button type="button" onClick={() => setOpen(false)} className="w-1/2 rounded-md px-3.5 py-2.5 text-center text-sm font-semibold text-black shadow-sm border border-gray-200">
                Close
              </button>
            </DialogClose>
            <button
              type="submit"
              className="w-1/2 rounded-md bg-green px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-green/90"
              onClick={() => document.getElementById('contactForm').dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }))}
            >
              Send message
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle className="text-xl text-center">We are here to help!</DrawerTitle>
          <DrawerDescription className="text-center">
            We&quot;re just a message away if you need anything. Send a message and we&quot;ll get back to you within 24 hours.
          </DrawerDescription>
        </DrawerHeader>
        <div className="px-4">
          <ContactForm setOpen={setOpen} />
        </div>
        <DrawerFooter className="flex flex-row items-center justify-center space-x-4">
          <DrawerClose asChild>
            <button type="button" onClick={() => setOpen(false)} className="w-1/2 rounded-md px-3.5 py-2.5 text-center text-sm font-semibold text-black shadow-sm border border-gray-200">
              Close
            </button>
          </DrawerClose>
          <button
            type="submit"
            className="w-1/2 rounded-md bg-green px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-green/90"
            onClick={() => document.getElementById('contactForm').dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }))}
          >
            Send message
          </button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

function ContactForm({ setOpen }) {
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
      setOpen(false);
      toast.success(`Message sent successfully!`);
    } else {
      toast.error("Oops! Something went wrong. Please try again");
    }
  };

  return (
    <div className="h-full">
      <form
        id="contactForm"
        onSubmit={sendEmail}
        className="mx-auto my-auto"
      >
        <div className="lg:mr-0">
          <div className="grid gap-x-8 gap-y-6 grid-cols-2">
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

            <div className="col-span-2">
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
        </div>
      </form>
    </div>
  )
}
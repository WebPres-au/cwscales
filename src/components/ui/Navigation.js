"use client";

import { Fragment, useState, useEffect } from "react";
import { classNames } from "@/lib/functions";
import Image from "next/image";
import { Dialog, Popover, Tab, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  XMarkIcon,
  PhoneArrowUpRightIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";

const navigation = {
  categories: [
    {
      id: "women",
      name: "Weighing Scales",
      featured: [
        {
          name: "Digital Scales",
          href: "#",
          imageSrc: "/scale-1.jpeg",
          imageAlt:
            "Models sitting back to back, wearing Basic Tee in black and bone.",
        },
        {
          name: "Table Scales",
          href: "#",
          imageSrc: "/scale-2.jpeg",
          imageAlt:
            "Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.",
        },
      ],
      sections: [
        {
          id: "clothing",
          name: "Clothing",
          items: [
            { name: "Counting Scales", href: "#" },
            { name: "Crane Scales", href: "#" },
            { name: "Digital Table Scales", href: "#" },
            { name: "Electronic Weighing Indicators", href: "#" },
            { name: "Floor Scales/Pallet Scales", href: "#" },
            { name: "Food/Portion Scales", href: "#" },
            { name: "Freight/Parcel Scales", href: "#" },
            { name: "Household Scales", href: "#" },
            { name: "Kitchen Scales/Bathroom Scales", href: "#" },
          ],
        },
        {
          id: "accessories",
          name: "Accessories",
          items: [
            { name: "Laboratory Scales", href: "#" },
            { name: "Medical/Personal Weighing Scales", href: "#" },
            { name: "Money Scales/Coin Sorters", href: "#" },
            { name: "Platform Scales", href: "#" },
            { name: "Retail Scales/Labelling Scales", href: "#" },
            { name: "Vet/Animal Scales", href: "#" },
            { name: "Trade Approved Scales", href: "#" },
            { name: "Browse all", href: "#" },
          ],
        },
      ],
    },
    {
      id: "men",
      name: "Packaging Equipment",
      featured: [
        {
          name: "Multihead Weighers",
          href: "#",
          imageSrc: "/pkg-1.jpeg",
          imageAlt:
            "Drawstring top with elastic loop closure and textured interior padding.",
        },
        {
          name: "Coffee Weigher",
          href: "#",
          imageSrc: "/pkg-2.jpeg",
          imageAlt:
            "Three shirts in gray, white, and blue arranged on table with same line drawing of hands and shapes overlapping on front of shirt.",
        },
      ],
      sections: [
        {
          id: "clothing",
          name: "Clothing",
          items: [
            { name: "Bagging Machines", href: "#" },
            { name: "Check Weighers", href: "#" },
            { name: "Linear Weighers", href: "#" },
          ],
        },
        {
          id: "accessories",
          name: "Accessories",
          items: [
            { name: "Liquid Fillers", href: "#" },
            { name: "Multihead Weighers", href: "#" },
            { name: "Browse all", href: "#" },
          ],
        },
      ],
    },
  ],
  pages: [
    { name: "Label/Receipt Printers", href: "#" },
    { name: "Loadcells & Accessories", href: "#" },
    { name: "Repairs & Calibration", href: "#" },
    { name: "Specials", href: "#" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ],
};

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 128) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`${
        isScrolled
          ? "hide-show-transition opacity-0"
          : "hide-show-transition opacity-100"
      } bg-white pt-2 fixed top-0 right-0 left-0 z-40 `}
    >
      {/* Mobile menu */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-50 lg:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-full md:max-w-md flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                <div className="flex px-4 pb-2 pt-5">
                  <button
                    type="button"
                    className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                    onClick={() => setOpen(false)}
                  >
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Links */}
                <Tab.Group as="div" className="mt-2">
                  <div className="border-b border-gray-200">
                    <Tab.List className="-mb-px flex space-x-8 px-4">
                      {navigation.categories.map((category) => (
                        <Tab
                          key={category.name}
                          className={({ selected }) =>
                            classNames(
                              selected
                                ? "border-indigo-600 text-indigo-600"
                                : "border-transparent text-gray-900",
                              "flex-1 whitespace-nowrap border-b-2 px-1 py-4 text-base font-medium"
                            )
                          }
                        >
                          {category.name}
                        </Tab>
                      ))}
                    </Tab.List>
                  </div>
                  <Tab.Panels as={Fragment}>
                    {navigation.categories.map((category) => (
                      <Tab.Panel
                        key={category.name}
                        className="space-y-10 px-4 pb-8 pt-10"
                      >
                        <div className="grid grid-cols-2 gap-x-4">
                          {category.featured.map((item) => (
                            <div
                              key={item.name}
                              className="group relative text-sm"
                            >
                              <div className="aspect-h-2 aspect-w-2 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                <img
                                  src={item.imageSrc}
                                  alt={item.imageAlt}
                                  className="object-cover object-center"
                                />
                              </div>
                              <a
                                href={item.href}
                                className="mt-6 block font-medium text-gray-900"
                              >
                                <span
                                  className="absolute inset-0 z-10"
                                  aria-hidden="true"
                                />
                                {item.name}
                              </a>
                              <p aria-hidden="true" className="mt-1">
                                Shop now
                              </p>
                            </div>
                          ))}
                        </div>
                        {category.sections.map((section) => (
                          <div key={section.name}>
                            <p
                              id={`${category.id}-${section.id}-heading-mobile`}
                              className="font-medium text-gray-900"
                            >
                              {section.name}
                            </p>
                            <ul
                              role="list"
                              aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
                              className="mt-6 flex flex-col space-y-6"
                            >
                              {section.items.map((item) => (
                                <li key={item.name} className="flow-root">
                                  <a
                                    href={item.href}
                                    className="-m-2 block p-2 text-gray-500"
                                  >
                                    {item.name}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </Tab.Panel>
                    ))}
                  </Tab.Panels>
                </Tab.Group>

                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                  {navigation.pages.map((page) => (
                    <div key={page.name} className="flow-root">
                      <a
                        href={page.href}
                        className="-m-2 block p-2 font-medium text-gray-900"
                      >
                        {page.name}
                      </a>
                    </div>
                  ))}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Contact information and logo */}
      <div className="bg-white">
        <div className="mx-auto flex h-12 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex">
            <PhoneArrowUpRightIcon
              className="text-black h-6 w-6 mr-2"
              aria-hidden="true"
            />
            <p className="hidden pt-0.5 sm:block flex-1 text-center text-sm font-medium text-black lg:flex-none">
              <a href="tel:+61402980089">0402980089</a>
            </p>
          </div>

          {/* Logo */}
          <a href="/" className="flex">
            <span className="sr-only">Business logo</span>
            <Image
              className="h-8 w-auto"
              src="/CWS_logo.png"
              alt="Logo for CW Scales"
              width={200}
              height={200}
            />
          </a>

          <div className="flex">
            <EnvelopeIcon
              className="text-black h-6 w-6 mr-2"
              aria-hidden="true"
            />
            <a
              href="mailto:louis@cwscales.com.au"
              className="hidden sm:block pt-0.5 text-sm font-medium text-black hover:text-gray-100"
            >
              louis@cwscales.com.au
            </a>
          </div>
        </div>
      </div>

      {/* Input form and menu on mobile */}
      <div className="bg-white lg:hidden">
        <div className="mx-auto flex h-12 max-w-full items-center justify-between m-2 px-4 sm:px-6 lg:px-8">
          <form className="block w-full">
            <input
              type="text"
              placeholder="Search"
              className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </form>
          <button
            type="button"
            className="ml-5 lg:hidden rounded-md bg-white text-gray-400"
            onClick={() => setOpen(true)}
          >
            <span className="sr-only">Open menu</span>
            <Bars3Icon className="text-black h-8 w-8" aria-hidden="true" />
          </button>
        </div>
      </div>

      <header className="relative hidden lg:block bg-white">
        <nav
          aria-label="Top"
          className="mx-auto max-w-full px-4 sm:px-6 lg:px-8"
        >
          <div className="flex h-16 items-center justify-between">
            <div className="flex flex-1 items-center justify-end">
              {/* Flyout menus */}
              <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch">
                <div className="flex h-full space-x-8">
                  {navigation.categories.map((category) => (
                    <Popover key={category.name} className="flex">
                      {({ open }) => (
                        <>
                          <div className="relative flex">
                            <Popover.Button
                              className={classNames(
                                open
                                  ? "border-indigo-600 text-indigo-600"
                                  : "border-transparent text-gray-700 hover:text-gray-800",
                                "relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out"
                              )}
                            >
                              {category.name}
                            </Popover.Button>
                          </div>

                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <Popover.Panel className="absolute inset-x-0 top-full text-sm text-gray-500">
                              {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                              <div
                                className="absolute inset-0 top-1/2 bg-white shadow"
                                aria-hidden="true"
                              />

                              <div className="relative bg-white">
                                <div className="mx-auto max-w-7xl px-8">
                                  <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-16">
                                    <div className="col-start-2 grid grid-cols-2 gap-x-8">
                                      {category.featured.map((item) => (
                                        <div
                                          key={item.name}
                                          className="group relative text-base sm:text-sm"
                                        >
                                          <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                            <img
                                              src={item.imageSrc}
                                              alt={item.imageAlt}
                                              className="object-cover object-center"
                                            />
                                          </div>
                                          <a
                                            href={item.href}
                                            className="mt-6 block font-medium text-gray-900"
                                          >
                                            <span
                                              className="absolute inset-0 z-10"
                                              aria-hidden="true"
                                            />
                                            {item.name}
                                          </a>
                                          <p
                                            aria-hidden="true"
                                            className="mt-1"
                                          >
                                            Shop now
                                          </p>
                                        </div>
                                      ))}
                                    </div>
                                    <div className="row-start-1 grid grid-cols-2 gap-x-8 gap-y-10 text-sm">
                                      {category.sections.map((section) => (
                                        <div key={section.name}>
                                          {/* <p
                                            id={`${section.name}-heading`}
                                            className="font-medium text-gray-900"
                                          >
                                            {section.name}
                                          </p> */}
                                          <ul
                                            role="list"
                                            aria-labelledby={`${section.name}-heading`}
                                            className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                          >
                                            {section.items.map((item) => (
                                              <li
                                                key={item.name}
                                                className="flex"
                                              >
                                                <a
                                                  href={item.href}
                                                  className="hover:text-gray-800"
                                                >
                                                  {item.name}
                                                </a>
                                              </li>
                                            ))}
                                          </ul>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Popover.Panel>
                          </Transition>
                        </>
                      )}
                    </Popover>
                  ))}

                  {navigation.pages.map((page) => (
                    <a
                      key={page.name}
                      href={page.href}
                      className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                    >
                      {page.name}
                    </a>
                  ))}
                </div>
              </Popover.Group>

              {/* Hidden menu and seach */}
              <div className="flex items-center">
                <button
                  type="button"
                  className="hidden lg:block ml-6 p-2 text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">Search</span>
                  <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}

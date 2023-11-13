"use client";

import { Fragment, useState, useEffect, useRef } from "react";
import { classNames, snake_case_string } from "@/lib/functions";
import Image from "next/image";
import { Dialog, Popover, Tab, Transition } from "@headlessui/react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  XMarkIcon,
  PhoneArrowUpRightIcon,
  EnvelopeIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar({ navigation }) {
  const router = useRouter();
  const divRef = useRef();
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [autoComplete, setAutoComplete] = useState([]);
  const supabase = createClientComponentClient();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 174) {
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

  useEffect(() => {
    if (searchQuery.length > 1) {
      const categoriesQuery = supabase
        .from("categories")
        .select()
        .filter("name", "ilike", `%${searchQuery}%`);

      const tagsQuery = supabase
        .from("tags")
        .select()
        .filter("name", "ilike", `%${searchQuery}%`);

      Promise.all([categoriesQuery, tagsQuery])
        .then(([categoriesData, tagsData]) => {
          const categories = categoriesData.data || [];
          const tags = tagsData.data || [];

          const newTagsData = tags?.map((item) => ({ ...item, tag: true }));
          const combinedData = [...categories, ...newTagsData];
          setAutoComplete(combinedData);
        })
        .catch((error) => {
          console.error("Error fetching categories and tags:", error);
        });
    } else {
      setAutoComplete([]);
    }
  }, [searchQuery]);

  useEffect(() => {
    if (!searchQuery && autoComplete[0]) {
      setAutoComplete([]);
    }
  }, [autoComplete, searchQuery]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (divRef.current && !divRef.current.contains(event.target)) {
        clearInputdata();
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const clearInputdata = () => {
    setAutoComplete([]);
    setSearchQuery([]);
    setOpenSearch(false);
  };

  const clickAutocomplete = (link, tag) => {
    router.replace(
      `/product-${tag ? "tag" : "category"}/${snake_case_string(link)}`
    );
    clearInputdata();
  };

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
                                ? "border-green-600 "
                                : "border-transparent",
                              "text-black hover:text-black/70 flex-1 whitespace-nowrap border-b-2 px-1 py-4 text-base font-medium"
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
                              onClick={() => setOpen(false)}
                              className="group relative text-sm"
                            >
                              <div className="aspect-h-2 aspect-w-2 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                <Image
                                  src={item.imageSrc}
                                  alt={item.imageAlt}
                                  className="object-cover object-center"
                                  width={200}
                                  height={200}
                                />
                              </div>
                              <Link
                                href={item.href}
                                className="mt-6 block font-medium text-gray-900"
                              >
                                <span
                                  className="absolute inset-0 z-10"
                                  aria-hidden="true"
                                />
                                {item.name}
                              </Link>
                              <p aria-hidden="true" className="mt-1">
                                Browse now
                              </p>
                            </div>
                          ))}
                        </div>

                        <div>
                          <ul
                            role="list"
                            aria-labelledby={`heading-mobile`}
                            className="mt-6 flex flex-col space-y-6"
                          >
                            {category.subcategories.map((item) => (
                              <li key={item.name} className="flow-root">
                                <Link
                                  href={item.href}
                                  onClick={() => setOpen(false)}
                                  className="-m-2 block p-2 text-gray-500"
                                >
                                  {item.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </Tab.Panel>
                    ))}
                  </Tab.Panels>
                </Tab.Group>

                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                  {navigation.pages.map((page) => (
                    <div key={page.name} className="flow-root">
                      <Link
                        href={page.href}
                        onClick={() => setOpen(false)}
                        className="-m-2 block p-2 font-medium text-gray-900"
                      >
                        {page.name}
                      </Link>
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
        <div className="mx-auto flex mb-2 h-12 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
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
          <Link href="/" className="flex w-auto h-auto">
            <span className="sr-only">Business logo</span>
            <Image
              src="/CWS_logo.png"
              alt="Logo for CW Scales"
              width={200}
              height={200}
            />
          </Link>

          <div className="flex">
            <EnvelopeIcon
              className="text-black h-6 w-6 mr-2"
              aria-hidden="true"
            />
            <a
              href={`mailto:louis@cwscales.com.au?subject=Enquiry from Website&body=Hi Louis, I am enquiring about `}
              className="hidden sm:block pt-0.5 text-sm font-medium text-black"
            >
              louis@cwscales.com.au
            </a>
          </div>
        </div>
        <div className="w-full flex pt-1 pb-2 sm:pt-2 sm:pb-4 text-xl sm:text-2xl text-center font-semibold">
          <div className="mx-auto">WEIGHING, PACKAGING & FILLING SOLUTIONS</div>
        </div>
      </div>

      {/* Input form and menu on mobile */}
      <div className="bg-white lg:hidden">
        <div
          value={searchQuery}
          className="mx-auto flex h-12 max-w-full items-center justify-between m-2 px-4 sm:px-6 lg:px-8"
        >
          <div className="block w-full">
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 text-gray-700 bg-white border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-green focus:border-green placeholder:text-black"
            />
          </div>
          <button
            type="button"
            className="ml-5 lg:hidden rounded-md bg-white text-black"
            onClick={() => setOpen(true)}
          >
            <span className="sr-only">Open menu</span>
            <Bars3Icon className="text-black h-8 w-8" aria-hidden="true" />
          </button>
        </div>
      </div>

      <header className="relative hidden lg:block bg-green">
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
                    <HoverPopover key={category.name} category={category} />
                  ))}

                  {navigation.pages.map((page) => (
                    <Link
                      onMouseEnter={() => setIsHovered(page.name)}
                      onMouseLeave={() => setIsHovered(null)}
                      onClick={() => setIsHovered(null)}
                      key={page.name}
                      href={page.href}
                      className={classNames(
                        isHovered === page.name
                          ? "border-b-4 border-white/80"
                          : "border-b-4 border-transparent",
                        "flex items-center text-center text-sm font-medium text-white"
                      )}
                    >
                      {page.name}
                    </Link>
                  ))}
                </div>
              </Popover.Group>

              {/* Hidden menu and seach */}
              <div
                ref={divRef}
                className={`ml-6 relative w-max ${!openSearch && "pl-6"}`}
              >
                {openSearch && (
                  <div>
                    <input
                      type="text"
                      name="searchQuery"
                      id="searchQuery"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search Products"
                      className={`peer relative z-10 h-10 w-full bg-transparent outline-none bg-white cursor-text focus:border-lime-300 pl-10 focus:pr-4 rounded-md border-0  text-gray-900 shadow-sm ring-inset ring-gray-300 placeholder:text-black ring-2 focus:ring-green sm:text-sm sm:leading-6`}
                    />
                  </div>
                )}
                <MagnifyingGlassIcon
                  className={`absolute inset-y-0 my-auto h-6 w-6 border-r border-transparent peer-focus:stroke-green ${
                    openSearch ? "left-0" : "right-0 text-white"
                  } z-20 m-2`}
                  onClick={() => setOpenSearch(true)}
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>
        </nav>
      </header>
      {autoComplete?.[0] && (
        <div className="absolute max-h-[400px] w-[98%] lg:w-60 overflow-scroll top-[130px] ml-1 lg:right-6 bg-gray-50 rounded-lg py-4 px-2 border">
          {autoComplete.map((category) => (
            <ul
              onClick={() => clickAutocomplete(category.name, category.tag)}
              key={category.id}
              className="py-4 px-6 mb-1 text-sm text-black rounded-lg hover:bg-green/30 transition duration-300 cursor-pointer"
            >
              {category?.name}
            </ul>
          ))}
        </div>
      )}
    </div>
  );
}

function HoverPopover({ category }) {
  const [isHovered, setIsHovered] = useState(false);

  const midIndex = Math.floor(category.subcategories.length / 2);
  const firstGroup = category.subcategories.slice(0, midIndex);
  const secondGroup = category.subcategories.slice(midIndex);

  return (
    <Popover className="flex">
      {({ open }) => (
        <>
          <div
            className="relative flex h-16"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <Popover.Button
              className={classNames(
                open || isHovered
                  ? "border-b-4 border-white/80"
                  : "border-b-4 border-transparent",
                "text-white relative z-10 -mb-px flex items-center h-full pt-px text-sm font-medium transition-colors duration-200 ease-out"
              )}
              onClick={() => setIsHovered(!isHovered)}
            >
              {category.name}
              {category.subcategories.length > 0 && (
                <ChevronDownIcon className="h-6 w-6 ml-1" />
              )}
            </Popover.Button>
          </div>

          <Transition
            show={isHovered}
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Popover.Panel
              className={`absolute inset-x-0 top-full text-sm text-gray-500`}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
              <div
                className="absolute inset-0 top-1/2 bg-white shadow"
                aria-hidden="true"
              />

              <div className="relative bg-white">
                <div className="mx-auto max-w-7xl px-8">
                  <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-16">
                    {/* Featured products */}
                    <div>
                      <h1 className="mb-6 block font-medium text-gray-900">
                        Featured Products
                      </h1>
                      <div className="col-start-2 grid grid-cols-2 gap-x-8">
                        {category.featured.map((item) => (
                          <div
                            key={item.name}
                            className="group relative text-base sm:text-sm"
                          >
                            <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                              <Image
                                src={item.imageSrc}
                                alt={item.imageAlt}
                                className="object-cover object-center"
                                width={200}
                                height={200}
                              />
                            </div>
                            <Popover.Button
                              as={Link}
                              href={item.href}
                              className="mt-6 block font-medium text-gray-900"
                            >
                              <span
                                className="absolute inset-0 z-10"
                                aria-hidden="true"
                              />
                              {item.name}
                            </Popover.Button>
                            <p aria-hidden="true" className="mt-1">
                              Browse now
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                    {/* Product Categories */}
                    <div>
                      <h1 className="mb-6 block font-medium text-gray-900">
                        Product Categories
                      </h1>
                      <div className="row-start-1 grid grid-cols-2 gap-x-8 gap-y-10 text-sm">
                        <div>
                          <ul
                            role="list"
                            className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                          >
                            {firstGroup.map((item) => (
                              <li key={item.name} className="flex">
                                <Popover.Button
                                  as={Link}
                                  href={item.href}
                                  className="hover:text-gray-800"
                                >
                                  {item.name}
                                </Popover.Button>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <ul
                            role="list"
                            className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                          >
                            {secondGroup.map((item) => (
                              <li key={item.name} className="flex">
                                <Popover.Button
                                  as={Link}
                                  href={item.href}
                                  className="hover:text-gray-800"
                                >
                                  {item.name}
                                </Popover.Button>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}

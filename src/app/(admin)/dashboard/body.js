"use client";

import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { classNames, snake_case_string } from "@/lib/functions";
import Image from "next/image";
import LogoutButton from "./LogoutButton";
import Popover from "@/components/Popover";
import { useState } from "react";
import { useParams } from "next/navigation";

export default function Body({ children, navigation }) {
  const params = useParams();
  const { category } = params;

  const [popoverOpen, setPopoverOpen] = useState(false);

  const isRouteActive = (name) => {
    return (
      snake_case_string(category) === snake_case_string(name) ||
      (!category && name === "All")
    );
  };

  return (
    <>
      <div className="min-h-full">
        <Disclosure as="nav" className="border-b border-gray-200 bg-white">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-full px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 justify-between">
                  <div className="flex">
                    <div className="flex flex-shrink-0 items-center">
                      <Image
                        className="block h-6 w-auto lg:hidden"
                        src="/CWS_logo.png"
                        alt="Your Company"
                        width={100}
                        height={100}
                      />
                      <Image
                        className="hidden h-6 w-auto lg:block"
                        src="/CWS_logo.png"
                        alt="Your Company"
                        width={100}
                        height={100}
                      />
                    </div>
                    <div className="hidden sm:-my-px sm:ml-6 overflow-x-auto sm:flex sm:space-x-8">
                      {navigation.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            isRouteActive(item.name)
                              ? "border-indigo-500 text-gray-900"
                              : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                            "inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium"
                          )}
                          aria-current={
                            isRouteActive(item.name) ? "page" : undefined
                          }
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                  </div>
                  <div className="hidden sm:ml-6 sm:flex sm:items-center gap-4">
                    <LogoutButton />
                  </div>
                  <div className="-mr-2 flex items-center sm:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                      <span className="absolute -inset-0.5" />
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      ) : (
                        <Bars3Icon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="md:hidden">
                <div className="overflow-x-auto space-y-1 pb-3 pt-2">
                  {navigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className={classNames(
                        isRouteActive(item.name)
                          ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                          : "border-transparent text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800",
                        "block border-l-4 py-2 pl-3 pr-4 text-base font-medium"
                      )}
                      aria-current={
                        isRouteActive(item.name) ? "page" : undefined
                      }
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
                <div className="border-t border-gray-200 pb-3 pt-4">
                  <div className="flex items-center px-4">
                    <div className="mx-auto">
                      <LogoutButton />
                    </div>
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        <div className="mx-auto max-w-7xl p-4 sm:px-4 lg:px-8">
          <div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
            <div className="-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap">
              <div className="ml-4 mt-2">
                <h3 className="text-base font-semibold leading-6 text-gray-900">
                  All products
                </h3>
              </div>
              <div className="ml-4 mt-2 flex-shrink-0">
                <button
                  onClick={() => setPopoverOpen(true)}
                  type="button"
                  className="relative inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  New product
                </button>
              </div>
            </div>
          </div>
          {children}
        </div>
      </div>
      {popoverOpen && <Popover open={popoverOpen} setOpen={setPopoverOpen} />}
    </>
  );
}

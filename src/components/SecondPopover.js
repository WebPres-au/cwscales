"use client";

import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { LinkIcon, PlusIcon } from "@heroicons/react/20/solid";
import { classNames } from "@/lib/functions";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const photos = [
  {
    name: "Product photo 1",
    imageUrl:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    name: "Product photo 2",
    imageUrl:
      "https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
];

const categories = [
  { name: "Scales", href: "#" },
  { name: "Packaging", href: "#" },
  { name: "Printers", href: "#" },
  { name: "Loadcells", href: "#" },
  { name: "Accessories", href: "#" },
];

const tags = [
  { name: "Scales", href: "#" },
  { name: "Packaging", href: "#" },
  { name: "Printers", href: "#" },
  { name: "Loadcells", href: "#" },
  { name: "Accessories", href: "#" },
];

export default function SecondPopover({open, setOpen, setCategories, setTags, isCategory= false, isTag = false}) {

  const [productName, setProductName] = useState("");
 
  const supabase = createClientComponentClient();

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if(isCategory) {
      const { data, error } = await supabase
      .from('categories')
      .insert([
        { name: productName},
      ])
      .select();
      if(error) throw error;
      setCategories((prev) => [...prev, data[0]])
    }
    else if(isTag) {
      const { data, error } = await supabase
      .from('tags')
      .insert([
        { name: productName},
      ])
      .select();
      if(error) throw error;
      setTags((prev) =>  [...prev, data[0]])
    }
      router.refresh();

      // reset form values
      setProductName("");

      setOpen(false);

      toast.success(`${isCategory ? 'Category' : isTag ? 'Tag': 'Item'} added successfully`);

    } catch (error) {
      toast.error(error.message);
    }
  };




  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <div className="fixed inset-0" />

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <form className="flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl" onSubmit={handleSubmit}>
                    <div className="h-0 flex-1 overflow-y-auto">
                      <div className="flex flex-1 flex-col justify-between">
                        <div className="divide-y divide-gray-200 px-4 sm:px-6">
                          <div className="space-y-6 pb-5 pt-6">
                            <div>
                              <label
                                htmlFor="project-name"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                {isCategory ? 'Category ' : isTag? 'Tag ' : ''}name
                              </label>
                              <div className="mt-2">
                                <input
                                  type="text"
                                  name="productName"
                                  id="productName"
                                  value={productName}
                                  onChange={(e) => setProductName(e.target.value)}
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                  onKeyUp={(e) => { if(e.key === 'Enter') handleSubmit(e) }}
                                />
                              </div>
                            </div>
                            
                          
                          </div>
                          
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-shrink-0 justify-end px-4 py-4">
                      <button
                        type="button"
                        className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                        onClick={() => setOpen(false)}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="ml-4 inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Save
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

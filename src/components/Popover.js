"use client";

import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { LinkIcon, PlusIcon } from "@heroicons/react/20/solid";
import { classNames } from "@/lib/functions";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import SecondPopover from "./SecondPopover";

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

export default function Popover({open, setOpen}) {

  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");

  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);

  const [chosenCategories, setChosenCategories] = useState([]);
  const [chosenTags, setChosenTags] = useState([]);

  const supabase = createClientComponentClient();


  const [isAddNewCategoryOpen, setIsAddNewCategoryOpen] = useState(false);
  const [isAddNewTagOpen, setIsAddNewTagOpen] = useState(false);

  useEffect(() => {

    const getCategories = async () => {
    try {
      const { data, error } = await supabase
      .from('categories')
      .select();
      if(error) throw error;
      setCategories(data);
    }
    catch (error) {
      toast.error(error.message);
    }
  }

    const getTags = async () => {
    try {
      const { data, error } = await supabase
      .from('tags')
      .select();
      if(error) throw error;
      setTags(data);
    }
    catch (error) {
      toast.error(error.message);
    }
  }
    getCategories();
    getTags();
  }, [])


  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(e.target.elements);
    try {
      const { data, error } = await supabase
      .from('dummyproducts')
      .insert([
        { name: productName, description: description, categories: chosenCategories.join(', '), tags: chosenTags.join(', ')},
      ])
      .select()

      if(error) throw error;

      router.refresh();

      // reset form values
      setProductName("");
      setDescription("");
      setChosenCategories([]);
      setChosenTags([]);

      setOpen(false);

      toast.success("Product added successfully");

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
                      <div className="bg-indigo-700 px-4 py-6 sm:px-6">
                        <div className="flex items-center justify-between">
                          <Dialog.Title className="text-base font-semibold leading-6 text-white">
                            New Product
                          </Dialog.Title>
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              className="relative rounded-md bg-indigo-700 text-indigo-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                              onClick={() => setOpen(false)}
                            >
                              <span className="absolute -inset-2.5" />
                              <span className="sr-only">Close panel</span>
                              <XMarkIcon
                                className="h-6 w-6"
                                aria-hidden="true"
                              />
                            </button>
                          </div>
                        </div>
                        <div className="mt-1">
                          <p className="text-sm text-indigo-300">
                            Create new product with a good photo and details
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-1 flex-col justify-between">
                        <div className="divide-y divide-gray-200 px-4 sm:px-6">
                          <div className="space-y-6 pb-5 pt-6">
                            <div>
                              <label
                                htmlFor="project-name"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                Product name
                              </label>
                              <div className="mt-2">
                                <input
                                  type="text"
                                  name="productName"
                                  id="productName"
                                  value={productName}
                                  onChange={(e) => setProductName(e.target.value)}
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                              </div>
                            </div>
                            <div>
                              <label
                                htmlFor="description"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                Description
                              </label>
                              <div className="mt-2">
                                <textarea
                                  id="description"
                                  name="description"
                                  rows={4}
                                  value={description}
                                  onChange={(e) => setDescription(e.target.value)}
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                  defaultValue={""}
                                />
                              </div>
                            </div>
                            <div>
                              <h3 className="text-sm font-medium leading-6 text-gray-900">
                                Photos
                              </h3>
                              <div className="mt-2">
                                <div className="flex space-x-2">
                                  {photos.map((photo, index) => (
                                    <img
                                      key={index}
                                      className="relative inline-block h-16 w-16 rounded-sm"
                                      src={photo.imageUrl}
                                      alt={photo.name}
                                    />
                                  ))}
                                  <button
                                    type="button"
                                    className="relative inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border-2 border-dashed border-gray-200 bg-white text-gray-400 hover:border-gray-300 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                  >
                                    <span className="absolute -inset-2" />
                                    <span className="sr-only">
                                      Add new photo
                                    </span>
                                    <PlusIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  </button>
                                </div>
                              </div>
                            </div>
                            <div>
                              <h3 className="text-sm font-medium leading-6 text-gray-900">
                                Category
                              </h3>
                              <div className="mt-2">
                                <div className="flex space-x-2">
                                  {categories.map((category, index) => (
                                    <p
                                      key={index}
                                      className={classNames(
                                        chosenCategories.includes(category.name) ? "bg-indigo-100 text-indigo-700" : "bg-gray-100 text-gray-900",
                                        "px-2 py-1 mr-2 border border-gray-300 rounded cursor-pointer"

                                      )}
                                      onClick={ chosenCategories.includes(category.name) ? 
                                        () => setChosenCategories((prev) => prev.filter((chosenCategory) => chosenCategory !== category.name)) 
                                        : () => setChosenCategories((prev) => [...prev, category.name]) 
                                      }
                                    >
                                      {category.name}
                                    </p>
                                  ))}
                                  <button
                                    type="button"
                                    onClick={() => setIsAddNewCategoryOpen(true)}
                                    className="relative inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border-2 border-dashed border-gray-200 bg-white text-gray-400 hover:border-gray-300 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                  >
                                    <span className="absolute -inset-2" />
                                    <span className="sr-only">
                                      Add category
                                    </span>
                                    <PlusIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  </button>
                                </div>
                              </div>
                            </div>
                            <div>
                              <h3 className="text-sm font-medium leading-6 text-gray-900">
                                Tags
                              </h3>
                              <div className="mt-2">
                                <div className="flex space-x-2">
                                  {tags.map((tag, index) => (
                                    <p
                                    key={index}
                                    className={classNames(
                                      chosenTags.includes(tag.name) ? "bg-indigo-100 text-indigo-700" : "bg-gray-100 text-gray-900",
                                      "px-2 py-1 mr-2 border border-gray-300 rounded cursor-pointer"

                                    )}
                                    onClick={ chosenTags.includes(tag.name) ? 
                                      () => setChosenTags((prev) => prev.filter((chosenTag) => chosenTag !== tag.name)) 
                                      : () => setChosenTags((prev) => [...prev, tag.name]) 
                                    }
                                  >
                                    {tag.name}
                                  </p>
                                  ))}
                                  <button
                                    type="button"
                                    onClick={() => setIsAddNewTagOpen(true)}
                                    className="relative inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border-2 border-dashed border-gray-200 bg-white text-gray-400 hover:border-gray-300 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                  >
                                    <span className="absolute -inset-2" />
                                    <span className="sr-only">Add tag</span>
                                    <PlusIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  </button>
                                </div>
                              </div>
                            </div>
                            <fieldset>
                              <legend className="text-sm font-medium leading-6 text-gray-900">
                                Privacy
                              </legend>
                              <div className="mt-2 space-y-4">
                                <div className="relative flex items-start">
                                  <div className="absolute flex h-6 items-center">
                                    <input
                                      id="privacy-public"
                                      name="privacy"
                                      aria-describedby="privacy-public-description"
                                      type="radio"
                                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                      defaultChecked
                                    />
                                  </div>
                                  <div className="pl-7 text-sm leading-6">
                                    <label
                                      htmlFor="privacy-public"
                                      className="font-medium text-gray-900"
                                    >
                                      Public
                                    </label>
                                    <p
                                      id="privacy-public-description"
                                      className="text-gray-500"
                                    >
                                      Live when you publish.
                                    </p>
                                  </div>
                                </div>
                                <div>
                                  <div className="relative flex items-start">
                                    <div className="absolute flex h-6 items-center">
                                      <input
                                        id="privacy-private-to-project"
                                        name="privacy"
                                        aria-describedby="privacy-private-to-project-description"
                                        type="radio"
                                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                      />
                                    </div>
                                    <div className="pl-7 text-sm leading-6">
                                      <label
                                        htmlFor="privacy-private-to-project"
                                        className="font-medium text-gray-900"
                                      >
                                        Draft
                                      </label>
                                      <p
                                        id="privacy-private-to-project-description"
                                        className="text-gray-500"
                                      >
                                        Draft mode until you publish.
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </fieldset>
                          </div>
                          <div className="pb-6 pt-4">
                            <div className="flex text-sm">
                              <a
                                href="#"
                                className="group inline-flex items-center font-medium text-indigo-600 hover:text-indigo-900"
                              >
                                <LinkIcon
                                  className="h-5 w-5 text-indigo-500 group-hover:text-indigo-900"
                                  aria-hidden="true"
                                />
                                <span className="ml-2">Copy link</span>
                              </a>
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
                  <SecondPopover isCategory open={isAddNewCategoryOpen} setOpen={setIsAddNewCategoryOpen} setCategories={setCategories} />
                  <SecondPopover isTag open={isAddNewTagOpen} setOpen={setIsAddNewTagOpen} setTags={setTags} />

                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
      
    </Transition.Root>
  );
}

"use client";

import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { LinkIcon, PlusIcon } from "@heroicons/react/20/solid";
import { classNames } from "@/lib/functions";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";


export default function SecondPopover({open, setOpen, categories, setCategories, setTags, isCategory= false, isTag = false}) {

  console.log('isCategory', isCategory);

  const [productName, setProductName] = useState("");
  const [parentCategory, setParentCategory] = useState(null);

  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-2);
 
  const supabase = createClientComponentClient();

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if(isCategory) {
      const { data, error } = await supabase
      .from('categories')
      .insert([
        { name: productName, parent_category: parentCategory},
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
      setParentCategory(null);

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
                            {
                              isCategory && 
                              <div>
                              <label id="listbox-label" class="block text-sm font-medium leading-6 text-gray-900">Parent Category</label>
                              <div class="relative mt-2">
                                <button type="button" onClick={() => setIsDropDownOpen((prev) => !prev)} class="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6" aria-haspopup="listbox" aria-expanded="true" aria-labelledby="listbox-label">
                                  <span class="block truncate">{parentCategory == null ? 'No Parent' : categories.find( (category) => category.id == parentCategory)?.name}</span>
                                  <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                    <svg class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                      <path fill-rule="evenodd" d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z" clip-rule="evenodd" />
                                    </svg>
                                  </span>
                                </button>

                                
                                <ul class={`${isDropDownOpen ? 'opacity-100' : 'opacity-0'} transition ease-in duration-100 absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm" tabindex="-1" role="listbox" aria-labelledby="listbox-label" aria-activedescendant="listbox-option-3`}>
                                  <li 
                                    onMouseEnter={()=>setHighlightedIndex(-1)}
                                    onMouseLeave={()=>setHighlightedIndex(-2)}
                                    onClick={() => {setParentCategory(null); setIsDropDownOpen(false)}}
                                    key={-1} className={`${highlightedIndex == -1 ? "bg-indigo-600 text-white" : "text-gray-900"} text-gray-900 relative cursor-default select-none py-2 pl-3 pr-9`}
                                  >
                                    <span class="font-normal block truncate">No Parent</span>

                                    { parentCategory == null &&
                                      <span class={`${highlightedIndex == -1 ? "text-white" : "text-indigo-600"} absolute inset-y-0 right-0 flex items-center pr-4`}>
                                        <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                          <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                                        </svg>
                                      </span>
                                    }
                                  </li>
                                  {
                                    categories.map((category, index) => (
                                      <li 
                                        onMouseEnter={()=>setHighlightedIndex(index)}
                                        onMouseLeave={()=>setHighlightedIndex(-2)}
                                        onClick={() => {setParentCategory(category.id); setIsDropDownOpen(false)}}
                                        key={index} className={`${highlightedIndex == index ? "bg-indigo-600 text-white" : "text-gray-900"} text-gray-900 relative cursor-default select-none py-2 pl-3 pr-9`}
                                      >
                                        <span class="font-normal block truncate">{category.name}</span>

                                        { parentCategory === category.id &&
                                          <span class={`${highlightedIndex == index ? "text-white" : "text-indigo-600"} absolute inset-y-0 right-0 flex items-center pr-4`}>
                                            <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                              <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                                            </svg>
                                          </span>
                                        }
                                      </li>
                                    ))
                                  }

                                </ul>
                              </div>
                            </div>
                            }

                            
                          
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

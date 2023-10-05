"use client";

import { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { classNames } from "@/lib/functions";
import Popover from "@/components/Popover";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function KebabMenu({product}) {
  const [isEditPopoverOpen, setIsEditPopoverOpen] = useState(false);
  const supabase = createClientComponentClient();
  const router = useRouter();

  return (
    <>
    <Menu as="div" className="relative flex-none">
      <Menu.Button className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
        <span className="sr-only">Open options</span>
        <EllipsisVerticalIcon className="h-5 w-5" aria-hidden="true" />
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
          <Menu.Item>
            {({ active }) => (
              <button
                onClick={() => setIsEditPopoverOpen(true)}
                className={classNames(
                  active ? "bg-gray-50" : "",
                  "block px-3 py-1 text-sm leading-6 text-gray-900"
                )}
              >
                Edit<span className="sr-only">, {product.name}</span>
              </button>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <button
                onClick={async () => {
                  const { data, error } = await supabase
                    .from('products')
                    .update({ isPublic: !product.isPublic })
                    .eq('id', product.id);
                    router.refresh();
                    toast.success(`Product ${product.isPublic ? 'paused' : 'activated'} successfully!`);
                  if (error) {
                    console.error(error.message);
                    return;
                  }
                }}
                className={classNames(
                  active ? "bg-gray-50" : "",
                  "block px-3 py-1 text-sm leading-6 text-gray-900"
                )}
              >
                {product.isPublic ? 'Pause' : 'Activate'}<span className="sr-only">, {product.name}</span>
              </button>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <button
                onClick={
                  async () => {
                    const { data, error } = await supabase
                      .from('products')
                      .delete()
                      .eq('id', product.id);
                      router.refresh();

                      toast.success('Product deleted successfully!');
                    if (error) {
                      console.error(error.message);
                      toast.error(error.message);
                      return;
                    }
                  }
                }
                className={classNames(
                  active ? "bg-gray-50" : "",
                  "block px-3 py-1 text-sm leading-6 text-gray-900"
                )}
              >
                Delete<span className="sr-only">, {product.name}</span>
              </button>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
    {
      isEditPopoverOpen && <Popover open={isEditPopoverOpen} setOpen={setIsEditPopoverOpen} intialProduct={product} />
    }
    </>
  );
}

"use client";

import { Fragment, useEffect, useState, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { PlusIcon } from "@heroicons/react/20/solid";
import { classNames } from "@/lib/functions";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import SecondPopover from "./SecondPopover";
import Image from "next/image";

export default function Popover({ open, setOpen, intialProduct}) {

  const imageUploadRef = useRef(null);

  const [productName, setProductName] = useState(intialProduct?.name ?? "");
  const [description, setDescription] = useState(intialProduct?.short_description ?? "");

  const [files, setFiles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);

  const [selectedOption, setSelectedOption] = useState(intialProduct? intialProduct?.isPublic ? "public" : "draft" : "public");

  const [existingImages, setExistingImages] = useState(intialProduct?.images ?? []);

  const [chosenCategories, setChosenCategories] = useState(intialProduct?.categories?.map(item => item?.id) ?? []);
  const [chosenTags, setChosenTags] = useState(intialProduct?.tags?.map(item => item?.id) ??[]);

  const [loading, setLoading] = useState(false);

  const supabase = createClientComponentClient();

  const [isAddNewCategoryOpen, setIsAddNewCategoryOpen] = useState(false);
  const [isAddNewTagOpen, setIsAddNewTagOpen] = useState(false);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const { data, error } = await supabase.from("categories").select();
        if (error) throw error;
        setCategories(data);
      } catch (error) {
        toast.error(error.message);
      }
    };

    const getTags = async () => {
      try {
        const { data, error } = await supabase.from("tags").select();
        if (error) throw error;
        setTags(data);
      } catch (error) {
        toast.error(error.message);
      }
    };
    getCategories();
    getTags();
  }, []);

  const router = useRouter();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      // Insert new product to products table
      const { data: productData, error: productError } = await supabase
        .from("products")
        .insert([{ name: productName, short_description: description, isPublic: selectedOption === "public" }])
        .select();

      if (productError) throw productError;

      // The ID of the newly inserted product
      const productId = productData[0].id;

      // Preparing the array to insert into product_categories table
      const categoryInserts = chosenCategories.map((categoryId) => ({
        product_id: productId,
        category_id: categoryId,
      }));

      // Preparing the array to insert into product_tags table
      const tagInserts = chosenTags.map((tagId) => ({
        product_id: productId,
        tag_id: tagId,
      }));

      // Inserting categories related to the product in the product_categories table
      const { error: categoryError } = await supabase
        .from("product_categories")
        .insert(categoryInserts);

      if (categoryError) throw categoryError;

      // Inserting tags related to the product in the product_tags table
      const { error: tagError } = await supabase
        .from("product_tags")
        .insert(tagInserts);

      if (tagError) throw tagError;

      // Uploading images to Supabase Storage and inserting to product_images table
      const imageInserts = [];
      for (const { file } of files) {
        const path = `product_images/${productId}/${file.name}`;
        const { error: uploadError } = await supabase.storage
          .from("product-images")
          .upload(path, file);
        if (uploadError) throw uploadError;
        imageInserts.push({ product_id: productId, image_path: path });
      }

      const { error: imageError } = await supabase
        .from("product_images")
        .insert(imageInserts);
      if (imageError) throw imageError;

      router.refresh();

      // reset form values
      setProductName("");
      setDescription("");
      setChosenCategories([]);
      setChosenTags([]);

      setOpen(false);
      setLoading(false);

      toast.success("Product added successfully");
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  };

  const handleEdit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const productId = intialProduct.id;
    try {
      // Update product in products table
      const { data: updatedProductData, error: productError } = await supabase
        .from("products")
        .update({
          name: productName,
          short_description: description,
          isPublic: selectedOption === "public",
        })
        .eq('id', productId);
  
      if (productError) throw productError;
  
      // Delete existing categories and tags and insert the updated ones
      await supabase.from("product_categories").delete().eq('product_id', productId);
      await supabase.from("product_tags").delete().eq('product_id', productId);
  
      // Inserting new categories related to the product in the product_categories table
      const categoryInserts = chosenCategories.map((categoryId) => ({
        product_id: productId,
        category_id: categoryId,
      }));
      const { error: categoryError } = await supabase.from("product_categories").insert(categoryInserts);
      if (categoryError) throw categoryError;
  
      // Inserting new tags related to the product in the product_tags table
      const tagInserts = chosenTags.map((tagId) => ({
        product_id: productId,
        tag_id: tagId,
      }));
      const { error: tagError } = await supabase.from("product_tags").insert(tagInserts);
      if (tagError) throw tagError;

      // Uploading images to Supabase Storage and inserting to product_images table
      const imageInserts = [];
      for (const { file } of files) {
        const path = `product_images/${productId}/${file.name}`;
        const { error: uploadError } = await supabase.storage
          .from("product-images")
          .upload(path, file);
        if (uploadError) throw uploadError;
        imageInserts.push({ product_id: productId, image_path: path });
      }

      const { error: imageError } = await supabase
        .from("product_images")
        .insert(imageInserts);
      if (imageError) throw imageError;

      router.refresh();

      setOpen(false);
      setLoading(false);

      toast.success("Product edited successfully");
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  }


  

  const handleFileSelected = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFiles((prev) => [...prev, { file, preview: reader.result }]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleOnClosePopover = () => {
    setOpen(false);
    setProductName("");
    setDescription("");
    setChosenCategories([]);
    setChosenTags([]);
    setFiles([]);
  };

  const deleteExistingImage = async (index) => {
    try {
      setExistingImages((prev) => prev.filter((_, i) => i !== index));
      const { error } = await supabase.storage
        .from("product-images")
        .remove([intialProduct.images[index].image_path]);
      if (error) throw error;

      const { error: deleteRecordError } = await supabase
        .from('product_images')
        .delete()
        .eq('id', intialProduct.images[index].id);

      if (deleteRecordError) throw deleteRecordError;
      
    } catch (error) {
      setExistingImages((prev) => [...prev, intialProduct.images[index]]);
      toast.error(error.message);
    }
  }

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
                <Dialog.Panel className="pointer-events-auto w-screen max-w-3xl">
                  <form
                    className="flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl"
                    onSubmit={intialProduct ? handleEdit : handleSubmit}
                  >
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
                                  onChange={(e) =>
                                    setProductName(e.target.value)
                                  }
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
                                  onChange={(e) =>
                                    setDescription(e.target.value)
                                  }
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
                                {intialProduct && intialProduct.images && existingImages.map((photo, index) => (
                                    <div
                                      key={index}
                                      className="relative inline-block h-24 w-24"
                                    >
                                      <Image
                                        src={photo.signedUrl}
                                        alt="Uploaded thumbnail"
                                        className="rounded-md bg-gray-100 object-cover h-24 w-24"
                                        width={96}
                                        height={96}
                                      />
                                      <button type="button" className="absolute top-0 right-0 rounded-tr-md bg-slate-100" onClick={() => deleteExistingImage(index)}  >
                                        <XMarkIcon className="h-6 w-6 text-red-500" />
                                      </button>
                                    </div>
                                  ))}
                                  {files.map((photo, index) => (
                                    <div
                                      key={index}
                                      className="relative inline-block h-24 w-24"
                                    >
                                      <Image
                                        // key={index}
                                        src={photo.preview}
                                        alt="Uploaded thumbnail"
                                        className="rounded-md bg-gray-100 object-cover h-24 w-24"
                                        width={96}
                                        height={96}
                                      />
                                      <button type="button" className="absolute top-0 right-0 rounded-tr-md bg-slate-100" onClick={
                                        () => setFiles((prev) => prev.filter((_, i) => i !== index))
                                      } >
                                        <XMarkIcon className="h-6 w-6 text-red-500" />
                                      </button>
                                    </div>
                                  ))}

                                  <button
                                    type="button"
                                    className="relative inline-flex h-24 w-24 flex-shrink-0 items-center justify-center rounded-md border-2 border-dashed border-gray-200 bg-white text-gray-400 hover:border-gray-300 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                    onClick={() =>
                                      imageUploadRef.current.click()
                                    }
                                  >
                                    <span className="absolute -inset-2" />
                                    <span className="sr-only">
                                      Add new photo
                                    </span>
                                    <PlusIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                    <input
                                      ref={imageUploadRef}
                                      type="file"
                                      name="image"
                                      hidden
                                      onChange={handleFileSelected}
                                      accept="image/*"
                                    />
                                  </button>
                                </div>
                              </div>
                            </div>
                            <div>
                              <h3 className="text-sm -mb-2 font-medium leading-6 text-gray-900">
                                Category
                              </h3>
                              <div className="mt-2">
                                <div className="flex flex-wrap space-x-2">
                                  {categories.map((category, index) => (
                                    <p
                                      key={index}
                                      className={classNames(
                                        chosenCategories.includes(category.id)
                                          ? "bg-indigo-100 text-indigo-700"
                                          : "bg-gray-100 text-gray-900",
                                        "px-2 py-1 mr-2 mt-2 border border-gray-300 rounded cursor-pointer"
                                      )}
                                      onClick={
                                        chosenCategories.includes(category.id)
                                          ? () =>
                                              setChosenCategories((prev) =>
                                                prev.filter(
                                                  (chosenCategory) =>
                                                    chosenCategory !==
                                                    category.id
                                                )
                                              )
                                          : () =>
                                              setChosenCategories((prev) => [
                                                ...prev,
                                                category.id,
                                              ])
                                      }
                                    >
                                      {category.name}
                                    </p>
                                  ))}
                                  <button
                                    type="button"
                                    onClick={() =>
                                      setIsAddNewCategoryOpen(true)
                                    }
                                    className="relative inline-flex h-8 w-8 mt-2 flex-shrink-0 items-center justify-center rounded-full border-2 border-dashed border-gray-200 bg-white text-gray-400 hover:border-gray-300 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
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
                              <h3 className="text-sm -mb-2 font-medium leading-6 text-gray-900">
                                Tags
                              </h3>
                              <div className="mt-2">
                                <div className="flex flex-wrap space-x-2">
                                  {tags.map((tag, index) => (
                                    <p
                                      key={index}
                                      className={classNames(
                                        chosenTags.includes(tag.id)
                                          ? "bg-indigo-100 text-indigo-700"
                                          : "bg-gray-100 text-gray-900",
                                        "px-2 py-1 mr-2 mt-2 border border-gray-300 rounded cursor-pointer"
                                      )}
                                      onClick={
                                        chosenTags.includes(tag.id)
                                          ? () =>
                                              setChosenTags((prev) =>
                                                prev.filter(
                                                  (chosenTag) =>
                                                    chosenTag !== tag.id
                                                )
                                              )
                                          : () =>
                                              setChosenTags((prev) => [
                                                ...prev,
                                                tag.id,
                                              ])
                                      }
                                    >
                                      {tag.name}
                                    </p>
                                  ))}
                                  <button
                                    type="button"
                                    onClick={() => setIsAddNewTagOpen(true)}
                                    className="relative inline-flex h-8 w-8 mt-2 flex-shrink-0 items-center justify-center rounded-full border-2 border-dashed border-gray-200 bg-white text-gray-400 hover:border-gray-300 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
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
                                      value="public"
                                      checked={selectedOption === "public"}
                                      onChange={() => setSelectedOption("public")}
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
                                        id="privacy-draft"
                                        name="privacy"
                                        aria-describedby="privacy-draft-description"
                                        type="radio"
                                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                        value="draft"
                                        checked={
                                          selectedOption === "draft"
                                        }
                                        onChange={() =>
                                          setSelectedOption("draft")
                                        }
                                      />
                                    </div>
                                    <div className="pl-7 text-sm leading-6">
                                      <label
                                        htmlFor="privacy-draft"
                                        className="font-medium text-gray-900"
                                      >
                                        Draft
                                      </label>
                                      <p
                                        id="privacy-draft-description"
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
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-shrink-0 justify-end px-4 py-4">
                      <button
                        disabled={loading}
                        type="button"
                        className="rounded-md disabled:bg-gray-200 bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                        onClick={handleOnClosePopover}
                      >
                        Cancel
                      </button>
                      <button
                        disabled={loading}
                        type="submit"
                        className="ml-4 disabled:bg-gray-200 inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Save
                      </button>
                    </div>
                  </form>
                  <SecondPopover
                    isCategory
                    open={isAddNewCategoryOpen}
                    setOpen={setIsAddNewCategoryOpen}
                    categories={categories.filter(category => category.parent_category == null)}
                    setCategories={setCategories}
                  />
                  <SecondPopover
                    isTag
                    open={isAddNewTagOpen}
                    setOpen={setIsAddNewTagOpen}
                    setTags={setTags}
                  />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

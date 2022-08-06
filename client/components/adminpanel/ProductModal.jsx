import React from "react";
import { useCategoryContext } from "../../contexts/categoryContext";
import { useProductsContext } from "../../contexts/productsContext";
import { useForm } from "react-hook-form";

function ProductModal({ setOpenModal }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const {
    name,
    price,
    category,
    image,
    setName,
    setPrice,
    setCategory,
    setImage,
    Editing,
    postProduct,
    editProduct,
    CUID,
  } = useProductsContext();
  const { categoryData } = useCategoryContext();

  const inputValidator = (fieldName) => {
    return { ...register(fieldName, { required: `${fieldName} is required` }) };
  };

  const submitHandler = handleSubmit(() => {
    Editing
      ? editProduct(CUID, name, price, category, image.target.files[0])
      : postProduct(name, price, category, image.target.files[0]);
  });

  return (
    <div className="flex bg-black bg-opacity-20 justify-center items-center overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-full">
      <div className="relative p-4 w-full max-w-5xl h-full md:h-auto">
        <div className="relative bg-white rounded-lg shadow-lg dark:bg-gray-800">
          <button
            onClick={() => setOpenModal(false)}
            type="button"
            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
          >
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="sr-only">Close modal</span>
          </button>

          <div className="py-6 px-6 lg:px-8">
            <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
              Add Product
            </h3>
            <form className="space-y-6" onSubmit={submitHandler}>
              <div className="grid gap-6 mb-6 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="first_name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Prodcut Name
                  </label>
                  <input
                  {...inputValidator("productName")}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                  />
                    {errors?.productName?.message && (
                      <p className=" text-red-400 font-extralight mt-1">
                        {errors?.productName?.message}
                      </p>
                    )}
                </div>

                <div>
                  <label
                    htmlFor="price"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Price
                  </label>
                  <input
                  {...inputValidator("price")}
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    type="number"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                    required
                  />
                    {errors?.price?.message && (
                      <p className=" text-red-400 font-extralight mt-1">
                        {errors?.price?.message}
                      </p>
                    )}
                </div>

                <div>
                  <label
                    htmlFor="category"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Category
                  </label>
                  <select
                  {...inputValidator("category")}
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="Select a category"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                  >
                    <option hidden>Chose a category</option>
                    {categoryData?.map((category) => {
                      return (
                        <option
                          key={category.cuid}
                          className="capitalize"
                          value={category.name}
                        >
                          {category.name}
                        </option>
                      );
                    })}
                  </select>
                  {errors?.category?.message && (
                      <p className=" text-red-400 font-extralight mt-1">
                        {errors?.category?.message}
                      </p>
                    )}
                </div>

                <div>
                  <label
                    htmlFor="image"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Image
                  </label>
                  <input
                  {...inputValidator("image")}
                    onChange={(image) => setImage(image)}
                    name="image"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                    type="file"
                  />
                    {errors?.image?.message && (
                      <p className=" text-red-400 font-extralight mt-1">
                        {errors?.image?.message}
                      </p>
                    )}
                </div>
              </div>

              {!Editing ? (
                <button
                  type="submit"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                >
                  Add
                </button>
              ) : (
                <button
                  type="submit"
                  className="bg-gray-300 border border-gray-500 text-gray-900 text-sm rounded-lg w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                >
                  Edit
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductModal;

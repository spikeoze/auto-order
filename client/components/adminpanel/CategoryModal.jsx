import React from "react";
import { useCategoryContext } from "../../contexts/categoryContext";
import CreatableSelect from "react-select/creatable";
import { useForm } from "react-hook-form";
function CategoryModal({ setOpenModal }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const {
    postCategory,
    editCategory,
    Editing,
    CUID,
    setCategoryName,
    CategoryName,
    SubCategoryName,
    setSubCategoryName,
    postSubCategory,
    categoryData,
  } = useCategoryContext();

  console.log(errors);

  const categoryList = categoryData?.map((category) => {
    return { value: category.name, label: category.name };
  });

  const inputValidator = (fieldName) => {
    return { ...register(fieldName, { required: `${fieldName} is required` }) };
  };

  const submitHandler = handleSubmit(() => {
    Editing
      ? editCategory(CUID, CategoryName)
      : postSubCategory(CategoryName?.value, SubCategoryName);
  });

  return (
    <div className="flex bg-black bg-opacity-20 justify-center items-center overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-full">
      <div className="relative p-4 w-full max-w-xl h-full md:h-auto">
        <div className="relative bg-white rounded-lg shadow-lg dark:bg-gray-800">
          <button
            onClick={() => {
              setOpenModal(false);
              setCategoryName("");
              setSubCategoryName("");
            }}
            type="button"
            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
          >
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fillRule="currentColor"
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
              Add Category
            </h3>
            <form className="space-y-6" onSubmit={submitHandler}>
              <div className="grid gap-6 mb-6 md:grid-cols-1">
                <div>
                  <label
                    htmlFor="category"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Category
                  </label>

                  {!Editing ? (
                    <CreatableSelect
                      // {...inputValidator("category")}

                      isClearable
                      value={CategoryName}
                      options={categoryList}
                      onChange={(category) => setCategoryName(category)}
                      onCreateOption={(category) => postCategory(category)}
                    />
                  ) : (
                    <input
                      placeholder="Sub-category Name"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                      value={CategoryName}
                      onChange={(e) => setCategoryName(e.target.value)}
                    />
                  )}
                </div>

                {!Editing && (
                  <div>
                    <label
                      htmlFor="first_name"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Sub-category
                    </label>
                    <input
                      {...inputValidator("sub_category")}
                      type="text"
                      value={SubCategoryName}
                      onChange={(e) => setSubCategoryName(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                    />
                    {errors?.sub_category?.message && (
                      <p className=" text-red-400 font-extralight mt-1">
                        {errors?.sub_category.message}
                      </p>
                    )}
                  </div>
                )}
              </div>

              {!Editing ? (
                <button
                  type="submit"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                >
                  Add
                </button>
              ) : (
                <button
                  type="submit"
                  className="bg-gray-300 border border-gray-500 text-gray-900 text-sm rounded-lg w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
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

export default CategoryModal;

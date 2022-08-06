import React, { useState } from "react";
import CategoryModal from "../../components/adminpanel/CategoryModal";
import AdminpanelLayout from "../../components/layouts/AdminpanelLayout";
import { useCategoryContext } from "../../contexts/categoryContext";
import { BiTrashAlt, BiPencil, BiCog } from "react-icons/bi";

function Category() {
  const {
    categoryData,
    deleteCategory,
    editHandler,
    editCategory,
    openModal,
    setOpenModal,
  } = useCategoryContext();

  const rows = categoryData?.map((category) => (
    <tr
      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
      key={category.cuid}
    >
      <td className="py-8 px-6 whitespace-nowrap ">
        <BiTrashAlt
          className="text-red-400 hover:bg-red-300 text-2xl rounded-md"
          onClick={() => deleteCategory(category.cuid)}
        />
      </td>
      <td className="py-8 px-6 text-2xl capitalize  text-gray-500 whitespace-nowrap dark:text-gray-400">
        {category.name}
      </td>
      <td className="py-8 px-6 font-medium whitespace-nowrap ">
        <BiPencil
          className="text-blue-300 hover:bg-blue-100 text-2xl rounded-md"
          onClick={() => editHandler(category.cuid, category.name)}
        />
      </td>
    </tr>
  ));

  return (
    <AdminpanelLayout>
      {openModal && <CategoryModal setOpenModal={setOpenModal} />}
      <div className="max-w-7xl mx-auto  flex-col flex justify-center p-5 space-y-3">
        <div className="flex justify-end">
          <button
            onClick={() => setOpenModal(true)}
            className="shadow-md border border-gray-800 dark:border-neutral-400 dark:text-gray-400 rounded-sm px-3 py-1"
          >
            Add Category
          </button>
        </div>

        <div className="overflow-x-auto relative shadow-lg rounded-sm border border-gray-300 dark:border-gray-600">
          <table className="w-full sm:text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-lg text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="py-3 px-6">
                  <BiTrashAlt className="text-red-400 text-2xl" />
                </th>
                <th scope="col" className="py-3 px-6">
                  Category Name
                </th>
                <th scope="col" className="py-3 px-6">
                  <BiPencil className="text-blue-300 text-2xl" />
                </th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </table>
        </div>
      </div>
    </AdminpanelLayout>
  );
}

export default Category;

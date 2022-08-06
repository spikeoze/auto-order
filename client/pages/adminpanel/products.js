import React, { useState } from "react";
import Image from "next/image";
import ProductModal from "../../components/adminpanel/ProductModal";
import AdminpanelLayout from "../../components/layouts/AdminpanelLayout";
import { useProductsContext } from "../../contexts/productsContext";
import currency from "currency.js";
import { BiTrashAlt, BiPencil, BiCog } from "react-icons/bi";

function Products() {
  const { openModal, setOpenModal, productsData, deleteProduct, editHandler } =
    useProductsContext();

  const rows = productsData?.map((product) => (
    <tr
      key={product.cuid}
      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
    >
      <td className="py-4 px-6 whitespace-nowrap">
        <BiTrashAlt
          className="text-red-400 hover:bg-red-300 text-2xl rounded-md"
          onClick={() => deleteProduct(product.cuid)}
        />
      </td>
      <td className="text-xl capitalize  py-4 px-6 whitespace-nowrap ">
        {product.name}
      </td>
      <td className="py-4 px-6 text-xl capitalize   whitespace-nowrap ">
        {currency(product.price, { precision: 2 }).format()}
      </td>
      <td className="py-4 px-6 text-xl capitalize   whitespace-nowrap ">
        {product.category.name}
        {product.category.parent ? ` / ${product.category.parent.name}` : ""}
      </td>
      <td className="py-4 px-6 whitespace-nowrap">
        <Image
          width="100"
          height="70"
          className="rounded-md "
          style={{ cursor: "pointer" }}
          src={`data:${product.image_type};base64,${product.image_data}`}
          alt={product.image_name}
          layout="responsive"
        />
      </td>
      <td className="py-4 px-6 whitespace-nowrap ">
        <BiPencil
          className="text-blue-300 hover:bg-blue-100 text-2xl rounded-md"
          onClick={() => {
            editHandler(
              product.cuid,
              product.name,
              product.category.name,
              currency(product.price)
            );
          }}
        />
      </td>
    </tr>
  ));

  return (
    <AdminpanelLayout>
      {openModal && <ProductModal setOpenModal={setOpenModal} />}
      <div className="max-w-7xl mx-auto  flex-col flex justify-center p-5 space-y-3">
        <div className="flex justify-end">
          <button
            onClick={() => setOpenModal(true)}
            className="shadow-md border border-gray-800 dark:border-neutral-400 dark:text-gray-400 rounded-sm px-3 py-1"
          >
            Add Product
          </button>
        </div>

        <div className="overflow-x-auto relative shadow-lg rounded-sm border border-gray-300 dark:border-gray-600">
          <table className="sm:w-full sm:text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="py-3 px-6">
                  <BiTrashAlt className="text-red-400 text-2xl" />
                </th>
                <th scope="col" className="py-3 px-6 text-lg md:text-xl">
                  Name
                </th>
                <th scope="col" className="py-3 px-6 text-lg md:text-xl">
                  Price
                </th>
                <th scope="col" className="py-3 px-6 text-lg md:text-xl">
                  Category
                </th>
                <th scope="col" className="py-3 px-6 text-lg md:text-xl">
                  Image
                </th>
                <th scope="col" className="py-3 px-6 text-lg md:text-xl">
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

export default Products;

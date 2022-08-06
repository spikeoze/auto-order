import React, { useState, useContext } from "react";
const CategoryContext = React.createContext();
import axios from "axios";
import useSWR from "swr";

const fetcher = (url) => axios.get(url).then((res) => res.data);

const CategoryProvider = ({ children }) => {
  const [openModal, setOpenModal] = React.useState(false);
  const [CategoryName, setCategoryName] = React.useState("");
  const [SubCategoryName, setSubCategoryName] = React.useState("");
  const [CUID, setCUID] = React.useState("");
  const [Editing, setEditing] = React.useState(false);

  const { data, error } = useSWR(
    "http://localhost:8080/adminpanel/category",
    fetcher,
    { refreshInterval: 100 }
  );

  const postCategory = async (name) => {
    if (!name) console.log("Name is required");
    axios.post("http://localhost:8080/adminpanel/category", { name });
    // console.log(name);
    setCategoryName("");
    // setSubCategoryName("")
    // setOpenModal(false);
  };

  const postSubCategory = async (name, subCategory) => {
    if (!name) console.log("Name is required");
    axios.post("http://localhost:8080/adminpanel/category", {
      name,
      subCategory,
    });
    setCategoryName("");
    setSubCategoryName("");
    setOpenModal(false);
  };

  const editHandler = (cuid, name) => {
    setCUID(cuid);
    setCategoryName(name);
    setEditing(true);
    setOpenModal(true);
  };

  const editCategory = async (cuid, name) => {
    axios.put(`http://localhost:8080/adminpanel/category/${cuid}`, {
      name,
    });
    setCategoryName("");
    setOpenModal(false);
    setEditing(false);
  };

  const deleteCategory = async (cuid) => {
    axios
      .delete(`http://localhost:8080/adminpanel/category/${cuid}`)
      .catch((err) => console.log("cannot delete category in use", err));
  };

  return (
    <CategoryContext.Provider
      value={{
        postCategory,
        editHandler,
        editCategory,
        deleteCategory,
        Editing,
        setEditing,
        CUID,
        setCategoryName,
        CategoryName,
        SubCategoryName,
        setSubCategoryName,
        postSubCategory,
        openModal,
        setOpenModal,
        categoryData: data,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategoryContext = () => {
  return useContext(CategoryContext);
};

export { CategoryContext, CategoryProvider };

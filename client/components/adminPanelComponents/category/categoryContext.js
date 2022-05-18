import React, { useState, useContext } from "react";
const CategoryContext = React.createContext();
import axios from "axios";

const CategoryProvider = ({ children }) => {
  const [formOpened, setFormOpened] = React.useState(false);
  const [CategoryName, setCategoryName] = React.useState("");
  const [CUID, setCUID] = React.useState("");
  const [Editing, setEditing] = React.useState(false);

  const postCategory = async (name) => {
    if (!CategoryName) console.log("Name is required");
    axios.post("http://localhost:8080/adminpanel/category", { name });
    setCategoryName("");
    setFormOpened(false);
  };

  const editHandler = (cuid, name) => {
    setCUID(cuid);
    setCategoryName(name);
    setEditing(true);
    setFormOpened(true);
  };

  const editCategory = async (cuid, name) => {
    axios.put(`http://localhost:8080/adminpanel/category/${cuid}`, {
      name,
    });
    setCategoryName("");
    setFormOpened(false);
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
        formOpened,
        setFormOpened,
        Editing,
        setEditing,
        CUID,
        setCategoryName,
        CategoryName,
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

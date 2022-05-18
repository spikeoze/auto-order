import React, { useState, useContext } from "react";
import { CategoryContext } from "./adminPanelComponents/category/categoryContext";
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [ProductsList, setProductsList] = useState(true);
  const [CategoryList, setCategoryList] = useState(false);

  const openProductsList = () => {
    setCategoryList(false);
    setProductsList(true);
  };

  const openCategoryList = () => {
    setCategoryList(true);
    setProductsList(false);
  };

  return (
    <AppContext.Provider
      value={{
        ProductsList,
        CategoryList,
        setProductsList,
        setCategoryList,
        openProductsList,
        openCategoryList,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };

import React, { useState, useContext } from "react";
const AppContext = React.createContext();
import axios from "axios";

const fetcher = (url) => axios.get(url).then((res) => res.data);

const AppProvider = ({ children }) => {
  return <AppContext.Provider>{children}</AppContext.Provider>;
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { useGlobalContext, AppProvider, AppContext };

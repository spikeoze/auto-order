import React, { useState, useContext } from "react";
const ProductsContext = React.createContext();
import axios from "axios";
import FormData from "form-data";
import useSWR from "swr";

const fetcher = (url) => axios.get(url).then((res) => res.data);

const ProductsProvider = ({ children }) => {
  const [name, setName] = React.useState("");
  const [price, setPrice] = React.useState(0);
  const [image, setImage] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [CUID, setCUID] = React.useState("");
  // const [Checked, setChecked] = React.useState([]);
  const [Editing, setEditing] = React.useState(false);
  const [opened, setOpened] = React.useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [modalImgData, setModalImgData] = React.useState(null);

  const { data, error } = useSWR(
    "http://localhost:8080/adminpanel/products",
    fetcher,
    { refreshInterval: 100 }
  );

  const postProduct = async (name, price, category, image) => {
    const data = new FormData();

    data.append("name", name);
    data.append("price", price);
    data.append("category", category);
    data.append("image", image);

    axios.post("http://localhost:8080/adminpanel/products", data, {
      header: {
        "Content-Type": "multipart/form-data",
      },
    });
    setName("");
    setCategory("");
    setPrice(0);
    setImage("");
    setOpenModal(false);
  };

  const deleteProduct = async (cuid) => {
    axios.delete(`http://localhost:8080/adminpanel/products/${cuid}`);
  };

  const editHandler = (cuid, name, category, price) => {
    setCUID(cuid);
    setName(name);
    setPrice(price.value);
    setCategory(category);
    setEditing(true);
    setOpenModal(true)
    // scrollTo({ y: 0 });
  };

  // const cancelEdit = () => {
  //   setEditing(false);
  //   setName("");
  //   setCategory("");
  //   setPrice(0);
  //   setFormOpened(false);
  // };

  const editProduct = async (cuid, name, price, category, image) => {
    const data = new FormData();

    data.append("name", name);
    data.append("price", price);
    data.append("category", category);
    data.append("image", image);

    axios.put(`http://localhost:8080/adminpanel/products/${cuid}`, data, {
      header: {
        "Content-Type": "multipart/form-data",
      },
    });
    setEditing(false);
    setName("");
    setCategory("");
    setPrice(0);
    setOpenModal(false);
  };

  const handleModal = (type, data, name) => {
    const imgData = {
      type,
      data,
      name,
    };
    setOpened(true);
    setModalImgData(imgData);
  };
  // const getCuid = (cuid) => {
  //   setChecked((prevcheck)=> [...prevcheck, cuid]);
  // }

  return (
    <ProductsContext.Provider
      value={{
        postProduct,
        editHandler,
        editProduct,
        deleteProduct,
        handleModal,
        name,
        price,
        category,
        CUID,
        opened,
        openModal,
        setOpenModal,
        Editing,
        image,
        modalImgData,
        setEditing,
        setName,
        setPrice,
        setCategory,
        setImage,
        setOpened,
        setModalImgData,
        productsData: data,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export const useProductsContext = () => {
  return useContext(ProductsContext);
};

export { ProductsContext, ProductsProvider };

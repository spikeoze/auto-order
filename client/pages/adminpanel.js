import React from "react";
import Products from "../components/adminPanelComponents/products/Products";
import Category from "../components/adminPanelComponents/category/Category";
import { useGlobalContext } from "../components/context";
import useSWR from "swr";
import axios from "axios";
import { Loader } from "@mantine/core";
import Layout from "../components/Layout";

const fetcher = (url) => axios.get(url).then((res) => res.data);
function adminpanel() {
  const { ProductsList, CategoryList } = useGlobalContext();
  const { data, error } = useSWR(
    "http://localhost:8080/adminpanel/category",
    fetcher,
    { refreshInterval: 500 }
  );

  if (!data)
    return (
      <div
        style={{
          display: "flex",
          position:"relative",
          top:"20rem",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Loader size="xl" />
      </div>
    );

  return (
    <Layout>
      {ProductsList && <Products categories={data} />}
      {CategoryList && <Category categories={data} />}
    </Layout>
  );
}

export default adminpanel;

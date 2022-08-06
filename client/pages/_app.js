import Layout from "../components/layouts/Layout";
import "../styles/globals.css";
import { AppProvider } from "../contexts/globalContext";
import { CategoryProvider } from "../contexts/categoryContext";
import { ProductsProvider } from "../contexts/productsContext";

import NProgress from "nprogress";
import Router from "next/router";

function MyApp({ Component, pageProps }) {
  NProgress.configure({ showSpinner: false });

  Router.events.on("routeChangeStart", () => {
    NProgress.start();
  });

  Router.events.on("routeChangeComplete", () => {
    NProgress.done();
  });
  return (
    <Layout>
      {/* <AppProvider> */}
      <ProductsProvider>
        <CategoryProvider>
          <Component {...pageProps} />
        </CategoryProvider>
      </ProductsProvider>
      {/* </AppProvider> */}
    </Layout>
  );
}

export default MyApp;

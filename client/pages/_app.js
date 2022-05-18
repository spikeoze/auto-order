import "../styles/globals.css";
import Layout from "../components/Layout";
import { AppProvider } from "../components/context";
import { CategoryProvider } from "../components/adminPanelComponents/category/categoryContext";
import { ProductsProvider } from "../components/adminPanelComponents/products/productsContext";
function MyApp({ Component, pageProps }) {
  return (
    <AppProvider>
      <ProductsProvider>
        <CategoryProvider>
          <Component {...pageProps} />
        </CategoryProvider>
      </ProductsProvider>
    </AppProvider>
  );
}

export default MyApp;

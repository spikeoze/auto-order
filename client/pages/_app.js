import "../styles/globals.css";
import Layout from "../components/Layout";
import { AppProvider } from "../components/context";
import { CategoryProvider } from "../components/adminPanelComponents/category/categoryContext";

function MyApp({ Component, pageProps }) {
  return (
    <AppProvider>
      <CategoryProvider>
        <Component {...pageProps} />
      </CategoryProvider>
    </AppProvider>
  );
}

export default MyApp;

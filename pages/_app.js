import "../styles/globals.css";
import { CartProvider } from "../components/CartContext";
import { ProductCatalogProvider } from "../components/ProductCatalogContext";
import Layout from "../components/Layout";

export default function App({ Component, pageProps }) {
  return (
    <ProductCatalogProvider>
      <CartProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </CartProvider>
    </ProductCatalogProvider>
  );
}
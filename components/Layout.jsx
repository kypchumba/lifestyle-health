import CartDrawer from "./CartDrawer";
import FloatingShopButton from "./FloatingShopButton";
import Footer from "./Footer";
import Navbar from "./Navbar";

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
      <FloatingShopButton />
      <CartDrawer />
    </>
  );
}

import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cartHistoryRef = useRef(false);

  function pushCartHistory() {
    if (typeof window === "undefined" || cartHistoryRef.current) {
      return;
    }

    window.history.pushState(
      { ...(window.history.state || {}), wellnessCartOpen: true },
      "",
      window.location.href
    );
    cartHistoryRef.current = true;
  }

  function openCart() {
    pushCartHistory();
    setIsCartOpen(true);
  }

  function closeCart() {
    setIsCartOpen(false);

    if (typeof window !== "undefined" && cartHistoryRef.current) {
      cartHistoryRef.current = false;
      window.history.back();
    }
  }

  function addToCart(product, quantity = 1) {
    setCart((currentCart) => {
      const existingItem = currentCart.find((item) => item.id === product.id);

      if (existingItem) {
        return currentCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }

      return [...currentCart, { ...product, quantity }];
    });
    openCart();
  }

  function updateQuantity(productId, quantity) {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart((currentCart) =>
      currentCart.map((item) => (item.id === productId ? { ...item, quantity } : item))
    );
  }

  function removeFromCart(productId) {
    setCart((currentCart) => currentCart.filter((item) => item.id !== productId));
  }

  function clearCart() {
    setCart([]);
  }

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    function handlePopState(event) {
      if (event.state?.wellnessCartOpen) {
        cartHistoryRef.current = true;
        setIsCartOpen(true);
        return;
      }

      if (cartHistoryRef.current) {
        cartHistoryRef.current = false;
        setIsCartOpen(false);
      }
    }

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  const subtotal = useMemo(
    () => cart.reduce((total, item) => total + item.price * item.quantity, 0),
    [cart]
  );

  const itemCount = useMemo(
    () => cart.reduce((total, item) => total + item.quantity, 0),
    [cart]
  );

  const value = {
    cart,
    subtotal,
    itemCount,
    isCartOpen,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    openCart,
    closeCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
}

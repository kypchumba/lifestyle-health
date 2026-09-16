import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { newProducts as defaultNewProducts, products as defaultProducts } from "../data/products";

const ProductCatalogContext = createContext(null);
const STORAGE_KEY = "wellness-product-catalog-v1";
export const ADMIN_TOKEN_KEY = "wellness-admin-token";
const LOCAL_API_HOSTS = new Set(["localhost", "127.0.0.1", "0.0.0.0", "::1", "[::1]"]);
export const API_BASE_URL = normalizeApiBaseUrl(process.env.NEXT_PUBLIC_API_BASE_URL);

const defaultNewArrivalIds = defaultNewProducts.map((product) => product.id);

function normalizeApiBaseUrl(value) {
  return String(value || "")
    .trim()
    .replace(/\/+$/, "");
}

function getConfiguredApiUrl() {
  if (!API_BASE_URL) {
    return null;
  }

  try {
    const url = new URL(API_BASE_URL);

    if (!["http:", "https:"].includes(url.protocol)) {
      return null;
    }

    return url;
  } catch (_error) {
    return null;
  }
}

function isLocalApiUrl(url) {
  return LOCAL_API_HOSTS.has(url.hostname);
}

function isBrowserOnLocalhost() {
  if (typeof window === "undefined") {
    return false;
  }

  return LOCAL_API_HOSTS.has(window.location.hostname);
}

function canUsePublicCatalogApi() {
  const apiUrl = getConfiguredApiUrl();

  return Boolean(apiUrl && !isLocalApiUrl(apiUrl));
}

function canUseAdminCatalogApi() {
  if (typeof window === "undefined" || !window.location.pathname.startsWith("/admin")) {
    return false;
  }

  return canUseConfiguredApi({ allowLocalhost: true });
}

export function canUseConfiguredApi({ allowLocalhost = false } = {}) {
  const apiUrl = getConfiguredApiUrl();

  if (!apiUrl) {
    return false;
  }

  if (!isLocalApiUrl(apiUrl)) {
    return true;
  }

  return allowLocalhost && isBrowserOnLocalhost();
}

export function getApiRequestUrl(path, { allowLocalhost = false } = {}) {
  if (!canUseConfiguredApi({ allowLocalhost })) {
    return "";
  }

  return `${API_BASE_URL}${path}`;
}

function cleanProduct(product) {
  const price = Number(product.price) || 0;
  const oldPrice = Number(product.oldPrice) || 0;

  return {
    id: product.id,
    name: product.name || "Untitled product",
    price,
    oldPrice,
    image: product.image || "/stock.jpg",
    category: product.category || "Herbs",
    description: product.description || "",
  };
}

function buildInitialCatalog() {
  return {
    products: defaultProducts.map(cleanProduct),
    newArrivalIds: defaultNewArrivalIds,
  };
}

function removeDuplicateProducts(products) {
  const seen = new Set();

  return products.filter((product) => {
    if (seen.has(product.id)) {
      return false;
    }

    seen.add(product.id);
    return true;
  });
}

function normalizeCatalog(catalog) {
  const products = Array.isArray(catalog?.products)
    ? removeDuplicateProducts(catalog.products.map(cleanProduct))
    : defaultProducts.map(cleanProduct);
  const productIds = products.map((product) => product.id);
  const newArrivalIds = Array.isArray(catalog?.newArrivalIds)
    ? catalog.newArrivalIds.filter((id) => productIds.includes(id))
    : defaultNewArrivalIds;

  return {
    products,
    newArrivalIds: [...new Set(newArrivalIds)],
  };
}

function readStoredCatalog() {
  try {
    const savedCatalog = window.localStorage.getItem(STORAGE_KEY);

    if (!savedCatalog) {
      return buildInitialCatalog();
    }

    return normalizeCatalog(JSON.parse(savedCatalog));
  } catch (error) {
    console.error("Unable to load saved product catalog", error);
    return buildInitialCatalog();
  }
}

async function fetchJson(path, options = {}, config = {}) {
  const requestUrl = getApiRequestUrl(path, config);

  if (!requestUrl) {
    throw new Error("API base URL is not configured for this environment.");
  }

  const response = await fetch(requestUrl, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  if (!response.ok) {
    let message = `Request failed with status ${response.status}`;

    try {
      const errorPayload = await response.json();
      message = errorPayload.detail || message;
    } catch (_error) {
      // Keep the status message when the API did not return JSON.
    }

    throw new Error(message);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

function getAdminToken() {
  if (typeof window === "undefined") {
    return "";
  }

  return window.sessionStorage.getItem(ADMIN_TOKEN_KEY) || "";
}

export function createProductId(name, existingIds = []) {
  const baseId = String(name || "product")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "product";

  let productId = baseId;
  let counter = 2;

  while (existingIds.includes(productId)) {
    productId = `${baseId}-${counter}`;
    counter += 1;
  }

  return productId;
}

export function ProductCatalogProvider({ children }) {
  const [catalog, setCatalog] = useState(buildInitialCatalog);
  const [isCatalogReady, setIsCatalogReady] = useState(false);
  const [backendStatus, setBackendStatus] = useState("checking");
  const [catalogMessage, setCatalogMessage] = useState("");

  useEffect(() => {
    let isCurrent = true;

    async function loadCatalog() {
      const storedCatalog = readStoredCatalog();

      if (isCurrent) {
        setCatalog(storedCatalog);
      }

      const allowLocalhostCatalogApi = canUseAdminCatalogApi();
      const shouldFetchApiCatalog = canUsePublicCatalogApi() || allowLocalhostCatalogApi;

      if (!shouldFetchApiCatalog) {
        if (isCurrent) {
          setBackendStatus("offline");
          setCatalogMessage("Using bundled and browser-saved catalog data.");
          setIsCatalogReady(true);
        }

        return;
      }

      try {
        const apiCatalog = await fetchJson("/api/catalog", {}, {
          allowLocalhost: allowLocalhostCatalogApi,
        });

        if (!isCurrent) {
          return;
        }

        setCatalog(normalizeCatalog(apiCatalog));
        setBackendStatus("connected");
        setCatalogMessage("Connected to FastAPI and PostgreSQL.");
      } catch (error) {
        if (!isCurrent) {
          return;
        }

        setBackendStatus("offline");
        setCatalogMessage("Backend unavailable, using browser storage fallback.");
      } finally {
        if (isCurrent) {
          setIsCatalogReady(true);
        }
      }
    }

    loadCatalog();

    return () => {
      isCurrent = false;
    };
  }, []);

  useEffect(() => {
    if (!isCatalogReady) {
      return;
    }

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(catalog));

    if (backendStatus !== "connected") {
      return;
    }

    const token = getAdminToken();

    if (!token) {
      return;
    }

    fetchJson("/api/catalog", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(catalog),
    }, {
      allowLocalhost: true,
    })
      .then((savedCatalog) => {
        if (savedCatalog) {
          setCatalogMessage("Catalog saved to PostgreSQL.");
        }
      })
      .catch((error) => {
        console.error("Unable to save catalog to backend", error);
        setCatalogMessage("Could not save to backend. Changes are still saved in this browser.");
      });
  }, [catalog, isCatalogReady, backendStatus]);

  const newProducts = useMemo(() => {
    return catalog.newArrivalIds
      .map((productId) => catalog.products.find((product) => product.id === productId))
      .filter(Boolean);
  }, [catalog.newArrivalIds, catalog.products]);

  function saveProduct(product, originalId = product.id) {
    setCatalog((currentCatalog) => {
      const cleanedProduct = cleanProduct(product);
      const productExists = currentCatalog.products.some((item) => item.id === originalId);
      const nextProducts = productExists
        ? currentCatalog.products.map((item) => (item.id === originalId ? cleanedProduct : item))
        : [...currentCatalog.products, cleanedProduct];
      const nextNewArrivalIds = currentCatalog.newArrivalIds.map((productId) =>
        productId === originalId ? cleanedProduct.id : productId
      );

      return {
        products: removeDuplicateProducts(nextProducts),
        newArrivalIds: [...new Set(nextNewArrivalIds)],
      };
    });
  }

  function deleteProduct(productId) {
    const token = getAdminToken();

    if (backendStatus === "connected" && token) {
      fetchJson(`/api/products/${encodeURIComponent(productId)}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }, {
        allowLocalhost: true,
      })
        .then(() => {
          setCatalogMessage("Product removed from PostgreSQL.");
        })
        .catch((error) => {
          console.error("Unable to delete product from backend", error);
          setCatalogMessage("Could not delete from backend. Local catalog was updated.");
        });
    }

    setCatalog((currentCatalog) => ({
      products: currentCatalog.products.filter((product) => product.id !== productId),
      newArrivalIds: currentCatalog.newArrivalIds.filter((id) => id !== productId),
    }));
  }

  function toggleNewArrival(productId) {
    setCatalog((currentCatalog) => {
      const isNewArrival = currentCatalog.newArrivalIds.includes(productId);

      return {
        products: currentCatalog.products,
        newArrivalIds: isNewArrival
          ? currentCatalog.newArrivalIds.filter((id) => id !== productId)
          : [...currentCatalog.newArrivalIds, productId],
      };
    });
  }

  function moveNewArrival(productId, direction) {
    setCatalog((currentCatalog) => {
      const currentIndex = currentCatalog.newArrivalIds.indexOf(productId);

      if (currentIndex < 0) {
        return currentCatalog;
      }

      const nextIndex = currentIndex + direction;

      if (nextIndex < 0 || nextIndex >= currentCatalog.newArrivalIds.length) {
        return currentCatalog;
      }

      const nextNewArrivalIds = [...currentCatalog.newArrivalIds];
      [nextNewArrivalIds[currentIndex], nextNewArrivalIds[nextIndex]] = [
        nextNewArrivalIds[nextIndex],
        nextNewArrivalIds[currentIndex],
      ];

      return {
        products: currentCatalog.products,
        newArrivalIds: nextNewArrivalIds,
      };
    });
  }

  function resetCatalog() {
    setCatalog(buildInitialCatalog());
  }

  const value = {
    products: catalog.products,
    newProducts,
    newArrivalIds: catalog.newArrivalIds,
    isCatalogReady,
    backendStatus,
    catalogMessage,
    saveProduct,
    deleteProduct,
    toggleNewArrival,
    moveNewArrival,
    resetCatalog,
  };

  return <ProductCatalogContext.Provider value={value}>{children}</ProductCatalogContext.Provider>;
}

export function useProductCatalog() {
  const context = useContext(ProductCatalogContext);

  if (!context) {
    throw new Error("useProductCatalog must be used inside ProductCatalogProvider");
  }

  return context;
}

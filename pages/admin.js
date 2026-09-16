import Head from "next/head";
import { useEffect, useMemo, useState } from "react";
import Button from "../components/Button";
import SectionWrapper from "../components/SectionWrapper";
import { ADMIN_TOKEN_KEY, createProductId, getApiRequestUrl, useProductCatalog } from "../components/ProductCatalogContext";
import { categories, formatCurrency } from "../data/products";

const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "wellness2026";
const SESSION_KEY = "wellness-admin-session";

function emptyProduct(existingIds) {
  return {
    id: createProductId("new-product", existingIds),
    name: "New Product",
    price: 0,
    oldPrice: 0,
    image: "/stock.jpg",
    category: categories[0]?.name || "Herbs",
    description: "",
  };
}

function inputClasses(extra = "") {
  return [
    "mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-leaf-800 focus:ring-2 focus:ring-leaf-100",
    extra,
  ].join(" ");
}

export default function AdminPage() {
  const {
    products,
    newArrivalIds,
    saveProduct,
    deleteProduct,
    toggleNewArrival,
    moveNewArrival,
    resetCatalog,
    backendStatus,
    catalogMessage,
  } = useProductCatalog();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const [loginError, setLoginError] = useState("");
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [draftProduct, setDraftProduct] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isDraftNewArrival, setIsDraftNewArrival] = useState(false);
  const [selectedImageFile, setSelectedImageFile] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [notice, setNotice] = useState("");

  const selectedProduct = useMemo(() => {
    return products.find((product) => product.id === selectedProductId) || null;
  }, [products, selectedProductId]);

  useEffect(() => {
    setIsAuthenticated(window.sessionStorage.getItem(SESSION_KEY) === "true");
  }, []);

  useEffect(() => {
    if (isCreating) {
      return;
    }

    if (!selectedProductId && products.length > 0) {
      setSelectedProductId(products[0].id);
      return;
    }

    if (selectedProductId && !selectedProduct && products.length > 0) {
      setSelectedProductId(products[0].id);
    }
  }, [isCreating, products, selectedProduct, selectedProductId]);

  useEffect(() => {
    if (isCreating) {
      return;
    }

    if (selectedProduct) {
      setDraftProduct({ ...selectedProduct });
      setIsDraftNewArrival(newArrivalIds.includes(selectedProduct.id));
      setSelectedImageFile(null);
    }
  }, [isCreating, newArrivalIds, selectedProduct]);

  useEffect(() => {
    if (!selectedImageFile) {
      setImagePreviewUrl("");
      return undefined;
    }

    const previewUrl = URL.createObjectURL(selectedImageFile);
    setImagePreviewUrl(previewUrl);

    return () => URL.revokeObjectURL(previewUrl);
  }, [selectedImageFile]);

  async function handleLogin(event) {
    event.preventDefault();
    setLoginError("");

    try {
      const loginUrl = getApiRequestUrl("/api/auth/login", { allowLocalhost: true });

      if (loginUrl) {
        const response = await fetch(loginUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginForm),
        });

        if (response.ok) {
          const payload = await response.json();
          window.sessionStorage.setItem(SESSION_KEY, "true");
          window.sessionStorage.setItem(ADMIN_TOKEN_KEY, payload.accessToken);
          setIsAuthenticated(true);
          setLoginError("");
          return;
        }

        const payload = await response.json().catch(() => ({}));
        setLoginError(payload.detail || "Invalid admin details.");
        return;
      }
    } catch (_error) {
      // Fall through to the browser-only admin fallback below.
    }

    if (loginForm.username === ADMIN_USERNAME && loginForm.password === ADMIN_PASSWORD) {
      window.sessionStorage.setItem(SESSION_KEY, "true");
      window.sessionStorage.removeItem(ADMIN_TOKEN_KEY);
      setIsAuthenticated(true);
      setLoginError("");
      return;
    }

    setLoginError("Invalid admin details.");
  }

  async function handleLogout() {
    const token = window.sessionStorage.getItem(ADMIN_TOKEN_KEY);
    const logoutUrl = getApiRequestUrl("/api/auth/logout", { allowLocalhost: true });

    if (token && logoutUrl) {
      await fetch(logoutUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).catch(() => null);
    }

    window.sessionStorage.removeItem(SESSION_KEY);
    window.sessionStorage.removeItem(ADMIN_TOKEN_KEY);
    setIsAuthenticated(false);
    setLoginForm({ username: "", password: "" });
  }

  function selectProduct(product) {
    setIsCreating(false);
    setSelectedProductId(product.id);
    setDraftProduct({ ...product });
    setIsDraftNewArrival(newArrivalIds.includes(product.id));
    setSelectedImageFile(null);
    setNotice("");
  }

  function startNewProduct() {
    const nextProduct = emptyProduct(products.map((product) => product.id));
    setIsCreating(true);
    setSelectedProductId(nextProduct.id);
    setDraftProduct(nextProduct);
    setIsDraftNewArrival(false);
    setSelectedImageFile(null);
    setNotice("");
  }

  function updateDraft(field, value) {
    setDraftProduct((currentDraft) => ({
      ...currentDraft,
      [field]: value,
    }));
  }

  function handleImageChange(event) {
    const file = event.target.files?.[0];

    if (!file) {
      setSelectedImageFile(null);
      return;
    }

    if (!file.type.startsWith("image/")) {
      setNotice("Please choose an image file.");
      event.target.value = "";
      return;
    }

    setSelectedImageFile(file);
    setNotice("");
  }

  async function uploadSelectedImage() {
    if (!selectedImageFile) {
      return draftProduct.image.trim() || "/stock.jpg";
    }

    const token = window.sessionStorage.getItem(ADMIN_TOKEN_KEY);

    if (backendStatus !== "connected" || !token) {
      throw new Error("Start the backend and login again before uploading product images.");
    }

    const formData = new FormData();
    formData.append("image", selectedImageFile);
    const uploadUrl = getApiRequestUrl("/api/uploads/products", { allowLocalhost: true });

    if (!uploadUrl) {
      throw new Error("Start the backend and login again before uploading product images.");
    }

    const response = await fetch(uploadUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const payload = await response.json().catch(() => ({}));
      throw new Error(payload.detail || "Image upload failed.");
    }

    const payload = await response.json();
    return payload.imagePath;
  }

  async function handleSave(event) {
    event.preventDefault();

    if (!draftProduct) {
      return;
    }

    const originalId = isCreating ? draftProduct.id : selectedProductId;
    const existingIds = products
      .map((product) => product.id)
      .filter((productId) => productId !== originalId);
    setIsUploadingImage(true);
    let uploadedImagePath;

    try {
      uploadedImagePath = await uploadSelectedImage();
    } catch (error) {
      setNotice(error.message);
      setIsUploadingImage(false);
      return;
    }

    const nextProduct = {
      ...draftProduct,
      id: createProductId(draftProduct.id || draftProduct.name, existingIds),
      price: Number(draftProduct.price) || 0,
      oldPrice: Number(draftProduct.oldPrice) || 0,
      name: draftProduct.name.trim() || "Untitled product",
      image: uploadedImagePath,
      description: draftProduct.description.trim(),
    };
    const wasNewArrival = newArrivalIds.includes(originalId) || newArrivalIds.includes(nextProduct.id);

    saveProduct(nextProduct, originalId);

    if (isDraftNewArrival !== wasNewArrival) {
      toggleNewArrival(nextProduct.id);
    }

    setIsCreating(false);
    setSelectedProductId(nextProduct.id);
    setDraftProduct(nextProduct);
    setSelectedImageFile(null);
    setIsUploadingImage(false);
    setNotice(`${nextProduct.name} saved.`);
  }

  function handleDelete() {
    if (!draftProduct) {
      return;
    }

    if (!window.confirm(`Delete ${draftProduct.name}?`)) {
      return;
    }

    deleteProduct(draftProduct.id);
    setSelectedProductId(null);
    setDraftProduct(null);
    setIsCreating(false);
    setSelectedImageFile(null);
    setNotice(`${draftProduct.name} deleted.`);
  }

  function handleReset() {
    if (!window.confirm("Reset all products to the original catalog?")) {
      return;
    }

    resetCatalog();
    setSelectedProductId(null);
    setDraftProduct(null);
    setIsCreating(false);
    setSelectedImageFile(null);
    setNotice("Catalog reset.");
  }

  if (!isAuthenticated) {
    return (
      <>
        <Head>
          <title>Admin Login | Wellness Wave Centre</title>
        </Head>

        <SectionWrapper className="bg-blue-50">
          <div className="mx-auto max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-soft sm:p-8">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-leaf-800">
              Admin
            </p>
            <h1 className="mt-3 text-3xl font-bold text-slate-950">Product login</h1>

            <form onSubmit={handleLogin} className="mt-8 space-y-5">
              <label className="block">
                <span className="text-sm font-bold text-slate-900">Username</span>
                <input
                  type="text"
                  value={loginForm.username}
                  onChange={(event) => setLoginForm((current) => ({ ...current, username: event.target.value }))}
                  className={inputClasses()}
                  autoComplete="username"
                  required
                />
              </label>

              <label className="block">
                <span className="text-sm font-bold text-slate-900">Password</span>
                <input
                  type="password"
                  value={loginForm.password}
                  onChange={(event) => setLoginForm((current) => ({ ...current, password: event.target.value }))}
                  className={inputClasses()}
                  autoComplete="current-password"
                  required
                />
              </label>

              {loginError && (
                <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                  {loginError}
                </p>
              )}

              <Button type="submit" className="w-full">
                Login
              </Button>
            </form>
          </div>
        </SectionWrapper>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Admin Products | Wellness Wave Centre</title>
      </Head>

      <SectionWrapper className="bg-blue-50">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-leaf-800">
              Admin
            </p>
            <h1 className="mt-3 text-4xl font-bold text-slate-950">Product manager</h1>
            <p className="mt-4 text-sm font-semibold text-slate-600">
              {products.length} products - {newArrivalIds.length} new arrivals
            </p>
            <p className="mt-2 text-sm font-semibold text-slate-600">
              {backendStatus === "connected" ? "FastAPI/PostgreSQL connected" : "Backend offline - browser fallback active"}
            </p>
            {catalogMessage && (
              <p className="mt-2 text-sm text-slate-500">{catalogMessage}</p>
            )}
          </div>

          <div className="flex flex-wrap gap-3">
            <Button type="button" onClick={startNewProduct}>
              New Product
            </Button>
            <Button type="button" variant="secondary" onClick={handleReset}>
              Reset Catalog
            </Button>
            <Button type="button" variant="ghost" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper className="bg-slate-50 pt-8">
        <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
          <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-4 shadow-sm lg:sticky lg:top-28">
            <h2 className="px-2 text-lg font-bold text-slate-950">Products</h2>
            <div className="mt-4 max-h-[620px] space-y-2 overflow-y-auto pr-1">
              {products.map((product) => {
                const isSelected = product.id === selectedProductId && !isCreating;
                const isNew = newArrivalIds.includes(product.id);

                return (
                  <button
                    key={product.id}
                    type="button"
                    onClick={() => selectProduct(product)}
                    className={`w-full rounded-xl border p-3 text-left transition ${
                      isSelected
                        ? "border-leaf-800 bg-leaf-50"
                        : "border-slate-200 bg-white hover:border-leaf-200 hover:bg-leaf-50"
                    }`}
                  >
                    <div className="flex gap-3">
                      <img
                        src={product.image}
                        alt=""
                        className="h-14 w-14 rounded-xl bg-slate-100 object-contain p-1"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-bold text-slate-950">{product.name}</p>
                        <p className="mt-1 text-xs font-semibold text-slate-500">{formatCurrency(product.price)}</p>
                        {isNew && (
                          <span className="mt-2 inline-flex rounded-full bg-leaf-100 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-leaf-800">
                            New
                          </span>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </aside>

          <form onSubmit={handleSave} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            {notice && (
              <p className="mb-5 rounded-xl bg-leaf-50 px-4 py-3 text-sm font-semibold text-leaf-900">
                {notice}
              </p>
            )}

            {draftProduct ? (
              <>
                <div className="grid gap-5 md:grid-cols-2">
                  <label className="block">
                    <span className="text-sm font-bold text-slate-900">Product name</span>
                    <input
                      type="text"
                      value={draftProduct.name}
                      onChange={(event) => updateDraft("name", event.target.value)}
                      className={inputClasses()}
                      required
                    />
                  </label>

                  <label className="block">
                    <span className="text-sm font-bold text-slate-900">Product link id</span>
                    <input
                      type="text"
                      value={draftProduct.id}
                      onChange={(event) => updateDraft("id", event.target.value)}
                      className={inputClasses()}
                      required
                    />
                  </label>

                  <label className="block">
                    <span className="text-sm font-bold text-slate-900">Category</span>
                    <select
                      value={draftProduct.category}
                      onChange={(event) => updateDraft("category", event.target.value)}
                      className={inputClasses()}
                    >
                      {categories.map((category) => (
                        <option key={category.id} value={category.name}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </label>

                  <div className="block">
                    <span className="text-sm font-bold text-slate-900">Product image</span>
                    <div className="mt-2 flex gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-3">
                      <img
                        src={imagePreviewUrl || draftProduct.image || "/stock.jpg"}
                        alt="Product preview"
                        className="h-20 w-20 rounded-xl bg-white object-contain p-1"
                      />
                      <div className="min-w-0 flex-1">
                        <input
                          type="file"
                          accept="image/png,image/jpeg,image/webp,image/gif"
                          onChange={handleImageChange}
                          className="block w-full text-sm text-slate-700 file:mr-3 file:rounded-full file:border-0 file:bg-leaf-800 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-leaf-900"
                        />
                        <input
                          type="text"
                          value={draftProduct.image}
                          onChange={(event) => updateDraft("image", event.target.value)}
                          className={inputClasses("py-2")}
                          placeholder="/product.png"
                        />
                      </div>
                    </div>
                  </div>

                  <label className="block">
                    <span className="text-sm font-bold text-slate-900">Price</span>
                    <input
                      type="number"
                      min="0"
                      value={draftProduct.price}
                      onChange={(event) => updateDraft("price", event.target.value)}
                      className={inputClasses()}
                    />
                  </label>

                  <label className="block">
                    <span className="text-sm font-bold text-slate-900">Old price</span>
                    <input
                      type="number"
                      min="0"
                      value={draftProduct.oldPrice}
                      onChange={(event) => updateDraft("oldPrice", event.target.value)}
                      className={inputClasses()}
                    />
                  </label>
                </div>

                <label className="mt-5 block">
                  <span className="text-sm font-bold text-slate-900">Description</span>
                  <textarea
                    rows="6"
                    value={draftProduct.description}
                    onChange={(event) => updateDraft("description", event.target.value)}
                    className={inputClasses("resize-none")}
                  />
                </label>

                <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <label className="flex cursor-pointer items-center gap-3">
                    <input
                      type="checkbox"
                      checked={isDraftNewArrival}
                      onChange={(event) => setIsDraftNewArrival(event.target.checked)}
                      className="h-5 w-5 rounded accent-leaf-800"
                    />
                    <span className="text-sm font-bold text-slate-900">Show in new arrivals</span>
                  </label>

                  {newArrivalIds.includes(draftProduct.id) && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => moveNewArrival(draftProduct.id, -1)}
                        className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-leaf-50"
                      >
                        Move Up
                      </button>
                      <button
                        type="button"
                        onClick={() => moveNewArrival(draftProduct.id, 1)}
                        className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-leaf-50"
                      >
                        Move Down
                      </button>
                    </div>
                  )}
                </div>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <Button type="submit" className="w-full sm:w-auto" disabled={isUploadingImage}>
                    {isUploadingImage ? "Uploading..." : "Save Product"}
                  </Button>

                  {!isCreating && (
                    <button
                      type="button"
                      onClick={handleDelete}
                      className="rounded-full border border-red-200 bg-white px-5 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                    >
                      Delete Product
                    </button>
                  )}
                </div>
              </>
            ) : (
              <div className="rounded-2xl border border-dashed border-slate-300 p-10 text-center">
                <h2 className="text-xl font-bold text-slate-950">Choose a product</h2>
                <p className="mt-2 text-sm text-slate-600">Select a product or add a new one.</p>
                <Button type="button" onClick={startNewProduct} className="mt-6">
                  Add Product
                </Button>
              </div>
            )}
          </form>
        </div>
      </SectionWrapper>
    </>
  );
}

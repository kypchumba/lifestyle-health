import Head from "next/head";
import { useEffect, useMemo, useState } from "react";
import Button from "../components/Button";
import ProductCard from "../components/ProductCard";
import SectionWrapper from "../components/SectionWrapper";
import { useProductCatalog } from "../components/ProductCatalogContext";
import { categories, formatCurrency } from "../data/products";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const slideLeft = {
  hidden: { opacity: 0, x: -30 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const slideUp = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const categoryOptions = ["All", ...categories.map((c) => c.name)];
const rowOptions = [10, 20, 50, 100];

export default function ProductsPage() {
  const { products } = useProductCatalog();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [maxPrice, setMaxPrice] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const maxProductPrice = useMemo(() => {
    return Math.max(500, ...products.map((product) => Number(product.price) || 0));
  }, [products]);

  const activeMaxPrice = maxPrice ?? maxProductPrice;

  useEffect(() => {
    setMaxPrice((currentMaxPrice) => {
      if (currentMaxPrice === null) {
        return maxProductPrice;
      }

      return Math.min(currentMaxPrice, maxProductPrice);
    });
  }, [maxProductPrice]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        selectedCategory === "All" || product.category === selectedCategory;
      const matchesPrice = product.price <= activeMaxPrice;
      return matchesCategory && matchesPrice;
    });
  }, [selectedCategory, activeMaxPrice, products]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / rowsPerPage));
  const pageStartIndex = (currentPage - 1) * rowsPerPage;
  const visibleProducts = filteredProducts.slice(pageStartIndex, pageStartIndex + rowsPerPage);
  const showingStart = filteredProducts.length === 0 ? 0 : pageStartIndex + 1;
  const showingEnd = Math.min(pageStartIndex + rowsPerPage, filteredProducts.length);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, activeMaxPrice, rowsPerPage]);

  useEffect(() => {
    setCurrentPage((page) => Math.min(page, totalPages));
  }, [totalPages]);

  function resetFilters() {
    setSelectedCategory("All");
    setMaxPrice(maxProductPrice);
    setCurrentPage(1);
  }

  return (
    <>
      <Head>
        <title>Shop Products | Wellness Wave Centre</title>
        <meta
          name="description"
          content="Browse mock wellness products by category and price."
        />
      </Head>

      <SectionWrapper className="bg-blue-50 pb-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="max-w-3xl"
        >
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-leaf-800">
            Product catalog
          </p>
          <h1 className="mt-3 text-4xl font-bold text-slate-950">
            Shop wellness products
          </h1>
          <p className="mt-5 text-base leading-8 text-slate-600">
            A clean product listing flow with category, price and row controls.
          </p>
        </motion.div>
      </SectionWrapper>

      <SectionWrapper className="bg-slate-50 pt-8">
        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          <motion.aside
            variants={slideLeft}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="h-fit rounded-2xl border border-slate-200 bg-blue-50 p-5 shadow-sm lg:sticky lg:top-28"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-950">Filters</h2>
              <button
                type="button"
                onClick={resetFilters}
                className="text-sm font-semibold text-leaf-800 hover:text-leaf-900"
              >
                Reset
              </button>
            </div>

            <div className="mt-6">
              <p className="text-sm font-bold text-slate-900">Category</p>
              <div className="mt-3 space-y-2">
                {categoryOptions.map((category) => (
                  <motion.label
                    key={category}
                    whileHover={{ x: 4 }}
                    className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2 text-sm text-slate-700 hover:bg-leaf-50"
                  >
                    <input
                      type="radio"
                      name="category"
                      value={category}
                      checked={selectedCategory === category}
                      onChange={() => {setSelectedCategory(category);setCurrentPage(1);}}
                      className="h-4 w-4 accent-leaf-800"
                    />
                    <span>{category}</span>
                  </motion.label>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <div className="flex items-center justify-between">
                <p className="text-sm font-bold text-slate-900">Max price</p>
                <p className="text-sm font-semibold text-leaf-800">
                  {formatCurrency(activeMaxPrice)}
                </p>
              </div>

              <input
                type="range"
                min="0"
                max={maxProductPrice}
                step="100"
                value={activeMaxPrice}
                onChange={(e) => {setMaxPrice(Number(e.target.value)); setCurrentPage(1);}}
                className="mt-4 w-full accent-leaf-800"
              />
            </div>
          </motion.aside>

          <div>
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="mb-5 flex flex-col justify-between gap-3 rounded-2xl border border-slate-200 bg-blue-50 p-4 shadow-sm sm:flex-row sm:items-center"
            >
              <p className="text-sm font-semibold text-slate-700">
                Showing {showingStart}-{showingEnd} of {filteredProducts.length} products
              </p>

              <Button href="/" variant="ghost" className="px-4 py-2">
                Back Home
              </Button>
            </motion.div>

              {filteredProducts.length > 0 ? (
                <motion.div
                  key={`${selectedCategory}-${activeMaxPrice}-${currentPage}`}
                  variants={container}
                  initial="hidden"
                  animate="show"
                  className="grid grid-cols-2 gap-3 sm:gap-5 xl:grid-cols-3 2xl:grid-cols-4"
                >
                  {visibleProducts.map((product) => (
                    <motion.div key={product.id} variants={slideUp}>
                      <ProductCard product={product} />
                    </motion.div>
                  ))}
                </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="rounded-2xl border border-dashed border-slate-300 bg-blue-50 p-10 text-center"
              >
                <h2 className="text-xl font-bold text-slate-950">
                  No products found
                </h2>
                <p className="mt-2 text-sm text-slate-600">
                  Adjust the category or price filter to see more results.
                </p>
                <Button className="mt-6" onClick={resetFilters}>
                  Reset Filters
                </Button>
              </motion.div>
            )}

            <div className="mt-8 rounded-2xl border border-slate-200 bg-blue-50 p-4 shadow-sm">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-sm font-bold text-slate-950">Rows per page</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {rowOptions.map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => setRowsPerPage(option)}
                        className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                          rowsPerPage === option
                            ? "border-leaf-800 bg-leaf-800 text-white"
                            : "border-slate-200 bg-white text-slate-700 hover:border-leaf-300 hover:bg-leaf-50"
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between gap-3 lg:justify-end">
                  <button
                    type="button"
                    onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                    disabled={currentPage === 1}
                    className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-leaf-50 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Previous
                  </button>
                  <span className="text-sm font-semibold text-slate-700">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    type="button"
                    onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
                    disabled={currentPage === totalPages}
                    className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-leaf-50 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
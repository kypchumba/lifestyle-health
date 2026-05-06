import Head from "next/head";
import { useMemo, useState } from "react";
import Button from "../components/Button";
import ProductCard from "../components/ProductCard";
import SectionWrapper from "../components/SectionWrapper";
import { categories, formatCurrency, products } from "../data/products";
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
const maxProductPrice = Math.max(...products.map((p) => p.price));

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [maxPrice, setMaxPrice] = useState(maxProductPrice);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        selectedCategory === "All" || product.category === selectedCategory;
      const matchesPrice = product.price <= maxPrice;
      return matchesCategory && matchesPrice;
    });
  }, [selectedCategory, maxPrice]);

  function resetFilters() {
    setSelectedCategory("All");
    setMaxPrice(maxProductPrice);
  }

  return (
    <>
      <Head>
        <title>Shop Products | Wellness E-commerce Frontend</title>
        <meta
          name="description"
          content="Browse mock wellness products by category and price."
        />
      </Head>

      <SectionWrapper className="bg-white pb-8">
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
            A clean product listing flow with category and price filters. Product images are
            placeholders and all product content is mock data.
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
            className="h-fit rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:sticky lg:top-28"
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

            {/* CATEGORY */}
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
                      onChange={() => setSelectedCategory(category)}
                      className="h-4 w-4 accent-leaf-800"
                    />
                    <span>{category}</span>
                  </motion.label>
                ))}
              </div>
            </div>

            {/* PRICE */}
            <div className="mt-8">
              <div className="flex items-center justify-between">
                <p className="text-sm font-bold text-slate-900">Max price</p>
                <p className="text-sm font-semibold text-leaf-800">
                  {formatCurrency(maxPrice)}
                </p>
              </div>

              <input
                type="range"
                min="500"
                max={maxProductPrice}
                step="100"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
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
              className="mb-5 flex flex-col justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center"
            >
              <p className="text-sm font-semibold text-slate-700">
                Showing {filteredProducts.length} of {products.length} products
              </p>

              <Button href="/" variant="ghost" className="px-4 py-2">
                Back Home
              </Button>
            </motion.div>

            {/* PRODUCTS GRID */}
            {filteredProducts.length > 0 ? (
              <motion.div
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.1 }}
                className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
              >
                {filteredProducts.map((product) => (
                  <motion.div key={product.id} variants={slideUp}>
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center"
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
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
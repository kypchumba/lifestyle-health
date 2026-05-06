import Head from "next/head";
import Button from "../components/Button";
import ProductCard from "../components/ProductCard";
import SectionWrapper from "../components/SectionWrapper";
import { categories, placeholderImage, products } from "../data/products";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const stagger = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const heroImage = {
  hidden: { opacity: 0, x: 40 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const cardHover = {
  whileHover: {
    y: -6,
    transition: { duration: 0.2 },
  },
};

const features = [
  {
    title: "High Quality",
    description: "Placeholder assurance copy for carefully selected wellness goods.",
  },
  {
    title: "Affordable Delivery",
    description: "Placeholder delivery copy for simple, transparent fulfillment options.",
  },
  {
    title: "Trusted Products",
    description: "Placeholder trust copy for product consistency and customer care.",
  },
];

export default function HomePage() {
  const featuredProducts = products.slice(0, 8);

  return (
    <>
      <Head>
        <title>Wellness Wave Centre</title>
        <meta
          name="description"
          content="A modern wellness e-commerce frontend with products, categories, and cart UI."
        />
      </Head>

      <section className="bg-white">
        <div className="mx-auto grid min-h-[calc(100vh-76px)] max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:px-8">

          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="max-w-2xl"
          >
            <motion.p variants={fadeUp} className="text-sm font-bold uppercase tracking-[0.22em] text-leaf-800">
              Wellness shop placeholder
            </motion.p>

            <motion.h1
              variants={fadeUp}
              className="mt-5 text-4xl font-bold leading-tight text-slate-950 sm:text-5xl lg:text-6xl"
            >
              Curated wellness essentials for everyday balance.
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-6 max-w-xl text-base leading-8 text-slate-600 sm:text-lg"
            >
              Replace this hero copy with a concise product promise. Keep the journey direct:
              discover categories, browse products, view details, and add items to cart.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-8 flex flex-col gap-3 sm:flex-row"
            >
              <Button href="/products">Shop Now</Button>
              <Button href="/about" variant="secondary">
                Our Story
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            variants={heroImage}
            initial="hidden"
            animate="show"
            className="relative"
          >
            <div className="absolute -left-4 top-6 hidden h-24 w-24 rounded-full border border-clay-300 lg:block" />
            <img
              src="/home.png"
              alt="Wellness hero placeholder"
              className="relative aspect-[4/5] w-full rounded-[2rem] border border-slate-200 object-cover shadow-soft"
            />
          </motion.div>
        </div>
      </section>

      <SectionWrapper className="bg-leaf-50">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid gap-4 md:grid-cols-3"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={fadeUp}
              whileHover={{ y: -6 }}
              className="rounded-2xl border border-leaf-100 bg-white p-6 shadow-sm"
            >
              <div className="mb-5 h-12 w-12 rounded-full bg-clay-100" />
              <h2 className="text-xl font-bold text-slate-950">{feature.title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </SectionWrapper>

      <SectionWrapper className="bg-white">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid gap-5 md:grid-cols-3"
        >
          {categories.map((category) => (
        <motion.article
          key={category.id}
          variants={fadeUp}
          whileHover={{ y: -6 }}
          className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
        >
        
          <div className="relative w-full aspect-[4/5]">
            <img
              src={category.image}
              alt={category.name}
              className="h-full w-full object-cover"
            />
        
            <div className="absolute bottom-0 left-0 right-0">
              <div className="bg-black/30 backdrop-blur-md border-t border-white/30 px-5 py-4">
                <h3 className="text-2xl font-bold text-white">
                  {category.name}
                </h3>
                <p className="mt-1 text-sm leading-5 text-white">
                  {category.description}
                </p>
              </div>
            </div>
          </div>
        </motion.article>
          ))}
        </motion.div>
      </SectionWrapper>

      <SectionWrapper className="bg-slate-50">
        <div className="mb-8">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-leaf-800">
            Featured products
          </p>
          <h2 className="mt-3 text-3xl font-bold text-slate-950">
            New arrivals
          </h2>
        </div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {featuredProducts.map((product) => (
            <motion.div key={product.id} variants={fadeUp} whileHover={{ y: -6 }}>
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
      </SectionWrapper>

      <SectionWrapper className="bg-white">
        <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">

          <motion.img
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            src="/home.png"
            alt="About story placeholder"
            className="aspect-[4/3] w-full rounded-[2rem] border border-slate-200 object-cover shadow-soft"
          />

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-leaf-800">
              About the shop
            </p>

            <h2 className="mt-3 text-3xl font-bold text-slate-950">
              A grounded story section for the business.
            </h2>

            <p className="mt-5 text-base leading-8 text-slate-600">
              This placeholder story introduces the people, values, and service philosophy behind
              the store. It can later be replaced with original brand copy, sourcing standards,
              quality notes, and customer support details.
            </p>

            <Button href="/about" className="mt-8" variant="secondary">
              Learn More
            </Button>
          </motion.div>
        </div>
      </SectionWrapper>
    </>
  );
}
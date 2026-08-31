import Head from "next/head";
import { useEffect, useState } from "react";
import Button from "../components/Button";
import ProductCard from "../components/ProductCard";
import SectionWrapper from "../components/SectionWrapper";
import { categories } from "../data/products";
import { useProductCatalog } from "../components/ProductCatalogContext";
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

const imageVariant = {
  hidden: { opacity: 0, x: 40 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const features = [
  {
    title: "High Quality",
    description: "Carefully selected wellness goods.",
  },
  {
    title: "Affordable Delivery",
    description: "Simple and transparent fulfillment options.",
  },
  {
    title: "Trusted Products",
    description: "Carefully curated products for your well-being.",
  },
];

const serviceItems = [
  ["Personalized Wellness Plans", "Tailored plans designed around nutrition, exercise, stress management and mindfulness."],
  ["Nutritional Counseling", "One-on-one consultations to assess eating habits and create practical nutrition plans."],
  ["Fitness Training", "Personal training, group classes, yoga, Pilates and HIIT programs."],
  ["Mindfulness and Meditation", "Guided practices that support calm, clarity and lower stress."],
  ["Stress Management Workshops", "Relaxation, breathing and coping techniques for day-to-day resilience."],
  ["Health Coaching", "Ongoing support to keep clients accountable and motivated."],
  ["Corporate Wellness Programs", "Workplace fitness, seminars and wellness initiatives."],
  ["Nutrition Education", "Cooking and nutrition education sessions for healthier routines."],
  ["Holistic Therapies", "Massage, acupuncture, chiropractic care and aromatherapy."],
  ["Wellness Retreats", "Immersive wellness experiences in natural environments."],
  ["Online Wellness Programs", "Virtual fitness, meditation and nutrition programs."],
  ["Community Events", "Support groups and events that build connection and accountability."],
];

const therapyDetails = [
  {
    title: "CHIROPRATIC MASSAGE",
    content: [
      "Chiropractic massage combines chiropractic care with massage techniques to address musculoskeletal issues and promote overall well-being.",
      "It can support pain relief, spinal alignment, range of motion, stress reduction, circulation, headache relief, injury rehabilitation and preventive care.",
    ],
  },
  {
    title: "SPORTS MASSAGE",
    content: [
      "Sports massage focuses on enhancing athletic performance, preventing and treating sports-related injuries and aiding recovery.",
      "It typically combines deep tissue massage, stretching and joint mobilization tailored to the needs of active clients and athletes.",
    ],
  },
  {
    title: "SOFT TISSUE MASSAGE",
    content: [
      "Soft tissue massage works on muscles, tendons, ligaments and fascia with lighter pressure and gentler techniques than deep tissue massage.",
      "It can promote relaxation, relieve muscle tension, improve circulation and support physical and mental well-being.",
    ],
  },
];

export default function HomePage() {
  const { newProducts } = useProductCatalog();
  const featuredProducts = newProducts.slice(0, 8);
  const [activeTherapy, setActiveTherapy] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const sectionId = window.location.hash.replace("#", "");

    if (!sectionId) {
      return undefined;
    }

    const scrollTimer = window.setTimeout(() => {
      document.getElementById(sectionId)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 120);

    return () => window.clearTimeout(scrollTimer);
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <>
      <Head>
        <title>Wellness Wave Centre</title>
        <meta
          name="description"
          content="A modern wellness e-commerce website with products, categories, services and contact sections."
        />
      </Head>

      <section id="home" className="scroll-mt-28 bg-blue-50">
        <div className="mx-auto grid min-h-[calc(100vh-76px)] max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:px-8">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="max-w-2xl"
          >
            <motion.p variants={fadeUp} className="text-sm font-bold uppercase tracking-[0.22em] text-leaf-800">
              Wellness shop
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
              Book sessions, browse products, view details and add items to cart.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-8 flex flex-col gap-3 sm:flex-row"
            >
              <Button href="/products">Shop Now</Button>
              <Button href="/#about" scroll={false} variant="secondary">
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
           <img
             src="/home.jpg"
             alt="Wellness hero placeholder"
             className="relative h-[450px] w-full rounded-[2rem] border border-slate-200 object-cover shadow-soft"
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
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                <svg
                  className="h-6 w-6 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-slate-950">{feature.title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </SectionWrapper>

      <SectionWrapper className="bg-blue-50">
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
              <div className="relative aspect-[4/5] w-full">
                <img
                  src={category.image}
                  alt={category.name}
                  className="h-full w-full object-cover"
                />

                <div className="absolute bottom-0 left-0 right-0">
                  <div className="border-t border-white/30 bg-black/30 px-5 py-4 backdrop-blur-md">
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

      <SectionWrapper className="bg-blue-50">
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
          className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4"
        >
          {featuredProducts.map((newProduct) => (
            <motion.div key={newProduct.id} variants={fadeUp} whileHover={{ y: -6 }}>
              <ProductCard product={newProduct} isNew />
            </motion.div>
          ))}
        </motion.div>
      </SectionWrapper>

      <SectionWrapper className="bg-blue-50">
        <div id="about" className="scroll-mt-28 space-y-20">
          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
            >
              <motion.p variants={fadeUp} className="text-sm font-bold uppercase tracking-[0.2em] text-leaf-800">
                Our story
              </motion.p>

              <motion.h2
                variants={fadeUp}
                className="mt-3 text-4xl font-bold text-slate-950 sm:text-5xl"
              >
                Wellness Wave Centre.
              </motion.h2>

              <motion.p
                variants={fadeUp}
                className="mt-6 text-base leading-8 text-slate-600"
              >
                We are dedicated to helping you achieve holistic well-being and vibrant health.
              </motion.p>

              <motion.p
                variants={fadeUp}
                className="mt-4 text-base leading-8 text-slate-600"
              >
                We believe that true wellness encompasses the harmony of mind, body and spirit. Our mission is to empower individuals to live their best lives by providing accessible, innovative and personalized wellness solutions.
              </motion.p>
            </motion.div>

            <motion.img
              variants={imageVariant}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              src="/about.png"
              alt="About Wellness Wave Centre"
              className="h-auto max-h-[600px] w-full rounded-[2rem] bg-transparent object-contain"
            />
          </div>

          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
            >
              <motion.p
                variants={fadeUp}
                className="text-sm font-bold uppercase tracking-[0.2em] text-leaf-800"
              >
                Our team
              </motion.p>

              <motion.h2
                variants={fadeUp}
                className="mt-6 text-4xl font-bold text-slate-950 sm:text-5xl"
              >
                Our team of wellness enthusiasts and experts.
              </motion.h2>

              <motion.p
                variants={fadeUp}
                className="mt-6 text-base leading-8 text-slate-600"
              >
                Founded by a team of passionate health enthusiasts, we are driven by a commitment to promoting wellness at every level. Whether you're seeking to improve your fitness, enhance your nutrition, reduce stress, or cultivate mindfulness, we offer programs and services tailored to your needs.
              </motion.p>

              <motion.p
                variants={fadeUp}
                className="mt-6 text-base leading-8 text-slate-600"
              >
                What sets us apart is our holistic approach to wellness. Every person's journey is unique, so our wellness professionals listen to your concerns, goals and aspirations before helping shape a practical wellness plan.
              </motion.p>
            </motion.div>

            <motion.img
              variants={imageVariant}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              src="/team.png"
              alt="Our team"
              className="h-auto max-h-[650px] w-full rounded-[2rem] bg-transparent object-contain"
            />
          </div>

          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
            >
              <motion.p variants={fadeUp} className="text-sm font-bold uppercase tracking-[0.2em] text-leaf-800">
                Our journey together
              </motion.p>

              <motion.h2
                variants={fadeUp}
                className="mt-3 text-4xl font-bold text-slate-950 sm:text-5xl"
              >
                A life long-journey.
              </motion.h2>

              <motion.p
                variants={fadeUp}
                className="mt-6 text-base leading-8 text-slate-600"
              >
                At Wellness Wave Centre, we believe in the power of education and empowerment. We strive to provide the knowledge, tools and support you need to make sustainable lifestyle changes.
              </motion.p>

              <motion.p
                variants={fadeUp}
                className="mt-4 text-base leading-8 text-slate-600"
              >
                Whether you're embarking on your wellness journey for the first time or taking your health to the next level, we invite you to join us at our centre.
              </motion.p>
            </motion.div>

            <motion.img
              variants={imageVariant}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              src="/journey.png"
              alt="Wellness journey"
              className="h-auto max-h-[600px] w-full rounded-[2rem] bg-transparent object-contain"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.2 }}
            className="mx-auto max-w-3xl text-center"
          >
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-leaf-800">
              Mission
            </p>

            <h2 className="mt-3 text-3xl font-bold text-slate-950">
              Make natural wellness products easier to discover and purchase.
            </h2>

            <p className="mt-5 text-base leading-8 text-slate-600">
              We are committed to providing high-quality wellness products that support people's health and well-being.
            </p>
          </motion.div>
        </div>
      </SectionWrapper>

      <SectionWrapper className="bg-leaf-50">
        <div id="services" className="scroll-mt-28">
          <div className="mb-10">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-leaf-800">
              Services
            </p>
            <h2 className="mt-3 text-3xl font-bold text-slate-950">
              What we offer
            </h2>
          </div>

          <div className="grid gap-12 lg:grid-cols-[3fr_2fr] lg:items-start">
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="space-y-6 text-slate-700"
            >
              {serviceItems.map(([title, copy], index) => (
                <motion.p key={title} variants={fadeUp} className="leading-7">
                  <span className="font-semibold text-slate-900">
                    {index + 1}. {title}:
                  </span>{" "}
                  {copy}
                </motion.p>
              ))}
            </motion.div>

            <motion.div
              variants={imageVariant}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              className="lg:sticky lg:top-24"
            >
              <img
                src="/services.jpg"
                alt="Wellness services"
                className="h-full min-h-[420px] w-full rounded-2xl border border-slate-200 object-cover shadow-soft"
              />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.2 }}
            className="mx-auto mt-20 max-w-3xl text-center"
          >
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-leaf-800">
              Holistic Therapies
            </p>

            <h2 className="mt-3 text-3xl font-bold text-slate-950">
              Integrative wellness for body and mind
            </h2>

            <p className="mt-5 text-base leading-8 text-slate-600">
              Includes acupuncture, massage therapy, chiropractic care and aromatherapy to reduce tension and promote relaxation.
            </p>
          </motion.div>

          <div className="mx-auto mt-12 max-w-3xl space-y-4">
            {therapyDetails.map((item, index) => {
              const isOpen = activeTherapy === index;

              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true, amount: 0.2 }}
                  className="overflow-hidden rounded-xl border border-slate-200 bg-blue-50"
                >
                  <button
                    type="button"
                    onClick={() => setActiveTherapy(isOpen ? null : index)}
                    className="flex w-full items-center justify-between px-6 py-4 text-left text-lg font-semibold"
                  >
                    {item.title}
                    <span className="text-xl">{isOpen ? "-" : "+"}</span>
                  </button>

                  <motion.div
                    initial={false}
                    animate={isOpen ? "open" : "closed"}
                    variants={{
                      open: { height: "auto", opacity: 1 },
                      closed: { height: 0, opacity: 0 },
                    }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="overflow-hidden px-6"
                    style={{ willChange: "height" }}
                  >
                    <div className="space-y-4 py-4">
                      {item.content.map((paragraph) => (
                        <p key={paragraph} className="text-base leading-7 text-slate-800">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper className="bg-blue-50">
        <div id="contact" className="scroll-mt-28 grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
            <motion.p
              variants={fadeUp}
              className="text-sm font-bold uppercase tracking-[0.2em] text-leaf-800"
            >
              Contact us
            </motion.p>

            <motion.h2
              variants={fadeUp}
              className="mt-3 text-4xl font-bold text-slate-950"
            >
              Talk to an expert
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="mt-5 text-base leading-8 text-slate-600"
            >
              Send your questions, orders, consultation requests or general inquiries.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-8 space-y-4 rounded-2xl border border-slate-200 bg-slate-50 p-6"
            >
              <div>
                <p className="text-sm font-bold text-slate-950">Email</p>
                <p className="mt-1 text-sm text-slate-600">chumbakenny@gmail.com</p>
              </div>

              <div>
                <p className="text-sm font-bold text-slate-950">Phone</p>
                <p className="mt-1 text-sm text-slate-600">+254 113 365 971</p>
              </div>

              <div>
                <p className="text-sm font-bold text-slate-950">Location</p>
                <p className="mt-1 text-sm text-slate-600">Nairobi, Kenya</p>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-6">
                <a href="https://wa.me/254113365971" target="_blank" rel="noopener noreferrer" className="group relative transition-transform duration-300 hover:scale-110">
                  <img src="/whatsapp.png" alt="WhatsApp" className="h-8 w-8" />
                  <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 scale-0 rounded bg-slate-900 px-2 py-1 text-xs text-white opacity-0 transition-all duration-200 group-hover:scale-100 group-hover:opacity-100">WhatsApp</span>
                </a>
                <a href="mailto:chumbakenny@gmail.com" className="group relative transition-transform duration-300 hover:scale-110">
                  <img src="/gmail.png" alt="Email" className="h-8 w-8" />
                  <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 scale-0 rounded bg-slate-900 px-2 py-1 text-xs text-white opacity-0 transition-all duration-200 group-hover:scale-100 group-hover:opacity-100">Email</span>
                </a>
                <a href="https://instagram.com/kypchumbaa" target="_blank" rel="noopener noreferrer" className="group relative transition-transform duration-300 hover:scale-110">
                  <img src="/instagram.png" alt="Instagram" className="h-8 w-8" />
                  <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 scale-0 rounded bg-slate-900 px-2 py-1 text-xs text-white opacity-0 transition-all duration-200 group-hover:scale-100 group-hover:opacity-100">Instagram</span>
                </a>
                <a href="https://tiktok.com/@padri_gaming" target="_blank" rel="noopener noreferrer" className="group relative transition-transform duration-300 hover:scale-110">
                  <img src="/tiktok.png" alt="TikTok" className="h-8 w-8" />
                  <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 scale-0 rounded bg-slate-900 px-2 py-1 text-xs text-white opacity-0 transition-all duration-200 group-hover:scale-100 group-hover:opacity-100">TikTok</span>
                </a>
                <a href="https://facebook.com/ken.orange.10" target="_blank" rel="noopener noreferrer" className="group relative transition-transform duration-300 hover:scale-110">
                  <img src="/facebook.png" alt="Facebook" className="h-8 w-8" />
                  <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 scale-0 rounded bg-slate-900 px-2 py-1 text-xs text-white opacity-0 transition-all duration-200 group-hover:scale-100 group-hover:opacity-100">Facebook</span>
                </a>
                <a href="tel:+254113365971" className="group relative transition-transform duration-300 hover:scale-110">
                  <img src="/phone.png" alt="Phone" className="h-8 w-8" />
                  <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 scale-0 rounded bg-slate-900 px-2 py-1 text-xs text-white opacity-0 transition-all duration-200 group-hover:scale-100 group-hover:opacity-100">Call</span>
                </a>
              </div>
            </motion.div>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="rounded-2xl border border-slate-200 bg-green-50 p-5 shadow-soft sm:p-8"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="text-sm font-bold text-slate-900">Name</span>
                <input
                  type="text"
                  required
                  className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-leaf-800 focus:ring-2 focus:ring-leaf-100"
                  placeholder="Your name"
                />
              </label>

              <label className="block">
                <span className="text-sm font-bold text-slate-900">Phone</span>
                <input
                  type="tel"
                  required
                  className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-leaf-800 focus:ring-2 focus:ring-leaf-100"
                  placeholder="Your phone number"
                />
              </label>
            </div>

            <label className="mt-5 block">
              <span className="text-sm font-bold text-slate-900">Subject</span>
              <input
                type="text"
                className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-leaf-800 focus:ring-2 focus:ring-leaf-100"
                placeholder="How can we help?"
              />
            </label>

            <label className="mt-5 block">
              <span className="text-sm font-bold text-slate-900">Message</span>
              <textarea
                rows="6"
                required
                className="mt-2 w-full resize-none rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-leaf-800 focus:ring-2 focus:ring-leaf-100"
                placeholder="Write your message"
              />
            </label>

            <Button type="submit" className="mt-6 w-full sm:w-auto">
              Send Message
            </Button>

            {submitted && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 rounded-xl bg-leaf-50 px-4 py-3 text-sm font-semibold text-leaf-900"
              >
                Form submitted locally.
              </motion.p>
            )}
          </motion.form>
        </div>
      </SectionWrapper>
    </>
  );
}

import Head from "next/head";
import { useState } from "react";
import Button from "../components/Button";
import SectionWrapper from "../components/SectionWrapper";
import { motion } from "framer-motion";

/* =========================
   ANIMATION SYSTEM
========================= */

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
      staggerChildren: 0.1,
    },
  },
};

const slideRight = {
  hidden: { opacity: 0, x: -30 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const slideLeft = {
  hidden: { opacity: 0, x: 30 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <>
      <Head>
        <title>Contact | Wellness E-commerce Frontend</title>
        <meta
          name="description"
          content="Mock contact page for a wellness e-commerce frontend."
        />
      </Head>

      <SectionWrapper className="bg-white">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">

          {/* =========================
              LEFT SIDE (INFO)
          ========================= */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
          >
            <motion.p
              variants={fadeUp}
              className="text-sm font-bold uppercase tracking-[0.2em] text-leaf-800"
            >
              Contact placeholder
            </motion.p>

            <motion.h1
              variants={fadeUp}
              className="mt-3 text-4xl font-bold text-slate-950"
            >
              Talk to the shop team
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-5 text-base leading-8 text-slate-600"
            >
              Use this page for customer questions, order support, consultation requests, or general
              inquiries. The form is frontend-only and ready to connect to a backend later.
            </motion.p>

            {/* CONTACT BOX */}
            <motion.div
              variants={fadeUp}
              className="mt-8 space-y-4 rounded-2xl border border-slate-200 bg-slate-50 p-6"
            >
              <div>
                <p className="text-sm font-bold text-slate-950">Email</p>
                <p className="mt-1 text-sm text-slate-600">hello@example.com</p>
              </div>

              <div>
                <p className="text-sm font-bold text-slate-950">Phone</p>
                <p className="mt-1 text-sm text-slate-600">+254 700 000 000</p>
              </div>

              <div>
                <p className="text-sm font-bold text-slate-950">Location</p>
                <p className="mt-1 text-sm text-slate-600">City, Country</p>
              </div>
            </motion.div>
          </motion.div>

          {/* =========================
              FORM
          ========================= */}
          <motion.form
            onSubmit={handleSubmit}
            variants={slideLeft}
            initial="hidden"
            animate="show"
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft sm:p-8"
          >
            <motion.div
              variants={stagger}
              initial="hidden"
              animate="show"
              className="grid gap-5 sm:grid-cols-2"
            >
              <motion.label variants={fadeUp} className="block">
                <span className="text-sm font-bold text-slate-900">Name</span>
                <input
                  type="text"
                  required
                  className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-leaf-800 focus:ring-2 focus:ring-leaf-100"
                  placeholder="Your name"
                />
              </motion.label>

              <motion.label variants={fadeUp} className="block">
                <span className="text-sm font-bold text-slate-900">Email</span>
                <input
                  type="email"
                  required
                  className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-leaf-800 focus:ring-2 focus:ring-leaf-100"
                  placeholder="you@example.com"
                />
              </motion.label>
            </motion.div>

            <motion.label variants={fadeUp} className="mt-5 block">
              <span className="text-sm font-bold text-slate-900">Subject</span>
              <input
                type="text"
                className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-leaf-800 focus:ring-2 focus:ring-leaf-100"
                placeholder="How can we help?"
              />
            </motion.label>

            <motion.label variants={fadeUp} className="mt-5 block">
              <span className="text-sm font-bold text-slate-900">Message</span>
              <textarea
                rows="6"
                required
                className="mt-2 w-full resize-none rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-leaf-800 focus:ring-2 focus:ring-leaf-100"
                placeholder="Write your message"
              />
            </motion.label>

            <motion.div variants={fadeUp}>
              <Button type="submit" className="mt-6 w-full sm:w-auto">
                Send Message
              </Button>
            </motion.div>

            {submitted && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 rounded-xl bg-leaf-50 px-4 py-3 text-sm font-semibold text-leaf-900"
              >
                Form submitted locally. Connect an API endpoint when backend support is ready.
              </motion.p>
            )}
          </motion.form>
        </div>
      </SectionWrapper>
    </>
  );
}
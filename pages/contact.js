import Head from "next/head";
import { useState } from "react";
import Button from "../components/Button";
import SectionWrapper from "../components/SectionWrapper";
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
        <title>Contact | Wellness Wave Centre</title>
        <meta
          name="description"
          content="Mock contact page for a wellness e-commerce frontend."
        />
      </Head>

      <SectionWrapper className="bg-blue-50">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">

          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
          >
            <motion.p
              variants={fadeUp}
              className="text-sm font-bold uppercase tracking-[0.2em] text-leaf-800"
            >
              Contact us
            </motion.p>

            <motion.h1
              variants={fadeUp}
              className="mt-3 text-4xl font-bold text-slate-950"
            >
              Talk to an expert
            </motion.h1>

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
              <div className="md:col-start-2 md:col-end-4">
                <div className="mt-6 flex flex-wrap items-center gap-6">
              
                  {/* WhatsApp */}
                  <a
                    href="https://wa.me/254113365971"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative transition-transform duration-300 hover:scale-110"
                  >
                    <img src="/whatsapp.png" alt="WhatsApp" className="h-8 w-8" />
                    <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 scale-0 rounded bg-slate-900 px-2 py-1 text-xs text-white opacity-0 transition-all duration-200 group-hover:scale-100 group-hover:opacity-100">
                      WhatsApp
                    </span>
                  </a>
              
                  {/* Gmail */}
                  <a
                    href="mailto:chumbakenny@gmail.com"
                    className="group relative transition-transform duration-300 hover:scale-110"
                  >
                    <img src="/gmail.png" alt="Email" className="h-8 w-8" />
                    <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 scale-0 rounded bg-slate-900 px-2 py-1 text-xs text-white opacity-0 transition-all duration-200 group-hover:scale-100 group-hover:opacity-100">
                      Email
                    </span>
                  </a>
              
                  {/* Instagram */}
                  <a
                    href="https://instagram.com/kypchumbaa"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative transition-transform duration-300 hover:scale-110"
                  >
                    <img src="/instagram.png" alt="Instagram" className="h-8 w-8" />
                    <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 scale-0 rounded bg-slate-900 px-2 py-1 text-xs text-white opacity-0 transition-all duration-200 group-hover:scale-100 group-hover:opacity-100">
                      Instagram
                    </span>
                  </a>
              
                  {/* TikTok */}
                  <a
                    href="https://tiktok.com/@padri_gaming"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative transition-transform duration-300 hover:scale-110"
                  >
                    <img src="/tiktok.png" alt="TikTok" className="h-8 w-8" />
                    <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 scale-0 rounded bg-slate-900 px-2 py-1 text-xs text-white opacity-0 transition-all duration-200 group-hover:scale-100 group-hover:opacity-100">
                      TikTok
                    </span>
                  </a>
              
                  {/* Facebook */}
                  <a
                    href="https://facebook.com/ken.orange.10"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative transition-transform duration-300 hover:scale-110"
                  >
                    <img src="/facebook.png" alt="Facebook" className="h-8 w-8" />
                    <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 scale-0 rounded bg-slate-900 px-2 py-1 text-xs text-white opacity-0 transition-all duration-200 group-hover:scale-100 group-hover:opacity-100">
                      Facebook
                    </span>
                  </a>
              
                  {/* Phone */}
                  <a
                    href="tel:+254113365971"
                    className="group relative transition-transform duration-300 hover:scale-110"
                  >
                    <img src="/phone.png" alt="Phone" className="h-8 w-8" />
                    <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 scale-0 rounded bg-slate-900 px-2 py-1 text-xs text-white opacity-0 transition-all duration-200 group-hover:scale-100 group-hover:opacity-100">
                      Call
                    </span>
                  </a>
              
                </div>
              </div>

            </motion.div>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            variants={slideLeft}
            initial="hidden"
            animate="show"
            className="rounded-2xl border border-slate-200 bg-blue-50 p-5 shadow-soft sm:p-8"
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
                <span className="text-sm font-bold text-slate-900">Phone</span>
                <input
                  type="tel"
                  required
                  className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-leaf-800 focus:ring-2 focus:ring-leaf-100"
                  placeholder="Your phone number"
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
                Form submitted locally.
              </motion.p>
            )}
          </motion.form>
        </div>
      </SectionWrapper>
    </>
  );
}
import Head from "next/head";
import SectionWrapper from "../components/SectionWrapper";
import { placeholderImage } from "../data/products";
import { motion } from "framer-motion";
import Image from "next/image";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
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

const imageVariant = {
  hidden: { opacity: 0, x: 40 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const values = [
  {
    title: "Thoughtful Curation",
    copy: "Placeholder value copy for selecting products with clarity, purpose and customer needs in mind.",
  },
  {
    title: "Everyday Access",
    copy: "Placeholder value copy for making wellness products easier to browse, compare and order.",
  },
  {
    title: "Clear Guidance",
    copy: "Placeholder value copy for helping customers understand product use without clutter or confusion.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>About | Wellness Wave Centre</title>
        <meta
          name="description"
          content="Mock about page for a modern wellness e-commerce shop."
        />
      </Head>

      <SectionWrapper className="bg-blue-50">
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

            <motion.h1
              variants={fadeUp}
              className="mt-3 text-4xl font-bold text-slate-950 sm:text-5xl"
            >
              Wellness Wave Centre.
            </motion.h1>

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
            alt="About page placeholder"
            className="w-full h-auto max-h-[600px] rounded-[2rem] object-contain bg-transparent"
          />
        </div>
      </SectionWrapper>

      <SectionWrapper className="bg-blue-50">
        <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
      
          <motion.img
            variants={imageVariant}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            src="/team.png"
            alt="Our team"
            className="w-full h-auto max-h-[650px] rounded-[2rem] object-contain bg-transparent"
          />
      
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
      
            <motion.h1
              variants={fadeUp}
              className="mt-6 text-4xl font-bold text-slate-950 sm:text-5xl"
            >
              Our team of wellness enthusiasts and experts.
            </motion.h1>
      
            <motion.p
              variants={fadeUp}
              className="mt-6 text-base leading-8 text-slate-600"
            >
              Founded by a team of passionate health enthusiasts, who are driven by a commitment to promoting wellness at every level. Whether you’re seeking to improve your fitness, enhance your nutrition, reduce stress, or cultivate mindfulness, we offer a range of programs and services tailored to meet your unique needs.
            </motion.p>

            <motion.p
              variants={fadeUp}
              className="mt-6 text-base leading-8 text-slate-600"
            >
              What sets us apart is our holistic approach to wellness. We understand that each person’s journey to health is unique, which is why we take the time to listen to your concerns, goals and aspirations. Our team of experienced wellness professionals, including nutritionists, fitness trainers, counselors and mindfulness experts, work together to create comprehensive wellness  plans that address your individual needs.
            </motion.p>
          </motion.div>
      
        </div>
      </SectionWrapper>

     <SectionWrapper className="bg-blue-50">
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

            <motion.h1
              variants={fadeUp}
              className="mt-3 text-4xl font-bold text-slate-950 sm:text-5xl"
            >
              A life long-journey.
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-6 text-base leading-8 text-slate-600"
            >
              At Wellness Wave centre, we believe in the power of education and empowerment. We strive to provide you with the knowledge, tools and support you need to make sustainable lifestyle changes that will positively impact your health and well-being for years to come.
            </motion.p>

            <motion.p
              variants={fadeUp}
              className="mt-4 text-base leading-8 text-slate-600"
            >
              Whether you’re embarking on your wellness journey for the first time or seeking to take your health to the next level, we invite you to join us at our centre. Together, we can unlock your full potential and inspire a life of vitality, balance and joy.
            </motion.p>        
          </motion.div>

          <motion.img
            variants={imageVariant}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            src="/journey.png"
            alt="About page placeholder"
            className="w-full h-auto max-h-[600px] rounded-[2rem] object-contain bg-transparent"
          />
        </div>
      </SectionWrapper>

      <SectionWrapper className="bg-leaf-50">
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
            We are committed to providinghigh-quality wellness products that support people's health and well-being.
          </p>
        </motion.div>
      </SectionWrapper>
    </>
  );
}
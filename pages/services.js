import Head from "next/head";
import SectionWrapper from "../components/SectionWrapper";
import { placeholderImage } from "../data/products";
import { useState } from "react";
import { motion } from "framer-motion";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
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

const accordionData = [
  {
    title: "CHIROPRATIC MASSAGE",
    content: `Chiropractic massage, also known as chiropractic manipulation or manual therapy, combines elements of chiropractic care with massage techniques to address musculoskeletal issues and promote overall well-being.
              Here are some potential health benefits associated with chiropractic massage:
              1. Pain Relief: Chiropractic massage can help alleviate acute and chronic pain in the muscles, joints, and soft tissues. By applying targeted pressure and manipulation techniques, chiropractors can release tension, reduce inflammation, and improve mobility, leading to pain relief.
              2. Improved Spinal Alignment: Chiropractic massage often focuses on spinal manipulation to correct misalignments or subluxations in the spine. By realigning the vertebrae, chiropractors aim to restore proper function to the nervous system, relieve pressure on nerves, and promote better posture and spinal health.
              3. Enhanced Range of Motion: Tight muscles, adhesions, and joint restrictions can limit flexibility and range of motion. Chiropractic massage techniques, such as stretching, mobilization, and deep tissue massage, can help loosen muscles, break up scar tissue, and improve joint mobility, allowing for greater flexibility and movement.
              4. Stress Reduction: Like traditional massage therapy, chiropractic massage promotes relaxation and reduces stress levels. By targeting tense muscles and promoting the release of endorphins, chiropractic massage can induce a state of deep relaxation, calm the nervous system, and improve overall mental well-being.
              5. Improved Circulation: Manipulative techniques used in chiropractic massage can enhance blood flow to muscles, tissues, and organs. Improved circulation delivers oxygen and nutrients to cells, removes metabolic waste products, and promotes tissue healing and regeneration.
              6. Headache and Migraine Relief: Chiropractic massage may be beneficial for individuals experiencing tension headaches or migraines. By addressing muscular tension in the neck, shoulders, and upper back, chiropractors can help reduce headache frequency, intensity, and duration.
              7. Injury Rehabilitation: Chiropractic massage can be an integral part of injury rehabilitation programs, helping individuals recover from sports injuries, whiplash, strains, sprains, and other musculoskeletal injuries. By addressing underlying biomechanical imbalances and promoting tissue healing, chiropractic massage supports the body’s natural healing process.
              8. Preventive Care: Regular chiropractic massage sessions can help prevent injuries, reduce the risk of chronic pain conditions, and maintain overall musculoskeletal health. By addressing minor issues before they escalate into more significant problems, chiropractic massage supports long-term wellness and mobility.`,
  },
  {
    title: "SPORTS MASSAGE",
    content: `Sports massage is a form of massage therapy that focuses on enhancing athletic performance, preventing and treating sports-related injuries, and aiding in recovery. It typically involves a combination of techniques including deep tissue massage, stretching, and joint mobilization. Sports massage therapists are trained to understand the specific needs of athletes and tailor their techniques to address those needs.`,
  },
  {
    title: "SOFT TISSUE MASSAGE",
    content: `Soft tissue massage is a type of massage therapy that focuses on the manipulation of the body’s soft tissues, including muscles, tendons, ligaments, and fascia. Unlike deep tissue massage, which targets the deeper layers of muscle tissue, soft tissue massage typically involves lighter pressure and gentler techniques.
             The goal of soft tissue massage is to promote relaxation, relieve muscle tension, improve circulation, and enhance overall well-being. It can be beneficial for individuals experiencing muscular discomfort, stress-related tension, or those seeking relaxation.
             Soft tissue massage techniques may include effleurage (long, gliding strokes), petrissage (kneading and squeezing motions), friction (deep circular movements), and stretching. The therapist may also incorporate elements of Swedish massage, which is known for its soothing and calming effects.
             Soft tissue massage can be used as part of a comprehensive treatment plan for various conditions, including muscle strains, repetitive strain injuries, headaches, and general stress relief. It’s often employed in conjunction with other therapeutic modalities such as exercise, stretching, and heat or cold therapy to optimize results.
             Overall, soft tissue massage can be a valuable tool for promoting physical and mental well-being, reducing muscle tension, and enhancing relaxation.`,
  },
];

export default function AboutPage() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <>
      <Head>
        <title>About | Wellness E-commerce Frontend</title>
        <meta
          name="description"
          content="Mock about page for a modern wellness e-commerce shop."
        />
      </Head>

      <SectionWrapper className="bg-white">
        <div className="mb-10">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-leaf-800">
            Services
          </p>
          <h2 className="mt-3 text-3xl font-bold text-slate-950">
            What we offer
          </h2>
        </div>

        <div className="grid gap-12 lg:grid-cols-[3fr_1fr] lg:items-start">

          {/* LEFT CONTENT (ANIMATED SYSTEM) */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="space-y-8 text-slate-700 leading-7"
          >
            <motion.p variants={fadeUp}>
              <span className="font-semibold text-slate-900">
                Personalized Wellness Plans:
              </span>{" "}
              Tailored wellness plans designed to address individual health goals,
              incorporating nutrition, exercise, stress management, and mindfulness.
            </motion.p>

            <motion.p variants={fadeUp}>
              <span className="font-semibold text-slate-900">
                Nutritional Counseling:
              </span>{" "}
              One-on-one consultations with certified nutritionists to assess dietary
              habits and create personalized nutrition plans.
            </motion.p>

            <motion.p variants={fadeUp}>
              <span className="font-semibold text-slate-900">
                Fitness Training:
              </span>{" "}
              Personal training, group classes, yoga, Pilates, and HIIT programs.
            </motion.p>

            <motion.p variants={fadeUp}>
              <span className="font-semibold text-slate-900">
                Mindfulness and Meditation Sessions:
              </span>{" "}
              Guided practices to reduce stress and improve clarity.
            </motion.p>

            <motion.p variants={fadeUp}>
              <span className="font-semibold text-slate-900">
                Stress Management Workshops:
              </span>{" "}
              Techniques for relaxation, breathing, and coping strategies.
            </motion.p>

            <motion.p variants={fadeUp}>
              <span className="font-semibold text-slate-900">
                Health Coaching:
              </span>{" "}
              Ongoing support to keep clients accountable and motivated.
            </motion.p>

            <motion.p variants={fadeUp}>
              <span className="font-semibold text-slate-900">
                Corporate Wellness Programs:
              </span>{" "}
              Workplace wellness initiatives including fitness and seminars.
            </motion.p>

            <motion.p variants={fadeUp}>
              <span className="font-semibold text-slate-900">
                Nutrition Education Workshops:
              </span>{" "}
              Cooking and nutrition education sessions for healthy living.
            </motion.p>

            <motion.p variants={fadeUp}>
              <span className="font-semibold text-slate-900">
                Holistic Therapies:
              </span>{" "}
              Massage, acupuncture, chiropractic care, and aromatherapy.
            </motion.p>

            <motion.p variants={fadeUp}>
              <span className="font-semibold text-slate-900">
                Wellness Retreats and Getaways:
              </span>{" "}
              Immersive wellness experiences in natural environments.
            </motion.p>

            <motion.p variants={fadeUp}>
              <span className="font-semibold text-slate-900">
                Online Wellness Programs:
              </span>{" "}
              Virtual fitness, meditation, and nutrition programs.
            </motion.p>

            <motion.p variants={fadeUp}>
              <span className="font-semibold text-slate-900">
                Community Events and Support Groups:
              </span>{" "}
              Events that build connection and accountability.
            </motion.p>
          </motion.div>

          {/* RIGHT IMAGE */}
          <motion.div
            variants={imageVariant}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="lg:sticky lg:top-24"
          >
            <img
              src="https://via.placeholder.com/600x800"
              alt="Wellness services"
              className="w-full aspect-[1/3] rounded-2xl border border-slate-200 object-cover shadow-soft"
            />
          </motion.div>

        </div>
      </SectionWrapper>

      {/* =========================
          SECTION 2 - HOLISTIC
      ========================= */}
      <SectionWrapper className="bg-leaf-50">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.2 }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-leaf-800">
            Holistic Therapies
          </p>

          <h2 className="mt-3 text-3xl font-bold text-slate-950">
            Integrative wellness for body and mind
          </h2>

          <p className="mt-5 text-base leading-8 text-slate-600">
            Includes acupuncture, massage therapy, chiropractic care, and aromatherapy
            to reduce tension and promote relaxation.
          </p>
        </motion.div>

        <div className="mx-auto mt-12 max-w-3xl space-y-4">
          {accordionData.map((item, index) => {
            const isOpen = activeIndex === index;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true, amount: 0.2 }}
                className="rounded-xl border border-slate-200 bg-white overflow-hidden"
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="flex w-full items-center justify-between px-6 py-4 text-left text-lg font-semibold"
                >
                  {item.title}
                  <span className="text-xl">{isOpen ? "−" : "+"}</span>
                </button>

               <motion.div
                 initial={false}
                 animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                 transition={{ duration: 0.4, ease: "easeInOut" }}
                 className="overflow-hidden px-6"
               >
                 <div className="py-4">
                  <p className="text-lg leading-6 text-slate-800 whitespace-pre-line">
                    {item.content.split("\n").map((line, i) => {
                      const parts = line.split(":");
                      return (
                          <span key={i} className="block mb-4">
                          {parts.length > 1 ? (
                            <>
                              <span className="font-semibold text-slate-900">
                                {parts[0]}:
                              </span>{" "}
                              {parts.slice(1).join(":")}
                            </>
                          ) : (
                            line
                          )}
                        </span>
                      );
                    })}
                  </p>
                 </div>
               </motion.div>
              </motion.div>
            );
          })}
        </div>
      </SectionWrapper>
    </>
  );
}
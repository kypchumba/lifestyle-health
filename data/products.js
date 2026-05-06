export const placeholderImage = "https://via.placeholder.com/400";

export const categories = [
  {
    id: "herbs",
    name: "Herbs",
    description: "Everyday botanical blends for gentle wellness rituals.",
    image: "/herbs.png"
  },
  {
    id: "spices-nuts",
    name: "Spices & Nuts",
    description: "Pantry staples selected for flavor, texture and balance.",
    image: "/spices.png"
  },
  {
    id: "therapeutic-products",
    name: "Therapeutic Products",
    description: "Self-care essentials for calm, comfort and recovery.",
    image: "/stock.png"
  }
];

export const newProducts = [
  {
    id: "bone-health",
    name: "Bone Health",
    price: 1450,
    oldPrice: 1800,
    image: "/bone.png",
    category: "Herbs",
    description:
      "A leafy wellness blend made for daily routines. Use this mock product description to explain benefits, sourcing, usage notes and serving guidance."
  },
  {
    id: "korean-ginseng",
    name: "Korean Ginseng",
    price: 1680,
    oldPrice: 2000,
    image: "/korean.png",
    category: "Spices & Nuts",
    description:
      "A simple snack mix placeholder built for convenient, balanced nutrition. Use this space for nutritional notes and package size details."
  },
  {
    id: "black-maca",
    name: "Black Maca",
    price: 2100,
    oldPrice: 2500,
    image: "/maca.png",
    category: "Therapeutic Products",
    description:
      "A soothing bath soak placeholder for wind-down routines. Add scent profile, ingredients and usage instructions when product data is ready."
  }
]

export const products = [
  {
    id: "bone-health",
    name: "Bone Health",
    price: 1450,
    oldPrice: 1800,
    image: "/bone.png",
    category: "Herbs",
    description:
      "A leafy wellness blend made for daily routines. Use this mock product description to explain benefits, sourcing, usage notes and serving guidance."
  },
  {
    id: "celtic-salt",
    name: "Celtic Salt",
    price: 1250,
    oldPrice: 1500,
    image: "/celtic.png",
    category: "Herbs",
    description:
      "A bright herbal tea placeholder for a refreshing cup at any time of day. Add real product notes, ingredients and preparation instructions here."
  },
  {
    id: "B-complex-nutrition",
    name: "B-Complex Nutrition",
    price: 980,
    oldPrice: 1200,
    image: "/complex.png",
    category: "Spices & Nuts",
    description:
      "A pantry-friendly turmeric powder placeholder. This area can highlight origin, freshness, suggested pairings and storage advice."
  },
  {
    id: "folic-acid",
    name: "Folic Acid",
    price: 890,
    oldPrice: 1200,
    image: "/folic.png",
    category: "Spices & Nuts",
    description:
      "A warming ginger product placeholder for teas, cooking and wellness blends. Replace this copy with product-specific information."
  },
  {
    id: "korean-ginseng",
    name: "Korean Ginseng",
    price: 1680,
    oldPrice: 2000,
    image: "/korean.png",
    category: "Spices & Nuts",
    description:
      "A simple snack mix placeholder built for convenient, balanced nutrition. Use this space for nutritional notes and package size details."
  },
  {
    id: "black-maca",
    name: "Black Maca",
    price: 2100,
    oldPrice: 2500,
    image: "/maca.png",
    category: "Therapeutic Products",
    description:
      "A soothing bath soak placeholder for wind-down routines. Add scent profile, ingredients and usage instructions when product data is ready."
  },
  {
    id: "probiotic",
    name: "Probiotic",
    price: 2650,
    oldPrice: 3000,
    image: "/probiotic.png",
    category: "Therapeutic Products",
    description:
      "A comfort product placeholder for relaxation and gentle warmth. Replace with care guidance, materials and safety notes."
  },
  {
    id: "shilajit",
    name: "Shilajit",
    price: 1180,
    oldPrice: 1500,
    image: "/shilajit.png",
    category: "Therapeutic Products",
    description:
      "A compact aromatherapy roller placeholder. Use this section for blend details, application guidance and customer-friendly disclaimers."
  },
    {
    id: "multi-vitamin",
    name: "Multi-Vitamin",
    price: 1180,
    oldPrice: 1500,
    image: "/vitamin.png",
    category: "Therapeutic Products",
    description:
      "A compact aromatherapy roller placeholder. Use this section for blend details, application guidance and customer-friendly disclaimers."
  }
];

export function formatCurrency(amount) {
  return new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency: "KES",
    maximumFractionDigits: 0
  }).format(amount);
}

export const placeholderImage = "https://via.placeholder.com/400";

export const categories = [
  {
    id: "herbs",
    name: "Herbs",
    description: "Everyday botanical blends for gentle wellness rituals.",
    image: "/herbs.jpg"
  },
  {
    id: "spices-nuts",
    name: "Spices & Nuts",
    description: "Pantry staples selected for flavor, texture and balance.",
    image: "/spices.jpg"
  },
  {
    id: "therapeutic-products",
    name: "Therapeutic Products",
    description: "Self-care essentials for calm, comfort and recovery.",
    image: "/stock.jpg"
  }
];

export const products = [
  {
    id: "bone-health",
    name: "Bone Health",
    price: 1450,
    image: "/bone.png",
    category: "Herbs",
    description:
      "A leafy wellness blend made for daily routines. Use this mock product description to explain benefits, sourcing, usage notes, and serving guidance."
  },
  {
    id: "celtic-salt",
    name: "Celtic Salt",
    price: 1250,
    image: "/celtic.png",
    category: "Herbs",
    description:
      "A bright herbal tea placeholder for a refreshing cup at any time of day. Add real product notes, ingredients, and preparation instructions here."
  },
  {
    id: "organic-turmeric-powder",
    name: "Organic Turmeric Powder",
    price: 980,
    image: placeholderImage,
    category: "Spices & Nuts",
    description:
      "A pantry-friendly turmeric powder placeholder. This area can highlight origin, freshness, suggested pairings, and storage advice."
  },
  {
    id: "ginger-root-pieces",
    name: "Ginger Root Pieces",
    price: 890,
    image: placeholderImage,
    category: "Spices & Nuts",
    description:
      "A warming ginger product placeholder for teas, cooking, and wellness blends. Replace this copy with product-specific information."
  },
  {
    id: "mixed-nut-wellness-pack",
    name: "Mixed Nut Wellness Pack",
    price: 1680,
    image: placeholderImage,
    category: "Spices & Nuts",
    description:
      "A simple snack mix placeholder built for convenient, balanced nutrition. Use this space for nutritional notes and package size details."
  },
  {
    id: "bath-salt-soak",
    name: "Mineral Bath Salt Soak",
    price: 2100,
    image: placeholderImage,
    category: "Therapeutic Products",
    description:
      "A soothing bath soak placeholder for wind-down routines. Add scent profile, ingredients, and usage instructions when product data is ready."
  },
  {
    id: "lavender-heat-pillow",
    name: "Lavender Heat Pillow",
    price: 2650,
    image: placeholderImage,
    category: "Therapeutic Products",
    description:
      "A comfort product placeholder for relaxation and gentle warmth. Replace with care guidance, materials, and safety notes."
  },
  {
    id: "essential-oil-roller",
    name: "Essential Oil Roller",
    price: 1180,
    image: placeholderImage,
    category: "Therapeutic Products",
    description:
      "A compact aromatherapy roller placeholder. Use this section for blend details, application guidance, and customer-friendly disclaimers."
  }
];

export function formatCurrency(amount) {
  return new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency: "KES",
    maximumFractionDigits: 0
  }).format(amount);
}

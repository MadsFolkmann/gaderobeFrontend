type Clothing = {
  id: number;
  name: string;
  img: string;
  size: string;
  color: string[];
  season: "winter" | "summer" | "spring" | "autumn" | "all";
  brand: string;
  isFavorite: boolean;
  category: string;
  created_at: string;
};

const dummyClothes: Clothing[] = [
  {
    id: 1,
    name: "Nike Pants (L)",
    img: "https://www.tennis-point.dk/dw/image/v2/BBDP_PRD/on/demandware.static/-/Sites-master-catalog/default/dw92ac2027/images/004/465/57597000_000.jpg?q=80&sw=543",
    size: "L",
    color: ["Pink"],
    season: "winter",
    brand: "Nike",
    isFavorite: false,
    category: "Pants",
    created_at: "2024-01-01",
  },
  {
    id: 2,
    name: "Adidas Superstar (44)",
    img: "https://cdn-images.farfetch-contents.com/12/75/60/77/12756077_26912562_1000.jpg",
    size: "44",
    color: ["White", "Black"],
    season: "all",
    brand: "Adidas",
    isFavorite: true,
    category: "Shoes",
    created_at: "2024-01-03",
  },
];

const categories = ["T-shirt", "Sweatshirt", "Hoodie", "Shirts", "Polo", "Pants", "Shorts", "Socks", "Shoes"];
const sizes = ["S", "M", "L", "XL", "44"];
const seasons = ["all", "winter", "summer", "spring", "autumn"];
const brands = ["Nike", "Adidas", "Puma"];

export { categories, sizes, seasons, brands, dummyClothes };
export type { Clothing };
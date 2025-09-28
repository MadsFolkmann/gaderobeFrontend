import { useState, useMemo } from "react";
import searchIcon from "../assets/search_icon.svg";

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

export default function Wardrobe() {
  const [clothing, setClothing] = useState<Clothing[]>(dummyClothes);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedSeason, setSelectedSeason] = useState<string | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<string>("newest");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const ITEMS_PER_PAGE = 12;

  // Toggle favorite
  const handleToggleFavorite = (id: number) => {
    setClothing((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isFavorite: !c.isFavorite } : c))
    );
  };

  // Filter, search & sort logic combined
  const filteredClothes = useMemo(() => {
    return clothing
      .filter((item) =>
        selectedCategory ? item.category === selectedCategory : true
      )
      .filter((item) => (selectedSize ? item.size === selectedSize : true))
      .filter((item) => (selectedSeason ? item.season === selectedSeason : true))
      .filter((item) => (selectedBrand ? item.brand === selectedBrand : true))
      .filter((item) =>
        search.length > 0
          ? item.name.toLowerCase().includes(search.toLowerCase())
          : true
      )
      .sort((a, b) => {
        switch (sortBy) {
          case "newest":
            return (
              new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime()
            );
          case "oldest":
            return (
              new Date(a.created_at).getTime() -
              new Date(b.created_at).getTime()
            );
          case "brand":
            return a.brand.localeCompare(b.brand);
          case "name":
            return a.name.localeCompare(b.name);
          default:
            return 0;
        }
      });
  }, [clothing, selectedCategory, selectedSize, selectedSeason, selectedBrand, sortBy, search]);

  // Pagination
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const visibleClothing = filteredClothes.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const pageCount = Math.ceil(filteredClothes.length / ITEMS_PER_PAGE);

  return (
    <div className="flex min-h-screen">
      <aside className="w-1/5 border-r p-4">
        <h2 className="text-lg font-bold mb-4">Clothing</h2>
        <ul className="space-y-2">
          {categories.map((cat) => (
            <li key={cat}>
              <button
                onClick={() => {
                  setSelectedCategory(cat === selectedCategory ? null : cat);
                  setPage(1);
                }}
                className={`block text-left w-full px-2 py-1 rounded hover:bg-gray-100 ${
                  selectedCategory === cat ? "font-bold underline" : ""
                }`}
              >
                {cat}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      <main className="flex-1 p-6">
        <div className="flex flex-wrap gap-4 items-center justify-between mb-6">
          <div className="flex gap-4">
            <select
              className="border p-2 rounded"
              onChange={(e) => {
                setSelectedSize(e.target.value !== "all" ? e.target.value : null);
                setPage(1);
              }}
            >
              <option value="all">Filter by size</option>
              {sizes.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>

            <select
              className="border p-2 rounded"
              onChange={(e) => {
                setSelectedSeason(e.target.value !== "all" ? e.target.value : null);
                setPage(1);
              }}
            >
              <option value="all">Filter by season</option>
              {seasons.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>

            <select
              className="border p-2 rounded"
              onChange={(e) => {
                setSelectedBrand(e.target.value !== "all" ? e.target.value : null);
                setPage(1);
              }}
            >
              <option value="all">Filter by brand</option>
              {brands.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>

            <select
              className="border p-2 rounded"
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="newest">Sort by newest</option>
              <option value="oldest">Sort by oldest</option>
              <option value="brand">Sort by brand</option>
              <option value="name">Sort by name</option>
            </select>
          </div>

          {/* Search */}
          <div className="flex items-center border px-2 rounded w-64">
            <input
              type="text"
              placeholder="Search..."
              className="flex-1 p-2 outline-none"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
            <img src={searchIcon} alt="Search" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {visibleClothing.map((item) => (
            <div
              key={item.id}
              className="border rounded shadow hover:shadow-lg transition p-2 relative"
            >
              <button
                onClick={() => handleToggleFavorite(item.id)}
                className="absolute top-2 right-2 text-xl"
              >
                {item.isFavorite ? "⭐" : "☆"}
              </button>
              <img
                src={item.img}
                alt={item.name}
                className="w-full h-40 object-contain mb-2"
              />
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-sm text-gray-700">Season: {item.season}</p>
              <p className="text-sm text-gray-700">Color: {item.color.join(", ")}</p>
              <p className="text-sm text-gray-700">Brand: {item.brand}</p>
              <p className="text-sm text-gray-700">Category: {item.category}</p>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-6 gap-2">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="px-4 py-2 border rounded disabled:opacity-50"
          >
            Prev
          </button>
          <span className="px-4 py-2">{page} / {pageCount}</span>
          <button
            disabled={page === pageCount}
            onClick={() => setPage((p) => p + 1)}
            className="px-4 py-2 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </main>
    </div>
  );
}
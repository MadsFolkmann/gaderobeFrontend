// src/pages/Wardrobe.tsx
import { useState, useMemo } from "react";
import ClothingCard from "../components/ClothingCard";
import FilterPanel from "../components/FilterPanel";
import Pagination from "../components/Pagination";
import { categories, sizes, seasons, brands, dummyClothes } from "../services/Constants"; 
import type { Clothing } from "../services/Constants";


export default function Wardrobe() {
  const [clothing, setClothing] = useState<Clothing[]>(dummyClothes);
  const [selectedCategory, setSelectedCategory] = useState< string | null>(null);
  const [selectedBrand, setSelectedBrand] = useState< string | null>(null);
  const [selectedSize, setSelectedSize] = useState< string | null>(null);
  const [selectedSeason, setSelectedSeason] = useState< string | null>(null);
  const [search, setSearch] = useState< string | null>("");  
  const [sortBy, setSortBy] = useState< string | null>("name");  
  const [page, setPage] = useState(1)


  const handleToggleFavorite = (id: number ) => {
    setClothing((prev) => 
    prev.map((clothing) => clothing.id === id ? {...clothing, isFavorite: !clothing.isFavorite }: clothing)
    )
  }

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
          case "brand":
            return a.brand.localeCompare(b.brand);
          case "name":
            return a.name.localeCompare(b.name);
          default:
            return 0;
        }
      });
  }, [clothing, selectedCategory, selectedSize, selectedSeason, selectedBrand, sortBy, search]);

  const itemsPerPage = 12;

    const startIndex = (page - 1) * itemsPerPage;
    const visibleClothing = filteredClothes.slice(
      startIndex,
      startIndex+itemsPerPage
    );

    const pageCount = Math.ceil(filteredClothes.length / itemsPerPage);
  


  return (
    <div className="flex min-h-screen">
      <aside className="w-1/5 border-r p-4">
        <h2 className="text-lg font-bold mb-4">Clothing</h2>
        <ul className="space-y-2">
          <li key={"all"}>
            <button
            onClick={() => {
              setSelectedCategory(null);
              setPage(1);
            }}
            className={`cursor-pointer block text-left w-full px-2 py-1 rounded hover:bg-gray-100 ${
              selectedCategory === null ? "font-bold underline" : ""
            }`}>
              All</button>
          </li>
          {categories.map((cat) => (
            <li key={cat}>
              <button
                onClick={() => {
                  setSelectedCategory(cat === selectedCategory ? null : cat);
                  setPage(1);
                }}
                className={`cursor-pointer block text-left w-full px-2 py-1 rounded hover:bg-gray-100 ${
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
        <FilterPanel
          sizes={sizes}
          seasons={seasons}
          brands={brands}
          sortBy={sortBy}
          selectedSize={selectedSize}
          selectedSeason={selectedSeason}
          selectedBrand={selectedBrand}
          onBrandChange={(value) => {
            setSelectedBrand(value);
            setPage(1);
          }}
          onSeasonChange={(value) => {
            setSelectedSeason(value);
            setPage(1)
          }}
          onSizeChange={(value) => {
            setSelectedSize(value);
            setPage(1)
          }}
          search={search}
          onSortChange={setSortBy}
          onSearchChange={(value) => {
            setSearch(value);
            setPage(1);
          }}
                    />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {visibleClothing.map((item) => (
            <ClothingCard
              key={item.id}
              item={item}
              onToggleFavorite={handleToggleFavorite}
            />
          ))}
        </div>

        <Pagination
          page={page}
          pageCount={pageCount}
          onPageChange={setPage}
        />

      </main>
    </div>
  );
}
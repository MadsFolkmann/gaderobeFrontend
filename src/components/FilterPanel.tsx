import React from "react";
import searchIcon from "../assets/search_icon.svg";

type FilterPanelProps = {
  sizes: string[];
  seasons: string[];
  brands: string[];
  sortBy: string;
  selectedSize: string | null;
  selectedSeason: string | null;
  selectedBrand: string | null;
  onSizeChange: (value: string | null) => void;
  onSeasonChange: (value: string | null) => void;
  onBrandChange: (value: string | null) => void;
  onSortChange: (value: string) => void;
  search: string;
  onSearchChange: (value: string) => void;
};

export default function FilterPanel({
  sizes,
  seasons,
  brands,
  sortBy,
  selectedSize,
  selectedSeason,
  selectedBrand,
  onSizeChange,
  onSeasonChange,
  onBrandChange,
  onSortChange,
  search,
  onSearchChange,
}: FilterPanelProps) {
  return (
    <div className="flex flex-wrap gap-4 items-center justify-between mb-6">
      <div className="flex gap-4">
        <select
          className="border p-2 rounded"
          value={selectedSize ?? "all"}
          onChange={(e) =>
            onSizeChange(e.target.value !== "all" ? e.target.value : null)
          }
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
          value={selectedSeason ?? "all"}
          onChange={(e) =>
            onSeasonChange(e.target.value !== "all" ? e.target.value : null)
          }
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
          value={selectedBrand ?? "all"}
          onChange={(e) =>
            onBrandChange(e.target.value !== "all" ? e.target.value : null)
          }
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
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
        >
          <option value="brand">Sort by brand</option>
          <option value="name">Sort by name</option>
        </select>
      </div>

      <div className="flex items-center border px-2 rounded w-64">
        <input
          type="text"
          placeholder="Search..."
          className="flex-1 p-2 outline-none"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        <img src={searchIcon} alt="Search" />
      </div>
    </div>
  );
}
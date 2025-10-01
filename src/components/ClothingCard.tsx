import React from "react";

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

type Props = {
  item: Clothing;
  onToggleFavorite: (id: number) => void;
};

export default function ClothingCard({ item, onToggleFavorite }: Props) {
  return (
    <div className="border rounded shadow hover:shadow-lg transition p-8 relative">
      <button
        onClick={() => onToggleFavorite(item.id)}
        className="absolute top-2 right-2 text-xl cursor-pointer"
      >
        {item.isFavorite ? "⭐" : "☆"}
      </button>

      <img
        src={item.img}
        alt={item.name}
        className="w-full h-60 object-contain mb-2"
      />

      <h3 className="font-semibold">{item.name}</h3>
      <p className="text-sm text-gray-700">Season: {item.season}</p>
      <p className="text-sm text-gray-700">
        Color: {item.color.join(", ")}
      </p>
      <p className="text-sm text-gray-700">Brand: {item.brand}</p>
      <p className="text-sm text-gray-700">Category: {item.category}</p>
    </div>
  );
}
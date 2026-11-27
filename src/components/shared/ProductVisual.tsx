"use client";

import React from "react";
import type { Product } from "@/data/catalog";

interface ProductVisualProps {
  product: Product;
  compact?: boolean;
  outOfStock?: boolean;
}

export function ProductVisual({
  product,
  compact = false,
  outOfStock = false,
}: ProductVisualProps) {
  return (
    <div
      className={`relative w-full overflow-hidden bg-white select-none flex items-center justify-center ${
        compact ? "h-[132px] p-2" : "h-[168px] p-3"
      } ${outOfStock ? "opacity-50 grayscale" : ""}`}
    >
      <img
        src={product.imageUrl}
        alt={product.name}
        loading="lazy"
        className="max-h-full max-w-full w-auto h-auto object-contain transition-transform duration-200 group-hover:scale-[1.03]"
      />
    </div>
  );
}

"use client";

import { useState } from "react";
import ProductFilters from "./product-filters";
import { ProductGridLayout, ProductCardLayout, Button } from "@arthur.eudeline/starbucks-tp-kit";
import type { ProductFiltersResult } from "@/types";

type Category = {
  id: string | number;
  name: string;
  slug: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  products: any[];
};

type ProductListWithFiltersProps = {
  categories: Category[];
};

export default function ProductListWithFilters({ categories }: ProductListWithFiltersProps) {
  const [filters, setFilters] = useState<ProductFiltersResult>({
    categoriesSlug: [],
    search: "",
  });

  const filteredCategories = categories;

  return (
    <div style={{ display: "flex", gap: "2rem" }}>
      <div style={{ minWidth: "250px" }}>
        <ProductFilters categories={categories} onChange={setFilters} />
      </div>

      <div style={{ flex: 1 }}>
        {filteredCategories.map((category) => (
          <section key={category.id} style={{ marginBottom: "3rem" }}>
            <header style={{ display: "flex", alignItems: "center", marginBottom: "1.5rem" }}>
              <h2 style={{ fontSize: "2rem", fontWeight: 700, margin: 0 }}>
                {category.name} ({category.products.length})
              </h2>
            </header>

            <ProductGridLayout products={category.products}>
              {(product) => (
                <ProductCardLayout
                  key={product.id}
                  product={product}
                  button={<Button style={{ width: "100%" }}>Ajouter au panier</Button>}
                />
              )}
            </ProductGridLayout>
          </section>
        ))}
      </div>
    </div>
  );
}

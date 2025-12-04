"use client";

import { useState, useEffect} from "react";
import ProductFilters from "./product-filters";
import { ProductGridLayout, ProductCardLayout } from "@arthur.eudeline/starbucks-tp-kit";
import AddToCartButton from "./AddToCartButton";
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

    const [filteredCategories, setFilteredCategories] = useState<Category[]>(categories);
    const [loading, setLoading] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.search) params.set("search", filters.search);
    filters.categoriesSlug.forEach((cat) => params.append("cat", cat));

    setLoading(true);
    fetch(`/api/product-filters?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        setFilteredCategories(data.categories);
      })
      .finally(() => setLoading(false));
  }, [filters]);

  return (
    <div style={{ display: "flex", gap: "2rem" }}>
      <ProductFilters categories={categories} onChange={setFilters} />

      <div style={{ flex: 1 }}>
        {loading ? (
          <p style={{ textAlign: "center", color: "#666", marginTop: "2rem" }}>
            Chargement...
          </p>
        ) : (
          <>
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
                      button={
                        <AddToCartButton product={product} style={{ width: "100%" }} />
                      }
                    />
                  )}
                </ProductGridLayout>
              </section>
            ))}

            {filteredCategories.length === 0 && (
              <p style={{ textAlign: "center", color: "#666", marginTop: "2rem" }}>
                Aucun produit trouvé pour ces filtres.
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}
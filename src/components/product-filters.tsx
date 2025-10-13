"use client";

import { useForm } from "@mantine/form";
import { Button, Checkbox } from "@arthur.eudeline/starbucks-tp-kit";
import { MagnifyingGlass } from "@phosphor-icons/react";
import type { ProductFiltersResult } from "@/types";

type Category = {
  id: string | number;
  name: string;
  slug: string;
};

type ProductFiltersProps = {
  categories: Category[];
  onChange: (filters: ProductFiltersResult) => void;
};

export default function ProductFilters({ categories, onChange }: ProductFiltersProps) {
  const form = useForm<ProductFiltersResult>({
    initialValues: {
      categoriesSlug: [],
      search: "",
    },
  });

  return (
    <form
      onSubmit={form.onSubmit((values) => onChange(values))}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
        background: "#fff",
        borderRadius: "12px",
        padding: "2rem",
        border: "1px solid #e5e7eb",
        minWidth: 260,
      }}
    >
      {/* Champ de recherche */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <MagnifyingGlass size={20} />
        <input
          type="text"
          placeholder="Rechercher une boisson"
          {...form.getInputProps("search")}
          style={{
            flex: 1,
            border: "1px solid #e5e7eb",
            borderRadius: "6px",
            padding: "0.5rem 0.75rem",
            fontSize: "1rem",
          }}
        />
      </div>

      {/* Checkboxes catégories */}
      <div>
        <div style={{ fontWeight: 600, marginBottom: "0.5rem" }}>Catégories</div>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          {categories.map((cat) => (
            <Checkbox
              key={cat.slug}
              label={cat.name}
              value={cat.slug}
              checked={form.values.categoriesSlug.includes(cat.slug)}
              onChange={(checked) => {
                form.setFieldValue(
                  "categoriesSlug",
                  checked
                    ? [...form.values.categoriesSlug, cat.slug]
                    : form.values.categoriesSlug.filter((slug) => slug !== cat.slug)
                );
              }}
            />
          ))}
        </div>
      </div>

      {/* Bouton filtrer */}
      <Button type="submit" style={{ width: "100%" }}>
        Filtrer
      </Button>
    </form>
  );
}
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
        background: "white",
        borderRadius: "16px",
        padding: "2rem",
        border: "1px solid #e5e7eb",
        minWidth: 280,
        maxWidth: 320,
        height: "fit-content",
        maxHeight: "calc(100vh - 4rem)",
        position: "sticky",
        top: "2rem",
        boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* Champ de recherche */}
      <div>
        <label 
          htmlFor="search-input" 
          style={{ 
            display: "block",
            fontSize: "0.875rem",
            fontWeight: 600,
            color: "#374151",
            marginBottom: "0.5rem"
          }}
        >
          Rechercher
        </label>
        <div style={{ 
          position: "relative",
          display: "flex",
          alignItems: "center"
        }}>
          <div style={{
            position: "absolute",
            left: "0.75rem",
            display: "flex",
            alignItems: "center",
            pointerEvents: "none"
          }}>
            <MagnifyingGlass size={20} weight="bold" color="#00704A" />
          </div>
          <input
            id="search-input"
            type="text"
            placeholder="Nom de boisson..."
            {...form.getInputProps("search")}
            style={{
              width: "100%",
              paddingLeft: "2.5rem",
              paddingRight: "1rem",
              paddingTop: "0.625rem",
              paddingBottom: "0.625rem",
              border: "1px solid #d1d5db",
              borderRadius: "8px",
              fontSize: "0.875rem",
              transition: "all 0.2s",
              outline: "none",
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "#00704A";
              e.target.style.boxShadow = "0 0 0 3px rgba(0, 112, 74, 0.1)";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "#d1d5db";
              e.target.style.boxShadow = "none";
            }}
          />
        </div>
      </div>

      {/* Séparateur */}
      <div style={{ 
        height: "1px", 
        background: "#e5e7eb",
        margin: "0 -1rem"
      }} />

      {/* Checkboxes catégories avec scroll */}
      <div style={{ 
        display: "flex", 
        flexDirection: "column",
        minHeight: 0,
        flex: 1
      }}>
        <label 
          style={{ 
            display: "block",
            fontSize: "0.875rem",
            fontWeight: 600,
            color: "#374151",
            marginBottom: "0.75rem"
          }}
        >
          Catégories
        </label>
        <div style={{ 
          display: "flex", 
          flexDirection: "column", 
          gap: "0.75rem",
          overflowY: "auto",
          maxHeight: "300px",
          paddingRight: "0.5rem",
          // Style personnalisé pour la scrollbar
          scrollbarWidth: "thin",
          scrollbarColor: "#00704A #f3f4f6"
        }}>
          {categories.map((cat) => (
            <div 
              key={cat.slug}
              style={{
                padding: "0.5rem",
                borderRadius: "6px",
                transition: "background-color 0.2s"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#f9fafb";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              <Checkbox
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
            </div>
          ))}
        </div>
      </div>

      {/* Séparateur */}
      <div style={{ 
        height: "1px", 
        background: "#e5e7eb",
        margin: "0 -1rem"
      }} />

      {/* Bouton filtrer */}
      <Button 
        type="submit" 
        style={{ 
          width: "100%",
          backgroundColor: "#00704A",
          color: "white",
          fontWeight: 600,
          padding: "0.75rem",
          borderRadius: "8px",
          border: "none",
          cursor: "pointer",
          transition: "all 0.2s",
          fontSize: "0.9375rem"
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "#005a3c";
          e.currentTarget.style.transform = "translateY(-1px)";
          e.currentTarget.style.boxShadow = "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "#00704A";
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        Appliquer les filtres
      </Button>

      {/* Bouton réinitialiser (si des filtres sont actifs) */}
      {(form.values.categoriesSlug.length > 0 || form.values.search) && (
        <button
          type="button"
          onClick={() => {
            form.reset();
            onChange({ categoriesSlug: [], search: "" });
          }}
          style={{
            width: "100%",
            backgroundColor: "transparent",
            color: "#6b7280",
            fontWeight: 500,
            padding: "0.5rem",
            borderRadius: "6px",
            border: "1px solid #e5e7eb",
            cursor: "pointer",
            transition: "all 0.2s",
            fontSize: "0.875rem"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#f9fafb";
            e.currentTarget.style.borderColor = "#d1d5db";
            e.currentTarget.style.color = "#374151";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
            e.currentTarget.style.borderColor = "#e5e7eb";
            e.currentTarget.style.color = "#6b7280";
          }}
        >
          Réinitialiser
        </button>
      )}
    </form>
  );
}
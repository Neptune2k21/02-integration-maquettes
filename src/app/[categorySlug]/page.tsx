import { PRODUCTS_CATEGORY_DATA } from "@arthur.eudeline/starbucks-tp-kit/data";
import { ProductGridLayout, ProductCardLayout, BreadCrumbs, SectionContainer } from "@arthur.eudeline/starbucks-tp-kit";
import AddToCartButton from "@/components/AddToCartButton";
import { cache } from "react";
import type { Metadata } from "next";
/**
 * Récupère une catégorie produit à partir de son slug
 */
const getCategory = cache(async (slug: string) => {
  return PRODUCTS_CATEGORY_DATA.find(cat => cat.slug === slug) ?? null;
});

export async function generateMetadata({ params }: { params: Promise<{ categorySlug: string }> }): Promise<Metadata> {
  const { categorySlug } = await params;
  const category = PRODUCTS_CATEGORY_DATA.find(cat => cat.slug === categorySlug);
  
  if (!category) {
    return {
      title: "Catégorie introuvable",
      description: "Cette catégorie n'existe pas.",
    };
  }

  return {
    title: category.name,
    description: `Trouvez votre inspiration avec un vaste choix de boissons Starbucks parmi nos produits ${category.name}`,
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ categorySlug: string }> }) {
  const { categorySlug } = await params;
  const category = await getCategory(categorySlug);

  if (!category) {
    return (
      <main>
        <SectionContainer>
          <BreadCrumbs items={[{ label: "Accueil", url: "/" }]} />
          <h2>Catégorie introuvable</h2>
          <p>Aucune catégorie ne correspond au slug <strong>{(await params).categorySlug}</strong>.</p>
        </SectionContainer>
      </main>
    );
  }

  return (
    <main>
      <SectionContainer>
        <BreadCrumbs items={[
          { label: "Accueil", url: "/" },
          { label: category.name, url: `/${category.slug}` }
        ]} />
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
      </SectionContainer>
    </main>
  );
}
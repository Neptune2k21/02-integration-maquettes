import { PRODUCTS_CATEGORY_DATA } from "@arthur.eudeline/starbucks-tp-kit/data";
import { ProductGridLayout, ProductCardLayout, Button, BreadCrumbs, SectionContainer } from "@arthur.eudeline/starbucks-tp-kit";
import { cache } from "react";

/**
 * Récupère une catégorie produit à partir de son slug
 */
const getCategory = cache(async (slug: string) => {
  return PRODUCTS_CATEGORY_DATA.find(cat => cat.slug === slug) ?? null;
});

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
                <Button style={{ width: "100%" }}>
                  Ajouter au panier
                </Button>
              }
            />
          )}
        </ProductGridLayout>
      </SectionContainer>
    </main>
  );
}
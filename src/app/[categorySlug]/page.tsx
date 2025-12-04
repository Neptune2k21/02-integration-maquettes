import { ProductGridLayout, ProductCardLayout, BreadCrumbs, SectionContainer } from "@arthur.eudeline/starbucks-tp-kit";
import AddToCartButton from "@/components/AddToCartButton";
import { prisma } from "../../../prisma/lib/prisma";
import { cache } from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

const getCategory = cache(async (slug: string) => {
  console.log("getCategory");
  return await prisma.productCategory.findUnique({
    where: { slug },
    include: { products: true },
  });
});

export async function generateMetadata({ params }: { params: { categorySlug: string } }): Promise<Metadata> {
  const category = await getCategory(params.categorySlug);

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

export default async function CategoryPage({ params }: { params: { categorySlug: string } }) {
  const category = await getCategory(params.categorySlug);

  if (!category) {
    notFound();
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
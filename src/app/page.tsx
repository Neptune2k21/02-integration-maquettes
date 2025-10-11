import { BreadCrumbs, SectionContainer, Button, ProductGridLayout, ProductCardLayout } from "@arthur.eudeline/starbucks-tp-kit";
import { PRODUCTS_CATEGORY_DATA } from "@arthur.eudeline/starbucks-tp-kit/data";
import Link from "next/link";

export const metadata = {
  title: "Page d'accueil",
  description: "Commandez votre boisson préférée",
};

export default function Home() {
  const categories = PRODUCTS_CATEGORY_DATA;
  return (
      <main >
        <SectionContainer>
          <BreadCrumbs
            items={[
              { label: "Accueil", url: "#1" },
            ]}
          />
          {categories.map((category) => (
            <section key={category.id} style={{ marginBottom: "3rem" }}>
              <header style={{ display: "flex", alignItems: "center", marginBottom: "1.5rem" }}>
                <h2 style={{ fontSize: "2rem", fontWeight: 700, margin: 0 }}>
                  <Link href={`/${category.slug}`} style={{ color: "inherit", textDecoration: "none" }}>
                    {category.name} ({category.products.length})
                  </Link>
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
            </section>
          ))}
        </SectionContainer>
      </main>
  );
}

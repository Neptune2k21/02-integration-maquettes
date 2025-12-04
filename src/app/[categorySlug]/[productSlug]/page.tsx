import { prisma } from "../../../../prisma/lib/prisma";
import { 
  BreadCrumbs, 
  SectionContainer, 
  ProductGridLayout, 
  ProductCardLayout,
  ProductRating,
  Heading
} from "@arthur.eudeline/starbucks-tp-kit";
import { cache } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import AddToCartButton from "@/components/AddToCartButton";
import ProductAttributesTable, { ProductAttribute } from "@/components/ProductAttributesTable";
import type { Metadata } from "next";

const attributes: ProductAttribute[] = [
  { label: "Intensité", rating: 3 },
  { label: "Volupté", rating: 2 },
  { label: "Amertume", rating: 1 },
  { label: "Onctuosité", rating: 4 },
  { label: "Instagramabilité", rating: 5 },
];

// Fonction utilitaire pour récupérer le produit et sa catégorie
const getProduct = cache(async (categorySlug: string, productSlug: string) => {
  const product = await prisma.product.findUnique({
    where: { slug: productSlug },
    include: {
      category: {
        include: {
          products: true,
        },
      },
    },
  });

  if (!product || product.category.slug !== categorySlug) {
    return null;
  }

  const relatedProducts = product.category.products.filter(
    (p) => p.slug !== productSlug
  );

  return {
    ...product,
    category: {
      ...product.category,
      products: relatedProducts,
    },
  };
});

export async function generateMetadata({ params }: { params: { categorySlug: string; productSlug: string } }): Promise<Metadata> {
  const product = await getProduct(params.categorySlug, params.productSlug);

  if (!product) {
    return {
      title: "Produit introuvable",
      description: "Ce produit n'existe pas.",
    };
  }
  return {
    title: product.name,
    description: product.desc && product.desc.trim().length > 0
      ? product.desc
      : `Succombez pour notre ${product.name} et commandez-le sur notre site !`,
  };
}

export default async function ProductPage({ params }: { params: { categorySlug: string; productSlug: string } }) {
  const product = await getProduct(params.categorySlug, params.productSlug);
  if (!product) return notFound();

  return (
    <main style={{ minHeight: "100vh", backgroundColor: "#f9fafb" }}>
      <SectionContainer>
        <div style={{ paddingTop: "1rem", marginBottom: "2rem" }}>
          <BreadCrumbs items={[
            { label: "Accueil", url: "/" },
            { label: product.category.name, url: `/${product.category.slug}` },
            { label: product.name, url: `/${product.category.slug}/${product.slug}` }
          ]} />
        </div>

        {/* Section produit principal */}
        <section
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(300px, 1fr) minmax(400px, 2fr)",
            gap: "3rem",
            marginBottom: "4rem",
            background: "white",
            borderRadius: "16px",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
            padding: "2.5rem",
            border: "1px solid #e5e7eb"
          }}
        >
          {/* Image du produit */}
          <div style={{ 
            display: "flex", 
            flexDirection: "column", 
            alignItems: "center",
            position: "sticky",
            top: "2rem",
            height: "fit-content"
          }}>
            <div style={{
              background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
              borderRadius: "16px",
              padding: "1.5rem",
              width: "100%",
              display: "flex",
              justifyContent: "center"
            }}>
              <Image
                src={product.img}
                alt={product.name}
                width={350}
                height={350}
                priority
                style={{ 
                  height: "auto", 
                  borderRadius: "12px",
                  maxWidth: "100%"
                }}
              />
            </div>
          </div>
          
          {/* Informations du produit */}
          <div style={{ 
            display: "flex", 
            flexDirection: "column", 
            gap: "1.5rem",
            justifyContent: "space-between"
          }}>
            <div>
              <Heading as="h1" size="lg">
                {product.name}
              </Heading>
              
              <div style={{ marginBottom: "1rem" }}>
                <ProductRating value={5} />
              </div>
              
              <p style={{ 
                fontSize: "1.125rem", 
                lineHeight: "1.7", 
                color: "#4b5563",
                marginBottom: "2rem"
              }}>
                {product.desc}
              </p>
            </div>

            {/* Prix et bouton */}
            <div style={{
              background: "#f9fafb",
              borderRadius: "12px",
              padding: "1.5rem",
              border: "1px solid #e5e7eb"
            }}>
              <div style={{ marginBottom: "1.5rem" }}>
                <span style={{ 
                  fontSize: "2.25rem", 
                  fontWeight: 700, 
                  color: "#00704A",
                  display: "block"
                }}>
                  {product.price}€
                </span>
                <span style={{ color: "#6b7280", fontSize: "0.875rem" }}>
                  Prix TTC
                </span>
              </div>
              
              <AddToCartButton 
                product={product}
                style={{ 
                  width: "100%", 
                  padding: "1rem 2rem", 
                  fontSize: "1.125rem", 
                  fontWeight: 600,
                  backgroundColor: "#00704A",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  transition: "all 0.2s"
                }}
              />
            </div>

            {/* Attributs du produit */}
            <div style={{
              background: "white",
              borderRadius: "12px",
              border: "1px solid #e5e7eb",
              overflow: "hidden"
            }}>
              <div style={{ 
                padding: "1.25rem 1.5rem", 
                borderBottom: "1px solid #e5e7eb",
                background: "#f8fafc"
              }}>
                <Heading as="h3" size="md" >
                  Attributs du produit
                </Heading>
              </div>
              <div style={{ padding: "1.5rem" }}>
                <ProductAttributesTable attributes={attributes} />
              </div>
            </div>
          </div>
        </section>

        {/* Section produits liés */}
        {product.category.products.length > 0 && (
          <section style={{
            background: "white",
            borderRadius: "16px",
            padding: "2.5rem",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
            border: "1px solid #e5e7eb"
          }}>
            <header style={{ 
              marginBottom: "2rem",
              paddingBottom: "1rem",
              borderBottom: "2px solid #e5e7eb"
            }}>
              <Heading as="h2" size="lg">
                <Link 
                  href={`/${product.category.slug}`} 
                  style={{ 
                    color: "inherit", 
                    textDecoration: "none",
                    transition: "color 0.2s"
                  }}
                >
                  Autres produits de la catégorie {product.category.name}
                </Link>
              </Heading>
              <p style={{ 
                color: "#6b7280", 
                marginTop: "0.5rem",
                fontSize: "1rem"
              }}>
                Découvrez d&apos;autres produits similaires
              </p>
            </header>
            
            <ProductGridLayout products={product.category.products}>
              {(relatedProduct) => (
                <div key={relatedProduct.id} style={{
                  background: "#f9fafb",
                  borderRadius: "12px",
                  padding: "1rem",
                  border: "1px solid #e5e7eb",
                  transition: "all 0.2s"
                }}>
                  <ProductCardLayout
                    product={relatedProduct}
                    button={
                      <AddToCartButton 
                        product={relatedProduct}
                        style={{ 
                          width: "100%",
                          padding: "0.75rem",
                          fontSize: "0.875rem",
                          fontWeight: 600,
                          backgroundColor: "#00704A",
                          border: "none",
                          borderRadius: "6px",
                          color: "white",
                          cursor: "pointer"
                        }}
                      />
                    }
                  />
                </div>
              )}
            </ProductGridLayout>
          </section>
        )}
      </SectionContainer>
    </main>
  );
}
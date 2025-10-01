import { PRODUCTS_CATEGORY_DATA } from "@arthur.eudeline/starbucks-tp-kit/data";
import { ProductData, ProductsCategoryData } from "@arthur.eudeline/starbucks-tp-kit/types";
import { 
  BreadCrumbs, 
  SectionContainer, 
  Button, 
  ProductGridLayout, 
  ProductCardLayout,
  ProductRating 
} from "@arthur.eudeline/starbucks-tp-kit";
import { cache } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Heading } from "@arthur.eudeline/starbucks-tp-kit";

type Product = ProductData & {
  /**
   * Contient la catégorie pour permettre de lister les produits liés.
   * Ces derniers excluent le produit actuel de la page
   */
  category: ProductsCategoryData
}

/**
 * Trouve un produit à partir de sa catégorie et de son slug
 */
const getProduct = cache(async (categorySlug: string, productSlug: string) : Promise<Product | null> => {
  const category = PRODUCTS_CATEGORY_DATA.find(cat => cat.slug === categorySlug);
  if (!category) return null;

  const product = category.products.find(prod => prod.slug === productSlug);
  if (!product) return null;
  
  return {
    ...product,
    category: {
      ...category,
      // Exclue le produit actuel des produits liés
      products: category.products.filter((prod) => prod.slug !== productSlug),
    }
  }
});

export default async function ProductPage({ 
  params 
}: { 
  params: { categorySlug: string; productSlug: string } 
}) {
  const product = await getProduct(params.categorySlug, params.productSlug);

  if (!product) {
    return (
      notFound()
    );
  }

  return (
    <main>
      <SectionContainer>
        <BreadCrumbs items={[
          { label: "Accueil", url: "/" },
          { label: product.category.name, url: `/category/${product.category.slug}` },
          { label: product.name, url: `/${product.category.slug}/${product.slug}` }
        ]} />
        
        {/* Section produit principal */}
        <section style={{ display: "flex", gap: "2rem", marginBottom: "3rem", flexWrap: "wrap" }}>
          <div style={{ flex: "1", minWidth: "300px" }}>
            <Image
              src={product.img}
              alt={product.name}
              width={400}
              height={400}
              priority
              style={{height: "auto", borderRadius: "8px" }}
            />
          </div>
          
          <div style={{ flex: "1", minWidth: "300px" }}>
            <Heading as="h1" size="lg" >
              {product.name}
            </Heading>
            
            <ProductRating value={5}/>
            
            <p style={{ 
              fontSize: "1.125rem", 
              lineHeight: "1.6", 
              marginBottom: "1.5rem",
              color: "#666" 
            }}>
              {product.desc}
            </p>
            
            <div style={{ marginBottom: "2rem" }}>
              <span style={{ 
                fontSize: "2rem", 
                fontWeight: 700, 
                color: "#00704A" 
              }}>
                {product.price}€
              </span>
            </div>
            
            <Button style={{ 
              width: "100%", 
              padding: "1rem 2rem",
              fontSize: "1.125rem",
              fontWeight: 600
            }}>
              Ajouter au panier
            </Button>
          </div>
        </section>

        {/* Section produits liés */}
        {product.category.products.length > 0 && (
          <section>
            <header style={{ marginBottom: "1.5rem" }}>
              <Heading as ="h2" size="lg">
                <Link 
                  href={`/category/${product.category.slug}`} 
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  Autres produits de la catégorie {product.category.name}
                </Link>
              </Heading>
            </header>
            
            <ProductGridLayout products={product.category.products}>
              {(relatedProduct) => (
                <ProductCardLayout
                  key={relatedProduct.id}
                  product={relatedProduct}
                  button={
                    <Button style={{ width: "100%" }}>
                      Ajouter au panier
                    </Button>
                  }
                />
              )}
            </ProductGridLayout>
          </section>
        )}
      </SectionContainer>
    </main>
  );
}
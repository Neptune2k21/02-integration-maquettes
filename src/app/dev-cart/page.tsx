"use client";
import { PRODUCTS_CATEGORY_DATA } from "@arthur.eudeline/starbucks-tp-kit/data";
import { Button } from "@arthur.eudeline/starbucks-tp-kit/components/button";
import { ProductCardLayout } from "@arthur.eudeline/starbucks-tp-kit/components/products/product-card-layout";
import { SectionContainer } from "@arthur.eudeline/starbucks-tp-kit/components/section-container";
import { addLine } from "@/hooks/use-cart";
import Cart from "@/components/Cart";
import CartCounter from "@/components/CartCounter";
const products = PRODUCTS_CATEGORY_DATA[0].products.slice(0, 3);

export default function DevCartPage() {
  return (
    <SectionContainer
      className="py-36"
      wrapperClassName="flex flex-col lg:flex-row gap-24"
    >
      {/* Produits */}
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 flex-1">
        {products.map((product) => (
          <ProductCardLayout
            key={product.id}
            product={product}
            button={
              <Button
                variant={"ghost"}
                fullWidth
                onClick={() => addLine(product)}
              >
                Ajouter au panier
              </Button>
            }
          />
        ))}
      </section>
      {/* /Produits */}

      {/* Panier */}
      <Cart />
      <CartCounter />
      {/* /Panier */}
    </SectionContainer>
  );
}
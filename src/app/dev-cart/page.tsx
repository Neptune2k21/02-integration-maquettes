"use client";
import { PRODUCTS_CATEGORY_DATA } from "@arthur.eudeline/starbucks-tp-kit/data";
import { Button } from "@arthur.eudeline/starbucks-tp-kit/components/button";
import { ProductCardLayout } from "@arthur.eudeline/starbucks-tp-kit/components/products/product-card-layout";
import { SectionContainer } from "@arthur.eudeline/starbucks-tp-kit/components/section-container";
import { ProductCartLine } from "@arthur.eudeline/starbucks-tp-kit";
import { addLine, useCart } from "@/hooks/use-cart";
const products = PRODUCTS_CATEGORY_DATA[0].products.slice(0, 3);



export default function DevCartPage() {
  const lines = useCart((state) => state.lines);
  const total = lines.reduce(
    (sum, line) => sum + (line.product.price ?? 0) * line.qty,
    0
  );

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
      <section className="w-full lg:w-1/3 space-y-8">
        <div className="bg-white rounded-xl shadow p-6 space-y-6 border border-gray-100">
          <h2 className="text-xl font-bold mb-4">Votre panier</h2>
          <div className="space-y-4">
            {lines.length === 0 && (
              <div className="text-gray-500 text-center">Votre panier est vide.</div>
            )}
            {lines.map((line) => (
              <ProductCartLine
                key={line.product.id}
                product={line.product}
                qty={line.qty}
                onDelete={() => {}}
                onQtyChange={() => {}}
              />
            ))}
          </div>
          <div className="flex justify-between items-center pt-4 border-t">
            <span className="font-semibold text-lg">Total</span>
            <span className="font-bold text-lg">{total.toFixed(2)} €</span>
          </div>
          <Button variant="primary" fullWidth>Commander</Button>
        </div>
        <Button variant={"outline"} fullWidth>Vider le panier</Button>
      </section>
      {/* /Panier */}
    </SectionContainer>
  );
}
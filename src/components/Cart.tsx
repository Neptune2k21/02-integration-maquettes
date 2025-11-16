import { useCart, updateLine, removeLine, clearCart, computeCartTotal } from "@/hooks/use-cart";
import { ProductCartLine, Button } from "@arthur.eudeline/starbucks-tp-kit";

export default function Cart() {
  const lines = useCart((state) => state.lines);
  const total = computeCartTotal(lines);

  return (
    <section className="flex flex-col gap-4 w-full">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
          <h2 className="text-lg font-bold text-gray-900">Votre panier</h2>
        </div>
        
        <div className="px-4 py-3">
          {lines.length === 0 ? (
            <div className="text-gray-500 text-center py-8 text-sm">
              Votre panier est vide
            </div>
          ) : (
            <div className="space-y-3 max-h-[400px] overflow-y-auto">
              {lines.map((line) => (
                <ProductCartLine
                  key={line.product.id}
                  product={line.product}
                  qty={line.qty}
                  onDelete={() => removeLine(line.product.id)}
                  onQtyChange={(qty) => updateLine({ ...line, qty })}
                />
              ))}
            </div>
          )}
        </div>

        {lines.length > 0 && (
          <>
            <div className="px-4 py-3 border-t border-gray-200 bg-gray-50">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-900">Total</span>
                <span className="font-bold text-xl text-[#00704A]">
                  {total.toFixed(2)} €
                </span>
              </div>
            </div>
            
            <div className="px-4 py-3 space-y-2">
              <Button variant="primary" fullWidth>
                Commander
              </Button>
              <Button variant="outline" fullWidth onClick={clearCart}>
                Vider le panier
              </Button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
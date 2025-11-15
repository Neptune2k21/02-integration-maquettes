import { useCart, updateLine, removeLine, clearCart, computeCartTotal } from "@/hooks/use-cart";
import { ProductCartLine, Button } from "@arthur.eudeline/starbucks-tp-kit";

export default function Cart() {
  const lines = useCart((state) => state.lines);
  const total = computeCartTotal(lines);

  return (
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
              onDelete={() => removeLine(line.product.id)}
              onQtyChange={(qty) => updateLine({ ...line, qty })}
            />
          ))}
        </div>
        <div className="flex justify-between items-center pt-4 border-t">
          <span className="font-semibold text-lg">Total</span>
          <span className="font-bold text-lg">{total.toFixed(2)} €</span>
        </div>
        <Button variant="primary" fullWidth>Commander</Button>
      </div>
      <Button variant={"outline"} fullWidth onClick={clearCart}>Vider le panier</Button>
    </section>
  );
}
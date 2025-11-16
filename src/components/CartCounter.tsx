import { useCart } from "@/hooks/use-cart";

export default function CartCounter() {
  console.count("rendu counter");
  const linesCount = useCart((state) => state.lines.length);

  return (
    <div className="mb-4 text-lg font-semibold">
      Nombre de lignes dans le panier : {linesCount}
    </div>
  );
}
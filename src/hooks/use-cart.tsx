import { create } from "zustand";
import type { CartData } from "@/types";
import { ProductData } from "@arthur.eudeline/starbucks-tp-kit";
import { ProductLineData } from "@/types";

export const useCart = create<CartData>(() => ({
  lines: [],
}));

/**
 * Ajoute une nouvelle ligne au panier.
 * Si le produit est déjà dans le panier, augmente la quantité de 1.
 * 
 * @param product 
 */
export function addLine(product: ProductData) {
  useCart.setState((state) => {
    const existingLine = state.lines.find((line) => line.product.id === product.id);
    if (existingLine) {
      return {
        lines: state.lines.map((line) =>
          line.product.id === product.id
            ? { ...line, qty: line.qty + 1 }
            : line
        ),
      };
    }
    return {
      lines: [...state.lines, { product, qty: 1 }],
    };
  });
}

/**
 * Modifie une ligne produit du panier
 * 
 * @param line 
 */
export function updateLine(line: ProductLineData) {
  useCart.setState((state) => ({
    lines: state.lines.map((l) =>
      l.product.id === line.product.id ? { ...l, qty: line.qty } : l
    ),
  }));
}

/**
 * Supprime la ligne produit du panier 
 * 
 * @param productId 
 * @returns 
 */
export function removeLine(productId: number) {
  useCart.setState((state) => ({
    lines: state.lines.filter((line) => line.product.id !== productId),
  }));
}

/**
 * Vide le contenu du panier actuel
 */
export function clearCart() {
  useCart.setState({ lines: [] });
}


/**
 * Calcule le total d'une ligne du panier
 */
export function computeLineSubTotal(line: ProductLineData): number {
  return (line.product.price ?? 0) * line.qty;
}

/**
 * Calcule le total du panier
 */
export function computeCartTotal(lines: ProductLineData[]): number {
  return lines.reduce((sum, line) => sum + computeLineSubTotal(line), 0);
}
"use server";

import { prisma } from "../../prisma/lib/prisma";
import { revalidatePath } from "next/cache";
import { clearCart } from "@/hooks/use-cart";
import type { ProductLineData } from "@/types";

/**
 * Crée une nouvelle commande en base de données
 * @param lines Les lignes du panier à enregistrer
 */
export async function createOrder(lines: ProductLineData[]) {
  if (!lines || lines.length === 0) return null;

  const total = lines.reduce((sum, line) => sum + (line.product.price ?? 0) * line.qty, 0);

  const order = await prisma.order.create({
    data: {
      total,
      lines: {
        create: lines.map((line) => ({
          productId: line.product.id,
          qty: line.qty,
          subtotal: (line.product.price ?? 0) * line.qty,
        })),
      },
    },
    include: {
      lines: true,
    },
  });

  clearCart();

  revalidatePath("/");

  return order;
}
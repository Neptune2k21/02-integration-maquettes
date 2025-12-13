"use server";

import { prisma } from "../../prisma/lib/prisma";

/**
 * Récupère toutes les commandes avec leurs lignes et produits
 */
export async function getOrders() {
  const orders = await prisma.order.findMany({
    include: {
      lines: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return orders;
}

/**
 * Récupère une commande spécifique par son ID
 * @param orderId L'ID de la commande
 */
export async function getOrderById(orderId: number) {
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: {
      lines: {
        include: {
          product: true,
        },
      },
    },
  });

  return order;
}

"use client";

import { OrderTableLayout } from "@arthur.eudeline/starbucks-tp-kit";
import { useRouter } from "next/navigation";

type Order = {
  id: number;
  createdAt: Date;
  completedAt: Date | null;
  status: "IN_PROGRESS" | "COMPLETED";
  total: number;
  lines: {
    id: number;
    qty: number;
    subtotal: number;
    product: {
      id: number;
      name: string;
      price: number;
      img: string;
    };
  }[];
};

type OrderTableProps = {
  orders: Order[];
};

export default function OrderTable({ orders }: OrderTableProps) {
  const router = useRouter();

  const handleRowClick = (order: Order) => {
    router.push(`/mon-compte/commandes/${order.id}`);
  };

  return <OrderTableLayout orders={orders} onRowClick={handleRowClick} />;
}

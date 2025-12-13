import { getOrderById } from "@/actions/get-orders";
import { OrderDetailsLayout } from "@arthur.eudeline/starbucks-tp-kit";
import { notFound } from "next/navigation";

type PageProps = {
  params: {
    orderId: string;
  };
};

export default async function OrderDetailsPage({ params }: PageProps) {
  const orderId = parseInt(params.orderId, 10);

  if (isNaN(orderId)) {
    notFound();
  }

  const order = await getOrderById(orderId);

  if (!order) {
    notFound();
  }

  return (
    <div className="p-6">
      <OrderDetailsLayout order={order} />
    </div>
  );
}
import { getOrders } from "@/actions/get-orders";
import OrderTable from "@/components/OrderTable";
import { SectionContainer, BreadCrumbs } from "@arthur.eudeline/starbucks-tp-kit";

export default async function MonCompteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const orders = await getOrders();

  return (
    <main>
      <SectionContainer>
        <BreadCrumbs
          items={[
            { label: "Accueil", url: "/" },
            { label: "Mon compte", url: "/mon-compte" },
          ]}
        />

        <div style={{ marginTop: "2rem" }}>
          <h1 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: "1.5rem" }}>
            Mes commandes
          </h1>

          <OrderTable orders={orders} />
        </div>

        {children}
      </SectionContainer>
    </main>
  );
}
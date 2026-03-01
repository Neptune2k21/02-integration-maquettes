import { getOrders } from "@/actions/get-orders";
import OrderTable from "@/components/OrderTable";
import { SectionContainer, BreadCrumbs } from "@arthur.eudeline/starbucks-tp-kit";
import { getCurrentUser } from "@/lib/get-current-user";
import { redirect } from "next/navigation";
import LogoutButton from "@/components/LogoutButton";

export default async function MonCompteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/connexion");
  }

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

        {/* Section utilisateur */}
        <div style={{ marginTop: "2rem", marginBottom: "2rem", background: "white", borderRadius: "16px", padding: "2rem", border: "1px solid #e5e7eb" }}>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "1rem" }}>Mon compte</h1>
          <p><strong>Nom :</strong> {user.name}</p>
          <p><strong>Email :</strong> {user.email}</p>
          <LogoutButton />
        </div>

        <div style={{ marginTop: "2rem" }}>
          <h2 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: "1.5rem" }}>
            Mes commandes
          </h2>
          <OrderTable orders={orders} />
        </div>

        {children}
      </SectionContainer>
    </main>
  );
}
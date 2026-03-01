import { SectionContainer } from "@arthur.eudeline/starbucks-tp-kit";
import { getCurrentUser } from "@/lib/get-current-user";
import { redirect } from "next/navigation";

export default async function LoginLayout({ 
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  if (user) {
    redirect("/mon-compte");
  }
  return (
    <main style={{ minHeight: "calc(100vh - 200px)" }}>
      <SectionContainer fullWidth>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            paddingTop: "4rem",
            paddingBottom: "4rem",
          }}
        >
          {children}
        </div>
      </SectionContainer>
    </main>
  );
}
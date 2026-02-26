import { SectionContainer } from "@arthur.eudeline/starbucks-tp-kit";

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
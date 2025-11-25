import { SectionContainer, BreadCrumbs } from "@arthur.eudeline/starbucks-tp-kit";
import ProductListWithFilters from "@/components/ProductListWithFilters";
import { prisma } from "../../prisma/lib/prisma";

export const metadata = {
  title: "Page d'accueil",
  description: "Commandez de délicieuses boissons préparées avec soin par nos baristas",
};

export default async function Home() {
  const categories = await prisma.productCategory.findMany({
    include: {
      products: true,
    },
  });

  return (
    <main>
      <SectionContainer>
        <BreadCrumbs items={[{ label: "Accueil", url: "/" }]} />
        <ProductListWithFilters categories={categories} />
      </SectionContainer>
    </main>
  );
}
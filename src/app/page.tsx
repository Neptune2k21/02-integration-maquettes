import { SectionContainer, BreadCrumbs } from "@arthur.eudeline/starbucks-tp-kit";
import { PRODUCTS_CATEGORY_DATA } from "@arthur.eudeline/starbucks-tp-kit/data";
import ProductListWithFilters from "@/components/ProductListWithFilters";

export const metadata = {
  title: "Page d'accueil",
  description: "Commandez de délicieuses boissons préparées avec soin par nos baristas",
};

export default function Home() {
  const categories = PRODUCTS_CATEGORY_DATA;
  return (
    <main>
      <SectionContainer>
        <BreadCrumbs items={[{ label: "Accueil", url: "/" }]} />
        <ProductListWithFilters categories={categories} />
      </SectionContainer>
    </main>
  );
}
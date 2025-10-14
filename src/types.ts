import { ProductData } from "@arthur.eudeline/starbucks-tp-kit";
export type ProductFiltersResult = {
    categoriesSlug: string[];
    search?: string;
}




export type ProductLineData = {
product: ProductData;
qty: number;
};

export type CartData = {
lines: ProductLineData[];
};

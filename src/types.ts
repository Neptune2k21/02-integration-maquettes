export type ProductFiltersResult = {
    categoriesSlug: string[];
    search?: string;
}


export type ProductData = {
id: string | number;
name: string;
price: number;
};

export type ProductLineData = {
product: ProductData;
qty: number;
};

export type CartData = {
lines: ProductLineData[];
};

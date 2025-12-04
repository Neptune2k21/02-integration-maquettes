import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../prisma/lib/prisma";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const search = searchParams.get("search") ?? "";
  const categoriesSlugs = searchParams.getAll("cat");

  // Construction du filtre Prisma
  const whereCategory: any = categoriesSlugs.length > 0
    ? { slug: { in: categoriesSlugs } }
    : {};

  const whereProduct: any = search
    ? { name: { contains: search, mode: "insensitive" } }
    : {};

  const categories = await prisma.productCategory.findMany({
    where: whereCategory,
    include: {
      products: {
        where: whereProduct,
      },
    },
  });

  const filteredCategories = categories.filter(cat => cat.products.length > 0);

  return NextResponse.json({
    params: {
      categoriesSlugs,
      search,
    },
    categories: filteredCategories,
  });
}
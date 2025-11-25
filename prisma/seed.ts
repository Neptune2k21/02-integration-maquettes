import { prisma } from "./lib/prisma";
import { PRODUCTS_CATEGORY_DATA } from "@arthur.eudeline/starbucks-tp-kit/data";


async function main() {
  console.log("Démarrage du seed de la base de données...");

  console.log("Nettoyage des anciennes données...");
  await prisma.product.deleteMany({});
  await prisma.productCategory.deleteMany({});

  console.log("Envoi des nouvelles données...");

  for (const categoryData of PRODUCTS_CATEGORY_DATA) {
    const category = await prisma.productCategory.create({
      data: {
        slug: categoryData.slug,
        name: categoryData.name,
        products: {
          create: categoryData.products.map((product) => ({
            slug: product.slug,
            path: product.path,
            name: product.name,
            desc: product.desc,
            img: product.img,
            price: product.price,
          })),
        },
      },
      include: {
        products: true,
      },
    });

    console.log(
      `Catégorie "${category.name}" avec ${category.products.length} produits`
    );
  }

  console.log("Données insérées ");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
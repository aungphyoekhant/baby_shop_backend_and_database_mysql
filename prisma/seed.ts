import { prisma } from "../libs/prisma.ts";
import bcrypt from "bcrypt";

async function seed() {
  //
  console.log("Seeding admin user...");
  const admin = await prisma.user.create({
    data: {
      email: "aungphyokhant.official@gmail.com",
      password: await bcrypt.hash("admin", 10),
    },
  });
  console.log("Admin user created:", admin);
}

console.log("Starting Categories seed...");

const categories = [
  {
    title: "Baby",
    description: "Baby products",
    image:
      "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YmFieSUyMHByb2R1Y3RzfGVufDB8fDB8fHww",
  },
  {
    title: "Kids",
    description: "Kids products",
    image:
      "https://images.unsplash.com/photo-1758899056905-3863af86cc49?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fEtpZHMlMjBwcm9kdWN0c3xlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    title: "Clothing",
    description: "Clothing products",
    image:
      "https://plus.unsplash.com/premium_photo-1673356302101-e69975f7109a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fENsb3RoaW5nJTIwcHJvZHVjdHN8ZW58MHx8MHx8fDA%3D",
  },
  {
    title: "Toys",
    description: "Toys products",
    image:
      "https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8VG95c3xlbnwwfHwwfHx8MA%3D%3D",
  },
];

categories.map(async (category) => {
  await prisma.category.create({
    data: {
      title: category.title,
      description: category.description,
      image: category.image,
    },
  });
});

console.log("Categories seeded successfully⭐:", categories);

console.log("Starting Items seed...");

const items = [
  {
    title: "Baby Toy",
    description: "Baby toy",
    image:
      "https://images.unsplash.com/photo-1704988935392-09fc355154aa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YmFieSUyMHRveXxlbnwwfHwwfHx8MA%3D%3D",
    price: "100",
    categoryId: 1,
  },
  {
    title: "Baby Doll",
    description: "Child toy",
    image:
      "https://plus.unsplash.com/premium_photo-1661609366091-8d1cff8b20ff?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8YmFieSUyMGRvbGx8ZW58MHx8MHx8fDA%3D",
    price: "100",
    categoryId: 1,
  },
  {
    title: "Baby Car",
    description: "Baby toy",
    image:
      "https://images.unsplash.com/flagged/photo-1559701711-5da4c21e90c5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGJhYnklMjBjYXJ8ZW58MHx8MHx8fDA%3D",
    price: "100",
    categoryId: 2,
  },
  {
    title: "Baby Clock",
    description: "Baby toy",
    image:
      "https://plus.unsplash.com/premium_photo-1663054587363-804a21e112ba?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YmFieSUyMGNsb2NrfGVufDB8fDB8fHww",
    price: "100",
    categoryId: 2,
  },
  {
    title: "Baby Clothes",
    description: "Baby toy",
    image:
      "https://plus.unsplash.com/premium_photo-1675183689638-a68fe7048da9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YmFieSUyMGNsb3Roc3xlbnwwfHwwfHx8MA%3D%3D",
    price: "100",
    categoryId: 3,
  },
];

items.map(async (item) => {
  await prisma.item.create({
    data: {
      title: item.title,
      description: item.description,
      image: item.image,
      price: item.price,
      categoryId: item.categoryId,
    },
  });
});

console.log("Items seeded successfully⭐:", items);

seed();

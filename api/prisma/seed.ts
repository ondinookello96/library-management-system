import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Clearing existing records...");
  await prisma.review.deleteMany();
  await prisma.book.deleteMany();
  await prisma.genre.deleteMany();
  await prisma.user.deleteMany();

  console.log("Seeding genres and books...");

  // 1. Philosophy
  await prisma.genre.create({
    data: {
      name: "Philosophy",
      description: "Works exploring ethics, metaphysics, and mind.",
      books: {
        create: [
          {
            title: "A Theory of Justice",
            author: "John Rawls",
            isbn: "9780674000780",
            publicationYear: 1971,
            availableCopies: 3,
          },
          {
            title: "The Conscious Mind",
            author: "David Chalmers",
            isbn: "9780195117899",
            publicationYear: 1996,
            availableCopies: 2,
          },
          {
            title: "The Precipice",
            author: "Toby Ord",
            isbn: "9780316484916",
            publicationYear: 2020,
            availableCopies: 4,
          },
          {
            title: "Doing Good Better",
            author: "William MacAskill",
            isbn: "9781592409662",
            publicationYear: 2015,
            availableCopies: 5,
          },
        ],
      },
    },
  });

  // 2. Computer Science
  await prisma.genre.create({
    data: {
      name: "Computer Science",
      description:
        "Foundations of computing, software engineering, and systems.",
      books: {
        create: [
          {
            title: "Structure and Interpretation of Computer Programs",
            author: "Harold Abelson and Gerald Jay Sussman",
            isbn: "9780262510875",
            publicationYear: 1996,
            availableCopies: 2,
          },
          {
            title: "Clean Code",
            author: "Robert C. Martin",
            isbn: "9780132350884",
            publicationYear: 2008,
            availableCopies: 4,
          },
          {
            title: "Designing Data-Intensive Applications",
            author: "Martin Kleppmann",
            isbn: "9781449373320",
            publicationYear: 2017,
            availableCopies: 3,
          },
          {
            title: "Introduction to Algorithms",
            author: "Thomas H. Cormen et al.",
            isbn: "9780262033848",
            publicationYear: 2009,
            availableCopies: 2,
          },
        ],
      },
    },
  });

  // 3. Economics & Policy
  await prisma.genre.create({
    data: {
      name: "Economics & Policy",
      description:
        "Economic systems, institutional economics, and property rights.",
      books: {
        create: [
          {
            title: "The Mystery of Capital",
            author: "Hernando de Soto",
            isbn: "9780465016143",
            publicationYear: 2000,
            availableCopies: 3,
          },
          {
            title: "Why Nations Fail",
            author: "Daron Acemoglu and James A. Robinson",
            isbn: "9780307719218",
            publicationYear: 2012,
            availableCopies: 4,
          },
          {
            title: "Poor Economics",
            author: "Abhijit V. Banerjee and Esther Duflo",
            isbn: "9781610390934",
            publicationYear: 2011,
            availableCopies: 3,
          },
          {
            title: "Capital in the Twenty-First Century",
            author: "Thomas Piketty",
            isbn: "9780674430006",
            publicationYear: 2014,
            availableCopies: 2,
          },
        ],
      },
    },
  });

  // 4. Artificial Intelligence
  await prisma.genre.create({
    data: {
      name: "Artificial Intelligence",
      description:
        "Machine intelligence, neural architectures, and multi-agent systems.",
      books: {
        create: [
          {
            title: "Architects of Intelligence",
            author: "Martin Ford",
            isbn: "9781789131512",
            publicationYear: 2018,
            availableCopies: 4,
          },
          {
            title: "Superintelligence: Paths, Dangers, Strategies",
            author: "Nick Bostrom",
            isbn: "9780199678112",
            publicationYear: 2014,
            availableCopies: 3,
          },
          {
            title: "Artificial Intelligence: A Modern Approach",
            author: "Stuart Russell and Peter Norvig",
            isbn: "9780136042594",
            publicationYear: 2020,
            availableCopies: 2,
          },
          {
            title: "Human Compatible",
            author: "Stuart Russell",
            isbn: "9780525558613",
            publicationYear: 2019,
            availableCopies: 3,
          },
        ],
      },
    },
  });

  console.log("Database seeded successfully with 4 genres and 16 books.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

// Self-contained driver adapter setup — no dependency on src/config/db.js
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const userId = "e9cecfa3-a44c-4c14-914c-293efb0f12c6"; 

const movies = [
  {
    title: "The Dark Knight",
    description: "Batman battles the Joker in Gotham City.",
    genre: ["Action", "Crime", "Drama"],
    releaseDate: new Date("2008-07-18"),
    createdBy: userId,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "Inception",
    description: "A thief enters dreams to steal corporate secrets.",
    genre: ["Action", "Sci-Fi", "Thriller"],
    releaseDate: new Date("2010-07-16"),
    createdBy: userId,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "Gladiator",
    description: "A Roman general seeks revenge after betrayal.",
    genre: ["Action", "Drama", "Adventure"],
    releaseDate: new Date("2000-05-05"),
    createdBy: userId,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "The Shawshank Redemption",
    description: "Two prisoners form a bond and seek freedom.",
    genre: ["Drama"],
    releaseDate: new Date("1994-09-23"),
    createdBy: userId,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "Parasite",
    description: "A poor family infiltrates a wealthy household.",
    genre: ["Thriller", "Drama"],
    releaseDate: new Date("2019-05-30"),
    createdBy: userId,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "Avengers: Endgame",
    description: "The Avengers unite to reverse Thanos’ destruction.",
    genre: ["Action", "Adventure", "Sci-Fi"],
    releaseDate: new Date("2019-04-26"),
    createdBy: userId,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

const main = async () => {
    console.log ("seeding database with movies...");
    for (const movie of movies) {
        await prisma.movie.create({ data: movie });
    console.log (`created movie:  ${movie.title}`);
    }
    console.log("Seeding completed.");
}

main().catch((error) => {
    console.error(error);
    process.exit(1);

    })
    .finally(async () => {
        await prisma.$disconnect();
    });
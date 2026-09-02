import express from "express";
import dotenv from "dotenv";
import { connectDB, disconnectDB } from "./config/db.js";

// Import the movie routes
import movieRoutes from "./routes/movieRoute.js";

dotenv.config(); //loads variables from .env into process.env
connectDB();

const app = express();
const PORT = process.env.PORT || 5001;

//api routes
app.use("/movies", movieRoutes);

// Define a simple route for the root path
app.get('/', (req, res) => {
  res.json('Hello, World! but this is a get request');
});

app.post('/', (req, res) => {
  res.json('Hello, World! but this is a post request');
});

// start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// handles Unhandled Promise Rejections
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
  server.close(async () => {
    await disconnectDB();
    process.exit(1);
  });
});

// handle uncaught exceptions
process.on("uncaughtException", async (err) => {
  console.error("Uncaught Exception:", err);
  await disconnectDB();
  process.exit(1);
});

// graceful shutdown
process.on("SIGTERM", async () => {
  console.log("SIGTERM received, shutting down gracefully");
  server.close(async () => {
    await disconnectDB();
    process.exit(0);
  });
});

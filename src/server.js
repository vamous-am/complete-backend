import express from "express";
import movieRoutes from "./routes/movieRoute.js";

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

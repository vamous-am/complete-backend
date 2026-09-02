import express from "express";

const router = express.Router();

// Define your movie routes here
router.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Movie API!' });
});

export default router;
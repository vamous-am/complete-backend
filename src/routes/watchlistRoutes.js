import express from "express";

const router = express.Router();

router.post("/", addToWatchlist);
router.get("/", getWatchlist);
router.delete("/:movieId", removeFromWatchlist);
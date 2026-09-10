import {prisma} from "../config/db.js";

const addToWatchlist = async (req, res) => {
    const { movieId, status, rating, note, userId } = req.body;
    // verify movie exist
    const movie = await prisma.movie.findUnique({ where: { id: movieId }, });
    if (!movie) {
        return res.status(404).json({ message: "Movie not found" });
    }
    // check if the movie is already in the user's watchlist

    const existingInWatchlist = await prisma.watchlist.findUnique({
        where: {id : movieId },
    });

};
export { addToWatchlist };
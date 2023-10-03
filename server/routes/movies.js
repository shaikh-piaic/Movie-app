import express from "express";
import { deleteMovies, getMovies, postMovies, putMovies } from "../controller/moviesController.js";

const router = express.Router()

router.get("/movies", getMovies)
router.post("/movies/addmovie", postMovies)
router.get("/movies/:movieId", putMovies)
router.delete("/movies/:movieId", deleteMovies)

export default router
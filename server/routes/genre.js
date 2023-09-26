import express from "express";
import { getGenre, postGenre, deleteGenre } from "../controller/genreController.js";

const router = express.Router()

router.get("/genres", getGenre)
router.post("/genres/addgenre", postGenre)
router.delete("/genres/:genreId", deleteGenre)

export default router
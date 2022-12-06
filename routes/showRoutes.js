import express from "express";
import {
  getMovieById,
  getMovies,
  updateMovie,
  newShow,
} from "../db/queries/shows.js";

const router = express.Router();

// create the routes for movies
// /api/movies
router.get("/", async (req, res) => {
  try {
    const movies = await getMovies();
    res.json(movies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:id", async (req, res) => {
  const id = Number(req.params.id);

  try {
    const movie = await getMovieById(id);
    res.json(movie);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/:id", async (req, res) => {
  const id = Number(req.params.id);
  try {
    const movie = await updateMovie(id, req.body);
    res.json(movie);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/new", async (req, res) => {
  try {
    const show = await newShow(req.body);
    res.json(show);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//new post route for inserting new show

export default router;

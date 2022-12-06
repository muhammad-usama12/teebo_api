import express from 'express';
import { getFavourites, addFavourite, deleteFavourite } from '../db/queries/user_tvshows.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const favourites = await getFavourites();
    res.json(favourites);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/new", async (req, res) => {

  try {
    const favourite = await addFavourite(req.body);
    res.json(favourite);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {

  try {
    const favourite = await deleteFavourite(req.body);
    res.json(favourite);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
})

export default router;

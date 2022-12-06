import express from 'express';
import { getWatchlist, addToWatchlist, deleteFromWatchlist } from '../db/queries/watchlist.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const show = await getWatchlist();
    res.json(show);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/new", async (req, res) => {

  try {
    const show = await addToWatchlist(req.body);
    res.json(show);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {

  try {
    const show = await deleteFromWatchlist(req.body);
    res.json(show);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
})

export default router;

import express from 'express';
import { getComments, addComment , commentCounter } from '../db/queries/comments.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const comments = await getComments();
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/new", async (req, res) => {

  try {
    const comment = await addComment(req.body);
    res.json(comment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
})

router.post('/:id/counter', async (req, res) => {
const id = req.params.id

console.log("id from counter",id)
  try {
    const comment = await commentCounter(id);
    res.json(comment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
 })


export default router;

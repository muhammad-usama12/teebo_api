import express from 'express';
import { getLikes, addLike, deleteLike, likeAddCounter, likeDeleteCounter } from '../db/queries/likes.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const likes = await getLikes();
    res.json(likes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id/add', async (req, res) => {

  const id = req.params.id;
  const user_id =  req.body.user_id

  try {
    const likes = await addLike(id, user_id);
    res.json(likes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
})

router.put('/:id/addCounter', async (req, res) => {

  const id = req.params.id;


  try {
    const likes = await likeAddCounter(id);
    res.json(likes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
})


router.put('/:id/delete', async (req, res) => {

  const post_id = req.params.id;
  const user_id =  req.body.user_id


  try {
    const likes = await deleteLike(post_id, user_id);
    res.json(likes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
})

router.put('/:id/deleteCounter', async (req, res) => {

  const post_id = req.params.id;

  try {
    const likes = await likeDeleteCounter(post_id);
    res.json(likes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
})


export default router;

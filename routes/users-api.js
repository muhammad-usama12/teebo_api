/*
 * All routes for User Data are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /api/users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */
import express from "express";
const router = express.Router();

import { getUsers, getUserById, updateUser } from "../db/queries/users.js";

router.get("/", (req, res) => {
  getUsers()
    .then((users) => {
      res.json(users);
      // console.log("get users: ", users)
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.get("/:id", async (req, res) => {
  const id = Number(req.params.id);

  try {
    const user = await getUserById(id);
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/:id", async (req, res) => {
  const id = Number(req.params.id);
  try {
    const user = await updateUser(id, req.body);
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;

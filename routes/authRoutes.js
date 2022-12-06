import express from "express";
// const validateForm = require("../controllers/validateForm");
const router = express.Router();
import db from "../db/connection.js";
import bcrypt from "bcryptjs";

router
  .route("/login")

  .get(async (req, res) => {
    if (req.session.user && req.session.user.username) {
      res.json({
        loggedIn: true,
        username: req.session.user.username,
        userId: req.session.user.id,
      });
    } else {
      res.json({ loggedIn: false });
    }
  })

  .post(async (req, res) => {
    const potentialLogin = await db.query(
      "SELECT id, username, password FROM users u WHERE u.username=$1",
      [req.body.username],
      console.log("req.session", req.session)
    );

    if (potentialLogin.rowCount > 0) {
      const isSamePass = await bcrypt.compare(
        req.body.password,
        potentialLogin.rows[0].password
      );
      if (isSamePass) {
        req.session.user = {
          username: req.body.username,
          id: potentialLogin.rows[0].id,
        };
        ////USER ID FOR SESSION
        console.log("req.session.user from login", req.session.user);

        console.log("req.body", req.body);
        res.json({
          loggedIn: true,
          username: req.body.username,
          userId: req.session.user.id,
        });
      } else {
        res.json({ loggedIn: false, status: "Wrong username or password!" });
        console.log("Wrong username or password!");
      }
    } else {
      console.log("else Wrong username or password!");
      res.json({ loggedIn: false, status: "Wrong username or password!" });
    }
  });

router.post("/signup", async (req, res) => {
  const existingUser = await db.query(
    "SELECT username from users WHERE username=$1",
    [req.body.username]
  );

  if (existingUser.rowCount === 0) {
    // register
    const hashedPass = await bcrypt.hash(req.body.password, 10);
    const newUserQuery = await db.query(
      "INSERT INTO users(username, password) values($1,$2) RETURNING id, username",
      [req.body.username, hashedPass]
    );
    req.session.user = {
      username: req.body.username,
      id: newUserQuery.rows[0].id,
    };
    ////USER ID FOR SESSION
    console.log("req.session.user from signup", req.session.user.id);
    res.json({
      loggedIn: true,
      username: req.body.username,
      userId: req.session.user.id,
    });
  } else {
    res.json({ loggedIn: false, status: "Username taken" });
  }
});

router.post("/logout", (req, res) => {
  req.session.destroy();
  res.clearCookie("sessionId");
  res.end();
  console.log("Logged out successfully");
});

export default router;

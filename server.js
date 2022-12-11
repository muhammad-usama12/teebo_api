// load .env data into process.env
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
import db from "./db/connection.js";
// Enable __dirname with ES6 modules
import * as url from "url";
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

// Web server config
import sassMiddleware from "./lib/sass-middleware.js";
import express from "express";
import morgan from "morgan";
import session from "express-session";
// const cors = require("cors");

const PORT = process.env.PORT || 3001;
const app = express();
app.use(cors());

app.set("view engine", "ejs");

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  "/styles",
  sassMiddleware({
    source: __dirname + "/styles",
    destination: __dirname + "/public/styles",
    isSass: false, // false => scss, true => sass
  })
);
app.use(express.static("public"));
app.use(
  session({
    secret: "dsadsadjlaskdjsalkdjlkejlk432432423j4lk32j4l32k4j23",
    credentials: true,
    name: "sessionId",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.ENVIRONMENT === "production" ? "true" : "auto",
      httpOnly: false,
      expires: 1000 * 60 * 60 * 24 * 7,
      sameSite: process.env.ENVIRONMENT === "production" ? "none" : "lax",
    },
  })
);

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
import { default as userApiRoutes } from "./routes/users-api.js";
app.use("/api/users", userApiRoutes);

// import { default as usersRoutes } from "./routes/users.js";

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// Note: Endpoints that return data (eg. JSON) usually start with `/api`

import { default as showRoutes } from "./routes/showRoutes.js";
app.use("/api/shows", showRoutes);

import { default as postRoutes } from "./routes/postRoutes.js";
app.use("/api/posts", postRoutes);

import { default as authRoutes } from "./routes/authRoutes.js";
app.use("/api/auth", authRoutes);

import { default as commentsRoutes } from "./routes/commentsRoutes.js";
app.use("/api/comments", commentsRoutes);

import { default as userTvShowRoutes } from "./routes/user_tvshowRoutes.js";
app.use("/api/favourites", userTvShowRoutes);

import { default as watchlistRoutes } from "./routes/watchlistRoutes.js";
app.use("/api/watchlist", watchlistRoutes);

import { default as likeRoutes } from "./routes/likeRoutes.js";
app.use("/api/like", likeRoutes);

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get("/", (req, res) => {
  res.redirect("/api/auth/login");
});

app.get("/api/dashboard", (req, res) => {
  res.render("index");
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

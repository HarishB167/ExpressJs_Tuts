require("dotenv").config();
const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");

app.use(express.json());

const posts = [
  {
    username: "Harish",
    title: "Post 1",
  },
  {
    username: "Suraj",
    title: "Post ",
  },
];

app.get("/posts", authenticateToken, (req, res) => {
  res.json(posts.filter((p) => p.username == req.user.name));
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
    if (err) return res.sendStatus(403); // Forbidden
    req.user = data;
    next();
  });
}

app.listen(3000);

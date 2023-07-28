require("dotenv").config();

const express = require("express");
const app = express();
app.use(express.json());

const mongoose = require("mongoose");

mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to database"));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index", { text: "Some" });
});

const userRouter = require("./routes/users");
const subscriberRouter = require("./routes/subscriber");
app.use("/users", userRouter);
app.use("/subscriber", subscriberRouter);

app.listen(3000, () => console.log("Server started..."));

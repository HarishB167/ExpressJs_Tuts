const express = require("express");

const app = express();

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index", { text: "Some" });
});

const userRouter = require("./routes/users");
app.use("/users", userRouter);

app.listen(3000);
console.log("Server started...");

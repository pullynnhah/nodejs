const express = require("express");
const exphbs = require("express-handlebars");

const app = express();

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

app.get("/dashboard", (req, res) => res.render("dashboard", { items: ["A", "B", "C"] }));
app.get("/post", (req, res) => {
  const post = {
    title: "Learn NODE.JS",
    category: "node.js",
    body: "This will help you learn NODE.JS",
    likes: 150
  };
  res.render("post", { post });
});
app.get("/", (req, res) => {
  const auth = Math.random() < 0.5;
  const approved = Math.random() < 0.5;
  const user = { name: "Paula", surname: "Rodrigues", age: 26 };
  res.render("home", { user, auth, approved, word: "Chocolate" });
});
app.listen(3000, () => console.log("Running @ port 3000"));

const express = require("express");
const exphbs = require("express-handlebars");

const app = express();

const hbs = exphbs.create({
  partialsDir: ["views/partials"]
});
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.static("public"));

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
app.get("/blog", (req, res) => {
  const posts = [
    {
      title: "Learn NODE.JS",
      category: "node.js",
      body: "This will help you learn NODE.JS",
      likes: 150
    },
    {
      title: "Learn PYTHON",
      category: "python",
      body: "This will help you learn PYTHON",
      likes: 150
    },
    {
      title: "Learn C++",
      category: "cpp",
      body: "This will help you learn C++",
      likes: 150
    }
  ];

  res.render("blog", { posts });
});

app.get("/", (req, res) => {
  const auth = Math.random() < 0.5;
  const approved = Math.random() < 0.5;
  const user = { name: "Paula", surname: "Rodrigues", age: 26 };
  res.render("home", { user, auth, approved, word: "Chocolate" });
});
app.listen(3000, () => console.log("Running @ port 3000"));

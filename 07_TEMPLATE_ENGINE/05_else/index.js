const express = require("express");
const exphbs = require("express-handlebars");

const app = express();

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

app.get("/dashboard", (req, res) => res.render("dashboard"));
app.get("/", (req, res) => {
  const auth = Math.random() < 0.5;
  const approved = Math.random() < 0.5;
  const user = { name: "Paula", surname: "Rodrigues", age: 26 };
  res.render("home", { user, auth, approved, word: "Chocolate" });
});
app.listen(3000, () => console.log("Running @ port 3000"));

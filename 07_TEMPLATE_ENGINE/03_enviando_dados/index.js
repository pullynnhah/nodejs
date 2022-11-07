const express = require("express");
const exphbs = require("express-handlebars");

const app = express();

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

app.get("/", (req, res) => {
  const user = { name: "Paula", surname: "Rodrigues", age: 26 };
  res.render("home", { user, word: "Chocolate" });
});
app.listen(3000, () => console.log("Running @ port 3000"));

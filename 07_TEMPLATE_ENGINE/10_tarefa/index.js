const express = require("express");
const exphbs = require("express-handlebars");
const products = require("./data/products.json");
const app = express();
const port = 5001;

const hbs = exphbs.create({
  partialsDir: ["views/partials"]
});
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => res.render("home", { products }));
app.get("/products/:id", (req, res) => {
  let { id } = req.params;
  id = Number(id);
  const item = products.find(({ id: idProd }) => idProd === id);
  if (item) {
    res.render("product", { products: [item] });
  }
});

app.use((req, res, next) => res.status(404).render("404"));

app.listen(port, () => console.log(`App listening @ port: ${port}...`));

const dotenv = require("dotenv");
const express = require("express");
const exphbs = require("express-handlebars");
const mysql = require("mysql");

dotenv.config();
const app = express();

app.use(express.urlencoded({ extended: true }));

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

app.use(express.static("public"));

app.post("/books/new", (req, res) => {
  const { title, pages: num_pages } = req.body;
  const query = `INSERT INTO books (title, num_pages) VALUES ("${title}", ${num_pages});`;

  conn.query(query, err => {
    if (err) console.log(err);
    else res.redirect("/");
  });
});

app.get("/", (req, res) => {
  res.render("home");
});

const conn = mysql.createConnection({
  host: "localhost",
  user: process.env.USER_DB,
  password: process.env.PASSWORD_DB,
  database: process.env.DATABASE
});

conn.connect(err => {
  if (err) console.log(err);
  else {
    console.log("Success connecting to MySQL!");
    const { PORT } = process.env;
    app.listen(PORT, () => console.log(`App running @ port: ${PORT}`));
  }
});

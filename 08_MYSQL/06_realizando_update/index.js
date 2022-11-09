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
    else res.redirect("/books");
  });
});

app.get("/books", (req, res) => {
  conn.query("SELECT * FROM books;", (err, data) => {
    if (err) console.log(err);
    else {
      res.render("books", { books: data });
    }
  });
});

app.get("/books/:id", (req, res) => {
  const { id } = req.params;

  conn.query(`SELECT * FROM books WHERE id = ${id};`, (err, data) => {
    if (err) console.log(err);
    else {
      res.render("book", { book: data[0] });
    }
  });
});

app.get("/books/edit/:id", (req, res) => {
  const { id } = req.params;

  conn.query(`SELECT * FROM books WHERE id = ${id};`, (err, data) => {
    if (err) console.log(err);
    else {
      res.render("edit-book", { book: data[0] });
    }
  });
});

app.post("/books/edit", (req, res) => {
  const { id, title, pages: num_pages } = req.body;
  const query = `
  UPDATE books 
  SET title = "${title}",
  num_pages = ${num_pages}
  WHERE id = ${id};
  `;
  conn.query(query, (err, data) => {
    if (err) console.log(err);
    else res.redirect("/books");
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

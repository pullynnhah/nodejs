const express = require("express");
const exphbs = require("express-handlebars");
const pool = require("./db/conn");

const app = express();

app.use(express.urlencoded({ extended: true }));

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

app.use(express.static("public"));

app.post("/books/new", (req, res) => {
  const { title, pages: num_pages } = req.body;
  const query = `INSERT INTO books (??, ??) VALUES (?, ?);`;

  const data = ["title", "num_pages", title, num_pages];
  pool.query(query, data, err => {
    if (err) console.log(err);
    else res.redirect("/books");
  });
});

app.get("/books", (req, res) => {
  pool.query("SELECT * FROM books;", (err, data) => {
    if (err) console.log(err);
    else {
      res.render("books", { books: data });
    }
  });
});

app.get("/books/:id", (req, res) => {
  const { id } = req.params;

  pool.query(`SELECT * FROM books WHERE ?? = ?;`, ["id", id], (err, data) => {
    if (err) console.log(err);
    else {
      res.render("book", { book: data[0] });
    }
  });
});

app.get("/books/edit/:id", (req, res) => {
  const { id } = req.params;

  pool.query(`SELECT * FROM books WHERE ?? = ?;`, ["id", id], (err, data) => {
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
  SET ?? = ?,
  ?? = ?
  WHERE ?? = ?;
  `;
  const data = ["title", title, "num_pages", num_pages, "id", id];

  pool.query(query, data, (err, data) => {
    if (err) console.log(err);
    else res.redirect("/books");
  });
});

app.post("/books/remove/:id", (req, res) => {
  const { id } = req.params;
  const query = `
  DELETE FROM books 
  WHERE ?? = ?;
  `;
  data = ["id", id];
  pool.query(query, data, (err, data) => {
    if (err) console.log(err);
    else res.redirect("/books");
  });
});

app.get("/", (req, res) => {
  res.render("home");
});

app.listen(3000);

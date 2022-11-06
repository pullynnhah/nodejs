const path = require("path");
const express = require("express");
const router = express.Router();

const basePath = path.join(__dirname, "../templates");

router.post("/save", (req, res) => {
  console.log(req.body);

  const { name, age } = req.body;

  console.log(name, age);
  res.sendFile(`${basePath}/userForm.html`);
});

router.get("/add", (req, res) => res.sendFile(`${basePath}/userForm.html`));

router.get("/:id", (req, res) => {
  const { id } = req.params;

  console.log(`Estamos buscando pelo usuário: ${id}`);
  res.sendFile(`${basePath}/users.html`);
});

module.exports = router;

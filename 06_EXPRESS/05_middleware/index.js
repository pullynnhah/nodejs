const path = require("path");
const express = require("express");

const app = express();
const port = 3000;
const basePath = path.join(__dirname, "templates");

const checkAuth = (req, res, next) => {
  const authStatus = Math.random() < 0.5;

  if (!authStatus) console.log("Não está logado! Faça login p/ continuar!");
  else {
    console.log("Está logado, pode continuar!");
    next();
  }
};

app.use(checkAuth);
app.get("/", (req, res) => res.sendFile(`${basePath}/index.html`));

app.listen(port, () => console.log(`App rodando na porta: ${port}...`));

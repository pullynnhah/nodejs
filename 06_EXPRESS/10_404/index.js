const path = require("path");
const express = require("express");
const users = require("./users");

const app = express();
const port = 3000;
const basePath = path.join(__dirname, "templates");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.use("/users", users);
app.get("/", (req, res) => res.sendFile(`${basePath}/index.html`));
app.use((req, res, next) => res.status(404).sendFile(`${basePath}/404.html`));
app.listen(port, () => console.log(`App rodando na porta: ${port}...`));

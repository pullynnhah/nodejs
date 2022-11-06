const path = require("path");
const express = require("express");

const app = express();
const port = 5000;
const basePath = path.join(__dirname, "templates");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get("/example", (req, res) => res.sendFile(`${basePath}/grid.html`));

app.use((req, res) => res.sendFile(`${basePath}/404.html`));

app.listen(port, () => console.log(`App listing @ port: ${port}`));

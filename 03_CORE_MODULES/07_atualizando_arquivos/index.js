const fs = require("fs");
const http = require("http");
const url = require("url");
const port = 3000;
const server = http.createServer((req, res) => {
  const url = require("url").parse(req.url, true);
  const { name } = url.query;

  if (!name) {
    fs.readFile("index.html", (err, data) => {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      res.end();
    });
  } else {
    fs.appendFile("names.txt", `${name}\n`, (err, data) => {
      res.writeHead(302, { Location: "/" });
      res.end();
    });
  }
});

server.listen(port, () => console.log(`Servidor rodando na porta: ${port}`));

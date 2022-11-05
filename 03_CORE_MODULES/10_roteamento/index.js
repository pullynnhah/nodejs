const fs = require("fs");
const http = require("http");
const url = require("url");

const port = 3000;
const server = http.createServer((req, res) => {
  const query = url.parse(req.url, true);
  const filename = query.pathname.substring(1);

  console.log({ filename });

  if (filename.includes("html")) {
    let file = "404.html";
    let statusCode = 404;
    if (fs.existsSync(filename)) {
      file = filename;
      statusCode = 200;
    }

    fs.readFile(file, (err, data) => {
      res.writeHead(statusCode, { "Content-Type": "text/html" });
      res.write(data);
      res.end();
    });
  }
});

server.listen(port, () => console.log(`Servidor rodando na porta: ${port}`));

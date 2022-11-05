const http = require("http");

const port = 3000;
const server = http.createServer((req, res) => {
  const url = require("url").parse(req.url, true);
  const { name } = url.query;

  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html");

  let pageContent = `
  <h1>Preencha seu nome:</h1>
  <form method="GET">
    <input type="text" name="name"  />
    <input type="submit" value="Enviar" />
  </form>`;

  if (name) {
    pageContent = `<h1>Seja bem-vindo ${name}!</h1>`;
  }

  res.end(pageContent);
});

server.listen(port, () => console.log(`Servidor rodando na porta: ${port}`));

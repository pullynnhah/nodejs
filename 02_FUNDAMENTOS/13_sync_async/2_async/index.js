const fs = require("fs");

console.log("Começando...");

fs.writeFile("file.txt", "Hello Async!", err =>
  setTimeout(() => console.log("Arquivo criado!"), 1000)
);

console.log("...Terminando");

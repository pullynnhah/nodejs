const fs = require("fs");

console.log("Começando...");
fs.writeFileSync("file.txt", "Hello Sync!");
console.log("...Terminando");

const fs = require("fs");

if (Math.round(Math.random())) {
  fs.writeFileSync("file.txt", "Olá!");
}

setTimeout(() => {
  fs.unlink("file.txt", err => {
    if (err) console.log(err);
    else console.log("Arquivo removido!");
  });
}, 3000);

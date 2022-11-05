const fs = require("fs");

if (Math.round(Math.random())) {
  fs.writeFileSync("file.txt", "Olá!");
}

setTimeout(() => {
  fs.rename("file.txt", "new_file.txt", err => {
    if (err) console.log(err);
    else console.log("Arquivo renomeado!");
  });
}, 3000);

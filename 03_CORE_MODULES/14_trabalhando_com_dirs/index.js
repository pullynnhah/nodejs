const fs = require("fs");

if (!fs.existsSync("./folder")) {
  console.log("Não existe!");
  fs.mkdirSync("folder");
}

if (fs.existsSync("./folder")) console.log("Existe!");

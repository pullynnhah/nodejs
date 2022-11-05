const path = require("path");

console.log(path.resolve("test.txt"));

paths = ["home", "paula", "Desktop", "nodejs", "03_CORE_MODULES", "13_path_absoluto", "test.txt"];
const filePath = path.join("/", ...paths);
console.log(filePath);

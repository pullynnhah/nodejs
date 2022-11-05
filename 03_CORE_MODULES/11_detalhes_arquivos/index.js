const fs = require("fs");

fs.stat("file.txt", (err, stats) => {
  if (err) console.log(err);
  else {
    console.log(stats);
    console.log({
      isFile: stats.isFile(),
      isDirectory: stats.isDirectory(),
      isSymbolicLink: stats.isSymbolicLink(),
      ctime: stats.ctime,
      size: stats.size
    });
  }
});

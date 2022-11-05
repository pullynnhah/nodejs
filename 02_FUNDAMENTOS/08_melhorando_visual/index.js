const chalk = require("chalk");

let grades = [100, 0, 80, 60];

for (const grade of grades) {
  if (grade === 100) {
    console.log(grade, chalk.bgGreen.black.bold("Você brilhou!!!"));
  } else if (grade >= 70) {
    console.log(grade, chalk.green.bold("Passou!"));
  } else if (grade >= 50) {
    console.log(grade, chalk.red.underline.italic("Recuperação. Estude mais!"));
  } else {
    console.log(grade, chalk.bgRed.black.bold("REPROVADO!!!"));
  }
}

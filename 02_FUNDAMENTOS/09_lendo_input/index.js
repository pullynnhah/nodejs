const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout
});

readline.question("Qual a sua linguagem de programação favorita? ", programming_language => {
  if (programming_language === "html") console.log("Isso não é linguagem de programação!");
  else console.log(`Sua linguagem de programação favorita é: ${programming_language}!`);

  readline.close();
});

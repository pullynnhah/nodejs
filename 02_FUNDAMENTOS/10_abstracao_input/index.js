const inquirer = require("inquirer");

inquirer
  .prompt([
    {
      name: "grade1",
      message: "Qual a primeira nota? "
    },
    {
      name: "grade2",
      message: "Qual a segunda nota? "
    }
  ])
  .then(answers => {
    console.log(answers);
    const average = (Number(answers.grade1) + Number(answers.grade2)) / 2;
    console.log(`A média do aluno é: ${average.toFixed(1)}`);
  })
  .catch(err => console.log(err));

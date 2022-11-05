const chalk = require("chalk");
const inquirer = require("inquirer");

const questions = [
  {
    name: "name",
    message: "Qual o seu nome?"
  },
  {
    name: "age",
    message: "Qual a sua idade?"
  }
];

inquirer
  .prompt(questions)
  .then(({ name, age }) => console.log(chalk.bgYellow.black(`Hello! ${name} is ${age} years old!`)))
  .catch(err => console.log(err));

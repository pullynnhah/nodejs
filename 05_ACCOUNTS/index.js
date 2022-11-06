const chalk = require("chalk");
const inquirer = require("inquirer");

const fs = require("fs");

function operation() {
  inquirer
    .prompt({
      type: "list",
      name: "action",
      message: "O que você deseja fazer?",
      choices: ["Criar Conta", "Consultar Saldo", "Depositar", "Sacar", "Sair"]
    })
    .then(({ action }) => {
      if (action === "Criar Conta") createAccount();
      else if (action === "Consultar Saldo") getAccountBalance();
      else if (action === "Depositar") deposit();
      else if (action === "Sacar") withdraw();
      else if (action === "Sair") {
        console.log(chalk.bgBlue.black("Obrigado por usar o Accounts!"));
        process.exit();
      }
    })
    .catch(err => console.log(err));
}

function createAccount() {
  console.log(chalk.bgGreen.black("Parabéns por escolher o nosso banco!"));
  console.log(chalk.green("Defina as opções da sua conta a seguir"));

  buildAccont();
}

function buildAccont() {
  inquirer
    .prompt([
      {
        name: "accountName",
        message: "Digite um nome para a sua conta:"
      }
    ])
    .then(({ accountName }) => {
      console.info(accountName);
      if (!fs.existsSync("accounts")) fs.mkdirSync("accounts");
      if (fs.existsSync(`accounts/${accountName}.json`)) {
        console.log(chalk.bgRed.black("Esta conta já existe, escolha outro nome!"));
        return buildAccont();
      }

      fs.writeFileSync(`accounts/${accountName}.json`, '{ "balance": 0 }', err => console.log(err));
      console.log(chalk.green("Parabéns, sua conta foi criada!"));
      operation();
    })
    .catch(err => console.log(err));
}

function deposit() {
  inquirer
    .prompt([
      {
        name: "accountName",
        message: "Qual o nome da sua conta?"
      }
    ])
    .then(({ accountName }) => {
      if (!checkAccount(accountName)) return deposit();
      inquirer
        .prompt([
          {
            name: "amount",
            message: "Quanto você deseja depositar?"
          }
        ])
        .then(({ amount }) => {
          addAmount(accountName, amount);
          operation();
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
}

function checkAccount(accountName) {
  if (!fs.existsSync(`accounts/${accountName}.json`)) {
    console.log(chalk.bgRed.black("Está conta não existe, escolha outro nome!"));
    return false;
  }
  return true;
}

function getAccount(accountName) {
  const accountJSON = fs.readFileSync(`accounts/${accountName}.json`, {
    encoding: "utf8",
    flag: "r"
  });
  return JSON.parse(accountJSON);
}

function addAmount(accountName, amount) {
  const accountData = getAccount(accountName);

  if (!amount) {
    console.log(chalk.bgRed.black("Ocorreu um erro, tente novamento mais tarde!"));
    return;
  }

  amount = Number(amount);
  accountData.balance = amount + Number(accountData.balance);

  fs.writeFileSync(`accounts/${accountName}.json`, JSON.stringify(accountData), err =>
    console.log(err)
  );
  console.log(chalk.green(`Foi depositado o valor de $${amount.toFixed(2)} na sua conta!`));
}

function getAccountBalance() {
  inquirer
    .prompt([
      {
        name: "accountName",
        message: "Qual o nome da sua conta?"
      }
    ])
    .then(({ accountName }) => {
      if (!checkAccount(accountName)) return getAccountBalance();
      const { balance } = getAccount(accountName);

      console.log(
        chalk.bgBlue.black(`Olá, o saldo da sua conta é de $${Number(balance).toFixed(2)}`)
      );
      operation();
    })
    .catch(err => console.log(err));
}

function withdraw() {
  inquirer
    .prompt([
      {
        name: "accountName",
        message: "Qual o nome da sua conta?"
      }
    ])
    .then(({ accountName }) => {
      if (!checkAccount(accountName)) return withdraw();
      inquirer
        .prompt([
          {
            name: "amount",
            message: "Quanto você deseja sacar?"
          }
        ])
        .then(({ amount }) => {
          removeAmount(accountName, amount);
          operation();
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
}

function removeAmount(accountName, amount) {
  const accountData = getAccount(accountName);

  if (!amount) {
    console.log(chalk.bgRed.black("Ocorreu um erro, tente novamento mais tarde!"));
    return;
  }

  amount = Number(amount);
  accountData.balance = Number(accountData.balance);

  if (accountData.balance < amount) {
    console.log(chalk.bgRed.black("Valor indisponível!"));
    return;
  }

  accountData.balance -= amount;

  fs.writeFileSync(`accounts/${accountName}.json`, JSON.stringify(accountData), err =>
    console.log(err)
  );
  console.log(chalk.green(`Foi realizado um saque de $${amount.toFixed(2)} da sua conta!`));
}

operation();

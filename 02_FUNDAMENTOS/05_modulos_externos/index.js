const minimist = require("minimist");

const args = minimist(process.argv.slice(2));

console.log(args);
console.log(args.name);
console.log(args.age);
console.log(`I'm ${args.name} and I'm ${args.age} years old.`);

// Run 'node index.js name=NAME age=AGE'
console.log(process.argv);

const args = process.argv.slice(2);
console.log(args);

const name = args[0].split("=")[1];
console.log(name);

const age = args[1].split("=")[1];
console.log(age);

console.log(`I'm ${name} and I'm ${age} years old .`);

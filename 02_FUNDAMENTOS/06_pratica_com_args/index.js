const minimist = require("minimist");
const sum = require("./mod").sum;

const args = minimist(process.argv.slice(2));

const a = Number(args.a);
const b = Number(args.b);

sum(a, b);

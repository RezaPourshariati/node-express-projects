const {readFileSync, writeFileSync} = require('fs');

console.log('start');

const first = readFileSync('./content/first.txt', 'utf-8');
const second = readFileSync('./content/second.txt', 'utf-8');


writeFileSync(
    '.t/content/result-sync.tx',
    `Here is the result : ${first}, ${second}\n`,
    {flag: 'a'} // means appending to the end of file
);

console.log('done with this task');
console.log('starting the next one');


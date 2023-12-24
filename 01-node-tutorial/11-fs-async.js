const {readFile, writeFile} = require('fs');

console.log('start');

readFile('./content/first.txt', 'utf-8', (err, result) => {
    if (err) {
        console.log(err);
        return;
    }
    const first = result;
    readFile('./content/second.txt', 'utf-8', (err, result) => {
        if (err) {
            console.log(err);
            return;
        }
        writeFile(
            './content/result-async.txt',
            `Here is the result : ${first}, ${result}\n`,
            {flag: 'a+'},
            (err, data) => {
                if (err) {
                    console.log(err);
                    return;
                }
                console.log('done with this task\n', data); // the result well be undefined.
            }
        );
    });
});

console.log('starting next task');

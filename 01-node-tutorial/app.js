// console.log('Welcome to Node Tutorial');

const {readFile} = require('fs');

const getText = (path) => {
    return new Promise((resolve, reject) => {
        readFile(path, 'utf-8', (err, data) => {
            if (err) reject(err);
            else resolve(data);
        });
    });
};


// using async pattern is more readable and cleaner approach than the promise end of this module.
const start = async () => {
    try {
        const first = await getText('./content/first.txt');
        const second = await getText('./content/first.txt');
        console.log(first, second);
    } catch (err) {
        console.log(err);
    }
};

start().then(r => console.log(r));


// this approach essentially not usable so mush..!!

// getText('./content/first.txt')
//     .then((result) => console.log(result))
//     .catch((err) => console.log(err));
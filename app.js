// const amount = 9;
//
// if (amount < 10) console.log('small number');
// else console.log('large number');
//
// console.log('hey this is my first node app !!!');

// --------------------------------

// const output = fizzBuzz(false);
// console.log(output);
//
// function fizzBuzz(input) {
//     if (typeof input !== 'number') return NaN;
//     if ((input % 3 === 0) && (input % 5 === 0)) return 'FizzBuzz';
//     if (input % 3 === 0) return 'Fizz';
//     if (input % 5 === 5) return 'Buzz';
//     return `${input}`;
// }

// --------------------------------


// checkSpeed(130);
//
// function checkSpeed(speed) {
//     const speedLimit = 70;
//     const kmPerPoint = 5;
//     if (speed < speedLimit + kmPerPoint) {
//         console.log('Ok');
//         return;
//     }
//     const points = Math.floor((speed - speedLimit) / kmPerPoint);
//     if (points >= 12) console.log('licence suspended');
//     else console.log('Points', points);
// }


// --------------------------------

// for (let i = 0; i <= 10; i++) {
//     const result = i % 2 === 0 ? 'Even' : 'Odd';
//     console.log(i, result);
// }

// --------------------------------

const countTruthy = (arr) => {
    let numberOfTruthy = 0;
    for (let i of arr)
        if (i) numberOfTruthy ++;
    return numberOfTruthy;
};

console.log(countTruthy(['', 'reza', 12, 0, undefined, null, 1]));
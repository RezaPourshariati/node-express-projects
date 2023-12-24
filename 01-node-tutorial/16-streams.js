const {createReadStream} = require('fs');

// size of buffer by default: 64kb   however we can also control it.
// last buffer - remainder
// highWaterMark - control size of buffer

// const stream = createReadStream('./content/big.txt', );
// const stream = createReadStream('./content/big.txt', {encoding: "utf-8"});
const stream = createReadStream('./content/big.txt', {highWaterMark: 90000});

stream.on('data', (result) => {
    console.log(result);
});
// we are reading data in chunks. and by default that chunk is 64kb.

stream.on('error', (err) => console.log(err));




// ----------------------------------------------------------------------

// Streams:

// Writable --> used to write data sequentially.
// Readable --> used to read data sequentially.
// Duplex --> used to both read ad write data sequentially.
// Transform --> data can be modified when writing and reading.

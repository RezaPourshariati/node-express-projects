const http = require('http');
const fs = require('fs');


http.createServer(function (req, res) {

    // const text = fs.readFileSync('./content/big.txt', 'utf-8');
    // res.end(text);

    const fileStream = fs.createReadStream('./content/big.txt', 'utf-8');

    fileStream.on('open', () => fileStream.pipe(res)); // pushing from readStream to writeStream
    // So you can imagine that if we can read data in chunks, we can also write data in chunks. and what happens
    // under the hood response object can be set up as a writable stream.
    // So instead of sending our file back in one large instance, we're sending it back in chunks.

    fileStream.on('error', (err) => res.end(err));

}).listen(5000);

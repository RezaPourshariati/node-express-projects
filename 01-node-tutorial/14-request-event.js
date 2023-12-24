const http = require('http');

// const server = http.createServer((req, res) => {
//   res.end('Welcome');
// });

// In above, callback function will be invoked everytime someone visits our server. So everytime the request comes in.
// -----------------------------------

// Using Event Emitter API

const server = http.createServer();

// emits request event
// subscribe to it / listen for it / respond to it

server.on('request', (req, res) => {
    console.log(req.params);
    res.end('Welcome');
});

server.listen(5000);

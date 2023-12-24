// 6- HTTP - Basics
// 7- HTTP - Headers
// 8- HTTP - Request Object
// 9- HTTP - HTML File
const http = require('http');

const server = http.createServer((req, res) => {

    // console.log(req.method);  ---> output: GET
    const url = req.url;

    // home page
    if (url === '/') {
        res.writeHead(200, {'content-type': 'text/html'}); // 7- text/plain --> for html code on browser
        res.write('<h1>home page</h1>'); // 9- We can also set here html file
        res.end();
    }
    // about page
    else if (url === '/about') {
        res.writeHead(200, {'content-type': 'text/html'});
        res.write('<h1>about page</h1>');
        res.end();
    }
    // 404
    else {
        res.writeHead(404, {'content-type': 'text/html'});
        res.write('<h1>page not found</h1>');
        res.end();
    }
});

server.listen(5000);

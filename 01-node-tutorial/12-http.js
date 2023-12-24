const http = require('http');

const server = http.createServer((req, res) => {

    // if (req.url === '/') res.end('Welcome to our home page');
    // if (req.url === '/about') res.end('Here is our short history');
    // res.end(
    //     `<h1>Oops!</h1>
    //     <p>We can't seem to find the page you are looking for</p>
    //     <a href="/">back home</a>`
    // );

    // ###################################
    // ###################################
    //
    //
    // IF YOU GET ERRORS WHILE USING ABOVE SETUP,
    // SWITCH TO IF, ELSE IF, ELSE (BELOW)
    // WE COVER THE CAUSE, LATER IN EXPRESS TUTORIAL


    if (req.url === '/') res.end('Welcome to our home page');
    else if (req.url === '/about') res.end('Here is our short history');
    else {
        res.end(
            `<h1>Oops!</h1>
            <p>We can't seem to find the page you are looking for</p>
            <a href="/">back home</a>`
        );
    }
});

server.listen(5000);


// ------------------------------------------------------------ npm >>>

// npm - global command, comes with node
// npm --version

// local dependency - use it only in this particular project
// npm i <packageName>

// global dependency - use it in any project
// npm install -g <packageName>
// sudo npm install -g <packageName> (mac)

// ----------------------------- 3-21 Node.js Course

// 21: package.json - manifest file (stores important info about project/package)
// manual approach (create package.json in the root, create properties etc.)
// npm init (step by step, press enter to skip)
// npm init -y (everything default)


// ----------------------------- 3-24 Node.js Course


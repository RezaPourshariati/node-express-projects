// 11: Express - Info
// 12: Express - Basics

// const app = require('express')();
const express = require('express'); // express is a function
const app = express(); // invoked express

app.get('/', (req, res) => {
    console.log('user hit the resource');
    res.status(200).send('Home Page');
});

app.get('/about', (req, res) => {
    res.status(200).send('About Page');
});

// ------- all ohter http routes
app.all('*', (req, res) => {
    res.status(404).send('<h1>Oops, resource not found</h1>');
});

app.listen(5000, () => {
    console.log('server is listening on port 5000...');
});

// app.get
// app.post
// app.put
// app.delete
// app.all
// app.use      --> responsible for middleware
// app.listen

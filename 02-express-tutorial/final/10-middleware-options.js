// 25: Additional Middleware Info
const express = require('express');
const app = express();
const morgan = require('morgan');
const logger = require('../logger');
const authorize = require('../authorize');

// req => middleware => res

// 1. use vs route
// 2. options - our own mw / express mw / third party mw

// 25: 1- What if we want to set a middleware to specific route? we use the array of middleware in that specific route.
// 25: 2- What are our options when it comes to the middleware? so far, we can always set up our own middleware.
// and now, we can also use express built-in mw and third-party mw such as morgan.
// ---> Note that the app.use() always expecting a middleware as its argument.

// app.use([logger, authorize]);
// app.use(express.static('./public')); ---> static is a built-in middleware.
app.use(morgan('tiny'));

app.get('/', (req, res) => {
    res.send('Home');
});

app.get('/about', (req, res) => {
    res.send('About');
});

app.get('/api/products', (req, res) => {
    res.send('Products');
});

app.get('/api/items', [logger, authorize], (req, res) => {
    console.log(req.user);
    res.send('Items');
});

app.listen(5000, () => {
    console.log('Server is listening on port 5000....');
});

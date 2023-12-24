// 14: Express - All Static

// We can also copy the index.html into public folder and, comment out the app.get (root) and then
// the functionality still working with app.all ---> all-static

const express = require('express');
// const path = require('path');

const app = express();

// setup static and middleware
app.use(express.static('./public'));


// app.get('/', (req, res) => {
//   res.sendFile(path.resolve(__dirname, './navbar-app/index.html'));
//   // adding to static assets
//   // SSR
// });

app.all('*', (req, res) => {
    res.status(404).send('resource not found');
});

app.listen(5000, () => {
    console.log('server is listening on port 5000....');
});

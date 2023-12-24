// 13: Express - App Example
const express = require('express');
const path = require('path');

const app = express();

// Setup static and middleware:
// I made a folder named public and all navbar-app are copied in it except index.html
app.use(express.static('./public')); // Static means it's a file that the server doesn't have to change it.


app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, './navbar-app/index.html'));
});

app.all('*', (req, res) => {
    res.status(404).send('resource not found');
});

app.listen(5000, () => {
    console.log('server is listening on port 5000....');
});
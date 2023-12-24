// 26: Methods-GET      27: Methods-POST(Setup)        28: Methods-POST(Form Example)
// 29: Methods-POST(Javascript Example)       30: Install Postman         31: Methods-PUT
// 32: Methods-DELETE
const express = require('express');
const app = express();
let {people} = require('../data');


// static assets
app.use(express.static('../methods-public')); // for setup files in folder (methods-public)

// parse form data
app.use(express.urlencoded({extended: false})); // For SEND method, in order to GET that data whatever we send,
// we need to use a middleware. otherwise the send method won't work! in send method from index.html --> /login

// parse json
app.use(express.json()); // For handle incoming JSON data from the client.
// this middleware convert incoming request to json. (it uses for javascript post from axios NOT form data)


// I get the data from database or wherever, and here you are as API!
app.get('/api/people', (req, res) => {
    res.status(200).json({success: true, data: people});
});

app.post('/api/people', (req, res) => {
    const {name} = req.body;
    console.log(name);
    if (!name) return res.status(400).json({success: false, msg: 'please provide name value'});

    res.status(201).json({success: true, person: name});
});

app.post('/api/postman/people', (req, res) => {
    const {name} = req.body;
    if (!name) return res.status(400).json({success: false, msg: 'please provide name value'});

    res.status(201).json({success: true, data: [...people, name]});
});

app.post('/login', (req, res) => {
    const {name} = req.body;
    if (name) return res.status(200).send(`Welcome ${name}`);

    res.status(401).send('Please Provide Credentials');
});

// Update data
app.put('/api/people/:id', (req, res) => {
    const {id} = req.params;
    const {name} = req.body; // req.body --> {name: peter} that will send to server to modify!

    const person = people.find((person) => person.id === Number(id));
    if (!person) return res.status(404).json({success: false, msg: `no person with id ${id}`});

    const newPeople = people.map((person) => {
        if (person.id === Number(id)) person.name = name;
        return person;
    });

    res.status(200).json({success: true, data: newPeople});
});

// ---> Bing Answer for PUT method in better performance.
// app.put('/api/people/:id', (req, res) => {
//     const { id } = req.params;
//     const { name } = req.body;

//     // Validate the name
//     if (!name || typeof name !== 'string') return res.status(400).json({ success: false, msg: 'Invalid name' });

//     let personExists = false;
//     const newPeople = people.map((person) => {
//         if (person.id === parseInt(id)) {
//             person.name = name;
//             personExists = true;
//         }
//         return person;
//     });

//     if (!personExists) return res.status(404).json({ success: false, msg: `No person with id ${id}` });
//     res.status(200).json({ success: true, data: newPeople });
// });

app.delete('/api/people/:id', (req, res) => {
    const {id} = req.params;
    const person = people.find((person) => person.id === Number(id));
    if (!person) return res.status(404).json({success: false, msg: `no person with id ${id}`});

    const newPeople = people.filter((person) => person.id !== Number(id));
    return res.status(200).json({success: true, data: newPeople});
});

app.listen(5000, () => {
    console.log('Server is listening on port 5000....');
});

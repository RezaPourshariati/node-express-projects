// 17: Params, Query String, Setup
// 18: Params
// 19: Params Extra Info
// 20: Query String
const express = require('express');
const app = express();
const {products} = require('../data');


app.get('/', (req, res) => {
    res.send('<h1> Home Page</h1><a href="./api/products">products</a>');
});

app.get('/api/products', (req, res) => {
    const newProducts = products.map((product) => {
        const {id, name, image} = product;
        return {id, name, image};
    });

    res.json(newProducts);
});

// 18- route parameters, think of them like placeholders!
app.get('/api/products/:productID', (req, res) => {
    // console.log(req);
    // console.log(req.params); // ---> {productID: '1'}
    const {productID} = req.params;

    const singleProduct = products.find((product) => product.id === Number(productID));
    if (!singleProduct) return res.status(404).send('Product Does Not Exist');
    return res.json(singleProduct);
});

app.get('/api/products/:productID/reviews/:reviewID', (req, res) => { // 19: Extra Info about params
    console.log(req.params);
    res.send('hello world');
});

app.get('/api/v1/query', (req, res) => { // 20: in url after "/query?" you can set anything like (search="john"&limit="4")
    // console.log(req.query);
    const {search, limit} = req.query;
    let sortedProducts = [...products];

    if (search) {
        sortedProducts = sortedProducts.filter((product) => {
            return product.name.startsWith(search);
        });
    }
    if (limit) sortedProducts = sortedProducts.slice(0, Number(limit)); // slice deals with indexes!

    if (sortedProducts.length < 1) {
        // res.status(200).send('no products matched your search');
        return res.status(200).json({success: true, data: []});
    }

    res.status(200).json(sortedProducts);
});

// 21: NOTE --> always if you have a condition make sure to set return at the end of that!!
// Otherwise, the server will show an error! because we don't can return multiple response at one request!!

app.listen(5000, () => {
    console.log('Server is listening on port 5000....');
});

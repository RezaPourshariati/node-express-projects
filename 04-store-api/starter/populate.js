require('dotenv').config();

const connectDB = require('./db/connect');
const Product = require('./models/product');
const jsonProducts = require('./products.json');

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        await Product.deleteMany();
        await Product.create(jsonProducts);
        console.log('Connected to Database.');
        process.exit(0); // exit process in the terminal
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

start().then(r => console.log(r));
const express = require('express');
const app = express();
require('dotenv').config();
const connectDB = require('./db/connect');
require('express-async-errors'); // with this package there is no need for asyncWrapper() function in controllers.
// and also order matters. should be before routes.

const productsRouter = require('./routes/products');
const notFoundMiddleware = require('./middleware/not-found');
const errorMiddleware = require('./middleware/error-handler');


// middleware
app.use(express.json());


// routes
app.get('/', (req, res) => {
    res.send('<h1>Store API</h1>' + '<a href="/api/v1/products">products route</a>');
});

// router
app.use('/api/v1/products', productsRouter);

// products route >> NOTE: order of the middleware is important, error must be at the end of middlewares!
app.use(notFoundMiddleware);
app.use(errorMiddleware);


const port = process.env.PORT || 3000;

const start = async () => {
    try {
        // connect to DataBase
        await connectDB(process.env.MONGO_URI);
        console.log('Database Connected Successfully.');
        app.listen(port, () => console.log(`Server is listening on port ${port}....`));
    } catch (err) {
        console.log(err);
    }
};

start().then(r => console.log(r));
// start() is enough, and there is no need to .then()
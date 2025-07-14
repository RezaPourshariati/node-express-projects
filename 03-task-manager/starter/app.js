const express = require('express');
app = express();
const tasksRouter = require('./routes/tasks');
const connectDB = require('./db/connect');
require('dotenv').config();
const notFound = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');


// middleware
app.use(express.static('./public')); // for static files
app.use(express.json()); // for incoming requests

// routes
app.use('/api/v1/tasks', tasksRouter); // middleware for router

app.use(notFound); // for not-found(404) pages
app.use(errorHandlerMiddleware); // error handler


// const port = process.env.PORT || 3000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        console.log('Database Connected Successfully.');
        app.listen(3000, () => console.log('Server is listening on port 3000....'));
    } catch (error) {
        console.log(error);
    }
};

start().then(() => console.log("Done."));
// start() is enough, and there is no need to .then()


// ---------------------------------------------------------------

// app.get('/api/v1/tasks')         - get all the tasks
// app.post('/api/v1/tasks')        - create a new task
// app.get('/api/v1/tasks/:id')     - get single task
// app.patch('/api/v1/tasks/:id')   - update task
// app.delete('/api/v1/tasks/:id')  - delete task
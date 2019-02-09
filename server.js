const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/restapi', {useNewUrlParser: true});
console.log('Connected to MongoDB');

const server = express();
server.use(helmet());

const userRoute = require('./routes/users.routes');
const carRoute = require('./routes/cars.routes');

// Middleware
server.use(morgan('dev'));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));

// Routes
server.use('/cars', carRoute);
server.use('/users', userRoute);

// Catch 404 and forward them to handler
server.use((req, res, next) => {
    const err = new Error('Not found');
    err.status = 404;
    next(err); 
});

// Error handler
server.use((err, req, res, next) => {
    const error = server.get('env') === 'development' ? err : {};
    const status = err.status || 500;
    // response to client
    res.status(status).json({
        error: {
            message: error.message
        }
    });

    // response to ourself
    console.log(err);
});

// Start server
const port = server.get('port') || 3000;
server.listen(port, () => console.log(`Server is listening on port ${port}`));
// IMPORTS
const express = require('express');
const app = express();
const morgan = require('morgan');
const moviesRouter = require('./Routes/moviesRoutes')

// CUSTOM MIDDLEWARE FUNCTION
const logger = function(req, res, next){
    console.log('Custom middleware logged.');
    next();
}

// INITIATED MIDDLEWARE
app.use(express.json());

// 3RD PARTY MIDDLEWARE
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}

// USING CUSTOM MIDDLEWARE
app.use(logger);

app.use((req, res, next) => { 
    req.requestedAt = new Date().toISOString();
    next();
})

// USING SEPERATE ROUTER
app.use('/api/v1/movies', moviesRouter);

module.exports = app;
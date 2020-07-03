const http = require('http');
const express = require('express');

const app = express();

//Custom Middleware
app.use((req, res, next) => {
    console.log("In the middleware");
    next(); //Allows the request to continue to the next middleware
});

app.use((req, res, next) => {
    console.log("In another middleware");
    res.send('<h1>Hello from Express JS</h1>');
});

//Create an http server to serve requests
const server = http.createServer(app);

//Listen to incoming requests
server.listen(3000);
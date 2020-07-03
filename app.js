const http = require('http');
const express = require('express');

const app = express();

//Create an http server to serve requests
const server = http.createServer(app);

//Listen to incoming requests
server.listen(3000);
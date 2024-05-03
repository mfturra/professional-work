const { createServer } = require('node:http');
const hostname = '127.0.0.1';
const port = 3000;
const { client } = require('pg');

// new request made, request event is triggered, causing request and response object
const server = createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Connection has been established!');
});

// listen for server req and run code above when request takes place
server.listen(port, hostname, () => {
    // output specific message once server is connected
    console.log('Server running at http://${hostname}:${port}/');
});
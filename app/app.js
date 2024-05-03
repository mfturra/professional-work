// database credentials
// const { createServer } = require('node:http');
// const hostname = '127.0.0.1';
// const port = 3000;
// const { client } = require('pg');
const { Pool } = require('pg');
require('dotenv').config(); // Load environment variables from .env file

// configure connection
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
})

// Create a new database
async function setupDatabase(databaseName) {
    const client = await pool.connect();
    try {
        await client.query(`CREATE DATABASE ${databaseName}`);
        console.log(`Database "${databaseName}" created successfully.`);
    } catch (error) {
        console.error('Error creating database:', error);
    } finally {
        client.release();
    }
}

// Drop a database
async function dropDatabase(databaseName) {
    const client = await pool.connect();
    try {
        const queryString = `DROP DATABASE IF EXISTS "${databaseName}"`;
        await client.query(queryString);
        console.log(`Database "${databaseName}" dropped successfully.`);
    } catch (error) {
        console.error('Error dropping database:', error);
    } finally {
        client.release();
    }
}

// setupDatabase('BIG_BUILD');
dropDatabase('$(databaseName)');

// await client.connect();

// new request made, request event is triggered, causing request and response object
// const server = createServer((req, res) => {
//     res.statusCode = 200;
//     res.setHeader('Content-Type', 'text/plain');
//     res.end('Connection has been established!');
// });

// listen for server req and run code above when request takes place
// server.listen(port, hostname, () => {
//     // output specific message once server is connected
//     console.log('Server running at http://${hostname}:${port}/');
// });
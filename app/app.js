// http req libraries
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const bcrypt = require('bcrypt');

// database req libraries
const { Pool } = require('pg');
// const exceljs = require('exceljs');
// const fs = require('fs')
require('dotenv').config();

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

// configure connection
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
})

// configure server
// const hostname = '127.0.0.1';
// const port = 3000;

// create login routes
// app.get('/', (req, res) => {
//     res.redirect('/login');
// })

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/login.html');
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // connect to database and store table values in variables
        const client = await pool.connect();
        const result = await client.query(`SELECT * FROM users WHERE username = $1`, [username]);
        client.release();

        if (result.rows.length > 0) {
            const user = result.rows[0];
            if (await bcrypt.compare(password, user.password)) {
                req.session.loggedIn = true;
                res.redirect('/data');
            } else {
                res.send('Invalid username or password');
            }
        } else {
            res.send('User not found');
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal server error');
    }
});

// establish data route
app.get('/data', async (req, res) => {
    if (req.session.loggedIn) {
        try {
            const client = await pool.connect();
            const result = await client.query(`SELECT * FROM practice_table`);
            const rows = result.rows;
            client.release();

            // read html file
            const htmlTemplate = fs.readFileSync('index.html', 'utf8');
            let tableRows = '';
            rows.forEach(row => {
                tableRows += `<tr><td>${row.jan}</td><td>${row.feb}</td><td>${row.mar}</td><td>${row.apr}</td><td>${row.may}</td><td>${row.jun}</td><td>${row.jul}</td><td>${row.aug}</td><td>${row.sep}</td><td>${row.oct}</td><td>${row.nov}</td><td>${row.dec}</td><td>${row.year}</td></tr>`;
            });
            // replace comment section in HTML file with data from database
            const html = htmlTemplate.replace('<!-- Table data will be injected here -->', tableRows);

            res.send(html);
        } catch (error) {
            console.error('Error retrieving data:', error);
            res.status(500).send('Internal server error');
        }
    } else {
        res.redirect('/login');
    }
})

// listen for server req and run code above when request takes place
app.listen(port, () => {
    // output specific message once server is connected
    console.log(`Server running at http://localhost:${port}/`);
});

// app.listen(port, () => {
//     console.log(`Server running at `)
// })





// const html = htmlTemplate.replace('<!-- Table data to be injected here -->', tableRows);







// // new request made, request event is triggered, causing request and response object
// const server = createServer(async (req, res) => {
//     res.statusCode = 200;
//     res.setHeader('Content-Type', 'text/html');
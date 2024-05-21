const { Pool } = require('pg');
const express = require('express');
const bodyParser = require('body-parser');
const DatabaseManager = require('./databaseManager');
require('dotenv').config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
})

// Instantiate the DatabaseManager 
const databaseManager = new DatabaseManager(pool);

const app = express();
app.use(bodyParser.json());

const columns = [
    { name: 'jan', type: 'INTEGER' },
    { name: 'feb', type: 'INTEGER' },
    { name: 'mar', type: 'INTEGER' },
    { name: 'apr', type: 'INTEGER' },
    { name: 'may', type: 'INTEGER' },
    { name: 'jun', type: 'INTEGER' },
    { name: 'jul', type: 'INTEGER' },
    { name: 'aug', type: 'INTEGER' },
    { name: 'sep', type: 'INTEGER' },
    { name: 'oct', type: 'INTEGER' },
    { name: 'nov', type: 'INTEGER' },
    { name: 'dec', type: 'INTEGER' },
]

// Example list of user credentials
const users = [
    { username: 'pbruno', password: 'pass1', email: 'pbruno@example.com', name: 'Paul Bruno' },
    { username: 'truniro', password: 'pass2', email: 'truniro@example.com', name: 'Tom Runiro' },
    { username: 'psmith', password: 'pass3', email: 'psmith@example.com', name: 'Peter Smith' },
    { username: 'psimon', password: 'pass4', email: 'psimon@example.com', name: 'Paul Simon' },
    { username: 'ttwilks', password: 'pass5', email: 'ttwilks@example.com', name: 'Tom Wilks' },
    { username: 'cchirim', password: 'pass6', email: 'cchirim@example.com', name: 'Chris Chirim' },
    { username: 'revalator', password: 'pass7', email: 'revalator@example.com', name: 'Renee Valator' }
];

// Example route  
app.get('/', (req, res) => {  
    res.send('Hello World!');  
});


app.post('/create-table', async (req, res) => {
    try {
        await databaseManager.createTable('practice_table', columns);
        res.send('Table created successfully');
    } catch (error) {
        res.status(500).send('Error creating table');
    }
});

app.post('/import-data', async (req,res) => {
    try {
        await databaseManager.importExcelData('data.xlsx', 'Sheet1');
        res.send('Data imported successfully');
    } catch (error) {
        res.status(500).send('Error importing data');
    }
});

app.post('/update-users', async (req, res) => {
    try {
        await databaseManager.updateUsersTable(users);
        res.send('Users added successfully');
    } catch (error) {
        res.status(500).send('Error adding users');
    }
});


pool.connect((err) => {
    if (err) { 
        console.error('Connection error', err.stack);
    } else {
        console.log('Connected to the database!');
    }
})


// Start server
const port = process.env.PORT || 3000;  
app.listen(port, () => {  
    console.log(`Server running at http://localhost:${port}/`);  
});  

// Utilization of functions
// createTable('practice_table', columns);
// addColumnToTable('year', 'NUMERIC')
// importExcelData('SeriesReport.xlsx', 'BLS Data Series');
// setupDatabase('practice_db_connection_test');
// dropDatabase('flights');

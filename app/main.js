const { Pool } = require('pg');
const express = require('express');
const bodyParser = require('body-parser');
const DatabaseManager = require('./databaseManager');
// const fs = require('fs')
require('dotenv').config();


// configure connection to database
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
})

// const hostname = '127.0.0.1';
// const port = 3000;


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

// Instantiate the DatabaseManager and connect workflow to database
const databaseManager = new DatabaseManager(pool);

// Utilization of functions
(async () => {
    // Create a new table
    await databaseManager.createTable('practice_table', columns);

    // Import Excel data
    await databaseManager.importExcelData('data.xlsx', 'Sheet1');

    // Create users table
    await databaseManager.createUsersTable();

    // Update users table
    await databaseManager.updateUsersTable(users);

    // Example usage of other methods
    // await databaseManager.setupDatabase('new_database');
    // await databaseManager.dropDatabase('old_database');
    // await databaseManager.addColumnToTable('new_column', 'VARCHAR(255)');
})();

// server.listen(port, hostname, () => {
//     console.log(`Server running at http://${hostname}:${port}/`);
// });
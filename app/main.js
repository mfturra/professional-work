const { Pool } = require('pg');
const express = require('express');
const ExcelJS = require('exceljs');
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
    { name: 'jan', type: 'TINYINT' },
    { name: 'feb', type: 'TINYINT' },
    { name: 'mar', type: 'TINYINT' },
    { name: 'apr', type: 'TINYINT' },
    { name: 'may', type: 'TINYINT' },
    { name: 'jun', type: 'TINYINT' },
    { name: 'jul', type: 'TINYINT' },
    { name: 'aug', type: 'TINYINT' },
    { name: 'sep', type: 'TINYINT' },
    { name: 'oct', type: 'TINYINT' },
    { name: 'nov', type: 'TINYINT' },
    { name: 'dec', type: 'TINYINT' },
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
const databaseManager = new DatabaseManager(pool, ExcelJS);

// Utilization of functions
newDatabase =           false;
deleteDatabase =        false;
newTable =              false;
newTableColumn =        false;
importExcel =           true;
createUsers =           false;
updateUsers =           false;
hashUsersPasswords =    false;

(async () => {
    // Create new database
    if (newDatabase) {
        await databaseManager.setupDatabase('preliminarydatabase')
    }

    if (deleteDatabase) {
        await DatabaseManager.dropDatabase(databaseName)
    }
    
    // Create a new table
    if (newTable) {
        await databaseManager.createTable('practice_table', columns);
    }

    if (newTableColumn) {
        await databaseManager.addColumnToTable('year', 'SMALLINT')
    }

    // Import Excel data
    if (importExcel) {
        await databaseManager.importExcelData('SeriesReport.xlsx', 'BLS Data Series');
    }

    // Create users table
    if (createUsers) {
        await databaseManager.createUsersTable();
    }

    // Update users table
    if (updateUsers) {
        await databaseManager.updateUsersTable(users);
    }

    if (hashUsersPasswords) {
        await databaseManager.fetchAndHashAndUpdateUserPassword()
    }

    // Example usage of other methods
    // await databaseManager.setupDatabase('new_database');
    // await databaseManager.dropDatabase('old_database');
    // await databaseManager.addColumnToTable('new_column', 'VARCHAR(255)');
})();
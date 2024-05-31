const { Pool } = require('pg');
const express = require('express');
const ExcelJS = require('exceljs');
const bodyParser = require('body-parser');
const DatabaseManager = require('./databaseManager');
const { llm_models_dtype, llm_models } = require('./table_creator');

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



// Instantiate the DatabaseManager and connect workflow to database
const databaseManager = new DatabaseManager(pool, ExcelJS);

// Utilization of functions
newDatabase =           false;
deleteDatabase =        false;
newTable =              false;
newTableColumn =        false;
updateTableEntries =    true;
importExcel =           false;
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
        // utilize console log when troubleshooting errors
        // console.log(llm_models_dtype);
        await databaseManager.createTable('llm_models', llm_models_dtype);
    }

    if (newTableColumn) {
        await databaseManager.addColumnToTable('year', 'SMALLINT')
    }

    if (updateTableEntries) {
        await databaseManager.updateTableEntries(llm_models)
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
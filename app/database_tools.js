const { Pool } = require('pg');
const exceljs = require('exceljs');
const fs = require('fs')
require('dotenv').config();


// configure connection
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
})

// const hostname = '127.0.0.1';
const port = 3000;

// Read Excel data and insert into database
async function importExcelData(filename, sheetname) {
    const workbook = new exceljs.Workbook();
    await workbook.xlsx.readFile(filename);

    const worksheet = workbook.getWorksheet(sheetname);
    const client = await pool.connect();

    try {
        await client.query('BEGIN');
        let rowCount = 0;
        worksheet.eachRow({ includeEmpty: false }, async (row, rowNumber) => {
            if (rowNumber >= 2) { // skip header row
                const values = [
                    row.getCell(2).value, // Jan
                    row.getCell(3).value, // Feb
                    row.getCell(4).value, // Mar
                    row.getCell(5).value, // Apr
                    row.getCell(6).value, // May
                    row.getCell(7).value, // Jun
                    row.getCell(8).value, // Jul
                    row.getCell(9).value, // Aug
                    row.getCell(10).value, // Sep
                    row.getCell(11).value, // Oct
                    row.getCell(12).value, // Nov
                    row.getCell(13).value, // Dec
                    row.getCell(1).value // year
                ];
                const query = {
                    text: `INSERT INTO practice_table (Jan, Feb, Mar, Apr, May, Jun, Jul, Aug, Sep, Oct, Nov, Dec, year)
                            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)`,
                    values: values,
                };
                await client.query(query);
            };
            // rowCount++;

            // if (rowCount >= 22) {   // Stop after 9th row
            //     return false;       // Stop iterating through rows
            // }
        });
        await client.query('COMMIT');
        console.log('Data imported successfully.');
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Error importing data:', error)
    } finally {
        client.release();
    }

}

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

// Create a new table in a specific database
async function createTable(tableName, columns) {
    const client = await pool.connect();
    try {
        const columnDefs = columns.map(column => `"${column.name}" ${column.type}`).join(', ');
        const queryString = `CREATE TABLE IF NOT EXISTS "${tableName}" (${columnDefs})`;
        await client.query(queryString);
        console.log(`Table "${tableName} created successfully.`);
    } catch (error) {
        console.error('Error creating table:', error);
    } finally {
        client.release();
    }
}

// Update table by adding a column
async function addColumnToTable(columnName, columnType) {
    const client = await pool.connect();
    try {
        const queryString = `ALTER TABLE practice_table ADD COLUMN "${columnName}" "${columnType}"`;
        await client.query(queryString);
        console.log('Column "${columnName}" was added successfully.');
    } catch (error) {
        console.error('Error adding column to table:', error);
    } finally {
        client.release();
    }
}

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

async function createUsersTable() {
    const client = await pool.connect();
    try {
        await client.query(
            `CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                username VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )`);
        console.log('Users table created successfully.');
    } catch (errro) {
        console.error('Error creating users table:', error);
    } finally {
        client.release();
    }
}

async function updateUsersTable(users) {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        for (const user of users) {
            const { username, password, email, name } = user;
            const query = {
                text: `
                    INSERT INTO users (username, password, email, name)
                    VALUES ($1, $2, $3, $4)
                    ON CONFLICT (username) DO NOTHING
                `,
                values: [username, password, email, name],
            };
            await client.query(query);
        }

        await client.query('COMMIT');
        console.log('Users added successfully.');
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Error adding users:', error);
    } finally {
        client.release();
    }
}

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


// Utilization of functions
updateUsersTable(users)
// createUsersTable()

// createTable('practice_table', columns);
// addColumnToTable('year', 'NUMERIC')
// importExcelData('SeriesReport.xlsx', 'BLS Data Series');
// setupDatabase('practice_db_connection_test');
// dropDatabase('flights');

// server.listen(port, hostname, () => {
//     console.log(`Server running at http://${hostname}:${port}/`);
// });
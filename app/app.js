// database credentials
// const { createServer } = require('node:http');
// const hostname = '127.0.0.1';
// const port = 3000;
// const { client } = require('pg');
const { Pool } = require('pg');
const exceljs = require('exceljs');
require('dotenv').config(); // Load environment variables from .env file

// configure connection
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
})

// Read Excel data and insert into database
async function importExcelData(filename, sheetname) {
    const workbook = new exceljs.Workbook();
    await workbook.xlsx.readFile(filename);

    const worksheet = workbook.getWorksheet(sheetname);
    const client = await pool.connect();

    try {
        await client.query('BEGIN');
        worksheet.eachRow({ includeEmpty: false }, async (row, rowNumber) => {
            if (rowNumber > 14) { // skip header roww
                const values = row.values.slice(1); // skip first column assuming it contains an ID
                const query = {
                    text: `INSERT INTO practice_table (Jan, Feb, Mar, Apr, May, Jun, Jul, Aug, Sep, Oct, Nov, Dec)
                            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
                    values: values,
                };
                await client.query(query);
            }
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

// Utilization of functions
// createTable('practice_table', columns);

importExcelData('SeriesReport.xlsx', 'BLS Data Series');
// setupDatabase('practice_db_connection_test');
// dropDatabase('flights');

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
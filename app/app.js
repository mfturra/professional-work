// database credentials
const { createServer } = require('http');
const { Pool } = require('pg');
const exceljs = require('exceljs');
const fs = require('fs')

// const { table } = require('node:console');
require('dotenv').config(); // Load environment variables from .env file

// configure connection
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
})

// configure server
const hostname = '127.0.0.1';
const port = 3000;

// new request made, request event is triggered, causing request and response object
const server = createServer(async (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');

    try {
        // connect to database and store table values in variables
        const client = await pool.connect();
        const result = await client.query(`SELECT * FROM practice_table`);
        const rows = result.rows;

        // read html file
        const htmlTemplate = fs.readFileSync('index.html', 'utf8');

        let tableRows = '';
        rows.forEach(row => {
            tableRows += `<tr><td>${row.jan}</td><td>${row.feb}</td><td>${row.mar}</td><td>${row.apr}</td><td>${row.may}</td><td>${row.jun}</td><td>${row.jul}</td><td>${row.aug}</td><td>${row.sep}</td><td>${row.oct}</td><td>${row.nov}</td><td>${row.dec}</td><td>${row.year}</td></tr>`;
        });

        // replace comment section in HTML file with data from database
        const html = htmlTemplate.replace('<!-- Table data will be injected here -->', tableRows);
        // const html = htmlTemplate.replace('<!-- Table data to be injected here -->', tableRows);

        res.end(html);
        client.release();
    } catch (error) {
        res.statusCode = 500;
        res.end(JSON.stringify({ error: 'Internal server error' }));
        console.error('Error retrieving data:', error);
    }
});



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

// Utilization of functions
// createTable('practice_table', columns);
// addColumnToTable('year', 'NUMERIC')
// importExcelData('SeriesReport.xlsx', 'BLS Data Series');
// setupDatabase('practice_db_connection_test');
// dropDatabase('flights');

// listen for server req and run code above when request takes place
server.listen(port, hostname, () => {
    // output specific message once server is connected
    console.log(`Server running at http://${hostname}:${port}/`);
});
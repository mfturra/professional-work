const express = require('express');
const { Pool } = require('pg');
require('dotenv').config();
require('app\build_classes.js');

const app = express();

app.use(express.json());

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
})

pool.connect((err) => {
    if (err) { 
        console.error('Connection error', err.stack);
    } else {
        console.log('Connected to the database!');
    }
})

// Example route  
app.get('/', (req, res) => {  
    res.send('Hello World!');  
});  
    
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

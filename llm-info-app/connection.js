const { Client } = require('pg');

const client = new Client ({
    host: 'localhost',
    user: 'matheusturra',
    password: 'postgres',
    database: 'postgres',
    port: 5432,
});

client.connect()
    .then(() => { console.log('Connected to PostgreSQL Database'); })
    .catch(err => { console.error('Connection error'), err.stack })
    .finally(() => { client.end() });


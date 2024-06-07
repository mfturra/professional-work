const ExcelJS = require('exceljs');
const bcrypt = require('bcrypt');

class DatabaseManager {
    // class constructor with dependencies
    constructor(pool, ExcelJS) {
        this.pool = pool;
        this.exceljs = ExcelJS;
    }

    
    /// Database Manipulation methods
    // Create a new database
    async setupDatabase(databaseName) {
        const client = await this.pool.connect();
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
    async dropDatabase(databaseName) {
        const client = await this.pool.connect();
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

    /// Table manipulation methods
    // Create a new table in a specific database
    async createTable(tableName, columns) {
        const client = await this.pool.connect();
        try {
            const columnDefs = columns.map(column => `"${column.name}" ${column.type}`).join(', ');
            console.log(columnDefs);
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
    async addColumnToTable(columnName, columnType) {
        const client = await this.pool.connect();
        try {
            const queryString = `ALTER TABLE practice_table ADD COLUMN "${columnName}" ${columnType}`;
            await client.query(queryString);
            console.log('Column "${columnName}" was added successfully.');
        } catch (error) {
            console.error('Error adding column to table:', error);
        } finally {
            client.release();
        }
    }

    // Update llm models table, if it exists
    async updateTableEntries(entries) {
        const client = await this.pool.connect();
        try {
            await client.query('BEGIN');

            for (const entry of entries) {
                let { company, model_name, context, input, output, knowledge } = entry;

                if (knowledge === undefined) {
                    knowledge = null;
                }

                const query = {
                    text: `
                        INSERT INTO llm_models (company, model_name, context, input, output, knowledge)
                        VALUES ($1, $2, $3, $4, $5, $6)
                    `,
                        // ON CONFLICT (company, model_name) DO UPDATE SET  
                        // context = EXCLUDED.context,  
                        // input = EXCLUDED.input,  
                        // output = EXCLUDED.output,  
                        // knowledge = EXCLUDED.knowledge
                    values: [company, model_name, context, input, output, knowledge],
                };
                await client.query(query);
            }
            await client.query('COMMIT');
            console.log('Table entries were added successfully.');
        } catch (error) {
            await client.query('ROLLBACK');
            console.error('Error adding entries to table:', error);
        } finally {
            client.release();
        }
    }

    /// User manipulation methods
    // Create users table, if not existent
    async createUsersTable() {
        const client = await this.pool.connect();
        try {
            await client.query(
                `CREATE TABLE IF NOT EXISTS users (
                    id SERIAL PRIMARY KEY,
                    username VARCHAR(255) UNIQUE NOT NULL,
                    password VARCHAR(255) NOT NULL,
                    email VARCHAR(255) UNIQUE NOT NULL,
                    name VARCHAR(255) NOT NULL,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )`);
            console.log('Users table created successfully.');
        } catch (error) {
            console.error('Error creating users table:', error);
        } finally {
            client.release();
        }
    }

    // Update users table, if it exists
    async updateUsersTable(users) {
        const client = await this.pool.connect();
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

    async fetchAndHashAndUpdateUserPassword() {
        const client = await this.pool.connect();
        try {
            await client.query('BEGIN');

            // Fetch all users
            const result = await client.query('SELECT username, password FROM users');
            const users = result.rows;

            // Iterate over each user and hash their password
            for (const user of users) {
                const hashedPassword = await bcrypt.hash(user.password, 10);
                const query = {
                    text: 'UPDATE users SET password = $1 WHERE username = $2',
                    values: [hashedPassword, user.username],
                };
                await client.query(query);
                console.log(`Updated password for user: ${user.username}`);
            }

            await client.query('COMMIT');
            console.log('All passwords have been updated.');
        } catch (error) {
            await client.query('ROLLBACK');
            console.error('Error updating passwords:', error);
        } finally {
            client.release();
        }
    }


    /// Excel data ingestion method 
    // Read Excel data and insert into database
    async importExcelData(filename, sheetname) {
        const workbook = new this.exceljs.Workbook();
        await workbook.xlsx.readFile(filename);

        const worksheet = workbook.getWorksheet(sheetname);
        const client = await this.pool.connect();

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
}

module.exports = DatabaseManager;

// Filter through later
// Read Excel data and insert into database
// async function importExcelData(filename, sheetname) {
//     const workbook = new exceljs.Workbook();
//     await workbook.xlsx.readFile(filename);

//     const worksheet = workbook.getWorksheet(sheetname);
//     const client = await pool.connect();

//     try {
//         await client.query('BEGIN');
//         let rowCount = 0;
//         worksheet.eachRow({ includeEmpty: false }, async (row, rowNumber) => {
//             if (rowNumber >= 2) { // skip header row
//                 const values = [
//                     row.getCell(2).value, // Jan
//                     row.getCell(3).value, // Feb
//                     row.getCell(4).value, // Mar
//                     row.getCell(5).value, // Apr
//                     row.getCell(6).value, // May
//                     row.getCell(7).value, // Jun
//                     row.getCell(8).value, // Jul
//                     row.getCell(9).value, // Aug
//                     row.getCell(10).value, // Sep
//                     row.getCell(11).value, // Oct
//                     row.getCell(12).value, // Nov
//                     row.getCell(13).value, // Dec
//                     row.getCell(1).value // year
//                 ];
//                 const query = {
//                     text: `INSERT INTO practice_table (Jan, Feb, Mar, Apr, May, Jun, Jul, Aug, Sep, Oct, Nov, Dec, year)
//                             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)`,
//                     values: values,
//                 };
//                 await client.query(query);
//             };
//             // rowCount++;

//             // if (rowCount >= 22) {   // Stop after 9th row
//             //     return false;       // Stop iterating through rows
//             // }
//         });
//         await client.query('COMMIT');
//         console.log('Data imported successfully.');
//     } catch (error) {
//         await client.query('ROLLBACK');
//         console.error('Error importing data:', error)
//     } finally {
//         client.release();
//     }

// }
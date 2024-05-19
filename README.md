# api-data-processing
Code base for professional projects that involve API requests and data processing of large scale data sets

## PostgreSQL Login
psql postgres

### Pipeline creation
Order of workflows that were created.
1. Create new database for specific user credentials.
2. Delete specific database using database name.
3. Create structure table inside database based on specific column types.
4. Ingest excel data into databases' table.
5. Upload data onto HTML page and customize table to make it easily understood.
6. Create login page that requires credentials from user before accessing data.


Postgresql DB Tricks
- Move into database: \connect dbname
- Output all table names: \dt
- Output all content inside table: SELECT * FROM tableName;

create postgresql user specifically to handle datasets.
learn about postgresql pools 
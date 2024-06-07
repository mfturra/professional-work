## Recovering Root Access to PostgreSQL DB
1. Whenever access to the root users password is lost, first stop the PostgreSQL server. 
2. Next, if you're using a Windows laptop, type `psql` in the Windows search bar to bring up the postgresql login. 

## Creating New User
1. Create a user that has the ability to create databases using the following code: `CREATE USER userid WITH PASSWORD 'password' CREATEDB;`
    - Drop the `CREATEDB` property from script in step 1 if the user that's being created should not have the ability to create a new database.
2. Switch to the respective user by first exiting the psql shell using the following command in the command line prompt: `\q`
3. Type `psql` in the Windows search bar.
4. When prompted, enter your username and password. After entering your credentials, the terminal command line will change to `postgres=>`.

### Pipeline creation
Order of workflows that were created.
1. Create new database for specific user credentials.
2. Delete specific database using database name.
3. Create structured table inside database based on specific column types.
4. Ingest excel data into databases' table.
5. Upload data onto HTML page and customize table to make it easily understood.
6. Create login page that requires credentials from user before accessing data.
    - Create postgresql user specifically to handle datasets.

## SQL Shortcuts
- Login to PostgreSQL: `psql postgres`
- List all the available databases in the sql server: `\l`
- Connect to specific database: `\connect dbname`
- List all tables available inside the database: `\dt`
- Select all content contained inside a specific table: `SELECT * FROM tablename;`
- Add column to table: `ALTER TABLE tablename ADD COLUMN columnname columntype;`
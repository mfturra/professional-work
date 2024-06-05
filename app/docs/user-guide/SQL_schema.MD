# Understanding SQL Schemas & Structure
Schema definition: Assists in structuring the tables in a database, which includes things like column_names, column_types, sizes, and attributes. A framework can be used to generate the schema.

## Understanding the guiding principles for data types
- Keep it small - The smallest data type should be created to hold all the data.
- Keep it simple - The simplest column type should be implemented to reflect the data (e.g. using numerical types for numbers, etc.)
- Keep it honest - Ensure that your schema reflects the reality of the data. 
    - The more compact it is, the faster the database will be able to access it. The database should be able to get access to the database faster.

#### Importance of Schemas
- Allows users to access and index data more efficiently.
- Faster data access: Minimizes extra time needed to search for data within larger column types.
- Efficient indexing: Improved index speed and efficiency is a consequence of a more rigid schema. Indexes are stored in a computers memory. Therefore, the smaller the schema, the less memory usage used. 

## Data Types
1. INT: Integer
2. FLOAT and DOUBLE: Used for decimal or floating point values
3. VARCHAR: Used for variable-length character strings
4. DATE, DATETIME, and TIMESTAMP: Used for date and time values.

### Understanding INTEGERS
Storage Requirements
1. TINYINT - 1 byte. Range from 0 to 255
    - 00000000 - 0 bytes
    - 11111111 - 255 bytes
    - 0 1111111 = 128 (negative bits)
    - 1 (dedicated to the sign of the value) 1111111 - 127 bytes (positive bit)
2. SMALLINT - 2 byte
3. MEDIUMINT - 3 byte
4. INT - 4 byte
BIGINT - 8 byte

### Understanding DECIMALS
Storage Requirements
1. Fixed point (exact value)
    - DECIMAL (DECIMAL)
2. loating point (approximate value)
    - FLOAT
    - DOUBLE - Stores larger and more precise values than FLOAT.

Storing DECIMALS
- Application: Working with financial information.
- DECIMAL(10,2) - Stores data sets that have a maximum of 10 numerical digits. With two digits being to the right of the decimal point and eight being to the left of the decimal point.

### Understanding STRING
Available Types
- CHAR: Fixed character. Things that will always be the same size.
    - Examples:
        - char(5)
        - char(32)
- VARCHAR: Variable character. Establishes the limit to the size of the inputs to the column.
    - Example:
        - varchar(100) - Limited to only the amount of space that's required. 
        - Potential best practice: Fname & Lname together can be 100 and email can be 150 chars.

Character Set
    - What CHAR are allowed to go into the cols.
    - Accessible via: SELECT * FROM information_schema.CHARACTER_SETS ORDER BY CHARACTER_SET_NAME;
        -  Utfmb4 used for all characters including emojis.

Collate
    - Determines how to compare two strings and sort them. 
    - Case-insensitive (i.e. ci) and accent-insensitive (ai)

### Understanding Binary String
Store raw binary data only that can't be represented as regular strings.

Available types
    - BINARY (Fixed)
    - VARBINARY (Variable)

Example for BINARY
select md5('hello') - Creates hash of 'hello'
select unhex(md5('hello')) - Converts this to binary data
- Side by side comparison: select unhex(md5('hello')), md5('hello');
- Create database using the following string: 
    - -uroot -p \
    - --table \
    - --socket /temp/mysql_3301.sock \
    - -uroot \
    - --skip-binary-as-hex (tells SQL to return hex value of binary)

### Understanding Long String
Character data holders
- CHAR
- VARCHAR - Use for the first 1000 characters
- TEXT - Megabytes storage should cause the developer to transition to MEDIUMTEXT and LONGTEXT.
    -  TINYTEXT (255 char), TEXT, MEDIUMTEXT, LONGTEXT (4 GB)

### Undersatnding Binary (Byte string)
- BINARY
- VARBINARY
- BLOB - Do not have a character set or a collation like TEXT columns do. 
    -  Examples
        - TINYBLOD, BLOB, MEDIUMBLOB, LONGBLOB (4 GB)
        - Only select them when you need them.
        - You can't index an entire text column. You sort by the first 2000 characters.

Best practice when indexing on text or blob columns
- Only select these columns when required. Refactoring data so that BLOB columns are joined only when necessary.
- Indexing should only be done on a prefix of the column.
- Use VARCHAR for smaller amounts of data. When storing a few hundred characters, use VARCHAR instead of text columns to help with indexing and sorting.

### Undersatnding ENUM
The way that the field is originally declared causes the workflow to produce a specific output. Orders by underlying integers. If options are totally fixed then you can use ENUMs. If it needs to be changed then Using the following options and position
1. x-small
2. small
3. medium
4. large
5. x-large
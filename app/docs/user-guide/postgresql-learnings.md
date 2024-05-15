Whenever access to the root users password is lost you'll need to stop the PostgreSQL server first. 

Next, if you're using a Windows laptop, type psql in the Windows search bar to bring up the postgresql login. Create a user that has the ability to create databases using the following code:
CREATE USER mt1070 WITH PASSWORD 'password' CREATEDB;
'SeCrity2024'

Switch to said user by first exiting the psql shell using the following command: \q
Follow step 1 again and login to the postgreSQL shell by typing in your username and password at the appropriate time. Even though nothing changes you'll be 'signed in' with the appropriate user credentials. 

Considering the fact that many node dependencies (i.e. packages) are being installed for this project, it's preferable that it's not re-downloaded each time. To avoid doing that, you'll need to create a package.json file. This is the main file for the Node.js application, housing all the projects metadata. This includes the project name, description, scripts, and the dependencies of the project. 

To do this in a practical way, using the command line tool, change the directory to the projects folder. While there type the following to initialize the new package.json file: npm init -y
    - The -y flag will answer 'yes' to all prompts and produce a standard package.json file. 
To proactively add these dependencies to your current workflow and save them at the same time use the following script: npm install express pg dotenv --save. 
    - Using this script will proactively automatically update your package.json file. 
Whenever a new user downloads the folder in the future, all they would need to do is run npm install and it'll install all the correct versions of everything listed in the dependencies section. 
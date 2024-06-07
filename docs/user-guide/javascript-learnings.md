## Creating a Seamless Build Experience
Considering the fact that many node dependencies (i.e. packages) are being installed for this project, it's preferable to create a streamlined workflow that would download all dependencies at once. In order to do that you'll need to create a package.json file. This is the main file for the Node.js application, housing all the projects metadata. This includes the project name, description, scripts, and the dependencies of the project. 

### Creating package.json file
1. Using the command line tool, change the directory to the projects folder. While there type the following to initialize the new package.json file: `npm init -y`
    - The -y flag will answer 'yes' to all prompts and produce a standard package.json file. 
2. To proactively add these dependencies to your current workflow and save them to the package.json file, use the following script: `npm install express pg dotenv --save`
    - Using this script will proactively automatically update your package.json file. 
3. To download the necessary dependencies when opening this folder in the future, type the following command in the terminal while in the projects folder: `npm install`
    - `npm install` will install all the correct versions of the projects dependencies. 
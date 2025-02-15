# Professional-Work
While working in the hospital institution's emerging technologies team, projects were taken on to solve real world problems that impacted varying degrees of patients and care team operational workflows. The folders in this repo represent the different problems that were solved using different programming languages (#Python, #JavaScript, PostgreSQL, Powershell) to help internal stakeholders take action on insights that were acquired.

The projects were organized into the following folders
## 💻 llm-model-app
### 🛠️ Tools
* JavaScript, PostgreSQL, HTML, CSS

### 📚 Libraries & Frameworks
pg, bcrypt, Express.JS, bodyParser

### 💽 Data Types
JSON, PostgreSQL Schemas & Tables

### 📋 Briefing
- **Problem**: For months an external vendor had difficulties with the delivering on a secure UI dashboard that provides internal stakeholders with access to sensitive patient data.
- **_Preliminary_ Solution**: Build out a JS and PostgreSQL data access pipeline to better understand what difficulties the vendor could be encountering.
- **Actual Solution**: Created a locally hosted web app that's connected to two PostgreSQL database tables, with data accessible after the login screen.
- **Data Set**: In an effort to provide meaningful and desensitized raw data, I recalled that LLM models were being explored for a wide range of professional work applications. As a result, I decided that I would do the following:
    - Scour the internet for information on the top LLM models of the time.
    - Create two tables in a PostgreSQL database.
        1. The **llm-models** table would list out the following information on the top LLM models: Company Name, Model Name, Context Window, Input & Output Token Costs, and Knowledge Base Date.
            - The **llm-model** schema would be as follows:
              ``` javascript
                { name: 'company',     type: 'VARCHAR(50)' },  
                { name: 'model_name',  type: 'VARCHAR(50)' },  
                { name: 'context',     type: 'VARCHAR(50)' },  
                { name: 'input',       type: 'DECIMAL(5,2)' },  
                { name: 'output',      type: 'DECIMAL(5,2)' },  
                { name: 'knowledge',   type: 'DATE' },  
              ```
        3. The **users** table would contain fictitious user names and hashed passwords to be used when logging into the web app.
    - Create a user-friendly web app that allows users to compare LLM models offerings against one another, while also providing users with information on what **Context Windows**, **Input & Output Token Costs**, and **Knowledge Base Dates** are. The end product can be seen below.

https://github.com/user-attachments/assets/a13bf795-2004-4a77-8cbe-a7365431b96f

## 💻📡 api-data-processing
### 🛠️ Tools
* Python, Jupyter Notebook, External Vendor API (API key & endpoint)

### 📚 Libraries & Modules
Pandas, glob

### 💽 Data Types
CSV

### 📋 Briefing
- **Problem**: External vendor didn't have the ability to provide our team with patient specific SMS outreach metrics using their platforms dashboards. The only way that information was accessible was through the use of their platforms API's.
- **Solution**: Python API workflow was built to pull tens of thousands of sensitive patient campaign metrics and use the Pandas library to reformat data sets in a way that allowed internal stakeholders to take action on the insights being gathered.


## 🗂️ internal-file-handling
### 🛠️ Tools
* Python, PowerShell, Jupyter Notebook

### 📚 Libraries & Modules
Pandas, datetime, win32com

### 💽 Data Types
CSV

### 📋 Briefing
- **Problem**: Internal staff were daily manually modifying and moving files that contained sensitive data in the mornings (i.e. 6:45-7:00am) and in the evenings (7pm-10pm) to an internal SFA folder. An internal Diplomat (i.e. file processing & transfer team) job was then used to move the files from the SFA server to an external SFTP server to be sent to an external vendor. The workflow presented itself with numerous automation opportunities to maintain consistent file manipulation during staffing changes and to reduce burden on internal staff.
- **Solution**: Multiple Python and Powershell automation workflows were created to handle varying file names on different weekdays, perform necessary file manipulations within required timeframes, and ensure smooth integration into internal workflows, while preventing disruption of internal Diplomat jobs.

## 📖 docs
### 📋 Briefing
- **Problem**: Due to the wide range of languages that were being used across multiple projects, there were common issues that arose during their respective learning curves and utilization.
- **Solution**: Knowledge base was created to document the learnings that were gained in between project uploads.

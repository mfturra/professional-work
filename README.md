# Professional-Work
While working in the hospital institution's emerging technologies team, projects were taken on to solve real world problems that impacted varying degrees of patients and care team operational workflows. The folders in this repo represent the different problems that were solved using different programming languages (Python, JavaScript, PostgreSQL, Powershell) to help internal stakeholders take action on insights that were acquired.

The projects were organized into the following folders:
1. api-data-processing
    - Problem: External vendor didn't have the ability to provide our team with patient specific SMS outreach metrics using their platforms dashboards. The only way that information was accessible was through the use of their platforms API's.
    - Solution: Python API workflow was built to pull tens of thousands of sensitive patient campaign metrics and use the Pandas library to reformat data sets in a way that allowed internal stakeholders to take action on the insights being gathered.
2. internal-file-handling
    - Problem: Internal staff were daily manually modifying and moving files that contained sensitive data in the mornings (i.e. 6:45-7:00am) and in the evenings (7pm-10pm) to an internal SFA folder. An internal Diplomat job was then used to move the files from the SFA server to an external SFTP server to be sent to an external vendor. Workflow presented itself with numerous automation opportunities to maintain consistent file manipulation during staffing changes and to reduce burden on internal staff.
    - Solution: Multiple Python and Powershell automation workflows were built to perform the necessary file manipulation and handling during the required timeframes, while avoiding the disruption of internal Diplomat jobs.
3. llm-model-app
    - Problem: After months of delay, an external vendor was having issues with the delivery of a secure UI dashboard that provides internal stakeholders with access to sensitive patient data.
    - Solution: Build out a JS and PostgreSQL data access pipeline to better understand what difficulties the vendor could be encountering.
    - Components: JS list and Excel data sets were ingested into a PostgreSQL DB and tables using personally built SQL tools. SQL data sets were then made accessible to credentialed users in the form of a locally hosted webpage using JS to present meaningful and relevant data to internal stakeholders.
4. research
    - Problem: Internal researcher was utilizing a Microsoft OpenAI Assistant to evaluate whether changes in outside temperature would cause a reduction in the number of patients that were attending their scheduled appointments. OpenAI Assistant didn't have real-time data from the last few months to create any correlations for the query being made.
    - Solution: Python API workflow was created to pull and ingest the necessary data set into the OpenAI Assistant workflow to allow the internal researcher to validate his assumptions.
5. docs
    - Problem: Due to the wide range of languages that were being used, there were common issues that arose during their respective learning curves and utilization.
    - Solution: Knowledge base was created to document the learnings that were gained in between project uploads.
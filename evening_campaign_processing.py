import os
import shutil
import pandas as pd
import time
import datetime
from datetime import datetime
import win32com.client as win32

# weekday mapping
weekDaysMapping = ("Mon", "Tues", 
                   "Wed", "Thurs",
                   "Fri", "Sat",
                   "Sun")

# acquire current time of processing workflow
processFullDate = datetime.now()
unMappedProcessWeekDay = processFullDate.weekday()
mappedProcessWeekDay = weekDaysMapping[unMappedProcessWeekDay]

# print(mappedProcessWeekDay)

# process_time = time.now()
fullProcessDate = processFullDate.strftime(f"{mappedProcessWeekDay}" + ' %b %d %H:%M:%S %Y')



# outline file paths and raw_file_name
camp4_file_path = r'\\network\Team\MT\Company\Campaign4'

# config preferred partial file name
camp4_partial_file_name = 'Campaign_Final'

# config preferred duplicate final file name
final_camp4_path = os.path.join(camp4_file_path, 'Campaign4_.csv')

# change diretory of file path
os.chdir(camp4_file_path)

# list files located in folder
# print('Files in folder prior to copying file:')
# print(os.listdir(camp4_file_path))

# locate files that match with partial name
camp4_matching_files = [file for file in os.listdir(camp4_file_path)
                  if camp4_partial_file_name in file]

# use original file name and remove string element from list
camp4_original_file_name = ''
for i in camp4_matching_files:
    camp4_original_file_name += i

if camp4_matching_files:
    # pull first matching file
    camp4_src_name = os.path.join(camp4_file_path, camp4_matching_files[0])

    # original file path
    camp4_txt_path = os.path.join(camp4_file_path, camp4_original_file_name)

    # copy file to specific folder
    camp4_duplicate_file = shutil.copy(camp4_src_name, final_camp4_path)

    # determine the file path for the converted .csv file
    camp4_csv_path = os.path.join(camp4_file_path, 'Campaign4_.csv')

    # # convert .txt to .csv file
    # with open(camp4_txt_path, 'r') as txt_file:
    #     with open(camp4_csv_path, 'w') as csv_file:
    #         for line in txt_file:

    #             csv_file.write(line.replace('|', ','))

    print(f'\n\n{camp4_src_name} was converted to the {final_camp4_path} file.')

else:
    print(f'No file found with partial name {camp4_partial_file_name}')

# reconfigure dataset to DataFrame
camp4_df = pd.DataFrame()

# specify data types for columns
camp4_dtype_dict = {'Campaign ID': str}
camp4_df = pd.read_csv(final_camp4_path, sep='|', dtype=camp4_dtype_dict)
# camp4_df = camp4_df.rename(columns={'PRMN':'PMRN', 'BWH_MRN':'BWH MRN', 'PatientNameGiven': 'First Name', 'PatientNameFamily':'Last Name', 'MobileNumber':'Patient Cell Phone', 'Email':'E-mail', 'IsDeceased':'Is Deceased', 'DateofBirth':'DOB', 'TextingConsent':'Send SMS YN', 'PrimaryLanguage':'Language', 'ICMPPatient':'ICMP Patient', 'DischargeDateTime':'Discharge Date Time', 'ReferralMade':'Referral Made', 'ReferralSpecialty':'Referred to Specialty'})

# convert BWH_MRN column to string to preserve leading zeros
camp4_df['Campaign ID'] = camp4_df['Campaign ID'].astype('str') #.apply(lambda x: x.zfill(2)) #('"{}"'.format)

# output DataFrame to .csv
camp4_df.to_csv(final_camp4_path, index=False)


# outline file paths and raw_file_name
raw_camp5_path = r'\\network\Team\MT\Company\Campaign5'

# config preferred partial file name
camp5_partial_file_name = 'Campaign5_2024'

# config preferred duplicate final file name
final_camp5_path = os.path.join(raw_camp5_path, 'Campaign5_.csv')

# change diretory of file path
os.chdir(raw_camp5_path)

# list files located in folder
print('Files in folder prior to copying file:')
print(os.listdir(raw_camp5_path))

# locate files that match with partial name
camp5_matching_files = [file for file in os.listdir(raw_camp5_path)
                  if camp5_partial_file_name in file]

if camp5_matching_files:
    # pull first matching file
    camp5_src_name = os.path.join(raw_camp5_path, camp5_matching_files[0])

    # copy file to specific folder
    camp5_duplicate_file = shutil.copy(camp5_src_name, final_camp5_path)
    print(f'\n\n{camp5_src_name} duplicated and changed to {final_camp5_path}')

else:
    print(f'No file found with partial name {camp5_partial_file_name}')

# print('\nFiles in folder after copying file:')
# print(os.listdir(raw_camp5_path))
    
# reconfigure dataset to DataFrame
camp5_df = pd.DataFrame()

# specify data types for columns
camp5_dtype_dict = {'Campaign ID': str}
camp5_df = pd.read_csv(final_camp5_path, sep=',', dtype=camp5_dtype_dict)

# rename specific column to maintain consistency across campaigns
# camp5_df = camp5_df.rename(columns={'PatEmail':'E-mail'})

# convert BWH_MRN column to string to preserve leading zeros
camp5_df['Campaign ID'] = camp5_df['Campaign ID'].astype('str')

# output DataFrame to .csv
camp5_df.to_csv('Campaign5.csv', index=False)


# outline file paths and raw_file_name
raw_camp6_path = r'\\network\Team\MT\Company\Campaign6'

# config preferred partial file name
camp6_partial_file_name = 'Camp6_Final_'

# config preferred duplicate final file name
final_camp6_path = os.path.join(raw_camp6_path, 'Campaign6_.csv')

# change diretory of file path
os.chdir(raw_camp6_path)

# list files located in folder
# print('Before copying file')
# print(os.listdir(raw_camp6_path))

# locate files that match with partial name
camp6_matching_files = [file for file in os.listdir(raw_camp6_path)
                  if camp6_partial_file_name in file]

if camp6_matching_files:
    # pull first matching file
    camp6_src_name = os.path.join(raw_camp6_path, camp6_matching_files[0])

    # copy file to specific folder
    camp6_duplicate_file = shutil.copy(camp6_src_name, final_camp6_path)
    print(f'{camp6_src_name} duplicated and changed to {final_camp6_path}')

else:
    print(f'No file found with partial name {camp6_partial_file_name}')

## Remove Specific Columns and Overwrite file
# create local space for camp6_df
camp6_df = pd.DataFrame()

# read csv file and convert it to DataFrame
camp6_df = pd.read_csv(final_camp6_path)
camp6_cols_to_delete = ['Description', 'Connector', 'Referred to Provider', 'User Name', 'User Last Name', 'User First Name', 'User Middle Nm', 'Communication List']

# delete all cols in cols_to_delete list
camp6_df = camp6_df.drop(camp6_cols_to_delete, axis=1)

# drop all NaN rows in col 'RFL ON WQ (ID)'
camp6_df = camp6_df.dropna(subset=['Work (ID)'])

# drop all rows in col 'RFL ON WQ (ID)' that have a numerical value that's 7 or greater
camp6_df = camp6_df[camp6_df['Work (ID)'].astype(str).str.len() < 7]

# output date and time file created
try:
    camp6_file_status =        time.ctime(os.path.getmtime(final_camp6_path))
    camp6_file_status_update = print(camp6_file_status) #f'File Last Updated: {ed_file_status}')
except OSError:
    camp6_file_status_update = print(f'\nFile {final_camp6_path} was not received by {fullProcessDate} and was not created.')

# convert DataFrame to csv file and overwrite previously created file
camp6_df.to_csv('Campaign6.csv', index=False)


eveningFiles = [final_camp4_path, final_camp5_path, final_camp6_path]





# creates connection to Outlook app
olApp = win32.Dispatch('Outlook.application')

# calls mailItem object features to configure rest of email settings
mailItem = olApp.CreateItem(0)

# email config settings
mailItem.subject = 'Test Email Outreach for Automated File Handling Workflow'

# sets email to plain text config
mailItem.BodyFormat = 2

# outlines body of email
mailItem.HTMLBody = f"""
                        <HTML>
                        <BODY>
                            <h2>Internal Automated File Handling and Modification</h2>
                            <p>Updates were initiated at: {fullProcessDate}</p>
                            <p>Updated were completed by: {eveningFiles}</p>
                            <p>These are the names of the files that were created:</p>
                            <ol>
                            {''.join(f"<li>{file}</li>" for file in eveningFiles)}
                            </ol>
                        </BODY>
                        </HTML>
                    """

# mailItem.Body = 'Email marks completion of email outreach test'

# outlines the recipients of the email
mailItem.To = 'coworker@company.org'

# outlines the sendor email
mailItem.SentOnBehalfOfName = 'self@company.org'
#_oleobj_.Invoke(*(64209, 0, 8, 0, olNS.Accounts.Item('mturra@mgb.org')))

# displays email template
# mailItem.Display()

# saves email template
# mailItem.Save()

# sends email template to recipient list
mailItem.Send()
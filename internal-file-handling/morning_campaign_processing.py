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


# process_time = time.now()
fullProcessDate = processFullDate.strftime(f"{mappedProcessWeekDay}" + ' %b %d %H:%M:%S %Y')

# print(fullProcessDate)

# outline file paths and raw_file_name
camp1_file_path = r'\\network\Team\MT\Company\Campaign1'

# config preferred partial file name
camp1_partial_file_name = 'Campaign_2024'

# config preferred duplicate final file name
final_camp1_path = os.path.join(camp1_file_path, 'Campaign1_.csv')

# change diretory of file path
os.chdir(camp1_file_path)

# list files located in folder
print('Files in folder prior to copying file:')
print(os.listdir(camp1_file_path))

# locate files that match with partial name
camp1_matching_files = [file for file in os.listdir(camp1_file_path)
                  if camp1_partial_file_name in file]

# use original file name and remove string element from list
camp1_original_file_name = ''
for i in camp1_matching_files:
    camp1_original_file_name += i

if camp1_matching_files:
    # pull first matching file
    camp1_src_name = os.path.join(camp1_file_path, camp1_original_file_name[0])

    # original file path
    camp1_txt_path = os.path.join(camp1_file_path, camp1_original_file_name)

    # copy file to specific folder
    camp1_duplicate_file = shutil.copy(camp1_src_name, final_camp1_path)

    print(f'\n\n{camp1_src_name} was converted to the {final_camp1_path} file.')

else:
    print(f'No file found with partial name {camp1_partial_file_name}')

# reconfigure dataset to DataFrame
camp1_df = pd.DataFrame()

# specify data types for columns
camp1_dtype_dict = {'Campaign ID': str}
camp1_num_cols = 23
try:
    # preliminarily read camp1 file with | delimiters, utf encoding and unique dtype
    camp1_df = pd.read_csv(final_camp1_path, sep='|', usecols=range(camp1_num_cols), encoding='utf-8', dtype=camp1_dtype_dict)
except:
    # for exceptions, read camp1 file with | delimiters, latin1 encoding and similar dtype
    camp1_df = pd.read_csv(final_camp1_path, sep='|', usecols=range(camp1_num_cols), encoding='latin1', dtype=camp1_dtype_dict)

# rename column in DataFrame
camp1_df = camp1_df.rename(columns={'Campaign ID':'CampID', 'User ID':'ID', 'Outreach Consent':'SMS YN', 'Customer Mobile Phone':'Customer Cell', 'Customer Email':'E-mail'})

# # convert BWH_MRN column to string to preserve leading zeros
camp1_df['Campaign ID'] = camp1_df['Campaign ID'].astype('str')

# # output DataFrame to .csv
camp1_df.to_csv('Campaign1_.csv', index=False)



# outline file paths and raw_file_name
camp2_file_path = r'\\network\Team\MT\Company\Campaign2'

# config preferred partial file name
camp2_partial_file_name = 'Campaign2_'

# config preferred duplicate final file name
final_camp2_path = os.path.join(camp2_file_path, 'Campaign2.csv')

# change diretory of file path
os.chdir(camp2_file_path)

# list files located in folder
print('Files in folder prior to copying file:')
print(os.listdir(camp2_file_path))

# locate files that match with partial name
camp2_matching_files = [file for file in os.listdir(camp2_file_path)
                  if camp2_partial_file_name in file]

# use original file name and remove string element from list
camp2_original_file_name = ''
for i in camp2_matching_files:
    camp2_original_file_name += i

if camp2_matching_files:
    # pull first matching file
    camp2_src_name = os.path.join(camp2_file_path, camp2_matching_files[0])

    # original file path
    camp2_txt_path = os.path.join(camp2_file_path, camp2_original_file_name)

    # copy file to specific folder
    camp2_duplicate_file = shutil.copy(camp2_src_name, final_camp2_path)

    print(f'\n\n{camp2_src_name} was converted to the {final_camp2_path} file.')

else:
    print(f'No file found with partial name {camp2_partial_file_name}')

# reconfigure dataset to DataFrame
camp2_df = pd.DataFrame()

# specify data types for columns
camp2_dtype_dict = {'Campaign ID': str}
camp2_num_cols = 25
try:
    # preliminarily read camp1 file with | delimiters, utf encoding and unique dtype
    camp2_df = pd.read_csv(final_camp2_path, sep='|', usecols=range(camp2_num_cols), encoding='utf-8', dtype=camp2_dtype_dict)#, dtype=camp1_dtype_dict)
except:
    # for exceptions, read camp1 file with | delimiters, latin1 encoding and similar dtype
    camp2_df = pd.read_csv(final_camp2_path, sep='|', usecols=range(camp2_num_cols), encoding='latin1', dtype=camp2_dtype_dict)#, dtype=camp1_dtype_dict)

# rename column in DataFrame
camp2_df = camp2_df.rename(columns={'Campaign ID':'CampID', 'User ID':'ID', 'Outreach Consent':'SMS YN', 'Customer Mobile Phone':'Customer Cell', 'Customer Email':'E-mail'})

# # convert BWH_MRN column to string to preserve leading zeros
camp2_df['Campaign ID'] = camp2_df['Campaign ID'].astype('str')

# # output DataFrame to .csv
camp2_df.to_csv('Campaign2_.csv', index=False)



# outline file paths and raw_file_name
camp3_file_path = r'\\network\Team\MT\Company\Campaign3'

# config preferred partial file name
camp3_partial_file_name = 'Campaign3_2024'

# config preferred duplicate final file name
final_camp3_path = os.path.join(camp3_file_path, 'Campaign3_.csv')

# change diretory of file path
os.chdir(camp3_file_path)

# list files located in folder
# print('Files in folder prior to copying file:')
# print(os.listdir(camp3_file_path))

# locate files that match with partial name
camp3_matching_files = [file for file in os.listdir(camp3_file_path)
                  if camp3_partial_file_name in file]

# use original file name and remove string element from list
camp3_original_file_name = ''
for i in camp3_matching_files:
    camp3_original_file_name += i

if camp3_matching_files:
    # pull first matching file
    camp3_src_name = os.path.join(camp3_file_path, camp3_matching_files[0])

    # original file path
    camp3_txt_path = os.path.join(camp3_file_path, camp3_original_file_name)

    # copy file to specific folder
    camp3_duplicate_file = shutil.copy(camp3_src_name, final_camp3_path)

    # determine the file path for the converted .csv file
    camp3_csv_path = os.path.join(camp3_file_path, 'Campaign3_.csv')

    # # convert .txt to .csv file
    # with open(camp3_txt_path, 'r') as txt_file:
    #     with open(camp3_csv_path, 'w') as csv_file:
    #         for line in txt_file:

    #             csv_file.write(line.replace('|', ','))

    print(f'\n\n{camp3_src_name} was converted to the {final_camp3_path} file.')

else:
    print(f'No file found with partial name {camp3_partial_file_name}')

# reconfigure dataset to DataFrame
camp3_df = pd.DataFrame()


# specify data types for columns
camp3_dtype_dict = {'Campaign ID': str}
camp3_df = pd.read_csv(final_camp3_path, sep='|', dtype=camp3_dtype_dict)
camp3_df = camp3_df.rename(columns={'Campaign ID':'CampID', 'User ID':'ID', 'Outreach Consent':'SMS YN', 'Customer Mobile Phone':'Customer Cell', 'Customer Email':'E-mail'})

# convert BWH_MRN column to string to preserve leading zeros
camp3_df['Campaign ID'] = camp3_df['Campaign ID'].astype('str')

# output DataFrame to .csv
camp3_df.to_csv(final_camp3_path, index=False)



morningFiles = [final_camp1_path, final_camp2_path, final_camp3_path]

# creates connection to Outlook app
olApp = win32.Dispatch('Outlook.application')
# olNS = olApp.GetNameSpace('MAPI')

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
                            <p>Updated were completed by: {morningFiles}</p>
                            <p>These are the names of the files that were created:</p>
                            <ol>
                            {''.join(f"<li>{file}</li>" for file in morningFiles)}
                            </ol>
                        </BODY>
                        </HTML>
                    """

# mailItem.Body = 'Email marks completion of email outreach test'

# outlines the recipients of the email
mailItem.To = 'coworker@company.org'

# outlines the sendor email
mailItem.SentOnBehalfOfName = 'self@company.org'

# displays email template
# mailItem.Display()

# saves email template
# mailItem.Save()

# sends email template to recipient list
mailItem.Send()
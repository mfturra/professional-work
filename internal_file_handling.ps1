# Set file directory 
$dir = '\\network\Team\MT\Company\CampaignMain'

$archivedDir = '\\network\Team\MT\Company\CampaignMain\Archive'

# Pull all file names for files being dropped in file directory
$files = Get-ChildItem $dir -Filter *.txt

# Look for specific files
foreach ($file in $files){
	Write-Host "File names are loading" -ForegroundColor Green
	
	# Record filename dismissing original extension
	$filename = $file.basename
	Write-Output $filename
	
	# Create new filename with .csv extension
	$newFilename = $filename + ".csv"
	
	# Create new path for $newFilename
	$newFilePath = Join-Path -Path $dir -ChildPath $newFilename
	
	# Copy original file to $newFileName and path
	Copy-Item -Path $file.FullName -Destination $newFilePath
	
	# Move .txt file to archived folder
	Move-Item -Path $file -Destination $archivedDir
	
	# Output name of new file
	Write-Output "New file was created" -ForegroundColor Green
    Write-Output $newFIlename

}

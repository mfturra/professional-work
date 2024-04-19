# Set file directory 
$dataDir =      '\\network\Team\MT\Company\CampaignMain'
$scriptDir = 	'\\network\Team\MT\Company\CampaignMain\Scripts'
$archiveDir =  '\\network\Team\MT\Company\CampaignMain\Archive'

# Pull all file names for files being dropped in file directory
$files = Get-ChildItem $dataDir -Filter *.txt

# Look for specific files
foreach ($file in $files){
	if (Test-Path $file.FullName -PathType Leaf){
		# Inform user of processing taking place
		Write-Host "File names are loading" -ForegroundColor Green
		
		# Record filename dismissing original extension
		$filename = $file.basename

		# Check if name matches
		if ($filename -match '^(Campaign)_(\d+)$'){
			$newFilename = $matches[1] + "_orders"
		}
		
		elseif ($filename -match '^(Campaign_projections)_(\d+)$'){
			$newFileName = $matches[1]
		}
		
		elseif ($filename -match '^(Campaign_output)_(\d+)$'){
			$newFilename = "Campaign_outreaches"
		}
		
		else {
			Write-Host "Filename does not match any specified pattern: $filename" -ForegroundColor Yellow
			continue # Skip to next file if file match not found
		}
			
		# Create new filename with .csv extension
		$newFilename += ".csv"
		
		# Create new path for $newFilename
		$newFilePath = Join-Path -Path $dataDir -ChildPath $newFilename
		
		# Copy original file to $newFileName and path
		Copy-Item -Path $file.FullName -Destination $newFilePath
		
		# Move .txt file to archived folder
		Move-Item -Path $file -Destination $archiveDir
		
		# Output name of new file
		Write-Host "New file was created:" $newFilename -ForegroundColor Green
		# Write-Host $newFIlename
	}
}
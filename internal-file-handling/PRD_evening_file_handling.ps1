# Set file directory
$dataDir =          '\\network\Team\MT\Company\CampaignMain'

# Set file destination folders  
$outreach4Dir = 	'\\network\Team\MT\Company\CampaignMain\Campaign4'  
$outreach5Dir = 	'\\network\Team\MT\Company\CampaignMain\Campaign3'
$outreach6Dir = 	'\\network\Team\MT\Company\CampaignMain\Campaign3'

# Pull all file names for files being dropped in file directory
$files = Get-ChildItem $dataDir -Filter *.csv

# Look for specific files
foreach ($file in $files){
	if (Test-Path $file.FullName -PathType Leaf){
		# Inform user of processing taking place
		Write-Host "File names are loading" -ForegroundColor Green
		
		# Record filename dismissing original extension
		$filename = $file.basename

		# Check if name matches
		if ($filename -match '^(Campaign_Final)_(\d+)_(\d+)$'){
			# Create new filename with .csv extension
			$newFilename = "Campaign4_site"
			$newFilename += ".csv"
			$newFilePath = Join-Path -Path $dataDir -ChildPath $newFilename

			# Establish oldFilePath to original file
			$oldFilePath = Join-Path -Path $outreach4Dir -ChildPath $file.name
		}
		
		elseif ($filename -match '^(Campaigns_FINAL)_(\d+)_(\d+)$'){
            # Create new filename with .csv extension
			$newFileName = "Campaign5_site"
            $newFilename += ".csv"
			$newFilePath = Join-Path -Path $dataDir -ChildPath $newFilename
			
			# Establish oldFilePath to original file
			$oldFilePath = Join-Path -Path $outreach5Dir -ChildPath $file.name
		}
		
		elseif ($filename -match '^(Site_Campaign6)_(\d+)$'){
			# Create new filename with .csv extension
			$newFilename = "Campaign6_site"
			$newFilename += ".csv"
			$newFilePath = Join-Path -Path $dataDir -ChildPath $newFilename
			
			# Establish oldFilePath to original file
			$oldFilePath = Join-Path -Path $outreach6Dir -ChildPath $file.name
		}
		
		else {
			Write-Host "Filename does not match any specified pattern: $filename" -ForegroundColor Yellow
			continue # Skip to next file if file match not found
		}
			
		# Copy original file to $newFileName and path
		Copy-Item -Path $file.FullName -Destination $newFilePath
		
		# Move .txt file to archived folder
		Move-Item -Path $file.FullName -Destination $oldFilePath
		
		# Output name of new file
		Write-Host "New file was created:" $newFilename -ForegroundColor Green
	}
}
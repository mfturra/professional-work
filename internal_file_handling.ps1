# Set file directory 
$dataDir =      '\\network\Team\MT\Company\CampaignMain'
$scriptDir = 	'\\network\Team\MT\Company\CampaignMain\Scripts'

# Set file destination folders  
$outreach1Dir = 	'\\network\Team\MT\Company\CampaignMain\Campaign1'  
$outreach2Dir = 	'\\network\Team\MT\Company\CampaignMain\Campaign1'
$outreach3Dir = 	'\\network\Team\MT\Company\CampaignMain\Campaign3'

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

			# Create new filename with .csv extension
			$newFilename += ".csv"
			$newFilePath = Join-Path -Path (Get-Location) -ChildPath $newFilename
			
			# Establish oldFilePath to original file
			$oldFilePath = Join-Path -Path $outreach1Dir -ChildPath $file.name
		}
		
		elseif ($filename -match '^(Campaign_projections)_(\d+)$'){
			$newFileName = $matches[1]

						# Create new filename with .csv extension
			$newFilename += ".csv"
			$newFilePath = Join-Path -Path (Get-Location) -ChildPath $newFilename
			
			# Establish oldFilePath to original file
			$oldFilePath = Join-Path -Path $outreach2Dir -ChildPath $file.name
		}
		
		elseif ($filename -match '^(Campaign_output)_(\d+)$'){
			$newFilename = "Campaign_outreaches"
			
			# Create new filename with .csv extension
			$newFilename += ".csv"
			$newFilePath = Join-Path -Path (Get-Location) -ChildPath $newFilename
			
			# Establish oldFilePath to original file
			$oldFilePath = Join-Path -Path $outreach3Dir -ChildPath $file.name
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
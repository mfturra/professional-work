# Set file directory for data set
$dataDir = 	'\\company\e$\firstname'

# Pull all file names for files being dropped in file directory
$files = Get-ChildItem $dataDir -Filter *.txt

# Look for specific files
foreach ($file in $files){
	if (Test-Path $file.FullName -PathType Leaf){
		# Inform user of processing taking place
		# Write-Host "File names are loading" -ForegroundColor Green
		
		# Record filename dismissing original extension
		$filename = $file.basename

		# Check if name matches
		if ($filename -match '^(Campaign)_(\d+)$'){
			$newFilename = $matches[1] + "_orders"
			
			# Create new filename with .csv extension
			$newFilename += ".csv"
			$newFilePath = Join-Path -Path $dataDir -ChildPath $newFilename
			
			# Establish oldFilePath to original file
			# $oldFilePath = Join-Path -Path $camp4OrdersDir -ChildPath $file.name
		}
		
		elseif ($filename -match '^(Campaigns_FINAL)_(\d+)_(\d+)$'){
			$newFileName = $matches[1] + ".txt"
			
			# Create new filename with .txt extension
			# $newFilename += ".txt"
			$newFilePath = Join-Path -Path $dataDir -ChildPath $newFilename
			
			# Establish oldFilePath to original file
			# $oldFilePath = Join-Path -Path $camp5OrdersDir -ChildPath $file.name
		}
		
		elseif ($filename -match '^(Site_Campaign6)_(\d+)$'){
			# Create new filename with .txt extension
			$newFilename = "Campaign6_site"
			$newFilename += ".txt"
			$newFilePath = Join-Path -Path $dataDir -ChildPath $newFilename
			
			# Establish oldFilePath to original file
			# $oldFilePath = Join-Path -Path $camp6OrdersDir -ChildPath $file.name
		}
		
		else {
			Write-Host "Filename does not match any specified pattern: $filename" -ForegroundColor Yellow
			continue # Skip to next file if file match not found
		}
					
		# Copy original file to $newFileName and path
		Copy-Item -Path $file.FullName -Destination $newFilePath

	}
}

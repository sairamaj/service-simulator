<#
.SYNOPSIS
    Creates a mongo db for simulator to use.
.DESCRIPTION
    Simulator can be used with mongodb and this script creates one.
.INPUTS
    ResourceGroup       - Azure resource group (creates one if one does not exist).
    Name                - This is name of the new mongodb account.
.EXAMPLE
    .\New-MongoDb.ps1 -ResourceGroup simulator -ContainerName testhost
#>

param(
    [parameter(Mandatory = $true)]
    $ResourceGroup,
    [parameter(Mandatory = $true)]
    $Name        
)

Import-Module '.\Simulator-Module.psm1'
$Location = 'eastus'

Login

<# Check resource group and create if one does not exist.#>
if ( (Test-ResourceGroup -Name $ResourceGroup -Location $Location) -eq $false) {
    Write-Warning "$ResourceGroup does not exists, creating new one."
    $newGroup = New-AzureRmResourceGroup -Name $ResourceGroup -Location $Location
    Write-Host "Created successfully $newGroup"
}

<# Check whether already exists.#>
if ( Test-Mongodb -ResourceGroup $ResourceGroup -Name $Name ) {
    Write-Warning "$Name already exists."
    return
}

Write-Host "Adding $Name"

# Write and read locations and priorities for the database
$locations = @(@{"locationName" = $Location; 
        "failoverPriority" = 0
    })

# Consistency policy
$consistencyPolicy = @{"defaultConsistencyLevel" = "BoundedStaleness";
    "maxIntervalInSeconds" = "10"; 
    "maxStalenessPrefix" = "200"
}

# DB properties
$DBProperties = @{"databaseAccountOfferType" = "Standard"; 
    "locations" = $locations; 
    "consistencyPolicy" = $consistencyPolicy; 
}

# Create the database
New-AzureRmResource -ResourceType "Microsoft.DocumentDb/databaseAccounts" `
    -ApiVersion "2015-04-08" `
    -ResourceGroupName $ResourceGroup `
    -Location $Location `
    -Name $Name `
    -PropertyObject $DBProperties `
    -Kind "MongoDB"  `
    -ErrorAction Stop `
    -Force
Write-Host "$Name has been added successfully." -ForegroundColor Green


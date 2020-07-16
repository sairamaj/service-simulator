Function Test-ResourceGroup {
    param( 
        [parameter(Mandatory = $true)]
        $Name,
        [parameter(Mandatory = $true)]
        $Location
    )

    try {
        Get-AzResourceGroup -Name $Name -Location $Location -ErrorAction Stop
        $true    
    }
    catch {
        $false
    }
}


Function Test-Mongodb {
    param(
        [parameter(Mandatory = $true)]
        $ResourceGroup,
        [parameter(Mandatory = $true)]
        $Name        
    )

    $null -ne (Get-AzResource -ResourceType "Microsoft.DocumentDb/databaseAccounts" -ResourceGroupName $ResourceGroup  -Name $Name -ErrorAction SilentlyContinue)
}

Function Get-MongoDbConnection {
    param(
        [parameter(Mandatory = $true)]
        $ResourceGroup,
        [parameter(Mandatory = $true)]
        $Name        
    ) 
    $result = Invoke-AzResourceAction -Action listConnectionStrings `
        -ResourceType "Microsoft.DocumentDb/databaseAccounts" `
        -ResourceGroupName $ResourceGroup `
        -Name $Name `
        -Force 

    $result[0].connectionStrings.connectionString
}

<#
    Adds database name to connection string. Azure connection string comes with options and we need
    to insert database before options
    Input: something/?ssl=true 
    Output: something/database?ssl=true
#>
Function Add-DatabaseNameToMonDbConnectionString {
    param(
        [parameter(Mandatory = $true)]
        $ConnectionString,
        [parameter(Mandatory = $true)]
        $Database        
    )

    $parts = $ConnectionString.split('?')
    $conString = $parts[0]
    $conString += $Database
    if ($parts.length -gt 1) {
        $conString += '?'
        $conString += $parts[1]
    }
    $conString
} 

Function Test-ContainerRegistry {
    param(
        [parameter(Mandatory = $true)]
        $ResourceGroup,
        [parameter(Mandatory = $true)]
        $Name        
    )
    try {
        Get-AzContainerRegistry -ResourceGroupName $ResourceGroup -Name $Name -ErrorAction Stop
        $true
    }
    catch {
        $false
    }
}

Function Test-ValutExists {
    param(
        [parameter(Mandatory = $true)]
        $Name 
    )

    $valut = Get-AzKeyVault -VaultName $Name
    if ( $null -eq $valut) {
        $false
    }
    else {
        $true
    }
}


Function Login {
    $needLogin = $true
    Try {
        $content = Get-AzContext
        if ($content) {
            $needLogin = ([string]::IsNullOrEmpty($content.Account))
        } 
    } 
    Catch {
        if ($_ -like "*Login-AzAccount to login*") {
            $needLogin = $true
        } 
        else {
            throw
        }
    }

    if ($needLogin) {
        Login-AzAccount
    }
}

Function Test-Container {
    param(
        [parameter(Mandatory = $true)]
        $ResourceGroupName,
        [parameter(Mandatory = $true)]
        $Name
    )
    try {
        Get-AzContainerGroup -ResourceGroupName $ResourceGroupName -Name $Name -ErrorAction Stop | Out-Null
        $true
    }
    catch {
        $false
    }
}

Function Test-SimulatorHost {
    param(
        [parameter(Mandatory = $true)]
        $Host
    )
    $servicesGetUrl = "http://$Host/api/v1/admin/services"
    Write-Host "Invoking: $servicesGetUrl"
    $result = Invoke-RestMethod $servicesGetUrl -TimeoutSec 10
    Write-Host $result
}

Function Show-Logs {
    param(
        [parameter(Mandatory = $true)]
        $ResourceGroup,
        [parameter(Mandatory = $true)]
        $ContainerName
    )
    Write-Host "`t---------------------------------------------"
    $logs = Get-AzContainerInstanceLog -ResourceGroupName $ResourceGroup -ContainerGroupName $ContainerName 
    Write-Host ($logs -split '\n' |  ForEach-Object { "`t" + $_ + "`n"}) -ForegroundColor DarkCyan
    Write-Host "`t-------------------------------------------"
}
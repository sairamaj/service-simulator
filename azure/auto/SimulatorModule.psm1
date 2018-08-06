Function Test-ResourceGroup {
    param( 
        [parameter(Mandatory = $true)]
        $Name,
        [parameter(Mandatory = $true)]
        $Location
    )

    try {
        Get-AzureRmResourceGroup -Name $Name -Location $Location -ErrorAction Stop
        $true    
    }
    catch {
        $false
    }
}

Function Test-ContainerRegistry {
    param(
        [parameter(Mandatory = $true)]
        $ResourceGroup,
        [parameter(Mandatory = $true)]
        $Name        
    )
    try {
        Get-AzureRmContainerRegistry -ResourceGroupName $ResourceGroup -Name $Name -ErrorAction Stop
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

    $valut = Get-AzureRmKeyVault -VaultName $Name
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
        $content = Get-AzureRmContext
        if ($content) {
            $needLogin = ([string]::IsNullOrEmpty($content.Account))
        } 
    } 
    Catch {
        if ($_ -like "*Login-AzureRmAccount to login*") {
            $needLogin = $true
        } 
        else {
            throw
        }
    }

    if ($needLogin) {
        Login-AzureRmAccount
    }
}


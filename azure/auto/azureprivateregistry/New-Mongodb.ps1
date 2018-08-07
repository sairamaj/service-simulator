    param(
        [parameter(Mandatory = $true)]
        $ResourceGroup,
        [parameter(Mandatory = $true)]
        $Location,
        [parameter(Mandatory = $true)]
        $Name        
    )

    
    $resource = Get-AzureRmResource -ResourceType Microsoft.DocumentDb/databaseAccounts -Name $Name
    if( $null -ne $resource){
        Write-Warning "$Name already exists."
        return
    }

    Write-Host "Adding $Name"
    return
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
        -Force

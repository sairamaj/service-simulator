param(
    [parameter(Mandatory = $true)]
    $ResourceGroup,
    [parameter(Mandatory = $true)]
    $MongoDbAccountName
)
Import-Module '.\Simulator-Module.psm1'
Login

$MongoDatabaseName  = 'simulator'
# Get connection string
$connectionStringWithoutDb = Get-MongoDbConnection -ResourceGroup $ResourceGroup -Name $MongoDbAccountName
# Add database name
Add-DatabaseNameToMonDbConnectionString -ConnectionString $connectionStringWithoutDb -Database $MongoDatabaseName

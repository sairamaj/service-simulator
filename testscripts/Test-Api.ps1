param(
    [parameter(Mandatory=$true)]
    $Service,
    $Request
)

$Uri = "http://localhost:3000/api/v1/admin/services/$($Service)/test"
Invoke-WebRequest -Uri $Uri -Method Post -Body $Request

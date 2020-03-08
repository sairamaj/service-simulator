param(
    [parameter(Mandatory=$true)]
    $Service,
    $Request
)

$Uri = "http://localhost:3000/$($Service)"
Invoke-WebRequest -Uri $Uri -Method Post -Body $Request -ContentType 'application/json'

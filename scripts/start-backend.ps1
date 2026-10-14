# Starts the Spring Boot backend in DEV mode. Asks for secrets safely (nothing is saved to disk).
# Usage (PowerShell, from project root):  .\scripts\start-backend.ps1
$ErrorActionPreference = "Stop"

function Read-Secret($prompt) {
  $s = Read-Host $prompt -AsSecureString
  return [Runtime.InteropServices.Marshal]::PtrToStringAuto([Runtime.InteropServices.Marshal]::SecureStringToBSTR($s))
}

if (-not $env:DATABASE_PASSWORD)    { $env:DATABASE_PASSWORD    = Read-Secret "Local database password" }
if (-not $env:RAZORPAY_API_KEY)     { $env:RAZORPAY_API_KEY     = Read-Host "Razorpay TEST Key Id (starts with rzp_test_)" }
if (-not $env:RAZORPAY_KEY_SECRET)  { $env:RAZORPAY_KEY_SECRET  = Read-Secret "Razorpay TEST Key Secret" }

if ($env:RAZORPAY_API_KEY -like "rzp_live_*") {
  Write-Host "WARNING: LIVE MODE - real payments may be charged." -ForegroundColor Yellow
  $confirm = Read-Host "Type LIVE to continue"
  if ($confirm -cne "LIVE") {
    Write-Host "Cancelled."
    exit 1
  }
}
elseif ($env:RAZORPAY_API_KEY -notlike "rzp_test_*") {
  Write-Host "Invalid Razorpay Key ID."
  exit 1
}

$env:SPRING_PROFILES_ACTIVE = "dev"
Set-Location "$PSScriptRoot\..\backend"
.\mvnw.cmd spring-boot:run

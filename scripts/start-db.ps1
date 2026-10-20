# Starts a local PostgreSQL in Docker (OPTION A). Skip this if you installed PostgreSQL yourself (OPTION B).
# Usage (PowerShell, from project root):  .\scripts\start-db.ps1
$ErrorActionPreference = "Stop"
if (-not (Get-Command docker -ErrorAction SilentlyContinue)) {
  Write-Host "Docker is not installed. Use OPTION B in PAYMENT_SETUP.md (install PostgreSQL directly)." -ForegroundColor Yellow
  exit 1
}
$sec = Read-Host "Choose a password for the LOCAL database (you will type it again when starting the backend)" -AsSecureString
$pw  = [Runtime.InteropServices.Marshal]::PtrToStringAuto([Runtime.InteropServices.Marshal]::SecureStringToBSTR($sec))
if (docker ps -a --format "{{.Names}}" | Where-Object { $_ -eq "rote2real-db" }) {
    docker rm -f rote2real-db
}
docker run -d --name rote2real-db -e POSTGRES_PASSWORD=$pw -e POSTGRES_DB=rote2real -p 5432:5432 -v rote2real-data:/var/lib/postgresql/data postgres:16
Write-Host "Database starting on localhost:5432 (db: rote2real, user: postgres)." -ForegroundColor Green

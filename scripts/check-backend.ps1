# Confirms the backend is really listening on port 8080.
$r = Test-NetConnection -ComputerName localhost -Port 8080 -WarningAction SilentlyContinue
if ($r.TcpTestSucceeded) {
  Write-Host "OK: backend is listening on 8080" -ForegroundColor Green
  try { (Invoke-WebRequest -UseBasicParsing "http://localhost:8080/api/public/rote2real/exercises").StatusCode } catch { $_.Exception.Message }
} else { Write-Host "NOT running on 8080 - check the backend terminal for errors." -ForegroundColor Red }

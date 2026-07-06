param([string]$AppPath = "")

$ErrorActionPreference = "Stop"

if (-not $AppPath) {
  $candidates = @(
    "$env:LOCALAPPDATA\Programs\chats",
    "${env:ProgramFiles}\Yandex\Yandex Messenger",
    "${env:ProgramFiles(x86)}\Yandex\Yandex Messenger"
  )
  foreach ($p in $candidates) {
    if (Test-Path "$p\resources\app.asar.backup") { $AppPath = $p; break }
  }
}

if (-not $AppPath -or -not (Test-Path "$AppPath\resources\app.asar.backup")) {
  Write-Host "ERROR: app.asar.backup not found. Reinstall Yandex Messenger to restore." -ForegroundColor Red
  exit 1
}

Copy-Item -Path "$AppPath\resources\app.asar.backup" -Destination "$AppPath\resources\app.asar" -Force
Write-Host "Original app.asar restored. Backup kept as app.asar.backup" -ForegroundColor Green
Write-Host "Restart Yandex Messenger to complete uninstall." -ForegroundColor Cyan

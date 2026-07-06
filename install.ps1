param(
  [string]$AppPath = "",
  [string]$AsarTool = ""
)

$ErrorActionPreference = "Stop"

function Write-Step($msg) { Write-Host ">>> $msg" -ForegroundColor Cyan }
function Write-Ok($msg) { Write-Host "  OK: $msg" -ForegroundColor Green }
function Write-Err($msg) { Write-Host "  ERROR: $msg" -ForegroundColor Red }

# Detect app path
if (-not $AppPath) {
  $candidates = @(
    "$env:LOCALAPPDATA\Programs\chats",
    "${env:ProgramFiles}\Yandex\Yandex Messenger",
    "${env:ProgramFiles(x86)}\Yandex\Yandex Messenger"
  )
  foreach ($p in $candidates) {
    if (Test-Path "$p\resources\app.asar") { $AppPath = $p; break }
  }
}
if (-not $AppPath -or -not (Test-Path "$AppPath\resources\app.asar")) {
  Write-Err "Yandex Messenger not found. Specify path: .\install.ps1 -AppPath `"C:\path\to\messenger`""
  exit 1
}
Write-Ok "Found Yandex Messenger at: $AppPath"

# Find asar tool
if (-not $AsarTool) {
  try { $AsarTool = (Get-Command npx -ErrorAction Stop).Source } catch {}
}
if (-not $AsarTool) {
  $npmPath = (Get-Command npm -ErrorAction SilentlyContinue).Source
  if ($npmPath) { $AsarTool = Join-Path (Split-Path $npmPath -Parent) "npx" }
}
if (-not $AsarTool -or -not (Test-Path $AsarTool)) {
  Write-Err "Node.js/npx not found. Install Node.js first: https://nodejs.org/"
  exit 1
}
Write-Ok "Using: $AsarTool"

$asarFile = "$AppPath\resources\app.asar"
$backupFile = "$AppPath\resources\app.asar.backup"
$extractDir = "$AppPath\resources\app.asar.extracted"
$patchDir = Split-Path -Parent $MyInvocation.MyCommand.Path

# Step 1: Backup
Write-Step "Backing up original app.asar..."
if (-not (Test-Path $backupFile)) {
  Copy-Item -LiteralPath $asarFile -Destination $backupFile -Force
  Write-Ok "Backup saved: app.asar.backup"
} else {
  Write-Ok "Backup already exists, skipping"
}

# Step 2: Extract
Write-Step "Extracting app.asar..."
if (Test-Path $extractDir) { Remove-Item -LiteralPath $extractDir -Recurse -Force }
& npx asar extract $asarFile $extractDir 2>&1 | Out-Null
if ($LASTEXITCODE -ne 0) { Write-Err "Extract failed"; exit 1 }
Write-Ok "Extracted to: $extractDir"

# Step 3: Copy patch files
Write-Step "Copying patch files..."
$targetDir = "$extractDir\static\www"
Copy-Item -Path "$patchDir\patch\static\www\green-theme.css" -Destination $targetDir -Force
Copy-Item -Path "$patchDir\patch\static\www\theme-editor.js" -Destination $targetDir -Force
Write-Ok "Copied: green-theme.css, theme-editor.js"

# Step 4: Modify index.html
Write-Step "Patching index.html..."
$htmlPath = "$extractDir\static\www\index.html"
$html = Get-Content -Path $htmlPath -Raw -Encoding UTF8

$search1 = 'href="app.css" rel="stylesheet"'
$replace1 = 'href="app.css" rel="stylesheet"><link href="green-theme.css" rel="stylesheet"'
if ($html -match [regex]::Escape($search1)) {
  $html = $html -replace [regex]::Escape($search1), $replace1
  Write-Ok "Added green-theme.css link"
} else {
  Write-Err "Could not find app.css reference in index.html"
  exit 1
}

$html = $html -replace [regex]::Escape('</head>'), '<script defer="defer" src="theme-editor.js"></script></head>'
Write-Ok "Added theme-editor.js script"

Set-Content -Path $htmlPath -Value $html -Encoding UTF8 -NoNewline
Write-Ok "index.html patched"

# Step 5: Repack
Write-Step "Repacking app.asar..."
Remove-Item -LiteralPath $asarFile -Force -ErrorAction SilentlyContinue
& npx asar pack $extractDir $asarFile 2>&1 | Out-Null
if ($LASTEXITCODE -ne 0) { Write-Err "Repack failed"; exit 1 }
Write-Ok "app.asar repacked successfully!"

Write-Step ""
Write-Step "Theme patch installed! Restart Yandex Messenger to see changes."
Write-Step "Click the gear icon (bottom-left) to open the Theme Editor."

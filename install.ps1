param(
  [string]$InstallDir = "$env:USERPROFILE\.codex\game-ai-os",
  [string]$SkillsDir = "$env:USERPROFILE\.codex\skills",
  [string]$Branch = "main"
)

$ErrorActionPreference = "Stop"
$RepoUrl = "https://github.com/eliyah1111/game-ai-os.git"
$ZipUrl = "https://github.com/eliyah1111/game-ai-os/archive/refs/heads/$Branch.zip"

function Write-Step {
  param([string]$Message)
  Write-Host "==> $Message" -ForegroundColor Cyan
}

function Test-Command {
  param([string]$Name)
  return $null -ne (Get-Command $Name -ErrorAction SilentlyContinue)
}

Write-Step "Installing Game AI OS"
New-Item -ItemType Directory -Force -Path (Split-Path $InstallDir -Parent) | Out-Null
New-Item -ItemType Directory -Force -Path $SkillsDir | Out-Null

if ((Test-Path $InstallDir) -and (Test-Path (Join-Path $InstallDir ".git"))) {
  Write-Step "Updating existing checkout at $InstallDir"
  git -C $InstallDir fetch origin $Branch
  git -C $InstallDir checkout $Branch
  git -C $InstallDir pull --ff-only origin $Branch
} elseif (Test-Path $InstallDir) {
  $existingItems = Get-ChildItem -Force -Path $InstallDir
  if ($existingItems.Count -gt 0) {
    throw "Install directory already exists and is not an empty Git checkout: $InstallDir"
  }
} 

if (-not (Test-Path $InstallDir) -or -not (Test-Path (Join-Path $InstallDir "package.json"))) {
  if (Test-Command "git") {
    Write-Step "Cloning repository"
    git clone --branch $Branch $RepoUrl $InstallDir
  } else {
    Write-Step "Git not found; downloading zip archive"
    $tempRoot = Join-Path ([System.IO.Path]::GetTempPath()) ("game-ai-os-" + [System.Guid]::NewGuid().ToString("N"))
    $zipPath = "$tempRoot.zip"
    Invoke-WebRequest -Uri $ZipUrl -OutFile $zipPath
    Expand-Archive -LiteralPath $zipPath -DestinationPath $tempRoot -Force
    $expanded = Get-ChildItem -Directory -Path $tempRoot | Select-Object -First 1
    New-Item -ItemType Directory -Force -Path $InstallDir | Out-Null
    Copy-Item -Recurse -Force -Path (Join-Path $expanded.FullName "*") -Destination $InstallDir
    Remove-Item -Recurse -Force -LiteralPath $tempRoot
    Remove-Item -Force -LiteralPath $zipPath
  }
}

if (Test-Command "npm") {
  Write-Step "Installing Node dependencies"
  npm --prefix $InstallDir install
  Write-Step "Building TypeScript tools"
  npm --prefix $InstallDir run build
} else {
  Write-Warning "npm was not found. Skills were installed, but local processor CLI tools need Node.js/npm."
}

Write-Step "Copying skills into $SkillsDir"
Copy-Item -Recurse -Force -Path (Join-Path $InstallDir "skills\*") -Destination $SkillsDir

Write-Step "Game AI OS installed"
Write-Host ""
Write-Host "Installed project: $InstallDir"
Write-Host "Installed skills:  $SkillsDir"
Write-Host ""
Write-Host "Restart Codex so the new skills load cleanly."
Write-Host "Commands: `$SPRITE_GEN, `$UI_GEN, `$OBJECT_GEN, `$BACKGROUND_GEN, `$VFX_GEN"

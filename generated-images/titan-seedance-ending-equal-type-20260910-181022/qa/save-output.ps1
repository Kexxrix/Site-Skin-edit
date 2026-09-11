param([Parameter(Mandatory=$true)][string]$SourcePath, [Parameter(Mandatory=$true)][string]$FileName)
$ErrorActionPreference = 'Stop'
$runRoot = [IO.Path]::GetFullPath((Join-Path $PSScriptRoot '..'))
$destRoot = [IO.Path]::GetFullPath((Join-Path $runRoot 'results'))
$sourceFull = (Resolve-Path -LiteralPath $SourcePath).Path
$destFull = [IO.Path]::GetFullPath((Join-Path $destRoot $FileName))
if (!$destFull.StartsWith($destRoot + [IO.Path]::DirectorySeparatorChar, [StringComparison]::OrdinalIgnoreCase)) { throw 'Destination outside run results' }
if (Test-Path -LiteralPath $destFull) { throw 'Destination already exists' }
if (!$sourceFull.StartsWith('C:\Users\User\.codex\generated_images\', [StringComparison]::OrdinalIgnoreCase)) { throw 'Source outside builtin generation directory' }
$before = (Get-FileHash -LiteralPath $sourceFull -Algorithm SHA256).Hash
Move-Item -LiteralPath $sourceFull -Destination $destFull
$after = (Get-FileHash -LiteralPath $destFull -Algorithm SHA256).Hash
if ($before -ne $after) { throw 'Hash mismatch after move' }
Add-Type -AssemblyName System.Drawing
$bitmap = [Drawing.Image]::FromFile($destFull)
try {
  $record = [ordered]@{file=$FileName; generated_path=$sourceFull; final_path=$destFull; move='hash_verified'; sha256=$after; bytes=(Get-Item -LiteralPath $destFull).Length; width=$bitmap.Width; height=$bitmap.Height; aspect_ratio=($bitmap.Width/$bitmap.Height); ratio_16_9_rounding_pass=([Math]::Abs($bitmap.Width-($bitmap.Height*16/9)) -le 1); format=$bitmap.RawFormat.ToString()}
} finally { $bitmap.Dispose() }
$record | ConvertTo-Json -Compress | Add-Content -LiteralPath (Join-Path $PSScriptRoot 'saved-outputs.jsonl') -Encoding utf8
$record | ConvertTo-Json -Compress

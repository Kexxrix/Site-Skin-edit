param([Parameter(Mandatory=$true)][string]$SourcePath,[Parameter(Mandatory=$true)][string]$FileName)
$ErrorActionPreference = 'Stop'
$taskRoot = [IO.Path]::GetFullPath((Join-Path $PSScriptRoot '..'))
$projectRoot = [IO.Path]::GetFullPath('E:/codexwork/Site-Skin-edit/generated-images')
$sourceRoot = [IO.Path]::GetFullPath('C:/Users/User/.codex/generated_images')
$source = (Resolve-Path -LiteralPath $SourcePath).Path
$destination = [IO.Path]::GetFullPath((Join-Path (Join-Path $taskRoot 'results') $FileName))
if (-not $taskRoot.StartsWith($projectRoot + '\', [StringComparison]::OrdinalIgnoreCase)) { throw 'Run is outside project output root' }
if (-not $source.StartsWith($sourceRoot + '\', [StringComparison]::OrdinalIgnoreCase)) { throw 'Source is outside generated output root' }
if (-not $destination.StartsWith($taskRoot + '\results\', [StringComparison]::OrdinalIgnoreCase)) { throw 'Destination escapes results' }
if (Test-Path -LiteralPath $destination) { throw 'Destination exists; choose a new suffix' }
$before = (Get-FileHash -LiteralPath $source -Algorithm SHA256).Hash
Add-Type -AssemblyName System.Drawing
$img = [Drawing.Image]::FromFile($source)
try { $width = $img.Width; $height = $img.Height; $format = $img.RawFormat.Guid.ToString() } finally { $img.Dispose() }
if ($format -ne [Drawing.Imaging.ImageFormat]::Png.Guid.ToString()) { throw 'Source is not PNG' }
Move-Item -LiteralPath $source -Destination $destination
$after = (Get-FileHash -LiteralPath $destination -Algorithm SHA256).Hash
if ($before -ne $after) { throw 'Move hash mismatch' }
$readback = [Drawing.Image]::FromFile($destination)
try { if ($readback.Width -ne $width -or $readback.Height -ne $height) { throw 'Readback dimensions mismatch' } } finally { $readback.Dispose() }
$record = [ordered]@{file=$FileName;generated_path=$source;final_path=$destination;action='move';sha256=$after;bytes=(Get-Item -LiteralPath $destination).Length;format='PNG';width=$width;height=$height;aspect_ratio=($width / $height);target_ratio='75:32';ratio_rounding_pass=([Math]::Abs($width - $height * 75 / 32) -le 1);cropped=$false;resized=$false;user_accepted=$false;site_adopted=$false}
($record | ConvertTo-Json -Compress) | Add-Content -LiteralPath (Join-Path $PSScriptRoot 'saved-outputs.jsonl') -Encoding utf8
$record | ConvertTo-Json -Depth 5

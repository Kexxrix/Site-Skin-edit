param([Parameter(Mandatory=$true)][string]$Source,[Parameter(Mandatory=$true)][string]$Name)
$ErrorActionPreference = 'Stop'
$taskRoot = [IO.Path]::GetFullPath((Join-Path $PSScriptRoot '..'))
$taskDestination = [IO.Path]::GetFullPath((Join-Path (Join-Path $taskRoot 'results') $Name))
if (-not $taskDestination.StartsWith($taskRoot + '\',[StringComparison]::OrdinalIgnoreCase)) { throw 'Destination outside this run' }
if (Test-Path -LiteralPath $taskDestination) { throw 'Output collision' }
if (-not (Test-Path -LiteralPath $Source -PathType Leaf)) { throw 'Source missing' }
$taskHash = (Get-FileHash -LiteralPath $Source -Algorithm SHA256).Hash
Move-Item -LiteralPath $Source -Destination $taskDestination -ErrorAction Stop
$taskFinalHash = (Get-FileHash -LiteralPath $taskDestination -Algorithm SHA256).Hash
if ($taskFinalHash -ne $taskHash) { throw 'SHA256 mismatch' }
$taskRecord = [ordered]@{source=$Source;path=$taskDestination;sha256=$taskFinalHash.ToLowerInvariant();bytes=(Get-Item -LiteralPath $taskDestination).Length;action='moved_this_generated_output_only';source_residue=(Test-Path -LiteralPath $Source)}
$taskRecord | ConvertTo-Json | Set-Content -LiteralPath (Join-Path $PSScriptRoot ($Name + '.json')) -Encoding utf8
$taskRecord | ConvertTo-Json

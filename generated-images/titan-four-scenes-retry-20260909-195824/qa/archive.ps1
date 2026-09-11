param(
    [Parameter(Mandatory=$true)][string]$Source,
    [Parameter(Mandatory=$true)][string]$Name
)
$ErrorActionPreference = 'Stop'
$taskWorkspace = [IO.Path]::GetFullPath('E:\codexwork\Site-Skin-edit')
$taskRoot = [IO.Path]::GetFullPath((Join-Path $PSScriptRoot '..'))
$taskResults = [IO.Path]::GetFullPath((Join-Path $taskRoot 'results'))
$taskPython = 'C:\Users\User\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe'
$taskVerifier = Join-Path $PSScriptRoot 'verify.py'
if (-not $taskRoot.StartsWith($taskWorkspace + '\', [StringComparison]::OrdinalIgnoreCase)) { throw 'Run outside intended workspace' }
if (-not $taskResults.StartsWith($taskRoot + '\', [StringComparison]::OrdinalIgnoreCase)) { throw 'Results outside this run' }
foreach ($taskDirectory in @($taskWorkspace, (Split-Path -Parent $taskRoot), $taskRoot, $taskResults, $PSScriptRoot)) {
    $taskDirectoryItem = Get-Item -LiteralPath $taskDirectory
    if (-not $taskDirectoryItem.PSIsContainer) { throw "Not a directory: $taskDirectory" }
    if ($taskDirectoryItem.Attributes -band [IO.FileAttributes]::ReparsePoint) { throw "Refusing redirected output directory: $taskDirectory" }
}
if ([IO.Path]::GetFileName($Name) -ne $Name -or $Name.IndexOfAny([IO.Path]::GetInvalidFileNameChars()) -ge 0) { throw 'Name must be one valid filename without directories' }
if ([IO.Path]::GetExtension($Name) -ine '.png') { throw 'Result filename must end in .png' }
if (-not (Test-Path -LiteralPath $Source -PathType Leaf)) { throw 'Source missing' }
$taskSource = [IO.Path]::GetFullPath((Resolve-Path -LiteralPath $Source).ProviderPath)
$taskSourceItem = Get-Item -LiteralPath $taskSource
if ($taskSourceItem.Attributes -band [IO.FileAttributes]::ReparsePoint) { throw 'Source must be a regular generated file' }
$taskCodexRoot = if ($env:CODEX_HOME) { $env:CODEX_HOME } else { Join-Path $env:USERPROFILE '.codex' }
$taskBuiltinRoot = [IO.Path]::GetFullPath((Join-Path $taskCodexRoot 'generated_images'))
if (-not $taskSource.StartsWith($taskBuiltinRoot + '\', [StringComparison]::OrdinalIgnoreCase)) { throw 'Source must be the explicitly supplied successful built-in output under CODEX_HOME/generated_images' }

$taskBeforeText = (& $taskPython -B -X utf8 $taskVerifier --inspect-image $taskSource | Out-String)
if ($LASTEXITCODE -ne 0) { throw 'Source PNG decode failed; source preserved' }
$taskBefore = $taskBeforeText | ConvertFrom-Json
$taskStem = [IO.Path]::GetFileNameWithoutExtension($Name)
$taskCandidate = $Name
$taskSuffix = 2
while ((Test-Path -LiteralPath (Join-Path $taskResults $taskCandidate)) -or (Test-Path -LiteralPath (Join-Path $PSScriptRoot ($taskCandidate + '.json')))) {
    $taskCandidate = '{0}-{1:D2}.png' -f $taskStem, $taskSuffix
    $taskSuffix++
}
$taskDestination = [IO.Path]::GetFullPath((Join-Path $taskResults $taskCandidate))
if (-not $taskDestination.StartsWith($taskResults + '\', [StringComparison]::OrdinalIgnoreCase)) { throw 'Destination outside run results' }
if (-not $taskDestination.StartsWith($taskWorkspace + '\', [StringComparison]::OrdinalIgnoreCase)) { throw 'Destination outside workspace' }
Move-Item -LiteralPath $taskSource -Destination $taskDestination -ErrorAction Stop
$taskAfterText = (& $taskPython -B -X utf8 $taskVerifier --inspect-image $taskDestination | Out-String)
if ($LASTEXITCODE -ne 0) { throw "Final PNG decode failed: $taskDestination" }
$taskAfter = $taskAfterText | ConvertFrom-Json
if ($taskAfter.sha256 -ne $taskBefore.sha256) { throw 'SHA256 mismatch after move' }
if (Test-Path -LiteralPath $taskSource) { throw 'Source remains after move' }
$taskRecord = [ordered]@{
    source = $taskSource
    path = $taskDestination
    requested_name = $Name
    final_name = $taskCandidate
    collision_suffix_used = ($taskCandidate -ne $Name)
    sha256 = $taskAfter.sha256
    source_sha256 = $taskBefore.sha256
    sha256_match = $true
    bytes = $taskAfter.bytes
    format = $taskAfter.format
    width = $taskAfter.width
    height = $taskAfter.height
    readable = $taskAfter.readable
    action = 'moved_this_explicitly_supplied_generated_output_only'
    source_absent = $true
    source_residue = $false
    recorded_at = [DateTime]::UtcNow.ToString('o')
}
$taskRecordPath = Join-Path $PSScriptRoot ($taskCandidate + '.json')
$taskJson = $taskRecord | ConvertTo-Json -Depth 5
$taskRecordStream = [IO.File]::Open($taskRecordPath, [IO.FileMode]::CreateNew, [IO.FileAccess]::Write, [IO.FileShare]::Read)
try {
    $taskRecordBytes = [Text.UTF8Encoding]::new($false).GetBytes($taskJson + [Environment]::NewLine)
    $taskRecordStream.Write($taskRecordBytes, 0, $taskRecordBytes.Length)
} finally { $taskRecordStream.Dispose() }
$taskJson

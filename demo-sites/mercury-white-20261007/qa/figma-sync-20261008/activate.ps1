$ErrorActionPreference = 'Stop'
$projectPath = 'E:\codexwork\Site-Skin-edit\demo-sites\mercury-white-20261007'
$appPath = Join-Path $projectPath 'site'
$qaPath = Join-Path $projectPath 'qa\figma-sync-20261008'
$stagePath = Join-Path $projectPath 'qa\button-polish-20261007-080224\build-site'
$oldDist = Join-Path $appPath 'dist'
$newDist = Join-Path $stagePath 'dist'
$retiredPath = Join-Path $qaPath 'runtime-before-figma-sync'
$retiredDist = Join-Path $retiredPath 'dist'

foreach ($checkedPath in @($oldDist, $newDist, $retiredPath, $retiredDist)) {
    $resolvedPath = [System.IO.Path]::GetFullPath($checkedPath)
    if (-not $resolvedPath.StartsWith($projectPath + '\', [StringComparison]::OrdinalIgnoreCase)) { throw ('Out-of-scope path: ' + $resolvedPath) }
}
if ((Test-Path -LiteralPath $retiredPath) -and @(Get-ChildItem -LiteralPath $retiredPath -Force).Count -ne 0) { throw 'Retired build destination is not empty' }
if (-not (Test-Path -LiteralPath $newDist -PathType Container)) { throw 'Verified new build is missing' }
$whiteListener = @(Get-NetTCPConnection -State Listen -LocalPort 5418)
if ($whiteListener.Count -ne 1 -or $whiteListener[0].OwningProcess -ne 18312) { throw 'White server identity changed' }
$whiteOldProcess = Get-CimInstance Win32_Process -Filter 'ProcessId=18312'
if ($whiteOldProcess.CommandLine -notlike ('*' + $appPath + '*')) { throw 'White process is not from the expected app' }
$editorListener = @(Get-NetTCPConnection -State Listen -LocalPort 5417)
if ($editorListener.Count -ne 1 -or $editorListener[0].OwningProcess -ne 35992) { throw 'Editor identity changed' }

$builtFiles = @(Get-ChildItem -LiteralPath $newDist -Recurse -File | ForEach-Object {
    [pscustomobject]@{ relative=$_.FullName.Substring($newDist.Length + 1); bytes=$_.Length; sha256=(Get-FileHash -LiteralPath $_.FullName -Algorithm SHA256).Hash.ToLowerInvariant() }
})
if ($builtFiles.Count -lt 200) { throw 'Build output is incomplete' }
New-Item -ItemType Directory -Path $retiredPath -Force | Out-Null
Stop-Process -Id 18312 -Force
Wait-Process -Id 18312 -Timeout 10 -ErrorAction SilentlyContinue
Move-Item -LiteralPath $oldDist -Destination $retiredDist
Copy-Item -LiteralPath $newDist -Destination $oldDist -Recurse
foreach ($builtFile in $builtFiles) {
    $copiedPath = Join-Path $oldDist $builtFile.relative
    if ((Get-FileHash -LiteralPath $copiedPath -Algorithm SHA256).Hash.ToLowerInvariant() -ne $builtFile.sha256) { throw ('Build copy mismatch: ' + $builtFile.relative) }
}
$cliPath = Join-Path $appPath 'node_modules\vinext\dist\cli.js'
$whiteNewProcess = Start-Process -FilePath 'C:\Program Files\nodejs\node.exe' -ArgumentList @(('"' + $cliPath + '"'), 'start', '--hostname', '127.0.0.1', '--port', '5418') -WorkingDirectory $appPath -WindowStyle Hidden -RedirectStandardOutput (Join-Path $qaPath 'server-stdout.log') -RedirectStandardError (Join-Path $qaPath 'server-stderr.log') -PassThru
$ready = $false
for ($attempt = 0; $attempt -lt 20; $attempt++) {
    Start-Sleep -Milliseconds 300
    try {
        $response = Invoke-WebRequest -Uri 'http://127.0.0.1:5418/' -TimeoutSec 2
        if ($response.StatusCode -eq 200) { $ready = $true; break }
    } catch {}
}
if (-not $ready) { throw 'New local server did not become ready' }
$finalWhite = @(Get-NetTCPConnection -State Listen -LocalPort 5418)
if ($finalWhite.Count -ne 1 -or $finalWhite[0].OwningProcess -ne $whiteNewProcess.Id) { throw 'New listener identity mismatch' }
if (@(Get-NetTCPConnection -State Listen -LocalPort 5417)[0].OwningProcess -ne 35992) { throw 'Original editor changed' }
$result = [ordered]@{
    checked_at_utc=[DateTime]::UtcNow.ToString('o')
    local_url='http://127.0.0.1:5418/'
    previous_pid=18312
    current_pid=$whiteNewProcess.Id
    editor_pid=35992
    http_status=$response.StatusCode
    build_files_verified=$builtFiles.Count
    retired_build=$retiredDist
    restart_count=1
    deployed=$false
    built_files=$builtFiles
}
$result | ConvertTo-Json -Depth 6 | Set-Content -LiteralPath (Join-Path $qaPath 'server-activation.json') -Encoding utf8
[pscustomobject]@{current_pid=$whiteNewProcess.Id; editor_pid=35992; http_status=$response.StatusCode; build_files_verified=$builtFiles.Count; retired_build=$retiredDist} | ConvertTo-Json



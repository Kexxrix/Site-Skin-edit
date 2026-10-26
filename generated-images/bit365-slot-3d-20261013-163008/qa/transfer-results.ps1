$ErrorActionPreference = 'Stop'
$slotJobs = @'
[{"id":"01-pragmatic-zeus","from":"C:\\Users\\User\\.codex\\generated_images\\01a12f2c-b7ff-70f0-a8bc-b8dc63caa00c\\exec-371aff23-1eeb-431b-a5a8-829e674e9c05.png","to":"E:\\codexwork\\Site-Skin-edit\\generated-images\\bit365-slot-3d-20261013-163008\\results\\01-pragmatic-zeus.png"},{"id":"02-pragmatic-starlight","from":"C:\\Users\\User\\.codex\\generated_images\\01a12f2c-b7ff-70f0-a8bc-b8dc63caa00c\\exec-6e6c8dce-07bb-4086-b893-cb724f7a0649.png","to":"E:\\codexwork\\Site-Skin-edit\\generated-images\\bit365-slot-3d-20261013-163008\\results\\02-pragmatic-starlight.png"},{"id":"03-yggdrasil-viking","from":"C:\\Users\\User\\.codex\\generated_images\\01a12f2c-b7ff-70f0-a8bc-b8dc63caa00c\\exec-3d19a65d-6c3e-4639-b0be-0827b2d51d8c.png","to":"E:\\codexwork\\Site-Skin-edit\\generated-images\\bit365-slot-3d-20261013-163008\\results\\03-yggdrasil-viking.png"},{"id":"04-playngo-rich-wilde","from":"C:\\Users\\User\\.codex\\generated_images\\01a12f2c-b7ff-70f0-a8bc-b8dc63caa00c\\exec-0790bab9-ac73-4659-aa6b-06850b3978b1.png","to":"E:\\codexwork\\Site-Skin-edit\\generated-images\\bit365-slot-3d-20261013-163008\\results\\04-playngo-rich-wilde.png"},{"id":"05-redtiger-dragon","from":"C:\\Users\\User\\.codex\\generated_images\\01a12f2c-b7ff-70f0-a8bc-b8dc63caa00c\\exec-fcab519f-c1b2-4440-a1ac-046d65e273a9.png","to":"E:\\codexwork\\Site-Skin-edit\\generated-images\\bit365-slot-3d-20261013-163008\\results\\05-redtiger-dragon.png"},{"id":"06-relax-necromancer","from":"C:\\Users\\User\\.codex\\generated_images\\01a12f2c-b7ff-70f0-a8bc-b8dc63caa00c\\exec-f85e5c1b-aa9d-4eb1-86d1-31113867f2fc.png","to":"E:\\codexwork\\Site-Skin-edit\\generated-images\\bit365-slot-3d-20261013-163008\\results\\06-relax-necromancer.png"},{"id":"07-wazdan-panther","from":"C:\\Users\\User\\.codex\\generated_images\\01a12f2c-b7ff-70f0-a8bc-b8dc63caa00c\\exec-f49efc53-99a4-4a11-9ade-47a237650a11.png","to":"E:\\codexwork\\Site-Skin-edit\\generated-images\\bit365-slot-3d-20261013-163008\\results\\07-wazdan-panther.png"},{"id":"08-hacksaw-outlaw","from":"C:\\Users\\User\\.codex\\generated_images\\01a12f2c-b7ff-70f0-a8bc-b8dc63caa00c\\exec-cef14a15-519b-4ef1-b38d-89e964f45c63.png","to":"E:\\codexwork\\Site-Skin-edit\\generated-images\\bit365-slot-3d-20261013-163008\\results\\08-hacksaw-outlaw.png"},{"id":"09-playtech-athena","from":"C:\\Users\\User\\.codex\\generated_images\\01a12f2c-b7ff-70f0-a8bc-b8dc63caa00c\\exec-b43d2d7f-a954-4e3a-b9d8-0d6ec234281e.png","to":"E:\\codexwork\\Site-Skin-edit\\generated-images\\bit365-slot-3d-20261013-163008\\results\\09-playtech-athena.png"},{"id":"10-netent-gonzo","from":"C:\\Users\\User\\.codex\\generated_images\\01a12f2c-b7ff-70f0-a8bc-b8dc63caa00c\\exec-e3fb14fe-b9ce-4c32-976a-828303b1e893.png","to":"E:\\codexwork\\Site-Skin-edit\\generated-images\\bit365-slot-3d-20261013-163008\\results\\10-netent-gonzo.png"}]
'@ | ConvertFrom-Json
$slotRoot = [IO.Path]::GetFullPath('E:\codexwork\Site-Skin-edit\generated-images\bit365-slot-3d-20261013-163008\results')
$slotRecords = @()
foreach ($slotJob in $slotJobs) {
 $slotTo = [IO.Path]::GetFullPath($slotJob.to)
 if (-not $slotTo.StartsWith($slotRoot + [IO.Path]::DirectorySeparatorChar)) { throw 'Unexpected target path' }
 if ($slotJob.id -ne '01-pragmatic-zeus') {
  if (Test-Path -LiteralPath $slotTo) { throw 'Output collision' }
  $slotBefore = (Get-FileHash -LiteralPath $slotJob.from -Algorithm SHA256).Hash
  Move-Item -LiteralPath $slotJob.from -Destination $slotTo
  $slotAfter = (Get-FileHash -LiteralPath $slotTo -Algorithm SHA256).Hash
  if ($slotBefore -ne $slotAfter) { throw 'Hash mismatch' }
 } else { $slotAfter = (Get-FileHash -LiteralPath $slotTo -Algorithm SHA256).Hash }
 $slotRecords += [pscustomobject]@{ id=$slotJob.id; original_path=$slotJob.from; final_path=$slotTo; transfer='move'; sha256=$slotAfter; bytes=(Get-Item -LiteralPath $slotTo).Length }
}
$slotRecords | ConvertTo-Json -Depth 5 | Set-Content -LiteralPath 'E:\codexwork\Site-Skin-edit\generated-images\bit365-slot-3d-20261013-163008\qa\transfers.json' -Encoding utf8
$slotRecords | ConvertTo-Json -Depth 5


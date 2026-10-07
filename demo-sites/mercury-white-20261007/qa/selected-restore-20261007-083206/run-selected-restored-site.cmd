@echo off
cd /d "E:\codexwork\Site-Skin-edit\demo-sites\mercury-white-20261007\site"
call "C:\Program Files\nodejs\npm.cmd" run start 1>"E:\codexwork\Site-Skin-edit\demo-sites\mercury-white-20261007\qa\selected-restore-20261007-083206\server-stdout.log" 2>"E:\codexwork\Site-Skin-edit\demo-sites\mercury-white-20261007\qa\selected-restore-20261007-083206\server-stderr.log"
set "restore_exit=%errorlevel%"
>"E:\codexwork\Site-Skin-edit\demo-sites\mercury-white-20261007\qa\selected-restore-20261007-083206\server-exit.txt" echo %restore_exit%
exit /b %restore_exit%
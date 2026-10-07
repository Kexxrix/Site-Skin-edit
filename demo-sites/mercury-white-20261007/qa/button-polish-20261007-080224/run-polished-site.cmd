@echo off
cd /d "E:\codexwork\Site-Skin-edit\demo-sites\mercury-white-20261007\site"
call "C:\Program Files\nodejs\npm.cmd" run start 1>"E:\codexwork\Site-Skin-edit\demo-sites\mercury-white-20261007\qa\button-polish-20261007-080224\server-stdout.log" 2>"E:\codexwork\Site-Skin-edit\demo-sites\mercury-white-20261007\qa\button-polish-20261007-080224\server-stderr.log"
set "polish_exit=%errorlevel%"
>"E:\codexwork\Site-Skin-edit\demo-sites\mercury-white-20261007\qa\button-polish-20261007-080224\server-exit.txt" echo %polish_exit%
exit /b %polish_exit%
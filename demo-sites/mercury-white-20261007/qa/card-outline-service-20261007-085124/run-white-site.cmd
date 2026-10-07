@echo off
cd /d "E:\codexwork\Site-Skin-edit\demo-sites\mercury-white-20261007\site"
call "C:\Program Files\nodejs\npm.cmd" run start 1>"E:\codexwork\Site-Skin-edit\demo-sites\mercury-white-20261007\qa\card-outline-service-20261007-085124\server-stdout.log" 2>"E:\codexwork\Site-Skin-edit\demo-sites\mercury-white-20261007\qa\card-outline-service-20261007-085124\server-stderr.log"
set "white_exit=%errorlevel%"
>"E:\codexwork\Site-Skin-edit\demo-sites\mercury-white-20261007\qa\card-outline-service-20261007-085124\server-exit.txt" echo %white_exit%
exit /b %white_exit%
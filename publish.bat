@ECHO OFF
::MD ..\..\..\cawoodm.github.io\rockdodger
git add . && git commit -a -m %1
PUSHD ..\..\..\cawoodm.github.io\rockdodger
::DEL *.js
XCOPY /y /e /d ..\..\JavaScript\games\rockdodger . && git add . && git commit -a -m %1 && git push
POPD
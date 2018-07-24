rmdir deploy/s
MD deploy
COPY dockerfile deploy
MD deploy\dist
XCOPY api\dist deploy\dist /F /R /Y /S
COPY api\package.json deploy
MD deploy\dashboard\dist\dashboard
XCOPY dashboard\dist\dashboard deploy\dashboard\dist\dashboard /F /R /Y /S


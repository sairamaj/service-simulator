echo off
echo "remove current deploy"
rmdir deploy/s
MD deploy
echo "copying docker and kubernetes files..."
COPY dockerfile deploy
COPY service-simulator.yaml deploy
MD deploy\dist
MD deploy\data

echo "copying /api..."
XCOPY api\dist deploy\dist /F /R /Y /S
XCOPY api\data deploy\data /F /R /Y /S
COPY api\package.json deploy

MD deploy\dashboard\dist\dashboard
MD deploy\dashboard\dist\dashboard\doc
echo "copying dashboard..."
XCOPY dashboard\dist\dashboard deploy\dashboard\dist\dashboard /F /R /Y /S
XCOPY doc deploy\dashboard\dist\dashboard\doc /F /R /Y /S
echo "copying tools..."
XCOPY toolset\*.* deploy /F /R /Y


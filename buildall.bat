REM convert this in to gulp
echo off
echo "Building Api"
pushd api
call npm run-script build
popd
pushd dashboard
echo "Building dashboard"
call npm run-script build
popd
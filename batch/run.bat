call gulp scripts
rem pause
rem node dist\index.js --provider inmemory --providerpath "..\api\data\inmemory\testdata.json" --consumer mongo --consumermongodb mongodb://127.0.0.1:27017/simulator
node dist\index.js --provider inmemory --providerpath "..\api\data\inmemory\testdata.json" --consumer file --consumerpath ..\api\data\fileprovider


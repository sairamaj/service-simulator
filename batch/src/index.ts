import * as fs from 'fs';
import { ImportService } from './ImportService';
import { Provider } from './provider/Provider';
import { FileProvider } from './provider/FileProvider';
import { InMemoryProvider } from './provider/InMemoryProvider';


for (let j = 0; j < process.argv.length; j++) {
    console.log(j + ' -> ' + (process.argv[j]));
}
if (process.argv.length < 3) {
    console.error('mongodb connection.')
    process.exit(-1)
}

if (process.argv.length < 4) {
    console.error('provider.')
    process.exit(-1)
}


var mongodb = process.argv[2]
var provider = process.argv[3]
var providerData = process.argv[4]
// if( !fs.existsSync(dataPath)){
//     console.error(dataPath + ' does not exists')
//     process.exit(-2)
// }

// console.log('importing:' + dataPath);
var importService = new ImportService(new InMemoryProvider(providerData), mongodb);
async function clearAndImport() {
    console.log('clearing...')
    await importService.clear();
    console.log('importing...')
    await importService.import();
}

clearAndImport()
    .then(result => {
        console.log('final success');
    }).catch(err => {
        console.log('final:' + err);
    })


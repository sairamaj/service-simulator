import { ImportService } from './ImportService';
import { Options } from "./Options";
import { createWriteStream } from 'fs';


for (let j = 0; j < process.argv.length; j++) {
    console.log(j + ' -> ' + (process.argv[j]));
}

var options = new Options(process.argv)
var result = options.parse()
if (result !== 0) {
    process.exit(result)
}

console.log('importing... from:' + options.getProvider().name + ' to ' + options.getConsumer().name)
var importService = new ImportService(options.getProvider(), options.getConsumer());
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
/*

var provider = process.argv[3]
var consumer
switch (provider) {
    case 'file':
        if( process.argv.length <4){
            console.error('file provider require path.')
            this.usage()
            process.exit(-3)
        }
        consumer = new File
        break
    case 'mongo':
    if( process.argv.length <4){
        console.error('mongo provider require connection string.')
        this.usage()
        process.exit(-3)
    }
    break
    default:
        console.error('invalid provider:' + provider)
        process.exit(-2)
}
if (process.argv.length < 4) {
    console.error('provider.')
    process.exit(-1)
}


var mongodb = process.argv[2]
var providerData = process.argv[4]
// if( !fs.existsSync(dataPath)){
//     console.error(dataPath + ' does not exists')
//     process.exit(-2)
// }

// console.log('importing:' + dataPath);
mongoose.Promise = global.Promise;
mongoose.connect(mongodb, { useNewUrlParser: true });

var importService = new ImportService(new InMemoryProvider(providerData), new MongoDbConsumer(mongodb));
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

*/
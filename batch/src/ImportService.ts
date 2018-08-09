import * as mongoose from "mongoose";
import { MongoDb } from './MongoDb'
import { Service } from './model/Service';
import { Provider } from './provider/Provider';

export class ImportService {
    _mongoDb: MongoDb
    constructor(public provider: Provider, public mongoUrl: string) {
        this._mongoDb = new MongoDb(this.mongoUrl)
    }

    public async clear() {
        console.log('clearing...')
        await this._mongoDb.clear();
    }

    private mongoSetup(): void {
        mongoose.Promise = global.Promise;

        console.log('connecting...')
        mongoose.connect(this.mongoUrl, { useNewUrlParser: true });

        console.log('connected...')
    }

    public async import(): Promise<void> {
        for (let service of this.provider.getServices()) {
            console.log(service)
            await this._mongoDb.addService(service)
        }

        /*
                var services = await this.getServices();
                var data = this.createServicesCollectionInfo(services);
                console.log('inserting services...')
                await ServiceDbSchema.collection.insertMany(data, (err, result) => {
                    if (err) {
                        console.log(err)
                    } else {
                        console.log('success:' + result.insertedCount);
                    }
                });
        
                console.log('inserting responses...')
                services.forEach(async s => {
                    s.config.forEach(async c => {
                        var responseNameKey = s.name + "_response_" + c.name;
                        var responseFileName = s.path + path.sep + 'responses' + path.sep + c.name + '.xml'
                        await this.insertResponse(responseNameKey, responseFileName);
                    });
                });
        
                console.log('inserting requests...')
                services.forEach(async s => {
                    s.config.forEach(async c => {
                        var requestNameKey = s.name + "_request_" + c.name;
                        var requestFileName = s.path + path.sep + 'requests' + path.sep + c.name + '.xml'
                        console.log(requestFileName)
                        await this.insertRequest(requestNameKey, requestFileName);
                    });
                });
                */
    }
    /*
        private async getServices(): Promise<Service[]> {
            return new Promise<Service[]>((resolve, reject) => {
                glob(this.path + '/*', (err, dirs) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(dirs.map(d => {
                            var mapFile = d + path.sep + 'config' + path.sep + 'map.json';
                            return new Service(d.split('/').slice(-1)[0], d, 'soap',JSON.parse(fs.readFileSync(mapFile, 'utf-8')));
                        }));
                    }
                });
            });
        }
    
        private createServicesCollectionInfo(services: Service[]): any {
            var data = []
            services.forEach(s => {
                data.push({
                    name: s.name,
                    config: s.config
                })
            })
    
            return data;
        }
    
    
        private async insertResponse(name: string, fileName: string) {
            if(!fs.existsSync(fileName)){
                return
            }
            await fs.readFile(fileName, 'utf-8', async (err, data) => {
                if (err) {
                    console.log('err:' + err)
                } else {
                    await ResponseDbSchema.collection.insertOne({ name: name, response: data }, (err, result) => {
                        if (err) {
                            console.log('error for:' + name);
                        } else {
                            console.log('success for:' + name);
                        }
                    });
                }
            });
        }
    
        private async insertRequest(name: string, fileName: string) {
            if(!fs.existsSync(fileName)){
                return
            }
            await fs.readFile(fileName, 'utf-8', async (err, data) => {
                if (err) {
                    console.log('err:' + err)
                } else {
                    console.log('request insert:' + name)
                    await RequestDbSchema.collection.insertOne({ name: name, request: data }, (err, result) => {
                        if (err) {
                            console.log('error for:' + name);
                        } else {
                            console.log('success for:' + name);
                        }
                    });
                }
            });
        }
    */
}

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
        await this._mongoDb.clear();
    }

    private mongoSetup(): void {
        mongoose.Promise = global.Promise;
        mongoose.connect(this.mongoUrl, { useNewUrlParser: true });
    }

    public async import(): Promise<void> {
        for (let service of this.provider.getServices()) {
            await this._mongoDb.addService(service)
            for(let testcase of this.provider.getTestCases(service)){
                await this._mongoDb.addTestCase(service.name, testcase)
            }
        }
    }
}

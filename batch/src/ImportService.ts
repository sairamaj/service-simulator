import { Provider } from './provider/Provider';
import { Consumer } from "./consumer/Consumer";
const debug = require('debug')('importservice')

export class ImportService {

    constructor(public provider: Provider, public consumer: Consumer) {
    }

    public async clear() {
        await this.consumer.clear();
    }

    public async import(): Promise<void> {
        for (let service of this.provider.getServices()) {
            debug('addService:' + service.name)
            console.log(`adding :${service.name}`)
            if (await this.consumer.addService(service)) {
                for (let testcase of this.provider.getTestCases(service)) {
                    debug('addTestCase:' + testcase.name)
                    console.log(`\t${testcase.name}`)
                    await this.consumer.addTestCase(service.name, testcase)
                }
            }
        }
    }
}

import * as mongoose from "mongoose";
import { ServiceSchema } from './model/ServiceSchema';
import { ResponseSchema } from './model/ResponseSchema';
import { RequestSchema } from './model/RequestSchema';
import { Service } from './model/Service';
import { TestCase } from "./model/TestCase";
import { ServiceConfigMap } from "./model/ServiceConfigMap";
const debug = require('debug')('mongodb');

const ServiceDbSchema = mongoose.model('services', ServiceSchema);
const ResponseDbSchema = mongoose.model('responses', ResponseSchema);
const RequestDbSchema = mongoose.model('requests', RequestSchema);

export class MongoDb {

    constructor(public connection: string) {
        mongoose.Promise = global.Promise;
        debug('connecting...')
        mongoose.connect(this.connection, { useNewUrlParser: true });
        debug('connected...')
    }

    public async clear() {
        await ServiceDbSchema.collection.remove({})
        await ResponseDbSchema.collection.remove({})
        await RequestDbSchema.collection.remove({})
    }

    public async addService(service: Service) {
        return await ServiceDbSchema.collection.insertOne(service)
    }

    public async addTestCase(name: string, testcase: TestCase) {
        debug('addTestCase:' + testcase.name)
        var service = await this.getService(name)
        if (service === undefined) {
            debug('warn service ' + name + ' not found')
            return undefined
        }

        if (service.config === undefined) {
            service.config = []
        }

        var foundConfig = service.config.find(c => c.name == testcase.name)
        if (foundConfig === undefined) {
            service.config.push(new ServiceConfigMap(testcase.name, testcase.matches))
        } else {
            foundConfig.matches = testcase.matches
        }

        await ServiceDbSchema.findOneAndUpdate({ name: name }, service)
        await this.addRequest(name, testcase)
        await this.addResponse(name, testcase)
    }

    private async getService(name: string): Promise<Service> {
        debug('enter getService : ' + name)
        var service = await (ServiceDbSchema.findOne({ name: name }))
        return service;
    }

    private async addRequest(name: string, testcase: TestCase) {
        var requestNameKey = name + "_request_" + testcase.name;
        debug('addRequest inserting :' + requestNameKey)
        await RequestDbSchema.findOneAndUpdate({ name: requestNameKey },
            { name: requestNameKey, request: testcase.request },
            { upsert: true })
    }

    private async addResponse(name: string, testcase: TestCase) {
        var responseNameKey = name + "_response_" + testcase.name;
        debug('addRequest inserting :' + responseNameKey)
        await ResponseDbSchema.findOneAndUpdate({ name: responseNameKey },
            { name: responseNameKey, response: testcase.request },
            { upsert: true })
    }

} 
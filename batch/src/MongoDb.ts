import * as mongoose from "mongoose";
import { ServiceSchema } from './model/ServiceSchema';
import { ResponseSchema } from './model/ResponseSchema';
import { RequestSchema } from './model/RequestSchema';
import { Service } from './model/Service';
const debug = require('debug')('mongodb');

const ServiceDbSchema = mongoose.model('services', ServiceSchema);
const ResponseDbSchema = mongoose.model('responses', ResponseSchema);
const RequestDbSchema = mongoose.model('requests', RequestSchema);

export class MongoDb {

    constructor(public connection: string){
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

    public async addService(service:Service){
        return await ServiceDbSchema.collection.insertOne(service)
    }
}
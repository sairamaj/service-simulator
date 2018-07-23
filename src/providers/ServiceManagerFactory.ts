import { ServiceManager } from "../ServiceManager";
import { InMemoryProvider } from "./InMemoryProvider";
import { ServicesFileProvider } from "./ServicesFileProvicer";
import { MongoDbProvider } from "./MongoDbProvider";
var debug = require('debug')('servicemanagerfactory')
const config = require('./../config');

export namespace ServiceManagerFactory {
    export function createServiceManager(): ServiceManager {
        debug('enter createServiceManager:' + config.app.provider)
        if (config.app.provider === 'file') {
            return new ServicesFileProvider();
        } else if (config.app.provider === 'mongo') {
            return new MongoDbProvider();
        }
        return new InMemoryProvider();
    }
}

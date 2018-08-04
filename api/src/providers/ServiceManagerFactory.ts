import { ServiceManager } from "./ServiceManager";
import { InMemoryProvider } from "./InMemoryProvider";
import { ServicesFileProvider } from "./ServicesFileProvicer";
import { MongoDbProvider } from "./MongoDbProvider";
import { WrapperProvider } from "./WrapperProvider";
var debug = require('debug')('servicemanagerfactory')
const config = require('./../config');
    
export namespace ServiceManagerFactory {
    export function createServiceManager(): ServiceManager {
        debug('enter createServiceManager:' + config.app.provider)
        var provider 
        
        if (config.app.provider === 'file') {
            provider = new ServicesFileProvider(config.app.fileProviderLocation);
        } else if (config.app.provider === 'mongo') {
            provider = new MongoDbProvider();
        }else{
            provider = new InMemoryProvider(config.app.inMemoryDataFile)
        }

        return new WrapperProvider(provider)
    }
}

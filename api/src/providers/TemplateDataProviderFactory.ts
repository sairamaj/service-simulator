import { ITemplateDataProvider } from "./ITemplateDataProvider";
import { InMemoryTemplateDataProvider } from "./InMemoryTemplateDataProvider";
import { FileProviderTemplateDataProvider } from "./FileProviderTemplateDataProvider";
import { MongoDbTemplateDataProvider } from "./MongoDbTemplateDataProvider";
const config = require('./../config');

export class TemplateDataProviderFactory{
    public static getTemplateDataProvider(): ITemplateDataProvider{
        if (config.app.provider === 'file') {
            return new FileProviderTemplateDataProvider(config.app.fileProviderLocation);
        } else if (config.app.provider === 'mongo') {
            return new MongoDbTemplateDataProvider()
        }else{
            return new InMemoryTemplateDataProvider(config.app.templateDataFilesLocation);
        }
    }
}
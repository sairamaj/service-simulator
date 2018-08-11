import { ITemplateDataProvider } from './ITemplateDataProvider';
import * as path from 'path'
import * as fs from 'fs'
const debug = require('debug')('mongodbtemplatedataprovider')

export class MongoDbTemplateDataProvider implements ITemplateDataProvider{
    constructor(){
    }

    public getData(serviceName: string, dataname:string): string{
        return ''
    }
}
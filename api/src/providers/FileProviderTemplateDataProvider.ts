import { ITemplateDataProvider } from './ITemplateDataProvider';
import * as path from 'path'
import * as fs from 'fs'
const debug = require('debug')('fileprovidertemplatedataprovider')

export class FileProviderTemplateDataProvider implements ITemplateDataProvider{
    constructor(public dataFilesPath: string){
        debug('dataFilesPath:' + this.dataFilesPath)
    }

    public getData(serviceName: string, dataname:string): string{
        var dataFile = this.dataFilesPath + path.sep + serviceName + path.sep + dataname
        debug('dataFile:' + dataFile)
        if( !fs.existsSync(dataFile)){
            return undefined
        }

        return fs.readFileSync(dataFile,'utf-8')
    }
}
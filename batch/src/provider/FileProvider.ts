import * as glob from 'glob';
import * as path from 'path';
import * as fs from 'fs'; import { Provider } from "./Provider";
import { Service } from "../model/Service";
import { TestCase } from "../model/TestCase";
import { MapDetail } from '../model/MapDetail';
import { ServiceFileProvider } from './ServiceFileProvider';
const debug = require('debug')('fileprovider')


export class FileProvider implements Provider {
    constructor(public path: string) {
        if (!fs.existsSync(path)) {
            throw Error(path + ' does not exist (error in file provider)')
        }
    }

    public name: string = 'file'
    public * getServices(): Iterable<Service> {
        debug('enter getServices.')
        let dirs = glob.sync(this.path + "/*")
        for (let dir of dirs) {
            var name = dir.split('/').slice(-1)[0]
            var serviceFileProvider = new ServiceFileProvider(name, this.path)
            yield new Service(name, serviceFileProvider.type, [])
        }
    }

    public * getTestCases(service: Service): Iterable<TestCase> {
        debug(`enter getTestCases ${service.name}.`)
        var serviceFileProvider = new ServiceFileProvider(service.name, this.path)
        var maps = serviceFileProvider.getConfigMap()
        if (maps === undefined) {
            return
        }

        for (let map of maps) {
            var mapDetail = serviceFileProvider.getMapDetailSync(map.name)
            yield new TestCase(map.name, map.matches, mapDetail.request, mapDetail.response)
        }
    }

}
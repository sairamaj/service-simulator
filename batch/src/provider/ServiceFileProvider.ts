import { ServiceConfigMap } from "../model/ServiceConfigMap";
import * as path from 'path';
import * as fs from 'fs';
import { Service } from "../model/Service";
import { MapDetail } from "../model/MapDetail";
var debug = require('debug')('servicefileprovider')

export class ServiceFileProvider {
    configMaps: ServiceConfigMap[];
    type: string

    constructor(public name: string, public fileProviderLocation: string) {
        this.configMaps = [];
        var mapFileName = this.getConfigMapFile();
        debug('loading ' + mapFileName)
        if (!fs.existsSync(mapFileName)) {
            debug('warn: map file name does not exists:' + mapFileName);
            return;
        }

        debug('reading ' + mapFileName)
        var serviceInfo = JSON.parse(fs.readFileSync(mapFileName, 'utf-8'));
        this.configMaps = serviceInfo.maps
        this.type = serviceInfo.type
        debug('configMaps' + JSON.stringify(this.configMaps))
    }

    public getMapDetailSync(mapName: string): MapDetail {

        var foundMap = this.configMaps.find(m => m.name == mapName);
        if (foundMap === undefined) {
            return undefined
        }

        var response = ''
        var responseFileName = this.getResponseFileName(foundMap.name)
        if (fs.existsSync(responseFileName)) {
            response = fs.readFileSync(responseFileName, 'utf-8')
        }

        var request = ''
        var requestFileName = this.getRequestFileName(foundMap.name)
        if (fs.existsSync(requestFileName)) {
            request = fs.readFileSync(requestFileName, 'utf-8')
        }

        return new MapDetail(foundMap.name, request, response, foundMap.matches)
    }

    public getConfigMap(): ServiceConfigMap[] {
        let configFile = this.getConfigMapFile();
        if (fs.existsSync(configFile)) {
            var serviceInfo = JSON.parse(fs.readFileSync(configFile, 'utf-8'));
            return serviceInfo.maps
        }
    }

    getDataDirectory(): string {
        return this.fileProviderLocation;
    }

    getServiceDirectory(): string {
        return this.getDataDirectory() + path.sep + this.name;
    }

    getServiceResponseDirectory(): string {
        return this.getDataDirectory() + path.sep + this.name + path.sep + 'responses';
    }

    getServiceRequestDirectory(): string {
        return this.getDataDirectory() + path.sep + this.name + path.sep + 'requests';
    }

    getResponseFileName(requestName: string): string {
        return this.getServiceResponseDirectory() + path.sep + requestName + '.xml';
    }

    getRequestFileName(requestName: string): string {
        return this.getServiceRequestDirectory() + path.sep + requestName + '.xml';
    }

    getConfigMapDirectory(serviceName: string): string {
        return this.getServiceDirectory() + path.sep + 'config';
    }

    getConfigMapFile(): string {
        return this.getConfigMapDirectory(this.name) + path.sep + 'map.json';
    }
}
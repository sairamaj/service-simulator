import * as fs from 'fs';
import * as path from 'path';
import * as glob from 'glob';
import { Consumer } from "./Consumer";
import { Service } from "../model/Service";
import { TestCase } from "../model/TestCase";
import { resolve } from 'url';
const fsextra = require('fs-extra')
const debug = require('debug')('fileconsumer')

export class FileConsumer implements Consumer {

    constructor(private path: string) {
        if (!fs.existsSync(path)) {
            throw Error('Path:' + path + ' does not exist.s')
        }
    }

    public name: string = 'file'
    public async clear(): Promise<boolean> {
        debug('enter clearing')
        return new Promise<boolean>((resolve, reject) => {
            try {
                debug('enumerating :' + this.path)
                glob(this.path + '/*', (err, dirs) => {
                    if (err) {
                        reject(err)
                    } else {

                        dirs.forEach(dir => {
                            debug('clearing :' + dir)
                            fsextra.removeSync(dir)
                        })

                        debug('clearing done...')

                        resolve(true)
                    }
                })
            } catch (error) {
                reject(error)
            }
        })
    }

    public async addService(service: Service): Promise<boolean> {
        debug('addService.' + service.name)
        return new Promise<boolean>((resolve, reject) => {
            try {
                var servicePath = this.path + path.sep + service.name
                debug('ensureDir.' + servicePath)
                fsextra.ensureDirSync(servicePath)

                var servicePath = this.path + path.sep + service.name
                var configPath = servicePath + path.sep + 'config'
                var logsPath = servicePath + path.sep + 'logs'
                var requests = servicePath + path.sep + 'requests'
                var responses = servicePath + path.sep + 'responses'

                fsextra.ensureDirSync(configPath)
                fsextra.ensureDirSync(logsPath)
                fsextra.ensureDirSync(requests)
                fsextra.ensureDirSync(responses)

                debug('returning true.')

                var info = { type: service.type, maps: [] }
                var maps = []
                var mapFile = configPath + path.sep + 'map.json'
                if (!fsextra.pathExistsSync(mapFile)) {
                    debug('reading ' + mapFile)
                    fsextra.outputJsonSync(mapFile, info, { spaces: '\t' })
                }

                resolve(true)

            } catch (error) {
                reject(error)
            }
        })
    }

    public async addTestCase(name: string, testcase: TestCase): Promise<boolean> {
        debug(`addTestCase. ${name} ${testcase.name}`)
        return new Promise<boolean>(async (resolve, reject) => {
            try {
                var servicePath = this.path + path.sep + name
                var configPath = servicePath + path.sep + 'config'
                var logsPath = servicePath + path.sep + 'logs'
                var requests = servicePath + path.sep + 'requests'
                var responses = servicePath + path.sep + 'responses'

                await this.addConfig(configPath, testcase)

                this.writeRequest(requests, testcase)
                this.writeResponse(responses, testcase)
                resolve(true)

            } catch (error) {
                reject(error)
            }
        })
    }

    private async addConfig(configPath: string, testcase: TestCase): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            try {
                debug('addConfig.' + configPath)
                var mapFile = configPath + path.sep + 'map.json'
                var serviceInfo = { type: "soap", maps: [] }
                if (fsextra.pathExistsSync(mapFile)) {
                    debug('reading ' + mapFile)
                    serviceInfo = fsextra.readJsonSync(mapFile)
                }

                serviceInfo.maps.push({
                    name: testcase.name,
                    matches: testcase.matches
                })

                debug('writing json...')

                fsextra.outputJsonSync(mapFile, serviceInfo, { spaces: '\t' })
                resolve()
            } catch (error) {
                reject(error)
            }
        })
    }

    private writeRequest(requestPath: string, testcase: TestCase) {
        var requestFile = requestPath + path.sep + testcase.name + ".xml"
        fs.writeFileSync(requestFile, testcase.request, 'utf-8')
    }

    private writeResponse(responsePath: string, testcase: TestCase) {
        var responseFile = responsePath + path.sep + testcase.name + ".xml"
        fs.writeFileSync(responseFile, testcase.response, 'utf-8')
    }

}
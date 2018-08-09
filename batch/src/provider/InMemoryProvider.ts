import * as fs from 'fs'
import { Provider } from "./Provider";
import { Service } from "../model/Service";
import { TestCase } from "../model/TestCase";

export class InMemoryProvider implements Provider{
    data: any[];
    constructor(fileName: string){
        this.data = JSON.parse(fs.readFileSync(fileName,'utf-8'))
    }

    public name: string = 'inmemory'
    public* getServices(): Iterable<Service> {
        for(let s of this.data){
            yield new Service(s.name, s.type,[])
        }
    }

    public* getTestCases(service:Service) :Iterable<TestCase>{
        var foundService = this.data.find(s=> s.name == service.name)
        if( foundService === undefined){
            return 
        }

        for(let map of foundService.config){
            yield new TestCase(map.name, map.matches, map.request, map.response)
        }
    }
}
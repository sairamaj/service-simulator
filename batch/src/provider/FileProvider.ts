import * as fs from 'fs'
import { Provider } from "./Provider";
import { Service } from "../model/Service";
import { TestCase } from "../model/TestCase";

export class FileProvider implements Provider {
    constructor(path: string){
        if( !fs.existsSync(path)){
            throw Error(path + ' does not exist (error in file provider)')
        }
    }

    public name: string = 'file'
    public * getServices(): Iterable<Service> {
        yield new Service('test11', 'soap',[])
        yield new Service('test12', 'soap',[])
    }

    public * getTestCases(service: Service): Iterable<TestCase> {

    }
}
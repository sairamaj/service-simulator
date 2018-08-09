import { Provider } from "./Provider";
import { Service } from "../model/Service";

export class InMemoryProvider implements Provider{
    data: Service[];
    constructor(fileName: string){
        this.data = require(fileName)
    }

    public* getServices(): Iterable<Service> {
        for(let s of this.data){
            yield new Service(s.name, s.type)
        }
    }
}
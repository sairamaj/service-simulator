import { ServiceConfigMap } from "./ServiceConfigMap";

export class Service{
    constructor(public name: string,
        public type: string = 'soap',
        public config : ServiceConfigMap[]
    ){
    }

    public url: string
}
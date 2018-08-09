import { Provider } from "./Provider";
import { Service } from "../model/Service";

export class FileProvider implements Provider{
    public* getServices(): Iterable<Service> {
        yield new Service('test11','','soap',[])
        yield new Service('test12','','soap',[])
      }
}
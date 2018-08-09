import { Service } from "../model/Service";
import { TestCase } from "../model/TestCase";

export interface Consumer{
    name: string
    clear(): Promise<boolean>
    addService(service: Service) : Promise<boolean>
    addTestCase(name: string, testcase: TestCase): Promise<boolean>
}
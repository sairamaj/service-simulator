import { Service } from "../model/Service";
import { TestCase } from "../model/TestCase";

export interface Provider{
    name: string
    getServices() :Iterable<Service>
    getTestCases(service:Service) :Iterable<TestCase>
}
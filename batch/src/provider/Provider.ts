import { Service } from "../model/Service";
import { TestCase } from "../model/TestCase";

export interface Provider{
    getServices() :Iterable<Service>
    getTestCases(service:Service) :Iterable<TestCase>
}
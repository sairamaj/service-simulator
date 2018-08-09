import { Service } from "../model/Service";

export interface Provider{
    getServices() :Iterable<Service>
}
import { Service } from './model/Service';
import { ProcessInfo } from './model/ProcessInfo';
import { ProcessedRequest } from './model/ProcessedRequest';
import { MapDetail } from './model/MapDetail';

export interface ServiceManager {
    getServices(): Promise<Service[]>;
    getService(name: string): Promise<Service>;
    getMapDetail(name: string, mapName: string): Promise<MapDetail>;
    getResponse(name: string, request: string): Promise<ProcessInfo>;
    logRequest(name: string, date: Date, status: number, processInfo: ProcessInfo): Promise<boolean>;
    getProcessedRequests(name: string): Promise<ProcessedRequest[]>
    getProcessedRequest(name: string, id: string): Promise<ProcessedRequest>
    clearProcessedRequests(name: string): Promise<boolean>
}
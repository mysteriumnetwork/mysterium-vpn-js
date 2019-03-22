import { TequilapiClient } from 'mysterium-tequilapi/lib/client';
import { ServiceInfoDTO } from 'mysterium-tequilapi/lib/dto/service-info';
import { ServiceStatus } from '../models/service-status';
export declare class ProviderService {
    private tequilapiClient;
    private serviceInstance?;
    private statusPublisher;
    private statusFetcher?;
    private lastStatus;
    constructor(tequilapiClient: TequilapiClient);
    checkForExistingService(): Promise<void>;
    isActive(): Promise<boolean>;
    findRunningService(): Promise<ServiceInfoDTO | undefined>;
    start(providerId: string, serviceType: string): Promise<void>;
    stop(): Promise<void>;
    addStatusSubscriber(subscriber: (newStatus: ServiceStatus) => any): void;
    removeStatusSubscriber(subscriber: (newStatus: ServiceStatus) => any): void;
    private handleStartedService;
    private startFetchingStatus;
    private stopFetchingStatus;
    private fetchStatus;
    private processNewServiceInfo;
    private processStatus;
    private serviceStatusDTOToModel;
}

import { IDocProvider } from '../../core/interfaces/doc-provider.interface';
import { DockDocProviderService } from '../../dock/dock-doc-provider.service';
import { ProvedorXDocProviderService } from '../../provedor-x/provedor-x-doc-provider.service';
export declare class DocProviderFactory {
    private readonly dockProvider;
    private readonly provedorXProvider;
    constructor(dockProvider: DockDocProviderService, provedorXProvider: ProvedorXDocProviderService);
    createProvider(providerId: string): IDocProvider;
}

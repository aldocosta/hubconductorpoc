import { Injectable } from '@nestjs/common';
import { IDocProvider } from '../../core/interfaces/doc-provider.interface';
import { DockDocProviderService } from '../../dock/dock-doc-provider.service';
import { ProvedorXDocProviderService } from '../../provedor-x/provedor-x-doc-provider.service';

@Injectable()
export class DocProviderFactory {
  constructor(
    private readonly dockProvider: DockDocProviderService,
    private readonly provedorXProvider: ProvedorXDocProviderService,
  ) {}

  createProvider(providerId: string): IDocProvider {
    switch (providerId.toLowerCase()) {
      case 'dock':
        return this.dockProvider;
      case 'provedorx':
        return this.provedorXProvider;
      default:
        throw new Error(`Provider não suportado: ${providerId}`);
    }
  }
} 
import { Injectable } from '@nestjs/common';
import { DocProviderFactory } from './doc-provider.factory';
import { DocTransferRequestDto } from '../dto/doc-transfer-request.dto';
import { DocTransferResponseDto } from '../dto/doc-transfer-response.dto';

@Injectable()
export class DocService {
  constructor(private readonly docProviderFactory: DocProviderFactory) {}

  async transferDoc(data: DocTransferRequestDto, providerId: string): Promise<DocTransferResponseDto> {
    const provider = this.docProviderFactory.createProvider(providerId);
    return await provider.transferDoc(data);
  }
} 
import { DocProviderFactory } from './doc-provider.factory';
import { DocTransferRequestDto } from '../dto/doc-transfer-request.dto';
import { DocTransferResponseDto } from '../dto/doc-transfer-response.dto';
export declare class DocService {
    private readonly docProviderFactory;
    constructor(docProviderFactory: DocProviderFactory);
    transferDoc(data: DocTransferRequestDto, providerId: string): Promise<DocTransferResponseDto>;
}

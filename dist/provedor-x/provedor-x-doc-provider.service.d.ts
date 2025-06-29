import { IDocProvider } from '../core/interfaces/doc-provider.interface';
import { DocTransferRequestDto } from '../transfers/dto/doc-transfer-request.dto';
import { DocTransferResponseDto } from '../transfers/dto/doc-transfer-response.dto';
export declare class ProvedorXDocProviderService implements IDocProvider {
    transferDoc(data: DocTransferRequestDto): Promise<DocTransferResponseDto>;
}

import { IDocProvider } from '../core/interfaces/doc-provider.interface';
import { DocTransferRequestDto } from '../core/dto/doc-transfer-request.dto';
import { DocTransferResponseDto } from '../core/dto/doc-transfer-response.dto';
export declare class DockDocProviderService implements IDocProvider {
    transferDoc(data: DocTransferRequestDto): Promise<DocTransferResponseDto>;
}

import { DocTransferRequestDto } from '../dto/doc-transfer-request.dto';
import { DocTransferResponseDto } from '../dto/doc-transfer-response.dto';
export interface IDocProvider {
    transferDoc(data: DocTransferRequestDto): Promise<DocTransferResponseDto>;
}

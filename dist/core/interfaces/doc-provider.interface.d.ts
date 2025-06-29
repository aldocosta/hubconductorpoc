import { DocTransferRequestDto } from '../../transfers/dto/doc-transfer-request.dto';
import { DocTransferResponseDto } from '../../transfers/dto/doc-transfer-response.dto';
export interface IDocProvider {
    transferDoc(data: DocTransferRequestDto): Promise<DocTransferResponseDto>;
}

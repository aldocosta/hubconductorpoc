import { DocService } from './services/doc.service';
import { DocTransferRequestDto } from './dto/doc-transfer-request.dto';
import { DocTransferResponseDto } from './dto/doc-transfer-response.dto';
export declare class TransfersController {
    private readonly docService;
    constructor(docService: DocService);
    transferDoc(data: DocTransferRequestDto, req: any): Promise<DocTransferResponseDto>;
}

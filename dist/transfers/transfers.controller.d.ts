import { DocService } from './services/doc.service';
import { DocTransferRequestDto } from '../core/dto/doc-transfer-request.dto';
import { DocTransferResponseDto } from '../core/dto/doc-transfer-response.dto';
import { JwtService } from '../core/services/jwt.service';
export declare class TransfersController {
    private readonly docService;
    private readonly jwtService;
    constructor(docService: DocService, jwtService: JwtService);
    transferDoc(data: DocTransferRequestDto, req: any): Promise<DocTransferResponseDto>;
}

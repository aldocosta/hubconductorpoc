import { DocService } from './services/doc.service';
import { DocTransferRequestDto } from './dto/doc-transfer-request.dto';
import { DocTransferResponseDto } from './dto/doc-transfer-response.dto';
import { TransferMetricsService } from './services/transfer-metrics.service';
export declare class TransfersController {
    private readonly docService;
    private readonly metricsService;
    constructor(docService: DocService, metricsService: TransferMetricsService);
    transferDoc(data: DocTransferRequestDto, req: any): Promise<DocTransferResponseDto>;
}

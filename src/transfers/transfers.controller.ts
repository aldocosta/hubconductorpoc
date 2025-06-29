import { Controller, Post, Body, Req, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { DocService } from './services/doc.service';
import { DocTransferRequestDto } from './dto/doc-transfer-request.dto';
import { DocTransferResponseDto } from './dto/doc-transfer-response.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { TransferMetricsService } from './services/transfer-metrics.service';
import { TransferErrorClassifier } from './services/transfer-error-classifier';

@ApiTags('Transfers')
@Controller('transfers')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class TransfersController {
  constructor(
    private readonly docService: DocService,
    private readonly metricsService: TransferMetricsService,
  ) {}

  @Post('doc')
  @ApiOperation({ summary: 'Realizar transferência DOC' })
  @ApiResponse({ status: 201, description: 'Transferência DOC realizada com sucesso', type: DocTransferResponseDto })
  async transferDoc(
    @Body() data: DocTransferRequestDto,
    @Req() req: any,
  ): Promise<DocTransferResponseDto> {
    const startTime = Date.now();
    const amount = data.amount || 0;
    const instance = process.env.INSTANCE_NAME || 'monolith';
    
    try {
      const result = await this.docService.transferDoc(data, req.user.providerId);
      
      const duration = Date.now() - startTime;
      this.metricsService.recordTransfer(req.user.providerId, 'success', amount, duration, undefined, instance);
      
      return result;
    } catch (error) {
      const duration = Date.now() - startTime;
      const errorType = TransferErrorClassifier.classifyError(error);
      
      this.metricsService.recordTransfer(req.user.providerId, 'error', 0, duration, errorType, instance);
      throw error;
    }
  }
} 
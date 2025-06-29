import { Controller, Post, Body, Req, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { DocService } from './services/doc.service';
import { DocTransferRequestDto } from './dto/doc-transfer-request.dto';
import { DocTransferResponseDto } from './dto/doc-transfer-response.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Transfers')
@Controller('transfers')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class TransfersController {
  constructor(
    private readonly docService: DocService,
  ) {}

  @Post('doc')
  @ApiOperation({ summary: 'Realizar transferência DOC' })
  @ApiResponse({ status: 201, description: 'Transferência DOC realizada com sucesso', type: DocTransferResponseDto })
  async transferDoc(
    @Body() data: DocTransferRequestDto,
    @Req() req: any,
  ): Promise<DocTransferResponseDto> {
    const providerId = req.user.providerId;
    return this.docService.transferDoc(data, providerId);
  }
} 
import { Controller, Post, Body, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { DocService } from './services/doc.service';
import { DocTransferRequestDto } from './dto/doc-transfer-request.dto';
import { DocTransferResponseDto } from './dto/doc-transfer-response.dto';
import { JwtService } from '../core/services/jwt.service';

@ApiTags('Transfers')
@Controller('transfers')
export class TransfersController {
  constructor(
    private readonly docService: DocService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('doc')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Realizar transferência DOC' })
  @ApiResponse({ status: 201, description: 'Transferência DOC realizada com sucesso', type: DocTransferResponseDto })
  async transferDoc(
    @Body() data: DocTransferRequestDto,
    @Req() req: any,
  ): Promise<DocTransferResponseDto> {
    const token = req.headers.authorization?.replace('Bearer ', '');
    const payload = this.jwtService.verifyToken(token);
    const providerId = payload.providerId;
    
    return this.docService.transferDoc(data, providerId);
  }
} 
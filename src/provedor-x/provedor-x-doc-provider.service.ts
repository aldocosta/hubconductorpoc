import { Injectable } from '@nestjs/common';
import { IDocProvider } from '../core/interfaces/doc-provider.interface';
import { DocTransferRequestDto } from '../core/dto/doc-transfer-request.dto';
import { DocTransferResponseDto } from '../core/dto/doc-transfer-response.dto';

@Injectable()
export class ProvedorXDocProviderService implements IDocProvider {
  async transferDoc(data: DocTransferRequestDto): Promise<DocTransferResponseDto> {
    // Simulação de validação de limite
    if (data.amount > 10000000) { // R$ 100.000,00
      return {
        transferId: `provedorx_doc_${Date.now()}_error`,
        status: 'failed',
        message: 'Valor da transferência excede o limite permitido',
        providerId: 'provedorx',
        timestamp: new Date().toISOString(),
      };
    }

    // Simulação de processamento pendente
    if (data.amount > 5000000) { // R$ 50.000,00
      return {
        transferId: `provedorx_doc_${Date.now()}_pending`,
        status: 'pending',
        message: 'Transferência em análise - valor alto',
        providerId: 'provedorx',
        timestamp: new Date().toISOString(),
      };
    }

    // Simulação de processamento bem-sucedido
    return {
      transferId: `provedorx_doc_${Date.now()}`,
      status: 'success',
      message: 'Transferência DOC realizada com sucesso via ProvedorX',
      providerId: 'provedorx',
      timestamp: new Date().toISOString(),
    };
  }
} 
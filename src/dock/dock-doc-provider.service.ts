import { Injectable } from '@nestjs/common';
import { IDocProvider } from '../core/interfaces/doc-provider.interface';
import { DocTransferRequestDto } from '../core/dto/doc-transfer-request.dto';
import { DocTransferResponseDto } from '../core/dto/doc-transfer-response.dto';

@Injectable()
export class DockDocProviderService implements IDocProvider {
  async transferDoc(data: DocTransferRequestDto): Promise<DocTransferResponseDto> {
    // Simulação de validação de limite
    if (data.amount > 5000000) { // R$ 50.000,00
      return {
        transferId: `dock_doc_${Date.now()}_error`,
        status: 'failed',
        message: 'Valor da transferência excede o limite permitido',
        providerId: 'dock',
        timestamp: new Date().toISOString(),
      };
    }

    // Simulação de validação de horário
    const now = new Date();
    const hour = now.getHours();
    if (hour < 6 || hour > 18) {
      return {
        transferId: `dock_doc_${Date.now()}_pending`,
        status: 'pending',
        message: 'Transferência agendada para o próximo horário comercial',
        providerId: 'dock',
        timestamp: new Date().toISOString(),
      };
    }

    // Simulação de processamento bem-sucedido
    return {
      transferId: `dock_doc_${Date.now()}`,
      status: 'success',
      message: 'Transferência DOC realizada com sucesso via Dock',
      providerId: 'dock',
      timestamp: new Date().toISOString(),
    };
  }
} 
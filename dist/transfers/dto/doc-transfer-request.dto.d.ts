export declare class DocTransferRequestDto {
    amount: number;
    originBank: string;
    originAgency: string;
    originAccount: string;
    originAccountType: 'corrente' | 'poupanca';
    destinationBank: string;
    destinationAgency: string;
    destinationAccount: string;
    destinationAccountType: 'corrente' | 'poupanca';
    beneficiaryDocument: string;
    beneficiaryName: string;
    description?: string;
}

import { Address } from './Address';
import { Mosaic } from './Mosaic';
import { ReceiptType } from './ReceiptType';
import { Serializer } from './Serializer';
export interface NamespaceRentalFeeReceiptParams {
    version: number;
    type: ReceiptType;
    mosaic: Mosaic;
    senderAddress: Address;
    recipientAddress: Address;
}
export declare class NamespaceRentalFeeReceipt implements Serializer {
    readonly RECEIPT_TYPE = 4942;
    readonly version: number;
    readonly type: ReceiptType;
    readonly mosaic: Mosaic;
    readonly senderAddress: Address;
    readonly recipientAddress: Address;
    constructor({ version, type, mosaic, senderAddress, recipientAddress }: NamespaceRentalFeeReceiptParams);
    static deserialize(payload: Uint8Array): NamespaceRentalFeeReceipt;
    get size(): number;
    serialize(): Uint8Array;
}

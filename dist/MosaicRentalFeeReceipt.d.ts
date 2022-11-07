import { Address } from './Address';
import { Mosaic } from './Mosaic';
import { ReceiptType } from './ReceiptType';
import { Serializer } from './Serializer';
export interface MosaicRentalFeeReceiptParams {
    version: number;
    type: ReceiptType;
    mosaic: Mosaic;
    senderAddress: Address;
    recipientAddress: Address;
}
export declare class MosaicRentalFeeReceipt implements Serializer {
    readonly RECEIPT_TYPE = 4685;
    readonly version: number;
    readonly type: ReceiptType;
    readonly mosaic: Mosaic;
    readonly senderAddress: Address;
    readonly recipientAddress: Address;
    constructor({ version, type, mosaic, senderAddress, recipientAddress }: MosaicRentalFeeReceiptParams);
    static deserialize(payload: Uint8Array): MosaicRentalFeeReceipt;
    get size(): number;
    serialize(): Uint8Array;
}

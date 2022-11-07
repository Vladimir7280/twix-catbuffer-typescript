import { Address } from './Address';
import { Mosaic } from './Mosaic';
import { ReceiptType } from './ReceiptType';
import { Serializer } from './Serializer';
export interface LockHashExpiredFeeReceiptParams {
    version: number;
    type: ReceiptType;
    mosaic: Mosaic;
    targetAddress: Address;
}
export declare class LockHashExpiredFeeReceipt implements Serializer {
    readonly RECEIPT_TYPE = 9032;
    readonly version: number;
    readonly type: ReceiptType;
    readonly mosaic: Mosaic;
    readonly targetAddress: Address;
    constructor({ version, type, mosaic, targetAddress }: LockHashExpiredFeeReceiptParams);
    static deserialize(payload: Uint8Array): LockHashExpiredFeeReceipt;
    get size(): number;
    serialize(): Uint8Array;
}

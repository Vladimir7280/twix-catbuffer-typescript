import { Address } from './Address';
import { Mosaic } from './Mosaic';
import { ReceiptType } from './ReceiptType';
import { Serializer } from './Serializer';
export interface LockHashCreatedFeeReceiptParams {
    version: number;
    type: ReceiptType;
    mosaic: Mosaic;
    targetAddress: Address;
}
export declare class LockHashCreatedFeeReceipt implements Serializer {
    readonly RECEIPT_TYPE = 12616;
    readonly version: number;
    readonly type: ReceiptType;
    readonly mosaic: Mosaic;
    readonly targetAddress: Address;
    constructor({ version, type, mosaic, targetAddress }: LockHashCreatedFeeReceiptParams);
    static deserialize(payload: Uint8Array): LockHashCreatedFeeReceipt;
    get size(): number;
    serialize(): Uint8Array;
}

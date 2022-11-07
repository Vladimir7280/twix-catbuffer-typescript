import { Address } from './Address';
import { Mosaic } from './Mosaic';
import { ReceiptType } from './ReceiptType';
import { Serializer } from './Serializer';
export interface LockHashCompletedFeeReceiptParams {
    version: number;
    type: ReceiptType;
    mosaic: Mosaic;
    targetAddress: Address;
}
export declare class LockHashCompletedFeeReceipt implements Serializer {
    readonly RECEIPT_TYPE = 8776;
    readonly version: number;
    readonly type: ReceiptType;
    readonly mosaic: Mosaic;
    readonly targetAddress: Address;
    constructor({ version, type, mosaic, targetAddress }: LockHashCompletedFeeReceiptParams);
    static deserialize(payload: Uint8Array): LockHashCompletedFeeReceipt;
    get size(): number;
    serialize(): Uint8Array;
}

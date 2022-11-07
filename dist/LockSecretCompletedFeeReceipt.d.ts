import { Address } from './Address';
import { Mosaic } from './Mosaic';
import { ReceiptType } from './ReceiptType';
import { Serializer } from './Serializer';
export interface LockSecretCompletedFeeReceiptParams {
    version: number;
    type: ReceiptType;
    mosaic: Mosaic;
    targetAddress: Address;
}
export declare class LockSecretCompletedFeeReceipt implements Serializer {
    readonly RECEIPT_TYPE = 8786;
    readonly version: number;
    readonly type: ReceiptType;
    readonly mosaic: Mosaic;
    readonly targetAddress: Address;
    constructor({ version, type, mosaic, targetAddress }: LockSecretCompletedFeeReceiptParams);
    static deserialize(payload: Uint8Array): LockSecretCompletedFeeReceipt;
    get size(): number;
    serialize(): Uint8Array;
}

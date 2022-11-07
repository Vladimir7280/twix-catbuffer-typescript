import { Address } from './Address';
import { Mosaic } from './Mosaic';
import { ReceiptType } from './ReceiptType';
import { Serializer } from './Serializer';
export interface LockSecretExpiredFeeReceiptParams {
    version: number;
    type: ReceiptType;
    mosaic: Mosaic;
    targetAddress: Address;
}
export declare class LockSecretExpiredFeeReceipt implements Serializer {
    readonly RECEIPT_TYPE = 9042;
    readonly version: number;
    readonly type: ReceiptType;
    readonly mosaic: Mosaic;
    readonly targetAddress: Address;
    constructor({ version, type, mosaic, targetAddress }: LockSecretExpiredFeeReceiptParams);
    static deserialize(payload: Uint8Array): LockSecretExpiredFeeReceipt;
    get size(): number;
    serialize(): Uint8Array;
}

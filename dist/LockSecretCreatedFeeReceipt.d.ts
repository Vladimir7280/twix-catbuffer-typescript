import { Address } from './Address';
import { Mosaic } from './Mosaic';
import { ReceiptType } from './ReceiptType';
import { Serializer } from './Serializer';
export interface LockSecretCreatedFeeReceiptParams {
    version: number;
    type: ReceiptType;
    mosaic: Mosaic;
    targetAddress: Address;
}
export declare class LockSecretCreatedFeeReceipt implements Serializer {
    readonly RECEIPT_TYPE = 12626;
    readonly version: number;
    readonly type: ReceiptType;
    readonly mosaic: Mosaic;
    readonly targetAddress: Address;
    constructor({ version, type, mosaic, targetAddress }: LockSecretCreatedFeeReceiptParams);
    static deserialize(payload: Uint8Array): LockSecretCreatedFeeReceipt;
    get size(): number;
    serialize(): Uint8Array;
}

import { Address } from './Address';
import { Mosaic } from './Mosaic';
import { ReceiptType } from './ReceiptType';
import { Serializer } from './Serializer';
export interface HarvestFeeReceiptParams {
    version: number;
    type: ReceiptType;
    mosaic: Mosaic;
    targetAddress: Address;
}
export declare class HarvestFeeReceipt implements Serializer {
    readonly RECEIPT_TYPE = 8515;
    readonly version: number;
    readonly type: ReceiptType;
    readonly mosaic: Mosaic;
    readonly targetAddress: Address;
    constructor({ version, type, mosaic, targetAddress }: HarvestFeeReceiptParams);
    static deserialize(payload: Uint8Array): HarvestFeeReceipt;
    get size(): number;
    serialize(): Uint8Array;
}

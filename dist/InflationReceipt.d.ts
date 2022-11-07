import { Mosaic } from './Mosaic';
import { ReceiptType } from './ReceiptType';
import { Serializer } from './Serializer';
export interface InflationReceiptParams {
    version: number;
    type: ReceiptType;
    mosaic: Mosaic;
}
export declare class InflationReceipt implements Serializer {
    readonly RECEIPT_TYPE = 20803;
    readonly version: number;
    readonly type: ReceiptType;
    readonly mosaic: Mosaic;
    constructor({ version, type, mosaic }: InflationReceiptParams);
    static deserialize(payload: Uint8Array): InflationReceipt;
    get size(): number;
    serialize(): Uint8Array;
}

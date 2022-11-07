import { ReceiptType } from './ReceiptType';
import { Serializer } from './Serializer';
export interface ReceiptParams {
    version: number;
    type: ReceiptType;
}
export declare class Receipt implements Serializer {
    readonly version: number;
    readonly type: ReceiptType;
    constructor({ version, type }: ReceiptParams);
    static deserialize(payload: Uint8Array): Receipt;
    get size(): number;
    serialize(): Uint8Array;
}

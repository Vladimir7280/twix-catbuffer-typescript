import { MosaicId } from './MosaicId';
import { ReceiptType } from './ReceiptType';
import { Serializer } from './Serializer';
export interface MosaicExpiredReceiptParams {
    version: number;
    type: ReceiptType;
    artifactId: MosaicId;
}
export declare class MosaicExpiredReceipt implements Serializer {
    readonly RECEIPT_TYPE = 16717;
    readonly version: number;
    readonly type: ReceiptType;
    readonly artifactId: MosaicId;
    constructor({ version, type, artifactId }: MosaicExpiredReceiptParams);
    static deserialize(payload: Uint8Array): MosaicExpiredReceipt;
    get size(): number;
    serialize(): Uint8Array;
}

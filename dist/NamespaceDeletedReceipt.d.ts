import { NamespaceId } from './NamespaceId';
import { ReceiptType } from './ReceiptType';
import { Serializer } from './Serializer';
export interface NamespaceDeletedReceiptParams {
    version: number;
    type: ReceiptType;
    artifactId: NamespaceId;
}
export declare class NamespaceDeletedReceipt implements Serializer {
    readonly RECEIPT_TYPE = 16974;
    readonly version: number;
    readonly type: ReceiptType;
    readonly artifactId: NamespaceId;
    constructor({ version, type, artifactId }: NamespaceDeletedReceiptParams);
    static deserialize(payload: Uint8Array): NamespaceDeletedReceipt;
    get size(): number;
    serialize(): Uint8Array;
}

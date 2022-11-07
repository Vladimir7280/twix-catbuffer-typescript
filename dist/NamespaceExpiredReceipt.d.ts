import { NamespaceId } from './NamespaceId';
import { ReceiptType } from './ReceiptType';
import { Serializer } from './Serializer';
export interface NamespaceExpiredReceiptParams {
    version: number;
    type: ReceiptType;
    artifactId: NamespaceId;
}
export declare class NamespaceExpiredReceipt implements Serializer {
    readonly RECEIPT_TYPE = 16718;
    readonly version: number;
    readonly type: ReceiptType;
    readonly artifactId: NamespaceId;
    constructor({ version, type, artifactId }: NamespaceExpiredReceiptParams);
    static deserialize(payload: Uint8Array): NamespaceExpiredReceipt;
    get size(): number;
    serialize(): Uint8Array;
}

import { Serializer } from './Serializer';
export interface ReceiptSourceParams {
    primaryId: number;
    secondaryId: number;
}
export declare class ReceiptSource implements Serializer {
    readonly primaryId: number;
    readonly secondaryId: number;
    constructor({ primaryId, secondaryId }: ReceiptSourceParams);
    static deserialize(payload: Uint8Array): ReceiptSource;
    get size(): number;
    serialize(): Uint8Array;
}

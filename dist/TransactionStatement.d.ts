import { Receipt } from './Receipt';
import { Serializer } from './Serializer';
export interface TransactionStatementParams {
    primaryId: number;
    secondaryId: number;
    receipts: Receipt[];
}
export declare class TransactionStatement implements Serializer {
    readonly primaryId: number;
    readonly secondaryId: number;
    readonly receipts: Receipt[];
    constructor({ primaryId, secondaryId, receipts }: TransactionStatementParams);
    static deserialize(payload: Uint8Array): TransactionStatement;
    get size(): number;
    serialize(): Uint8Array;
}

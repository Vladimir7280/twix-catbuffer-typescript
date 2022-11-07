import { NetworkType } from './NetworkType';
import { PublicKey } from './PublicKey';
import { Serializer } from './Serializer';
import { TransactionType } from './TransactionType';
export interface EmbeddedTransactionParams {
    signerPublicKey: PublicKey;
    version: number;
    network: NetworkType;
    type: TransactionType;
}
export declare class EmbeddedTransaction implements Serializer {
    readonly signerPublicKey: PublicKey;
    readonly version: number;
    readonly network: NetworkType;
    readonly type: TransactionType;
    constructor({ signerPublicKey, version, network, type }: EmbeddedTransactionParams);
    static deserialize(payload: Uint8Array): EmbeddedTransaction;
    get size(): number;
    serialize(): Uint8Array;
}

import { Amount } from './Amount';
import { NetworkType } from './NetworkType';
import { PublicKey } from './PublicKey';
import { Serializer } from './Serializer';
import { TransactionType } from './TransactionType';
export interface EmbeddedPriceTransactionV1Params {
    signerPublicKey: PublicKey;
    version: number;
    network: NetworkType;
    type: TransactionType;
    blockheight: Amount;
    highprice: Amount;
    lowprice: Amount;
}
export declare class EmbeddedPriceTransactionV1 implements Serializer {
    readonly TRANSACTION_VERSION = 1;
    readonly TRANSACTION_TYPE = 16726;
    readonly signerPublicKey: PublicKey;
    readonly version: number;
    readonly network: NetworkType;
    readonly type: TransactionType;
    readonly blockheight: Amount;
    readonly highprice: Amount;
    readonly lowprice: Amount;
    constructor({ signerPublicKey, version, network, type, blockheight, highprice, lowprice }: EmbeddedPriceTransactionV1Params);
    static deserialize(payload: Uint8Array): EmbeddedPriceTransactionV1;
    get size(): number;
    serialize(): Uint8Array;
}

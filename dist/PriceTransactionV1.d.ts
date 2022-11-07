import { Amount } from './Amount';
import { NetworkType } from './NetworkType';
import { PublicKey } from './PublicKey';
import { Serializer } from './Serializer';
import { Signature } from './Signature';
import { Timestamp } from './Timestamp';
import { TransactionType } from './TransactionType';
export interface PriceTransactionV1Params {
    signature: Signature;
    signerPublicKey: PublicKey;
    version: number;
    network: NetworkType;
    type: TransactionType;
    fee: Amount;
    deadline: Timestamp;
    blockheight: Amount;
    highprice: Amount;
    lowprice: Amount;
}
export declare class PriceTransactionV1 implements Serializer {
    readonly TRANSACTION_VERSION = 1;
    readonly TRANSACTION_TYPE = 16726;
    readonly signature: Signature;
    readonly signerPublicKey: PublicKey;
    readonly version: number;
    readonly network: NetworkType;
    readonly type: TransactionType;
    readonly fee: Amount;
    readonly deadline: Timestamp;
    readonly blockheight: Amount;
    readonly highprice: Amount;
    readonly lowprice: Amount;
    constructor({ signature, signerPublicKey, version, network, type, fee, deadline, blockheight, highprice, lowprice, }: PriceTransactionV1Params);
    static deserialize(payload: Uint8Array): PriceTransactionV1;
    get size(): number;
    serialize(): Uint8Array;
}

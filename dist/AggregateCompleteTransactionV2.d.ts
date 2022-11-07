import { Amount } from './Amount';
import { Cosignature } from './Cosignature';
import { EmbeddedTransaction } from './EmbeddedTransaction';
import { Hash256 } from './Hash256';
import { NetworkType } from './NetworkType';
import { PublicKey } from './PublicKey';
import { Serializer } from './Serializer';
import { Signature } from './Signature';
import { Timestamp } from './Timestamp';
import { TransactionType } from './TransactionType';
export interface AggregateCompleteTransactionV2Params {
    signature: Signature;
    signerPublicKey: PublicKey;
    version: number;
    network: NetworkType;
    type: TransactionType;
    fee: Amount;
    deadline: Timestamp;
    transactionsHash: Hash256;
    transactions: EmbeddedTransaction[];
    cosignatures: Cosignature[];
}
export declare class AggregateCompleteTransactionV2 implements Serializer {
    readonly TRANSACTION_VERSION = 2;
    readonly TRANSACTION_TYPE = 16705;
    readonly signature: Signature;
    readonly signerPublicKey: PublicKey;
    readonly version: number;
    readonly network: NetworkType;
    readonly type: TransactionType;
    readonly fee: Amount;
    readonly deadline: Timestamp;
    readonly transactionsHash: Hash256;
    readonly transactions: EmbeddedTransaction[];
    readonly cosignatures: Cosignature[];
    constructor({ signature, signerPublicKey, version, network, type, fee, deadline, transactionsHash, transactions, cosignatures, }: AggregateCompleteTransactionV2Params);
    static deserialize(payload: Uint8Array): AggregateCompleteTransactionV2;
    get size(): number;
    serialize(): Uint8Array;
}

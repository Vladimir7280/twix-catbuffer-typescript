import { Amount } from './Amount';
import { MosaicSupplyChangeAction } from './MosaicSupplyChangeAction';
import { NetworkType } from './NetworkType';
import { PublicKey } from './PublicKey';
import { Serializer } from './Serializer';
import { TransactionType } from './TransactionType';
import { UnresolvedMosaicId } from './UnresolvedMosaicId';
export interface EmbeddedMosaicSupplyChangeTransactionV1Params {
    signerPublicKey: PublicKey;
    version: number;
    network: NetworkType;
    type: TransactionType;
    mosaicId: UnresolvedMosaicId;
    delta: Amount;
    action: MosaicSupplyChangeAction;
}
export declare class EmbeddedMosaicSupplyChangeTransactionV1 implements Serializer {
    readonly TRANSACTION_VERSION = 1;
    readonly TRANSACTION_TYPE = 16973;
    readonly signerPublicKey: PublicKey;
    readonly version: number;
    readonly network: NetworkType;
    readonly type: TransactionType;
    readonly mosaicId: UnresolvedMosaicId;
    readonly delta: Amount;
    readonly action: MosaicSupplyChangeAction;
    constructor({ signerPublicKey, version, network, type, mosaicId, delta, action }: EmbeddedMosaicSupplyChangeTransactionV1Params);
    static deserialize(payload: Uint8Array): EmbeddedMosaicSupplyChangeTransactionV1;
    get size(): number;
    serialize(): Uint8Array;
}

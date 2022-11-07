import { AccountKeyTypeFlags } from './AccountKeyTypeFlags';
import { AccountStateFormat } from './AccountStateFormat';
import { AccountType } from './AccountType';
import { Address } from './Address';
import { Height } from './Height';
import { HeightActivityBuckets } from './HeightActivityBuckets';
import { ImportanceSnapshot } from './ImportanceSnapshot';
import { Mosaic } from './Mosaic';
import { PinnedVotingKey } from './PinnedVotingKey';
import { PublicKey } from './PublicKey';
import { Serializer } from './Serializer';
export interface AccountStateParams {
    version: number;
    address: Address;
    addressHeight: Height;
    publicKey: PublicKey;
    publicKeyHeight: Height;
    accountType: AccountType;
    format: AccountStateFormat;
    supplementalPublicKeysMask: AccountKeyTypeFlags[];
    linkedPublicKey?: PublicKey;
    nodePublicKey?: PublicKey;
    vrfPublicKey?: PublicKey;
    votingPublicKeys: PinnedVotingKey[];
    importanceSnapshots?: ImportanceSnapshot;
    activityBuckets?: HeightActivityBuckets;
    balances: Mosaic[];
}
export declare class AccountState implements Serializer {
    readonly version: number;
    readonly address: Address;
    readonly addressHeight: Height;
    readonly publicKey: PublicKey;
    readonly publicKeyHeight: Height;
    readonly accountType: AccountType;
    readonly format: AccountStateFormat;
    readonly supplementalPublicKeysMask: AccountKeyTypeFlags[];
    readonly linkedPublicKey?: PublicKey;
    readonly nodePublicKey?: PublicKey;
    readonly vrfPublicKey?: PublicKey;
    readonly votingPublicKeys: PinnedVotingKey[];
    readonly importanceSnapshots?: ImportanceSnapshot;
    readonly activityBuckets?: HeightActivityBuckets;
    readonly balances: Mosaic[];
    constructor({ version, address, addressHeight, publicKey, publicKeyHeight, accountType, format, supplementalPublicKeysMask, linkedPublicKey, nodePublicKey, vrfPublicKey, votingPublicKeys, importanceSnapshots, activityBuckets, balances, }: AccountStateParams);
    static deserialize(payload: Uint8Array): AccountState;
    get size(): number;
    serialize(): Uint8Array;
}

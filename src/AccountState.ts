/*
 * Copyright 2021 SYMBOL
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
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
import { Utils } from './Utils';

/**
 * Interface to create instances of AccountState
 */
export interface AccountStateParams {
    /**
     * serialization version
     */
    version: number;
    /**
     * address of account
     */
    address: Address;
    /**
     * height at which address has been obtained
     */
    addressHeight: Height;
    /**
     * public key of account
     */
    publicKey: PublicKey;
    /**
     * height at which public key has been obtained
     */
    publicKeyHeight: Height;
    /**
     * type of account
     */
    accountType: AccountType;
    /**
     * account format
     */
    format: AccountStateFormat;
    /**
     * mask of supplemental public key flags
     */
    supplementalPublicKeysMask: AccountKeyTypeFlags[];
    /**
     * linked account public key
     */
    linkedPublicKey?: PublicKey;
    /**
     * node public key
     */
    nodePublicKey?: PublicKey;
    /**
     * vrf public key
     */
    vrfPublicKey?: PublicKey;
    /**
     * voting public keys
     */
    votingPublicKeys: PinnedVotingKey[];
    /**
     * current importance snapshot of the account
     */
    importanceSnapshots?: ImportanceSnapshot;
    /**
     * activity buckets of the account
     */
    activityBuckets?: HeightActivityBuckets;
    /**
     * balances of account
     */
    balances: Mosaic[];
}

/**
 * binary layout for non-historical account state
 */
export class AccountState implements Serializer {
    /**
     * serialization version
     */
    public readonly version: number;
    /**
     * address of account
     */
    public readonly address: Address;
    /**
     * height at which address has been obtained
     */
    public readonly addressHeight: Height;
    /**
     * public key of account
     */
    public readonly publicKey: PublicKey;
    /**
     * height at which public key has been obtained
     */
    public readonly publicKeyHeight: Height;
    /**
     * type of account
     */
    public readonly accountType: AccountType;
    /**
     * account format
     */
    public readonly format: AccountStateFormat;
    /**
     * mask of supplemental public key flags
     */
    public readonly supplementalPublicKeysMask: AccountKeyTypeFlags[];
    /**
     * linked account public key
     */
    public readonly linkedPublicKey?: PublicKey;
    /**
     * node public key
     */
    public readonly nodePublicKey?: PublicKey;
    /**
     * vrf public key
     */
    public readonly vrfPublicKey?: PublicKey;
    /**
     * voting public keys
     */
    public readonly votingPublicKeys: PinnedVotingKey[];
    /**
     * current importance snapshot of the account
     */
    public readonly importanceSnapshots?: ImportanceSnapshot;
    /**
     * activity buckets of the account
     */
    public readonly activityBuckets?: HeightActivityBuckets;
    /**
     * balances of account
     */
    public readonly balances: Mosaic[];

    /**
     * Constructor
     * @param version - serialization version
     * @param address - address of account
     * @param addressHeight - height at which address has been obtained
     * @param publicKey - public key of account
     * @param publicKeyHeight - height at which public key has been obtained
     * @param accountType - type of account
     * @param format - account format
     * @param supplementalPublicKeysMask - mask of supplemental public key flags
     * @param linkedPublicKey - linked account public key
     * @param nodePublicKey - node public key
     * @param vrfPublicKey - vrf public key
     * @param votingPublicKeys - voting public keys
     * @param importanceSnapshots - current importance snapshot of the account
     * @param activityBuckets - activity buckets of the account
     * @param balances - balances of account
     */
    constructor({
        version,
        address,
        addressHeight,
        publicKey,
        publicKeyHeight,
        accountType,
        format,
        supplementalPublicKeysMask,
        linkedPublicKey,
        nodePublicKey,
        vrfPublicKey,
        votingPublicKeys,
        importanceSnapshots,
        activityBuckets,
        balances,
    }: AccountStateParams) {
        this.version = version;
        this.address = address;
        this.addressHeight = addressHeight;
        this.publicKey = publicKey;
        this.publicKeyHeight = publicKeyHeight;
        this.accountType = accountType;
        this.format = format;
        this.supplementalPublicKeysMask = supplementalPublicKeysMask;
        this.linkedPublicKey = linkedPublicKey;
        this.nodePublicKey = nodePublicKey;
        this.vrfPublicKey = vrfPublicKey;
        this.votingPublicKeys = votingPublicKeys;
        this.importanceSnapshots = importanceSnapshots;
        this.activityBuckets = activityBuckets;
        this.balances = balances;
    }

    /**
     * Creates an instance of AccountState from binary payload
     * @param payload - byte payload to use to serialize the object
     * @returns Creates an instance of AccountState from binary payload
     */
    public static deserialize(payload: Uint8Array): AccountState {
        const byteArray = Array.from(payload);
        const version = Utils.bufferToUint16(Uint8Array.from(byteArray));
        byteArray.splice(0, 2);
        const address = Address.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, address.size);
        const addressHeight = Height.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, addressHeight.size);
        const publicKey = PublicKey.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, publicKey.size);
        const publicKeyHeight = Height.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, publicKeyHeight.size);
        const accountType = Utils.bufferToUint8(Uint8Array.from(byteArray));
        byteArray.splice(0, 1);
        const format = Utils.bufferToUint8(Uint8Array.from(byteArray));
        byteArray.splice(0, 1);
        const supplementalPublicKeysMask = Utils.toFlags(AccountKeyTypeFlags, Utils.bufferToUint8(Uint8Array.from(byteArray)));
        byteArray.splice(0, 1);
        const votingPublicKeysCount = Utils.bufferToUint8(Uint8Array.from(byteArray));
        byteArray.splice(0, 1);
        let linkedPublicKey: PublicKey | undefined;
        if (supplementalPublicKeysMask.indexOf(AccountKeyTypeFlags.LINKED) > -1) {
            linkedPublicKey = PublicKey.deserialize(Uint8Array.from(byteArray));
            byteArray.splice(0, linkedPublicKey.size);
        }
        let nodePublicKey: PublicKey | undefined;
        if (supplementalPublicKeysMask.indexOf(AccountKeyTypeFlags.NODE) > -1) {
            nodePublicKey = PublicKey.deserialize(Uint8Array.from(byteArray));
            byteArray.splice(0, nodePublicKey.size);
        }
        let vrfPublicKey: PublicKey | undefined;
        if (supplementalPublicKeysMask.indexOf(AccountKeyTypeFlags.VRF) > -1) {
            vrfPublicKey = PublicKey.deserialize(Uint8Array.from(byteArray));
            byteArray.splice(0, vrfPublicKey.size);
        }
        const votingPublicKeys = Utils.deserialize(PinnedVotingKey.deserialize, Uint8Array.from(byteArray), votingPublicKeysCount);
        byteArray.splice(0, votingPublicKeys.reduce((sum, c) => sum + c.size, 0));
        let importanceSnapshots: ImportanceSnapshot | undefined;
        if (format === AccountStateFormat.HIGH_VALUE) {
            importanceSnapshots = ImportanceSnapshot.deserialize(Uint8Array.from(byteArray));
            byteArray.splice(0, importanceSnapshots.size);
        }
        let activityBuckets: HeightActivityBuckets | undefined;
        if (format === AccountStateFormat.HIGH_VALUE) {
            activityBuckets = HeightActivityBuckets.deserialize(Uint8Array.from(byteArray));
            byteArray.splice(0, activityBuckets.size);
        }
        const balancesCount = Utils.bufferToUint16(Uint8Array.from(byteArray));
        byteArray.splice(0, 2);
        const balances = Utils.deserialize(Mosaic.deserialize, Uint8Array.from(byteArray), balancesCount);
        byteArray.splice(0, balances.reduce((sum, c) => sum + c.size, 0));
        return new AccountState({
            version: version,
            address: address,
            addressHeight: addressHeight,
            publicKey: publicKey,
            publicKeyHeight: publicKeyHeight,
            accountType: accountType,
            format: format,
            supplementalPublicKeysMask: supplementalPublicKeysMask,
            linkedPublicKey: linkedPublicKey,
            nodePublicKey: nodePublicKey,
            vrfPublicKey: vrfPublicKey,
            votingPublicKeys: votingPublicKeys,
            importanceSnapshots: importanceSnapshots,
            activityBuckets: activityBuckets,
            balances: balances,
        });
    }

    /**
     * Gets the size of the object
     * @returns Gets the size of the object
     */
    public get size(): number {
        let size = 0;
        size += 2; // version;
        size += this.address.size; // address;
        size += this.addressHeight.size; // addressHeight;
        size += this.publicKey.size; // publicKey;
        size += this.publicKeyHeight.size; // publicKeyHeight;
        size += 1; // accountType;
        size += 1; // format;
        size += 1; // supplementalPublicKeysMask;
        size += 1; // votingPublicKeysCount;
        if (this.supplementalPublicKeysMask.indexOf(AccountKeyTypeFlags.LINKED) > -1) {
            size += this.linkedPublicKey!.size; // linkedPublicKey;
        }
        if (this.supplementalPublicKeysMask.indexOf(AccountKeyTypeFlags.NODE) > -1) {
            size += this.nodePublicKey!.size; // nodePublicKey;
        }
        if (this.supplementalPublicKeysMask.indexOf(AccountKeyTypeFlags.VRF) > -1) {
            size += this.vrfPublicKey!.size; // vrfPublicKey;
        }
        size += this.votingPublicKeys.reduce((sum, c) => sum + Utils.getSizeWithPadding(c.size, 0), 0); // votingPublicKeys;
        if (this.format === AccountStateFormat.HIGH_VALUE) {
            size += this.importanceSnapshots!.size; // importanceSnapshots;
        }
        if (this.format === AccountStateFormat.HIGH_VALUE) {
            size += this.activityBuckets!.size; // activityBuckets;
        }
        size += 2; // balancesCount;
        size += this.balances.reduce((sum, c) => sum + Utils.getSizeWithPadding(c.size, 0), 0); // balances;
        return size;
    }

    /**
     * Serializes an object to bytes
     * @returns Serializes an object to bytes
     */
    public serialize(): Uint8Array {
        let newArray = new Uint8Array();
        const versionBytes = Utils.uint16ToBuffer(this.version);
        newArray = Utils.concatTypedArrays(newArray, versionBytes);
        const addressBytes = this.address.serialize();
        newArray = Utils.concatTypedArrays(newArray, addressBytes);
        const addressHeightBytes = this.addressHeight.serialize();
        newArray = Utils.concatTypedArrays(newArray, addressHeightBytes);
        const publicKeyBytes = this.publicKey.serialize();
        newArray = Utils.concatTypedArrays(newArray, publicKeyBytes);
        const publicKeyHeightBytes = this.publicKeyHeight.serialize();
        newArray = Utils.concatTypedArrays(newArray, publicKeyHeightBytes);
        const accountTypeBytes = Utils.uint8ToBuffer(this.accountType);
        newArray = Utils.concatTypedArrays(newArray, accountTypeBytes);
        const formatBytes = Utils.uint8ToBuffer(this.format);
        newArray = Utils.concatTypedArrays(newArray, formatBytes);
        const supplementalPublicKeysMaskBytes = Utils.uint8ToBuffer(Utils.fromFlags(AccountKeyTypeFlags, this.supplementalPublicKeysMask));
        newArray = Utils.concatTypedArrays(newArray, supplementalPublicKeysMaskBytes);
        const votingPublicKeysCountBytes = Utils.uint8ToBuffer(this.votingPublicKeys.length);
        newArray = Utils.concatTypedArrays(newArray, votingPublicKeysCountBytes);
        if (this.supplementalPublicKeysMask.indexOf(AccountKeyTypeFlags.LINKED) > -1) {
            const linkedPublicKeyBytes = this.linkedPublicKey!.serialize();
            newArray = Utils.concatTypedArrays(newArray, linkedPublicKeyBytes);
        }
        if (this.supplementalPublicKeysMask.indexOf(AccountKeyTypeFlags.NODE) > -1) {
            const nodePublicKeyBytes = this.nodePublicKey!.serialize();
            newArray = Utils.concatTypedArrays(newArray, nodePublicKeyBytes);
        }
        if (this.supplementalPublicKeysMask.indexOf(AccountKeyTypeFlags.VRF) > -1) {
            const vrfPublicKeyBytes = this.vrfPublicKey!.serialize();
            newArray = Utils.concatTypedArrays(newArray, vrfPublicKeyBytes);
        }
        const votingPublicKeysBytes = Utils.writeList(this.votingPublicKeys, 0);
        newArray = Utils.concatTypedArrays(newArray, votingPublicKeysBytes);
        if (this.format === AccountStateFormat.HIGH_VALUE) {
            const importanceSnapshotsBytes = this.importanceSnapshots!.serialize();
            newArray = Utils.concatTypedArrays(newArray, importanceSnapshotsBytes);
        }
        if (this.format === AccountStateFormat.HIGH_VALUE) {
            const activityBucketsBytes = this.activityBuckets!.serialize();
            newArray = Utils.concatTypedArrays(newArray, activityBucketsBytes);
        }
        const balancesCountBytes = Utils.uint16ToBuffer(this.balances.length);
        newArray = Utils.concatTypedArrays(newArray, balancesCountBytes);
        const balancesBytes = Utils.writeList(this.balances, 0);
        newArray = Utils.concatTypedArrays(newArray, balancesBytes);
        return newArray;
    }
}

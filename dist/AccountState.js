"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountState = void 0;
const AccountKeyTypeFlags_1 = require("./AccountKeyTypeFlags");
const AccountStateFormat_1 = require("./AccountStateFormat");
const Address_1 = require("./Address");
const Height_1 = require("./Height");
const HeightActivityBuckets_1 = require("./HeightActivityBuckets");
const ImportanceSnapshot_1 = require("./ImportanceSnapshot");
const Mosaic_1 = require("./Mosaic");
const PinnedVotingKey_1 = require("./PinnedVotingKey");
const PublicKey_1 = require("./PublicKey");
const Utils_1 = require("./Utils");
class AccountState {
    constructor({ version, address, addressHeight, publicKey, publicKeyHeight, accountType, format, supplementalPublicKeysMask, linkedPublicKey, nodePublicKey, vrfPublicKey, votingPublicKeys, importanceSnapshots, activityBuckets, balances, }) {
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
    static deserialize(payload) {
        const byteArray = Array.from(payload);
        const version = Utils_1.Utils.bufferToUint16(Uint8Array.from(byteArray));
        byteArray.splice(0, 2);
        const address = Address_1.Address.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, address.size);
        const addressHeight = Height_1.Height.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, addressHeight.size);
        const publicKey = PublicKey_1.PublicKey.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, publicKey.size);
        const publicKeyHeight = Height_1.Height.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, publicKeyHeight.size);
        const accountType = Utils_1.Utils.bufferToUint8(Uint8Array.from(byteArray));
        byteArray.splice(0, 1);
        const format = Utils_1.Utils.bufferToUint8(Uint8Array.from(byteArray));
        byteArray.splice(0, 1);
        const supplementalPublicKeysMask = Utils_1.Utils.toFlags(AccountKeyTypeFlags_1.AccountKeyTypeFlags, Utils_1.Utils.bufferToUint8(Uint8Array.from(byteArray)));
        byteArray.splice(0, 1);
        const votingPublicKeysCount = Utils_1.Utils.bufferToUint8(Uint8Array.from(byteArray));
        byteArray.splice(0, 1);
        let linkedPublicKey;
        if (supplementalPublicKeysMask.indexOf(AccountKeyTypeFlags_1.AccountKeyTypeFlags.LINKED) > -1) {
            linkedPublicKey = PublicKey_1.PublicKey.deserialize(Uint8Array.from(byteArray));
            byteArray.splice(0, linkedPublicKey.size);
        }
        let nodePublicKey;
        if (supplementalPublicKeysMask.indexOf(AccountKeyTypeFlags_1.AccountKeyTypeFlags.NODE) > -1) {
            nodePublicKey = PublicKey_1.PublicKey.deserialize(Uint8Array.from(byteArray));
            byteArray.splice(0, nodePublicKey.size);
        }
        let vrfPublicKey;
        if (supplementalPublicKeysMask.indexOf(AccountKeyTypeFlags_1.AccountKeyTypeFlags.VRF) > -1) {
            vrfPublicKey = PublicKey_1.PublicKey.deserialize(Uint8Array.from(byteArray));
            byteArray.splice(0, vrfPublicKey.size);
        }
        const votingPublicKeys = Utils_1.Utils.deserialize(PinnedVotingKey_1.PinnedVotingKey.deserialize, Uint8Array.from(byteArray), votingPublicKeysCount);
        byteArray.splice(0, votingPublicKeys.reduce((sum, c) => sum + c.size, 0));
        let importanceSnapshots;
        if (format === AccountStateFormat_1.AccountStateFormat.HIGH_VALUE) {
            importanceSnapshots = ImportanceSnapshot_1.ImportanceSnapshot.deserialize(Uint8Array.from(byteArray));
            byteArray.splice(0, importanceSnapshots.size);
        }
        let activityBuckets;
        if (format === AccountStateFormat_1.AccountStateFormat.HIGH_VALUE) {
            activityBuckets = HeightActivityBuckets_1.HeightActivityBuckets.deserialize(Uint8Array.from(byteArray));
            byteArray.splice(0, activityBuckets.size);
        }
        const balancesCount = Utils_1.Utils.bufferToUint16(Uint8Array.from(byteArray));
        byteArray.splice(0, 2);
        const balances = Utils_1.Utils.deserialize(Mosaic_1.Mosaic.deserialize, Uint8Array.from(byteArray), balancesCount);
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
    get size() {
        let size = 0;
        size += 2;
        size += this.address.size;
        size += this.addressHeight.size;
        size += this.publicKey.size;
        size += this.publicKeyHeight.size;
        size += 1;
        size += 1;
        size += 1;
        size += 1;
        if (this.supplementalPublicKeysMask.indexOf(AccountKeyTypeFlags_1.AccountKeyTypeFlags.LINKED) > -1) {
            size += this.linkedPublicKey.size;
        }
        if (this.supplementalPublicKeysMask.indexOf(AccountKeyTypeFlags_1.AccountKeyTypeFlags.NODE) > -1) {
            size += this.nodePublicKey.size;
        }
        if (this.supplementalPublicKeysMask.indexOf(AccountKeyTypeFlags_1.AccountKeyTypeFlags.VRF) > -1) {
            size += this.vrfPublicKey.size;
        }
        size += this.votingPublicKeys.reduce((sum, c) => sum + Utils_1.Utils.getSizeWithPadding(c.size, 0), 0);
        if (this.format === AccountStateFormat_1.AccountStateFormat.HIGH_VALUE) {
            size += this.importanceSnapshots.size;
        }
        if (this.format === AccountStateFormat_1.AccountStateFormat.HIGH_VALUE) {
            size += this.activityBuckets.size;
        }
        size += 2;
        size += this.balances.reduce((sum, c) => sum + Utils_1.Utils.getSizeWithPadding(c.size, 0), 0);
        return size;
    }
    serialize() {
        let newArray = new Uint8Array();
        const versionBytes = Utils_1.Utils.uint16ToBuffer(this.version);
        newArray = Utils_1.Utils.concatTypedArrays(newArray, versionBytes);
        const addressBytes = this.address.serialize();
        newArray = Utils_1.Utils.concatTypedArrays(newArray, addressBytes);
        const addressHeightBytes = this.addressHeight.serialize();
        newArray = Utils_1.Utils.concatTypedArrays(newArray, addressHeightBytes);
        const publicKeyBytes = this.publicKey.serialize();
        newArray = Utils_1.Utils.concatTypedArrays(newArray, publicKeyBytes);
        const publicKeyHeightBytes = this.publicKeyHeight.serialize();
        newArray = Utils_1.Utils.concatTypedArrays(newArray, publicKeyHeightBytes);
        const accountTypeBytes = Utils_1.Utils.uint8ToBuffer(this.accountType);
        newArray = Utils_1.Utils.concatTypedArrays(newArray, accountTypeBytes);
        const formatBytes = Utils_1.Utils.uint8ToBuffer(this.format);
        newArray = Utils_1.Utils.concatTypedArrays(newArray, formatBytes);
        const supplementalPublicKeysMaskBytes = Utils_1.Utils.uint8ToBuffer(Utils_1.Utils.fromFlags(AccountKeyTypeFlags_1.AccountKeyTypeFlags, this.supplementalPublicKeysMask));
        newArray = Utils_1.Utils.concatTypedArrays(newArray, supplementalPublicKeysMaskBytes);
        const votingPublicKeysCountBytes = Utils_1.Utils.uint8ToBuffer(this.votingPublicKeys.length);
        newArray = Utils_1.Utils.concatTypedArrays(newArray, votingPublicKeysCountBytes);
        if (this.supplementalPublicKeysMask.indexOf(AccountKeyTypeFlags_1.AccountKeyTypeFlags.LINKED) > -1) {
            const linkedPublicKeyBytes = this.linkedPublicKey.serialize();
            newArray = Utils_1.Utils.concatTypedArrays(newArray, linkedPublicKeyBytes);
        }
        if (this.supplementalPublicKeysMask.indexOf(AccountKeyTypeFlags_1.AccountKeyTypeFlags.NODE) > -1) {
            const nodePublicKeyBytes = this.nodePublicKey.serialize();
            newArray = Utils_1.Utils.concatTypedArrays(newArray, nodePublicKeyBytes);
        }
        if (this.supplementalPublicKeysMask.indexOf(AccountKeyTypeFlags_1.AccountKeyTypeFlags.VRF) > -1) {
            const vrfPublicKeyBytes = this.vrfPublicKey.serialize();
            newArray = Utils_1.Utils.concatTypedArrays(newArray, vrfPublicKeyBytes);
        }
        const votingPublicKeysBytes = Utils_1.Utils.writeList(this.votingPublicKeys, 0);
        newArray = Utils_1.Utils.concatTypedArrays(newArray, votingPublicKeysBytes);
        if (this.format === AccountStateFormat_1.AccountStateFormat.HIGH_VALUE) {
            const importanceSnapshotsBytes = this.importanceSnapshots.serialize();
            newArray = Utils_1.Utils.concatTypedArrays(newArray, importanceSnapshotsBytes);
        }
        if (this.format === AccountStateFormat_1.AccountStateFormat.HIGH_VALUE) {
            const activityBucketsBytes = this.activityBuckets.serialize();
            newArray = Utils_1.Utils.concatTypedArrays(newArray, activityBucketsBytes);
        }
        const balancesCountBytes = Utils_1.Utils.uint16ToBuffer(this.balances.length);
        newArray = Utils_1.Utils.concatTypedArrays(newArray, balancesCountBytes);
        const balancesBytes = Utils_1.Utils.writeList(this.balances, 0);
        newArray = Utils_1.Utils.concatTypedArrays(newArray, balancesBytes);
        return newArray;
    }
}
exports.AccountState = AccountState;
//# sourceMappingURL=AccountState.js.map
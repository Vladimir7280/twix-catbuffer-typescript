"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmbeddedAccountMosaicRestrictionTransactionV1 = void 0;
const AccountRestrictionFlags_1 = require("./AccountRestrictionFlags");
const PublicKey_1 = require("./PublicKey");
const UnresolvedMosaicId_1 = require("./UnresolvedMosaicId");
const Utils_1 = require("./Utils");
class EmbeddedAccountMosaicRestrictionTransactionV1 {
    constructor({ signerPublicKey, version, network, type, restrictionFlags, restrictionAdditions, restrictionDeletions, }) {
        this.TRANSACTION_VERSION = 1;
        this.TRANSACTION_TYPE = 16976;
        this.signerPublicKey = signerPublicKey;
        this.version = version;
        this.network = network;
        this.type = type;
        this.restrictionFlags = restrictionFlags;
        this.restrictionAdditions = restrictionAdditions;
        this.restrictionDeletions = restrictionDeletions;
    }
    static deserialize(payload) {
        const byteArray = Array.from(payload);
        const size = Utils_1.Utils.bufferToUint32(Uint8Array.from(byteArray));
        byteArray.splice(0, 4);
        Utils_1.Utils.bufferToUint32(Uint8Array.from(byteArray));
        byteArray.splice(0, 4);
        const signerPublicKey = PublicKey_1.PublicKey.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, signerPublicKey.size);
        Utils_1.Utils.bufferToUint32(Uint8Array.from(byteArray));
        byteArray.splice(0, 4);
        const version = Utils_1.Utils.bufferToUint8(Uint8Array.from(byteArray));
        byteArray.splice(0, 1);
        const network = Utils_1.Utils.bufferToUint8(Uint8Array.from(byteArray));
        byteArray.splice(0, 1);
        const type = Utils_1.Utils.bufferToUint16(Uint8Array.from(byteArray));
        byteArray.splice(0, 2);
        const restrictionFlags = Utils_1.Utils.toFlags(AccountRestrictionFlags_1.AccountRestrictionFlags, Utils_1.Utils.bufferToUint16(Uint8Array.from(byteArray)));
        byteArray.splice(0, 2);
        const restrictionAdditionsCount = Utils_1.Utils.bufferToUint8(Uint8Array.from(byteArray));
        byteArray.splice(0, 1);
        const restrictionDeletionsCount = Utils_1.Utils.bufferToUint8(Uint8Array.from(byteArray));
        byteArray.splice(0, 1);
        Utils_1.Utils.bufferToUint32(Uint8Array.from(byteArray));
        byteArray.splice(0, 4);
        const restrictionAdditions = Utils_1.Utils.deserialize(UnresolvedMosaicId_1.UnresolvedMosaicId.deserialize, Uint8Array.from(byteArray), restrictionAdditionsCount);
        byteArray.splice(0, restrictionAdditions.reduce((sum, c) => sum + c.size, 0));
        const restrictionDeletions = Utils_1.Utils.deserialize(UnresolvedMosaicId_1.UnresolvedMosaicId.deserialize, Uint8Array.from(byteArray), restrictionDeletionsCount);
        byteArray.splice(0, restrictionDeletions.reduce((sum, c) => sum + c.size, 0));
        return new EmbeddedAccountMosaicRestrictionTransactionV1({
            signerPublicKey: signerPublicKey,
            version: version,
            network: network,
            type: type,
            restrictionFlags: restrictionFlags,
            restrictionAdditions: restrictionAdditions,
            restrictionDeletions: restrictionDeletions,
        });
    }
    get size() {
        let size = 0;
        size += 4;
        size += 4;
        size += this.signerPublicKey.size;
        size += 4;
        size += 1;
        size += 1;
        size += 2;
        size += 2;
        size += 1;
        size += 1;
        size += 4;
        size += this.restrictionAdditions.reduce((sum, c) => sum + Utils_1.Utils.getSizeWithPadding(c.size, 0), 0);
        size += this.restrictionDeletions.reduce((sum, c) => sum + Utils_1.Utils.getSizeWithPadding(c.size, 0), 0);
        return size;
    }
    serialize() {
        let newArray = new Uint8Array();
        const sizeBytes = Utils_1.Utils.uint32ToBuffer(this.size);
        newArray = Utils_1.Utils.concatTypedArrays(newArray, sizeBytes);
        const embeddedTransactionHeaderReserved_1Bytes = Utils_1.Utils.uint32ToBuffer(0);
        newArray = Utils_1.Utils.concatTypedArrays(newArray, embeddedTransactionHeaderReserved_1Bytes);
        const signerPublicKeyBytes = this.signerPublicKey.serialize();
        newArray = Utils_1.Utils.concatTypedArrays(newArray, signerPublicKeyBytes);
        const entityBodyReserved_1Bytes = Utils_1.Utils.uint32ToBuffer(0);
        newArray = Utils_1.Utils.concatTypedArrays(newArray, entityBodyReserved_1Bytes);
        const versionBytes = Utils_1.Utils.uint8ToBuffer(this.version);
        newArray = Utils_1.Utils.concatTypedArrays(newArray, versionBytes);
        const networkBytes = Utils_1.Utils.uint8ToBuffer(this.network);
        newArray = Utils_1.Utils.concatTypedArrays(newArray, networkBytes);
        const typeBytes = Utils_1.Utils.uint16ToBuffer(this.type);
        newArray = Utils_1.Utils.concatTypedArrays(newArray, typeBytes);
        const restrictionFlagsBytes = Utils_1.Utils.uint16ToBuffer(Utils_1.Utils.fromFlags(AccountRestrictionFlags_1.AccountRestrictionFlags, this.restrictionFlags));
        newArray = Utils_1.Utils.concatTypedArrays(newArray, restrictionFlagsBytes);
        const restrictionAdditionsCountBytes = Utils_1.Utils.uint8ToBuffer(this.restrictionAdditions.length);
        newArray = Utils_1.Utils.concatTypedArrays(newArray, restrictionAdditionsCountBytes);
        const restrictionDeletionsCountBytes = Utils_1.Utils.uint8ToBuffer(this.restrictionDeletions.length);
        newArray = Utils_1.Utils.concatTypedArrays(newArray, restrictionDeletionsCountBytes);
        const accountRestrictionTransactionBodyReserved_1Bytes = Utils_1.Utils.uint32ToBuffer(0);
        newArray = Utils_1.Utils.concatTypedArrays(newArray, accountRestrictionTransactionBodyReserved_1Bytes);
        const restrictionAdditionsBytes = Utils_1.Utils.writeList(this.restrictionAdditions, 0);
        newArray = Utils_1.Utils.concatTypedArrays(newArray, restrictionAdditionsBytes);
        const restrictionDeletionsBytes = Utils_1.Utils.writeList(this.restrictionDeletions, 0);
        newArray = Utils_1.Utils.concatTypedArrays(newArray, restrictionDeletionsBytes);
        return newArray;
    }
}
exports.EmbeddedAccountMosaicRestrictionTransactionV1 = EmbeddedAccountMosaicRestrictionTransactionV1;
//# sourceMappingURL=EmbeddedAccountMosaicRestrictionTransactionV1.js.map
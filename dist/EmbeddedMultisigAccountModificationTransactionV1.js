"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmbeddedMultisigAccountModificationTransactionV1 = void 0;
const PublicKey_1 = require("./PublicKey");
const UnresolvedAddress_1 = require("./UnresolvedAddress");
const Utils_1 = require("./Utils");
class EmbeddedMultisigAccountModificationTransactionV1 {
    constructor({ signerPublicKey, version, network, type, minRemovalDelta, minApprovalDelta, addressAdditions, addressDeletions, }) {
        this.TRANSACTION_VERSION = 1;
        this.TRANSACTION_TYPE = 16725;
        this.signerPublicKey = signerPublicKey;
        this.version = version;
        this.network = network;
        this.type = type;
        this.minRemovalDelta = minRemovalDelta;
        this.minApprovalDelta = minApprovalDelta;
        this.addressAdditions = addressAdditions;
        this.addressDeletions = addressDeletions;
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
        const minRemovalDelta = Utils_1.Utils.bufferToUint8(Uint8Array.from(byteArray));
        byteArray.splice(0, 1);
        const minApprovalDelta = Utils_1.Utils.bufferToUint8(Uint8Array.from(byteArray));
        byteArray.splice(0, 1);
        const addressAdditionsCount = Utils_1.Utils.bufferToUint8(Uint8Array.from(byteArray));
        byteArray.splice(0, 1);
        const addressDeletionsCount = Utils_1.Utils.bufferToUint8(Uint8Array.from(byteArray));
        byteArray.splice(0, 1);
        Utils_1.Utils.bufferToUint32(Uint8Array.from(byteArray));
        byteArray.splice(0, 4);
        const addressAdditions = Utils_1.Utils.deserialize(UnresolvedAddress_1.UnresolvedAddress.deserialize, Uint8Array.from(byteArray), addressAdditionsCount);
        byteArray.splice(0, addressAdditions.reduce((sum, c) => sum + c.size, 0));
        const addressDeletions = Utils_1.Utils.deserialize(UnresolvedAddress_1.UnresolvedAddress.deserialize, Uint8Array.from(byteArray), addressDeletionsCount);
        byteArray.splice(0, addressDeletions.reduce((sum, c) => sum + c.size, 0));
        return new EmbeddedMultisigAccountModificationTransactionV1({
            signerPublicKey: signerPublicKey,
            version: version,
            network: network,
            type: type,
            minRemovalDelta: minRemovalDelta,
            minApprovalDelta: minApprovalDelta,
            addressAdditions: addressAdditions,
            addressDeletions: addressDeletions,
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
        size += 1;
        size += 1;
        size += 1;
        size += 1;
        size += 4;
        size += this.addressAdditions.reduce((sum, c) => sum + Utils_1.Utils.getSizeWithPadding(c.size, 0), 0);
        size += this.addressDeletions.reduce((sum, c) => sum + Utils_1.Utils.getSizeWithPadding(c.size, 0), 0);
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
        const minRemovalDeltaBytes = Utils_1.Utils.uint8ToBuffer(this.minRemovalDelta);
        newArray = Utils_1.Utils.concatTypedArrays(newArray, minRemovalDeltaBytes);
        const minApprovalDeltaBytes = Utils_1.Utils.uint8ToBuffer(this.minApprovalDelta);
        newArray = Utils_1.Utils.concatTypedArrays(newArray, minApprovalDeltaBytes);
        const addressAdditionsCountBytes = Utils_1.Utils.uint8ToBuffer(this.addressAdditions.length);
        newArray = Utils_1.Utils.concatTypedArrays(newArray, addressAdditionsCountBytes);
        const addressDeletionsCountBytes = Utils_1.Utils.uint8ToBuffer(this.addressDeletions.length);
        newArray = Utils_1.Utils.concatTypedArrays(newArray, addressDeletionsCountBytes);
        const multisigAccountModificationTransactionBodyReserved_1Bytes = Utils_1.Utils.uint32ToBuffer(0);
        newArray = Utils_1.Utils.concatTypedArrays(newArray, multisigAccountModificationTransactionBodyReserved_1Bytes);
        const addressAdditionsBytes = Utils_1.Utils.writeList(this.addressAdditions, 0);
        newArray = Utils_1.Utils.concatTypedArrays(newArray, addressAdditionsBytes);
        const addressDeletionsBytes = Utils_1.Utils.writeList(this.addressDeletions, 0);
        newArray = Utils_1.Utils.concatTypedArrays(newArray, addressDeletionsBytes);
        return newArray;
    }
}
exports.EmbeddedMultisigAccountModificationTransactionV1 = EmbeddedMultisigAccountModificationTransactionV1;
//# sourceMappingURL=EmbeddedMultisigAccountModificationTransactionV1.js.map
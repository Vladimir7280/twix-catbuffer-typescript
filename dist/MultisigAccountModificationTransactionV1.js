"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MultisigAccountModificationTransactionV1 = void 0;
const Amount_1 = require("./Amount");
const PublicKey_1 = require("./PublicKey");
const Signature_1 = require("./Signature");
const Timestamp_1 = require("./Timestamp");
const UnresolvedAddress_1 = require("./UnresolvedAddress");
const Utils_1 = require("./Utils");
class MultisigAccountModificationTransactionV1 {
    constructor({ signature, signerPublicKey, version, network, type, fee, deadline, minRemovalDelta, minApprovalDelta, addressAdditions, addressDeletions, }) {
        this.TRANSACTION_VERSION = 1;
        this.TRANSACTION_TYPE = 16725;
        this.signature = signature;
        this.signerPublicKey = signerPublicKey;
        this.version = version;
        this.network = network;
        this.type = type;
        this.fee = fee;
        this.deadline = deadline;
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
        const signature = Signature_1.Signature.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, signature.size);
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
        const fee = Amount_1.Amount.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, fee.size);
        const deadline = Timestamp_1.Timestamp.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, deadline.size);
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
        return new MultisigAccountModificationTransactionV1({
            signature: signature,
            signerPublicKey: signerPublicKey,
            version: version,
            network: network,
            type: type,
            fee: fee,
            deadline: deadline,
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
        size += this.signature.size;
        size += this.signerPublicKey.size;
        size += 4;
        size += 1;
        size += 1;
        size += 2;
        size += this.fee.size;
        size += this.deadline.size;
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
        const verifiableEntityHeaderReserved_1Bytes = Utils_1.Utils.uint32ToBuffer(0);
        newArray = Utils_1.Utils.concatTypedArrays(newArray, verifiableEntityHeaderReserved_1Bytes);
        const signatureBytes = this.signature.serialize();
        newArray = Utils_1.Utils.concatTypedArrays(newArray, signatureBytes);
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
        const feeBytes = this.fee.serialize();
        newArray = Utils_1.Utils.concatTypedArrays(newArray, feeBytes);
        const deadlineBytes = this.deadline.serialize();
        newArray = Utils_1.Utils.concatTypedArrays(newArray, deadlineBytes);
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
exports.MultisigAccountModificationTransactionV1 = MultisigAccountModificationTransactionV1;
//# sourceMappingURL=MultisigAccountModificationTransactionV1.js.map
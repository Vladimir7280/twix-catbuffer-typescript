"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NamespaceRegistrationTransactionV1 = void 0;
const Amount_1 = require("./Amount");
const BlockDuration_1 = require("./BlockDuration");
const NamespaceId_1 = require("./NamespaceId");
const NamespaceRegistrationType_1 = require("./NamespaceRegistrationType");
const PublicKey_1 = require("./PublicKey");
const Signature_1 = require("./Signature");
const Timestamp_1 = require("./Timestamp");
const Utils_1 = require("./Utils");
class NamespaceRegistrationTransactionV1 {
    constructor({ signature, signerPublicKey, version, network, type, fee, deadline, duration, parentId, id, registrationType, name, }) {
        this.TRANSACTION_VERSION = 1;
        this.TRANSACTION_TYPE = 16718;
        this.signature = signature;
        this.signerPublicKey = signerPublicKey;
        this.version = version;
        this.network = network;
        this.type = type;
        this.fee = fee;
        this.deadline = deadline;
        this.duration = duration;
        this.parentId = parentId;
        this.id = id;
        this.registrationType = registrationType;
        this.name = name;
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
        const registrationTypeBytes = Utils_1.Utils.getBytes(Uint8Array.from(byteArray), 8);
        byteArray.splice(0, 8);
        const id = NamespaceId_1.NamespaceId.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, id.size);
        const registrationType = Utils_1.Utils.bufferToUint8(Uint8Array.from(byteArray));
        byteArray.splice(0, 1);
        const nameSize = Utils_1.Utils.bufferToUint8(Uint8Array.from(byteArray));
        byteArray.splice(0, 1);
        const name = Utils_1.Utils.getBytes(Uint8Array.from(byteArray), nameSize);
        byteArray.splice(0, nameSize);
        let duration;
        if (registrationType === NamespaceRegistrationType_1.NamespaceRegistrationType.ROOT) {
            duration = BlockDuration_1.BlockDuration.deserialize(registrationTypeBytes);
        }
        let parentId;
        if (registrationType === NamespaceRegistrationType_1.NamespaceRegistrationType.CHILD) {
            parentId = NamespaceId_1.NamespaceId.deserialize(registrationTypeBytes);
        }
        return new NamespaceRegistrationTransactionV1({
            signature: signature,
            signerPublicKey: signerPublicKey,
            version: version,
            network: network,
            type: type,
            fee: fee,
            deadline: deadline,
            duration: duration,
            parentId: parentId,
            id: id,
            registrationType: registrationType,
            name: name,
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
        if (this.registrationType === NamespaceRegistrationType_1.NamespaceRegistrationType.ROOT) {
            size += this.duration.size;
        }
        if (this.registrationType === NamespaceRegistrationType_1.NamespaceRegistrationType.CHILD) {
            size += this.parentId.size;
        }
        size += this.id.size;
        size += 1;
        size += 1;
        size += this.name.length;
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
        if (this.registrationType === NamespaceRegistrationType_1.NamespaceRegistrationType.ROOT) {
            const durationBytes = this.duration.serialize();
            newArray = Utils_1.Utils.concatTypedArrays(newArray, durationBytes);
        }
        if (this.registrationType === NamespaceRegistrationType_1.NamespaceRegistrationType.CHILD) {
            const parentIdBytes = this.parentId.serialize();
            newArray = Utils_1.Utils.concatTypedArrays(newArray, parentIdBytes);
        }
        const idBytes = this.id.serialize();
        newArray = Utils_1.Utils.concatTypedArrays(newArray, idBytes);
        const registrationTypeBytes = Utils_1.Utils.uint8ToBuffer(this.registrationType);
        newArray = Utils_1.Utils.concatTypedArrays(newArray, registrationTypeBytes);
        const nameSizeBytes = Utils_1.Utils.uint8ToBuffer(this.name.length);
        newArray = Utils_1.Utils.concatTypedArrays(newArray, nameSizeBytes);
        const nameBytes = this.name;
        newArray = Utils_1.Utils.concatTypedArrays(newArray, nameBytes);
        return newArray;
    }
}
exports.NamespaceRegistrationTransactionV1 = NamespaceRegistrationTransactionV1;
//# sourceMappingURL=NamespaceRegistrationTransactionV1.js.map
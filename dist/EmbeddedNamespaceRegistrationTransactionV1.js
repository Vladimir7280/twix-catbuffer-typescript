"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmbeddedNamespaceRegistrationTransactionV1 = void 0;
const BlockDuration_1 = require("./BlockDuration");
const NamespaceId_1 = require("./NamespaceId");
const NamespaceRegistrationType_1 = require("./NamespaceRegistrationType");
const PublicKey_1 = require("./PublicKey");
const Utils_1 = require("./Utils");
class EmbeddedNamespaceRegistrationTransactionV1 {
    constructor({ signerPublicKey, version, network, type, duration, parentId, id, registrationType, name, }) {
        this.TRANSACTION_VERSION = 1;
        this.TRANSACTION_TYPE = 16718;
        this.signerPublicKey = signerPublicKey;
        this.version = version;
        this.network = network;
        this.type = type;
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
        return new EmbeddedNamespaceRegistrationTransactionV1({
            signerPublicKey: signerPublicKey,
            version: version,
            network: network,
            type: type,
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
        size += this.signerPublicKey.size;
        size += 4;
        size += 1;
        size += 1;
        size += 2;
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
exports.EmbeddedNamespaceRegistrationTransactionV1 = EmbeddedNamespaceRegistrationTransactionV1;
//# sourceMappingURL=EmbeddedNamespaceRegistrationTransactionV1.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmbeddedAddressAliasTransactionV1 = void 0;
const Address_1 = require("./Address");
const NamespaceId_1 = require("./NamespaceId");
const PublicKey_1 = require("./PublicKey");
const Utils_1 = require("./Utils");
class EmbeddedAddressAliasTransactionV1 {
    constructor({ signerPublicKey, version, network, type, namespaceId, address, aliasAction }) {
        this.TRANSACTION_VERSION = 1;
        this.TRANSACTION_TYPE = 16974;
        this.signerPublicKey = signerPublicKey;
        this.version = version;
        this.network = network;
        this.type = type;
        this.namespaceId = namespaceId;
        this.address = address;
        this.aliasAction = aliasAction;
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
        const namespaceId = NamespaceId_1.NamespaceId.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, namespaceId.size);
        const address = Address_1.Address.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, address.size);
        const aliasAction = Utils_1.Utils.bufferToUint8(Uint8Array.from(byteArray));
        byteArray.splice(0, 1);
        return new EmbeddedAddressAliasTransactionV1({
            signerPublicKey: signerPublicKey,
            version: version,
            network: network,
            type: type,
            namespaceId: namespaceId,
            address: address,
            aliasAction: aliasAction,
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
        size += this.namespaceId.size;
        size += this.address.size;
        size += 1;
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
        const namespaceIdBytes = this.namespaceId.serialize();
        newArray = Utils_1.Utils.concatTypedArrays(newArray, namespaceIdBytes);
        const addressBytes = this.address.serialize();
        newArray = Utils_1.Utils.concatTypedArrays(newArray, addressBytes);
        const aliasActionBytes = Utils_1.Utils.uint8ToBuffer(this.aliasAction);
        newArray = Utils_1.Utils.concatTypedArrays(newArray, aliasActionBytes);
        return newArray;
    }
}
exports.EmbeddedAddressAliasTransactionV1 = EmbeddedAddressAliasTransactionV1;
//# sourceMappingURL=EmbeddedAddressAliasTransactionV1.js.map
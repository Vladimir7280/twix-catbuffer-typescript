"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NamespaceExpiredReceipt = void 0;
const NamespaceId_1 = require("./NamespaceId");
const Utils_1 = require("./Utils");
class NamespaceExpiredReceipt {
    constructor({ version, type, artifactId }) {
        this.RECEIPT_TYPE = 16718;
        this.version = version;
        this.type = type;
        this.artifactId = artifactId;
    }
    static deserialize(payload) {
        const byteArray = Array.from(payload);
        const size = Utils_1.Utils.bufferToUint32(Uint8Array.from(byteArray));
        byteArray.splice(0, 4);
        const version = Utils_1.Utils.bufferToUint16(Uint8Array.from(byteArray));
        byteArray.splice(0, 2);
        const type = Utils_1.Utils.bufferToUint16(Uint8Array.from(byteArray));
        byteArray.splice(0, 2);
        const artifactId = NamespaceId_1.NamespaceId.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, artifactId.size);
        return new NamespaceExpiredReceipt({ version: version, type: type, artifactId: artifactId });
    }
    get size() {
        let size = 0;
        size += 4;
        size += 2;
        size += 2;
        size += this.artifactId.size;
        return size;
    }
    serialize() {
        let newArray = new Uint8Array();
        const sizeBytes = Utils_1.Utils.uint32ToBuffer(this.size);
        newArray = Utils_1.Utils.concatTypedArrays(newArray, sizeBytes);
        const versionBytes = Utils_1.Utils.uint16ToBuffer(this.version);
        newArray = Utils_1.Utils.concatTypedArrays(newArray, versionBytes);
        const typeBytes = Utils_1.Utils.uint16ToBuffer(this.type);
        newArray = Utils_1.Utils.concatTypedArrays(newArray, typeBytes);
        const artifactIdBytes = this.artifactId.serialize();
        newArray = Utils_1.Utils.concatTypedArrays(newArray, artifactIdBytes);
        return newArray;
    }
}
exports.NamespaceExpiredReceipt = NamespaceExpiredReceipt;
//# sourceMappingURL=NamespaceExpiredReceipt.js.map
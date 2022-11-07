"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetadataEntry = void 0;
const Address_1 = require("./Address");
const MetadataValue_1 = require("./MetadataValue");
const ScopedMetadataKey_1 = require("./ScopedMetadataKey");
const Utils_1 = require("./Utils");
class MetadataEntry {
    constructor({ version, sourceAddress, targetAddress, scopedMetadataKey, targetId, metadataType, value }) {
        this.version = version;
        this.sourceAddress = sourceAddress;
        this.targetAddress = targetAddress;
        this.scopedMetadataKey = scopedMetadataKey;
        this.targetId = targetId;
        this.metadataType = metadataType;
        this.value = value;
    }
    static deserialize(payload) {
        const byteArray = Array.from(payload);
        const version = Utils_1.Utils.bufferToUint16(Uint8Array.from(byteArray));
        byteArray.splice(0, 2);
        const sourceAddress = Address_1.Address.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, sourceAddress.size);
        const targetAddress = Address_1.Address.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, targetAddress.size);
        const scopedMetadataKey = ScopedMetadataKey_1.ScopedMetadataKey.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, scopedMetadataKey.size);
        const targetId = Utils_1.Utils.bufferToBigInt(Uint8Array.from(byteArray));
        byteArray.splice(0, 8);
        const metadataType = Utils_1.Utils.bufferToUint8(Uint8Array.from(byteArray));
        byteArray.splice(0, 1);
        const value = MetadataValue_1.MetadataValue.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, value.size);
        return new MetadataEntry({
            version: version,
            sourceAddress: sourceAddress,
            targetAddress: targetAddress,
            scopedMetadataKey: scopedMetadataKey,
            targetId: targetId,
            metadataType: metadataType,
            value: value,
        });
    }
    get size() {
        let size = 0;
        size += 2;
        size += this.sourceAddress.size;
        size += this.targetAddress.size;
        size += this.scopedMetadataKey.size;
        size += 8;
        size += 1;
        size += this.value.size;
        return size;
    }
    serialize() {
        let newArray = new Uint8Array();
        const versionBytes = Utils_1.Utils.uint16ToBuffer(this.version);
        newArray = Utils_1.Utils.concatTypedArrays(newArray, versionBytes);
        const sourceAddressBytes = this.sourceAddress.serialize();
        newArray = Utils_1.Utils.concatTypedArrays(newArray, sourceAddressBytes);
        const targetAddressBytes = this.targetAddress.serialize();
        newArray = Utils_1.Utils.concatTypedArrays(newArray, targetAddressBytes);
        const scopedMetadataKeyBytes = this.scopedMetadataKey.serialize();
        newArray = Utils_1.Utils.concatTypedArrays(newArray, scopedMetadataKeyBytes);
        const targetIdBytes = Utils_1.Utils.bigIntToBuffer(this.targetId);
        newArray = Utils_1.Utils.concatTypedArrays(newArray, targetIdBytes);
        const metadataTypeBytes = Utils_1.Utils.uint8ToBuffer(this.metadataType);
        newArray = Utils_1.Utils.concatTypedArrays(newArray, metadataTypeBytes);
        const valueBytes = this.value.serialize();
        newArray = Utils_1.Utils.concatTypedArrays(newArray, valueBytes);
        return newArray;
    }
}
exports.MetadataEntry = MetadataEntry;
//# sourceMappingURL=MetadataEntry.js.map
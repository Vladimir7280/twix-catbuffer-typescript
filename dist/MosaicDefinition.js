"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MosaicDefinition = void 0;
const Address_1 = require("./Address");
const Height_1 = require("./Height");
const MosaicProperties_1 = require("./MosaicProperties");
const Utils_1 = require("./Utils");
class MosaicDefinition {
    constructor({ startHeight, ownerAddress, revision, properties }) {
        this.startHeight = startHeight;
        this.ownerAddress = ownerAddress;
        this.revision = revision;
        this.properties = properties;
    }
    static deserialize(payload) {
        const byteArray = Array.from(payload);
        const startHeight = Height_1.Height.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, startHeight.size);
        const ownerAddress = Address_1.Address.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, ownerAddress.size);
        const revision = Utils_1.Utils.bufferToUint32(Uint8Array.from(byteArray));
        byteArray.splice(0, 4);
        const properties = MosaicProperties_1.MosaicProperties.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, properties.size);
        return new MosaicDefinition({ startHeight: startHeight, ownerAddress: ownerAddress, revision: revision, properties: properties });
    }
    get size() {
        let size = 0;
        size += this.startHeight.size;
        size += this.ownerAddress.size;
        size += 4;
        size += this.properties.size;
        return size;
    }
    serialize() {
        let newArray = new Uint8Array();
        const startHeightBytes = this.startHeight.serialize();
        newArray = Utils_1.Utils.concatTypedArrays(newArray, startHeightBytes);
        const ownerAddressBytes = this.ownerAddress.serialize();
        newArray = Utils_1.Utils.concatTypedArrays(newArray, ownerAddressBytes);
        const revisionBytes = Utils_1.Utils.uint32ToBuffer(this.revision);
        newArray = Utils_1.Utils.concatTypedArrays(newArray, revisionBytes);
        const propertiesBytes = this.properties.serialize();
        newArray = Utils_1.Utils.concatTypedArrays(newArray, propertiesBytes);
        return newArray;
    }
}
exports.MosaicDefinition = MosaicDefinition;
//# sourceMappingURL=MosaicDefinition.js.map
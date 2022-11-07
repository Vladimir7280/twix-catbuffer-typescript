"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NamespaceAlias = void 0;
const Address_1 = require("./Address");
const MosaicId_1 = require("./MosaicId");
const NamespaceAliasType_1 = require("./NamespaceAliasType");
const Utils_1 = require("./Utils");
class NamespaceAlias {
    constructor({ namespaceAliasType, mosaicAlias, addressAlias }) {
        this.namespaceAliasType = namespaceAliasType;
        this.mosaicAlias = mosaicAlias;
        this.addressAlias = addressAlias;
    }
    static deserialize(payload) {
        const byteArray = Array.from(payload);
        const namespaceAliasType = Utils_1.Utils.bufferToUint8(Uint8Array.from(byteArray));
        byteArray.splice(0, 1);
        let mosaicAlias;
        if (namespaceAliasType === NamespaceAliasType_1.NamespaceAliasType.MOSAIC_ID) {
            mosaicAlias = MosaicId_1.MosaicId.deserialize(Uint8Array.from(byteArray));
            byteArray.splice(0, mosaicAlias.size);
        }
        let addressAlias;
        if (namespaceAliasType === NamespaceAliasType_1.NamespaceAliasType.ADDRESS) {
            addressAlias = Address_1.Address.deserialize(Uint8Array.from(byteArray));
            byteArray.splice(0, addressAlias.size);
        }
        return new NamespaceAlias({ namespaceAliasType: namespaceAliasType, mosaicAlias: mosaicAlias, addressAlias: addressAlias });
    }
    get size() {
        let size = 0;
        size += 1;
        if (this.namespaceAliasType === NamespaceAliasType_1.NamespaceAliasType.MOSAIC_ID) {
            size += this.mosaicAlias.size;
        }
        if (this.namespaceAliasType === NamespaceAliasType_1.NamespaceAliasType.ADDRESS) {
            size += this.addressAlias.size;
        }
        return size;
    }
    serialize() {
        let newArray = new Uint8Array();
        const namespaceAliasTypeBytes = Utils_1.Utils.uint8ToBuffer(this.namespaceAliasType);
        newArray = Utils_1.Utils.concatTypedArrays(newArray, namespaceAliasTypeBytes);
        if (this.namespaceAliasType === NamespaceAliasType_1.NamespaceAliasType.MOSAIC_ID) {
            const mosaicAliasBytes = this.mosaicAlias.serialize();
            newArray = Utils_1.Utils.concatTypedArrays(newArray, mosaicAliasBytes);
        }
        if (this.namespaceAliasType === NamespaceAliasType_1.NamespaceAliasType.ADDRESS) {
            const addressAliasBytes = this.addressAlias.serialize();
            newArray = Utils_1.Utils.concatTypedArrays(newArray, addressAliasBytes);
        }
        return newArray;
    }
}
exports.NamespaceAlias = NamespaceAlias;
//# sourceMappingURL=NamespaceAlias.js.map
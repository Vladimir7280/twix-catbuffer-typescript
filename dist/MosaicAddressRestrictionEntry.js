"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MosaicAddressRestrictionEntry = void 0;
const Address_1 = require("./Address");
const AddressKeyValueSet_1 = require("./AddressKeyValueSet");
const MosaicId_1 = require("./MosaicId");
const Utils_1 = require("./Utils");
class MosaicAddressRestrictionEntry {
    constructor({ mosaicId, address, keyPairs }) {
        this.mosaicId = mosaicId;
        this.address = address;
        this.keyPairs = keyPairs;
    }
    static deserialize(payload) {
        const byteArray = Array.from(payload);
        const mosaicId = MosaicId_1.MosaicId.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, mosaicId.size);
        const address = Address_1.Address.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, address.size);
        const keyPairs = AddressKeyValueSet_1.AddressKeyValueSet.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, keyPairs.size);
        return new MosaicAddressRestrictionEntry({ mosaicId: mosaicId, address: address, keyPairs: keyPairs });
    }
    get size() {
        let size = 0;
        size += this.mosaicId.size;
        size += this.address.size;
        size += this.keyPairs.size;
        return size;
    }
    serialize() {
        let newArray = new Uint8Array();
        const mosaicIdBytes = this.mosaicId.serialize();
        newArray = Utils_1.Utils.concatTypedArrays(newArray, mosaicIdBytes);
        const addressBytes = this.address.serialize();
        newArray = Utils_1.Utils.concatTypedArrays(newArray, addressBytes);
        const keyPairsBytes = this.keyPairs.serialize();
        newArray = Utils_1.Utils.concatTypedArrays(newArray, keyPairsBytes);
        return newArray;
    }
}
exports.MosaicAddressRestrictionEntry = MosaicAddressRestrictionEntry;
//# sourceMappingURL=MosaicAddressRestrictionEntry.js.map
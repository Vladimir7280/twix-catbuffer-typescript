"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MosaicAddressRestrictionEntryBuilder = void 0;
const AddressDto_1 = require("./AddressDto");
const AddressKeyValueSetBuilder_1 = require("./AddressKeyValueSetBuilder");
const GeneratorUtils_1 = require("./GeneratorUtils");
const MosaicIdDto_1 = require("./MosaicIdDto");
class MosaicAddressRestrictionEntryBuilder {
    constructor(mosaicId, address, keyPairs) {
        GeneratorUtils_1.GeneratorUtils.notNull(mosaicId, 'mosaicId is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(address, 'address is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(keyPairs, 'keyPairs is null or undefined');
        this.mosaicId = mosaicId;
        this.address = address;
        this.keyPairs = keyPairs;
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const mosaicId = MosaicIdDto_1.MosaicIdDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, mosaicId.getSize());
        const address = AddressDto_1.AddressDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, address.getSize());
        const keyPairs = AddressKeyValueSetBuilder_1.AddressKeyValueSetBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, keyPairs.getSize());
        return new MosaicAddressRestrictionEntryBuilder(mosaicId, address, keyPairs);
    }
    static createMosaicAddressRestrictionEntryBuilder(mosaicId, address, keyPairs) {
        return new MosaicAddressRestrictionEntryBuilder(mosaicId, address, keyPairs);
    }
    getMosaicId() {
        return this.mosaicId;
    }
    getAddress() {
        return this.address;
    }
    getKeyPairs() {
        return this.keyPairs;
    }
    getSize() {
        let size = 0;
        size += this.mosaicId.getSize();
        size += this.address.getSize();
        size += this.keyPairs.getSize();
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const mosaicIdBytes = this.mosaicId.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, mosaicIdBytes);
        const addressBytes = this.address.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, addressBytes);
        const keyPairsBytes = this.keyPairs.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, keyPairsBytes);
        return newArray;
    }
}
exports.MosaicAddressRestrictionEntryBuilder = MosaicAddressRestrictionEntryBuilder;
//# sourceMappingURL=MosaicAddressRestrictionEntryBuilder.js.map
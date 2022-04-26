"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HashLockInfoBuilder = void 0;
const AddressDto_1 = require("./AddressDto");
const GeneratorUtils_1 = require("./GeneratorUtils");
const Hash256Dto_1 = require("./Hash256Dto");
const HeightDto_1 = require("./HeightDto");
const MosaicBuilder_1 = require("./MosaicBuilder");
const StateHeaderBuilder_1 = require("./StateHeaderBuilder");
class HashLockInfoBuilder extends StateHeaderBuilder_1.StateHeaderBuilder {
    constructor(version, ownerAddress, mosaic, endHeight, status, hash) {
        super(version);
        GeneratorUtils_1.GeneratorUtils.notNull(ownerAddress, 'ownerAddress is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(mosaic, 'mosaic is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(endHeight, 'endHeight is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(status, 'status is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(hash, 'hash is null or undefined');
        this.ownerAddress = ownerAddress;
        this.mosaic = mosaic;
        this.endHeight = endHeight;
        this.status = status;
        this.hash = hash;
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const superObject = StateHeaderBuilder_1.StateHeaderBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.getSize());
        const ownerAddress = AddressDto_1.AddressDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, ownerAddress.getSize());
        const mosaic = MosaicBuilder_1.MosaicBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, mosaic.getSize());
        const endHeight = HeightDto_1.HeightDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, endHeight.getSize());
        const status = GeneratorUtils_1.GeneratorUtils.bufferToUint8(Uint8Array.from(byteArray));
        byteArray.splice(0, 1);
        const hash = Hash256Dto_1.Hash256Dto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, hash.getSize());
        return new HashLockInfoBuilder(superObject.version, ownerAddress, mosaic, endHeight, status, hash);
    }
    static createHashLockInfoBuilder(version, ownerAddress, mosaic, endHeight, status, hash) {
        return new HashLockInfoBuilder(version, ownerAddress, mosaic, endHeight, status, hash);
    }
    getOwnerAddress() {
        return this.ownerAddress;
    }
    getMosaic() {
        return this.mosaic;
    }
    getEndHeight() {
        return this.endHeight;
    }
    getStatus() {
        return this.status;
    }
    getHash() {
        return this.hash;
    }
    getSize() {
        let size = super.getSize();
        size += this.ownerAddress.getSize();
        size += this.mosaic.getSize();
        size += this.endHeight.getSize();
        size += 1;
        size += this.hash.getSize();
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const superBytes = super.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, superBytes);
        const ownerAddressBytes = this.ownerAddress.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, ownerAddressBytes);
        const mosaicBytes = this.mosaic.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, mosaicBytes);
        const endHeightBytes = this.endHeight.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, endHeightBytes);
        const statusBytes = GeneratorUtils_1.GeneratorUtils.uint8ToBuffer(this.status);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, statusBytes);
        const hashBytes = this.hash.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, hashBytes);
        return newArray;
    }
}
exports.HashLockInfoBuilder = HashLockInfoBuilder;
//# sourceMappingURL=HashLockInfoBuilder.js.map
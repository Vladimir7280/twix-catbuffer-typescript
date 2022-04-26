"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecretLockInfoBuilder = void 0;
const AddressDto_1 = require("./AddressDto");
const GeneratorUtils_1 = require("./GeneratorUtils");
const Hash256Dto_1 = require("./Hash256Dto");
const HeightDto_1 = require("./HeightDto");
const MosaicBuilder_1 = require("./MosaicBuilder");
const StateHeaderBuilder_1 = require("./StateHeaderBuilder");
class SecretLockInfoBuilder extends StateHeaderBuilder_1.StateHeaderBuilder {
    constructor(version, ownerAddress, mosaic, endHeight, status, hashAlgorithm, secret, recipient) {
        super(version);
        GeneratorUtils_1.GeneratorUtils.notNull(ownerAddress, 'ownerAddress is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(mosaic, 'mosaic is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(endHeight, 'endHeight is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(status, 'status is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(hashAlgorithm, 'hashAlgorithm is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(secret, 'secret is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(recipient, 'recipient is null or undefined');
        this.ownerAddress = ownerAddress;
        this.mosaic = mosaic;
        this.endHeight = endHeight;
        this.status = status;
        this.hashAlgorithm = hashAlgorithm;
        this.secret = secret;
        this.recipient = recipient;
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
        const hashAlgorithm = GeneratorUtils_1.GeneratorUtils.bufferToUint8(Uint8Array.from(byteArray));
        byteArray.splice(0, 1);
        const secret = Hash256Dto_1.Hash256Dto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, secret.getSize());
        const recipient = AddressDto_1.AddressDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, recipient.getSize());
        return new SecretLockInfoBuilder(superObject.version, ownerAddress, mosaic, endHeight, status, hashAlgorithm, secret, recipient);
    }
    static createSecretLockInfoBuilder(version, ownerAddress, mosaic, endHeight, status, hashAlgorithm, secret, recipient) {
        return new SecretLockInfoBuilder(version, ownerAddress, mosaic, endHeight, status, hashAlgorithm, secret, recipient);
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
    getHashAlgorithm() {
        return this.hashAlgorithm;
    }
    getSecret() {
        return this.secret;
    }
    getRecipient() {
        return this.recipient;
    }
    getSize() {
        let size = super.getSize();
        size += this.ownerAddress.getSize();
        size += this.mosaic.getSize();
        size += this.endHeight.getSize();
        size += 1;
        size += 1;
        size += this.secret.getSize();
        size += this.recipient.getSize();
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
        const hashAlgorithmBytes = GeneratorUtils_1.GeneratorUtils.uint8ToBuffer(this.hashAlgorithm);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, hashAlgorithmBytes);
        const secretBytes = this.secret.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, secretBytes);
        const recipientBytes = this.recipient.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, recipientBytes);
        return newArray;
    }
}
exports.SecretLockInfoBuilder = SecretLockInfoBuilder;
//# sourceMappingURL=SecretLockInfoBuilder.js.map
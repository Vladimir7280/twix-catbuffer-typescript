"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MultisigEntry = void 0;
const Address_1 = require("./Address");
const Utils_1 = require("./Utils");
class MultisigEntry {
    constructor({ version, minApproval, minRemoval, accountAddress, cosignatoryAddresses, multisigAddresses }) {
        this.version = version;
        this.minApproval = minApproval;
        this.minRemoval = minRemoval;
        this.accountAddress = accountAddress;
        this.cosignatoryAddresses = cosignatoryAddresses;
        this.multisigAddresses = multisigAddresses;
    }
    static deserialize(payload) {
        const byteArray = Array.from(payload);
        const version = Utils_1.Utils.bufferToUint16(Uint8Array.from(byteArray));
        byteArray.splice(0, 2);
        const minApproval = Utils_1.Utils.bufferToUint32(Uint8Array.from(byteArray));
        byteArray.splice(0, 4);
        const minRemoval = Utils_1.Utils.bufferToUint32(Uint8Array.from(byteArray));
        byteArray.splice(0, 4);
        const accountAddress = Address_1.Address.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, accountAddress.size);
        const cosignatoryAddressesCount = Utils_1.Utils.bufferToBigInt(Uint8Array.from(byteArray));
        byteArray.splice(0, 8);
        const cosignatoryAddresses = Utils_1.Utils.deserialize(Address_1.Address.deserialize, Uint8Array.from(byteArray), cosignatoryAddressesCount);
        byteArray.splice(0, cosignatoryAddresses.reduce((sum, c) => sum + c.size, 0));
        const multisigAddressesCount = Utils_1.Utils.bufferToBigInt(Uint8Array.from(byteArray));
        byteArray.splice(0, 8);
        const multisigAddresses = Utils_1.Utils.deserialize(Address_1.Address.deserialize, Uint8Array.from(byteArray), multisigAddressesCount);
        byteArray.splice(0, multisigAddresses.reduce((sum, c) => sum + c.size, 0));
        return new MultisigEntry({
            version: version,
            minApproval: minApproval,
            minRemoval: minRemoval,
            accountAddress: accountAddress,
            cosignatoryAddresses: cosignatoryAddresses,
            multisigAddresses: multisigAddresses,
        });
    }
    get size() {
        let size = 0;
        size += 2;
        size += 4;
        size += 4;
        size += this.accountAddress.size;
        size += 8;
        size += this.cosignatoryAddresses.reduce((sum, c) => sum + Utils_1.Utils.getSizeWithPadding(c.size, 0), 0);
        size += 8;
        size += this.multisigAddresses.reduce((sum, c) => sum + Utils_1.Utils.getSizeWithPadding(c.size, 0), 0);
        return size;
    }
    serialize() {
        let newArray = new Uint8Array();
        const versionBytes = Utils_1.Utils.uint16ToBuffer(this.version);
        newArray = Utils_1.Utils.concatTypedArrays(newArray, versionBytes);
        const minApprovalBytes = Utils_1.Utils.uint32ToBuffer(this.minApproval);
        newArray = Utils_1.Utils.concatTypedArrays(newArray, minApprovalBytes);
        const minRemovalBytes = Utils_1.Utils.uint32ToBuffer(this.minRemoval);
        newArray = Utils_1.Utils.concatTypedArrays(newArray, minRemovalBytes);
        const accountAddressBytes = this.accountAddress.serialize();
        newArray = Utils_1.Utils.concatTypedArrays(newArray, accountAddressBytes);
        const cosignatoryAddressesCountBytes = Utils_1.Utils.bigIntToBuffer(this.cosignatoryAddresses.length);
        newArray = Utils_1.Utils.concatTypedArrays(newArray, cosignatoryAddressesCountBytes);
        const cosignatoryAddressesBytes = Utils_1.Utils.writeList(this.cosignatoryAddresses, 0);
        newArray = Utils_1.Utils.concatTypedArrays(newArray, cosignatoryAddressesBytes);
        const multisigAddressesCountBytes = Utils_1.Utils.bigIntToBuffer(this.multisigAddresses.length);
        newArray = Utils_1.Utils.concatTypedArrays(newArray, multisigAddressesCountBytes);
        const multisigAddressesBytes = Utils_1.Utils.writeList(this.multisigAddresses, 0);
        newArray = Utils_1.Utils.concatTypedArrays(newArray, multisigAddressesBytes);
        return newArray;
    }
}
exports.MultisigEntry = MultisigEntry;
//# sourceMappingURL=MultisigEntry.js.map
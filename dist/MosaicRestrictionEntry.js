"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MosaicRestrictionEntry = void 0;
const MosaicAddressRestrictionEntry_1 = require("./MosaicAddressRestrictionEntry");
const MosaicGlobalRestrictionEntry_1 = require("./MosaicGlobalRestrictionEntry");
const MosaicRestrictionEntryType_1 = require("./MosaicRestrictionEntryType");
const Utils_1 = require("./Utils");
class MosaicRestrictionEntry {
    constructor({ version, entryType, addressEntry, globalEntry }) {
        this.version = version;
        this.entryType = entryType;
        this.addressEntry = addressEntry;
        this.globalEntry = globalEntry;
    }
    static deserialize(payload) {
        const byteArray = Array.from(payload);
        const version = Utils_1.Utils.bufferToUint16(Uint8Array.from(byteArray));
        byteArray.splice(0, 2);
        const entryType = Utils_1.Utils.bufferToUint8(Uint8Array.from(byteArray));
        byteArray.splice(0, 1);
        let addressEntry;
        if (entryType === MosaicRestrictionEntryType_1.MosaicRestrictionEntryType.ADDRESS) {
            addressEntry = MosaicAddressRestrictionEntry_1.MosaicAddressRestrictionEntry.deserialize(Uint8Array.from(byteArray));
            byteArray.splice(0, addressEntry.size);
        }
        let globalEntry;
        if (entryType === MosaicRestrictionEntryType_1.MosaicRestrictionEntryType.GLOBAL) {
            globalEntry = MosaicGlobalRestrictionEntry_1.MosaicGlobalRestrictionEntry.deserialize(Uint8Array.from(byteArray));
            byteArray.splice(0, globalEntry.size);
        }
        return new MosaicRestrictionEntry({ version: version, entryType: entryType, addressEntry: addressEntry, globalEntry: globalEntry });
    }
    get size() {
        let size = 0;
        size += 2;
        size += 1;
        if (this.entryType === MosaicRestrictionEntryType_1.MosaicRestrictionEntryType.ADDRESS) {
            size += this.addressEntry.size;
        }
        if (this.entryType === MosaicRestrictionEntryType_1.MosaicRestrictionEntryType.GLOBAL) {
            size += this.globalEntry.size;
        }
        return size;
    }
    serialize() {
        let newArray = new Uint8Array();
        const versionBytes = Utils_1.Utils.uint16ToBuffer(this.version);
        newArray = Utils_1.Utils.concatTypedArrays(newArray, versionBytes);
        const entryTypeBytes = Utils_1.Utils.uint8ToBuffer(this.entryType);
        newArray = Utils_1.Utils.concatTypedArrays(newArray, entryTypeBytes);
        if (this.entryType === MosaicRestrictionEntryType_1.MosaicRestrictionEntryType.ADDRESS) {
            const addressEntryBytes = this.addressEntry.serialize();
            newArray = Utils_1.Utils.concatTypedArrays(newArray, addressEntryBytes);
        }
        if (this.entryType === MosaicRestrictionEntryType_1.MosaicRestrictionEntryType.GLOBAL) {
            const globalEntryBytes = this.globalEntry.serialize();
            newArray = Utils_1.Utils.concatTypedArrays(newArray, globalEntryBytes);
        }
        return newArray;
    }
}
exports.MosaicRestrictionEntry = MosaicRestrictionEntry;
//# sourceMappingURL=MosaicRestrictionEntry.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountRestrictions = void 0;
const AccountRestrictionsInfo_1 = require("./AccountRestrictionsInfo");
const Address_1 = require("./Address");
const Utils_1 = require("./Utils");
class AccountRestrictions {
    constructor({ version, address, restrictions }) {
        this.version = version;
        this.address = address;
        this.restrictions = restrictions;
    }
    static deserialize(payload) {
        const byteArray = Array.from(payload);
        const version = Utils_1.Utils.bufferToUint16(Uint8Array.from(byteArray));
        byteArray.splice(0, 2);
        const address = Address_1.Address.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, address.size);
        const restrictionsCount = Utils_1.Utils.bufferToBigInt(Uint8Array.from(byteArray));
        byteArray.splice(0, 8);
        const restrictions = Utils_1.Utils.deserialize(AccountRestrictionsInfo_1.AccountRestrictionsInfo.deserialize, Uint8Array.from(byteArray), restrictionsCount);
        byteArray.splice(0, restrictions.reduce((sum, c) => sum + c.size, 0));
        return new AccountRestrictions({ version: version, address: address, restrictions: restrictions });
    }
    get size() {
        let size = 0;
        size += 2;
        size += this.address.size;
        size += 8;
        size += this.restrictions.reduce((sum, c) => sum + Utils_1.Utils.getSizeWithPadding(c.size, 0), 0);
        return size;
    }
    serialize() {
        let newArray = new Uint8Array();
        const versionBytes = Utils_1.Utils.uint16ToBuffer(this.version);
        newArray = Utils_1.Utils.concatTypedArrays(newArray, versionBytes);
        const addressBytes = this.address.serialize();
        newArray = Utils_1.Utils.concatTypedArrays(newArray, addressBytes);
        const restrictionsCountBytes = Utils_1.Utils.bigIntToBuffer(this.restrictions.length);
        newArray = Utils_1.Utils.concatTypedArrays(newArray, restrictionsCountBytes);
        const restrictionsBytes = Utils_1.Utils.writeList(this.restrictions, 0);
        newArray = Utils_1.Utils.concatTypedArrays(newArray, restrictionsBytes);
        return newArray;
    }
}
exports.AccountRestrictions = AccountRestrictions;
//# sourceMappingURL=AccountRestrictions.js.map
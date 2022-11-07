"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnresolvedAddress = void 0;
const Utils_1 = require("./Utils");
class UnresolvedAddress {
    constructor(unresolvedAddress) {
        this.unresolvedAddress = unresolvedAddress;
    }
    static deserialize(payload) {
        const unresolvedAddress = Utils_1.Utils.getBytes(Uint8Array.from(payload), 24);
        return new UnresolvedAddress(unresolvedAddress);
    }
    get size() {
        return 24;
    }
    serialize() {
        return this.unresolvedAddress;
    }
}
exports.UnresolvedAddress = UnresolvedAddress;
//# sourceMappingURL=UnresolvedAddress.js.map
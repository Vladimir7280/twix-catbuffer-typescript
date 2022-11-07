"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Address = void 0;
const Utils_1 = require("./Utils");
class Address {
    constructor(address) {
        this.address = address;
    }
    static deserialize(payload) {
        const address = Utils_1.Utils.getBytes(Uint8Array.from(payload), 24);
        return new Address(address);
    }
    get size() {
        return 24;
    }
    serialize() {
        return this.address;
    }
}
exports.Address = Address;
//# sourceMappingURL=Address.js.map
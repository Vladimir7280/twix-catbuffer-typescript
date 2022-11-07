"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NamespaceId = void 0;
const Utils_1 = require("./Utils");
class NamespaceId {
    constructor(namespaceId) {
        this.namespaceId = namespaceId;
    }
    static deserialize(payload) {
        const namespaceId = Utils_1.Utils.bufferToBigInt(Uint8Array.from(payload));
        return new NamespaceId(namespaceId);
    }
    get size() {
        return 8;
    }
    serialize() {
        return Utils_1.Utils.bigIntToBuffer(this.namespaceId);
    }
}
exports.NamespaceId = NamespaceId;
//# sourceMappingURL=NamespaceId.js.map
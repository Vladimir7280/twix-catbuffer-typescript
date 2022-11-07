"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProofScalar = void 0;
const Utils_1 = require("./Utils");
class ProofScalar {
    constructor(proofScalar) {
        this.proofScalar = proofScalar;
    }
    static deserialize(payload) {
        const proofScalar = Utils_1.Utils.getBytes(Uint8Array.from(payload), 32);
        return new ProofScalar(proofScalar);
    }
    get size() {
        return 32;
    }
    serialize() {
        return this.proofScalar;
    }
}
exports.ProofScalar = ProofScalar;
//# sourceMappingURL=ProofScalar.js.map
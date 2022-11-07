"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProofGamma = void 0;
const Utils_1 = require("./Utils");
class ProofGamma {
    constructor(proofGamma) {
        this.proofGamma = proofGamma;
    }
    static deserialize(payload) {
        const proofGamma = Utils_1.Utils.getBytes(Uint8Array.from(payload), 32);
        return new ProofGamma(proofGamma);
    }
    get size() {
        return 32;
    }
    serialize() {
        return this.proofGamma;
    }
}
exports.ProofGamma = ProofGamma;
//# sourceMappingURL=ProofGamma.js.map
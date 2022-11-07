"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProofVerificationHash = void 0;
const Utils_1 = require("./Utils");
class ProofVerificationHash {
    constructor(proofVerificationHash) {
        this.proofVerificationHash = proofVerificationHash;
    }
    static deserialize(payload) {
        const proofVerificationHash = Utils_1.Utils.getBytes(Uint8Array.from(payload), 16);
        return new ProofVerificationHash(proofVerificationHash);
    }
    get size() {
        return 16;
    }
    serialize() {
        return this.proofVerificationHash;
    }
}
exports.ProofVerificationHash = ProofVerificationHash;
//# sourceMappingURL=ProofVerificationHash.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VotingPublicKey = void 0;
const Utils_1 = require("./Utils");
class VotingPublicKey {
    constructor(votingPublicKey) {
        this.votingPublicKey = votingPublicKey;
    }
    static deserialize(payload) {
        const votingPublicKey = Utils_1.Utils.getBytes(Uint8Array.from(payload), 32);
        return new VotingPublicKey(votingPublicKey);
    }
    get size() {
        return 32;
    }
    serialize() {
        return this.votingPublicKey;
    }
}
exports.VotingPublicKey = VotingPublicKey;
//# sourceMappingURL=VotingPublicKey.js.map
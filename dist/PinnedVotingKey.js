"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PinnedVotingKey = void 0;
const FinalizationEpoch_1 = require("./FinalizationEpoch");
const Utils_1 = require("./Utils");
const VotingPublicKey_1 = require("./VotingPublicKey");
class PinnedVotingKey {
    constructor({ votingKey, startEpoch, endEpoch }) {
        this.votingKey = votingKey;
        this.startEpoch = startEpoch;
        this.endEpoch = endEpoch;
    }
    static deserialize(payload) {
        const byteArray = Array.from(payload);
        const votingKey = VotingPublicKey_1.VotingPublicKey.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, votingKey.size);
        const startEpoch = FinalizationEpoch_1.FinalizationEpoch.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, startEpoch.size);
        const endEpoch = FinalizationEpoch_1.FinalizationEpoch.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, endEpoch.size);
        return new PinnedVotingKey({ votingKey: votingKey, startEpoch: startEpoch, endEpoch: endEpoch });
    }
    get size() {
        let size = 0;
        size += this.votingKey.size;
        size += this.startEpoch.size;
        size += this.endEpoch.size;
        return size;
    }
    serialize() {
        let newArray = new Uint8Array();
        const votingKeyBytes = this.votingKey.serialize();
        newArray = Utils_1.Utils.concatTypedArrays(newArray, votingKeyBytes);
        const startEpochBytes = this.startEpoch.serialize();
        newArray = Utils_1.Utils.concatTypedArrays(newArray, startEpochBytes);
        const endEpochBytes = this.endEpoch.serialize();
        newArray = Utils_1.Utils.concatTypedArrays(newArray, endEpochBytes);
        return newArray;
    }
}
exports.PinnedVotingKey = PinnedVotingKey;
//# sourceMappingURL=PinnedVotingKey.js.map
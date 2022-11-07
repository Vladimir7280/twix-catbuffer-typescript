"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FinalizedBlockHeader = void 0;
const FinalizationRound_1 = require("./FinalizationRound");
const Hash256_1 = require("./Hash256");
const Height_1 = require("./Height");
const Utils_1 = require("./Utils");
class FinalizedBlockHeader {
    constructor({ round, height, hash }) {
        this.round = round;
        this.height = height;
        this.hash = hash;
    }
    static deserialize(payload) {
        const byteArray = Array.from(payload);
        const round = FinalizationRound_1.FinalizationRound.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, round.size);
        const height = Height_1.Height.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, height.size);
        const hash = Hash256_1.Hash256.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, hash.size);
        return new FinalizedBlockHeader({ round: round, height: height, hash: hash });
    }
    get size() {
        let size = 0;
        size += this.round.size;
        size += this.height.size;
        size += this.hash.size;
        return size;
    }
    serialize() {
        let newArray = new Uint8Array();
        const roundBytes = this.round.serialize();
        newArray = Utils_1.Utils.concatTypedArrays(newArray, roundBytes);
        const heightBytes = this.height.serialize();
        newArray = Utils_1.Utils.concatTypedArrays(newArray, heightBytes);
        const hashBytes = this.hash.serialize();
        newArray = Utils_1.Utils.concatTypedArrays(newArray, hashBytes);
        return newArray;
    }
}
exports.FinalizedBlockHeader = FinalizedBlockHeader;
//# sourceMappingURL=FinalizedBlockHeader.js.map
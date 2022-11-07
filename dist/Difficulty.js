"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Difficulty = void 0;
const Utils_1 = require("./Utils");
class Difficulty {
    constructor(difficulty) {
        this.difficulty = difficulty;
    }
    static deserialize(payload) {
        const difficulty = Utils_1.Utils.bufferToBigInt(Uint8Array.from(payload));
        return new Difficulty(difficulty);
    }
    get size() {
        return 8;
    }
    serialize() {
        return Utils_1.Utils.bigIntToBuffer(this.difficulty);
    }
}
exports.Difficulty = Difficulty;
//# sourceMappingURL=Difficulty.js.map
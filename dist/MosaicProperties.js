"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MosaicProperties = void 0;
const BlockDuration_1 = require("./BlockDuration");
const MosaicFlags_1 = require("./MosaicFlags");
const Utils_1 = require("./Utils");
class MosaicProperties {
    constructor({ flags, divisibility, duration }) {
        this.flags = flags;
        this.divisibility = divisibility;
        this.duration = duration;
    }
    static deserialize(payload) {
        const byteArray = Array.from(payload);
        const flags = Utils_1.Utils.toFlags(MosaicFlags_1.MosaicFlags, Utils_1.Utils.bufferToUint8(Uint8Array.from(byteArray)));
        byteArray.splice(0, 1);
        const divisibility = Utils_1.Utils.bufferToUint8(Uint8Array.from(byteArray));
        byteArray.splice(0, 1);
        const duration = BlockDuration_1.BlockDuration.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, duration.size);
        return new MosaicProperties({ flags: flags, divisibility: divisibility, duration: duration });
    }
    get size() {
        let size = 0;
        size += 1;
        size += 1;
        size += this.duration.size;
        return size;
    }
    serialize() {
        let newArray = new Uint8Array();
        const flagsBytes = Utils_1.Utils.uint8ToBuffer(Utils_1.Utils.fromFlags(MosaicFlags_1.MosaicFlags, this.flags));
        newArray = Utils_1.Utils.concatTypedArrays(newArray, flagsBytes);
        const divisibilityBytes = Utils_1.Utils.uint8ToBuffer(this.divisibility);
        newArray = Utils_1.Utils.concatTypedArrays(newArray, divisibilityBytes);
        const durationBytes = this.duration.serialize();
        newArray = Utils_1.Utils.concatTypedArrays(newArray, durationBytes);
        return newArray;
    }
}
exports.MosaicProperties = MosaicProperties;
//# sourceMappingURL=MosaicProperties.js.map
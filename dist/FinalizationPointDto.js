"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FinalizationPointDto = void 0;
const GeneratorUtils_1 = require("./GeneratorUtils");
class FinalizationPointDto {
    constructor(finalizationPoint) {
        this.finalizationPoint = finalizationPoint;
    }
    static loadFromBinary(payload) {
        const finalizationPoint = GeneratorUtils_1.GeneratorUtils.bufferToUint32(Uint8Array.from(payload));
        return new FinalizationPointDto(finalizationPoint);
    }
    getFinalizationPoint() {
        return this.finalizationPoint;
    }
    getSize() {
        return 4;
    }
    serialize() {
        return GeneratorUtils_1.GeneratorUtils.uint32ToBuffer(this.getFinalizationPoint());
    }
}
exports.FinalizationPointDto = FinalizationPointDto;
//# sourceMappingURL=FinalizationPointDto.js.map
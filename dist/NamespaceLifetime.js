"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NamespaceLifetime = void 0;
const Height_1 = require("./Height");
const Utils_1 = require("./Utils");
class NamespaceLifetime {
    constructor({ lifetimeStart, lifetimeEnd }) {
        this.lifetimeStart = lifetimeStart;
        this.lifetimeEnd = lifetimeEnd;
    }
    static deserialize(payload) {
        const byteArray = Array.from(payload);
        const lifetimeStart = Height_1.Height.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, lifetimeStart.size);
        const lifetimeEnd = Height_1.Height.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, lifetimeEnd.size);
        return new NamespaceLifetime({ lifetimeStart: lifetimeStart, lifetimeEnd: lifetimeEnd });
    }
    get size() {
        let size = 0;
        size += this.lifetimeStart.size;
        size += this.lifetimeEnd.size;
        return size;
    }
    serialize() {
        let newArray = new Uint8Array();
        const lifetimeStartBytes = this.lifetimeStart.serialize();
        newArray = Utils_1.Utils.concatTypedArrays(newArray, lifetimeStartBytes);
        const lifetimeEndBytes = this.lifetimeEnd.serialize();
        newArray = Utils_1.Utils.concatTypedArrays(newArray, lifetimeEndBytes);
        return newArray;
    }
}
exports.NamespaceLifetime = NamespaceLifetime;
//# sourceMappingURL=NamespaceLifetime.js.map
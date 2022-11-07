"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NamespacePath = void 0;
const NamespaceAlias_1 = require("./NamespaceAlias");
const NamespaceId_1 = require("./NamespaceId");
const Utils_1 = require("./Utils");
class NamespacePath {
    constructor({ path, alias }) {
        this.path = path;
        this.alias = alias;
    }
    static deserialize(payload) {
        const byteArray = Array.from(payload);
        const pathSize = Utils_1.Utils.bufferToUint8(Uint8Array.from(byteArray));
        byteArray.splice(0, 1);
        const path = Utils_1.Utils.deserialize(NamespaceId_1.NamespaceId.deserialize, Uint8Array.from(byteArray), pathSize);
        byteArray.splice(0, path.reduce((sum, c) => sum + c.size, 0));
        const alias = NamespaceAlias_1.NamespaceAlias.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, alias.size);
        return new NamespacePath({ path: path, alias: alias });
    }
    get size() {
        let size = 0;
        size += 1;
        size += this.path.reduce((sum, c) => sum + Utils_1.Utils.getSizeWithPadding(c.size, 0), 0);
        size += this.alias.size;
        return size;
    }
    serialize() {
        let newArray = new Uint8Array();
        const pathSizeBytes = Utils_1.Utils.uint8ToBuffer(this.path.length);
        newArray = Utils_1.Utils.concatTypedArrays(newArray, pathSizeBytes);
        const pathBytes = Utils_1.Utils.writeList(this.path, 0);
        newArray = Utils_1.Utils.concatTypedArrays(newArray, pathBytes);
        const aliasBytes = this.alias.serialize();
        newArray = Utils_1.Utils.concatTypedArrays(newArray, aliasBytes);
        return newArray;
    }
}
exports.NamespacePath = NamespacePath;
//# sourceMappingURL=NamespacePath.js.map
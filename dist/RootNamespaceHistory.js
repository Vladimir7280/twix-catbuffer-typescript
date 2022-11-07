"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RootNamespaceHistory = void 0;
const Address_1 = require("./Address");
const NamespaceAlias_1 = require("./NamespaceAlias");
const NamespaceId_1 = require("./NamespaceId");
const NamespaceLifetime_1 = require("./NamespaceLifetime");
const NamespacePath_1 = require("./NamespacePath");
const Utils_1 = require("./Utils");
class RootNamespaceHistory {
    constructor({ version, id, ownerAddress, lifetime, rootAlias, paths }) {
        this.version = version;
        this.id = id;
        this.ownerAddress = ownerAddress;
        this.lifetime = lifetime;
        this.rootAlias = rootAlias;
        this.paths = paths;
    }
    static deserialize(payload) {
        const byteArray = Array.from(payload);
        const version = Utils_1.Utils.bufferToUint16(Uint8Array.from(byteArray));
        byteArray.splice(0, 2);
        const id = NamespaceId_1.NamespaceId.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, id.size);
        const ownerAddress = Address_1.Address.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, ownerAddress.size);
        const lifetime = NamespaceLifetime_1.NamespaceLifetime.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, lifetime.size);
        const rootAlias = NamespaceAlias_1.NamespaceAlias.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, rootAlias.size);
        const childrenCount = Utils_1.Utils.bufferToBigInt(Uint8Array.from(byteArray));
        byteArray.splice(0, 8);
        const paths = Utils_1.Utils.deserialize(NamespacePath_1.NamespacePath.deserialize, Uint8Array.from(byteArray), childrenCount);
        byteArray.splice(0, paths.reduce((sum, c) => sum + c.size, 0));
        return new RootNamespaceHistory({
            version: version,
            id: id,
            ownerAddress: ownerAddress,
            lifetime: lifetime,
            rootAlias: rootAlias,
            paths: paths,
        });
    }
    get size() {
        let size = 0;
        size += 2;
        size += this.id.size;
        size += this.ownerAddress.size;
        size += this.lifetime.size;
        size += this.rootAlias.size;
        size += 8;
        size += this.paths.reduce((sum, c) => sum + Utils_1.Utils.getSizeWithPadding(c.size, 0), 0);
        return size;
    }
    serialize() {
        let newArray = new Uint8Array();
        const versionBytes = Utils_1.Utils.uint16ToBuffer(this.version);
        newArray = Utils_1.Utils.concatTypedArrays(newArray, versionBytes);
        const idBytes = this.id.serialize();
        newArray = Utils_1.Utils.concatTypedArrays(newArray, idBytes);
        const ownerAddressBytes = this.ownerAddress.serialize();
        newArray = Utils_1.Utils.concatTypedArrays(newArray, ownerAddressBytes);
        const lifetimeBytes = this.lifetime.serialize();
        newArray = Utils_1.Utils.concatTypedArrays(newArray, lifetimeBytes);
        const rootAliasBytes = this.rootAlias.serialize();
        newArray = Utils_1.Utils.concatTypedArrays(newArray, rootAliasBytes);
        const childrenCountBytes = Utils_1.Utils.bigIntToBuffer(this.paths.length);
        newArray = Utils_1.Utils.concatTypedArrays(newArray, childrenCountBytes);
        const pathsBytes = Utils_1.Utils.writeList(this.paths, 0);
        newArray = Utils_1.Utils.concatTypedArrays(newArray, pathsBytes);
        return newArray;
    }
}
exports.RootNamespaceHistory = RootNamespaceHistory;
//# sourceMappingURL=RootNamespaceHistory.js.map
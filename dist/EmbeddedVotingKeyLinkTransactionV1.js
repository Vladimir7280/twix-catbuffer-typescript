"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmbeddedVotingKeyLinkTransactionV1 = void 0;
const FinalizationEpoch_1 = require("./FinalizationEpoch");
const PublicKey_1 = require("./PublicKey");
const Utils_1 = require("./Utils");
const VotingPublicKey_1 = require("./VotingPublicKey");
class EmbeddedVotingKeyLinkTransactionV1 {
    constructor({ signerPublicKey, version, network, type, linkedPublicKey, startEpoch, endEpoch, linkAction, }) {
        this.TRANSACTION_VERSION = 1;
        this.TRANSACTION_TYPE = 16707;
        this.signerPublicKey = signerPublicKey;
        this.version = version;
        this.network = network;
        this.type = type;
        this.linkedPublicKey = linkedPublicKey;
        this.startEpoch = startEpoch;
        this.endEpoch = endEpoch;
        this.linkAction = linkAction;
    }
    static deserialize(payload) {
        const byteArray = Array.from(payload);
        const size = Utils_1.Utils.bufferToUint32(Uint8Array.from(byteArray));
        byteArray.splice(0, 4);
        Utils_1.Utils.bufferToUint32(Uint8Array.from(byteArray));
        byteArray.splice(0, 4);
        const signerPublicKey = PublicKey_1.PublicKey.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, signerPublicKey.size);
        Utils_1.Utils.bufferToUint32(Uint8Array.from(byteArray));
        byteArray.splice(0, 4);
        const version = Utils_1.Utils.bufferToUint8(Uint8Array.from(byteArray));
        byteArray.splice(0, 1);
        const network = Utils_1.Utils.bufferToUint8(Uint8Array.from(byteArray));
        byteArray.splice(0, 1);
        const type = Utils_1.Utils.bufferToUint16(Uint8Array.from(byteArray));
        byteArray.splice(0, 2);
        const linkedPublicKey = VotingPublicKey_1.VotingPublicKey.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, linkedPublicKey.size);
        const startEpoch = FinalizationEpoch_1.FinalizationEpoch.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, startEpoch.size);
        const endEpoch = FinalizationEpoch_1.FinalizationEpoch.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, endEpoch.size);
        const linkAction = Utils_1.Utils.bufferToUint8(Uint8Array.from(byteArray));
        byteArray.splice(0, 1);
        return new EmbeddedVotingKeyLinkTransactionV1({
            signerPublicKey: signerPublicKey,
            version: version,
            network: network,
            type: type,
            linkedPublicKey: linkedPublicKey,
            startEpoch: startEpoch,
            endEpoch: endEpoch,
            linkAction: linkAction,
        });
    }
    get size() {
        let size = 0;
        size += 4;
        size += 4;
        size += this.signerPublicKey.size;
        size += 4;
        size += 1;
        size += 1;
        size += 2;
        size += this.linkedPublicKey.size;
        size += this.startEpoch.size;
        size += this.endEpoch.size;
        size += 1;
        return size;
    }
    serialize() {
        let newArray = new Uint8Array();
        const sizeBytes = Utils_1.Utils.uint32ToBuffer(this.size);
        newArray = Utils_1.Utils.concatTypedArrays(newArray, sizeBytes);
        const embeddedTransactionHeaderReserved_1Bytes = Utils_1.Utils.uint32ToBuffer(0);
        newArray = Utils_1.Utils.concatTypedArrays(newArray, embeddedTransactionHeaderReserved_1Bytes);
        const signerPublicKeyBytes = this.signerPublicKey.serialize();
        newArray = Utils_1.Utils.concatTypedArrays(newArray, signerPublicKeyBytes);
        const entityBodyReserved_1Bytes = Utils_1.Utils.uint32ToBuffer(0);
        newArray = Utils_1.Utils.concatTypedArrays(newArray, entityBodyReserved_1Bytes);
        const versionBytes = Utils_1.Utils.uint8ToBuffer(this.version);
        newArray = Utils_1.Utils.concatTypedArrays(newArray, versionBytes);
        const networkBytes = Utils_1.Utils.uint8ToBuffer(this.network);
        newArray = Utils_1.Utils.concatTypedArrays(newArray, networkBytes);
        const typeBytes = Utils_1.Utils.uint16ToBuffer(this.type);
        newArray = Utils_1.Utils.concatTypedArrays(newArray, typeBytes);
        const linkedPublicKeyBytes = this.linkedPublicKey.serialize();
        newArray = Utils_1.Utils.concatTypedArrays(newArray, linkedPublicKeyBytes);
        const startEpochBytes = this.startEpoch.serialize();
        newArray = Utils_1.Utils.concatTypedArrays(newArray, startEpochBytes);
        const endEpochBytes = this.endEpoch.serialize();
        newArray = Utils_1.Utils.concatTypedArrays(newArray, endEpochBytes);
        const linkActionBytes = Utils_1.Utils.uint8ToBuffer(this.linkAction);
        newArray = Utils_1.Utils.concatTypedArrays(newArray, linkActionBytes);
        return newArray;
    }
}
exports.EmbeddedVotingKeyLinkTransactionV1 = EmbeddedVotingKeyLinkTransactionV1;
//# sourceMappingURL=EmbeddedVotingKeyLinkTransactionV1.js.map
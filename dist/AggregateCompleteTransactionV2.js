"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AggregateCompleteTransactionV2 = void 0;
const Amount_1 = require("./Amount");
const Cosignature_1 = require("./Cosignature");
const Hash256_1 = require("./Hash256");
const PublicKey_1 = require("./PublicKey");
const Signature_1 = require("./Signature");
const Timestamp_1 = require("./Timestamp");
const Utils_1 = require("./Utils");
const EmbeddedTransactionHelper_1 = require("./EmbeddedTransactionHelper");
class AggregateCompleteTransactionV2 {
    constructor({ signature, signerPublicKey, version, network, type, fee, deadline, transactionsHash, transactions, cosignatures, }) {
        this.TRANSACTION_VERSION = 2;
        this.TRANSACTION_TYPE = 16705;
        this.signature = signature;
        this.signerPublicKey = signerPublicKey;
        this.version = version;
        this.network = network;
        this.type = type;
        this.fee = fee;
        this.deadline = deadline;
        this.transactionsHash = transactionsHash;
        this.transactions = transactions;
        this.cosignatures = cosignatures;
    }
    static deserialize(payload) {
        const byteArray = Array.from(payload);
        const size = Utils_1.Utils.bufferToUint32(Uint8Array.from(byteArray));
        byteArray.splice(0, 4);
        Utils_1.Utils.bufferToUint32(Uint8Array.from(byteArray));
        byteArray.splice(0, 4);
        const signature = Signature_1.Signature.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, signature.size);
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
        const fee = Amount_1.Amount.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, fee.size);
        const deadline = Timestamp_1.Timestamp.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, deadline.size);
        const transactionsHash = Hash256_1.Hash256.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, transactionsHash.size);
        const payloadSize = Utils_1.Utils.bufferToUint32(Uint8Array.from(byteArray));
        byteArray.splice(0, 4);
        Utils_1.Utils.bufferToUint32(Uint8Array.from(byteArray));
        byteArray.splice(0, 4);
        const transactions = Utils_1.Utils.deserializeRemaining(EmbeddedTransactionHelper_1.EmbeddedTransactionHelper.deserialize, Uint8Array.from(byteArray), payloadSize, 8);
        byteArray.splice(0, transactions.reduce((sum, c) => sum + Utils_1.Utils.getSizeWithPadding(c.size, 8), 0));
        const cosignatures = Utils_1.Utils.deserializeRemaining(Cosignature_1.Cosignature.deserialize, Uint8Array.from(byteArray), byteArray.length, 0);
        byteArray.splice(0, cosignatures.reduce((sum, c) => sum + Utils_1.Utils.getSizeWithPadding(c.size, 0), 0));
        return new AggregateCompleteTransactionV2({
            signature: signature,
            signerPublicKey: signerPublicKey,
            version: version,
            network: network,
            type: type,
            fee: fee,
            deadline: deadline,
            transactionsHash: transactionsHash,
            transactions: transactions,
            cosignatures: cosignatures,
        });
    }
    get size() {
        let size = 0;
        size += 4;
        size += 4;
        size += this.signature.size;
        size += this.signerPublicKey.size;
        size += 4;
        size += 1;
        size += 1;
        size += 2;
        size += this.fee.size;
        size += this.deadline.size;
        size += this.transactionsHash.size;
        size += 4;
        size += 4;
        size += this.transactions.reduce((sum, c) => sum + Utils_1.Utils.getSizeWithPadding(c.size, 8), 0);
        size += this.cosignatures.reduce((sum, c) => sum + Utils_1.Utils.getSizeWithPadding(c.size, 0), 0);
        return size;
    }
    serialize() {
        let newArray = new Uint8Array();
        const sizeBytes = Utils_1.Utils.uint32ToBuffer(this.size);
        newArray = Utils_1.Utils.concatTypedArrays(newArray, sizeBytes);
        const verifiableEntityHeaderReserved_1Bytes = Utils_1.Utils.uint32ToBuffer(0);
        newArray = Utils_1.Utils.concatTypedArrays(newArray, verifiableEntityHeaderReserved_1Bytes);
        const signatureBytes = this.signature.serialize();
        newArray = Utils_1.Utils.concatTypedArrays(newArray, signatureBytes);
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
        const feeBytes = this.fee.serialize();
        newArray = Utils_1.Utils.concatTypedArrays(newArray, feeBytes);
        const deadlineBytes = this.deadline.serialize();
        newArray = Utils_1.Utils.concatTypedArrays(newArray, deadlineBytes);
        const transactionsHashBytes = this.transactionsHash.serialize();
        newArray = Utils_1.Utils.concatTypedArrays(newArray, transactionsHashBytes);
        const payloadSize = this.transactions.reduce((sum, c) => sum + Utils_1.Utils.getSizeWithPadding(c.size, 8), 0);
        const payloadSizeBytes = Utils_1.Utils.uint32ToBuffer(payloadSize);
        newArray = Utils_1.Utils.concatTypedArrays(newArray, payloadSizeBytes);
        const aggregateTransactionHeaderReserved_1Bytes = Utils_1.Utils.uint32ToBuffer(0);
        newArray = Utils_1.Utils.concatTypedArrays(newArray, aggregateTransactionHeaderReserved_1Bytes);
        const transactionsBytes = Utils_1.Utils.writeList(this.transactions, 8);
        newArray = Utils_1.Utils.concatTypedArrays(newArray, transactionsBytes);
        const cosignaturesBytes = Utils_1.Utils.writeList(this.cosignatures, 0);
        newArray = Utils_1.Utils.concatTypedArrays(newArray, cosignaturesBytes);
        return newArray;
    }
}
exports.AggregateCompleteTransactionV2 = AggregateCompleteTransactionV2;
//# sourceMappingURL=AggregateCompleteTransactionV2.js.map
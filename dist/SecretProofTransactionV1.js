"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecretProofTransactionV1 = void 0;
const Amount_1 = require("./Amount");
const Hash256_1 = require("./Hash256");
const PublicKey_1 = require("./PublicKey");
const Signature_1 = require("./Signature");
const Timestamp_1 = require("./Timestamp");
const UnresolvedAddress_1 = require("./UnresolvedAddress");
const Utils_1 = require("./Utils");
class SecretProofTransactionV1 {
    constructor({ signature, signerPublicKey, version, network, type, fee, deadline, recipientAddress, secret, hashAlgorithm, proof, }) {
        this.TRANSACTION_VERSION = 1;
        this.TRANSACTION_TYPE = 16978;
        this.signature = signature;
        this.signerPublicKey = signerPublicKey;
        this.version = version;
        this.network = network;
        this.type = type;
        this.fee = fee;
        this.deadline = deadline;
        this.recipientAddress = recipientAddress;
        this.secret = secret;
        this.hashAlgorithm = hashAlgorithm;
        this.proof = proof;
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
        const recipientAddress = UnresolvedAddress_1.UnresolvedAddress.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, recipientAddress.size);
        const secret = Hash256_1.Hash256.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, secret.size);
        const proofSize = Utils_1.Utils.bufferToUint16(Uint8Array.from(byteArray));
        byteArray.splice(0, 2);
        const hashAlgorithm = Utils_1.Utils.bufferToUint8(Uint8Array.from(byteArray));
        byteArray.splice(0, 1);
        const proof = Utils_1.Utils.getBytes(Uint8Array.from(byteArray), proofSize);
        byteArray.splice(0, proofSize);
        return new SecretProofTransactionV1({
            signature: signature,
            signerPublicKey: signerPublicKey,
            version: version,
            network: network,
            type: type,
            fee: fee,
            deadline: deadline,
            recipientAddress: recipientAddress,
            secret: secret,
            hashAlgorithm: hashAlgorithm,
            proof: proof,
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
        size += this.recipientAddress.size;
        size += this.secret.size;
        size += 2;
        size += 1;
        size += this.proof.length;
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
        const recipientAddressBytes = this.recipientAddress.serialize();
        newArray = Utils_1.Utils.concatTypedArrays(newArray, recipientAddressBytes);
        const secretBytes = this.secret.serialize();
        newArray = Utils_1.Utils.concatTypedArrays(newArray, secretBytes);
        const proofSizeBytes = Utils_1.Utils.uint16ToBuffer(this.proof.length);
        newArray = Utils_1.Utils.concatTypedArrays(newArray, proofSizeBytes);
        const hashAlgorithmBytes = Utils_1.Utils.uint8ToBuffer(this.hashAlgorithm);
        newArray = Utils_1.Utils.concatTypedArrays(newArray, hashAlgorithmBytes);
        const proofBytes = this.proof;
        newArray = Utils_1.Utils.concatTypedArrays(newArray, proofBytes);
        return newArray;
    }
}
exports.SecretProofTransactionV1 = SecretProofTransactionV1;
//# sourceMappingURL=SecretProofTransactionV1.js.map
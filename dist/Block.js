"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Block = void 0;
const Address_1 = require("./Address");
const BlockCollectedEpochFees_1 = require("./BlockCollectedEpochFees");
const BlockFeeMultiplier_1 = require("./BlockFeeMultiplier");
const BlockFeeToPay_1 = require("./BlockFeeToPay");
const BlockInflation_1 = require("./BlockInflation");
const BlockInflationMultiplier_1 = require("./BlockInflationMultiplier");
const BlockTotalSupply_1 = require("./BlockTotalSupply");
const Difficulty_1 = require("./Difficulty");
const Hash256_1 = require("./Hash256");
const Height_1 = require("./Height");
const PublicKey_1 = require("./PublicKey");
const Signature_1 = require("./Signature");
const Timestamp_1 = require("./Timestamp");
const Utils_1 = require("./Utils");
const VrfProof_1 = require("./VrfProof");
class Block {
    constructor({ signature, signerPublicKey, version, network, type, height, timestamp, difficulty, generationHashProof, previousBlockHash, transactionsHash, receiptsHash, stateHash, beneficiaryAddress, feeMultiplier, totalSupply, feeTopay, inflation, collectedEpochFees, inflationMultiplier, }) {
        this.signature = signature;
        this.signerPublicKey = signerPublicKey;
        this.version = version;
        this.network = network;
        this.type = type;
        this.height = height;
        this.timestamp = timestamp;
        this.difficulty = difficulty;
        this.generationHashProof = generationHashProof;
        this.previousBlockHash = previousBlockHash;
        this.transactionsHash = transactionsHash;
        this.receiptsHash = receiptsHash;
        this.stateHash = stateHash;
        this.beneficiaryAddress = beneficiaryAddress;
        this.feeMultiplier = feeMultiplier;
        this.totalSupply = totalSupply;
        this.feeTopay = feeTopay;
        this.inflation = inflation;
        this.collectedEpochFees = collectedEpochFees;
        this.inflationMultiplier = inflationMultiplier;
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
        const height = Height_1.Height.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, height.size);
        const timestamp = Timestamp_1.Timestamp.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, timestamp.size);
        const difficulty = Difficulty_1.Difficulty.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, difficulty.size);
        const generationHashProof = VrfProof_1.VrfProof.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, generationHashProof.size);
        const previousBlockHash = Hash256_1.Hash256.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, previousBlockHash.size);
        const transactionsHash = Hash256_1.Hash256.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, transactionsHash.size);
        const receiptsHash = Hash256_1.Hash256.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, receiptsHash.size);
        const stateHash = Hash256_1.Hash256.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, stateHash.size);
        const beneficiaryAddress = Address_1.Address.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, beneficiaryAddress.size);
        const feeMultiplier = BlockFeeMultiplier_1.BlockFeeMultiplier.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, feeMultiplier.size);
        const totalSupply = BlockTotalSupply_1.BlockTotalSupply.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, totalSupply.size);
        const feeTopay = BlockFeeToPay_1.BlockFeeToPay.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, feeTopay.size);
        const inflation = BlockInflation_1.BlockInflation.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, inflation.size);
        const collectedEpochFees = BlockCollectedEpochFees_1.BlockCollectedEpochFees.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, collectedEpochFees.size);
        const inflationMultiplier = BlockInflationMultiplier_1.BlockInflationMultiplier.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, inflationMultiplier.size);
        return new Block({
            signature: signature,
            signerPublicKey: signerPublicKey,
            version: version,
            network: network,
            type: type,
            height: height,
            timestamp: timestamp,
            difficulty: difficulty,
            generationHashProof: generationHashProof,
            previousBlockHash: previousBlockHash,
            transactionsHash: transactionsHash,
            receiptsHash: receiptsHash,
            stateHash: stateHash,
            beneficiaryAddress: beneficiaryAddress,
            feeMultiplier: feeMultiplier,
            totalSupply: totalSupply,
            feeTopay: feeTopay,
            inflation: inflation,
            collectedEpochFees: collectedEpochFees,
            inflationMultiplier: inflationMultiplier,
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
        size += this.height.size;
        size += this.timestamp.size;
        size += this.difficulty.size;
        size += this.generationHashProof.size;
        size += this.previousBlockHash.size;
        size += this.transactionsHash.size;
        size += this.receiptsHash.size;
        size += this.stateHash.size;
        size += this.beneficiaryAddress.size;
        size += this.feeMultiplier.size;
        size += this.totalSupply.size;
        size += this.feeTopay.size;
        size += this.inflation.size;
        size += this.collectedEpochFees.size;
        size += this.inflationMultiplier.size;
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
        const heightBytes = this.height.serialize();
        newArray = Utils_1.Utils.concatTypedArrays(newArray, heightBytes);
        const timestampBytes = this.timestamp.serialize();
        newArray = Utils_1.Utils.concatTypedArrays(newArray, timestampBytes);
        const difficultyBytes = this.difficulty.serialize();
        newArray = Utils_1.Utils.concatTypedArrays(newArray, difficultyBytes);
        const generationHashProofBytes = this.generationHashProof.serialize();
        newArray = Utils_1.Utils.concatTypedArrays(newArray, generationHashProofBytes);
        const previousBlockHashBytes = this.previousBlockHash.serialize();
        newArray = Utils_1.Utils.concatTypedArrays(newArray, previousBlockHashBytes);
        const transactionsHashBytes = this.transactionsHash.serialize();
        newArray = Utils_1.Utils.concatTypedArrays(newArray, transactionsHashBytes);
        const receiptsHashBytes = this.receiptsHash.serialize();
        newArray = Utils_1.Utils.concatTypedArrays(newArray, receiptsHashBytes);
        const stateHashBytes = this.stateHash.serialize();
        newArray = Utils_1.Utils.concatTypedArrays(newArray, stateHashBytes);
        const beneficiaryAddressBytes = this.beneficiaryAddress.serialize();
        newArray = Utils_1.Utils.concatTypedArrays(newArray, beneficiaryAddressBytes);
        const feeMultiplierBytes = this.feeMultiplier.serialize();
        newArray = Utils_1.Utils.concatTypedArrays(newArray, feeMultiplierBytes);
        const totalSupplyBytes = this.totalSupply.serialize();
        newArray = Utils_1.Utils.concatTypedArrays(newArray, totalSupplyBytes);
        const feeTopayBytes = this.feeTopay.serialize();
        newArray = Utils_1.Utils.concatTypedArrays(newArray, feeTopayBytes);
        const inflationBytes = this.inflation.serialize();
        newArray = Utils_1.Utils.concatTypedArrays(newArray, inflationBytes);
        const collectedEpochFeesBytes = this.collectedEpochFees.serialize();
        newArray = Utils_1.Utils.concatTypedArrays(newArray, collectedEpochFeesBytes);
        const inflationMultiplierBytes = this.inflationMultiplier.serialize();
        newArray = Utils_1.Utils.concatTypedArrays(newArray, inflationMultiplierBytes);
        return newArray;
    }
}
exports.Block = Block;
//# sourceMappingURL=Block.js.map
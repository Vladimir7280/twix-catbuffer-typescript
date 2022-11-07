import { Address } from './Address';
import { BlockCollectedEpochFees } from './BlockCollectedEpochFees';
import { BlockFeeMultiplier } from './BlockFeeMultiplier';
import { BlockFeeToPay } from './BlockFeeToPay';
import { BlockInflation } from './BlockInflation';
import { BlockInflationMultiplier } from './BlockInflationMultiplier';
import { BlockTotalSupply } from './BlockTotalSupply';
import { BlockType } from './BlockType';
import { Difficulty } from './Difficulty';
import { Hash256 } from './Hash256';
import { Height } from './Height';
import { NetworkType } from './NetworkType';
import { PublicKey } from './PublicKey';
import { Serializer } from './Serializer';
import { Signature } from './Signature';
import { Timestamp } from './Timestamp';
import { VrfProof } from './VrfProof';
export interface BlockParams {
    signature: Signature;
    signerPublicKey: PublicKey;
    version: number;
    network: NetworkType;
    type: BlockType;
    height: Height;
    timestamp: Timestamp;
    difficulty: Difficulty;
    generationHashProof: VrfProof;
    previousBlockHash: Hash256;
    transactionsHash: Hash256;
    receiptsHash: Hash256;
    stateHash: Hash256;
    beneficiaryAddress: Address;
    feeMultiplier: BlockFeeMultiplier;
    totalSupply: BlockTotalSupply;
    feeTopay: BlockFeeToPay;
    inflation: BlockInflation;
    collectedEpochFees: BlockCollectedEpochFees;
    inflationMultiplier: BlockInflationMultiplier;
}
export declare class Block implements Serializer {
    readonly signature: Signature;
    readonly signerPublicKey: PublicKey;
    readonly version: number;
    readonly network: NetworkType;
    readonly type: BlockType;
    readonly height: Height;
    readonly timestamp: Timestamp;
    readonly difficulty: Difficulty;
    readonly generationHashProof: VrfProof;
    readonly previousBlockHash: Hash256;
    readonly transactionsHash: Hash256;
    readonly receiptsHash: Hash256;
    readonly stateHash: Hash256;
    readonly beneficiaryAddress: Address;
    readonly feeMultiplier: BlockFeeMultiplier;
    readonly totalSupply: BlockTotalSupply;
    readonly feeTopay: BlockFeeToPay;
    readonly inflation: BlockInflation;
    readonly collectedEpochFees: BlockCollectedEpochFees;
    readonly inflationMultiplier: BlockInflationMultiplier;
    constructor({ signature, signerPublicKey, version, network, type, height, timestamp, difficulty, generationHashProof, previousBlockHash, transactionsHash, receiptsHash, stateHash, beneficiaryAddress, feeMultiplier, totalSupply, feeTopay, inflation, collectedEpochFees, inflationMultiplier, }: BlockParams);
    static deserialize(payload: Uint8Array): Block;
    get size(): number;
    serialize(): Uint8Array;
}
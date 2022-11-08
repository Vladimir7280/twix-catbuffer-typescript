/**
 *** Copyright (c) 2016-2019, Jaguar0625, gimre, BloodyRookie, Tech Bureau, Corp.
 *** Copyright (c) 2020-present, Jaguar0625, gimre, BloodyRookie.
 *** All rights reserved.
 ***
 *** This file is part of Catapult.
 ***
 *** Catapult is free software: you can redistribute it and/or modify
 *** it under the terms of the GNU Lesser General Public License as published by
 *** the Free Software Foundation, either version 3 of the License, or
 *** (at your option) any later version.
 ***
 *** Catapult is distributed in the hope that it will be useful,
 *** but WITHOUT ANY WARRANTY; without even the implied warranty of
 *** MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 *** GNU Lesser General Public License for more details.
 ***
 *** You should have received a copy of the GNU Lesser General Public License
 *** along with Catapult. If not, see <http://www.gnu.org/licenses/>.
 **/

import { AddressDto } from './AddressDto';
import { AmountDto } from './AmountDto';
import { BlockFeeMultiplierDto } from './BlockFeeMultiplierDto';
import { BlockTypeDto } from './BlockTypeDto';
import { DifficultyDto } from './DifficultyDto';
import { GeneratorUtils } from './GeneratorUtils';
import { Hash256Dto } from './Hash256Dto';
import { HeightDto } from './HeightDto';
import { NetworkTypeDto } from './NetworkTypeDto';
import { PublicKeyDto } from './PublicKeyDto';
import { Serializer } from './Serializer';
import { SignatureDto } from './SignatureDto';
import { TimestampDto } from './TimestampDto';
import { VrfProofBuilder } from './VrfProofBuilder';

/**
 * Binary layout for a block header
 **/
export class BlockHeaderBuilder implements Serializer {
    /** Entity's signature generated by the signing account.. **/
    readonly signature: SignatureDto;

    /** Public key of the signer of the entity.. **/
    readonly signerPublicKey: PublicKeyDto;

    /** Version of this structure.. **/
    readonly version: number;

    /** Network on which this entity was created.. **/
    readonly network: NetworkTypeDto;

    /** Block type. **/
    readonly type: BlockTypeDto;

    /** Block height. **/
    readonly height: HeightDto;

    /** Number of milliseconds elapsed since creation of nemesis block. **/
    readonly timestamp: TimestampDto;

    /** Block difficulty. **/
    readonly difficulty: DifficultyDto;

    /** Generation hash proof. **/
    readonly generationHashProof: VrfProofBuilder;

    /** Previous block hash. **/
    readonly previousBlockHash: Hash256Dto;

    /** Hash of the transactions in this block. **/
    readonly transactionsHash: Hash256Dto;

    /** Hash of the receipts generated by this block. **/
    readonly receiptsHash: Hash256Dto;

    /** Hash of the global chain state at this block. **/
    readonly stateHash: Hash256Dto;

    /** Beneficiary address designated by harvester. **/
    readonly beneficiaryAddress: AddressDto;

    /** Fee multiplier applied to block transactions. **/
    readonly feeMultiplier: BlockFeeMultiplierDto;

    /** totalSupply **/
    readonly totalSupply: AmountDto;

    /** feeToPay **/
    readonly feeToPay: AmountDto;

    /** inflation **/
    readonly inflation: AmountDto;

    /** collectedEpochFees **/
    readonly collectedEpochFees: AmountDto;

    /**  inflationMultiplier */
    readonly inflationMultiplier: AmountDto;

    /**
     * Constructor.
     *
     * @param signature Entity's signature generated by the signing account..
     * @param signerPublicKey Public key of the signer of the entity..
     * @param version Version of this structure..
     * @param network Network on which this entity was created..
     * @param type Block type.
     * @param height Block height.
     * @param timestamp Number of milliseconds elapsed since creation of nemesis block.
     * @param difficulty Block difficulty.
     * @param generationHashProof Generation hash proof.
     * @param previousBlockHash Previous block hash.
     * @param transactionsHash Hash of the transactions in this block.
     * @param receiptsHash Hash of the receipts generated by this block.
     * @param stateHash Hash of the global chain state at this block.
     * @param beneficiaryAddress Beneficiary address designated by harvester.
     * @param feeMultiplier Fee multiplier applied to block transactions.
     * @param totalSupply totalSupply.
     * @param feeToPay feeToPay.
     * @param inflation inflation.
     * @param collectedEpochFees collectedEpochFees.
     * @param inflationMultiplier inflationMultiplier.
     */
    public constructor(
        signature: SignatureDto,
        signerPublicKey: PublicKeyDto,
        version: number,
        network: NetworkTypeDto,
        type: BlockTypeDto,
        height: HeightDto,
        timestamp: TimestampDto,
        difficulty: DifficultyDto,
        generationHashProof: VrfProofBuilder,
        previousBlockHash: Hash256Dto,
        transactionsHash: Hash256Dto,
        receiptsHash: Hash256Dto,
        stateHash: Hash256Dto,
        beneficiaryAddress: AddressDto,
        feeMultiplier: BlockFeeMultiplierDto,
        totalSupply: AmountDto,
        feeToPay: AmountDto,
        inflation: AmountDto,
        collectedEpochFees: AmountDto,
        inflationMultiplier: AmountDto,
    ) {
        GeneratorUtils.notNull(signature, 'signature is null or undefined');
        GeneratorUtils.notNull(signerPublicKey, 'signerPublicKey is null or undefined');
        GeneratorUtils.notNull(version, 'version is null or undefined');
        GeneratorUtils.notNull(network, 'network is null or undefined');
        GeneratorUtils.notNull(type, 'type is null or undefined');
        GeneratorUtils.notNull(height, 'height is null or undefined');
        GeneratorUtils.notNull(timestamp, 'timestamp is null or undefined');
        GeneratorUtils.notNull(difficulty, 'difficulty is null or undefined');
        GeneratorUtils.notNull(generationHashProof, 'generationHashProof is null or undefined');
        GeneratorUtils.notNull(previousBlockHash, 'previousBlockHash is null or undefined');
        GeneratorUtils.notNull(transactionsHash, 'transactionsHash is null or undefined');
        GeneratorUtils.notNull(receiptsHash, 'receiptsHash is null or undefined');
        GeneratorUtils.notNull(stateHash, 'stateHash is null or undefined');
        GeneratorUtils.notNull(beneficiaryAddress, 'beneficiaryAddress is null or undefined');
        GeneratorUtils.notNull(feeMultiplier, 'feeMultiplier is null or undefined');
        GeneratorUtils.notNull(totalSupply, 'feeMultiplier is null or undefined');
        GeneratorUtils.notNull(feeToPay, 'feeMultiplier is null or undefined');
        GeneratorUtils.notNull(inflation, 'feeMultiplier is null or undefined');
        GeneratorUtils.notNull(collectedEpochFees, 'feeMultiplier is null or undefined');
        GeneratorUtils.notNull(inflationMultiplier,'inflationMultiplier is null or undefined');
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
        this.feeToPay = feeToPay;
        this.inflation = inflation;
        this.collectedEpochFees = collectedEpochFees;
        this.inflationMultiplier = inflationMultiplier;
    }

    /**
     * Load from binary array - Creates an object from payload.
     *
     * @param payload - Byte payload to use to serialize the object.
     */

    public static loadFromBinary(payload: Uint8Array): BlockHeaderBuilder {
        const byteArray = Array.from(payload);
        const size: number = GeneratorUtils.bufferToUint32(Uint8Array.from(byteArray));
        byteArray.splice(0, 4);
        GeneratorUtils.bufferToUint32(Uint8Array.from(byteArray));
        byteArray.splice(0, 4);
        const signature: SignatureDto = SignatureDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, signature.getSize());
        const signerPublicKey: PublicKeyDto = PublicKeyDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, signerPublicKey.getSize());
        GeneratorUtils.bufferToUint32(Uint8Array.from(byteArray));
        byteArray.splice(0, 4);
        const version: number = GeneratorUtils.bufferToUint8(Uint8Array.from(byteArray));
        byteArray.splice(0, 1);
        const network: NetworkTypeDto = GeneratorUtils.bufferToUint8(Uint8Array.from(byteArray));
        byteArray.splice(0, 1);
        const type: BlockTypeDto = GeneratorUtils.bufferToUint16(Uint8Array.from(byteArray));
        byteArray.splice(0, 2);
        const height: HeightDto = HeightDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, height.getSize());
        const timestamp: TimestampDto = TimestampDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, timestamp.getSize());
        const difficulty: DifficultyDto = DifficultyDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, difficulty.getSize());
        const generationHashProof: VrfProofBuilder = VrfProofBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, generationHashProof.getSize());
        const previousBlockHash: Hash256Dto = Hash256Dto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, previousBlockHash.getSize());
        const transactionsHash: Hash256Dto = Hash256Dto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, transactionsHash.getSize());
        const receiptsHash: Hash256Dto = Hash256Dto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, receiptsHash.getSize());
        const stateHash: Hash256Dto = Hash256Dto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, stateHash.getSize());
        const beneficiaryAddress: AddressDto = AddressDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, beneficiaryAddress.getSize());
        const feeMultiplier: BlockFeeMultiplierDto = BlockFeeMultiplierDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, feeMultiplier.getSize());
        const totalSupply: AmountDto = AmountDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, totalSupply.getSize());
        const feeToPay: AmountDto = AmountDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, feeToPay.getSize());
        const inflation: AmountDto = AmountDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, inflation.getSize());
        const collectedEpochFees: AmountDto = AmountDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, collectedEpochFees.getSize());
        const inflationMultiplier: AmountDto = AmountDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, inflationMultiplier.getSize());
        return new BlockHeaderBuilder(
            signature,
            signerPublicKey,
            version,
            network,
            type,
            height,
            timestamp,
            difficulty,
            generationHashProof,
            previousBlockHash,
            transactionsHash,
            receiptsHash,
            stateHash,
            beneficiaryAddress,
            feeMultiplier,
            totalSupply,
            feeToPay,
            inflation,
            collectedEpochFees,
            inflationMultiplier
        );
    }

    /**
     * Creates an instance of BlockHeaderBuilder.
     *
     * @param signature Entity's signature generated by the signing account..
     * @param signerPublicKey Public key of the signer of the entity..
     * @param version Version of this structure..
     * @param network Network on which this entity was created..
     * @param type Block type.
     * @param height Block height.
     * @param timestamp Number of milliseconds elapsed since creation of nemesis block.
     * @param difficulty Block difficulty.
     * @param generationHashProof Generation hash proof.
     * @param previousBlockHash Previous block hash.
     * @param transactionsHash Hash of the transactions in this block.
     * @param receiptsHash Hash of the receipts generated by this block.
     * @param stateHash Hash of the global chain state at this block.
     * @param beneficiaryAddress Beneficiary address designated by harvester.
     * @param feeMultiplier Fee multiplier applied to block transactions.
     * @param totalSupply totalSupply.
     * @param feeToPay feeToPay.
     * @param inflation inflation.
     * @param collectedEpochFees collectedEpochFees.
     * @param inflationMultiplier inflationMultiplier.
     * @return Instance of BlockHeaderBuilder.
     */
    public static createBlockHeaderBuilder(
        signature: SignatureDto,
        signerPublicKey: PublicKeyDto,
        version: number,
        network: NetworkTypeDto,
        type: BlockTypeDto,
        height: HeightDto,
        timestamp: TimestampDto,
        difficulty: DifficultyDto,
        generationHashProof: VrfProofBuilder,
        previousBlockHash: Hash256Dto,
        transactionsHash: Hash256Dto,
        receiptsHash: Hash256Dto,
        stateHash: Hash256Dto,
        beneficiaryAddress: AddressDto,
        feeMultiplier: BlockFeeMultiplierDto,
        totalSupply: AmountDto,
        feeToPay: AmountDto,
        inflation: AmountDto,
        collectedEpochFees: AmountDto,
        inflationMultiplier: AmountDto,
    ): BlockHeaderBuilder {
        return new BlockHeaderBuilder(
            signature,
            signerPublicKey,
            version,
            network,
            type,
            height,
            timestamp,
            difficulty,
            generationHashProof,
            previousBlockHash,
            transactionsHash,
            receiptsHash,
            stateHash,
            beneficiaryAddress,
            feeMultiplier,
            totalSupply,
            feeToPay,
            inflation,
            collectedEpochFees,
            inflationMultiplier,
        );
    }

    /**
     * Gets Entity's signature generated by the signing account..
     *
     * @return Entity's signature generated by the signing account..
     */
    public getSignature(): SignatureDto {
        return this.signature;
    }

    /**
     * Gets Public key of the signer of the entity..
     *
     * @return Public key of the signer of the entity..
     */
    public getSignerPublicKey(): PublicKeyDto {
        return this.signerPublicKey;
    }

    /**
     * Gets Version of this structure..
     *
     * @return Version of this structure..
     */
    public getVersion(): number {
        return this.version;
    }

    /**
     * Gets Network on which this entity was created..
     *
     * @return Network on which this entity was created..
     */
    public getNetwork(): NetworkTypeDto {
        return this.network;
    }

    /**
     * Gets block type.
     *
     * @return Block type.
     */
    public getType(): BlockTypeDto {
        return this.type;
    }

    /**
     * Gets block height.
     *
     * @return Block height.
     */
    public getHeight(): HeightDto {
        return this.height;
    }

    /**
     * Gets number of milliseconds elapsed since creation of nemesis block.
     *
     * @return Number of milliseconds elapsed since creation of nemesis block.
     */
    public getTimestamp(): TimestampDto {
        return this.timestamp;
    }

    /**
     * Gets block difficulty.
     *
     * @return Block difficulty.
     */
    public getDifficulty(): DifficultyDto {
        return this.difficulty;
    }

    /**
     * Gets generation hash proof.
     *
     * @return Generation hash proof.
     */
    public getGenerationHashProof(): VrfProofBuilder {
        return this.generationHashProof;
    }

    /**
     * Gets previous block hash.
     *
     * @return Previous block hash.
     */
    public getPreviousBlockHash(): Hash256Dto {
        return this.previousBlockHash;
    }

    /**
     * Gets hash of the transactions in this block.
     *
     * @return Hash of the transactions in this block.
     */
    public getTransactionsHash(): Hash256Dto {
        return this.transactionsHash;
    }

    /**
     * Gets hash of the receipts generated by this block.
     *
     * @return Hash of the receipts generated by this block.
     */
    public getReceiptsHash(): Hash256Dto {
        return this.receiptsHash;
    }

    /**
     * Gets hash of the global chain state at this block.
     *
     * @return Hash of the global chain state at this block.
     */
    public getStateHash(): Hash256Dto {
        return this.stateHash;
    }

    /**
     * Gets beneficiary address designated by harvester.
     *
     * @return Beneficiary address designated by harvester.
     */
    public getBeneficiaryAddress(): AddressDto {
        return this.beneficiaryAddress;
    }

    /**
     * Gets fee multiplier applied to block transactions.
     *
     * @return Fee multiplier applied to block transactions.
     */
    public getFeeMultiplier(): BlockFeeMultiplierDto {
        return this.feeMultiplier;
    }

    /**
     * Gets totalSupply.
     *
     * @return totalSupply.
     */
     public gettotalSupply(): AmountDto {
        return this.totalSupply;
    }

    /**
     * Gets feeToPay.
     *
     * @return feeToPay.
     */
     public getfeeToPay(): AmountDto {
        return this.feeToPay;
    }

    /**
     * Gets inflation.
     *
     * @return totalSupply.
     */
     public getinflation(): AmountDto {
        return this.inflation;
    }

    /**
     * Gets collectedEpochFees.
     *
     * @return collectedEpochFees.
     */
     public getcollectedEpochFees(): AmountDto {
        return this.collectedEpochFees;
    }

    /**
     * Gets inflationMultiplier.
     *
     * @return inflationMultiplier.
     */
     public getinflationMultiplier(): AmountDto {
        return this.inflationMultiplier;
    }

    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public getSize(): number {
        let size = 0;
        size += 4; // size
        size += 4; // verifiableEntityHeaderReserved1
        size += this.signature.getSize(); // signature
        size += this.signerPublicKey.getSize(); // signerPublicKey
        size += 4; // entityBodyReserved1
        size += 1; // version
        size += 1; // network
        size += 2; // type
        size += this.height.getSize(); // height
        size += this.timestamp.getSize(); // timestamp
        size += this.difficulty.getSize(); // difficulty
        size += this.generationHashProof.getSize(); // generationHashProof
        size += this.previousBlockHash.getSize(); // previousBlockHash
        size += this.transactionsHash.getSize(); // transactionsHash
        size += this.receiptsHash.getSize(); // receiptsHash
        size += this.stateHash.getSize(); // stateHash
        size += this.beneficiaryAddress.getSize(); // beneficiaryAddress
        size += this.feeMultiplier.getSize(); // feeMultiplier
        size += this.totalSupply.getSize(); // totalSupply
        size += this.feeToPay.getSize(); // feeToPay
        size += this.inflation.getSize(); // inflation
        size += this.collectedEpochFees.getSize(); //collectedEpochFees
        size += this.inflationMultiplier.getSize(); //inflationMultiplier
        return size;
    }

    /**
     * Serializes an object to bytes.
     *
     * @return Serialized bytes.
     */
    public serialize(): Uint8Array {
        let newArray = Uint8Array.from([]);
        const sizeBytes = GeneratorUtils.uint32ToBuffer(this.getSize());
        newArray = GeneratorUtils.concatTypedArrays(newArray, sizeBytes);
        const verifiableEntityHeaderReserved1Bytes = GeneratorUtils.uint32ToBuffer(0);
        newArray = GeneratorUtils.concatTypedArrays(newArray, verifiableEntityHeaderReserved1Bytes);
        const signatureBytes = this.signature.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, signatureBytes);
        const signerPublicKeyBytes = this.signerPublicKey.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, signerPublicKeyBytes);
        const entityBodyReserved1Bytes = GeneratorUtils.uint32ToBuffer(0);
        newArray = GeneratorUtils.concatTypedArrays(newArray, entityBodyReserved1Bytes);
        const versionBytes = GeneratorUtils.uint8ToBuffer(this.getVersion());
        newArray = GeneratorUtils.concatTypedArrays(newArray, versionBytes);
        const networkBytes = GeneratorUtils.uint8ToBuffer(this.network);
        newArray = GeneratorUtils.concatTypedArrays(newArray, networkBytes);
        const typeBytes = GeneratorUtils.uint16ToBuffer(this.type);
        newArray = GeneratorUtils.concatTypedArrays(newArray, typeBytes);
        const heightBytes = this.height.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, heightBytes);
        const timestampBytes = this.timestamp.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, timestampBytes);
        const difficultyBytes = this.difficulty.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, difficultyBytes);
        const generationHashProofBytes = this.generationHashProof.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, generationHashProofBytes);
        const previousBlockHashBytes = this.previousBlockHash.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, previousBlockHashBytes);
        const transactionsHashBytes = this.transactionsHash.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, transactionsHashBytes);
        const receiptsHashBytes = this.receiptsHash.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, receiptsHashBytes);
        const stateHashBytes = this.stateHash.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, stateHashBytes);
        const beneficiaryAddressBytes = this.beneficiaryAddress.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, beneficiaryAddressBytes);
        const feeMultiplierBytes = this.feeMultiplier.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, feeMultiplierBytes);
        const totalSupplyBytes = this.totalSupply.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, totalSupplyBytes);
        const feeToPayBytes = this.feeToPay.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, feeToPayBytes);
        const inflationBytes = this.inflation.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, inflationBytes);
        const collectedEpochFeesBytes = this.collectedEpochFees.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, collectedEpochFeesBytes);
        const inflationMultiplierBytes = this.inflationMultiplier.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, inflationMultiplierBytes);
        return newArray;
    }
}

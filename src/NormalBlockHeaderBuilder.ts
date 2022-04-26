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
import { BlockFeeMultiplierDto } from './BlockFeeMultiplierDto';
import { BlockHeaderBuilder } from './BlockHeaderBuilder';
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
 * Binary layout for a normal block header
 **/
export class NormalBlockHeaderBuilder extends BlockHeaderBuilder implements Serializer {
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
    ) {
        super(
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
        );
    }

    /**
     * Load from binary array - Creates an object from payload.
     *
     * @param payload - Byte payload to use to serialize the object.
     */

    public static loadFromBinary(payload: Uint8Array): NormalBlockHeaderBuilder {
        const byteArray = Array.from(payload);
        const superObject = BlockHeaderBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.getSize());
        GeneratorUtils.bufferToUint32(Uint8Array.from(byteArray));
        byteArray.splice(0, 4);
        return new NormalBlockHeaderBuilder(
            superObject.signature,
            superObject.signerPublicKey,
            superObject.version,
            superObject.network,
            superObject.type,
            superObject.height,
            superObject.timestamp,
            superObject.difficulty,
            superObject.generationHashProof,
            superObject.previousBlockHash,
            superObject.transactionsHash,
            superObject.receiptsHash,
            superObject.stateHash,
            superObject.beneficiaryAddress,
            superObject.feeMultiplier,
        );
    }

    /**
     * Creates an instance of NormalBlockHeaderBuilder.
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
     * @return Instance of NormalBlockHeaderBuilder.
     */
    public static createNormalBlockHeaderBuilder(
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
    ): NormalBlockHeaderBuilder {
        return new NormalBlockHeaderBuilder(
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
        );
    }

    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public getSize(): number {
        let size = super.getSize();
        size += 4; // blockHeaderReserved1
        return size;
    }

    /**
     * Serializes an object to bytes.
     *
     * @return Serialized bytes.
     */
    public serialize(): Uint8Array {
        let newArray = Uint8Array.from([]);
        const superBytes = super.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, superBytes);
        const blockHeaderReserved1Bytes = GeneratorUtils.uint32ToBuffer(0);
        newArray = GeneratorUtils.concatTypedArrays(newArray, blockHeaderReserved1Bytes);
        return newArray;
    }
}

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

import { GeneratorUtils } from './GeneratorUtils';
import { Serializer } from './Serializer';

/** A time lapse, expressed in number of blocks.. */
export class BlockDurationDto implements Serializer {
    /** A time lapse, expressed in number of blocks.. */
    readonly blockDuration: number[];

    /**
     * Constructor.
     *
     * @param blockDuration A time lapse, expressed in number of blocks..
     */
    constructor(blockDuration: number[]) {
        this.blockDuration = blockDuration;
    }

    /**
     * Creates an instance of BlockDurationDto from binary payload.
     *
     * @param payload Byte payload to use to serialize the object.
     * @return Instance of BlockDurationDto.
     */
    public static loadFromBinary(payload: Uint8Array): BlockDurationDto {
        const blockDuration = GeneratorUtils.bufferToUint64(Uint8Array.from(payload));
        return new BlockDurationDto(blockDuration);
    }

    /**
     * Gets A time lapse, expressed in number of blocks..
     *
     * @return A time lapse, expressed in number of blocks..
     */
    public getBlockDuration(): number[] {
        return this.blockDuration;
    }

    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public getSize(): number {
        return 8;
    }

    /**
     * Serializes an object to bytes.
     *
     * @return Serialized bytes.
     */
    public serialize(): Uint8Array {
        return GeneratorUtils.uint64ToBuffer(this.getBlockDuration());
    }
}

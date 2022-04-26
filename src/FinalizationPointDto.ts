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

/** A particular point in time inside a [finalization](/concepts/block.html#finalization) epoch.
See the [Technical Reference](/symbol-technicalref/main.pdf) section 15.2.. */
export class FinalizationPointDto implements Serializer {
    /** A particular point in time inside a [finalization](/concepts/block.html#finalization) epoch.
See the [Technical Reference](/symbol-technicalref/main.pdf) section 15.2.. */
    readonly finalizationPoint: number;

    /**
     * Constructor.
     *
     * @param finalizationPoint A particular point in time inside a [finalization](/concepts/block.html#finalization) epoch.
See the [Technical Reference](/symbol-technicalref/main.pdf) section 15.2..
     */
    constructor(finalizationPoint: number) {
        this.finalizationPoint = finalizationPoint;
    }

    /**
     * Creates an instance of FinalizationPointDto from binary payload.
     *
     * @param payload Byte payload to use to serialize the object.
     * @return Instance of FinalizationPointDto.
     */
    public static loadFromBinary(payload: Uint8Array): FinalizationPointDto {
        const finalizationPoint = GeneratorUtils.bufferToUint32(Uint8Array.from(payload));
        return new FinalizationPointDto(finalizationPoint);
    }

    /**
     * Gets A particular point in time inside a [finalization](/concepts/block.html#finalization) epoch.
See the [Technical Reference](/symbol-technicalref/main.pdf) section 15.2..
     *
     * @return A particular point in time inside a [finalization](/concepts/block.html#finalization) epoch.
See the [Technical Reference](/symbol-technicalref/main.pdf) section 15.2..
     */
    public getFinalizationPoint(): number {
        return this.finalizationPoint;
    }

    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public getSize(): number {
        return 4;
    }

    /**
     * Serializes an object to bytes.
     *
     * @return Serialized bytes.
     */
    public serialize(): Uint8Array {
        return GeneratorUtils.uint32ToBuffer(this.getFinalizationPoint());
    }
}

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

/** Index of a [finalization](/concepts/block.html#finalization) epoch.
The first epoch is number 1 and contains only the first block (the [Nemesis](/concepts/block.html#block-creation) block). Epoch duration (in blocks) is defined by the `votingSetGrouping` network property.. */
export class FinalizationEpochDto implements Serializer {
    /** Index of a [finalization](/concepts/block.html#finalization) epoch.
The first epoch is number 1 and contains only the first block (the [Nemesis](/concepts/block.html#block-creation) block). Epoch duration (in blocks) is defined by the `votingSetGrouping` network property.. */
    readonly finalizationEpoch: number;

    /**
     * Constructor.
     *
     * @param finalizationEpoch Index of a [finalization](/concepts/block.html#finalization) epoch.
The first epoch is number 1 and contains only the first block (the [Nemesis](/concepts/block.html#block-creation) block). Epoch duration (in blocks) is defined by the `votingSetGrouping` network property..
     */
    constructor(finalizationEpoch: number) {
        this.finalizationEpoch = finalizationEpoch;
    }

    /**
     * Creates an instance of FinalizationEpochDto from binary payload.
     *
     * @param payload Byte payload to use to serialize the object.
     * @return Instance of FinalizationEpochDto.
     */
    public static loadFromBinary(payload: Uint8Array): FinalizationEpochDto {
        const finalizationEpoch = GeneratorUtils.bufferToUint32(Uint8Array.from(payload));
        return new FinalizationEpochDto(finalizationEpoch);
    }

    /**
     * Gets Index of a [finalization](/concepts/block.html#finalization) epoch.
The first epoch is number 1 and contains only the first block (the [Nemesis](/concepts/block.html#block-creation) block). Epoch duration (in blocks) is defined by the `votingSetGrouping` network property..
     *
     * @return Index of a [finalization](/concepts/block.html#finalization) epoch.
The first epoch is number 1 and contains only the first block (the [Nemesis](/concepts/block.html#block-creation) block). Epoch duration (in blocks) is defined by the `votingSetGrouping` network property..
     */
    public getFinalizationEpoch(): number {
        return this.finalizationEpoch;
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
        return GeneratorUtils.uint32ToBuffer(this.getFinalizationEpoch());
    }
}

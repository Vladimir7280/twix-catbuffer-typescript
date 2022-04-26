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
import { ImportanceDto } from './ImportanceDto';
import { ImportanceHeightDto } from './ImportanceHeightDto';
import { Serializer } from './Serializer';

/**
 * Temporal importance information
 **/
export class ImportanceSnapshotBuilder implements Serializer {
    /** Account importance. **/
    readonly importance: ImportanceDto;

    /** Importance height. **/
    readonly height: ImportanceHeightDto;

    /**
     * Constructor.
     *
     * @param importance Account importance.
     * @param height Importance height.
     */
    public constructor(importance: ImportanceDto, height: ImportanceHeightDto) {
        GeneratorUtils.notNull(importance, 'importance is null or undefined');
        GeneratorUtils.notNull(height, 'height is null or undefined');
        this.importance = importance;
        this.height = height;
    }

    /**
     * Load from binary array - Creates an object from payload.
     *
     * @param payload - Byte payload to use to serialize the object.
     */

    public static loadFromBinary(payload: Uint8Array): ImportanceSnapshotBuilder {
        const byteArray = Array.from(payload);
        const importance: ImportanceDto = ImportanceDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, importance.getSize());
        const height: ImportanceHeightDto = ImportanceHeightDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, height.getSize());
        return new ImportanceSnapshotBuilder(importance, height);
    }

    /**
     * Creates an instance of ImportanceSnapshotBuilder.
     *
     * @param importance Account importance.
     * @param height Importance height.
     * @return Instance of ImportanceSnapshotBuilder.
     */
    public static createImportanceSnapshotBuilder(importance: ImportanceDto, height: ImportanceHeightDto): ImportanceSnapshotBuilder {
        return new ImportanceSnapshotBuilder(importance, height);
    }

    /**
     * Gets account importance.
     *
     * @return Account importance.
     */
    public getImportance(): ImportanceDto {
        return this.importance;
    }

    /**
     * Gets importance height.
     *
     * @return Importance height.
     */
    public getHeight(): ImportanceHeightDto {
        return this.height;
    }

    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public getSize(): number {
        let size = 0;
        size += this.importance.getSize(); // importance
        size += this.height.getSize(); // height
        return size;
    }

    /**
     * Serializes an object to bytes.
     *
     * @return Serialized bytes.
     */
    public serialize(): Uint8Array {
        let newArray = Uint8Array.from([]);
        const importanceBytes = this.importance.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, importanceBytes);
        const heightBytes = this.height.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, heightBytes);
        return newArray;
    }
}

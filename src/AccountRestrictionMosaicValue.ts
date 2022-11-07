/*
 * Copyright 2021 SYMBOL
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { MosaicId } from './MosaicId';
import { Serializer } from './Serializer';
import { Utils } from './Utils';

/**
 * Interface to create instances of AccountRestrictionMosaicValue
 */
export interface AccountRestrictionMosaicValueParams {
    /**
     * restriction values
     */
    restrictionValues: MosaicId[];
}

/**
 * binary layout for mosaic id based account restriction
 */
export class AccountRestrictionMosaicValue implements Serializer {
    /**
     * restriction values
     */
    public readonly restrictionValues: MosaicId[];

    /**
     * Constructor
     * @param restrictionValues - restriction values
     */
    constructor({ restrictionValues }: AccountRestrictionMosaicValueParams) {
        this.restrictionValues = restrictionValues;
    }

    /**
     * Creates an instance of AccountRestrictionMosaicValue from binary payload
     * @param payload - byte payload to use to serialize the object
     * @returns Creates an instance of AccountRestrictionMosaicValue from binary payload
     */
    public static deserialize(payload: Uint8Array): AccountRestrictionMosaicValue {
        const byteArray = Array.from(payload);
        const restrictionValuesCount = Utils.bufferToBigInt(Uint8Array.from(byteArray));
        byteArray.splice(0, 8);
        const restrictionValues = Utils.deserialize(MosaicId.deserialize, Uint8Array.from(byteArray), restrictionValuesCount);
        byteArray.splice(0, restrictionValues.reduce((sum, c) => sum + c.size, 0));
        return new AccountRestrictionMosaicValue({ restrictionValues: restrictionValues });
    }

    /**
     * Gets the size of the object
     * @returns Gets the size of the object
     */
    public get size(): number {
        let size = 0;
        size += 8; // restrictionValuesCount;
        size += this.restrictionValues.reduce((sum, c) => sum + Utils.getSizeWithPadding(c.size, 0), 0); // restrictionValues;
        return size;
    }

    /**
     * Serializes an object to bytes
     * @returns Serializes an object to bytes
     */
    public serialize(): Uint8Array {
        let newArray = new Uint8Array();
        const restrictionValuesCountBytes = Utils.bigIntToBuffer(this.restrictionValues.length);
        newArray = Utils.concatTypedArrays(newArray, restrictionValuesCountBytes);
        const restrictionValuesBytes = Utils.writeList(this.restrictionValues, 0);
        newArray = Utils.concatTypedArrays(newArray, restrictionValuesBytes);
        return newArray;
    }
}

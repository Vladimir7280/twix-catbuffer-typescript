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
import { MosaicRestrictionType } from './MosaicRestrictionType';
import { Serializer } from './Serializer';
import { Utils } from './Utils';

/**
 * Interface to create instances of RestrictionRule
 */
export interface RestrictionRuleParams {
    /**
     * identifier of the mosaic providing the restriction key
     */
    referenceMosaicId: MosaicId;
    /**
     * restriction value
     */
    restrictionValue: bigint;
    /**
     * restriction type
     */
    restrictionType: MosaicRestrictionType;
}

/**
 * binary layout of restriction rule being applied
 */
export class RestrictionRule implements Serializer {
    /**
     * identifier of the mosaic providing the restriction key
     */
    public readonly referenceMosaicId: MosaicId;
    /**
     * restriction value
     */
    public readonly restrictionValue: bigint;
    /**
     * restriction type
     */
    public readonly restrictionType: MosaicRestrictionType;

    /**
     * Constructor
     * @param referenceMosaicId - identifier of the mosaic providing the restriction key
     * @param restrictionValue - restriction value
     * @param restrictionType - restriction type
     */
    constructor({ referenceMosaicId, restrictionValue, restrictionType }: RestrictionRuleParams) {
        this.referenceMosaicId = referenceMosaicId;
        this.restrictionValue = restrictionValue;
        this.restrictionType = restrictionType;
    }

    /**
     * Creates an instance of RestrictionRule from binary payload
     * @param payload - byte payload to use to serialize the object
     * @returns Creates an instance of RestrictionRule from binary payload
     */
    public static deserialize(payload: Uint8Array): RestrictionRule {
        const byteArray = Array.from(payload);
        const referenceMosaicId = MosaicId.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, referenceMosaicId.size);
        const restrictionValue = Utils.bufferToBigInt(Uint8Array.from(byteArray));
        byteArray.splice(0, 8);
        const restrictionType = Utils.bufferToUint8(Uint8Array.from(byteArray));
        byteArray.splice(0, 1);
        return new RestrictionRule({
            referenceMosaicId: referenceMosaicId,
            restrictionValue: restrictionValue,
            restrictionType: restrictionType,
        });
    }

    /**
     * Gets the size of the object
     * @returns Gets the size of the object
     */
    public get size(): number {
        let size = 0;
        size += this.referenceMosaicId.size; // referenceMosaicId;
        size += 8; // restrictionValue;
        size += 1; // restrictionType;
        return size;
    }

    /**
     * Serializes an object to bytes
     * @returns Serializes an object to bytes
     */
    public serialize(): Uint8Array {
        let newArray = new Uint8Array();
        const referenceMosaicIdBytes = this.referenceMosaicId.serialize();
        newArray = Utils.concatTypedArrays(newArray, referenceMosaicIdBytes);
        const restrictionValueBytes = Utils.bigIntToBuffer(this.restrictionValue);
        newArray = Utils.concatTypedArrays(newArray, restrictionValueBytes);
        const restrictionTypeBytes = Utils.uint8ToBuffer(this.restrictionType);
        newArray = Utils.concatTypedArrays(newArray, restrictionTypeBytes);
        return newArray;
    }
}

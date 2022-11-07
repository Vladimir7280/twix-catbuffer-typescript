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
import { MosaicRestrictionKey } from './MosaicRestrictionKey';
import { RestrictionRule } from './RestrictionRule';
import { Serializer } from './Serializer';
import { Utils } from './Utils';

/**
 * Interface to create instances of GlobalKeyValue
 */
export interface GlobalKeyValueParams {
    /**
     * key associated with a restriction rule
     */
    key: MosaicRestrictionKey;
    /**
     * restriction rule (the value) associated with a key
     */
    restrictionRule: RestrictionRule;
}

/**
 * binary layout for a global key-value
 */
export class GlobalKeyValue implements Serializer {
    /**
     * key associated with a restriction rule
     */
    public readonly key: MosaicRestrictionKey;
    /**
     * restriction rule (the value) associated with a key
     */
    public readonly restrictionRule: RestrictionRule;

    /**
     * Constructor
     * @param key - key associated with a restriction rule
     * @param restrictionRule - restriction rule (the value) associated with a key
     */
    constructor({ key, restrictionRule }: GlobalKeyValueParams) {
        this.key = key;
        this.restrictionRule = restrictionRule;
    }

    /**
     * Creates an instance of GlobalKeyValue from binary payload
     * @param payload - byte payload to use to serialize the object
     * @returns Creates an instance of GlobalKeyValue from binary payload
     */
    public static deserialize(payload: Uint8Array): GlobalKeyValue {
        const byteArray = Array.from(payload);
        const key = MosaicRestrictionKey.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, key.size);
        const restrictionRule = RestrictionRule.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, restrictionRule.size);
        return new GlobalKeyValue({ key: key, restrictionRule: restrictionRule });
    }

    /**
     * Gets the size of the object
     * @returns Gets the size of the object
     */
    public get size(): number {
        let size = 0;
        size += this.key.size; // key;
        size += this.restrictionRule.size; // restrictionRule;
        return size;
    }

    /**
     * Serializes an object to bytes
     * @returns Serializes an object to bytes
     */
    public serialize(): Uint8Array {
        let newArray = new Uint8Array();
        const keyBytes = this.key.serialize();
        newArray = Utils.concatTypedArrays(newArray, keyBytes);
        const restrictionRuleBytes = this.restrictionRule.serialize();
        newArray = Utils.concatTypedArrays(newArray, restrictionRuleBytes);
        return newArray;
    }
}

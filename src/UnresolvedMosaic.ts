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
import { Amount } from './Amount';
import { Serializer } from './Serializer';
import { UnresolvedMosaicId } from './UnresolvedMosaicId';
import { Utils } from './Utils';

/**
 * Interface to create instances of UnresolvedMosaic
 */
export interface UnresolvedMosaicParams {
    /**
     * Unresolved mosaic identifier.
     */
    mosaicId: UnresolvedMosaicId;
    /**
     * Mosaic amount.
     */
    amount: Amount;
}

/**
 * A quantity of a certain mosaic, specified either through a MosaicId or an alias.
 */
export class UnresolvedMosaic implements Serializer {
    /**
     * Unresolved mosaic identifier.
     */
    public readonly mosaicId: UnresolvedMosaicId;
    /**
     * Mosaic amount.
     */
    public readonly amount: Amount;

    /**
     * Constructor
     * @param mosaicId - Unresolved mosaic identifier.
     * @param amount - Mosaic amount.
     */
    constructor({ mosaicId, amount }: UnresolvedMosaicParams) {
        this.mosaicId = mosaicId;
        this.amount = amount;
    }

    /**
     * Creates an instance of UnresolvedMosaic from binary payload
     * @param payload - byte payload to use to serialize the object
     * @returns Creates an instance of UnresolvedMosaic from binary payload
     */
    public static deserialize(payload: Uint8Array): UnresolvedMosaic {
        const byteArray = Array.from(payload);
        const mosaicId = UnresolvedMosaicId.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, mosaicId.size);
        const amount = Amount.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, amount.size);
        return new UnresolvedMosaic({ mosaicId: mosaicId, amount: amount });
    }

    /**
     * Gets the size of the object
     * @returns Gets the size of the object
     */
    public get size(): number {
        let size = 0;
        size += this.mosaicId.size; // mosaicId;
        size += this.amount.size; // amount;
        return size;
    }

    /**
     * Serializes an object to bytes
     * @returns Serializes an object to bytes
     */
    public serialize(): Uint8Array {
        let newArray = new Uint8Array();
        const mosaicIdBytes = this.mosaicId.serialize();
        newArray = Utils.concatTypedArrays(newArray, mosaicIdBytes);
        const amountBytes = this.amount.serialize();
        newArray = Utils.concatTypedArrays(newArray, amountBytes);
        return newArray;
    }
}

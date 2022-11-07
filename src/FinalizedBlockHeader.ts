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
import { FinalizationRound } from './FinalizationRound';
import { Hash256 } from './Hash256';
import { Height } from './Height';
import { Serializer } from './Serializer';
import { Utils } from './Utils';

/**
 * Interface to create instances of FinalizedBlockHeader
 */
export interface FinalizedBlockHeaderParams {
    /**
     * finalization round
     */
    round: FinalizationRound;
    /**
     * finalization height
     */
    height: Height;
    /**
     * finalization hash
     */
    hash: Hash256;
}

/**
 * binary layout for finalized block header
 */
export class FinalizedBlockHeader implements Serializer {
    /**
     * finalization round
     */
    public readonly round: FinalizationRound;
    /**
     * finalization height
     */
    public readonly height: Height;
    /**
     * finalization hash
     */
    public readonly hash: Hash256;

    /**
     * Constructor
     * @param round - finalization round
     * @param height - finalization height
     * @param hash - finalization hash
     */
    constructor({ round, height, hash }: FinalizedBlockHeaderParams) {
        this.round = round;
        this.height = height;
        this.hash = hash;
    }

    /**
     * Creates an instance of FinalizedBlockHeader from binary payload
     * @param payload - byte payload to use to serialize the object
     * @returns Creates an instance of FinalizedBlockHeader from binary payload
     */
    public static deserialize(payload: Uint8Array): FinalizedBlockHeader {
        const byteArray = Array.from(payload);
        const round = FinalizationRound.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, round.size);
        const height = Height.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, height.size);
        const hash = Hash256.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, hash.size);
        return new FinalizedBlockHeader({ round: round, height: height, hash: hash });
    }

    /**
     * Gets the size of the object
     * @returns Gets the size of the object
     */
    public get size(): number {
        let size = 0;
        size += this.round.size; // round;
        size += this.height.size; // height;
        size += this.hash.size; // hash;
        return size;
    }

    /**
     * Serializes an object to bytes
     * @returns Serializes an object to bytes
     */
    public serialize(): Uint8Array {
        let newArray = new Uint8Array();
        const roundBytes = this.round.serialize();
        newArray = Utils.concatTypedArrays(newArray, roundBytes);
        const heightBytes = this.height.serialize();
        newArray = Utils.concatTypedArrays(newArray, heightBytes);
        const hashBytes = this.hash.serialize();
        newArray = Utils.concatTypedArrays(newArray, hashBytes);
        return newArray;
    }
}

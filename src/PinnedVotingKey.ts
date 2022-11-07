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
import { FinalizationEpoch } from './FinalizationEpoch';
import { Serializer } from './Serializer';
import { Utils } from './Utils';
import { VotingPublicKey } from './VotingPublicKey';

/**
 * Interface to create instances of PinnedVotingKey
 */
export interface PinnedVotingKeyParams {
    /**
     * voting key
     */
    votingKey: VotingPublicKey;
    /**
     * start finalization epoch
     */
    startEpoch: FinalizationEpoch;
    /**
     * end finalization epoch
     */
    endEpoch: FinalizationEpoch;
}

/**
 * pinned voting key
 */
export class PinnedVotingKey implements Serializer {
    /**
     * voting key
     */
    public readonly votingKey: VotingPublicKey;
    /**
     * start finalization epoch
     */
    public readonly startEpoch: FinalizationEpoch;
    /**
     * end finalization epoch
     */
    public readonly endEpoch: FinalizationEpoch;

    /**
     * Constructor
     * @param votingKey - voting key
     * @param startEpoch - start finalization epoch
     * @param endEpoch - end finalization epoch
     */
    constructor({ votingKey, startEpoch, endEpoch }: PinnedVotingKeyParams) {
        this.votingKey = votingKey;
        this.startEpoch = startEpoch;
        this.endEpoch = endEpoch;
    }

    /**
     * Creates an instance of PinnedVotingKey from binary payload
     * @param payload - byte payload to use to serialize the object
     * @returns Creates an instance of PinnedVotingKey from binary payload
     */
    public static deserialize(payload: Uint8Array): PinnedVotingKey {
        const byteArray = Array.from(payload);
        const votingKey = VotingPublicKey.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, votingKey.size);
        const startEpoch = FinalizationEpoch.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, startEpoch.size);
        const endEpoch = FinalizationEpoch.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, endEpoch.size);
        return new PinnedVotingKey({ votingKey: votingKey, startEpoch: startEpoch, endEpoch: endEpoch });
    }

    /**
     * Gets the size of the object
     * @returns Gets the size of the object
     */
    public get size(): number {
        let size = 0;
        size += this.votingKey.size; // votingKey;
        size += this.startEpoch.size; // startEpoch;
        size += this.endEpoch.size; // endEpoch;
        return size;
    }

    /**
     * Serializes an object to bytes
     * @returns Serializes an object to bytes
     */
    public serialize(): Uint8Array {
        let newArray = new Uint8Array();
        const votingKeyBytes = this.votingKey.serialize();
        newArray = Utils.concatTypedArrays(newArray, votingKeyBytes);
        const startEpochBytes = this.startEpoch.serialize();
        newArray = Utils.concatTypedArrays(newArray, startEpochBytes);
        const endEpochBytes = this.endEpoch.serialize();
        newArray = Utils.concatTypedArrays(newArray, endEpochBytes);
        return newArray;
    }
}

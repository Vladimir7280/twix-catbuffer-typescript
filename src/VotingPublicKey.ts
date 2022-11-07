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
import { Serializer } from './Serializer';
import { Utils } from './Utils';

/**
 * A PublicKey used for voting during the [finalization process](/concepts/block.html#finalization).
 */
export class VotingPublicKey implements Serializer {
    /**
     * A PublicKey used for voting during the [finalization process](/concepts/block.html#finalization).
     */
    public readonly votingPublicKey: Uint8Array;

    /**
     * Constructor
     * @param votingPublicKey - A PublicKey used for voting during the [finalization process](/concepts/block.html#finalization).
     */
    constructor(votingPublicKey: Uint8Array) {
        this.votingPublicKey = votingPublicKey;
    }

    /**
     * Creates an instance of VotingPublicKey from binary payload
     * @param payload - byte payload to use to serialize the object
     * @returns Creates an instance of VotingPublicKey from binary payload
     */
    public static deserialize(payload: Uint8Array): VotingPublicKey {
        const votingPublicKey = Utils.getBytes(Uint8Array.from(payload), 32);
        return new VotingPublicKey(votingPublicKey);
    }

    /**
     * Gets the size of the object
     * @returns Gets the size of the object
     */
    public get size(): number {
        return 32;
    }

    /**
     * Serializes an object to bytes
     * @returns Serializes an object to bytes
     */
    public serialize(): Uint8Array {
        return this.votingPublicKey;
    }
}

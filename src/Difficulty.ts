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
 * How hard it was to harvest this block.
The initial value is 1e14 and it will remain like this as long as blocks are generated every `blockGenerationTargetTime` seconds ([network property](/guides/network/configuring-network-properties.html)).
If blocks start taking more or less time than the configured value, the difficulty will be adjusted (in the range of 1e13 to 1e15) to try to hit the target time.
See the [Technical Reference](/symbol-technicalref/main.pdf) section
 * 8.1.
 */
export class Difficulty implements Serializer {
    /**
     * How hard it was to harvest this block.
The initial value is 1e14 and it will remain like this as long as blocks are generated every `blockGenerationTargetTime` seconds ([network property](/guides/network/configuring-network-properties.html)).
If blocks start taking more or less time than the configured value, the difficulty will be adjusted (in the range of 1e13 to 1e15) to try to hit the target time.
See the [Technical Reference](/symbol-technicalref/main.pdf) section
     * 8.1.
     */
    public readonly difficulty: bigint;

    /**
     * Constructor
     * @param difficulty - How hard it was to harvest this block.
The initial value is 1e14 and it will remain like this as long as blocks are generated every `blockGenerationTargetTime` seconds ([network property](/guides/network/configuring-network-properties.html)).
If blocks start taking more or less time than the configured value, the difficulty will be adjusted (in the range of 1e13 to 1e15) to try to hit the target time.
See the [Technical Reference](/symbol-technicalref/main.pdf) section
     * 8.1.
     */
    constructor(difficulty: bigint) {
        this.difficulty = difficulty;
    }

    /**
     * Creates an instance of Difficulty from binary payload
     * @param payload - byte payload to use to serialize the object
     * @returns Creates an instance of Difficulty from binary payload
     */
    public static deserialize(payload: Uint8Array): Difficulty {
        const difficulty = Utils.bufferToBigInt(Uint8Array.from(payload));
        return new Difficulty(difficulty);
    }

    /**
     * Gets the size of the object
     * @returns Gets the size of the object
     */
    public get size(): number {
        return 8;
    }

    /**
     * Serializes an object to bytes
     * @returns Serializes an object to bytes
     */
    public serialize(): Uint8Array {
        return Utils.bigIntToBuffer(this.difficulty);
    }
}

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
/**
 * Enumeration of lock hash algorithms.
 */
export enum LockHashAlgorithm {
    /**
     * Input is hashed using [SHA-3 256](https://en.wikipedia.org/wiki/SHA-3).
     */
    SHA3_256 = 0,
    /**
     * Input is hashed twice: first with [SHA-256](https://en.wikipedia.org/wiki/SHA-2) and then with [RIPEMD-160](https://en.wikipedia.org/wiki/RIPEMD) (bitcoin's
     * OP_HASH160).
     */
    HASH_160 = 1,
    /**
     * Input is hashed twice with [SHA-256](https://en.wikipedia.org/wiki/SHA-2) (bitcoin's OP_HASH256).
     */
    HASH_256 = 2,
}

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
 * Enumeration of account restriction flags.
 */
export enum AccountRestrictionFlags {
    /**
     * Restriction type is an address.
     */
    ADDRESS = 1,
    /**
     * Restriction type is a mosaic identifier.
     */
    MOSAIC_ID = 2,
    /**
     * Restriction type is a transaction type.
     */
    TRANSACTION_TYPE = 4,
    /**
     * Restriction is interpreted as outgoing.
     */
    OUTGOING = 16384,
    /**
     * Restriction is interpreted as blocking (instead of allowing) operation.
     */
    BLOCK = 32768,
}

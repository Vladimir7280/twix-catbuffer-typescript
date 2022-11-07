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
 * Enumeration of mosaic property flags.
 */
export enum MosaicFlags {
    /**
     * No flags present.
     */
    NONE = 0,
    /**
     * Mosaic supports supply changes through a MosaicSupplyChangeTransaction even when mosaic creator only owns a partial supply.
If the mosaic creator owns the totality of the supply, it can be changed even if this flag is not
     * set.
     */
    SUPPLY_MUTABLE = 1,
    /**
     * Mosaic supports TransferTransaction between arbitrary accounts. When not set, this mosaic can only be transferred to or from the mosaic
     * creator.
     */
    TRANSFERABLE = 2,
    /**
     * Mosaic supports custom restrictions configured by the mosaic creator.
See MosaicAddressRestrictionTransaction and
     * MosaicGlobalRestrictionTransaction.
     */
    RESTRICTABLE = 4,
    /**
     * Mosaic supports revocation of tokens by the mosaic creator.
     */
    REVOKABLE = 8,
}

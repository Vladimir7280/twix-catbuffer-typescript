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
 * Enumeration of mosaic restriction types.
 */
export enum MosaicRestrictionType {
    /**
     * Uninitialized value indicating no restriction.
     */
    NONE = 0,
    /**
     * Allow if equal.
     */
    EQ = 1,
    /**
     * Allow if not equal.
     */
    NE = 2,
    /**
     * Allow if less than.
     */
    LT = 3,
    /**
     * Allow if less than or equal.
     */
    LE = 4,
    /**
     * Allow if greater than.
     */
    GT = 5,
    /**
     * Allow if greater than or equal.
     */
    GE = 6,
}

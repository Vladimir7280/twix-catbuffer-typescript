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
 * Enumeration of receipt types.
 */
export enum ReceiptType {
    /**
     * Mosaic rental fee receipt.
     */
    MOSAIC_RENTAL_FEE = 4685,
    /**
     * Namespace rental fee receipt.
     */
    NAMESPACE_RENTAL_FEE = 4942,
    /**
     * Harvest fee receipt.
     */
    HARVEST_FEE = 8515,
    /**
     * Hash lock completed receipt.
     */
    LOCK_HASH_COMPLETED = 8776,
    /**
     * Hash lock expired receipt.
     */
    LOCK_HASH_EXPIRED = 9032,
    /**
     * Secret lock completed receipt.
     */
    LOCK_SECRET_COMPLETED = 8786,
    /**
     * Secret lock expired receipt.
     */
    LOCK_SECRET_EXPIRED = 9042,
    /**
     * Hash lock created receipt.
     */
    LOCK_HASH_CREATED = 12616,
    /**
     * Secret lock created receipt.
     */
    LOCK_SECRET_CREATED = 12626,
    /**
     * Mosaic expired receipt.
     */
    MOSAIC_EXPIRED = 16717,
    /**
     * Namespace expired receipt.
     */
    NAMESPACE_EXPIRED = 16718,
    /**
     * Namespace deleted receipt.
     */
    NAMESPACE_DELETED = 16974,
    /**
     * Inflation receipt.
     */
    INFLATION = 20803,
    /**
     * Transaction group receipt.
     */
    TRANSACTION_GROUP = 57667,
    /**
     * Address alias resolution receipt.
     */
    ADDRESS_ALIAS_RESOLUTION = 61763,
    /**
     * Mosaic alias resolution receipt.
     */
    MOSAIC_ALIAS_RESOLUTION = 62019,
}

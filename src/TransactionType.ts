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
 * Enumeration of Transaction types
 */
export enum TransactionType {
    /**
     * AccountKeyLinkTransaction
     */
    ACCOUNT_KEY_LINK = 16716,
    /**
     * NodeKeyLinkTransaction
     */
    NODE_KEY_LINK = 16972,
    /**
     * AggregateCompleteTransaction
     */
    AGGREGATE_COMPLETE = 16705,
    /**
     * AggregateBondedTransaction
     */
    AGGREGATE_BONDED = 16961,
    /**
     * VotingKeyLinkTransaction
     */
    VOTING_KEY_LINK = 16707,
    /**
     * VrfKeyLinkTransaction
     */
    VRF_KEY_LINK = 16963,
    /**
     * HashLockTransaction
     */
    HASH_LOCK = 16712,
    /**
     * SecretLockTransaction
     */
    SECRET_LOCK = 16722,
    /**
     * SecretProofTransaction
     */
    SECRET_PROOF = 16978,
    /**
     * AccountMetadataTransaction
     */
    ACCOUNT_METADATA = 16708,
    /**
     * MosaicMetadataTransaction
     */
    MOSAIC_METADATA = 16964,
    /**
     * NamespaceMetadataTransaction
     */
    NAMESPACE_METADATA = 17220,
    /**
     * MosaicDefinitionTransaction
     */
    MOSAIC_DEFINITION = 16717,
    /**
     * MosaicSupplyChangeTransaction
     */
    MOSAIC_SUPPLY_CHANGE = 16973,
    /**
     * MosaicSupplyRevocationTransaction
     */
    MOSAIC_SUPPLY_REVOCATION = 17229,
    /**
     * MultisigAccountModificationTransaction
     */
    MULTISIG_ACCOUNT_MODIFICATION = 16725,
    /**
     * AddressAliasTransaction
     */
    ADDRESS_ALIAS = 16974,
    /**
     * MosaicAliasTransaction
     */
    MOSAIC_ALIAS = 17230,
    /**
     * NamespaceRegistrationTransaction
     */
    NAMESPACE_REGISTRATION = 16718,
    /**
     * AccountAddressRestrictionTransaction
     */
    ACCOUNT_ADDRESS_RESTRICTION = 16720,
    /**
     * AccountMosaicRestrictionTransaction
     */
    ACCOUNT_MOSAIC_RESTRICTION = 16976,
    /**
     * AccountOperationRestrictionTransaction
     */
    ACCOUNT_OPERATION_RESTRICTION = 17232,
    /**
     * MosaicAddressRestrictionTransaction
     */
    MOSAIC_ADDRESS_RESTRICTION = 16977,
    /**
     * MosaicGlobalRestrictionTransaction
     */
    MOSAIC_GLOBAL_RESTRICTION = 16721,
    /**
     * TransferTransaction
     */
    TRANSFER = 16724,
    /**
     * PriceTransaction
     */
    PRICE = 16726,
}

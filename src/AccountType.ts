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
 * enumeration of account types
 */
export enum AccountType {
    /**
     * account is not linked to another account
     */
    UNLINKED = 0,
    /**
     * account is a balance-holding account that is linked to a remote harvester account
     */
    MAIN = 1,
    /**
     * account is a remote harvester account that is linked to a balance-holding account
     */
    REMOTE = 2,
    /**
     * account is a remote harvester eligible account that is unlinked *note this allows an account that has previously been used as remote to be reused as a
     * remote
     */
    REMOTE_UNLINKED = 3,
}

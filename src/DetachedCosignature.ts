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
import { Hash256 } from './Hash256';
import { PublicKey } from './PublicKey';
import { Serializer } from './Serializer';
import { Signature } from './Signature';
import { Utils } from './Utils';

/**
 * Interface to create instances of DetachedCosignature
 */
export interface DetachedCosignatureParams {
    /**
     * Version.
     */
    version: bigint;
    /**
     * Cosigner public key.
     */
    signerPublicKey: PublicKey;
    /**
     * Transaction signature.
     */
    signature: Signature;
    /**
     * Hash of the AggregateBondedTransaction that is signed by this cosignature.
     */
    parentHash: Hash256;
}

/**
 * Cosignature detached from an AggregateCompleteTransaction or AggregateBondedTransaction.
 */
export class DetachedCosignature implements Serializer {
    /**
     * Version.
     */
    public readonly version: bigint;
    /**
     * Cosigner public key.
     */
    public readonly signerPublicKey: PublicKey;
    /**
     * Transaction signature.
     */
    public readonly signature: Signature;
    /**
     * Hash of the AggregateBondedTransaction that is signed by this cosignature.
     */
    public readonly parentHash: Hash256;

    /**
     * Constructor
     * @param version - Version.
     * @param signerPublicKey - Cosigner public key.
     * @param signature - Transaction signature.
     * @param parentHash - Hash of the AggregateBondedTransaction that is signed by this cosignature.
     */
    constructor({ version, signerPublicKey, signature, parentHash }: DetachedCosignatureParams) {
        this.version = version;
        this.signerPublicKey = signerPublicKey;
        this.signature = signature;
        this.parentHash = parentHash;
    }

    /**
     * Creates an instance of DetachedCosignature from binary payload
     * @param payload - byte payload to use to serialize the object
     * @returns Creates an instance of DetachedCosignature from binary payload
     */
    public static deserialize(payload: Uint8Array): DetachedCosignature {
        const byteArray = Array.from(payload);
        const version = Utils.bufferToBigInt(Uint8Array.from(byteArray));
        byteArray.splice(0, 8);
        const signerPublicKey = PublicKey.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, signerPublicKey.size);
        const signature = Signature.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, signature.size);
        const parentHash = Hash256.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, parentHash.size);
        return new DetachedCosignature({
            version: version,
            signerPublicKey: signerPublicKey,
            signature: signature,
            parentHash: parentHash,
        });
    }

    /**
     * Gets the size of the object
     * @returns Gets the size of the object
     */
    public get size(): number {
        let size = 0;
        size += 8; // version;
        size += this.signerPublicKey.size; // signerPublicKey;
        size += this.signature.size; // signature;
        size += this.parentHash.size; // parentHash;
        return size;
    }

    /**
     * Serializes an object to bytes
     * @returns Serializes an object to bytes
     */
    public serialize(): Uint8Array {
        let newArray = new Uint8Array();
        const versionBytes = Utils.bigIntToBuffer(this.version);
        newArray = Utils.concatTypedArrays(newArray, versionBytes);
        const signerPublicKeyBytes = this.signerPublicKey.serialize();
        newArray = Utils.concatTypedArrays(newArray, signerPublicKeyBytes);
        const signatureBytes = this.signature.serialize();
        newArray = Utils.concatTypedArrays(newArray, signatureBytes);
        const parentHashBytes = this.parentHash.serialize();
        newArray = Utils.concatTypedArrays(newArray, parentHashBytes);
        return newArray;
    }
}

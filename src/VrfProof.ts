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
import { ProofGamma } from './ProofGamma';
import { ProofScalar } from './ProofScalar';
import { ProofVerificationHash } from './ProofVerificationHash';
import { Serializer } from './Serializer';
import { Utils } from './Utils';

/**
 * Interface to create instances of VrfProof
 */
export interface VrfProofParams {
    /**
     * gamma
     */
    gamma: ProofGamma;
    /**
     * verification hash
     */
    verificationHash: ProofVerificationHash;
    /**
     * scalar
     */
    scalar: ProofScalar;
}

/**
 * verfiable random function proof
 */
export class VrfProof implements Serializer {
    /**
     * gamma
     */
    public readonly gamma: ProofGamma;
    /**
     * verification hash
     */
    public readonly verificationHash: ProofVerificationHash;
    /**
     * scalar
     */
    public readonly scalar: ProofScalar;

    /**
     * Constructor
     * @param gamma - gamma
     * @param verificationHash - verification hash
     * @param scalar - scalar
     */
    constructor({ gamma, verificationHash, scalar }: VrfProofParams) {
        this.gamma = gamma;
        this.verificationHash = verificationHash;
        this.scalar = scalar;
    }

    /**
     * Creates an instance of VrfProof from binary payload
     * @param payload - byte payload to use to serialize the object
     * @returns Creates an instance of VrfProof from binary payload
     */
    public static deserialize(payload: Uint8Array): VrfProof {
        const byteArray = Array.from(payload);
        const gamma = ProofGamma.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, gamma.size);
        const verificationHash = ProofVerificationHash.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, verificationHash.size);
        const scalar = ProofScalar.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, scalar.size);
        return new VrfProof({ gamma: gamma, verificationHash: verificationHash, scalar: scalar });
    }

    /**
     * Gets the size of the object
     * @returns Gets the size of the object
     */
    public get size(): number {
        let size = 0;
        size += this.gamma.size; // gamma;
        size += this.verificationHash.size; // verificationHash;
        size += this.scalar.size; // scalar;
        return size;
    }

    /**
     * Serializes an object to bytes
     * @returns Serializes an object to bytes
     */
    public serialize(): Uint8Array {
        let newArray = new Uint8Array();
        const gammaBytes = this.gamma.serialize();
        newArray = Utils.concatTypedArrays(newArray, gammaBytes);
        const verificationHashBytes = this.verificationHash.serialize();
        newArray = Utils.concatTypedArrays(newArray, verificationHashBytes);
        const scalarBytes = this.scalar.serialize();
        newArray = Utils.concatTypedArrays(newArray, scalarBytes);
        return newArray;
    }
}

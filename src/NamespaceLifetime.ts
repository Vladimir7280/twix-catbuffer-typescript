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
import { Height } from './Height';
import { Serializer } from './Serializer';
import { Utils } from './Utils';

/**
 * Interface to create instances of NamespaceLifetime
 */
export interface NamespaceLifetimeParams {
    /**
     * start height
     */
    lifetimeStart: Height;
    /**
     * end height
     */
    lifetimeEnd: Height;
}

/**
 * binary layout for namespace lifetime
 */
export class NamespaceLifetime implements Serializer {
    /**
     * start height
     */
    public readonly lifetimeStart: Height;
    /**
     * end height
     */
    public readonly lifetimeEnd: Height;

    /**
     * Constructor
     * @param lifetimeStart - start height
     * @param lifetimeEnd - end height
     */
    constructor({ lifetimeStart, lifetimeEnd }: NamespaceLifetimeParams) {
        this.lifetimeStart = lifetimeStart;
        this.lifetimeEnd = lifetimeEnd;
    }

    /**
     * Creates an instance of NamespaceLifetime from binary payload
     * @param payload - byte payload to use to serialize the object
     * @returns Creates an instance of NamespaceLifetime from binary payload
     */
    public static deserialize(payload: Uint8Array): NamespaceLifetime {
        const byteArray = Array.from(payload);
        const lifetimeStart = Height.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, lifetimeStart.size);
        const lifetimeEnd = Height.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, lifetimeEnd.size);
        return new NamespaceLifetime({ lifetimeStart: lifetimeStart, lifetimeEnd: lifetimeEnd });
    }

    /**
     * Gets the size of the object
     * @returns Gets the size of the object
     */
    public get size(): number {
        let size = 0;
        size += this.lifetimeStart.size; // lifetimeStart;
        size += this.lifetimeEnd.size; // lifetimeEnd;
        return size;
    }

    /**
     * Serializes an object to bytes
     * @returns Serializes an object to bytes
     */
    public serialize(): Uint8Array {
        let newArray = new Uint8Array();
        const lifetimeStartBytes = this.lifetimeStart.serialize();
        newArray = Utils.concatTypedArrays(newArray, lifetimeStartBytes);
        const lifetimeEndBytes = this.lifetimeEnd.serialize();
        newArray = Utils.concatTypedArrays(newArray, lifetimeEndBytes);
        return newArray;
    }
}

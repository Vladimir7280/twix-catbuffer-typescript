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
import { NamespaceAlias } from './NamespaceAlias';
import { NamespaceId } from './NamespaceId';
import { Serializer } from './Serializer';
import { Utils } from './Utils';

/**
 * Interface to create instances of NamespacePath
 */
export interface NamespacePathParams {
    /**
     * namespace path (excluding root id)
     */
    path: NamespaceId[];
    /**
     * namespace alias
     */
    alias: NamespaceAlias;
}

/**
 * binary layout for a namespace path
 */
export class NamespacePath implements Serializer {
    /**
     * namespace path (excluding root id)
     */
    public readonly path: NamespaceId[];
    /**
     * namespace alias
     */
    public readonly alias: NamespaceAlias;

    /**
     * Constructor
     * @param path - namespace path (excluding root id)
     * @param alias - namespace alias
     */
    constructor({ path, alias }: NamespacePathParams) {
        this.path = path;
        this.alias = alias;
    }

    /**
     * Creates an instance of NamespacePath from binary payload
     * @param payload - byte payload to use to serialize the object
     * @returns Creates an instance of NamespacePath from binary payload
     */
    public static deserialize(payload: Uint8Array): NamespacePath {
        const byteArray = Array.from(payload);
        const pathSize = Utils.bufferToUint8(Uint8Array.from(byteArray));
        byteArray.splice(0, 1);
        const path = Utils.deserialize(NamespaceId.deserialize, Uint8Array.from(byteArray), pathSize);
        byteArray.splice(0, path.reduce((sum, c) => sum + c.size, 0));
        const alias = NamespaceAlias.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, alias.size);
        return new NamespacePath({ path: path, alias: alias });
    }

    /**
     * Gets the size of the object
     * @returns Gets the size of the object
     */
    public get size(): number {
        let size = 0;
        size += 1; // pathSize;
        size += this.path.reduce((sum, c) => sum + Utils.getSizeWithPadding(c.size, 0), 0); // path;
        size += this.alias.size; // alias;
        return size;
    }

    /**
     * Serializes an object to bytes
     * @returns Serializes an object to bytes
     */
    public serialize(): Uint8Array {
        let newArray = new Uint8Array();
        const pathSizeBytes = Utils.uint8ToBuffer(this.path.length);
        newArray = Utils.concatTypedArrays(newArray, pathSizeBytes);
        const pathBytes = Utils.writeList(this.path, 0);
        newArray = Utils.concatTypedArrays(newArray, pathBytes);
        const aliasBytes = this.alias.serialize();
        newArray = Utils.concatTypedArrays(newArray, aliasBytes);
        return newArray;
    }
}

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
import { Address } from './Address';
import { NamespaceAlias } from './NamespaceAlias';
import { NamespaceId } from './NamespaceId';
import { NamespaceLifetime } from './NamespaceLifetime';
import { NamespacePath } from './NamespacePath';
import { Serializer } from './Serializer';
import { Utils } from './Utils';

/**
 * Interface to create instances of RootNamespaceHistory
 */
export interface RootNamespaceHistoryParams {
    /**
     * serialization version
     */
    version: number;
    /**
     * id of the root namespace history
     */
    id: NamespaceId;
    /**
     * namespace owner address
     */
    ownerAddress: Address;
    /**
     * lifetime in blocks
     */
    lifetime: NamespaceLifetime;
    /**
     * root namespace alias
     */
    rootAlias: NamespaceAlias;
    /**
     * save child sub-namespace paths
     */
    paths: NamespacePath[];
}

/**
 * binary layout for non-historical root namespace history
 */
export class RootNamespaceHistory implements Serializer {
    /**
     * serialization version
     */
    public readonly version: number;
    /**
     * id of the root namespace history
     */
    public readonly id: NamespaceId;
    /**
     * namespace owner address
     */
    public readonly ownerAddress: Address;
    /**
     * lifetime in blocks
     */
    public readonly lifetime: NamespaceLifetime;
    /**
     * root namespace alias
     */
    public readonly rootAlias: NamespaceAlias;
    /**
     * save child sub-namespace paths
     */
    public readonly paths: NamespacePath[];

    /**
     * Constructor
     * @param version - serialization version
     * @param id - id of the root namespace history
     * @param ownerAddress - namespace owner address
     * @param lifetime - lifetime in blocks
     * @param rootAlias - root namespace alias
     * @param paths - save child sub-namespace paths
     */
    constructor({ version, id, ownerAddress, lifetime, rootAlias, paths }: RootNamespaceHistoryParams) {
        this.version = version;
        this.id = id;
        this.ownerAddress = ownerAddress;
        this.lifetime = lifetime;
        this.rootAlias = rootAlias;
        this.paths = paths;
    }

    /**
     * Creates an instance of RootNamespaceHistory from binary payload
     * @param payload - byte payload to use to serialize the object
     * @returns Creates an instance of RootNamespaceHistory from binary payload
     */
    public static deserialize(payload: Uint8Array): RootNamespaceHistory {
        const byteArray = Array.from(payload);
        const version = Utils.bufferToUint16(Uint8Array.from(byteArray));
        byteArray.splice(0, 2);
        const id = NamespaceId.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, id.size);
        const ownerAddress = Address.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, ownerAddress.size);
        const lifetime = NamespaceLifetime.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, lifetime.size);
        const rootAlias = NamespaceAlias.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, rootAlias.size);
        const childrenCount = Utils.bufferToBigInt(Uint8Array.from(byteArray));
        byteArray.splice(0, 8);
        const paths = Utils.deserialize(NamespacePath.deserialize, Uint8Array.from(byteArray), childrenCount);
        byteArray.splice(0, paths.reduce((sum, c) => sum + c.size, 0));
        return new RootNamespaceHistory({
            version: version,
            id: id,
            ownerAddress: ownerAddress,
            lifetime: lifetime,
            rootAlias: rootAlias,
            paths: paths,
        });
    }

    /**
     * Gets the size of the object
     * @returns Gets the size of the object
     */
    public get size(): number {
        let size = 0;
        size += 2; // version;
        size += this.id.size; // id;
        size += this.ownerAddress.size; // ownerAddress;
        size += this.lifetime.size; // lifetime;
        size += this.rootAlias.size; // rootAlias;
        size += 8; // childrenCount;
        size += this.paths.reduce((sum, c) => sum + Utils.getSizeWithPadding(c.size, 0), 0); // paths;
        return size;
    }

    /**
     * Serializes an object to bytes
     * @returns Serializes an object to bytes
     */
    public serialize(): Uint8Array {
        let newArray = new Uint8Array();
        const versionBytes = Utils.uint16ToBuffer(this.version);
        newArray = Utils.concatTypedArrays(newArray, versionBytes);
        const idBytes = this.id.serialize();
        newArray = Utils.concatTypedArrays(newArray, idBytes);
        const ownerAddressBytes = this.ownerAddress.serialize();
        newArray = Utils.concatTypedArrays(newArray, ownerAddressBytes);
        const lifetimeBytes = this.lifetime.serialize();
        newArray = Utils.concatTypedArrays(newArray, lifetimeBytes);
        const rootAliasBytes = this.rootAlias.serialize();
        newArray = Utils.concatTypedArrays(newArray, rootAliasBytes);
        const childrenCountBytes = Utils.bigIntToBuffer(this.paths.length);
        newArray = Utils.concatTypedArrays(newArray, childrenCountBytes);
        const pathsBytes = Utils.writeList(this.paths, 0);
        newArray = Utils.concatTypedArrays(newArray, pathsBytes);
        return newArray;
    }
}

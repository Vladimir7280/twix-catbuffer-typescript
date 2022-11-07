import { Address } from './Address';
import { NamespaceAlias } from './NamespaceAlias';
import { NamespaceId } from './NamespaceId';
import { NamespaceLifetime } from './NamespaceLifetime';
import { NamespacePath } from './NamespacePath';
import { Serializer } from './Serializer';
export interface RootNamespaceHistoryParams {
    version: number;
    id: NamespaceId;
    ownerAddress: Address;
    lifetime: NamespaceLifetime;
    rootAlias: NamespaceAlias;
    paths: NamespacePath[];
}
export declare class RootNamespaceHistory implements Serializer {
    readonly version: number;
    readonly id: NamespaceId;
    readonly ownerAddress: Address;
    readonly lifetime: NamespaceLifetime;
    readonly rootAlias: NamespaceAlias;
    readonly paths: NamespacePath[];
    constructor({ version, id, ownerAddress, lifetime, rootAlias, paths }: RootNamespaceHistoryParams);
    static deserialize(payload: Uint8Array): RootNamespaceHistory;
    get size(): number;
    serialize(): Uint8Array;
}

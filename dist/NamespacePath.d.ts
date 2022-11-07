import { NamespaceAlias } from './NamespaceAlias';
import { NamespaceId } from './NamespaceId';
import { Serializer } from './Serializer';
export interface NamespacePathParams {
    path: NamespaceId[];
    alias: NamespaceAlias;
}
export declare class NamespacePath implements Serializer {
    readonly path: NamespaceId[];
    readonly alias: NamespaceAlias;
    constructor({ path, alias }: NamespacePathParams);
    static deserialize(payload: Uint8Array): NamespacePath;
    get size(): number;
    serialize(): Uint8Array;
}

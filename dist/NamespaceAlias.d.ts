import { Address } from './Address';
import { MosaicId } from './MosaicId';
import { NamespaceAliasType } from './NamespaceAliasType';
import { Serializer } from './Serializer';
export interface NamespaceAliasParams {
    namespaceAliasType: NamespaceAliasType;
    mosaicAlias?: MosaicId;
    addressAlias?: Address;
}
export declare class NamespaceAlias implements Serializer {
    readonly namespaceAliasType: NamespaceAliasType;
    readonly mosaicAlias?: MosaicId;
    readonly addressAlias?: Address;
    constructor({ namespaceAliasType, mosaicAlias, addressAlias }: NamespaceAliasParams);
    static deserialize(payload: Uint8Array): NamespaceAlias;
    get size(): number;
    serialize(): Uint8Array;
}

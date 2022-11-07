import { Address } from './Address';
import { Height } from './Height';
import { MosaicProperties } from './MosaicProperties';
import { Serializer } from './Serializer';
export interface MosaicDefinitionParams {
    startHeight: Height;
    ownerAddress: Address;
    revision: number;
    properties: MosaicProperties;
}
export declare class MosaicDefinition implements Serializer {
    readonly startHeight: Height;
    readonly ownerAddress: Address;
    readonly revision: number;
    readonly properties: MosaicProperties;
    constructor({ startHeight, ownerAddress, revision, properties }: MosaicDefinitionParams);
    static deserialize(payload: Uint8Array): MosaicDefinition;
    get size(): number;
    serialize(): Uint8Array;
}

import { GlobalKeyValue } from './GlobalKeyValue';
import { Serializer } from './Serializer';
export interface GlobalKeyValueSetParams {
    keys: GlobalKeyValue[];
}
export declare class GlobalKeyValueSet implements Serializer {
    readonly keys: GlobalKeyValue[];
    constructor({ keys }: GlobalKeyValueSetParams);
    static deserialize(payload: Uint8Array): GlobalKeyValueSet;
    get size(): number;
    serialize(): Uint8Array;
}

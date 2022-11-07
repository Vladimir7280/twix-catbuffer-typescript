import { Height } from './Height';
import { Serializer } from './Serializer';
export interface NamespaceLifetimeParams {
    lifetimeStart: Height;
    lifetimeEnd: Height;
}
export declare class NamespaceLifetime implements Serializer {
    readonly lifetimeStart: Height;
    readonly lifetimeEnd: Height;
    constructor({ lifetimeStart, lifetimeEnd }: NamespaceLifetimeParams);
    static deserialize(payload: Uint8Array): NamespaceLifetime;
    get size(): number;
    serialize(): Uint8Array;
}

import { Address } from './Address';
import { Hash256 } from './Hash256';
import { Height } from './Height';
import { LockStatus } from './LockStatus';
import { Mosaic } from './Mosaic';
import { Serializer } from './Serializer';
export interface HashLockInfoParams {
    version: number;
    ownerAddress: Address;
    mosaic: Mosaic;
    endHeight: Height;
    status: LockStatus;
    hash: Hash256;
}
export declare class HashLockInfo implements Serializer {
    readonly version: number;
    readonly ownerAddress: Address;
    readonly mosaic: Mosaic;
    readonly endHeight: Height;
    readonly status: LockStatus;
    readonly hash: Hash256;
    constructor({ version, ownerAddress, mosaic, endHeight, status, hash }: HashLockInfoParams);
    static deserialize(payload: Uint8Array): HashLockInfo;
    get size(): number;
    serialize(): Uint8Array;
}

import { Address } from './Address';
import { Hash256 } from './Hash256';
import { Height } from './Height';
import { LockHashAlgorithm } from './LockHashAlgorithm';
import { LockStatus } from './LockStatus';
import { Mosaic } from './Mosaic';
import { Serializer } from './Serializer';
export interface SecretLockInfoParams {
    version: number;
    ownerAddress: Address;
    mosaic: Mosaic;
    endHeight: Height;
    status: LockStatus;
    hashAlgorithm: LockHashAlgorithm;
    secret: Hash256;
    recipient: Address;
}
export declare class SecretLockInfo implements Serializer {
    readonly version: number;
    readonly ownerAddress: Address;
    readonly mosaic: Mosaic;
    readonly endHeight: Height;
    readonly status: LockStatus;
    readonly hashAlgorithm: LockHashAlgorithm;
    readonly secret: Hash256;
    readonly recipient: Address;
    constructor({ version, ownerAddress, mosaic, endHeight, status, hashAlgorithm, secret, recipient }: SecretLockInfoParams);
    static deserialize(payload: Uint8Array): SecretLockInfo;
    get size(): number;
    serialize(): Uint8Array;
}

import { AccountRestrictionsInfo } from './AccountRestrictionsInfo';
import { Address } from './Address';
import { Serializer } from './Serializer';
export interface AccountRestrictionsParams {
    version: number;
    address: Address;
    restrictions: AccountRestrictionsInfo[];
}
export declare class AccountRestrictions implements Serializer {
    readonly version: number;
    readonly address: Address;
    readonly restrictions: AccountRestrictionsInfo[];
    constructor({ version, address, restrictions }: AccountRestrictionsParams);
    static deserialize(payload: Uint8Array): AccountRestrictions;
    get size(): number;
    serialize(): Uint8Array;
}

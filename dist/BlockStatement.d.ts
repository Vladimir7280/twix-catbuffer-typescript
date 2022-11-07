import { AddressResolutionStatement } from './AddressResolutionStatement';
import { MosaicResolutionStatement } from './MosaicResolutionStatement';
import { Serializer } from './Serializer';
import { TransactionStatement } from './TransactionStatement';
export interface BlockStatementParams {
    transactionStatements: TransactionStatement[];
    addressResolutionStatements: AddressResolutionStatement[];
    mosaicResolutionStatements: MosaicResolutionStatement[];
}
export declare class BlockStatement implements Serializer {
    readonly transactionStatements: TransactionStatement[];
    readonly addressResolutionStatements: AddressResolutionStatement[];
    readonly mosaicResolutionStatements: MosaicResolutionStatement[];
    constructor({ transactionStatements, addressResolutionStatements, mosaicResolutionStatements }: BlockStatementParams);
    static deserialize(payload: Uint8Array): BlockStatement;
    get size(): number;
    serialize(): Uint8Array;
}

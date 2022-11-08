import { PriceTransactionBodyBuilder } from './PriceTransactionBodyBuilder';
import { AmountDto } from './AmountDto';
import { NetworkTypeDto } from './NetworkTypeDto';
import { PublicKeyDto } from './PublicKeyDto';
import { Serializer } from './Serializer';
import { SignatureDto } from './SignatureDto';
import { TimestampDto } from './TimestampDto';
import { TransactionBuilder } from './TransactionBuilder';
import { TransactionTypeDto } from './TransactionTypeDto';
export declare class PriceTransactionBuilder extends TransactionBuilder implements Serializer {
    readonly priceTransactionBody: PriceTransactionBodyBuilder;
    constructor(signature: SignatureDto, signerPublicKey: PublicKeyDto, version: number, network: NetworkTypeDto, type: TransactionTypeDto, fee: AmountDto, deadline: TimestampDto, blockHeight: AmountDto, highPrice: AmountDto, lowPrice: AmountDto);
    static loadFromBinary(payload: Uint8Array): PriceTransactionBuilder;
    static createPriceTransactionBuilder(signature: SignatureDto, signerPublicKey: PublicKeyDto, version: number, network: NetworkTypeDto, type: TransactionTypeDto, fee: AmountDto, deadline: TimestampDto, blockHeight: AmountDto, highPrice: AmountDto, lowPrice: AmountDto): PriceTransactionBuilder;
    getblockHeight(): AmountDto;
    gethighPrice(): AmountDto;
    getlowPrice(): AmountDto;
    getSize(): number;
    getBody(): PriceTransactionBodyBuilder;
    serialize(): Uint8Array;
}

import { AmountDto } from './AmountDto';
import { Serializer } from './Serializer';
export declare class PriceTransactionBodyBuilder implements Serializer {
    readonly blockHeight: AmountDto;
    readonly highPrice: AmountDto;
    readonly lowPrice: AmountDto;
    constructor(blockHeight: AmountDto, highPrice: AmountDto, lowPrice: AmountDto);
    static loadFromBinary(payload: Uint8Array): PriceTransactionBodyBuilder;
    static createAddressAliasTransactionBodyBuilder(blockHeight: AmountDto, highPrice: AmountDto, lowPrice: AmountDto): PriceTransactionBodyBuilder;
    getblockHeight(): AmountDto;
    gethighPrice(): AmountDto;
    getlowPrice(): AmountDto;
    getSize(): number;
    serialize(): Uint8Array;
}

import { PriceTransactionBodyBuilder } from './PriceTransactionBodyBuilder';
import { EmbeddedTransactionBuilder } from './EmbeddedTransactionBuilder';
import { AmountDto } from './AmountDto';
import { NetworkTypeDto } from './NetworkTypeDto';
import { PublicKeyDto } from './PublicKeyDto';
import { Serializer } from './Serializer';
import { TransactionTypeDto } from './TransactionTypeDto';
export declare class EmbeddedPriceTransactionBuilder extends EmbeddedTransactionBuilder implements Serializer {
    readonly priceTransactionBody: PriceTransactionBodyBuilder;
    constructor(signerPublicKey: PublicKeyDto, version: number, network: NetworkTypeDto, type: TransactionTypeDto, blockHeight: AmountDto, highPrice: AmountDto, lowPrice: AmountDto);
    static loadFromBinary(payload: Uint8Array): EmbeddedPriceTransactionBuilder;
    static createEmbeddedPriceTransactionBuilder(signerPublicKey: PublicKeyDto, version: number, network: NetworkTypeDto, type: TransactionTypeDto, blockHeight: AmountDto, highPrice: AmountDto, lowPrice: AmountDto): EmbeddedPriceTransactionBuilder;
    getblockHeight(): AmountDto;
    gethighPrice(): AmountDto;
    getlowPrice(): AmountDto;
    getSize(): number;
    getBody(): PriceTransactionBodyBuilder;
    serialize(): Uint8Array;
}

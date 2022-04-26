import { AmountDto } from './AmountDto';
import { GeneratorUtils } from './GeneratorUtils';
import { Serializer } from './Serializer';

/**
 * Shared content between AddressAliasTransaction and EmbeddedAddressAliasTransaction.
 **/
export class PriceTransactionBodyBuilder implements Serializer {
    /** Identifier of the namespace that will become (or stop being) an alias for the address.. **/
    readonly blockHeight: AmountDto;

    /** Aliased address.. **/
    readonly highPrice: AmountDto;

    /** Alias action.. **/
    readonly lowPrice: AmountDto;

    /**
     * Constructor.
     *
     * @param blockHeight Identifier of the namespace that will become (or stop being) an alias for the address..
     * @param highPrice Aliased address..
     * @param lowPrice Alias action..
     */
    public constructor(blockHeight: AmountDto, highPrice: AmountDto, lowPrice: AmountDto) {
        GeneratorUtils.notNull(blockHeight, 'blockHeight is null or undefined');
        GeneratorUtils.notNull(highPrice, 'highPrice is null or undefined');
        GeneratorUtils.notNull(lowPrice, 'lowPrice is null or undefined');
        this.blockHeight = blockHeight;
        this.highPrice = highPrice;
        this.lowPrice = lowPrice;
    }

    /**
     * Load from binary array - Creates an object from payload.
     *
     * @param payload - Byte payload to use to serialize the object.
     */

    public static loadFromBinary(payload: Uint8Array): PriceTransactionBodyBuilder {
        const byteArray = Array.from(payload);
        const blockHeight: AmountDto = AmountDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, blockHeight.getSize());
        const highPrice: AmountDto = AmountDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, highPrice.getSize());
        const lowPrice: AmountDto = AmountDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, lowPrice.getSize());
        return new PriceTransactionBodyBuilder(blockHeight, highPrice, lowPrice);
    }

    /**
     * Creates an instance of AddressAliasTransactionBodyBuilder.
     *
     * @param blockHeight Identifier of the namespace that will become (or stop being) an alias for the address..
     * @param highPrice Aliased address..
     * @param lowPrice Alias action..
     * @return Instance of AddressAliasTransactionBodyBuilder.
     */
    public static createAddressAliasTransactionBodyBuilder(
        blockHeight: AmountDto,
        highPrice: AmountDto,
        lowPrice: AmountDto,
    ): PriceTransactionBodyBuilder {
        return new PriceTransactionBodyBuilder(blockHeight, highPrice, lowPrice);
    }

    /**
     * Gets Identifier of the namespace that will become (or stop being) an alias for the address..
     *
     * @return Identifier of the namespace that will become (or stop being) an alias for the address..
     */
    public getblockHeight(): AmountDto {
        return this.blockHeight;
    }

    /**
     * Gets Aliased address..
     *
     * @return Aliased address..
     */
    public gethighPrice(): AmountDto {
        return this.highPrice;
    }

    /**
     * Gets Alias action..
     *
     * @return Alias action..
     */
    public getlowPrice(): AmountDto {
        return this.lowPrice;
    }

    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public getSize(): number {
        let size = 0;
        size += this.blockHeight.getSize(); // namespaceId
        size += this.highPrice.getSize(); // address
        size += this.lowPrice.getSize(); // address
        return size;
    }

    /**
     * Serializes an object to bytes.
     *
     * @return Serialized bytes.
     */
    public serialize(): Uint8Array {
        let newArray = Uint8Array.from([]);
        const blockHeightBytes = this.blockHeight.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, blockHeightBytes);
        const highPriceBytes = this.highPrice.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, highPriceBytes);
        const lowPriceBytes = this.highPrice.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, lowPriceBytes);
        return newArray;
    }
}

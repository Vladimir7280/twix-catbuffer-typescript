import { PriceTransactionBodyBuilder } from './PriceTransactionBodyBuilder';
import { EmbeddedTransactionBuilder } from './EmbeddedTransactionBuilder';
import { GeneratorUtils } from './GeneratorUtils';
import { AmountDto } from './AmountDto';
import { NetworkTypeDto } from './NetworkTypeDto';
import { PublicKeyDto } from './PublicKeyDto';
import { Serializer } from './Serializer';
import { TransactionTypeDto } from './TransactionTypeDto';

/**
 * Embedded version of AddressAliasTransaction.
 **/
export class EmbeddedPriceTransactionBuilder extends EmbeddedTransactionBuilder implements Serializer {
    /** Address alias transaction body. **/
    readonly priceTransactionBody: PriceTransactionBodyBuilder;

    /**
     * Constructor.
     *
     * @param signerPublicKey Public key of the signer of the entity..
     * @param version Version of this structure..
     * @param network Network on which this entity was created..
     * @param type Transaction type.
     * @param blockHeight Identifier of the namespace that will become (or stop being) an alias for the address..
     * @param highPrice Aliased address..
     * @param lowPrice Alias action..
     */
    public constructor(
        signerPublicKey: PublicKeyDto,
        version: number,
        network: NetworkTypeDto,
        type: TransactionTypeDto,
        blockHeight: AmountDto,
        highPrice: AmountDto,
        lowPrice: AmountDto,
    ) {
        super(signerPublicKey, version, network, type);
        this.priceTransactionBody = new PriceTransactionBodyBuilder(blockHeight, highPrice, lowPrice);
    }

    /**
     * Load from binary array - Creates an object from payload.
     *
     * @param payload - Byte payload to use to serialize the object.
     */

    public static loadFromBinary(payload: Uint8Array): EmbeddedPriceTransactionBuilder {
        const byteArray = Array.from(payload);
        const superObject = EmbeddedTransactionBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.getSize());
        const addressAliasTransactionBody: PriceTransactionBodyBuilder = PriceTransactionBodyBuilder.loadFromBinary(
            Uint8Array.from(byteArray),
        );
        byteArray.splice(0, addressAliasTransactionBody.getSize());
        return new EmbeddedPriceTransactionBuilder(
            superObject.signerPublicKey,
            superObject.version,
            superObject.network,
            superObject.type,
            addressAliasTransactionBody.blockHeight,
            addressAliasTransactionBody.highPrice,
            addressAliasTransactionBody.lowPrice,
        );
    }

    /**
     * Creates an instance of EmbeddedAddressAliasTransactionBuilder.
     *
     * @param signerPublicKey Public key of the signer of the entity..
     * @param version Version of this structure..
     * @param network Network on which this entity was created..
     * @param type Transaction type.
     * @param blockHeight Identifier of the namespace that will become (or stop being) an alias for the address..
     * @param highPrice Aliased address..
     * @param lowPrice Alias action..
     * @return Instance of EmbeddedAddressAliasTransactionBuilder.
     */
    public static createEmbeddedPriceTransactionBuilder(
        signerPublicKey: PublicKeyDto,
        version: number,
        network: NetworkTypeDto,
        type: TransactionTypeDto,
        blockHeight: AmountDto,
        highPrice: AmountDto,
        lowPrice: AmountDto,
    ): EmbeddedPriceTransactionBuilder {
        return new EmbeddedPriceTransactionBuilder(signerPublicKey, version, network, type, blockHeight, highPrice, lowPrice);
    }

    /**
     * Gets Identifier of the namespace that will become (or stop being) an alias for the address..
     *
     * @return Identifier of the namespace that will become (or stop being) an alias for the address..
     */
    public getblockHeight(): AmountDto {
        return this.priceTransactionBody.getblockHeight();
    }

    /**
     * Gets Aliased address..
     *
     * @return Aliased address..
     */
    public gethighPrice(): AmountDto {
        return this.priceTransactionBody.gethighPrice();
    }

    /**
     * Gets Alias action..
     *
     * @return Alias action..
     */
    public getlowPrice(): AmountDto {
        return this.priceTransactionBody.getlowPrice();
    }

    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public getSize(): number {
        let size = super.getSize();
        size += this.priceTransactionBody.getSize(); // addressAliasTransactionBody
        return size;
    }

    /**
     * Gets the body builder of the object.
     *
     * @return Body builder.
     */
    public getBody(): PriceTransactionBodyBuilder {
        return this.priceTransactionBody;
    }

    /**
     * Serializes an object to bytes.
     *
     * @return Serialized bytes.
     */
    public serialize(): Uint8Array {
        let newArray = Uint8Array.from([]);
        const superBytes = super.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, superBytes);
        const priceTransactionBodyBytes = this.priceTransactionBody.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, priceTransactionBodyBytes);
        return newArray;
    }
}

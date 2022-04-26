import { PriceTransactionBodyBuilder } from './PriceTransactionBodyBuilder';
import { AliasActionDto } from './AliasActionDto';
import { AmountDto } from './AmountDto';
import { GeneratorUtils } from './GeneratorUtils';
import { NetworkTypeDto } from './NetworkTypeDto';
import { PublicKeyDto } from './PublicKeyDto';
import { Serializer } from './Serializer';
import { SignatureDto } from './SignatureDto';
import { TimestampDto } from './TimestampDto';
import { TransactionBuilder } from './TransactionBuilder';
import { TransactionTypeDto } from './TransactionTypeDto';

/**
* Attach or detach a [namespace](/concepts/namespace.html) (alias) to an account address..
A namespace can be assigned to any account present in the network (this is, an account which has received at least one transaction).
**/
export class PriceTransactionBuilder extends TransactionBuilder implements Serializer {
    /** Address alias transaction body. **/
    readonly priceTransactionBody: PriceTransactionBodyBuilder;

    /**
     * Constructor.
     *
     * @param signature Entity's signature generated by the signing account..
     * @param signerPublicKey Public key of the signer of the entity..
     * @param version Version of this structure..
     * @param network Network on which this entity was created..
     * @param type Transaction type.
     * @param fee Transaction fee.
     * @param deadline Transaction deadline.
     * @param blockHeight Identifier of the namespace that will become (or stop being) an alias for the address..
     * @param highPrice Aliased address..
     * @param lowPrice Alias action..
     */
    public constructor(
        signature: SignatureDto,
        signerPublicKey: PublicKeyDto,
        version: number,
        network: NetworkTypeDto,
        type: TransactionTypeDto,
        fee: AmountDto,
        deadline: TimestampDto,
        blockHeight: AmountDto,
        highPrice: AmountDto,
        lowPrice: AmountDto,
    ) {
        super(signature, signerPublicKey, version, network, type, fee, deadline);
        this.priceTransactionBody = new PriceTransactionBodyBuilder(blockHeight, highPrice, lowPrice);
    }

    /**
     * Load from binary array - Creates an object from payload.
     *
     * @param payload - Byte payload to use to serialize the object.
     */

    public static loadFromBinary(payload: Uint8Array): PriceTransactionBuilder {
        const byteArray = Array.from(payload);
        const superObject = TransactionBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.getSize());
        const priceTransactionBody: PriceTransactionBodyBuilder = PriceTransactionBodyBuilder.loadFromBinary(
            Uint8Array.from(byteArray),
        );
        byteArray.splice(0, priceTransactionBody.getSize());
        return new PriceTransactionBuilder(
            superObject.signature,
            superObject.signerPublicKey,
            superObject.version,
            superObject.network,
            superObject.type,
            superObject.fee,
            superObject.deadline,
            priceTransactionBody.blockHeight,
            priceTransactionBody.highPrice,
            priceTransactionBody.lowPrice,
        );
    }

    /**
     * Creates an instance of AddressAliasTransactionBuilder.
     *
     * @param signature Entity's signature generated by the signing account..
     * @param signerPublicKey Public key of the signer of the entity..
     * @param version Version of this structure..
     * @param network Network on which this entity was created..
     * @param type Transaction type.
     * @param fee Transaction fee.
     * @param deadline Transaction deadline.
     * @param blockHeight Identifier of the namespace that will become (or stop being) an alias for the address..
     * @param highPrice Aliased address..
     * @param lowPrice Alias action..
     * @return Instance of AddressAliasTransactionBuilder.
     */
    public static createPriceTransactionBuilder(
        signature: SignatureDto,
        signerPublicKey: PublicKeyDto,
        version: number,
        network: NetworkTypeDto,
        type: TransactionTypeDto,
        fee: AmountDto,
        deadline: TimestampDto,
        blockHeight: AmountDto,
        highPrice: AmountDto,
        lowPrice: AmountDto,
    ): PriceTransactionBuilder {
        return new PriceTransactionBuilder(
            signature,
            signerPublicKey,
            version,
            network,
            type,
            fee,
            deadline,
            blockHeight,
            highPrice,
            lowPrice,
        );
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
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AggregateBondedTransactionV1Builder = void 0;
const AggregateTransactionBodyBuilder_1 = require("./AggregateTransactionBodyBuilder");
const GeneratorUtils_1 = require("./GeneratorUtils");
const TransactionBuilder_1 = require("./TransactionBuilder");
class AggregateBondedTransactionV1Builder extends TransactionBuilder_1.TransactionBuilder {
    constructor(signature, signerPublicKey, version, network, type, fee, deadline, transactionsHash, transactions, cosignatures) {
        super(signature, signerPublicKey, version, network, type, fee, deadline);
        this.aggregateTransactionBody = new AggregateTransactionBodyBuilder_1.AggregateTransactionBodyBuilder(transactionsHash, transactions, cosignatures);
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const superObject = TransactionBuilder_1.TransactionBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.getSize());
        const aggregateTransactionBody = AggregateTransactionBodyBuilder_1.AggregateTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, aggregateTransactionBody.getSize());
        return new AggregateBondedTransactionV1Builder(superObject.signature, superObject.signerPublicKey, superObject.version, superObject.network, superObject.type, superObject.fee, superObject.deadline, aggregateTransactionBody.transactionsHash, aggregateTransactionBody.transactions, aggregateTransactionBody.cosignatures);
    }
    static createAggregateBondedTransactionV1Builder(signature, signerPublicKey, version, network, type, fee, deadline, transactionsHash, transactions, cosignatures) {
        return new AggregateBondedTransactionV1Builder(signature, signerPublicKey, version, network, type, fee, deadline, transactionsHash, transactions, cosignatures);
    }
    getTransactionsHash() {
        return this.aggregateTransactionBody.getTransactionsHash();
    }
    getTransactions() {
        return this.aggregateTransactionBody.getTransactions();
    }
    getCosignatures() {
        return this.aggregateTransactionBody.getCosignatures();
    }
    getSize() {
        let size = super.getSize();
        size += this.aggregateTransactionBody.getSize();
        return size;
    }
    getBody() {
        return this.aggregateTransactionBody;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const superBytes = super.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, superBytes);
        const aggregateTransactionBodyBytes = this.aggregateTransactionBody.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, aggregateTransactionBodyBytes);
        return newArray;
    }
}
exports.AggregateBondedTransactionV1Builder = AggregateBondedTransactionV1Builder;
//# sourceMappingURL=AggregateBondedTransactionV1Builder.js.map
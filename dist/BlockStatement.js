"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockStatement = void 0;
const AddressResolutionStatement_1 = require("./AddressResolutionStatement");
const MosaicResolutionStatement_1 = require("./MosaicResolutionStatement");
const TransactionStatement_1 = require("./TransactionStatement");
const Utils_1 = require("./Utils");
class BlockStatement {
    constructor({ transactionStatements, addressResolutionStatements, mosaicResolutionStatements }) {
        this.transactionStatements = transactionStatements;
        this.addressResolutionStatements = addressResolutionStatements;
        this.mosaicResolutionStatements = mosaicResolutionStatements;
    }
    static deserialize(payload) {
        const byteArray = Array.from(payload);
        const transactionStatementCount = Utils_1.Utils.bufferToUint32(Uint8Array.from(byteArray));
        byteArray.splice(0, 4);
        const transactionStatements = Utils_1.Utils.deserialize(TransactionStatement_1.TransactionStatement.deserialize, Uint8Array.from(byteArray), transactionStatementCount);
        byteArray.splice(0, transactionStatements.reduce((sum, c) => sum + c.size, 0));
        const addressResolutionStatementCount = Utils_1.Utils.bufferToUint32(Uint8Array.from(byteArray));
        byteArray.splice(0, 4);
        const addressResolutionStatements = Utils_1.Utils.deserialize(AddressResolutionStatement_1.AddressResolutionStatement.deserialize, Uint8Array.from(byteArray), addressResolutionStatementCount);
        byteArray.splice(0, addressResolutionStatements.reduce((sum, c) => sum + c.size, 0));
        const mosaicResolutionStatementCount = Utils_1.Utils.bufferToUint32(Uint8Array.from(byteArray));
        byteArray.splice(0, 4);
        const mosaicResolutionStatements = Utils_1.Utils.deserialize(MosaicResolutionStatement_1.MosaicResolutionStatement.deserialize, Uint8Array.from(byteArray), mosaicResolutionStatementCount);
        byteArray.splice(0, mosaicResolutionStatements.reduce((sum, c) => sum + c.size, 0));
        return new BlockStatement({
            transactionStatements: transactionStatements,
            addressResolutionStatements: addressResolutionStatements,
            mosaicResolutionStatements: mosaicResolutionStatements,
        });
    }
    get size() {
        let size = 0;
        size += 4;
        size += this.transactionStatements.reduce((sum, c) => sum + Utils_1.Utils.getSizeWithPadding(c.size, 0), 0);
        size += 4;
        size += this.addressResolutionStatements.reduce((sum, c) => sum + Utils_1.Utils.getSizeWithPadding(c.size, 0), 0);
        size += 4;
        size += this.mosaicResolutionStatements.reduce((sum, c) => sum + Utils_1.Utils.getSizeWithPadding(c.size, 0), 0);
        return size;
    }
    serialize() {
        let newArray = new Uint8Array();
        const transactionStatementCountBytes = Utils_1.Utils.uint32ToBuffer(this.transactionStatements.length);
        newArray = Utils_1.Utils.concatTypedArrays(newArray, transactionStatementCountBytes);
        const transactionStatementsBytes = Utils_1.Utils.writeList(this.transactionStatements, 0);
        newArray = Utils_1.Utils.concatTypedArrays(newArray, transactionStatementsBytes);
        const addressResolutionStatementCountBytes = Utils_1.Utils.uint32ToBuffer(this.addressResolutionStatements.length);
        newArray = Utils_1.Utils.concatTypedArrays(newArray, addressResolutionStatementCountBytes);
        const addressResolutionStatementsBytes = Utils_1.Utils.writeList(this.addressResolutionStatements, 0);
        newArray = Utils_1.Utils.concatTypedArrays(newArray, addressResolutionStatementsBytes);
        const mosaicResolutionStatementCountBytes = Utils_1.Utils.uint32ToBuffer(this.mosaicResolutionStatements.length);
        newArray = Utils_1.Utils.concatTypedArrays(newArray, mosaicResolutionStatementCountBytes);
        const mosaicResolutionStatementsBytes = Utils_1.Utils.writeList(this.mosaicResolutionStatements, 0);
        newArray = Utils_1.Utils.concatTypedArrays(newArray, mosaicResolutionStatementsBytes);
        return newArray;
    }
}
exports.BlockStatement = BlockStatement;
//# sourceMappingURL=BlockStatement.js.map
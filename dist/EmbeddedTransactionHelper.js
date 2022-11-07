"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmbeddedTransactionHelper = void 0;
const EmbeddedTransaction_1 = require("./EmbeddedTransaction");
class EmbeddedTransactionHelper {
    static deserialize(payload) {
        const header = EmbeddedTransaction_1.EmbeddedTransaction.deserialize(payload);
        return header;
    }
}
exports.EmbeddedTransactionHelper = EmbeddedTransactionHelper;
//# sourceMappingURL=EmbeddedTransactionHelper.js.map
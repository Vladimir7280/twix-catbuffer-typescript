"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionHelper = void 0;
const Transaction_1 = require("./Transaction");
class TransactionHelper {
    static deserialize(payload) {
        const header = Transaction_1.Transaction.deserialize(payload);
        return header;
    }
}
exports.TransactionHelper = TransactionHelper;
//# sourceMappingURL=TransactionHelper.js.map
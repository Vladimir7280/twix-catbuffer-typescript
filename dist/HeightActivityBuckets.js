"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeightActivityBuckets = void 0;
const HeightActivityBucket_1 = require("./HeightActivityBucket");
const Utils_1 = require("./Utils");
class HeightActivityBuckets {
    constructor(buckets) {
        this.buckets = buckets;
    }
    static deserialize(payload) {
        const byteArray = Array.from(payload);
        const buckets = Utils_1.Utils.deserialize(HeightActivityBucket_1.HeightActivityBucket.deserialize, Uint8Array.from(byteArray), 5);
        byteArray.splice(0, buckets.reduce((sum, c) => sum + c.size, 0));
        return new HeightActivityBuckets(buckets);
    }
    get size() {
        let size = 0;
        size += this.buckets.reduce((sum, c) => sum + Utils_1.Utils.getSizeWithPadding(c.size, 0), 0);
        return size;
    }
    serialize() {
        let newArray = new Uint8Array();
        const bucketsBytes = Utils_1.Utils.writeList(this.buckets, 0);
        newArray = Utils_1.Utils.concatTypedArrays(newArray, bucketsBytes);
        return newArray;
    }
}
exports.HeightActivityBuckets = HeightActivityBuckets;
//# sourceMappingURL=HeightActivityBuckets.js.map
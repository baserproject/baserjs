"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * ユニークIDを発行する
 *
 * @version 1.0.0
 * @since 0.0.1
 * @param prefix 接頭辞
 * @return ユニークID
 *
 */
function createUID(prefix) {
    if (prefix === void 0) { prefix = 'uid-'; }
    var random = Math.random() * 1e8;
    var seed = new Date().valueOf();
    var uniqueNumber = Math.abs(Math.floor(random + seed));
    return "" + prefix + uniqueNumber.toString(24);
}
exports.default = createUID;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var parse_1 = require("./parse");
/**
 * 文字列が論理値の偽相等であるかどうか
 *
 * @version 1.0.0
 * @since 0.2.0
 * @param str 対象の文字列
 * @return 文字列が論理値の偽相等であるかどうか
 *
 */
function isFalsy(str) {
    return !parse_1.default(str, false);
}
exports.default = isFalsy;

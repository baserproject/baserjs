"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * キャメルケースをハイフンケースに変換
 *
 * @version 1.0.0
 * @since 1.0.0
 * @param str 対象の文字列
 * @return 変換後の文字列
 *
 */
function hyphenize(str) {
    return str.replace(/[A-Z]/g, function ($) { return "-" + $.toLowerCase(); });
}
exports.default = hyphenize;

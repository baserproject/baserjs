"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var qs = require("qs");
/**
 * 文字列をJavaScriptで利用できる値に変換する
 *
 * @version 1.0.0
 * @since 1.0.0
 * @param str 対象の文字列
 * @param parseQuery クエリー文字列をパースするかどうか
 * @return JavaScriptで利用できる値
 *
 */
function parse(str, parseQuery) {
    if (parseQuery === void 0) { parseQuery = true; }
    if (/^\s*$/.test(str)) {
        return str;
    }
    try {
        var json = JSON.parse(str);
        if (typeof json === 'string') {
            return str;
        }
        else {
            return json;
        }
    }
    catch (e) {
        try {
            if (("" + str).replace(/Infinity|NaN|undefined|0[xX][0-9a-fA-Z]+/, '').match(/[a-z]/i)) {
                throw void 0;
            }
            var evaluatedVal = eval(("" + str).replace(/\(([^\(]*)\)/g, '$1')); // tslint:disable-line no-eval
            return evaluatedVal;
        }
        catch (e2) {
            if (parseQuery && ("" + str).match('=')) {
                return qs.parse(str);
            }
            return str;
        }
    }
}
exports.default = parse;

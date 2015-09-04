/**
 * ユーティリティ文字列クラス
 *
 * @version 0.9.0
 * @since 0.0.2
 *
 */
var UtilString = (function () {
    function UtilString() {
    }
    /**
     * ユニークIDを発行する
     *
     * @version 0.9.0
     * @since 0.0.1
     * @param prefix 接頭辞
     * @return ユニークID
     *
     */
    UtilString.UID = function (prefix) {
        if (prefix === void 0) { prefix = 'uid'; }
        var random = Math.random() * 1e8;
        var seed = new Date().valueOf();
        var uniqueNumber = Math.abs(Math.floor(random + seed));
        if (prefix) {
            prefix += '-';
        }
        return "" + prefix + uniqueNumber.toString(24);
    };
    /**
     * ハイフンチェインケース化
     *
     * @version 0.9.0
     * @since 0.1.0
     * @param str 対象の文字列
     * @return ハイフンチェインケース化された文字列
     *
     */
    UtilString.hyphenDelimited = function (str) {
        var result = [];
        var words = str.replace(/[A-Z]/g, function ($1) {
            return " " + $1.toLowerCase();
        }).split(/[^a-z0-9]+/ig);
        for (var i = 0, l = words.length; i < l; i++) {
            if (words[i]) {
                result.push(words[i].toLowerCase());
            }
        }
        return result.join('-');
    };
    /**
     * スネークケース化
     *
     * @version 0.1.0
     * @since 0.1.0
     * @param str 対象の文字列
     * @return スネークケース化された文字列
     *
     */
    UtilString.snakeCase = function (str) {
        return UtilString.hyphenDelimited(str).replace(/-/g, '_');
    };
    /**
     * キャメルケース化
     *
     * @version 0.9.0
     * @since 0.1.0
     * @param str 対象の文字列
     * @param upperCase 頭文字を大文字にするかどうか
     * @return キャメルケース化された文字列
     *
     */
    UtilString.camelCase = function (str, upperCase) {
        if (upperCase === void 0) { upperCase = false; }
        var result = UtilString.hyphenDelimited(str);
        if (upperCase && /^[a-z]/.test(result)) {
            result = "-" + result;
        }
        return result.replace(/-([a-z])/g, function ($1, $2) {
            return $2.toUpperCase();
        });
    };
    /**
     * 文字列が論理値の偽相等であるかどうか
     *
     * @version 0.9.0
     * @since 0.2.0
     * @param str 対象の文字列
     * @return 文字列が論理値の偽相等であるかどうか
     *
     */
    UtilString.isFalsy = function (str) {
        var FALSY_PATTERN = /^\s*(?:false|null|undefined|0|0?(?:\.0+)?)?\s*$/i;
        return FALSY_PATTERN.test(str.toLowerCase());
    };
    /**
     * 最初に登場する指定の区切り文字の場所で文字列を一回だけ分割する
     *
     * @version 0.9.0
     * @since 0.7.0
     * @param str 対象の文字列
     * @param separator 区切り文字
     * @return 分割した文字列
     *
     */
    UtilString.divide = function (str, separator) {
        var splited = str.split(separator);
        var prefix;
        var suffix;
        if (splited) {
            prefix = splited.shift();
            if (splited.length) {
                suffix = splited.join(separator);
            }
        }
        return [prefix, suffix];
    };
    return UtilString;
})();
module.exports = UtilString;

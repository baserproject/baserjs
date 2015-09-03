/**
 * ユーティリティ文字列クラス
 *
 * @version 0.0.2
 * @since 0.0.2
 *
 */
var UtilString = (function () {
    function UtilString() {
    }
    /**
     * ユニークIDを発行する
     *
     * @version 0.0.1
     * @since 0.0.1
     *
     */
    UtilString.UID = function (seed) {
        var random = Math.floor(Math.random() * 1e8);
        if (!seed) {
            seed = new Date().valueOf();
        }
        var uniqueNumber = random + seed;
        var uid = 'uid-' + uniqueNumber.toString(24);
        return uid;
    };
    /**
     * ハイフン チェインケース化
     *
     * @version 0.1.0
     * @since 0.1.0
     *
     */
    UtilString.hyphenDelimited = function (str) {
        var words = str.replace(/[A-Z]/g, function ($1) {
            return ' ' + $1.toLowerCase();
        }).split(/[^a-z0-9]+/ig);
        var result = [];
        var i = 0;
        var l = words.length;
        for (; i < l; i++) {
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
     *
     */
    UtilString.snakeCase = function (str) {
        return UtilString.hyphenDelimited(str).replace(/-/g, '_');
    };
    /**
     * キャメルケース化
     *
     * @version 0.1.0
     * @since 0.1.0
     *
     */
    UtilString.camelCase = function (str, upperCase) {
        if (upperCase === void 0) { upperCase = false; }
        var hdStr = UtilString.hyphenDelimited(str);
        if (upperCase && /^[a-z]/.test(hdStr)) {
            hdStr = '-' + hdStr;
        }
        return hdStr.replace(/-([a-z])/g, function ($1, $2) {
            return $2.toUpperCase();
        });
    };
    /**
     * 文字列が論理値の偽相等であるかどうか
     *
     * @version 0.2.0
     * @since 0.2.0
     *
     */
    UtilString.isFalsy = function (str) {
        str = str.toLowerCase();
        var rFalsy = /^\s*(?:false|null|undefined|0|0?(?:\.0+)?)?\s*$/i;
        return rFalsy.test(str);
    };
    /**
     * 最初に登場する文字列の部分を分割する
     *
     * @version 0.7.0
     * @since 0.7.0
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

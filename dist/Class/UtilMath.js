/**
 * ユーティリティ算術クラス
 *
 * @version 0.2.0
 * @since 0.0.2
 *
 */
var UtilMath = (function () {
    function UtilMath() {
    }
    /**
     * 指定の範囲のランダムな数を返す
     *
     * @version 0.2.0
     * @since 0.2.0
     *
     * @param base 基準の数
     * @param dist 基準からこの数までの範囲の乱数になる
     * @return 乱数
     *
     */
    UtilMath.random = function (base, dist) {
        if (base === void 0) { base = 1; }
        if (dist === void 0) { dist = 0; }
        var random = Math.random();
        var from = Math.min(base, dist);
        var to = Math.max(base, dist);
        return random * (to - from) + from;
    };
    /**
     * 配列内の数値の合計を算出する
     *
     * @version 0.2.0
     * @since 0.2.0
     *
     * @param numberList 数の配列
     * @return 合計値
     *
     */
    UtilMath.sam = function (numberList) {
        var result = 0;
        var i = 0;
        var l = numberList.length;
        for (; i < l; i++) {
            result += numberList[i];
        }
        return result;
    };
    /**
     * 均等に分割する
     *
     * @version 0.2.0
     * @since 0.2.0
     *
     * @param n 分割される数
     * @param devide 分割する数
     * @param returnInfo 詳細情報を返すかどうか
     * @return `returnInfo`が真の場合 分割された数値で構成された配列を、偽の場合 詳細情報と結果を返す
     *
     */
    UtilMath.split = function (n, devide, returnInfo) {
        if (returnInfo === void 0) { returnInfo = false; }
        n = Math.floor(n);
        devide = Math.floor(devide);
        // 分割した数
        var splited = Math.floor(n / devide);
        // 余り
        var rem = n % devide;
        // 余りの数だけ+1される
        var addtion = rem;
        var result = [];
        var i = devide;
        if (!(devide <= 0)) {
            while (i--) {
                if (0 < addtion || rem < 0 && 0 === addtion) {
                    result.push(splited + 1);
                }
                else {
                    result.push(splited);
                }
                addtion -= rem < 0 ? -1 : 1;
            }
        }
        if (returnInfo) {
            return {
                result: result,
                commonNumber: splited,
                addtion: rem
            };
        }
        else {
            return result;
        }
    };
    return UtilMath;
})();
module.exports = UtilMath;

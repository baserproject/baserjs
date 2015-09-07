/**
 * ユーティリティ配列クラス
 *
 * @version 0.9.0
 * @since 0.2.0
 *
 */
var UtilArray = (function () {
    function UtilArray() {
    }
    /**
     * 配列中の対象の要素が一番最初に存在するインデックス番号を返す
     * 存在しない場合は -1 を返す
     *
     * IE8のためのpolyfill
     * ※Array.prototype.indexOfを完全に再現しているわけではない
     *
     * @version 0.9.0
     * @since 0.2.0
     * @param array 対象の配列
     * @param searchElement 検索対象
     * @return 検索結果の番号
     *
     */
    UtilArray.indexOf = function (array, searchElement) {
        if (Array.prototype.indexOf) {
            return array.indexOf(searchElement);
        }
        var i = 0;
        for (var _i = 0; _i < array.length; _i++) {
            var item = array[_i];
            if (searchElement === item) {
                return i;
            }
            i++;
        }
        return -1;
    };
    /**
     * 配列中の指定の番号の要素を削除して詰める
     *
     * @version 0.2.0
     * @since 0.2.0
     * @param array 対象の配列
     * @param index 削除する番号
     * @return 削除された配列
     *
     */
    UtilArray.remove = function (array, index) {
        array.splice(index, 1);
        return array;
    };
    return UtilArray;
})();
module.exports = UtilArray;

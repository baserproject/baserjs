/**
 * ユーティリティ配列クラス
 *
 * @version 0.2.0
 * @since 0.2.0
 *
 */
var UtilArray = (function () {
    function UtilArray() {
    }
    /**
     * 配列中の対象の要素が一番最初に存在するインデックス番号を返す
     *
     * @version 0.2.0
     * @since 0.2.0
     *
     */
    UtilArray.indexOf = function (array, element) {
        var i = 0;
        var l = array.length;
        for (; i < l; i++) {
            if (element === array[i]) {
                return i;
            }
        }
        return -1;
    };
    /**
     * 配列中の対象のインデックスを削除する
     *
     * @version 0.2.0
     * @since 0.2.0
     *
     */
    UtilArray.remove = function (array, index) {
        array.splice(index, 1);
        return array;
    };
    return UtilArray;
})();
module.exports = UtilArray;

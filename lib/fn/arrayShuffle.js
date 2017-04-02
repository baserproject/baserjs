"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 配列をランダムに入れ替えて返す
 *
 * Fisher-Yates法
 *
 * @version 1.0.0
 * @since 0.10.0
 * @param array 対象の配列
 * @return ランダムに入れ替えられた配列
 *
 */
function arraySuffle(array) {
    var newArray = array.concat();
    var n = newArray.length;
    for (var i = n - 1; i >= 0; i--) {
        var random = Math.floor(Math.random() * (i + 1));
        var tmp = newArray[i];
        newArray[i] = newArray[random];
        newArray[random] = tmp;
    }
    return newArray;
}
exports.default = arraySuffle;

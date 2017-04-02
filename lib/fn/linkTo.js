"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 指定したURLへ移動する
 *
 * @version 1.0.0
 * @since 1.0.0
 * @param href URI/URL/パス
 * @param blank
 *
 */
function linkTo(href, blank) {
    if (blank === void 0) { blank = false; }
    return function () {
        if (blank) {
            window.open(href);
        }
        else {
            location.href = href;
        }
    };
}
exports.default = linkTo;

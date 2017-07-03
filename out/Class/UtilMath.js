"use strict";
/**
 * ユーティリティ算術クラス
 *
 * @version 0.9.0
 * @since 0.0.2
 *
 */
var UtilMath = (function () {
    function UtilMath() {
    }
    /**
     * 指定の範囲のランダムな数を返す
     *
     * @version 0.9.0
     * @since 0.2.0
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
     * @version 0.9.0
     * @since 0.2.0
     * @param numberList 数の配列
     * @return 合計値
     *
     */
    UtilMath.sum = function (numberList) {
        var numbers = numberList.slice();
        var result = 0;
        while (numbers.length) {
            result += numbers.shift();
        }
        return result;
    };
    /**
     * 均等に分割する
     *
     * @version 0.9.0
     * @since 0.2.0
     * @param n 分割される数
     * @param devide 分割する数
     * @return 分割された数値で構成された配列
     *
     */
    UtilMath.split = function (n, devide) {
        var result = [];
        n = Math.floor(n);
        devide = Math.floor(devide);
        // 分割した数
        var splited = Math.floor(n / devide);
        if (0 < devide) {
            var i = devide;
            // 余り
            var rem = n % devide;
            // 余りの数だけ+1される
            var addtion = rem;
            while (i--) {
                if (0 < addtion || rem < 0 && 0 === addtion) {
                    result.push(splited + 1);
                }
                else {
                    result.push(splited);
                }
                addtion += rem < 0 ? 1 : -1;
            }
        }
        return result;
    };
    /**
     * コンテナオブジェクトとターゲットオブジェクトのサイズから、
     * ターゲットオブジェクトの収まる位置とサイズを算出する
     *
     * @version 0.13.0
     *
     * @param containerWidth コンテナの幅
     * @param containerHeight コンテナの高さ
     * @param targetWidth ターゲットの幅
     * @param targetHeight ターゲットの高さ
     * @param sizing ターゲットを収める基準 `"contain" | "cover"`
     * @param align 水平位置 `"left" | "center" | "right"`
     * @param valign 垂直位置 `"top" | "center" | "bottom"`
     * @return 算出された位置とサイズ
     */
    UtilMath.stretchDimension = function (containerWidth, containerHeight, targetWidth, targetHeight, sizing, align, valign) {
        if (sizing === void 0) { sizing = 'contain'; }
        if (align === void 0) { align = 'center'; }
        if (valign === void 0) { valign = 'center'; }
        var scale = 1;
        var objectAspectRatio = targetWidth / targetHeight;
        var containerAspectRatio = containerWidth / containerHeight;
        // オブジェクトの拡縮率の算出
        // アス比が1以上なら横長/1以下なら縦長
        // コンテナが横長
        switch (sizing) {
            case 'cover':
                if (1 < containerAspectRatio) {
                    // オブジェクトが横長 もしくは コンテナのアス比の方が大きい
                    if (1 < targetWidth && objectAspectRatio < containerAspectRatio) {
                        scale = containerWidth / targetWidth;
                    }
                    else {
                        scale = containerHeight / targetHeight;
                    }
                }
                else {
                    // オブジェクトが横長 もしくは オブジェクトのアス比の方が大きい
                    if (1 < targetHeight && containerAspectRatio < objectAspectRatio) {
                        scale = containerHeight / targetHeight;
                    }
                    else {
                        scale = containerWidth / targetWidth;
                    }
                }
                break;
            case 'contain':
                if (1 < containerAspectRatio) {
                    // オブジェクトが横長 もしくは コンテナのアス比の方が大きい
                    if (1 < targetWidth && objectAspectRatio < containerAspectRatio) {
                        scale = containerHeight / targetHeight;
                    }
                    else {
                        scale = containerWidth / targetWidth;
                    }
                }
                else {
                    // オブジェクトが横長 もしくは オブジェクトのアス比の方が大きい
                    if (1 < targetHeight && containerAspectRatio < objectAspectRatio) {
                        scale = containerWidth / targetWidth;
                    }
                    else {
                        scale = containerHeight / targetHeight;
                    }
                }
                break;
            default:
        }
        // オブジェクトの幅と高さ
        var width = targetWidth * scale;
        var height = targetHeight * scale;
        var top;
        switch (valign) {
            case 'top':
                {
                    top = 0;
                }
                break;
            case 'bottom':
                {
                    top = containerHeight - height;
                }
                break;
            default: {
                top = (containerHeight / 2) - (height / 2);
            }
        }
        var left;
        switch (align) {
            case 'left':
                {
                    left = 0;
                }
                break;
            case 'right':
                {
                    left = containerWidth - width;
                }
                break;
            default: {
                left = (containerWidth / 2) - (width / 2);
            }
        }
        return {
            width: width,
            height: height,
            top: top,
            left: left,
        };
    };
    return UtilMath;
}());
module.exports = UtilMath;

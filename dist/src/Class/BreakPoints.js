var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var EventDispacher = require('./EventDispacher');
var Browser = require('./Browser');
/**
 * ブレークポイントの変化に応じた処理をする管理することができるクラス
 *
 * @version 0.8.1
 * @since 0.8.1
 *
 */
var BreakPoints = (function (_super) {
    __extends(BreakPoints, _super);
    /**
     * コンストラクタ
     *
     * @param breakPoints ブレークポイントとコールバックに渡す値を設定する
     * @param callback 変化に応じたコールバック
     */
    function BreakPoints(breakPoints, callback) {
        var _this = this;
        _super.call(this);
        this.currentPoint = 0;
        this.breakPoints = [];
        this._values = {};
        this._setBreakPoints(breakPoints);
        Browser.browser.on('resizeend', function () {
            var wW = window.document.documentElement.clientWidth;
            for (var i = 0, l = _this.breakPoints.length; i < l; i++) {
                var overPoint = _this.breakPoints[i];
                if (wW <= overPoint) {
                    if (_this.currentPoint !== overPoint) {
                        _this.currentPoint = overPoint;
                        var value = _this._values[overPoint];
                        if (callback) {
                            callback(value, overPoint, wW);
                        }
                        _this.trigger('breakpoint', [value, overPoint, wW], _this);
                        _this.trigger('breakpoint:' + overPoint, [value, wW], _this);
                    }
                    break;
                }
            }
        });
        Browser.browser.trigger('resizeend');
    }
    /**
     * ブレークポイントの登録処理
     *
     * @version 0.8.1
     * @since 0.7.0
     * @param breakPoints ブレークポイントとコールバックに渡す値を設定する
     */
    BreakPoints.prototype._setBreakPoints = function (breakPoints) {
        for (var breakPointStr in breakPoints) {
            if (breakPoints.hasOwnProperty(breakPointStr)) {
                var breakPoint = void 0;
                if (/^defaults?$/i.test(breakPointStr)) {
                    breakPoint = Infinity;
                }
                else {
                    breakPoint = parseFloat(breakPointStr);
                }
                if (breakPoint >= 1) {
                    this.breakPoints.push(breakPoint);
                    var value = breakPoints[breakPointStr];
                    this._values[breakPoint] = value;
                }
            }
        }
        this.breakPoints.sort(function (a, b) { return a - b; });
    };
    /**
     * ブレークポイントを追加する
     *
     * @param breakPoints ブレークポイントとコールバックに渡す値を設定する
     */
    BreakPoints.prototype.add = function (breakPoints) {
        this._setBreakPoints(breakPoints);
    };
    return BreakPoints;
})(EventDispacher);
module.exports = BreakPoints;

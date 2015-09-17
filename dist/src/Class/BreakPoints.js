var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var EventDispatcher = require('./EventDispatcher');
var Browser = require('./Browser');
/**
 * ブレークポイントの変化に応じた処理をする管理することができるクラス
 *
 * @version 0.9.0
 * @since 0.7.0
 *
 * ```
 * new BreakPoints({
 * 	340: 'sp',
 * 	768: 'tab',
 * 	1200: 'pc',
 * 	'default': 'bigger'
 * }, (value, breakPoint, windowWidth) => {
 * 	// ブレークポイントが340以下なら value = 'sp' など
 *  // 指定のブレークポイントを跨いだ際にしか発火しない
 * });
 * ```
 *
 */
var BreakPoints = (function (_super) {
    __extends(BreakPoints, _super);
    /**
     * コンストラクタ
     *
     * @version 0.9.0
     * @since 0.7.0
     * @param breakPoints ブレークポイントとコールバックに渡す値を設定する
     * @param callback 変化に応じたコールバック
     *
     */
    function BreakPoints(breakPoints, callback) {
        var _this = this;
        _super.call(this);
        /**
        * 現在のブレークポイント（ウィンドウの幅）
        *
        * @version 0.8.1
        * @since 0.7.0
        *
        */
        this.currentPoint = 0;
        /**
        * ブレークポイント
        *
        * @version 0.8.1
        * @since 0.7.0
        *
        */
        this.breakPoints = [];
        /**
        * ブレークポイントに対してハンドラに渡す値
        *
        * @version 0.8.1
        * @since 0.7.0
        *
        */
        this._values = {};
        this._setBreakPoints(breakPoints);
        Browser.browser.on('resizeend', function () {
            var wW = window.document.documentElement.clientWidth;
            for (var _i = 0, _a = _this.breakPoints; _i < _a.length; _i++) {
                var overPoint = _a[_i];
                if (wW <= overPoint) {
                    if (_this.currentPoint !== overPoint) {
                        _this.currentPoint = overPoint;
                        var value = _this._values[overPoint];
                        if (callback) {
                            callback(value, overPoint, wW);
                        }
                        _this.trigger('breakpoint', [value, overPoint, wW], _this);
                        _this.trigger("breakpoint:" + overPoint, [value, wW], _this);
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
     *
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
     * @version 0.7.0
     * @since 0.7.0
     * @param breakPoints ブレークポイントとコールバックに渡す値を設定する
     *
     */
    BreakPoints.prototype.add = function (breakPoints) {
        this._setBreakPoints(breakPoints);
    };
    return BreakPoints;
})(EventDispatcher);
module.exports = BreakPoints;

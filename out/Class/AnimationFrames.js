"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var DispatchEvent = require('./DispatchEvent');
var EventDispatcher = require('./EventDispatcher');
/**
 * アニメーションフレームを管理するクラス
 *
 * @version 0.9.0
 * @since 0.0.10
 *
 */
var AnimationFrames = (function (_super) {
    __extends(AnimationFrames, _super);
    /**
     * フレーム毎のに実行するコールバックを登録する
     *
     * @version 0.9.0
     * @since 0.0.10
     * @param callback コールバック関数
     *
     */
    function AnimationFrames(callback) {
        _super.call(this);
        /**
         * 停止状態かどうか
         *
         * @version 0.9.0
         * @since 0.9.0
         *
         */
        this._isStop = true;
        this._callback = callback;
        this._isPolyfill = !('requestAnimationFrame' in window && 'cancelAnimationFrame' in window);
    }
    /**
     * フレーム処理を開始する
     *
     * @version 0.9.0
     * @since 0.0.10
     * @param context コンテキスト
     * @return インスタンス自身
     *
     */
    AnimationFrames.prototype.start = function (context) {
        var _this = this;
        context = context || this;
        this._isStop = false;
        var START_TIMESTAMP = new Date().getTime();
        if (!this._isPolyfill) {
            // call: 0 define function
            var onEnterFrame_1 = function (timestamp) {
                cancelAnimationFrame(_this._requestId);
                // call: 3 fire callback
                var e = _this._enterFrame(context, timestamp, START_TIMESTAMP);
                // call: 4 cancel continue
                if (!e.isDefaultPrevented() && !_this._isStop) {
                    // continue
                    _this._requestId = requestAnimationFrame(onEnterFrame_1);
                }
                else {
                    var e_1 = new DispatchEvent('stop');
                    _this.trigger(e_1, [timestamp, START_TIMESTAMP, context], context);
                }
            };
            this._requestId = requestAnimationFrame(onEnterFrame_1);
        }
        else {
            var interval_1 = 1000 / AnimationFrames.FRAME_RATE;
            var onEnterFrame_2 = function () {
                clearTimeout(_this._requestId);
                var timestamp = new Date().getTime();
                var e = _this._enterFrame(context, timestamp, START_TIMESTAMP);
                if (!e.isDefaultPrevented() && !_this._isStop) {
                    _this._requestId = setTimeout(onEnterFrame_2, interval_1);
                }
                else {
                    var e_2 = new DispatchEvent('stop');
                    _this.trigger(e_2, [timestamp, START_TIMESTAMP, context], context);
                }
            };
            this._requestId = setTimeout(onEnterFrame_2, interval_1);
        }
        return this;
    };
    /**
     * リクエストしたコールバックを停止する
     *
     * @version 0.9.0
     * @since 0.0.10
     * @return インスタンス自身
     *
     */
    AnimationFrames.prototype.stop = function () {
        this._isStop = true;
        if (!this._isPolyfill) {
            cancelAnimationFrame(this._requestId);
        }
        else {
            clearTimeout(this._requestId);
        }
        return this;
    };
    /**
     * フレーム毎の処理
     *
     * @version 0.9.0
     * @since 0.9.0
     * @param context コンテキスト
     * @return イベント
     *
     */
    AnimationFrames.prototype._enterFrame = function (context, now, startTimestamp) {
        if (this._callback) {
            this._callback.call(context, now, startTimestamp, context);
        }
        var e = new DispatchEvent('enterframe');
        this.trigger(e, [now, startTimestamp, context], this);
        return e;
    };
    /**
     * フレームレート
     * 単位: FPS
     *
     * @version 0.0.10
     * @since 0.0.10
     *
     */
    AnimationFrames.FRAME_RATE = 60;
    return AnimationFrames;
}(EventDispatcher));
module.exports = AnimationFrames;

"use strict";
/**
 * イベントオブジェクトのクラス
 *
 * @version 0.9.0
 * @since 0.0.10
 *
 */
var DispatchEvent = (function () {
    /**
     * コンストラクタ
     *
     * @version 0.3.0
     * @since 0.0.10
     *
     */
    function DispatchEvent(type) {
        /**
         * イベントの伝達が止められているかどうか
         *
         * @version 0.0.10
         * @since 0.0.10
         *
         */
        this._isImmediatePropagationStopped = false;
        /**
         * デフォルトのイベントの発火が止められているかどうか
         *
         * @version 0.9.0
         * @since 0.9.0
         *
         */
        this._isDefaultPrevented = false;
        this.type = type;
    }
    /**
     * イベントの伝達を止める
     *
     * @version 0.0.10
     * @since 0.0.10
     *
     */
    DispatchEvent.prototype.stopImmediatePropagation = function () {
        this._isImmediatePropagationStopped = true;
    };
    /**
     * イベントの伝達が止められているかどうか
     *
     * @version 0.0.10
     * @since 0.0.10
     * @return イベントの伝達が止められているかどうか
     *
     */
    DispatchEvent.prototype.isImmediatePropagationStopped = function () {
        return this._isImmediatePropagationStopped;
    };
    /**
     * デフォルトのイベントの発火を止める
     * ※EventDispatcher.triggerでの実装に依る
     *
     * @version 0.9.0
     * @since 0.9.0
     *
     */
    DispatchEvent.prototype.preventDefault = function () {
        this._isDefaultPrevented = true;
    };
    /**
     * デフォルトのイベントの発火が止められているかどうか
     *
     * @version 0.9.0
     * @since 0.9.0
     * @return デフォルトのイベントの発火が止められているかどうか
     *
     */
    DispatchEvent.prototype.isDefaultPrevented = function () {
        return this._isDefaultPrevented;
    };
    return DispatchEvent;
}());
module.exports = DispatchEvent;

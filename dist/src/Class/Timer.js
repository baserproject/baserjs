var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var DispatchEvent = require('./DispatchEvent');
var EventDispatcher = require('./EventDispatcher');
/**
 * 時間管理クラス
 *
 * @version 0.9.0
 * @since 0.0.1
 *
 */
var Timer = (function (_super) {
    __extends(Timer, _super);
    /**
     * コンストラクタ
     *
     * @version 0.9.0
     * @since 0.0.1
     *
     */
    function Timer() {
        _super.call(this);
        /**
         * タイマーID
         *
         * @version 0.9.0
         * @since 0.0.8
         *
         */
        this._timerId = null;
        /**
         * インターバル
         *
         * `13`は[jQuery](http://jquery.com/)を参考
         *
         * @version 0.0.8
         * @since 0.0.8
         *
         */
        this.interval = 13;
        this.now();
    }
    /**
     * 暗黙の型変換時の振る舞い
     *
     * @version 0.0.1
     * @since 0.0.1
     * @return 保持しているタイムスタンプ
     *
     */
    Timer.prototype.valueOf = function () {
        return this._currentTime.valueOf();
    };
    /**
     * 時間を現在に更新する
     *
     * @version 0.0.1
     * @since 0.0.1
     * @return 更新した時間のタイムスタンプ
     *
     */
    Timer.prototype.now = function () {
        this._currentTime = new Date();
        return this.valueOf();
    };
    /**
     * タイマーをスタートする
     * 継続中 'progress' イベントを発行し続ける
     * 継続時間を指定しなければずっと作動する
     *
     * @version 0.9.0
     * @since 0.0.8
     * @param time 継続時間
     * @return インスタンス自身
     *
     * ```
     * let timer = new Timer();
     * timer.on('progress', (e, currentTime, startTime, context) => {
     * 	context.stop();
     * }).start();
     * ```
     *
     */
    Timer.prototype.start = function (time) {
        var _this = this;
        if (time === void 0) { time = Infinity; }
        var START_TIMESTAMP = this.now();
        this.stop();
        var tick = function (time) {
            _this._timerId = setTimeout(function () {
                var now = _this.now();
                var period = now - START_TIMESTAMP;
                if (period < time) {
                    _this.trigger('progress', [now, START_TIMESTAMP, _this], _this);
                    tick(time);
                }
                else {
                    _this.stop();
                }
            }, _this.interval);
        };
        tick(time);
        return this;
    };
    /**
     * タイマーをストップする
     *
     * @version 0.9.0
     * @since 0.0.8
     * @return インスタンス自身
     *
     */
    Timer.prototype.stop = function () {
        var now = this.now();
        var e = new DispatchEvent('stop');
        this.trigger(e, [now, this._timerId, this], this);
        if (!e.isDefaultPrevented()) {
            clearTimeout(this._timerId);
            console.log('とめたで' + e.type);
            this._timerId = null;
        }
        return this;
    };
    /**
     * 遅延処理
     * `stop`メソッドで止めることが可能
     *
     * @version 0.0.8
     * @since 0.0.8
     *
     */
    Timer.prototype.wait = function (time, callback, context) {
        var _this = this;
        if (context == null) {
            context = this;
        }
        this.stop();
        this._timerId = window.setTimeout(function () {
            _this.stop();
            callback.call(context);
        }, time);
        return this;
    };
    /**
     * 遅延処理
     *
     * @version 0.0.8
     * @since 0.0.8
     *
     */
    Timer.wait = function (time, callback, context) {
        return new Timer().wait(time, callback, context);
    };
    return Timer;
})(EventDispatcher);
module.exports = Timer;

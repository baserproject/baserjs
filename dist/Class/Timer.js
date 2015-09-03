/**
 * 時間管理クラス
 *
 * @version 0.0.8
 * @since 0.0.1
 *
 */
var Timer = (function () {
    /**
     * コンストラクタ
     *
     * @version 0.0.8
     * @since 0.0.1
     *
     */
    function Timer() {
        /**
         * タイマーID
         *
         * @version 0.0.8
         * @since 0.0.8
         *
         */
        this.timerId = null;
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
        /**
         * プログレスイベントのコールバック
         *
         * @version 0.0.8
         * @since 0.0.8
         *
         */
        this._onProgress = null;
        this.now();
    }
    /**
     * 暗黙の型変換時の振る舞い
     *
     * @version 0.0.1
     * @since 0.0.1
     *
     */
    Timer.prototype.valueOf = function () {
        return this.datetime.valueOf();
    };
    /**
     * 時間を現在に更新する
     *
     * @version 0.0.1
     * @since 0.0.1
     *
     */
    Timer.prototype.now = function () {
        this.datetime = new Date();
        return this.valueOf();
    };
    /**
     * タイマーをスタートする
     *
     * @version 0.0.8
     * @since 0.0.8
     *
     */
    Timer.prototype.start = function (time) {
        var _this = this;
        var startTimestamp = this.now();
        this.stop();
        var tick = function () {
            _this.timerId = window.setTimeout(function () {
                var period = _this.now() - startTimestamp;
                if (period < time) {
                    if (_this._onProgress) {
                        _this._onProgress.call(_this);
                    }
                    tick();
                }
                else {
                    _this.stop();
                }
            }, _this.interval);
        };
        return this;
    };
    /**
     * タイマーをストップする
     *
     * @version 0.0.8
     * @since 0.0.8
     *
     */
    Timer.prototype.stop = function () {
        clearTimeout(this.timerId);
        this.timerId = null;
        return this;
    };
    /**
     * 遅延処理
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
        this.timerId = window.setTimeout(function () {
            _this.stop();
            callback.call(context);
        }, time);
        return this;
    };
    /**
     * プログレスイベントを登録
     *
     * @version 0.0.8
     * @since 0.0.8
     *
     */
    Timer.prototype.progress = function (callback) {
        if ($.isFunction(callback)) {
            this._onProgress = callback;
        }
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
})();
module.exports = Timer;

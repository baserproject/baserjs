"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CANCEL_REASON = '__baser_timer_reject__';
/**
 * タイマークラス
 *
 * @version 1.0.0
 * @since 1.0.0
 *
 */
var Timer = (function () {
    function Timer(time) {
        if (!Number.isSafeInteger(time)) {
            throw new RangeError("An argument is invalid number. 0 < time <= MAX_SAFE_INTEGER");
        }
        this.time = time;
    }
    /**
     * 指定ミリ秒待機するPromiseを返す
     *
     * キャンセル不可
     *
     * ex.) then
     * ```
     * Promise.resolve(result1)
     * .then(Timer.delay(500))
     * .then((result2) => {
     * 	result1 === result2; // true
     * });
     * ```
     *
     * ex.2) await
     * ```
     * const result2 = await Timer.delay(500)(result1);
     * result1 === result2; // true
     * ```
     */
    Timer.delay = function (time) {
        return function (returnValue) { return new Timer(time).wait(returnValue); };
    };
    Timer.prototype.wait = function (returnValue) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this._reject = reject;
            if (_this.time === 0) {
                _this._timerId = setImmediate(function () {
                    resolve(returnValue);
                });
            }
            else {
                _this._timerId = setTimeout(function () {
                    resolve(returnValue);
                }, _this.time);
            }
        });
    };
    Timer.prototype.cancel = function () {
        clearImmediate(this._timerId);
        clearTimeout(this._timerId);
        if (this._reject) {
            this._reject(CANCEL_REASON);
        }
    };
    Timer.CANCEL_REASON = CANCEL_REASON;
    return Timer;
}());
exports.default = Timer;

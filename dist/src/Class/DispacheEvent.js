/**
 * イベントオブジェクトのクラス
 *
 * @version 0.3.0
 * @since 0.0.10
 *
 */
var DispacheEvent = (function () {
    function DispacheEvent(type) {
        this._isImmediatePropagationStopped = false;
        this.type = type;
    }
    DispacheEvent.prototype.isImmediatePropagationStopped = function () {
        return this._isImmediatePropagationStopped;
    };
    DispacheEvent.prototype.stopImmediatePropagation = function () {
        this._isImmediatePropagationStopped = true;
    };
    return DispacheEvent;
})();
module.exports = DispacheEvent;

/**
 * アニメーションフレームを管理するクラス
 *
 * @version 0.0.10
 * @since 0.0.10
 *
 */
var AnimationFrames = (function () {
    /**
     * フレーム毎のに実行するコールバックを登録する
     *
     * @version 0.0.10
     * @since 0.0.10
     * @return {number} リクエストIDを返す
     *
     */
    function AnimationFrames(callback) {
        this.callback = callback;
    }
    AnimationFrames.prototype.start = function (context) {
        var _this = this;
        var interval;
        context = context || this;
        if ('requestAnimationFrame' in window) {
            this.requestId = requestAnimationFrame(function () {
                cancelAnimationFrame(_this.requestId);
                _this.callback.call(context);
                _this.start(context);
            });
        }
        else {
            interval = 1000 / AnimationFrames.FRAME_RATE;
            this.requestId = window.setTimeout(function () {
                window.clearTimeout(_this.requestId);
                _this.callback.call(context);
                _this.start(context);
            }, interval);
        }
    };
    /**
     * リクエストしたコールバックを停止する
     *
     * @version 0.0.10
     * @since 0.0.10
     * @return {number} リクエストIDを返す
     *
     */
    AnimationFrames.prototype.stop = function () {
        if ('cancelAnimationFrame' in window) {
            cancelAnimationFrame(this.requestId);
        }
        else {
            window.clearTimeout(this.requestId);
        }
    };
    /**
     * フレームレート
     *
     * @version 0.0.10
     * @since 0.0.10
     *
     */
    AnimationFrames.FRAME_RATE = 60;
    return AnimationFrames;
})();
module.exports = AnimationFrames;

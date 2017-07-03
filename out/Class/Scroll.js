"use strict";
var Timer = require('./Timer');
/**
 * スクロールを管理するクラス
 *
 * @version 0.9.0
 * @since 0.0.8
 *
 */
var Scroll = (function () {
    function Scroll() {
        this.timer = new Timer();
    }
    /**
     * 対象の要素もしくは位置にスクロールを移動させる
     *
     * @version 0.9.0
     * @since 0.0.8
     * @param selector 対象の要素のセレクタ・HTMLオブジェクト・jQueryオブジェクトもしくはスクロール位置
     * @param options オプション
     * @return インスタンス自信
     *
     */
    Scroll.prototype.to = function (selector, options) {
        var _this = this;
        this.options = options || {};
        var offset = this.options.offset || 0;
        if (this.options.wheelCancel) {
            // TODO: IE8 wheelイベント対応検討
            $(document).on('wheel', function () {
                if (_this.isScroll) {
                    _this._finish();
                    if ($.isFunction(_this.options.onScrollCancel)) {
                        _this.options.onScrollCancel.call(_this, new $.Event('scrollcancel'));
                    }
                }
                return;
            });
        }
        // 第一引数が数値だった場合はその値のy軸へスクロール
        if (typeof selector === 'number') {
            offset += selector || 0;
            this.targetX = 0;
            this.targetY = offset;
        }
        else if (selector) {
            var $target = $(selector);
            if (!$target.length) {
                return this;
            }
            var elem = $target[0];
            // スクロール先座標をセットする
            var x = 0;
            var y = 0;
            // 親のオフセットを足していって自身の座標を確定
            while (elem) {
                x += elem.offsetLeft;
                y += elem.offsetTop;
                elem = elem.offsetParent;
            }
            var winWidth = document.documentElement.clientWidth;
            var winHeight = document.documentElement.clientHeight;
            var docWidth = document.documentElement.scrollWidth;
            var docHeight = document.documentElement.scrollHeight;
            var maxScrollX = Math.max(winWidth, docWidth);
            var maxScrollY = Math.max(winHeight, docHeight);
            this.targetX = Math.min(x, maxScrollX) + offset;
            this.targetY = Math.min(y, maxScrollY) + offset;
        }
        else {
            var $target_1 = $(window.location.hash);
            if ($target_1.length) {
                Timer.wait(Scroll.delayWhenURLHashTarget, function () {
                    window.scrollTo(0, 0);
                    _this.to($target_1, {
                        offset: offset
                    });
                    return;
                });
            }
            return this;
        }
        // スクロール停止中ならスクロール開始
        if (!this.isScroll) {
            this.isScroll = true;
            if ($.isFunction(this.options.onScrollStart)) {
                this.options.onScrollStart.call(this, new $.Event('scrollstart'));
            }
            this._progress();
        }
        return this;
    };
    /**
     * スクロール
     *
     * @version 0.9.0
     * @since 0.0.8
     *
     */
    Scroll.prototype._progress = function () {
        var currentX = this._getX();
        var currentY = this._getY();
        var vx = (this.targetX - currentX) / Scroll.speed;
        var vy = (this.targetY - currentY) / Scroll.speed;
        if ((Math.abs(vx) < 1 && Math.abs(vy) < 1) || (this.prevX === currentX && this.prevY === currentY)) {
            // 目標座標付近に到達していたら終了
            window.scrollTo(this.targetX, this.targetY);
            this._finish();
            if ($.isFunction(this.options.onScrollEnd)) {
                this.options.onScrollEnd.call(this, new $.Event('scrollend'));
            }
        }
        else {
            var nextX = Math.floor(currentX + vx);
            var nextY = Math.floor(currentY + vy);
            // 繰り返し
            window.scrollTo(nextX, nextY);
            this.prevX = currentX;
            this.prevY = currentY;
            if ($.isFunction(this.options.onScrollProgress)) {
                this.options.onScrollProgress.call(this, new $.Event('scrollprogress'));
            }
            this.timer.wait(Scroll.interval, this._progress, this);
        }
    };
    /**
     * x位置の取得
     *
     * @version 0.9.0
     * @since 0.0.8
     * @return x位置
     *
     */
    Scroll.prototype._getX = function () {
        return (window.pageXOffset !== undefined) ? window.pageXOffset : (document.documentElement.scrollLeft || document.body.scrollLeft);
    };
    /**
     * y位置の取得
     *
     * @version 0.9.0
     * @since 0.0.8
     * @return y位置
     *
     */
    Scroll.prototype._getY = function () {
        return (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement.scrollTop || document.body.scrollTop);
    };
    /**
     * スクロールの終了
     *
     * @version 0.9.0
     * @since 0.0.8
     *
     */
    Scroll.prototype._finish = function () {
        this.isScroll = false;
        this.prevX = null;
        this.prevY = null;
        this.timer.stop();
    };
    Scroll.speed = 4;
    Scroll.interval = 20;
    Scroll.delayWhenURLHashTarget = 30;
    return Scroll;
}());
module.exports = Scroll;

var Timer = require('./Timer');
/**
 * スクロールを管理するクラス
 *
 * @version 0.0.8
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
     * @version 0.3.2
     * @since 0.0.8
     * @param {string | HTMLElement | JQuery | number} 対象の要素のセレクタ・HTMLオブジェクト・jQueryオブジェクトもしくはスクロール位置
     * @param {ScrollOptions} オプション
     * @return {Scroll} 自信のスクロールオブジェクト
     *
     */
    Scroll.prototype.to = function (selector, options) {
        var _this = this;
        var ele;
        var x;
        var y;
        var docWidth;
        var docHeight;
        var winWidth;
        var winHeight;
        var maxScrollX;
        var maxScrollY;
        var $target;
        var offset = 0;
        this.options = options || {};
        offset += this.options.offset || 0;
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
            $target = $(selector);
            if (!$target.length) {
                return this;
            }
            ele = $target[0];
            // スクロール先座標をセットする
            x = 0;
            y = 0;
            // 親のオフセットを足していって自身の座標を確定
            while (ele) {
                x += ele.offsetLeft;
                y += ele.offsetTop;
                ele = ele.offsetParent;
            }
            winWidth = document.documentElement.clientWidth;
            winHeight = document.documentElement.clientHeight;
            docWidth = document.documentElement.scrollWidth;
            docHeight = document.documentElement.scrollHeight;
            maxScrollX = Math.max(winWidth, docWidth);
            maxScrollY = Math.max(winHeight, docHeight);
            this.targetX = Math.min(x, maxScrollX) + offset;
            this.targetY = Math.min(y, maxScrollY) + offset;
        }
        else {
            $target = $(window.location.hash);
            if ($target.length) {
                Timer.wait(Scroll.delayWhenURLHashTarget, function () {
                    window.scrollTo(0, 0);
                    _this.to($target, {
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
            this._scroll();
        }
        return this;
    };
    Scroll.prototype._scroll = function () {
        var currentX = this._getX();
        var currentY = this._getY();
        var vx = (this.targetX - currentX) / Scroll.speed;
        var vy = (this.targetY - currentY) / Scroll.speed;
        var nextX = Math.floor(currentX + vx);
        var nextY = Math.floor(currentY + vy);
        if ((Math.abs(vx) < 1 && Math.abs(vy) < 1) || (this.prevX === currentX && this.prevY === currentY)) {
            // 目標座標付近に到達していたら終了
            window.scrollTo(this.targetX, this.targetY);
            this._finish();
            if ($.isFunction(this.options.onScrollEnd)) {
                this.options.onScrollEnd.call(this, new $.Event('scrollend'));
            }
        }
        else {
            // 繰り返し
            window.scrollTo(nextX, nextY);
            this.prevX = currentX;
            this.prevY = currentY;
            if ($.isFunction(this.options.onScrollProgress)) {
                this.options.onScrollProgress.call(this, new $.Event('scrollprogress'));
            }
            this.timer.wait(Scroll.interval, this._scroll, this);
        }
    };
    Scroll.prototype._getX = function () {
        return (window.pageXOffset !== undefined) ? window.pageXOffset : (document.documentElement.scrollLeft || document.body.scrollLeft);
    };
    Scroll.prototype._getY = function () {
        return (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement.scrollTop || document.body.scrollTop);
    };
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
})();
module.exports = Scroll;

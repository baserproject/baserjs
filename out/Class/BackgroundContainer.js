"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var UtilMath = require('./UtilMath');
var Browser = require('./Browser');
var BaserElement = require('./BaserElement');
/**
 * 背景化要素
 *
 * @version 0.13.0
 * @since 0.11.0
 *
 */
var BackgroundContainer = (function (_super) {
    __extends(BackgroundContainer, _super);
    /**
     * コンストラクタ
     *
     * use: jQuery
     *
     * @version 0.13.0
     * @since 0.11.0
     * @param el 管理するDOM要素
     * @param options オプション
     *
     */
    function BackgroundContainer(el, options) {
        _super.call(this, el);
        // 既にエレメント化されていた場合は何もしない
        if (this._elementized) {
            return;
        }
        // IE6・7は反映させない
        if (!el.querySelector) {
            return;
        }
        this.$el.addClass(BackgroundContainer.className);
        this.$el.data(BackgroundContainer.className, this);
        this._config = $.extend({}, BackgroundContainer.defaultOption, options);
        this._$bgElement = this.$el.find(this._config.child);
        var isImage = this._$bgElement.is('img');
        this._bgWidth = +(this.$el.data('width') || this._$bgElement.data('width') || this._$bgElement.attr('width') || this._$bgElement.width()) || 400;
        this._bgHeight = +(this.$el.data('height') || this._$bgElement.data('height') || this._$bgElement.attr('height') || this._$bgElement.height()) || 300;
        if (isImage && this._config.useCSSBackgroundImage) {
            var img = this._$bgElement[0];
            this.$el.css({
                backgroundImage: "url(" + img.src + ")",
                backgroundSize: this._config.size,
                backgroundPosition: this._config.align + " " + this._config.valign,
                backgroundRepeat: 'no-repeat',
            });
            this._$bgElement.detach();
        }
        else {
            var currentCSSPosition = this.$el.css('position');
            if (currentCSSPosition === 'static' || currentCSSPosition === '' || currentCSSPosition == null) {
                this.$el.css('position', 'relative');
            }
            this._$bgElement.css({
                position: 'absolute',
            });
            this._bgStyle = {
                width: 0,
                height: 0,
                top: 0,
                left: 0,
                maxWidth: 'none',
                minWidth: 0,
                maxHeight: 'none',
                minHeight: 0,
            };
            // 初期計算
            this.calc();
            Browser.browser.on('resizeend', this.calc.bind(this));
        }
    }
    /**
     * 計算
     *
     * @version 0.11.0
     * @since 0.11.0
     *
     */
    BackgroundContainer.prototype.calc = function () {
        var containerWidth = this._config.outer ? this.$el.outerWidth() : this.$el.width();
        var containerHeight = this._config.outer ? this.$el.outerHeight() : this.$el.height();
        var _a = UtilMath.stretchDimension(containerWidth, containerHeight, this._bgWidth, this._bgHeight, this._config.size, this._config.align, this._config.valign), width = _a.width, height = _a.height, top = _a.top, left = _a.left;
        this._bgStyle.width = width;
        this._bgStyle.height = height;
        this._bgStyle.top = top;
        this._bgStyle.left = left;
        this._$bgElement.css(this._bgStyle);
    };
    /**
     * 管理対象の要素に付加するclass属性値のプレフィックス
     *
     * @version 0.11.0
     * @since 0.11.0
     *
     */
    BackgroundContainer.className = '-bc-background-container-element';
    /**
     * オプションのデフォルト値
     *
     * @since 0.13.0
     *
     */
    BackgroundContainer.defaultOption = {
        align: 'center',
        valign: 'center',
        size: 'cover',
        child: '>*:first',
        outer: false,
        useCSSBackgroundImage: false,
    };
    return BackgroundContainer;
}(BaserElement));
module.exports = BackgroundContainer;

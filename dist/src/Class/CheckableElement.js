var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var BaserElement = require('./BaserElement');
var FormElement = require('./FormElement');
/**
 * ラジオボタンとチェックボックスの抽象クラス
 *
 * @version 0.9.0
 * @since 0.0.1
 *
 */
var CheckableElement = (function (_super) {
    __extends(CheckableElement, _super);
    /**
     * コンストラクタ
     *
     * use: jQuery
     *
     * @version 0.9.0
     * @since 0.0.1
     * @param el 管理するDOM要素
     * @param options オプション
     *
     */
    function CheckableElement(el, options) {
        var _this = this;
        _super.call(this, el, $.extend({}, CheckableElement.defaultOption, options));
        // 既にエレメント化されていた場合は何もしない
        if (this._elementized) {
            return;
        }
        // IE6・7は反映させない
        if (!el.querySelector) {
            return;
        }
        this._checkedClass = this._config.checkedClass;
        this.checked = this.el.checked;
        this.defaultChecked = this.el.defaultChecked;
        this._update();
        this.$el.on('change.bcCheckableElement', function () {
            _this._onchenge();
        });
    }
    /**
     * 要素の状態を更新する
     *
     * use: jQuery
     *
     * @version 0.0.1
     * @since 0.0.1
     *
     */
    CheckableElement.prototype.update = function () {
        if (this.$el.prop('checked') !== this.checked) {
            this._update();
        }
    };
    /**
     * 要素の状態を更新する
     *
     * @version 0.0.1
     * @since 0.0.1
     *
     */
    CheckableElement.prototype._onchenge = function () {
        this.checked = !this.checked;
        this._update();
    };
    /**
     * 要素の状態を更新する
     *
     * use: jQuery
     *
     * @version 0.9.0
     * @since 0.0.1
     *
     */
    CheckableElement.prototype._update = function () {
        var checked = this.el.checked;
        // WAI-ARIA属性
        this.$el.attr('aria-checked', '' + checked);
        if (checked) {
            this.$el.addClass(this._checkedClass);
            this.$label.addClass(this._checkedClass);
            this.$wrapper.addClass(this._checkedClass);
            BaserElement.addClass(this.el, FormElement.classNameFormElementCommon, '', CheckableElement.classNameStateChecked);
            BaserElement.addClassTo(this.$label, FormElement.classNameFormElementCommon, FormElement.classNameLabel, CheckableElement.classNameStateChecked);
            BaserElement.addClassTo(this.$wrapper, FormElement.classNameWrapper, '', CheckableElement.classNameStateChecked);
            BaserElement.removeClass(this.el, FormElement.classNameFormElementCommon, '', CheckableElement.classNameStateUnchecked);
            BaserElement.removeClassFrom(this.$label, FormElement.classNameFormElementCommon, FormElement.classNameLabel, CheckableElement.classNameStateUnchecked);
            BaserElement.removeClassFrom(this.$wrapper, FormElement.classNameWrapper, '', CheckableElement.classNameStateUnchecked);
        }
        else {
            this.$el.removeClass(this._checkedClass);
            this.$label.removeClass(this._checkedClass);
            this.$wrapper.removeClass(this._checkedClass);
            BaserElement.addClass(this.el, FormElement.classNameFormElementCommon, '', CheckableElement.classNameStateUnchecked);
            BaserElement.addClassTo(this.$label, FormElement.classNameFormElementCommon, FormElement.classNameLabel, CheckableElement.classNameStateUnchecked);
            BaserElement.addClassTo(this.$wrapper, FormElement.classNameWrapper, '', CheckableElement.classNameStateUnchecked);
            BaserElement.removeClass(this.el, FormElement.classNameFormElementCommon, '', CheckableElement.classNameStateChecked);
            BaserElement.removeClassFrom(this.$label, FormElement.classNameFormElementCommon, FormElement.classNameLabel, CheckableElement.classNameStateChecked);
            BaserElement.removeClassFrom(this.$wrapper, FormElement.classNameWrapper, '', CheckableElement.classNameStateChecked);
        }
        this.checked = checked;
    };
    /**
     * オプションのデフォルト値
     *
     * @since 0.0.1
     *
     */
    CheckableElement.defaultOption = {
        checkedClass: ''
    };
    /**
     * CheckableElement関連の要素のチェック時に付加されるクラス
     *
     * @version 0.1.0
     * @since 0.1.0
     *
     */
    CheckableElement.classNameStateChecked = 'checked';
    /**
     * CheckableElement関連の要素のチェックがはずれた時に付加されるクラス
     *
     * @version 0.1.0
     * @since 0.1.0
     *
     */
    CheckableElement.classNameStateUnchecked = 'unchecked';
    return CheckableElement;
})(FormElement);
module.exports = CheckableElement;

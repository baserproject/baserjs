var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var BaserElement = require('./BaserElement');
var FormElement = require('./FormElement');
var CheckableElement = require('./CheckableElement');
/**
 * チェックボックスの拡張クラス
 *
 * @version 0.9.0
 * @since 0.0.1
 *
 */
var Checkbox = (function (_super) {
    __extends(Checkbox, _super);
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
    function Checkbox(el, options) {
        _super.call(this, el, options);
        // 既にエレメント化されていた場合は何もしない
        if (this._elementized) {
            return;
        }
        // IE6・7は反映させない
        if (!el.querySelector) {
            return;
        }
        this.addClass(Checkbox.classNameCheckbox);
        BaserElement.addClassTo(this.$label, Checkbox.classNameCheckbox, FormElement.classNameLabel);
        BaserElement.addClassTo(this.$wrapper, Checkbox.classNameCheckbox + '-' + FormElement.classNameWrapper);
    }
    /**
     * Checkbox要素のクラス
     *
     * @version 0.1.0
     * @since 0.1.0
     *
     */
    Checkbox.classNameCheckbox = 'form-checkbox';
    return Checkbox;
})(CheckableElement);
module.exports = Checkbox;

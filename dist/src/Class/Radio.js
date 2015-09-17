var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaserElement = require('./BaserElement');
var FormElement = require('./FormElement');
var CheckableElement = require('./CheckableElement');
var RadioGroup = require('./RadioGroup');
/**
 * ラジオボタンの拡張クラス
 *
 * @version 0.9.0
 * @since 0.0.1
 *
 */
var Radio = (function (_super) {
    __extends(Radio, _super);
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
    function Radio(el, options) {
        _super.call(this, el, options);
        // 既にエレメント化されていた場合は何もしない
        if (this._elementized) {
            return;
        }
        // IE6・7は反映させない
        if (!el.querySelector) {
            return;
        }
        this.addClass(Radio.classNameRadio);
        BaserElement.addClassTo(this.$label, Radio.classNameRadio, FormElement.classNameLabel);
        BaserElement.addClassTo(this.$wrapper, Radio.classNameRadio + '-' + FormElement.classNameWrapper);
        // ラジオボタングループに登録
        // TODO: APIをRadioGroup.add(name, elem)にする
        if (!RadioGroup.groups[this.name]) {
            RadioGroup.groups[this.name] = new RadioGroup(this.name);
        }
        RadioGroup.groups[this.name].add(this);
    }
    /**
     * チェンジイベントのハンドラ
     *
     * use: jQuery
     *
     * @version 0.7.0
     * @since 0.0.1
     *
     */
    Radio.prototype._onchenge = function () {
        _super.prototype._onchenge.call(this);
        // 同じname属性のラジオボタン要素も同時に変更をする
        // TODO: APIをRadioGroup.update(name, elem)にする
        RadioGroup.groups[this.name].update(this);
    };
    /**
     * Radio要素のクラス
     *
     * @version 0.1.0
     * @since 0.1.0
     *
     */
    Radio.classNameRadio = 'form-radio';
    return Radio;
})(CheckableElement);
module.exports = Radio;

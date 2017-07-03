"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaserElement = require('./BaserElement');
/**
 * フォーム要素の抽象クラス
 *
 * @version 0.9.0
 * @since 0.0.1
 *
 */
var FormElement = (function (_super) {
    __extends(FormElement, _super);
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
    function FormElement(el, options) {
        _super.call(this, el);
        /**
         * フォーカスがあたっている状態かどうか
         *
         * @since 0.1.0
         *
         */
        this.hasFocus = false;
        // 既にエレメント化されていた場合は何もしない
        if (this._elementized) {
            return;
        }
        // IE6・7は反映させない
        if (!el.querySelector) {
            return;
        }
        this._config = $.extend({}, FormElement.defaultOption, options);
        // クラス名を設定す
        this._setClassName();
        // ラベル要素の割り当て
        this._asignLabel();
        // ラベルテキストの設定
        this._setLabelText();
        // ラップ要素の割り当て
        this._createWrapper();
        // 擬似要素生成
        this._createPsuedoElements();
        // イベントを登録
        this._bindEvents();
        // 初期状態を設定
        this.defaultValue = this.$el.val();
        this.setDisabled(this.$el.prop('disabled'));
        this._onblur();
        // フォーム要素に登録
        // TODO: 有要な処理か検討
        FormElement.elements.push(this);
    }
    /**
     * 値を設定する
     *
     * use: jQuery
     *
     * @version 0.9.0
     * @since 0.4.0
     * @param value 設定する値
     * @param isSilent イベントを伝達しない
     *
     */
    FormElement.prototype.setValue = function (value, isSilent) {
        if (isSilent === void 0) { isSilent = false; }
        var valueString = "" + value;
        var currentValue = this.$el.val();
        if (!this.disabled && currentValue !== valueString) {
            this.$el.val(valueString);
            this._fireChangeEvent(isSilent);
        }
    };
    /**
     * 無効状態を設定する
     *
     * use: jQuery
     *
     * @version 0.9.0
     * @since 0.4.0
     * @param 無効状態かどうか
     *
     */
    FormElement.prototype.setDisabled = function (isDisabled) {
        this.disabled = isDisabled;
        this.el.disabled = isDisabled;
        if (this.disabled) {
            BaserElement.addClass(this.el, FormElement.classNameFormElementCommon, '', FormElement.classNameStateDisabled);
            BaserElement.addClassTo(this.$label, FormElement.classNameFormElementCommon, FormElement.classNameLabel, FormElement.classNameStateDisabled);
            BaserElement.addClassTo(this.$wrapper, FormElement.classNameWrapper, '', FormElement.classNameStateDisabled);
        }
        else {
            BaserElement.removeClass(this.el, FormElement.classNameFormElementCommon, '', FormElement.classNameStateDisabled);
            BaserElement.removeClassFrom(this.$label, FormElement.classNameFormElementCommon, FormElement.classNameLabel, FormElement.classNameStateDisabled);
            BaserElement.removeClassFrom(this.$wrapper, FormElement.classNameWrapper, '', FormElement.classNameStateDisabled);
        }
    };
    /**
     * クラス名を設定する
     *
     * @version 0.4.0
     * @since 0.4.0
     *
     */
    FormElement.prototype._setClassName = function () {
        // 共通のクラスを付加
        this.addClass(FormElement.classNameFormElementCommon);
    };
    /**
     * ラップ要素を生成
     *
     * use: jQuery
     *
     * @version 0.9.0
     * @since 0.4.0
     *
     */
    FormElement.prototype._createWrapper = function () {
        var wrapperHtml = '<span />';
        var $wrapper = $(wrapperHtml);
        BaserElement.addClassTo($wrapper, FormElement.classNameFormElementCommon);
        BaserElement.addClassTo($wrapper, FormElement.classNameWrapper);
        if (this.isWrappedByLabel) {
            this.$label.wrapAll($wrapper);
            this.$wrapper = this.$label.parent('span');
        }
        else if (this.hasLabelByForAttr) {
            this.$el.wrapAll($wrapper);
            this.$wrapper = this.$el.parent('span');
        }
        else {
            this.$el.add(this.$label).wrapAll($wrapper);
            this.$wrapper = this.$el.parent('span');
        }
    };
    /**
     * 擬似要素を生成する
     *
     * @version 0.4.1
     * @since 0.4.0
     *
     */
    FormElement.prototype._createPsuedoElements = function () {
        // void
    };
    /**
     * イベントの登録
     *
     * use: jQuery
     *
     * @version 0.9.0
     * @since 0.4.0
     *
     */
    FormElement.prototype._bindEvents = function () {
        var _this = this;
        this.$el.on('focus.bcFormElement', function () {
            if (!_this.disabled) {
                _this._onfocus();
            }
        });
        this.$el.on('blur.bcFormElement', function () {
            _this._onblur();
        });
        this.$el.on('change.bcFormElement', function (e, arg) {
            if (arg && arg.isSilent) {
                _this._onSilentChange();
            }
            else {
                _this.trigger('change', null, _this);
            }
        });
    };
    /**
     * 他のオブジェクトにchangeイベントを発火・伝達せずに実行されるチェンジ処理
     *
     * @version 0.4.0
     * @since 0.4.0
     *
     */
    FormElement.prototype._onSilentChange = function () {
        // void
    };
    /**
     * フォーカスがあたった時の処理
     *
     * use: jQuery
     *
     * @version 0.9.0
     * @since 0.0.1
     *
     */
    FormElement.prototype._onfocus = function () {
        this.hasFocus = true;
        BaserElement.addClass(this.el, FormElement.classNameFormElementCommon, '', FormElement.classNameStateFocus);
        BaserElement.addClassTo(this.$label, FormElement.classNameFormElementCommon, FormElement.classNameLabel, FormElement.classNameStateFocus);
        BaserElement.addClassTo(this.$wrapper, FormElement.classNameWrapper, '', FormElement.classNameStateFocus);
        BaserElement.removeClass(this.el, FormElement.classNameFormElementCommon, '', FormElement.classNameStateBlur);
        BaserElement.removeClassFrom(this.$label, FormElement.classNameFormElementCommon, FormElement.classNameLabel, FormElement.classNameStateBlur);
        BaserElement.removeClassFrom(this.$wrapper, FormElement.classNameWrapper, '', FormElement.classNameStateBlur);
    };
    /**
     * フォーカスがはずれた時の処理
     *
     * use: jQuery
     *
     * @version 0.9.0
     * @since 0.0.1
     *
     */
    FormElement.prototype._onblur = function () {
        this.hasFocus = false;
        BaserElement.addClass(this.el, FormElement.classNameFormElementCommon, '', FormElement.classNameStateBlur);
        BaserElement.addClassTo(this.$label, FormElement.classNameFormElementCommon, FormElement.classNameLabel, FormElement.classNameStateBlur);
        BaserElement.addClassTo(this.$wrapper, FormElement.classNameWrapper, '', FormElement.classNameStateBlur);
        BaserElement.removeClass(this.el, FormElement.classNameFormElementCommon, '', FormElement.classNameStateFocus);
        BaserElement.removeClassFrom(this.$label, FormElement.classNameFormElementCommon, FormElement.classNameLabel, FormElement.classNameStateFocus);
        BaserElement.removeClassFrom(this.$wrapper, FormElement.classNameWrapper, '', FormElement.classNameStateFocus);
    };
    /**
     * changeイベントを発火する
     *
     * use: jQuery
     *
     * @version 0.9.0
     * @since 0.4.0
     * @param isSilent イベントを伝達しない
     *
     */
    FormElement.prototype._fireChangeEvent = function (isSilent) {
        if (isSilent === void 0) { isSilent = false; }
        if (isSilent) {
            this.$el.trigger('change.bcFormElement', [{ isSilent: true }]);
        }
        else if ('createEvent' in document) {
            var e = document.createEvent('Event');
            e.initEvent('change', true, true);
            this.el.dispatchEvent(e);
        }
        else {
            // IE8
            var legacyElement = this.el;
            legacyElement.fireEvent('onchange');
        }
    };
    /**
     * ラベル要素内のテキストを取得する
     *
     * use: jQuery
     *
     * @version 0.9.0
     * @since 0.4.0
     *
     */
    FormElement.prototype._setLabelText = function () {
        var _this = this;
        if (this._config.label) {
            this.$label.prepend(this._config.label);
            this.labelBeforeText = this._config.label;
            this.labelAfterText = '';
        }
        else {
            var $labelContents = this.$label.contents();
            var $before_1 = $();
            var $after_1 = $();
            var isBefore_1 = true;
            $labelContents.each(function (i, node) {
                if (node === _this.$el[0]) {
                    isBefore_1 = false;
                    return;
                }
                if (isBefore_1) {
                    $before_1 = $before_1.add($(node));
                }
                else {
                    $after_1 = $after_1.add($(node));
                }
            });
            $before_1.text(function (i, text) {
                return $.trim(text);
            });
            $after_1.text(function (i, text) {
                return $.trim(text);
            });
            this.labelBeforeText = $before_1.text() || this.$el.attr('title') || '';
            this.labelAfterText = $after_1.text() || '';
            if (this.labelBeforeText) {
                this.$label.prepend($before_1);
            }
            if (this.labelAfterText) {
                this.$label.append($after_1);
            }
        }
        this.label = this.labelBeforeText + this.labelAfterText;
    };
    /**
     * ラベル要素を割り当てる
     *
     * use: jQuery
     *
     * @version 0.9.0
     * @since 0.4.0
     *
     */
    FormElement.prototype._asignLabel = function () {
        this.hasLabelByForAttr = false;
        // 祖先のlabel要素を検索
        var $label = this.$el.closest('label');
        // label要素の存在
        var hasLabel = !!$label.length;
        // labelでネストされていたかどうか
        this.isWrappedByLabel = hasLabel;
        // for属性に関連づいたlabel要素を取得
        if (!hasLabel) {
            $label = $("label[for=\"" + this.id + "\"]");
            hasLabel = !!$label.length;
            this.hasLabelByForAttr = hasLabel;
        }
        // ラベルがないときにラベル要素を生成する
        if (this._config.autoLabeling && !hasLabel) {
            // label(もしくは別の)要素の生成
            $label = $("<" + this._config.labelTag.toLowerCase() + " />");
            $label.insertAfter(this.$el);
            if (this._config.labelClass) {
                $label.addClass(this._config.labelClass);
            }
            if (this._config.labelTag.toLowerCase() === 'label') {
                // labelを生成したのならfor属性にidを紐付ける
                $label.attr('for', this.id);
            }
        }
        // console.log({
        // 	hasLabel: hasLabel,
        // 	isWrappedByLabel: this.isWrappedByLabel,
        // 	hasLabelByForAttr: this.hasLabelByForAttr
        // });
        BaserElement.addClassTo($label, FormElement.classNameFormElementCommon);
        BaserElement.addClassTo($label, FormElement.classNameFormElementCommon, FormElement.classNameLabel);
        this.$label = $label;
    };
    /**
     * オプションのデフォルト値
     *
     * @version 0.0.5
     * @since 0.0.1
     *
     */
    FormElement.defaultOption = {
        label: '',
        labelTag: 'label',
        labelClass: '',
        autoLabeling: true,
    };
    /**
     * FormElement関連の要素の共通のクラス
     *
     * @version 0.1.0
     * @since 0.1.0
     *
     */
    FormElement.classNameFormElementCommon = 'form-element';
    /**
     * FormElement関連のラッパー要素の共通のクラス
     *
     * @version 0.1.0
     * @since 0.1.0
     *
     */
    FormElement.classNameWrapper = 'wrapper';
    /**
     * FormElement関連のラベル要素の共通のクラス
     *
     * @version 0.1.0
     * @since 0.1.0
     *
     */
    FormElement.classNameLabel = 'label';
    /**
     * FormElement関連の要素のフォーカス時に付加されるクラス
     *
     * @version 0.1.0
     * @since 0.1.0
     *
     */
    FormElement.classNameStateFocus = 'focus';
    /**
     * FormElement関連の要素のフォーカスがはずれた時に付加されるクラス
     *
     * @version 0.1.0
     * @since 0.1.0
     *
     */
    FormElement.classNameStateBlur = 'blur';
    /**
     * FormElement関連の要素の無効状態の時に付加されるクラス
     *
     * @version 0.4.0
     * @since 0.4.0
     *
     */
    FormElement.classNameStateDisabled = 'disabled';
    /**
     * フォーム関連要素リスト
     *
     * @version 0.7.0
     * @since 0.7.0
     *
     */
    FormElement.elements = [];
    return FormElement;
}(BaserElement));
module.exports = FormElement;

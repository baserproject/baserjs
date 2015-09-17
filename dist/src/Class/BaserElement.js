var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var UtilString = require('./UtilString');
var EventDispatcher = require('./EventDispatcher');
var ElementClassNameCase = require('../Enum/ElementClassNameCase');
var ClassNameSeparatorForBEM = require('../Enum/ClassNameSeparatorForBEM');
var HYPHEN = '-';
var DOUBLE_HYPHEN = '--';
var UNDERSCORE = '_';
var DOUBLE_UNDERSCORE = '__';
/**
 * DOM要素の抽象クラス
 *
 * DOM要素操作に関するjQueryのメソッドは極力ここに集約したい
 * 脱jQueryの際にこのクラスを改修するだけで済むようにする
 *
 * @version 0.9.0
 * @since 0.0.1
 *
 */
var BaserElement = (function (_super) {
    __extends(BaserElement, _super);
    /**
     * コンストラクタ
     *
     * use: jQuery
     *
     * TODO: クラス名のつき方の規則をきちんと決める
     * TODO: コンストラクタの引数をネイティブのDOM要素にする
     *
     * @version 0.9.0
     * @since 0.0.1
     * @param $el 管理するDOM要素
     *
     */
    function BaserElement(el) {
        _super.call(this);
        /**
         * 管理するDOM要素のname属性値
         *
         * @version 0.0.1
         * @since 0.0.1
         *
         */
        this.name = '';
        /**
         * baserJSのエレメント化してたかどうか
         *
         * @version 0.8.0
         * @since 0.8.0
         *
         */
        this._elementized = false;
        this.el = el;
        this.$el = $(el);
        // 既にbaserJSのエレメント化している場合
        if (this.$el.data('bc-element')) {
            if ('console' in window) {
                console.warn('This element is elementized of baserJS.');
            }
            this._elementized = true;
            return;
        }
        this.$el.data('bc-element', this);
        // ID・nameの抽出 & 生成
        var id = el.id || UtilString.UID();
        var name = el.getAttribute('name');
        el.id = id;
        this.id = id;
        this.name = name;
        // 共通クラスの付加
        this.addClass(BaserElement.classNameElementCommon);
    }
    /**
     * BEMベースでクラス名文字列を生成する
     *
     * @version 0.9.0
     * @since 0.1.0
     * @param blockName ブロック名
     * @param elementName 要素名
     * @param modifierName 状態名
     * @return 生成されたクラス名
     *
     */
    BaserElement.createClassName = function (blockNames, elementNames, modifierName) {
        if (elementNames === void 0) { elementNames = ''; }
        if (modifierName === void 0) { modifierName = ''; }
        var className = '';
        var prefix;
        var separator;
        var elementSeparator;
        var modifierSeparator;
        switch (BaserElement.classNameDefaultCase) {
            case ElementClassNameCase.HYPHEN_DELIMITED: {
                separator = HYPHEN;
                blockNames = UtilString.hyphenDelimited(blockNames);
                elementNames = UtilString.hyphenDelimited(elementNames);
                modifierName = UtilString.hyphenDelimited(modifierName);
                break;
            }
            case ElementClassNameCase.SNAKE_CASE: {
                separator = UNDERSCORE;
                blockNames = UtilString.snakeCase(blockNames);
                elementNames = UtilString.snakeCase(elementNames);
                modifierName = UtilString.snakeCase(modifierName);
                break;
            }
            case ElementClassNameCase.CAMEL_CASE: {
                separator = '';
                blockNames = UtilString.camelCase(blockNames, true);
                elementNames = UtilString.camelCase(elementNames);
                modifierName = UtilString.camelCase(modifierName);
                break;
            }
        }
        switch (BaserElement.classNameDefaultSeparatorForElement) {
            case ClassNameSeparatorForBEM.HYPHEN: {
                elementSeparator = HYPHEN;
                break;
            }
            case ClassNameSeparatorForBEM.DOUBLE_HYPHEN: {
                elementSeparator = DOUBLE_HYPHEN;
                break;
            }
            case ClassNameSeparatorForBEM.UNDERSCORE: {
                elementSeparator = UNDERSCORE;
                break;
            }
            case ClassNameSeparatorForBEM.DOUBLE_UNDERSCORE: {
                elementSeparator = DOUBLE_UNDERSCORE;
                break;
            }
            case ClassNameSeparatorForBEM.CAMEL_CASE: {
                elementSeparator = '';
                break;
            }
        }
        switch (BaserElement.classNameDefaultSeparatorForModifier) {
            case ClassNameSeparatorForBEM.HYPHEN: {
                modifierSeparator = HYPHEN;
                break;
            }
            case ClassNameSeparatorForBEM.DOUBLE_HYPHEN: {
                modifierSeparator = DOUBLE_HYPHEN;
                break;
            }
            case ClassNameSeparatorForBEM.UNDERSCORE: {
                modifierSeparator = UNDERSCORE;
                break;
            }
            case ClassNameSeparatorForBEM.DOUBLE_UNDERSCORE: {
                modifierSeparator = DOUBLE_UNDERSCORE;
                break;
            }
            case ClassNameSeparatorForBEM.CAMEL_CASE: {
                modifierSeparator = '';
                break;
            }
        }
        if (BaserElement.classNameDefaultPrefix) {
            prefix = BaserElement.classNameDefaultPrefix;
            prefix = prefix
                .replace(/^[^a-z_-]/i, '')
                .replace(/[^a-z0-9_-]+/ig, '')
                .replace(/^--+/, '-');
            className += prefix;
        }
        className += separator + blockNames;
        if (elementNames) {
            className += elementSeparator + elementNames;
        }
        if (modifierName) {
            className += modifierSeparator + modifierName;
        }
        return className;
    };
    /**
     * 要素の属性の真偽を判定する
     *
     * DOM APIの標準で判定できるものはそれで判断
     * 値なし属性の場合は存在すれば真
     * 値あり属性の場合は偽相等の文字列でなければ全て真とする
     * ただし値なし属性の場合は値が空文字列のため、偽相等の文字列の例外とする
     *
     * @version 0.9.0
     * @since 0.2.0
     * @param elem 対象のDOM要素
     * @param attrName 確認したい属性名
     * @return 結果
     *
     */
    BaserElement.getBoolAttr = function (elem, attrName) {
        var value;
        // DOM APIの標準で判定できるものはそれで判断
        value = elem[attrName];
        if (value === true) {
            return true;
        }
        var attr = elem.attributes.getNamedItem(attrName);
        if (attr) {
            value = attr.value;
            if (value === '') {
                // 値なし属性の場合は存在すれば真
                return true;
            }
            else {
                return !UtilString.isFalsy('' + value);
            }
        }
        else {
            // 属性がない場合は偽
            return false;
        }
    };
    /**
     * クラス名を付加する
     *
     * use: jQuery
     *
     * @version 0.9.0
     * @since 0.1.0
     * @param elem 対象のDOM要素
     * @param blockName ブロック名
     * @param elementName 要素名
     * @param modifierName 状態名
     *
     */
    BaserElement.addClass = function (elem, blockNames, elementNames, modifierName) {
        if (elementNames === void 0) { elementNames = ''; }
        if (modifierName === void 0) { modifierName = ''; }
        var $elem = $(elem);
        var className = BaserElement.createClassName(blockNames, elementNames, modifierName);
        $elem.addClass(className);
    };
    /**
     * 【廃止予定】クラス名を付加する
     *
     * use: jQuery
     *
     * @deprecated
     * @version 0.1.0
     * @since 0.1.0
     * @param $elem 対象のDOM要素
     * @param blockName ブロック名
     * @param elementName 要素名
     * @param modifierName 状態名
     *
     */
    BaserElement.addClassTo = function ($elem, blockNames, elementNames, modifierName) {
        if (elementNames === void 0) { elementNames = ''; }
        if (modifierName === void 0) { modifierName = ''; }
        var className = BaserElement.createClassName(blockNames, elementNames, modifierName);
        $elem.addClass(className);
    };
    /**
     * クラス名を取り除く
     *
     * use: jQuery
     *
     * @version 0.9.0
     * @since 0.1.0
     * @param elem 対象のDOM要素
     * @param blockName ブロック名
     * @param elementName 要素名
     * @param modifierName 状態名
     *
     */
    BaserElement.removeClass = function (elem, blockNames, elementNames, modifierName) {
        if (elementNames === void 0) { elementNames = ''; }
        if (modifierName === void 0) { modifierName = ''; }
        var $elem = $(elem);
        var className = BaserElement.createClassName(blockNames, elementNames, modifierName);
        $elem.removeClass(className);
    };
    /**
     * 【廃止予定】クラス名を取り除く
     *
     * use: jQuery
     *
     * @deprecated
     * @version 0.1.0
     * @since 0.1.0
     * @param $elem 対象のDOM要素
     * @param blockName ブロック名
     * @param elementName 要素名
     * @param modifierName 状態名
     *
     */
    BaserElement.removeClassFrom = function ($elem, blockNames, elementNames, modifierName) {
        if (elementNames === void 0) { elementNames = ''; }
        if (modifierName === void 0) { modifierName = ''; }
        var className = BaserElement.createClassName(blockNames, elementNames, modifierName);
        $elem.removeClass(className);
    };
    /**
     * CSSプロパティをDOM要素から取り除く
     *
     * @version 0.9.0
     * @since 0.2.2
     * @param elem 対象のDOM要素
     * @param propName 取り除くCSSプロパティ
     *
     */
    BaserElement.removeCSSProp = function (elem, propName) {
        var style = elem.style;
        // IE8以下はCSSStyleDeclarationのインターフェイスが標準でないのでメソッド定義チェックでエラーになる
        if (style) {
            var styleIE8lt = style;
            if (style.removeProperty) {
                style.removeProperty(propName);
            }
            else if (styleIE8lt.removeAttribute) {
                styleIE8lt.removeAttribute(propName);
            }
        }
    };
    /**
     * 【廃止予定】CSSプロパティをDOM要素から取り除く
     *
     * use: jQuery
     *
     * @deprecated
     * @version 0.9.0
     * @since 0.2.2
     * @param propName 取り除くCSSプロパティ
     * @param elem 対象のDOM要素
     *
     */
    BaserElement.removeCSSPropertyFromDOMElement = function (propertyName, elem) {
        BaserElement.removeCSSProp(elem, propertyName);
    };
    /**
     * 【廃止予定】CSSプロパティを取り除く
     *
     * use: jQuery
     *
     * @version 0.9.0
     * @since 0.2.2
     * @param propName 取り除くCSSプロパティ
     * @param $elem 対象のDOM要素
     *
     */
    BaserElement.removeCSSProperty = function (propertyName, $elem) {
        $elem.each(function (i, elem) {
            BaserElement.removeCSSProp(elem, propertyName);
        });
    };
    /**
     * クラス名を付加する
     *
     * @version 0.9.0
     * @since 0.1.0
     *
     */
    BaserElement.prototype.addClass = function (blockNames, elementNames, modifierName) {
        if (elementNames === void 0) { elementNames = ''; }
        if (modifierName === void 0) { modifierName = ''; }
        BaserElement.addClass(this.el, blockNames, elementNames, modifierName);
    };
    /**
     * 要素の属性の真偽を判定する
     *
     * `BaserElement.getBoolAttr` のインスタンスメソッド版
     *
     * @version 0.9.0
     * @since 0.2.0
     *
     */
    BaserElement.prototype.getBoolAttr = function (attrName) {
        return BaserElement.getBoolAttr(this.el, attrName);
    };
    /**
     * オプションとdata属性の値、属性の値をマージする
     *
     * use: jQuery
     *
     * TODO: テストを書く
     * TODO: サブクラスに反映させる
     *
     * @version 0.9.0
     * @since 0.8.0
     *
     */
    BaserElement.prototype.mergeOptions = function (defaultOptions, options) {
        var attrs = {};
        var dataAttrs = {};
        var optName;
        for (optName in defaultOptions) {
            if (defaultOptions.hasOwnProperty(optName)) {
                // 属性はidとclassは除外する
                switch (optName) {
                    case 'id':
                    case 'class': {
                        break;
                    }
                    default: {
                        attrs[optName] = this.$el.attr(optName);
                    }
                }
                dataAttrs[optName] = this.$el.data(optName);
            }
        }
        return $.extend({}, defaultOptions, options, dataAttrs, attrs);
    };
    /**
     * クラス名のデフォルトのプレフィックス
     *
     * @version 0.1.0
     * @since 0.1.0
     *
     */
    BaserElement.classNameDefaultPrefix = '-bc';
    /**
     * インスタンスに付加するデフォルトのクラス名
     *
     * @version 0.1.0
     * @since 0.1.0
     *
     */
    BaserElement.classNameElementCommon = 'element';
    /**
     * クラス名のデフォルトの単語繋ぎの形式
     *
     * @version 0.1.0
     * @since 0.1.0
     *
     */
    BaserElement.classNameDefaultCase = ElementClassNameCase.HYPHEN_DELIMITED;
    /**
     * BEMのエレメントのクラス名の繋ぎ文字
     *
     * @version 0.1.0
     * @since 0.1.0
     *
     */
    BaserElement.classNameDefaultSeparatorForElement = ClassNameSeparatorForBEM.DOUBLE_UNDERSCORE;
    /**
     * BEMのモディファイアのクラス名の繋ぎ文字
     *
     * @version 0.1.0
     * @since 0.1.0
     *
     */
    BaserElement.classNameDefaultSeparatorForModifier = ClassNameSeparatorForBEM.DOUBLE_HYPHEN;
    return BaserElement;
})(EventDispatcher);
module.exports = BaserElement;

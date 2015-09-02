import UtilString = require('./UtilString');
import EventDispacher = require('./EventDispacher');
import ElementClassNameCase = require('../Enum/ElementClassNameCase');
import ClassNameSeparatorForBEM = require('../Enum/ClassNameSeparatorForBEM');
import IElement = require('../Interface/IElement');

const HYPHEN: string = '-';
const DOUBLE_HYPHEN: string = '--';
const UNDERSCORE: string = '_';
const DOUBLE_UNDERSCORE: string = '__';

/**
 * DOM要素の抽象クラス
 *
 * @version 0.3.0
 * @since 0.0.1
 *
 */
class BaserElement extends EventDispacher implements IElement {

	/**
	 * クラス名のデフォルトのプレフィックス
	 *
	 * @version 0.1.0
	 * @since 0.1.0
	 *
	 */
	static classNameDefaultPrefix: string = '-bc';

	/**
	 * インスタンスに付加するデフォルトのクラス名
	 *
	 * @version 0.1.0
	 * @since 0.1.0
	 *
	 */
	static classNameElementCommon: string = 'element';

	/**
	 * クラス名のデフォルトの単語繋ぎの形式
	 *
	 * @version 0.1.0
	 * @since 0.1.0
	 *
	 */
	static classNameDefaultCase: ElementClassNameCase = ElementClassNameCase.HYPHEN_DELIMITED;

	/**
	 * BEMのエレメントのクラス名の繋ぎ文字
	 *
	 * @version 0.1.0
	 * @since 0.1.0
	 *
	 */
	static classNameDefaultSeparatorForElement: ClassNameSeparatorForBEM = ClassNameSeparatorForBEM.DOUBLE_UNDERSCORE;

	/**
	 * BEMのモディファイアのクラス名の繋ぎ文字
	 *
	 * @version 0.1.0
	 * @since 0.1.0
	 *
	 */
	static classNameDefaultSeparatorForModifier: ClassNameSeparatorForBEM = ClassNameSeparatorForBEM.DOUBLE_HYPHEN;

	/**
	 * 管理するDOM要素のjQueryオブジェクト
	 *
	 * @since 0.0.1
	 *
	 */
	public $el: JQuery;

	/**
	 * 管理するDOM要素のid属性値
	 *
	 * @since 0.0.1
	 *
	 */
	public id: string;

	/**
	 * 管理するDOM要素のname属性値
	 *
	 * @since 0.0.1
	 *
	 */
	public name: string = '';

	/**
	 * baserJSのエレメント化してたかどうか
	 */
	protected _elementized: boolean = false;

	/**
	 * クラス名文字列を生成する
	 *
	 * @version 0.1.0
	 * @since 0.1.0
	 *
	 */
	static createClassName (blockNames: string, elementNames: string = '', modifierName: string = ''): string {
		var className: string = '';
		var prefix: string;
		var separator: string;
		var elementSeparator: string;
		var modifierSeparator: string;
		switch (BaserElement.classNameDefaultCase) {
			case ElementClassNameCase.HYPHEN_DELIMITED:
				separator = HYPHEN;
				blockNames = UtilString.hyphenDelimited(blockNames);
				elementNames = UtilString.hyphenDelimited(elementNames);
				modifierName = UtilString.hyphenDelimited(modifierName);
				break;
			case ElementClassNameCase.SNAKE_CASE:
				separator = UNDERSCORE;
				blockNames = UtilString.snakeCase(blockNames);
				elementNames = UtilString.snakeCase(elementNames);
				modifierName = UtilString.snakeCase(modifierName);
				break;
			case ElementClassNameCase.CAMEL_CASE:
				separator = '';
				blockNames = UtilString.camelCase(blockNames, true);
				elementNames = UtilString.camelCase(elementNames);
				modifierName = UtilString.camelCase(modifierName);
				break;
		}
		switch (BaserElement.classNameDefaultSeparatorForElement) {
			case ClassNameSeparatorForBEM.HYPHEN:
				elementSeparator = HYPHEN;
				break;
			case ClassNameSeparatorForBEM.DOUBLE_HYPHEN:
				elementSeparator = DOUBLE_HYPHEN;
				break;
			case ClassNameSeparatorForBEM.UNDERSCORE:
				elementSeparator = UNDERSCORE;
				break;
			case ClassNameSeparatorForBEM.DOUBLE_UNDERSCORE:
				elementSeparator = DOUBLE_UNDERSCORE;
				break;
			case ClassNameSeparatorForBEM.CAMEL_CASE:
				elementSeparator = '';
				break;
		}
		switch (BaserElement.classNameDefaultSeparatorForModifier) {
			case ClassNameSeparatorForBEM.HYPHEN:
				modifierSeparator = HYPHEN;
				break;
			case ClassNameSeparatorForBEM.DOUBLE_HYPHEN:
				modifierSeparator = DOUBLE_HYPHEN;
				break;
			case ClassNameSeparatorForBEM.UNDERSCORE:
				modifierSeparator = UNDERSCORE;
				break;
			case ClassNameSeparatorForBEM.DOUBLE_UNDERSCORE:
				modifierSeparator = DOUBLE_UNDERSCORE;
				break;
			case ClassNameSeparatorForBEM.CAMEL_CASE:
				modifierSeparator = '';
				break;
		}
		if (BaserElement.classNameDefaultPrefix) {
			prefix = BaserElement.classNameDefaultPrefix;
			// 先頭のアルファベット・アンダースコア・ハイフン以外を削除
			prefix = prefix.replace(/^[^a-z_-]/i, '');
			// アルファベット・数字・アンダースコア・ハイフン以外を削除
			prefix = prefix.replace(/[^a-z0-9_-]+/ig, '');
			// 先頭の2個以上連続するハイフンを削除
			prefix = prefix.replace(/^--+/, '-');
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
	}

	/**
	 * 要素の属性の真偽を判定する
	 *
	 * DOM APIの標準で判定できるものはそれで判断
	 *
	 * 値なし属性の場合は存在すれば真
	 *
	 * 値あり属性の場合は偽相等の文字列でなければ全て真とする
	 *
	 * ただし値なし属性の場合は値が空文字列のため、偽相等の文字列の例外とする
	 *
	 * @version 0.2.0
	 * @since 0.2.0
	 *
	 */
	static getBoolAttr ($elem: JQuery, attrName: string): boolean {
		// DOM APIの標準で判定できるものはそれで判断
		var propValue: any = $elem.prop(attrName);
		if (propValue === true) {
			return true;
		}
		// 属性の値の取得 値なし属性の場合は 存在しない場合 undefined を返す
		var value: string = $elem.attr(attrName);
		if (value === undefined) {
			return false;
		}
		// 値なし属性の場合は値が空文字列 （偽相等の文字列の例外）
		if (value === '') {
			return true;
		}
		// 値あり属性の場合は偽相等の文字列でなければ全て真とする
		return !UtilString.isFalsy(value);
	}

	/**
	 * クラス名を付加する
	 *
	 * @version 0.1.0
	 * @since 0.1.0
	 *
	 */
	static addClassTo ($elem: JQuery, blockNames: string, elementNames: string = '', modifierName: string = ''): void {
		var className: string = BaserElement.createClassName(blockNames, elementNames, modifierName);
		$elem.addClass(className);
	}

	/**
	 * クラス名を取り除く
	 *
	 * @version 0.1.0
	 * @since 0.1.0
	 *
	 */
	static removeClassFrom ($elem: JQuery, blockNames: string, elementNames: string = '', modifierName: string = ''): void {
		var className: string = BaserElement.createClassName(blockNames, elementNames, modifierName);
		$elem.removeClass(className);
	}

	/**
	 * CSSプロパティをDOM要素から取り除く
	 *
	 * @version 0.2.2
	 * @since 0.2.2
	 *
	 */
	static removeCSSPropertyFromDOMElement (propertyName: string, elem: HTMLElement): void {
		var style: CSSStyleDeclaration = elem.style;
		// IE8以下はCSSStyleDeclarationのインターフェイスが標準でないのでメソッド定義チェックでエラーになる
		var styleIE8lt: any = <any> style;
		if (style) {
			if (style.removeProperty) {
				style.removeProperty(propertyName);
			} else if (styleIE8lt.removeAttribute) {
				styleIE8lt.removeAttribute(propertyName);
			}
		}
	}

	/**
	 * CSSプロパティを取り除く
	 *
	 * @version 0.2.2
	 * @since 0.2.2
	 *
	 */
	static removeCSSProperty (propertyName: string, $elem: JQuery): void {
		$elem.each( (i: number, elem: HTMLElement) => {
			BaserElement.removeCSSPropertyFromDOMElement(propertyName, elem);
		});
	}

	/**
	 * コンストラクタ
	 *
	 * @version 0.8.1
	 * @since 0.0.1
	 * @param $el 管理するDOM要素のjQueryオブジェクト
	 *
	 */
	constructor ($el: JQuery) {
		super();
		this.$el = $el;
		// 既にbaserJSのエレメント化している場合
		if ($el.data('bc-element')) {
			if ('console' in window) {
				console.warn('This element is elementized of baserJS.');
			}
			this._elementized = true;
			return;
		}
		$el.data('bc-element', this);
		// ID・nameの抽出 & 生成
		var ids: string[] = [];
		var names: string[] = [];
		this.$el.each( (i: number, el: HTMLElement): void => {
			var id: string = el.id || UtilString.UID();
			var name: string = el.getAttribute('name');
			el.id = id;
			ids.push(id);
			names.push(name);
		});
		this.id = ids.join(' ');
		this.name = names.join(' ');
		// 共通クラスの付加
		this.addClass(BaserElement.classNameElementCommon);
	}

	/**
	 * クラス名を付加する
	 *
	 * @version 0.1.0
	 * @since 0.1.0
	 *
	 */
	public addClass (blockNames: string, elementNames: string = '', modifierName: string = ''): void {
		var className: string = BaserElement.createClassName(blockNames, elementNames, modifierName);
		this.$el.addClass(className);
	}

	/**
	 * 要素の属性の真偽を判定する
	 *
	 * `BaserElement.getBoolAttr` のインスタンスメソッド版
	 *
	 * @version 0.2.0
	 * @since 0.2.0
	 *
	 */
	public getBoolAttr (attrName: string): boolean {
		return BaserElement.getBoolAttr(this.$el, attrName);
	}

	/**
	 * オプションとdata属性の値、属性の値をマージする
	 *
	 * TODO: テストを書く
	 * TODO: サブクラスに反映させる
	 * 
	 * @version 0.8.0
	 * @since 0.8.0
	 *
	 */
	public mergeOptions (defaultOptions: any, options: any): any {
		var optName: string;
		var attrs: { [option: string ]: any } = {};
		var dataAttrs: { [option: string ]: any } = {};
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
	}

}


export = BaserElement;
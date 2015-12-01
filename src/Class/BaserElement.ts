import UtilString = require('./UtilString');
import EventDispatcher = require('./EventDispatcher');
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
 * DOM要素操作に関するjQueryのメソッドは極力ここに集約したい
 * 脱jQueryの際にこのクラスを改修するだけで済むようにする
 *
 * @version 0.9.0
 * @since 0.0.1
 *
 */
class BaserElement extends EventDispatcher implements IElement {

	/**
	 * クラス名のデフォルトのプレフィックス
	 *
	 * @version 0.1.0
	 * @since 0.1.0
	 *
	 */
	public static classNameDefaultPrefix: string = '-bc';

	/**
	 * インスタンスに付加するデフォルトのクラス名
	 *
	 * @version 0.1.0
	 * @since 0.1.0
	 *
	 */
	public static classNameElementCommon: string = 'element';

	/**
	 * クラス名のデフォルトの単語繋ぎの形式
	 *
	 * @version 0.1.0
	 * @since 0.1.0
	 *
	 */
	public static classNameDefaultCase: ElementClassNameCase = ElementClassNameCase.HYPHEN_DELIMITED;

	/**
	 * BEMのエレメントのクラス名の繋ぎ文字
	 *
	 * @version 0.1.0
	 * @since 0.1.0
	 *
	 */
	public static classNameDefaultSeparatorForElement: ClassNameSeparatorForBEM = ClassNameSeparatorForBEM.DOUBLE_UNDERSCORE;

	/**
	 * BEMのモディファイアのクラス名の繋ぎ文字
	 *
	 * @version 0.1.0
	 * @since 0.1.0
	 *
	 */
	public static classNameDefaultSeparatorForModifier: ClassNameSeparatorForBEM = ClassNameSeparatorForBEM.DOUBLE_HYPHEN;

	/**
	 * 【廃止予定】管理するDOM要素のjQueryオブジェクト
	 *
	 * @deprecated
	 * @version 0.0.1
	 * @since 0.0.1
	 *
	 */
	public $el: JQuery;

	/**
	 * 管理するDOM要素
	 *
	 * @version 0.9.0
	 * @since 0.9.0
	 *
	 */
	public el: HTMLElement;

	/**
	 * 管理するDOM要素のid属性値
	 *
	 * @version 0.0.1
	 * @since 0.0.1
	 *
	 */
	public id: string;

	/**
	 * 管理するDOM要素のname属性値
	 *
	 * @version 0.0.1
	 * @since 0.0.1
	 *
	 */
	public name: string = '';

	/**
	 * baserJSのエレメント化してたかどうか
	 *
	 * @version 0.8.0
	 * @since 0.8.0
	 *
	 */
	protected _elementized: boolean = false;

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
	public static createClassName (blockNames: string, elementNames: string = '', modifierName: string = ''): string {
		let className: string = '';
		let prefix: string;
		let separator: string;
		let elementSeparator: string;
		let modifierSeparator: string;
		switch (BaserElement.classNameDefaultCase) {
			case ElementClassNameCase.HYPHEN_DELIMITED: {
				separator = HYPHEN;
				blockNames = UtilString.hyphenDelimited(blockNames);
				elementNames = UtilString.hyphenDelimited(elementNames);
				modifierName = UtilString.hyphenDelimited(modifierName);
			}
			break;
			case ElementClassNameCase.SNAKE_CASE: {
				separator = UNDERSCORE;
				blockNames = UtilString.snakeCase(blockNames);
				elementNames = UtilString.snakeCase(elementNames);
				modifierName = UtilString.snakeCase(modifierName);
			}
			break;
			case ElementClassNameCase.CAMEL_CASE: {
				separator = '';
				blockNames = UtilString.camelCase(blockNames, true);
				elementNames = UtilString.camelCase(elementNames);
				modifierName = UtilString.camelCase(modifierName);
			}
			break;
			default: {
				// void
			}
		}
		switch (BaserElement.classNameDefaultSeparatorForElement) {
			case ClassNameSeparatorForBEM.HYPHEN: {
				elementSeparator = HYPHEN;
			}
			break;
			case ClassNameSeparatorForBEM.DOUBLE_HYPHEN: {
				elementSeparator = DOUBLE_HYPHEN;
			}
			break;
			case ClassNameSeparatorForBEM.UNDERSCORE: {
				elementSeparator = UNDERSCORE;
			}
			break;
			case ClassNameSeparatorForBEM.DOUBLE_UNDERSCORE: {
				elementSeparator = DOUBLE_UNDERSCORE;
			}
			break;
			case ClassNameSeparatorForBEM.CAMEL_CASE: {
				elementSeparator = '';
			}
			break;
			default: {
				// void
			}
		}
		switch (BaserElement.classNameDefaultSeparatorForModifier) {
			case ClassNameSeparatorForBEM.HYPHEN: {
				modifierSeparator = HYPHEN;
			}
			break;
			case ClassNameSeparatorForBEM.DOUBLE_HYPHEN: {
				modifierSeparator = DOUBLE_HYPHEN;
			}
			break;
			case ClassNameSeparatorForBEM.UNDERSCORE: {
				modifierSeparator = UNDERSCORE;
			}
			break;
			case ClassNameSeparatorForBEM.DOUBLE_UNDERSCORE: {
				modifierSeparator = DOUBLE_UNDERSCORE;
			}
			break;
			case ClassNameSeparatorForBEM.CAMEL_CASE: {
				modifierSeparator = '';
			}
			break;
			default: {
				// void
			}
		}
		if (BaserElement.classNameDefaultPrefix) {
			prefix = BaserElement.classNameDefaultPrefix;
			prefix = prefix
				// 先頭のアルファベット・アンダースコア・ハイフン以外を削除
				.replace(/^[^a-z_-]/i, '')
				// アルファベット・数字・アンダースコア・ハイフン以外を削除
				.replace(/[^a-z0-9_-]+/ig, '')
				// 先頭の2個以上連続するハイフンを削除
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
	}

	/**
	 * 要素の属性の真偽を判定する
	 *
	 * DOM APIの標準で判定できるものはそれで判断
	 * 値なし属性の場合は存在すれば真
	 * 値あり属性の場合は偽相等の文字列でなければ全て真とする
	 * ただし値なし属性の場合は値が空文字列のため、偽相等の文字列の例外とする
	 *
	 * @version 0.10.0
	 * @since 0.2.0
	 * @param elem 対象のDOM要素
	 * @param attrName 確認したい属性名
	 * @return 結果
	 *
	 */
	public static getBoolAttr (elem: HTMLElement, attrName: string): boolean {
		let value: any;
		// DOM APIの標準で判定できるものはそれで判断
		value = elem[attrName];
		if (value === true) {
			return true;
		}
		const attr: Attr = elem.attributes.getNamedItem(attrName);
		if (attr) {
			value = attr.value;
			if (value === '') {
				// 値なし属性の場合は存在すれば真
				return true;
			} else {
				return !UtilString.isFalsy(`${value}`);
			}
		} else {
			// 属性がない場合は偽
			return false;
		}
	}

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
	public static addClass (elem: HTMLElement, blockNames: string, elementNames: string = '', modifierName: string = ''): void {
		const $elem: JQuery = $(elem);
		const className: string = BaserElement.createClassName(blockNames, elementNames, modifierName);
		$elem.addClass(className);
	}

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
	public static addClassTo ($elem: JQuery, blockNames: string, elementNames: string = '', modifierName: string = ''): void {
		const className: string = BaserElement.createClassName(blockNames, elementNames, modifierName);
		$elem.addClass(className);
	}

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
	public static removeClass (elem: HTMLElement, blockNames: string, elementNames: string = '', modifierName: string = ''): void {
		const $elem: JQuery = $(elem);
		const className: string = BaserElement.createClassName(blockNames, elementNames, modifierName);
		$elem.removeClass(className);
	}

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
	public static removeClassFrom ($elem: JQuery, blockNames: string, elementNames: string = '', modifierName: string = ''): void {
		const className: string = BaserElement.createClassName(blockNames, elementNames, modifierName);
		$elem.removeClass(className);
	}

	/**
	 * CSSプロパティをDOM要素から取り除く
	 *
	 * @version 0.9.0
	 * @since 0.2.2
	 * @param elem 対象のDOM要素
	 * @param propName 取り除くCSSプロパティ
	 *
	 */
	public static removeCSSProp (elem: HTMLElement, propName: string): void {
		const style: CSSStyleDeclaration = elem.style;
		// IE8以下はCSSStyleDeclarationのインターフェイスが標準でないのでメソッド定義チェックでエラーになる
		if (style) {
			const styleIE8lt: any = <any> style;
			if (style.removeProperty) {
				style.removeProperty(propName);
			} else if (styleIE8lt.removeAttribute) {
				styleIE8lt.removeAttribute(propName);
			}
		}
	}

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
	public static removeCSSPropertyFromDOMElement (propertyName: string, elem: HTMLElement): void {
		BaserElement.removeCSSProp(elem, propertyName);
	}

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
	public static removeCSSProperty (propertyName: string, $elem: JQuery): void {
		$elem.each( (i: number, elem: HTMLElement) => {
			BaserElement.removeCSSProp(elem, propertyName);
		});
	}

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
	constructor (el: HTMLElement) {
		super();
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
		const id: string = el.id || UtilString.UID();
		const name: string = el.getAttribute('name');
		el.id = id;
		this.id = id;
		this.name = name;
		// 共通クラスの付加
		this.addClass(BaserElement.classNameElementCommon);
	}

	/**
	 * クラス名を付加する
	 *
	 * @version 0.9.0
	 * @since 0.1.0
	 *
	 */
	public addClass (blockNames: string, elementNames: string = '', modifierName: string = ''): void {
		BaserElement.addClass(this.el, blockNames, elementNames, modifierName);
	}

	/**
	 * 要素の属性の真偽を判定する
	 *
	 * `BaserElement.getBoolAttr` のインスタンスメソッド版
	 *
	 * @version 0.9.0
	 * @since 0.2.0
	 *
	 */
	public getBoolAttr (attrName: string): boolean {
		return BaserElement.getBoolAttr(this.el, attrName);
	}

	/**
	 * オプションとdata属性の値、属性の値をマージする
	 *
	 * use: jQuery
	 *
	 * TODO: テストを書く
	 * TODO: サブクラスに反映させる
	 *
	 * @version 0.9.1
	 * @since 0.8.0
	 *
	 */
	public mergeOptions (defaultOptions: any, options: any): any {
		const attrs: { [option: string ]: any } = {};
		const dataAttrs: { [option: string ]: any } = {};

		for (const optName in defaultOptions) {
			if (defaultOptions.hasOwnProperty(optName)) {
				// 属性はidとclassは除外する
				switch (optName) {
					case 'id':
					case 'class':
					break;
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

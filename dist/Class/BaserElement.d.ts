import EventDispacher = require('./EventDispacher');
import ElementClassNameCase = require('../Enum/ElementClassNameCase');
import ClassNameSeparatorForBEM = require('../Enum/ClassNameSeparatorForBEM');
import IElement = require('../Interface/IElement');
/**
 * DOM要素の抽象クラス
 *
 * @version 0.3.0
 * @since 0.0.1
 *
 */
declare class BaserElement extends EventDispacher implements IElement {
    /**
     * クラス名のデフォルトのプレフィックス
     *
     * @version 0.1.0
     * @since 0.1.0
     *
     */
    static classNameDefaultPrefix: string;
    /**
     * インスタンスに付加するデフォルトのクラス名
     *
     * @version 0.1.0
     * @since 0.1.0
     *
     */
    static classNameElementCommon: string;
    /**
     * クラス名のデフォルトの単語繋ぎの形式
     *
     * @version 0.1.0
     * @since 0.1.0
     *
     */
    static classNameDefaultCase: ElementClassNameCase;
    /**
     * BEMのエレメントのクラス名の繋ぎ文字
     *
     * @version 0.1.0
     * @since 0.1.0
     *
     */
    static classNameDefaultSeparatorForElement: ClassNameSeparatorForBEM;
    /**
     * BEMのモディファイアのクラス名の繋ぎ文字
     *
     * @version 0.1.0
     * @since 0.1.0
     *
     */
    static classNameDefaultSeparatorForModifier: ClassNameSeparatorForBEM;
    /**
     * 管理するDOM要素のjQueryオブジェクト
     *
     * @since 0.0.1
     *
     */
    $el: JQuery;
    /**
     * 管理するDOM要素のid属性値
     *
     * @since 0.0.1
     *
     */
    id: string;
    /**
     * 管理するDOM要素のname属性値
     *
     * @since 0.0.1
     *
     */
    name: string;
    /**
     * baserJSのエレメント化してたかどうか
     */
    protected _elementized: boolean;
    /**
     * クラス名文字列を生成する
     *
     * @version 0.1.0
     * @since 0.1.0
     *
     */
    static createClassName(blockNames: string, elementNames?: string, modifierName?: string): string;
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
    static getBoolAttr($elem: JQuery, attrName: string): boolean;
    /**
     * クラス名を付加する
     *
     * @version 0.1.0
     * @since 0.1.0
     *
     */
    static addClassTo($elem: JQuery, blockNames: string, elementNames?: string, modifierName?: string): void;
    /**
     * クラス名を取り除く
     *
     * @version 0.1.0
     * @since 0.1.0
     *
     */
    static removeClassFrom($elem: JQuery, blockNames: string, elementNames?: string, modifierName?: string): void;
    /**
     * CSSプロパティをDOM要素から取り除く
     *
     * @version 0.2.2
     * @since 0.2.2
     *
     */
    static removeCSSPropertyFromDOMElement(propertyName: string, elem: HTMLElement): void;
    /**
     * CSSプロパティを取り除く
     *
     * @version 0.2.2
     * @since 0.2.2
     *
     */
    static removeCSSProperty(propertyName: string, $elem: JQuery): void;
    /**
     * コンストラクタ
     *
     * @version 0.8.1
     * @since 0.0.1
     * @param $el 管理するDOM要素のjQueryオブジェクト
     *
     */
    constructor($el: JQuery);
    /**
     * クラス名を付加する
     *
     * @version 0.1.0
     * @since 0.1.0
     *
     */
    addClass(blockNames: string, elementNames?: string, modifierName?: string): void;
    /**
     * 要素の属性の真偽を判定する
     *
     * `BaserElement.getBoolAttr` のインスタンスメソッド版
     *
     * @version 0.2.0
     * @since 0.2.0
     *
     */
    getBoolAttr(attrName: string): boolean;
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
    mergeOptions(defaultOptions: any, options: any): any;
}
export = BaserElement;

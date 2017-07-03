import 'intersection-observer';
import EventDispatcher from './EventDispatcher';
export interface BaserElementAttributes {
    hidden: boolean;
    disabled: boolean;
    [attrName: string]: any;
}
/**
 * DOM要素の抽象クラス
 *
 * @version 1.0.0
 * @since 0.0.1
 *
 */
export default class BaserElement<E extends Element = Element, C = {}> extends EventDispatcher {
    /**
     * 管理するDOM要素のid属性値
     *
     * @version 0.0.1
     * @since 0.0.1
     *
     */
    id: string;
    /**
     * data-{*}-state属性のキー
     */
    protected stateKeyName: string;
    /**
     *
     */
    protected _config: C;
    /**
     *
     */
    private _options;
    /**
     *
     */
    private _isInViewport;
    /**
     *
     */
    private _hasBeenInViewportOneTime;
    /**
     *
     */
    private _inViewportResolver;
    /**
     * コンストラクタ
     *
     * @version 1.0.0
     * @since 0.0.1
     * @param el 管理するDOM要素
     *
     */
    constructor(el: E, options?: {
        [P in keyof C]?: C[P];
    });
    /**
     * 管理するDOM要素
     *
     * @readonly
     */
    readonly el: E;
    /**
     * クラス名を付加する
     *
     * @version 1.0.0
     * @since 0.1.0
     *
     */
    addClass(className: string): this;
    /**
     * クラス名を付加する
     *
     * @version 1.0.0
     * @since 0.1.0
     *
     */
    removeClass(className: string): this;
    /**
     * 要素の属性の真偽を判定する
     *
     * DOM APIの標準で判定できるものはそれで判断
     * 値なし属性の場合は存在すれば真
     * 値あり属性の場合は偽相等の文字列でなければ全て真とする
     * ただし値なし属性の場合は値が空文字列のため、偽相等の文字列の例外とする
     *
     * @version 1.0.0
     * @since 0.2.0
     * @param elem 対象のDOM要素
     * @param attrName 確認したい属性名
     * @return 結果
     *
     */
    getBoolAttr(attrName: string): boolean;
    /**
     * プロパティの値を取得する
     *
     * 1. DOMインターフェイスの属性値
     * 2. HTMLのタグに記述された属性値
     * 3. data-*属性値
     * 4. オプションに渡されたオブジェクト内の値
     *
     * 上記の優先順位で有効な値が返る
     *
     * ⚠️ DOMインターフェイスの属性値は大文字小文字を区別するため注意が必要
     *
     * data-*属性の場合次の2通りの取得方法があります。
     *
     * 1. `baserElement.pullProp("data-foo-bar");`
     * 2. `baserElement.pullProp("fooBar");`
     *
     * オプションに渡されたオブジェクト内の値が、
     * ハッシュマップだった場合は`Object.assign`を利用して
     * 2階層目までマージされます。
     *
     * @version 1.0.0
     * @since 1.0.0
     *
     */
    pullProp<P extends keyof BaserElementAttributes>(propName: P, ...options: {
        [x: string]: any;
    }[]): BaserElementAttributes[P];
    /**
     * プロパティをマージしたデータを返す
     *
     * @version 1.0.0
     * @since 1.0.0
     */
    merge<T extends {
        [P in keyof BaserElementAttributes]?: BaserElementAttributes[P];
    }, U extends {
        [P in keyof T]?: T[P];
    }>(defaultData: T, optionalData: U): T & U;
    /**
     * 子要素をDOMツリーから切り離す
     *
     * 切り離された子要素（厳密には`Node`すべて）は、`DocumentFragment`に移され
     * `WeakMap` に保管される。
     *
     * @version 1.0.0
     * @since 1.0.0
     */
    detachChildren(): this;
    detachedChildrenMap<R>(each: (el: Element) => R): R[];
    detachedChildrenEach(each: (el: Element) => void): this;
    changeState<S extends string>(state: S): this;
    protected _create(defaults?: C): void;
    /**
     * スクロール位置を監視する
     *
     * 引数に`false`を渡すことで監視を回避できる。
     * Promiseのthenメソッドに渡す前提のAPI。
     */
    protected inViewportFirstTime<T>(watch?: boolean): (result?: T | undefined) => Promise<void | T>;
    protected inViewport(isInViewport: boolean): void;
    private _onMount();
}

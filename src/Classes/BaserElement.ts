import EventDispatcher from './EventDispatcher';

import createUID from '../fn/createUID';
import hyphenize from '../fn/hyphenize';
import isDOMValue from '../fn/isDOMValue';
import isFalsy from '../fn/isFalsy';
import parse from '../fn/parse';

const elements: WeakMap<BaserElement<HTMLElement | SVGElement>, Element> = new WeakMap();
const detachedChildren: WeakMap<BaserElement<HTMLElement | SVGElement>, DocumentFragment> = new WeakMap();

/**
 * DOM要素の抽象クラス
 *
 * @version 1.0.0
 * @since 0.0.1
 *
 */
export default class BaserElement<E extends HTMLElement | SVGElement> extends EventDispatcher {

	/**
	 * 管理するDOM要素のid属性値
	 *
	 * @version 0.0.1
	 * @since 0.0.1
	 *
	 */
	public id: string;

	/**
	 * data-{*}-state属性のキー
	 */
	protected stateKeyName = 'baser-element';

	/**
	 * コンストラクタ
	 *
	 * @version 1.0.0
	 * @since 0.0.1
	 * @param el 管理するDOM要素
	 *
	 */
	constructor (el: E) {
		super();

		if (!(el instanceof Element)) {
			throw new TypeError(`A argument is not Element.`);
		}

		// 以下と同等扱いだがthis.elはreadonly
		// this.el = el;
		elements.set(this, el);

		// id属性の抽出 & 生成
		if (el.id) {
			this.id = el.id;
		} else {
			this.id = createUID();
			el.id = this.id;
		}
	}

	/**
	 * 管理するDOM要素
	 *
	 * @readonly
	 * @type E extends Element
	 */
	public get el (): E {
		return elements.get(this)! as E;
	}

	/**
	 * クラス名を付加する
	 *
	 * @version 1.0.0
	 * @since 0.1.0
	 *
	 */
	public addClass (className: string) {
		this.el.classList.add(...className.split(/\s+/g));
		return this;
	}

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
	public getBoolAttr (attrName: string): boolean {
		const value = this.pullProp(attrName);
		return value === '' || !isFalsy(value);
	}

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
	public pullProp<T> (propName: string, ...options: T[]) {
		// 1. DOMインターフェイスの属性値
		const domPropVal = this.el[propName];
		// 2. HTMLのタグに記述された属性値
		const htmlAttrVal = this.el.getAttribute(propName);
		// 2-B. HTMLのタグに記述された属性値（小文字）
		const htmlAttrValLower = this.el.getAttribute(propName.toLowerCase());
		// 2-C. HTMLのタグに記述された属性値（ハイフンケース）
		const htmlAttrValHyphenized = this.el.getAttribute(hyphenize(propName));

		let value;

		// 判定
		if (isDOMValue(domPropVal)) {
			value = parse(domPropVal, false);
		} else if (htmlAttrVal !== null) {
			value = parse(htmlAttrVal);
		} else if (htmlAttrValLower !== null) {
			value = parse(htmlAttrValLower);
		} else if (htmlAttrValHyphenized !== null) {
			value = parse(htmlAttrValHyphenized);
		} else if (this.el instanceof HTMLElement && this.el.dataset) {
			const dataVal = this.el.dataset[propName];
			if (dataVal !== undefined) {
				value = parse(dataVal);
			}
		} else {
			// jsdomはElement::datasetをサポートしない
			const dataVal = this.el.getAttribute('data-' + hyphenize(propName));
			if (dataVal !== null) {
				value = parse(dataVal);
			}
		}
		if (isDOMValue(value)) {
			return value;
		}
		if (Array.isArray(options)) {
			for (const option of options) {
				if (option && option.hasOwnProperty(propName)) {
					const optVal = option[propName];
					if (optVal !== undefined) {
						if (isDOMValue(optVal)) {
							return optVal;
						} else {
							value = Object.assign(optVal, value);
						}
					}
				}
			}
		}
		return value;
	}

	/**
	 * プロパティをマージしたデータを返す
	 *
	 * @version 1.0.0
	 * @since 1.0.0
	 */
	public merge<T, U> (defaultData: T, optionalData: U = {} as U): U & T {
		const result: U & T = {} as U & T;
		const dataKey: (keyof T | keyof U)[] = defaultData ? Object.keys(defaultData) as (keyof T)[] : [];
		const defaultDataKey: (keyof U)[] = optionalData ? Object.keys(optionalData) as (keyof U)[] : [];
		const keys: (keyof T | keyof U)[] = dataKey.concat(defaultDataKey).filter((k, i, self) => self.indexOf(k) === i);
		for (const key of keys) {
			result[key] = this.pullProp<T | U>(key, optionalData, defaultData);
		}
		return result as U & T;
	}

	/**
	 * 子要素をDOMツリーから切り離す
	 *
	 * 切り離された子要素（厳密には`Node`すべて）は、`DocumentFragment`に移され
	 * `WeakMap` に保管される。
	 *
	 * @version 1.0.0
	 * @since 1.0.0
	 */
	public detachChildren () {
		const children = this.el.childNodes;
		const container = document.createDocumentFragment();
		detachedChildren.set(this, container);
		for (const child of Array.from(children)) {
			container.appendChild(child);
		}
		return this;
	}

	public detachedChildrenMap<R> (each: (el: Element) => R) {
		const map: R[] = [];
		for (const el of Array.from(detachedChildren.get(this)!.children)) {
			map.push(each.apply(this, [el]));
		}
		return map;
	}

	public detachedChildrenEach (each: (el: Element) => void) {
		this.detachedChildrenMap<void>(each);
		return this;
	}

	public changeState<S extends string> (state: S) {
		this.el.setAttribute(`data-${this.stateKeyName}-state`, state);
		return this;
	}

}

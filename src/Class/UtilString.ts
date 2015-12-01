/**
 * ユーティリティ文字列クラス
 *
 * @version 0.9.0
 * @since 0.0.2
 *
 */
class UtilString {

	/**
	 * ユニークIDを発行する
	 *
	 * @version 0.9.0
	 * @since 0.0.1
	 * @param prefix 接頭辞
	 * @return ユニークID
	 *
	 */
	public static UID (prefix: string = 'uid'): string {
		const random: number = Math.random() * 1e8;
		const seed = new Date().valueOf();
		const uniqueNumber: number = Math.abs(Math.floor(random + seed));
		if (prefix) {
			prefix += '-';
		}
		return `${prefix}${uniqueNumber.toString(24)}`;
	}

	/**
	 * ハイフンチェインケース化
	 *
	 * @version 0.9.0
	 * @since 0.1.0
	 * @param str 対象の文字列
	 * @return ハイフンチェインケース化された文字列
	 *
	 */
	public static hyphenDelimited (str: string): string {
		const result: string[] = [];
		const words: string[] = str.replace(/[A-Z]/g, ($1: string): string => {
			return ` ${$1.toLowerCase()}`;
		}).split(/[^a-z0-9]+/ig);
		for (let word of words) {
			if (word) {
				result.push(word.toLowerCase());
			}
		}
		return result.join('-');
	}

	/**
	 * スネークケース化
	 *
	 * @version 0.1.0
	 * @since 0.1.0
	 * @param str 対象の文字列
	 * @return スネークケース化された文字列
	 *
	 */
	public static snakeCase (str: string): string {
		return UtilString.hyphenDelimited(str).replace(/-/g, '_');
	}

	/**
	 * キャメルケース化
	 *
	 * @version 0.9.0
	 * @since 0.1.0
	 * @param str 対象の文字列
	 * @param upperCase 頭文字を大文字にするかどうか
	 * @return キャメルケース化された文字列
	 *
	 */
	public static camelCase (str: string, upperCase: boolean = false): string {
		let result: string = UtilString.hyphenDelimited(str);
		if (upperCase && /^[a-z]/.test(result)) {
			result = `-${result}`;
		}
		return result.replace(/-([a-z])/g, ($1: string, $2: string): string => {
			return $2.toUpperCase();
		});
	}

	/**
	 * 文字列が論理値の偽相等であるかどうか
	 *
	 * @version 0.9.0
	 * @since 0.2.0
	 * @param str 対象の文字列
	 * @return 文字列が論理値の偽相等であるかどうか
	 *
	 */
	public static isFalsy (str: string): boolean {
		const FALSY_PATTERN: RegExp = /^\s*(?:false|null|undefined|0|0?(?:\.0+)?)?\s*$/i;
		return FALSY_PATTERN.test(str.toLowerCase());
	}

	/**
	 * 最初に登場する指定の区切り文字の場所で文字列を一回だけ分割する
	 *
	 * TODO: テストを書く
	 *
	 * @version 0.9.0
	 * @since 0.7.0
	 * @param str 対象の文字列
	 * @param separator 区切り文字
	 * @return 分割した文字列
	 *
	 */
	public static divide (str: string, separator: string): string[] {
		const splited: string[] = str.split(separator);
		let prefix: string;
		let suffix: string;
		if (splited) {
			prefix = splited.shift();
			if (splited.length) {
				suffix = splited.join(separator);
			}
		}
		return [prefix, suffix];
	}

}

export = UtilString;

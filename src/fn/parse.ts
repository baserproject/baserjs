/**
 * 文字列をJavaScriptで利用できる値に変換する
 *
 * @version 1.0.0
 * @since 1.0.0
 * @param str 対象の文字列
 * @param parseQuery クエリー文字列をパースするかどうか
 * @return JavaScriptで利用できる値
 *
 */
export default function parse (str: string) {
	if (/^\s*$/.test(str)) {
		return str;
	}
	try {
		const json = JSON.parse(str);
		if (typeof json === 'string') {
			return str;
		} else {
			return json;
		}
	} catch (e) {
		try {
			if (`${str}`.replace(/Infinity|NaN|undefined|0[xX][0-9a-fA-Z]+/, '').match(/[a-z]/i)) {
				throw void 0;
			}
			const evaluatedVal = eval(`${str}`.replace(/\(([^\(]*)\)/g, '$1')); // tslint:disable-line no-eval
			return evaluatedVal;
		} catch (e2) {
			return str;
		}
	}
}

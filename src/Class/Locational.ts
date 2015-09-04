import UtilString = require('./UtilString');

/**
 * URLの情報を管理するクラス
 *
 * @version 0.7.0
 * @since 0.7.0
 *
 */
class Locational {

	/**
	 * クエリー文字列をハッシュにして返す
	 *
	 * @version 0.9.0
	 * @since 0.7.0
	 * @param queryString クエリー文字列
	 * @return ハッシュデータ
	 *
	 */
	static parseQueryString (queryString: string): { [index: string]: string | string[] } {
		let params: { [index: string]: string | string[] } = {};
		if (queryString) {
			let queries: string[] = queryString.split(/&/g);
			$.each<string>(queries, (i: number, query: string): void => {
				let keyValue: string[] = UtilString.divide(query, '=');
				let key: string = keyValue[0];
				let value: string = keyValue[1];
				if (key) {
					if (/\[\]$/.test(key)) {
						key = key.replace(/\[\]$/, '');
						let child: string | string[] = params[key];
						if (child && child instanceof Array) {
							child.push(value);
							params[key] = child;
						} else {
							params[key] = [value];
						}
					} else {
						params[key] = value;
					}
				}
			});
		}
		return <{ [index: string]: string[] | string }> params;
	}


	/**
	 * #hash
	 */
	public hash: string;

	/**
	 * ex) www.sample.com:80
	 */
	public host: string;

	/**
	 * ex) www.sample.com
	 */
	public hostname: string;

	/**
	 * ex) http://www.sample.com:80/path/dir/file.ext?key=value&key2=value#hash
	 */
	public href: string;

	/**
	 * ex) http://www.sample.com:80
	 */
	public origin: string;

	/**
	 * ex) /path/dir/file.ext?key=value&key2=value#hash
	 */
	public path: string;

	/**
	 * /path/dir/file.ext
	 */
	public pathname: string;

	/**
	 * ex) 80
	 */
	public port: string;

	/**
	 * ex) http:
	 */
	public protocol: string;

	/**
	 * ?key=value&key2=value
	 */
	public search: string;

	/**
	 * ex) key=value&key2=value
	 */
	public query: string;

	/**
	 * ex) { "key": "value", "key2": "value" }
	 */
	public params: { [ index: string ]: string | string[] };

	/**
	 * コンストラクタ
	 *
	 * @version 0.7.0
	 * @since 0.7.0
	 *
	 */
	constructor (originalLocation: Location | HTMLAnchorElement | HTMLAreaElement) {
		// ex) http:
		this.protocol = originalLocation.protocol;

		// ex) www.sample.com:80
		this.host = originalLocation.host;

		// ex) www.sample.com
		this.hostname = originalLocation.hostname;

		// ex) 80
		this.port = originalLocation.port;

		// /path/dir/file.ext
		this.pathname = originalLocation.pathname;

		// ?key=value&key2=value
		this.search = originalLocation.search;

		// #hash
		this.hash = originalLocation.hash;

		this.update();
	}

	public update (): Locational {
		// ex) http://www.sample.com:80
		this.origin = this.protocol + '//' + this.host;

		// ex) /path/dir/file.ext?key=value&key2=value#hash
		this.path = this.pathname + this.search + this.hash;

		// ex) http://www.sample.com:80/path/dir/file.ext?key=value&key2=value#hash
		this.href = this.origin + this.path;

		// ex) key=value&key2=value
		this.query = this.search.replace(/^\?/, '');

		// ex) { "key": "value", "key2": "value" }
		this.params = Locational.parseQueryString(this.query);

		return this;
	}

	public addParam (key: string, value?: string | string[]): Locational {
		var eqAndValue: string = '';
		if (typeof value === 'string' || !value) {
			if (value !== undefined) {
				eqAndValue = '=' + value;
			}
			if (this.search) {
				this.search += '&' + key + eqAndValue;
			} else {
				this.search = '?' + key + eqAndValue;
			}
		} else {
			$.each<string>(value, (i: number, val: string): any => {
				if (val !== undefined) {
					eqAndValue = '=' + val;
				}
				if (this.search) {
					this.search += '&' + key + '[]' + eqAndValue;
				} else {
					this.search = '?' + key + '[]' + eqAndValue;
				}
			});
		}
		this.update();

		return this;
	}

	public removeParam (key: string): Locational {
		this.search = this.search.replace(new RegExp(key + '(?:\\[\\])?(?:=[^&]*)?(&|$)', 'g'), '');
		this.update();

		return this;
	}

	public toString (): string {
		this.update();
		return this.href;
	}

}

export = Locational;

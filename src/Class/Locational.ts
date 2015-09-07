import UtilString = require('./UtilString');

/**
 * URLの情報を管理するクラス
 *
 * @version 0.9.0
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
			for (let query of queries) {
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
			}
		}
		return <{ [index: string]: string[] | string }> params;
	}


	/**
	 * #hash
	 *
	 * @version 0.7.0
	 * @since 0.7.0
	 * 
	 */
	public hash: string;

	/**
	 * ex) www.sample.com:80
	 *
	 * @version 0.7.0
	 * @since 0.7.0
	 * 
	 */
	public host: string;

	/**
	 * ex) www.sample.com
	 *
	 * @version 0.7.0
	 * @since 0.7.0
	 * 
	 */
	public hostname: string;

	/**
	 * ex) http://www.sample.com:80/path/dir/file.ext?key=value&key2=value#hash
	 *
	 * @version 0.7.0
	 * @since 0.7.0
	 * 
	 */
	public href: string;

	/**
	 * ex) http://www.sample.com:80
	 *
	 * @version 0.7.0
	 * @since 0.7.0
	 * 
	 */
	public origin: string;

	/**
	 * ex) /path/dir/file.ext?key=value&key2=value#hash
	 *
	 * @version 0.7.0
	 * @since 0.7.0
	 * 
	 */
	public path: string;

	/**
	 * /path/dir/file.ext
	 *
	 * @version 0.7.0
	 * @since 0.7.0
	 * 
	 */
	public pathname: string;

	/**
	 * ex) 80
	 *
	 * @version 0.7.0
	 * @since 0.7.0
	 * 
	 */
	public port: string;

	/**
	 * ex) http:
	 *
	 * @version 0.7.0
	 * @since 0.7.0
	 * 
	 */
	public protocol: string;

	/**
	 * ?key=value&key2=value
	 *
	 * @version 0.7.0
	 * @since 0.7.0
	 * 
	 */
	public search: string;

	/**
	 * ex) key=value&key2=value
	 *
	 * @version 0.7.0
	 * @since 0.7.0
	 * 
	 */
	public query: string;

	/**
	 * ex) { "key": "value", "key2": "value" }
	 *
	 * @version 0.7.0
	 * @since 0.7.0
	 * 
	 */
	public params: { [ index: string ]: string | string[] };

	/**
	 * コンストラクタ
	 *
	 * @version 0.7.0
	 * @since 0.7.0
	 * @param originalLocation 元となるロケーションオブジェクト
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

	/**
	 * プロパティを最適化する
	 *
	 * @version 0.9.0
	 * @since 0.7.0
	 * @return インスタンス自身
	 * 
	 */
	public update (): Locational {
		// ex) http://www.sample.com:80
		this.origin = `${this.protocol}//${this.host}`;

		// ex) /path/dir/file.ext?key=value&key2=value#hash
		this.path = `${this.pathname}${this.search}${this.hash}`;

		// ex) http://www.sample.com:80/path/dir/file.ext?key=value&key2=value#hash
		this.href = `${this.origin}${this.path}`;

		// ex) key=value&key2=value
		this.query = this.search.replace(/^\?/, '');

		// ex) { "key": "value", "key2": "value" }
		this.params = Locational.parseQueryString(this.query);

		return this;
	}

	/**
	 * パラメータを追加する
	 *
	 * @version 0.9.0
	 * @since 0.7.0
	 * @param key パラメータのキー
	 * @param value パラメータの値
	 * @return インスタンス自身
	 * 
	 */
	public addParam (key: string, value?: string | string[]): Locational {
		if (typeof value === 'string' || !value) {
			let eqAndValue: string = '';
			if (value !== undefined) {
				 eqAndValue = `=${value}`;
			}
			if (this.search) {
				this.search += `&${key}${eqAndValue}`;
			} else {
				this.search = `?${key}${eqAndValue}`;
			}
		} else {
			for (let val of value) {
				let eqAndValue: string = '';
				if (val !== undefined) {
					eqAndValue = `=${val}`;
				}
				if (this.search) {
					this.search += `&${key}[]${eqAndValue}`;
				} else {
					this.search = `?${key}[]${eqAndValue}`;
				}
			}
		}
		this.update();

		return this;
	}

	/**
	 * パラメータを削除する
	 *
	 * @version 0.7.0
	 * @since 0.7.0
	 * @param key パラメータのキー
	 * @return インスタンス自身
	 * 
	 */
	public removeParam (key: string): Locational {
		this.search = this.search.replace(new RegExp(key + '(?:\\[\\])?(?:=[^&]*)?(&|$)', 'g'), '');
		this.update();
		return this;
	}

	/**
	 * 暗黙の文字列変換
	 *
	 * @version 0.7.0
	 * @since 0.7.0
	 * @return 変換された文字列
	 * 
	 */
	public toString (): string {
		this.update();
		return this.href;
	}

}

export = Locational;

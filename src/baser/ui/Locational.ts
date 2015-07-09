module baser {

	export module ui {
		
		export interface queryHash {
			[key: string]: queryHash | string | string[];
		}

		/**
		 * URLの情報を管理するクラス
		 *
		 * @version 0.7.0
		 * @since 0.7.0
		 *
		 */
		export class Locational {

			/**
			 * クエリーストリングをハッシュにして返す
			 *
			 * @version 0.7.0
			 * @since 0.7.0
			 *
			 */
			static parseQueryString (queryString: string): { [index: string]: string | string[] } {
				var params: any = {};
				var queries: string[];
				if (queryString) {
					queries = queryString.split(/&/g);
					$.each(queries, function (i: number, query: string) {
						var keyValue: string[] = utility.String.divide(query, '=');
						var key: string = keyValue[0];
						var value: string = keyValue[1];
						if (key) {
							if (/\[\]$/.test(key)) {
								key = key.replace(/\[\]$/, '');
								if (params[key] && params[key].push) {
									params[key].push(value);
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

	}

}

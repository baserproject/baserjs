/**
 * URLの情報を管理するクラス
 *
 * @version 0.7.0
 * @since 0.7.0
 *
 */
declare class Locational {
    /**
     * クエリーストリングをハッシュにして返す
     *
     * @version 0.7.0
     * @since 0.7.0
     *
     */
    static parseQueryString(queryString: string): {
        [index: string]: string | string[];
    };
    /**
     * #hash
     */
    hash: string;
    /**
     * ex) www.sample.com:80
     */
    host: string;
    /**
     * ex) www.sample.com
     */
    hostname: string;
    /**
     * ex) http://www.sample.com:80/path/dir/file.ext?key=value&key2=value#hash
     */
    href: string;
    /**
     * ex) http://www.sample.com:80
     */
    origin: string;
    /**
     * ex) /path/dir/file.ext?key=value&key2=value#hash
     */
    path: string;
    /**
     * /path/dir/file.ext
     */
    pathname: string;
    /**
     * ex) 80
     */
    port: string;
    /**
     * ex) http:
     */
    protocol: string;
    /**
     * ?key=value&key2=value
     */
    search: string;
    /**
     * ex) key=value&key2=value
     */
    query: string;
    /**
     * ex) { "key": "value", "key2": "value" }
     */
    params: {
        [index: string]: string | string[];
    };
    /**
     * コンストラクタ
     *
     * @version 0.7.0
     * @since 0.7.0
     *
     */
    constructor(originalLocation: Location | HTMLAnchorElement | HTMLAreaElement);
    update(): Locational;
    addParam(key: string, value?: string | string[]): Locational;
    removeParam(key: string): Locational;
    toString(): string;
}
export = Locational;

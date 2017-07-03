"use strict";
var UtilString = require('./UtilString');
/**
 * URLの情報を管理するクラス
 *
 * @version 0.9.0
 * @since 0.7.0
 *
 */
var Locational = (function () {
    /**
     * コンストラクタ
     *
     * @version 0.7.0
     * @since 0.7.0
     * @param originalLocation 元となるロケーションオブジェクト
     *
     */
    function Locational(originalLocation) {
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
     * クエリー文字列をハッシュにして返す
     *
     * @version 0.10.0
     * @since 0.7.0
     * @param queryString クエリー文字列
     * @return ハッシュデータ
     *
     */
    Locational.parseQueryString = function (queryString) {
        var params = {};
        if (queryString) {
            var queries = queryString.split(/&/g);
            for (var _i = 0, queries_1 = queries; _i < queries_1.length; _i++) {
                var query = queries_1[_i];
                var keyValue = UtilString.divide(query, '=');
                var key = keyValue[0];
                var value = keyValue[1];
                if (key) {
                    if (/\[\]$/.test(key)) {
                        key = key.replace(/\[\]$/, '');
                        var child = params[key];
                        if (child && child instanceof Array) {
                            child.push(value);
                            params[key] = child;
                        }
                        else {
                            params[key] = [value];
                        }
                    }
                    else {
                        params[key] = value;
                    }
                }
            }
        }
        return params;
    };
    /**
     * プロパティを最適化する
     *
     * @version 0.9.0
     * @since 0.7.0
     * @return インスタンス自身
     *
     */
    Locational.prototype.update = function () {
        // ex) http://www.sample.com:80
        this.origin = this.protocol + "//" + this.host;
        // ex) /path/dir/file.ext?key=value&key2=value#hash
        this.path = "" + this.pathname + this.search + this.hash;
        // ex) http://www.sample.com:80/path/dir/file.ext?key=value&key2=value#hash
        this.href = "" + this.origin + this.path;
        // ex) key=value&key2=value
        this.query = this.search.replace(/^\?/, '');
        // ex) { "key": "value", "key2": "value" }
        this.params = Locational.parseQueryString(this.query);
        return this;
    };
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
    Locational.prototype.addParam = function (key, value) {
        if (typeof value === 'string' || !value) {
            var eqAndValue = '';
            if (value !== undefined) {
                eqAndValue = "=" + value;
            }
            if (this.search) {
                this.search += "&" + key + eqAndValue;
            }
            else {
                this.search = "?" + key + eqAndValue;
            }
        }
        else {
            for (var _i = 0, value_1 = value; _i < value_1.length; _i++) {
                var val = value_1[_i];
                var eqAndValue = '';
                if (val !== undefined) {
                    eqAndValue = "=" + val;
                }
                if (this.search) {
                    this.search += "&" + key + "[]" + eqAndValue;
                }
                else {
                    this.search = "?" + key + "[]" + eqAndValue;
                }
            }
        }
        this.update();
        return this;
    };
    /**
     * パラメータを削除する
     *
     * @version 0.7.0
     * @since 0.7.0
     * @param key パラメータのキー
     * @return インスタンス自身
     *
     */
    Locational.prototype.removeParam = function (key) {
        this.search = this.search.replace(new RegExp(key + '(?:\\[\\])?(?:=[^&]*)?(&|$)', 'g'), '');
        this.update();
        return this;
    };
    /**
     * 暗黙の文字列変換
     *
     * @version 0.7.0
     * @since 0.7.0
     * @return 変換された文字列
     *
     */
    Locational.prototype.toString = function () {
        this.update();
        return this.href;
    };
    return Locational;
}());
module.exports = Locational;

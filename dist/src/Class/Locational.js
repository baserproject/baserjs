var UtilString = require('./UtilString');
/**
 * URLの情報を管理するクラス
 *
 * @version 0.7.0
 * @since 0.7.0
 *
 */
var Locational = (function () {
    /**
     * コンストラクタ
     *
     * @version 0.7.0
     * @since 0.7.0
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
     * @version 0.9.0
     * @since 0.7.0
     * @param queryString クエリー文字列
     * @return ハッシュデータ
     *
     */
    Locational.parseQueryString = function (queryString) {
        var params = {};
        if (queryString) {
            var queries = queryString.split(/&/g);
            $.each(queries, function (i, query) {
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
            });
        }
        return params;
    };
    Locational.prototype.update = function () {
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
    };
    Locational.prototype.addParam = function (key, value) {
        var _this = this;
        var eqAndValue = '';
        if (typeof value === 'string' || !value) {
            if (value !== undefined) {
                eqAndValue = '=' + value;
            }
            if (this.search) {
                this.search += '&' + key + eqAndValue;
            }
            else {
                this.search = '?' + key + eqAndValue;
            }
        }
        else {
            $.each(value, function (i, val) {
                if (val !== undefined) {
                    eqAndValue = '=' + val;
                }
                if (_this.search) {
                    _this.search += '&' + key + '[]' + eqAndValue;
                }
                else {
                    _this.search = '?' + key + '[]' + eqAndValue;
                }
            });
        }
        this.update();
        return this;
    };
    Locational.prototype.removeParam = function (key) {
        this.search = this.search.replace(new RegExp(key + '(?:\\[\\])?(?:=[^&]*)?(&|$)', 'g'), '');
        this.update();
        return this;
    };
    Locational.prototype.toString = function () {
        this.update();
        return this.href;
    };
    return Locational;
})();
module.exports = Locational;

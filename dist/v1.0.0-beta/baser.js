/**!
* baserjs - v1.0.0-beta
* revision: e27cc7c8d3de1d643f9ce2c21497d269ecfeaa20
* update: 2017-06-02
* Author: baserCMS Users Community [https://github.com/baserproject/]
* Github: https://github.com/baserproject/baserjs
* License: Licensed under the MIT License
*/
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 14);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(21);
var EventDispatcher_1 = __webpack_require__(8);
var createUID_1 = __webpack_require__(1);
var hyphenize_1 = __webpack_require__(16);
var isDOMValue_1 = __webpack_require__(17);
var isFalsy_1 = __webpack_require__(18);
var parse_1 = __webpack_require__(2);
var elements = new WeakMap();
var detachedChildren = new WeakMap();
var inViewportElementMap = new WeakMap();
var inViewportChangeMethodMap = new WeakMap();
var masterIntersection;
/**
 * DOM要素の抽象クラス
 *
 * @version 1.0.0
 * @since 0.0.1
 *
 */
var BaserElement = (function (_super) {
    __extends(BaserElement, _super);
    /**
     * コンストラクタ
     *
     * @version 1.0.0
     * @since 0.0.1
     * @param el 管理するDOM要素
     *
     */
    function BaserElement(el, options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this) || this;
        /**
         * data-{*}-state属性のキー
         */
        _this.stateKeyName = 'baser-element';
        /**
         *
         */
        _this._hasBeenInViewportOneTime = false;
        if (!(el instanceof Element)) {
            throw new TypeError("A argument is not Element.");
        }
        // 以下と同等扱いだがthis.elはreadonly
        // this.el = el;
        elements.set(_this, el);
        // id属性の抽出 & 生成
        if (el.id) {
            _this.id = el.id;
        }
        else {
            _this.id = createUID_1.default();
            el.id = _this.id;
        }
        _this._options = options;
        _this._create();
        if (window.document.contains(el)) {
            _this._onMount();
        }
        else if ('MutationObserver' in window) {
            var mo = new MutationObserver(function () { return _this._onMount(); });
            mo.observe(_this.el, { attributes: true });
        }
        return _this;
    }
    Object.defineProperty(BaserElement.prototype, "el", {
        /**
         * 管理するDOM要素
         *
         * @readonly
         */
        get: function () {
            return elements.get(this);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * クラス名を付加する
     *
     * @version 1.0.0
     * @since 0.1.0
     *
     */
    BaserElement.prototype.addClass = function (className) {
        (_a = this.el.classList).add.apply(_a, className.split(/\s+/g));
        return this;
        var _a;
    };
    /**
     * クラス名を付加する
     *
     * @version 1.0.0
     * @since 0.1.0
     *
     */
    BaserElement.prototype.removeClass = function (className) {
        (_a = this.el.classList).remove.apply(_a, className.split(/\s+/g));
        return this;
        var _a;
    };
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
    BaserElement.prototype.getBoolAttr = function (attrName) {
        var value = this.pullProp(attrName);
        return value === '' || !isFalsy_1.default(value);
    };
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
    // tslint:disable-next-line:no-any
    BaserElement.prototype.pullProp = function (propName) {
        var options = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            options[_i - 1] = arguments[_i];
        }
        var el = this.el;
        // 1. DOMインターフェイスの属性値
        if (propName in el) {
            // tslint:disable-next-line:no-any
            return el[propName];
        }
        // 2. HTMLのタグに記述された属性値
        var htmlAttrVal = el.getAttribute(propName);
        // 2-B. HTMLのタグに記述された属性値（小文字）
        var htmlAttrValLower = el.getAttribute(propName.toLowerCase());
        // 2-C. HTMLのタグに記述された属性値（ハイフンケース）
        var htmlAttrValHyphenized = el.getAttribute(hyphenize_1.default(propName));
        var value;
        // 判定
        if (htmlAttrVal !== null) {
            value = parse_1.default(htmlAttrVal);
        }
        else if (htmlAttrValLower !== null) {
            value = parse_1.default(htmlAttrValLower);
        }
        else if (htmlAttrValHyphenized !== null) {
            value = parse_1.default(htmlAttrValHyphenized);
        }
        else if (el instanceof HTMLElement && el.dataset) {
            var dataVal = el.dataset[propName];
            if (dataVal !== undefined) {
                value = parse_1.default(dataVal);
            }
        }
        else {
            // jsdomはElement::datasetをサポートしない
            var dataVal = el.getAttribute("data-" + hyphenize_1.default(propName));
            if (dataVal !== null) {
                value = parse_1.default(dataVal);
            }
        }
        if (isDOMValue_1.default(value)) {
            return value;
        }
        if (Array.isArray(options)) {
            for (var _a = 0, options_1 = options; _a < options_1.length; _a++) {
                var option = options_1[_a];
                if (option && option.hasOwnProperty(propName)) {
                    var optVal = option[propName];
                    if (optVal !== undefined) {
                        if (isDOMValue_1.default(optVal)) {
                            return optVal;
                        }
                        else {
                            value = Object.assign(optVal, value);
                        }
                    }
                }
            }
        }
        return value;
    };
    /**
     * プロパティをマージしたデータを返す
     *
     * @version 1.0.0
     * @since 1.0.0
     */
    BaserElement.prototype.merge = function (defaultData, optionalData) {
        var map = Object.assign({}, optionalData, defaultData);
        for (var key in map) {
            if (map.hasOwnProperty(key)) {
                map[key] = this.pullProp(key, optionalData, defaultData);
            }
        }
        return map;
    };
    /**
     * 子要素をDOMツリーから切り離す
     *
     * 切り離された子要素（厳密には`Node`すべて）は、`DocumentFragment`に移され
     * `WeakMap` に保管される。
     *
     * @version 1.0.0
     * @since 1.0.0
     */
    BaserElement.prototype.detachChildren = function () {
        var children = this.el.childNodes;
        var container = document.createDocumentFragment();
        detachedChildren.set(this, container);
        for (var _i = 0, _a = Array.from(children); _i < _a.length; _i++) {
            var child = _a[_i];
            container.appendChild(child);
        }
        return this;
    };
    BaserElement.prototype.detachedChildrenMap = function (each) {
        var map = [];
        for (var _i = 0, _a = Array.from(detachedChildren.get(this).children); _i < _a.length; _i++) {
            var el = _a[_i];
            map.push(each.apply(this, [el]));
        }
        return map;
    };
    BaserElement.prototype.detachedChildrenEach = function (each) {
        this.detachedChildrenMap(each);
        return this;
    };
    BaserElement.prototype.changeState = function (state) {
        this.el.setAttribute("data-" + this.stateKeyName + "-state", state);
        return this;
    };
    BaserElement.prototype._create = function (defaults) {
        // tslint:disable-next-line:no-object-literal-type-assertion
        this._config = defaults ? this.merge(defaults, this._options) : {};
    };
    /**
     * スクロール位置を監視する
     *
     * 引数に`false`を渡すことで監視を回避できる。
     * Promiseのthenメソッドに渡す前提のAPI。
     */
    BaserElement.prototype.inViewportFirstTime = function (watch) {
        var _this = this;
        if (watch === void 0) { watch = true; }
        return function (result) {
            if (!watch || _this._hasBeenInViewportOneTime) {
                return Promise.resolve(result);
            }
            return new Promise(function (resolve) {
                _this._inViewportResolver = function () {
                    resolve(result);
                };
            });
        };
    };
    BaserElement.prototype.inViewport = function (isInViewport) {
        if (this._isInViewport !== isInViewport) {
            this._isInViewport = isInViewport;
            this.el.setAttribute("data-" + this.stateKeyName + "-inview", "" + isInViewport);
            if (!this._hasBeenInViewportOneTime) {
                this._hasBeenInViewportOneTime = true;
            }
            if (this._inViewportResolver) {
                this._inViewportResolver();
            }
        }
    };
    BaserElement.prototype._onMount = function () {
        inViewportElementMap.set(this.el, this);
        inViewportChangeMethodMap.set(this, this.inViewport.bind(this));
        if ('IntersectionObserver' in window) {
            masterIntersection = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    var bel = inViewportElementMap.get(entry.target);
                    if (!bel) {
                        return;
                    }
                    var changeMethod = inViewportChangeMethodMap.get(bel);
                    if (!changeMethod) {
                        return;
                    }
                    changeMethod(!!entry.intersectionRatio);
                });
            }, {
                threshold: [0, 1],
            });
            masterIntersection.observe(this.el);
        }
    };
    return BaserElement;
}(EventDispatcher_1.default));
exports.default = BaserElement;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * ユニークIDを発行する
 *
 * @version 1.0.0
 * @since 0.0.1
 * @param prefix 接頭辞
 * @return ユニークID
 *
 */
function createUID(prefix) {
    if (prefix === void 0) { prefix = 'uid-'; }
    var random = Math.random() * 1e8;
    var seed = new Date().valueOf();
    var uniqueNumber = Math.abs(Math.floor(random + seed));
    return "" + prefix + uniqueNumber.toString(24);
}
exports.default = createUID;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
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
function parse(str) {
    if (/^\s*$/.test(str)) {
        return str;
    }
    try {
        var json = JSON.parse(str);
        if (typeof json === 'string') {
            return str;
        }
        else {
            return json;
        }
    }
    catch (e) {
        try {
            if (("" + str).replace(/Infinity|NaN|undefined|0[xX][0-9a-fA-Z]+/, '').match(/[a-z]/i)) {
                throw void 0;
            }
            var evaluatedVal = eval(("" + str).replace(/\(([^\(]*)\)/g, '$1')); // tslint:disable-line no-eval
            return evaluatedVal;
        }
        catch (e2) {
            return str;
        }
    }
}
exports.default = parse;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var replace = String.prototype.replace;
var percentTwenties = /%20/g;

module.exports = {
    'default': 'RFC3986',
    formatters: {
        RFC1738: function (value) {
            return replace.call(value, percentTwenties, '+');
        },
        RFC3986: function (value) {
            return value;
        }
    },
    RFC1738: 'RFC1738',
    RFC3986: 'RFC3986'
};


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var has = Object.prototype.hasOwnProperty;

var hexTable = (function () {
    var array = [];
    for (var i = 0; i < 256; ++i) {
        array.push('%' + ((i < 16 ? '0' : '') + i.toString(16)).toUpperCase());
    }

    return array;
}());

exports.arrayToObject = function (source, options) {
    var obj = options && options.plainObjects ? Object.create(null) : {};
    for (var i = 0; i < source.length; ++i) {
        if (typeof source[i] !== 'undefined') {
            obj[i] = source[i];
        }
    }

    return obj;
};

exports.merge = function (target, source, options) {
    if (!source) {
        return target;
    }

    if (typeof source !== 'object') {
        if (Array.isArray(target)) {
            target.push(source);
        } else if (typeof target === 'object') {
            if (options.plainObjects || options.allowPrototypes || !has.call(Object.prototype, source)) {
                target[source] = true;
            }
        } else {
            return [target, source];
        }

        return target;
    }

    if (typeof target !== 'object') {
        return [target].concat(source);
    }

    var mergeTarget = target;
    if (Array.isArray(target) && !Array.isArray(source)) {
        mergeTarget = exports.arrayToObject(target, options);
    }

    if (Array.isArray(target) && Array.isArray(source)) {
        source.forEach(function (item, i) {
            if (has.call(target, i)) {
                if (target[i] && typeof target[i] === 'object') {
                    target[i] = exports.merge(target[i], item, options);
                } else {
                    target.push(item);
                }
            } else {
                target[i] = item;
            }
        });
        return target;
    }

    return Object.keys(source).reduce(function (acc, key) {
        var value = source[key];

        if (Object.prototype.hasOwnProperty.call(acc, key)) {
            acc[key] = exports.merge(acc[key], value, options);
        } else {
            acc[key] = value;
        }
        return acc;
    }, mergeTarget);
};

exports.decode = function (str) {
    try {
        return decodeURIComponent(str.replace(/\+/g, ' '));
    } catch (e) {
        return str;
    }
};

exports.encode = function (str) {
    // This code was originally written by Brian White (mscdex) for the io.js core querystring library.
    // It has been adapted here for stricter adherence to RFC 3986
    if (str.length === 0) {
        return str;
    }

    var string = typeof str === 'string' ? str : String(str);

    var out = '';
    for (var i = 0; i < string.length; ++i) {
        var c = string.charCodeAt(i);

        if (
            c === 0x2D || // -
            c === 0x2E || // .
            c === 0x5F || // _
            c === 0x7E || // ~
            (c >= 0x30 && c <= 0x39) || // 0-9
            (c >= 0x41 && c <= 0x5A) || // a-z
            (c >= 0x61 && c <= 0x7A) // A-Z
        ) {
            out += string.charAt(i);
            continue;
        }

        if (c < 0x80) {
            out = out + hexTable[c];
            continue;
        }

        if (c < 0x800) {
            out = out + (hexTable[0xC0 | (c >> 6)] + hexTable[0x80 | (c & 0x3F)]);
            continue;
        }

        if (c < 0xD800 || c >= 0xE000) {
            out = out + (hexTable[0xE0 | (c >> 12)] + hexTable[0x80 | ((c >> 6) & 0x3F)] + hexTable[0x80 | (c & 0x3F)]);
            continue;
        }

        i += 1;
        c = 0x10000 + (((c & 0x3FF) << 10) | (string.charCodeAt(i) & 0x3FF));
        out += hexTable[0xF0 | (c >> 18)] + hexTable[0x80 | ((c >> 12) & 0x3F)] + hexTable[0x80 | ((c >> 6) & 0x3F)] + hexTable[0x80 | (c & 0x3F)]; // eslint-disable-line max-len
    }

    return out;
};

exports.compact = function (obj, references) {
    if (typeof obj !== 'object' || obj === null) {
        return obj;
    }

    var refs = references || [];
    var lookup = refs.indexOf(obj);
    if (lookup !== -1) {
        return refs[lookup];
    }

    refs.push(obj);

    if (Array.isArray(obj)) {
        var compacted = [];

        for (var i = 0; i < obj.length; ++i) {
            if (obj[i] && typeof obj[i] === 'object') {
                compacted.push(exports.compact(obj[i], refs));
            } else if (typeof obj[i] !== 'undefined') {
                compacted.push(obj[i]);
            }
        }

        return compacted;
    }

    var keys = Object.keys(obj);
    keys.forEach(function (key) {
        obj[key] = exports.compact(obj[key], refs);
    });

    return obj;
};

exports.isRegExp = function (obj) {
    return Object.prototype.toString.call(obj) === '[object RegExp]';
};

exports.isBuffer = function (obj) {
    if (obj === null || typeof obj === 'undefined') {
        return false;
    }

    return !!(obj.constructor && obj.constructor.isBuffer && obj.constructor.isBuffer(obj));
};


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(window, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__(26);
exports.setImmediate = setImmediate;
exports.clearImmediate = clearImmediate;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var BaserElement_1 = __webpack_require__(0);
var GoogleMaps_1 = __webpack_require__(10);
var Sequencer_1 = __webpack_require__(11);
var YouTube_1 = __webpack_require__(13);
exports.BaserElement = BaserElement_1.default;
exports.GoogleMaps = GoogleMaps_1.default;
exports.Sequencer = Sequencer_1.default;
exports.YouTube = YouTube_1.default;
function auto() {
    return new Promise(function (resolve) {
        if (document.readyState !== 'loading') {
            _auto();
            resolve();
            return;
        }
        addEventListener('DOMContentLoaded', function () {
            _auto();
            resolve();
        });
    });
}
exports.auto = auto;
function _auto() {
    var nodesGoogleMaps = document.querySelectorAll('[data-baser="google-maps"]');
    for (var _i = 0, _a = Array.from(nodesGoogleMaps); _i < _a.length; _i++) {
        var node = _a[_i];
        var g = new exports.GoogleMaps(node);
    }
    var nodesYouTube = document.querySelectorAll('[data-baser="youtube"]');
    for (var _b = 0, _c = Array.from(nodesYouTube); _b < _c.length; _b++) {
        var node = _c[_b];
        var g = new exports.YouTube(node);
    }
}


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * イベントオブジェクトのクラス
 *
 * @version 0.9.0
 * @since 0.0.10
 *
 */
var DispatchEvent = (function () {
    /**
     * コンストラクタ
     *
     * @version 0.3.0
     * @since 0.0.10
     *
     */
    function DispatchEvent(type) {
        /**
         * イベントの伝達が止められているかどうか
         *
         * @version 0.0.10
         * @since 0.0.10
         *
         */
        this._isImmediatePropagationStopped = false;
        /**
         * デフォルトのイベントの発火が止められているかどうか
         *
         * @version 0.9.0
         * @since 0.9.0
         *
         */
        this._isDefaultPrevented = false;
        this.type = type;
    }
    /**
     * イベントの伝達を止める
     *
     * @version 0.0.10
     * @since 0.0.10
     *
     */
    DispatchEvent.prototype.stopImmediatePropagation = function () {
        this._isImmediatePropagationStopped = true;
    };
    /**
     * イベントの伝達が止められているかどうか
     *
     * @version 0.0.10
     * @since 0.0.10
     * @return イベントの伝達が止められているかどうか
     *
     */
    DispatchEvent.prototype.isImmediatePropagationStopped = function () {
        return this._isImmediatePropagationStopped;
    };
    /**
     * デフォルトのイベントの発火を止める
     * ※EventDispatcher.triggerでの実装に依る
     *
     * @version 0.9.0
     * @since 0.9.0
     *
     */
    DispatchEvent.prototype.preventDefault = function () {
        this._isDefaultPrevented = true;
    };
    /**
     * デフォルトのイベントの発火が止められているかどうか
     *
     * @version 0.9.0
     * @since 0.9.0
     * @return デフォルトのイベントの発火が止められているかどうか
     *
     */
    DispatchEvent.prototype.isDefaultPrevented = function () {
        return this._isDefaultPrevented;
    };
    return DispatchEvent;
}());
exports.default = DispatchEvent;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var DispatchEvent_1 = __webpack_require__(7);
var EventHandler_1 = __webpack_require__(9);
/**
 * イベントを検知してハンドラを発火させることができるクラス
 *
 * @version 0.9.0
 * @since 0.0.10
 *
 * ```
 * let dispatcher = new EventDispatcher();
 *
 * dispatcher.on('event', (e) -> {
 * 	// handler
 * });
 *
 * dispatcher.trigger('event');
 * ```
 *
 */
var EventDispatcher = (function () {
    /**
     * コンストラクタ
     *
     * @version 0.0.10
     * @since 0.0.10
     *
     */
    function EventDispatcher() {
        // void
    }
    /**
     * イベントハンドラを登録する
     *
     * @version 0.9.0
     * @since 0.0.10
     * @param type イベントのタイプ（複数可）
     * @param handler
     * @return インスタンス自身
     *
     */
    EventDispatcher.prototype.on = function (types, handler) {
        var typeList = typeof types === 'string' ? types.split(/\s+/g) : types;
        for (var _i = 0, typeList_1 = typeList; _i < typeList_1.length; _i++) {
            var type = typeList_1[_i];
            var eventHandler = new EventHandler_1.default(this, type, handler);
            EventDispatcher.eventHandlers[eventHandler.id] = eventHandler;
            if (!EventDispatcher.types[type]) {
                EventDispatcher.types[type] = [];
            }
            EventDispatcher.types[type].push(eventHandler);
        }
        return this;
    };
    /**
     * イベントハンドラを削除する
     *
     * @version 1.0.0
     * @since 0.0.10
     * @param type イベントのタイプ（複数可）
     * @return インスタンス自身
     *
     */
    EventDispatcher.prototype.off = function (types) {
        var typeList = typeof types === 'string' ? types.split(/\s+/g) : types;
        for (var _i = 0, typeList_2 = typeList; _i < typeList_2.length; _i++) {
            var type = typeList_2[_i];
            delete EventDispatcher.types[type];
        }
        return this;
    };
    /**
     * イベントハンドラを発火させる
     *
     * @version 1.0.0
     * @since 0.0.10
     * @param type イベントのタイプ
     * @param args イベントハンドラに渡す引数
     * @param context イベントハンドラのコンテキスト
     * @return インスタンス自身
     *
     */
    EventDispatcher.prototype.trigger = function (type, args, context) {
        if (args === void 0) { args = []; }
        context = context || this;
        var typeName;
        var e;
        if (typeof type === 'string') {
            typeName = type;
            e = new DispatchEvent_1.default(type);
        }
        else {
            e = type;
            typeName = e.type;
        }
        if (EventDispatcher.types[typeName]) {
            // sliceをつかってオブジェクトのコピーを渡し参照を切る
            var handlers = EventDispatcher.types[typeName].slice();
            while (handlers.length) {
                var eventHandler = handlers.shift();
                if (eventHandler && eventHandler.context === this) {
                    var isCancel = eventHandler.fire(context, e, args);
                    if (isCancel) {
                        e.preventDefault();
                        e.stopImmediatePropagation();
                    }
                    // イベントの伝達抑制状態であればループ抜けて以降の処理を行わない
                    if (e.isImmediatePropagationStopped()) {
                        break;
                    }
                }
            }
        }
        return this;
    };
    return EventDispatcher;
}());
/**
 * イベント駆動できるクラス
 *
 * @version 0.7.0
 * @since 0.7.0
 *
 */
EventDispatcher.eventHandlers = {}; // tslint:disable-line:no-any
/**
 * イベント駆動できるクラス
 *
 * @version 0.7.0
 * @since 0.7.0
 *
 */
EventDispatcher.types = {}; // tslint:disable-line:no-any
exports.default = EventDispatcher;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var createUID_1 = __webpack_require__(1);
/**
 * イベントハンドラのラッパークラス
 *
 * @version 0.9.0
 * @since 0.0.10
 *
 */
var EventHandler = (function () {
    /**
     * ハンドラ
     *
     * @version 1.0.0
     * @since 0.0.10
     * @param context 紐づくディスパッチャーオブジェクト
     * @param type イベントのタイプ
     * @param handler ハンドラ
     */
    function EventHandler(context, type, handler) {
        this.context = context;
        this.id = createUID_1.default();
        this.type = type;
        this._handler = handler;
    }
    /**
     * ハンドラを実行する
     *
     * @version 1.0.0
     * @since 0.0.10
     * @param context 紐づくディスパッチャーオブジェクト
     * @param type イベントのタイプ
     * @param handler ハンドラ
     * @return イベントの伝達を止めるかどうか
     */
    EventHandler.prototype.fire = function (context, e, args) {
        var applyArgs = [];
        applyArgs.push(e);
        applyArgs = applyArgs.concat(args);
        var handlerReturn = this._handler.apply(context, applyArgs);
        return handlerReturn !== undefined && !handlerReturn;
    };
    return EventHandler;
}());
exports.default = EventHandler;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var BaserElement_1 = __webpack_require__(0);
var Timer_1 = __webpack_require__(12);
var linkTo_1 = __webpack_require__(19);
/**
 * マップ要素
 *
 * @version 1.0.0
 * @since 0.0.6
 *
 */
var GoogleMaps = (function (_super) {
    __extends(GoogleMaps, _super);
    function GoogleMaps() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * data-{*}-state属性のキー
         */
        _this.stateKeyName = 'google-maps';
        return _this;
    }
    /**
     * 住所文字列から座標を非同期で取得
     *
     * @version 1.0.0
     * @since 0.2.0
     *
     */
    GoogleMaps.getLatLngByAddress = function (address) {
        return new Promise(function (resolve, reject) {
            var geocoder = new google.maps.Geocoder();
            geocoder.geocode({ address: address }, function (results, status) {
                switch (status) {
                    case google.maps.GeocoderStatus.OK: {
                        var lat = results[0].geometry.location.lat();
                        var lng = results[0].geometry.location.lng();
                        resolve(new google.maps.LatLng(lat, lng));
                        break;
                    }
                    case google.maps.GeocoderStatus.INVALID_REQUEST: {
                        reject(new Error("\"" + address + "\u306F\u4E0D\u6B63\u306A\u4F4F\u6240\u3060\u3063\u305F\u305F\u3081\u7D50\u679C\u3092\u8FD4\u3059\u3053\u3068\u304C\u3067\u304D\u307E\u305B\u3093\u3067\u3057\u305F\u3002"));
                        break;
                    }
                    case google.maps.GeocoderStatus.ZERO_RESULTS: {
                        reject(new Error("\"" + address + "\u306F\u7D50\u679C\u304C0\u4EF6\u3067\u3057\u305F\u3002\u3002"));
                        break;
                    }
                    case google.maps.GeocoderStatus.OVER_QUERY_LIMIT: {
                        reject(new Error("\u30EA\u30AF\u30A8\u30B9\u30C8\u6570\u306E\u4E0A\u9650\u3092\u8D85\u3048\u307E\u3057\u305F\u3002" + address + "\u306F\u51E6\u7406\u3055\u308C\u307E\u305B\u3093\u3002"));
                        break;
                    }
                    // case google.maps.GeocoderStatus.ERROR:
                    // case google.maps.GeocoderStatus.UNKNOWN_ERROR:
                    default: {
                        reject(new Error("\u30A8\u30E9\u30FC\u304C\u767A\u751F\u3057\u307E\u3057\u305F\u3002" + address + "\u306F\u51E6\u7406\u3055\u308C\u307E\u305B\u3093\u3002"));
                    }
                }
            });
        });
    };
    GoogleMaps.prototype._create = function () {
        return __awaiter(this, void 0, void 0, function () {
            var pos;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _super.prototype._create.call(this, {
                            lat: null,
                            lng: null,
                            address: null,
                            zoom: 14,
                            mapTypeControlOptions: {
                                mapTypeIds: [
                                    google.maps.MapTypeId.HYBRID,
                                    google.maps.MapTypeId.ROADMAP,
                                ],
                            },
                            scrollwheel: false,
                            styles: [],
                            disableDefaultUI: false,
                            fitBounds: false,
                            scrollSpy: null,
                            pin: true,
                            pinningDelayTime: 400,
                        });
                        if (!('google' in window && google.maps)) {
                            throw new ReferenceError("\"//maps.google.com/maps/api/js\" \u3092\u5148\u306B\u8AAD\u307F\u8FBC\u3080\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059\u3002");
                        }
                        return [4 /*yield*/, this._init()];
                    case 1:
                        pos = _a.sent();
                        return [4 /*yield*/, this.inViewportFirstTime(this._config.scrollSpy === 'render')()];
                    case 2:
                        _a.sent();
                        this._render(pos);
                        return [4 /*yield*/, this.inViewportFirstTime(this._config.scrollSpy === 'pin')()];
                    case 3:
                        _a.sent();
                        this._pin(pos);
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 初期化
     *
     * @version 1.0.0
     * @since 0.0.6
     *
     */
    GoogleMaps.prototype._init = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.detachChildren();
                        if (!(typeof this._config.lat === 'number'
                            &&
                                typeof this._config.lng === 'number')) return [3 /*break*/, 1];
                        return [2 /*return*/, new google.maps.LatLng(this._config.lat, this._config.lng)];
                    case 1:
                        if (!this._config.address) return [3 /*break*/, 3];
                        return [4 /*yield*/, GoogleMaps.getLatLngByAddress(this._config.address)];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3: throw new TypeError("\"Latitude and Longitude are to expect numeric value.\"");
                }
            });
        });
    };
    /**
     * レンダリング
     *
     * @version 1.0.0
     * @since 0.2.0
     * @param lat 緯度
     * @param lng 経度
     *
     */
    GoogleMaps.prototype._render = function (center) {
        this._gmap = new google.maps.Map(this.el, {
            zoom: this._config.zoom,
            mapTypeControlOptions: this._config.mapTypeControlOptions,
            center: center,
            scrollwheel: this._config.scrollwheel,
            styles: this._config.styles,
            disableDefaultUI: this._config.disableDefaultUI,
        });
    };
    GoogleMaps.prototype._pin = function (center) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var pins, centerEl, markerBounds, i, _i, pins_1, pin;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        pins = this.detachedChildrenMap(function (el) { return new Pin(el, _this); });
                        if (this._config.pin) {
                            centerEl = document.createElement('div');
                            centerEl.setAttribute('lat', "" + center.lat());
                            centerEl.setAttribute('lng', "" + center.lng());
                            pins.unshift(new Pin(centerEl, this));
                        }
                        markerBounds = new google.maps.LatLngBounds();
                        i = 1;
                        _i = 0, pins_1 = pins;
                        _a.label = 1;
                    case 1:
                        if (!(_i < pins_1.length)) return [3 /*break*/, 4];
                        pin = pins_1[_i];
                        return [4 /*yield*/, pin.markTo(this._gmap, i * this._config.pinningDelayTime)];
                    case 2:
                        _a.sent();
                        markerBounds.extend(pin.position);
                        i++;
                        _a.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4:
                        if (this._config.fitBounds) {
                            this._gmap.fitBounds(markerBounds);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    return GoogleMaps;
}(BaserElement_1.default));
exports.default = GoogleMaps;
/**
 * 座標要素
 *
 * @version 0.9.0
 * @since 0.0.6
 *
 */
var Pin = (function (_super) {
    __extends(Pin, _super);
    /**
     * コンストラクタ
     *
     * @version 1.0.0
     * @since 0.0.6
     * @param el 対象のDOM要素
     * @param map GoogleMaps要素
     *
     */
    function Pin(el, map) {
        var _this = _super.call(this, el) || this;
        _this._map = map;
        _this._ready = _this._init();
        return _this;
    }
    /**
     * ピンをマップに立てる
     *
     * @version 1.0.0
     * @since 0.0.6
     * @param callback 位置情報が取得できた後に実行するコールバック
     *
     */
    Pin.prototype.markTo = function (map, delayTime) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this._ready
                        .then(Timer_1.default.delay(delayTime))
                        .then(this._markTo(map))];
            });
        });
    };
    /**
     * @version 1.0.0
     * @since 1.0.0
     */
    Pin.prototype._init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var address, _a, lat, lng;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        address = this.pullProp('address');
                        if (!address) return [3 /*break*/, 2];
                        _a = this;
                        return [4 /*yield*/, GoogleMaps.getLatLngByAddress(address)];
                    case 1:
                        _a.position = _b.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        lat = this.pullProp('lat');
                        lng = this.pullProp('lng');
                        this.position = new google.maps.LatLng(lat, lng);
                        _b.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * ピンをマップに立てる
     *
     * @version 1.0.0
     * @since 0.0.6
     *
     */
    Pin.prototype._markTo = function (map) {
        var _this = this;
        return function () {
            var titleAttr = _this.pullProp('title');
            var heading = _this.el.querySelector('h1,h2,h3,h4,h5,h6');
            var headingText = heading ? heading.textContent : '';
            var title = titleAttr || headingText || '';
            var iconURL = _this.pullProp('icon');
            var iconSize = _this.pullProp('iconSize');
            var href = _this.pullProp('href');
            var target = _this.pullProp('target') === '_blank';
            var markerOption = {
                position: _this.position,
                title: title,
                animation: google.maps.Animation.DROP,
            };
            if (iconURL) {
                markerOption.icon = {
                    url: iconURL,
                };
                if (iconSize) {
                    var sizeQ = ("" + iconSize).split(/\s+/);
                    var width = +sizeQ[0] || null;
                    if (width != null) {
                        var height = +sizeQ[1] || width;
                        var size = new google.maps.Size(width, height);
                        markerOption.icon.size = size;
                        markerOption.icon.scaledSize = size;
                    }
                }
            }
            var marker = new google.maps.Marker(markerOption);
            marker.setMap(map);
            if (href) {
                google.maps.event.addListener(marker, 'click', linkTo_1.default(href, target));
            }
            else if (_this.el !== _this._map.el) {
                google.maps.event.addListener(marker, 'click', _this._openInfoWindow(map, marker));
            }
        };
    };
    /**
     * インフォウィンドウを開く
     *
     * @version 1.0.0
     * @since 0.8.0
     *
     */
    Pin.prototype._openInfoWindow = function (map, marker) {
        var _this = this;
        return function () {
            var info = new google.maps.InfoWindow({ disableAutoPan: true });
            info.setContent(_this.el);
            info.open(map, marker);
            marker.setZIndex(google.maps.Marker.MAX_ZINDEX + 1);
            // マップの中心を移動する
            var content = info.getContent();
            var proj = map.getProjection();
            var currentPoint = proj.fromLatLngToPoint(_this.position);
            var scale = Math.pow(2, map.getZoom()); // tslint:disable-line:no-magic-numbers
            var height = typeof content === 'string' ? 0 : content.getBoundingClientRect().height;
            var y = (currentPoint.y * scale - height) / scale;
            var newPoint = new google.maps.Point(currentPoint.x, y);
            var newPosition = proj.fromPointToLatLng(newPoint);
            map.panTo(newPosition);
        };
    };
    return Pin;
}(BaserElement_1.default));


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var targetElements = new WeakMap(); // tslint:disable-line:no-any
var Sequencer = (function () {
    /**
     * 要素ごとに何かしらの逐次処理を実行させるクラス
     *
     * 第2引数に数値を与えると **ステップ間の経過時間** と解釈され、
     * `Sequencer.animationFrameProgression(duration)` を指定したことと同義になる。
     *
     * @param elements 逐次処理をする対象の要素リスト
     * @param stepDurationOrProgression ステップ間の経過時間 もしくは ステップ間の進捗処理
     * @param init 初期処理
     */
    function Sequencer(elements, stepDurationOrProgression, init) {
        this.isRepeat = false;
        this._currentStepIndex = 0;
        this._state = 'before-create';
        this._standBy = false;
        this._progressRate = 0;
        this._available = false;
        this._stopper = Symbol('seaquence-stopper');
        targetElements.set(this, elements);
        this._sequenceProgression = typeof stepDurationOrProgression === 'number' ? Sequencer.animationFrameProgression(stepDurationOrProgression) : stepDurationOrProgression;
        this._create(init);
    }
    Sequencer.delay = function (delayTime, context) {
        return new Promise(function (resolve) {
            setTimeout(function () { return resolve(context); }, delayTime);
        });
    };
    Sequencer.animationFrameProgression = function (duration) {
        var startTimestamp;
        return function (rate, index) {
            // STOP -> STARTに対応していない
            return new Promise(function (resolve) {
                if (rate === 0) {
                    // initialize startTimestamp
                    startTimestamp = Date.now();
                }
                requestAnimationFrame(function () { return resolve((Date.now() - startTimestamp) / duration); });
            });
        };
    };
    Object.defineProperty(Sequencer.prototype, "elements", {
        /**
         * シーケンス処理をする対象の要素リスト
         */
        get: function () {
            return targetElements.get(this);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * シーケンス処理を開始する
     *
     * @chainable
     */
    Sequencer.prototype.start = function () {
        if (this._state === 'before-create') {
            this._standBy = true;
        }
        else {
            this._available = true;
            this._seq();
        }
        return this;
    };
    /**
     *
     */
    Sequencer.prototype.stop = function () {
        this._available = false;
        return this;
    };
    /**
     * 処理をはじめに開始する要素番号を指定する
     *
     * @chainable
     */
    Sequencer.prototype.setStartIndex = function (index) {
        // TODO: validation
        this._currentStepIndex = index;
        return this;
    };
    /**
     * 繰り返し処理をするかどうか指定する
     *
     * @chainable
     * @param repeat 繰り返す
     */
    Sequencer.prototype.repeat = function (repeat) {
        this.isRepeat = repeat;
        return this;
    };
    /**
     * 開始前のイベント
     *
     * @chainable
     * @param handler イベントハンドラ
     */
    Sequencer.prototype.onBeforeStart = function (handler) {
        this._onBeforeStartHandler = handler.bind(this);
        return this;
    };
    /**
     * 開始時のイベント
     *
     * @chainable
     * @param handler イベントハンドラ
     */
    Sequencer.prototype.onStart = function (handler) {
        this._onStartHandler = handler.bind(this);
        return this;
    };
    /**
     * 処理中のイベント
     *
     * requestAnimationFrameのタイミングで発火する
     *
     * @chainable
     * @param handler イベントハンドラ
     */
    Sequencer.prototype.onProgress = function (handler) {
        this._onProgressHandler = handler.bind(this);
        return this;
    };
    /**
     * 1つのシーケンスステップが終わった時のイベント
     *
     * @chainable
     * @param handler イベントハンドラ
     */
    Sequencer.prototype.onBeforeStepEnd = function (handler) {
        this._onBeforeStepEndHandler = handler.bind(this);
        return this;
    };
    /**
     * 次のシーケンスに移る直前のイベント
     *
     * @chainable
     * @param handler イベントハンドラ
     */
    Sequencer.prototype.onBeforeContinue = function (handler) {
        this._onBeforeContinueHandler = handler.bind(this);
        return this;
    };
    /**
     * 次のシーケンスに移った時のイベント
     *
     * @chainable
     * @param handler イベントハンドラ
     */
    Sequencer.prototype.onContinue = function (handler) {
        this._onContinueHandler = handler.bind(this);
        return this;
    };
    /**
     * 終了時のイベント
     *
     * @chainable
     * @param handler イベントハンドラ
     */
    Sequencer.prototype.onFinish = function (handler) {
        this._onFinishHandler = handler.bind(this);
        return this;
    };
    /**
     * 停止時のイベント
     *
     * @chainable
     * @param handler イベントハンドラ
     */
    Sequencer.prototype.onStopped = function (handler) {
        this._onStoppedHandler = handler.bind(this);
        return this;
    };
    Sequencer.prototype._create = function (init) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._init(init)];
                    case 1:
                        _a.sent();
                        this._state = 'stop';
                        if (!this._standBy) return [3 /*break*/, 3];
                        this._standBy = false;
                        this._available = true;
                        return [4 /*yield*/, this._seq()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Sequencer.prototype._init = function (init) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!init) {
                            return [2 /*return*/, Promise.resolve()];
                        }
                        return [4 /*yield*/, init.call(this, this._getEventObject())];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Sequencer.prototype._seq = function () {
        return __awaiter(this, void 0, void 0, function () {
            var rejectReason_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, this._beforeStart()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this._start()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this._step()];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this._stepEnd()];
                    case 4:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        rejectReason_1 = _a.sent();
                        if (this._stopper === rejectReason_1) {
                            this._onStoppedHandler.call(this);
                            return [2 /*return*/];
                        }
                        else {
                            throw rejectReason_1;
                        }
                        return [3 /*break*/, 6];
                    case 6:
                        if (!this._uncontinuable()) return [3 /*break*/, 7];
                        this._finish();
                        return [3 /*break*/, 9];
                    case 7: return [4 /*yield*/, this._continue()];
                    case 8:
                        _a.sent();
                        this._seq();
                        _a.label = 9;
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    Sequencer.prototype._beforeStart = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this._available) {
                            return [2 /*return*/, Promise.reject(this._stopper)];
                        }
                        this._state = 'before-start';
                        if (!this._onBeforeStartHandler) {
                            return [2 /*return*/, Promise.resolve()];
                        }
                        return [4 /*yield*/, this._onBeforeStartHandler(this._getEventObject())];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Sequencer.prototype._start = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this._available) {
                            return [2 /*return*/, Promise.reject(this._stopper)];
                        }
                        this._state = 'started';
                        if (!this._onStartHandler) {
                            return [2 /*return*/, Promise.resolve()];
                        }
                        return [4 /*yield*/, this._onStartHandler(this._getEventObject())];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Sequencer.prototype._step = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this._available) {
                            return [2 /*return*/, Promise.reject(this._stopper)];
                        }
                        this._state = 'progress';
                        if (this._progressRate >= 1) {
                            this._progressRate = 0;
                        }
                        _a.label = 1;
                    case 1: return [4 /*yield*/, this._progress()];
                    case 2:
                        if (!_a.sent()) return [3 /*break*/, 3];
                        ; // tslint:disable-line:curly
                        return [3 /*break*/, 1];
                    case 3:
                        if (!this._onBeforeStepEndHandler) {
                            return [2 /*return*/, Promise.resolve()];
                        }
                        return [4 /*yield*/, this._onBeforeStepEndHandler(this._getEventObject())];
                    case 4:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Sequencer.prototype._progress = function () {
        return __awaiter(this, void 0, void 0, function () {
            var rate;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this._available) {
                            return [2 /*return*/, Promise.reject(this._stopper)];
                        }
                        return [4 /*yield*/, this._sequenceProgression(this._progressRate, this._currentStepIndex)];
                    case 1:
                        rate = _a.sent();
                        this._progressRate = Math.min(rate, 1);
                        if (this._onProgressHandler) {
                            this._onProgressHandler(this._getEventObject());
                        }
                        if (this._progressRate < 1) {
                            return [2 /*return*/, Promise.resolve(true)];
                        }
                        return [2 /*return*/, Promise.resolve(false)];
                }
            });
        });
    };
    Sequencer.prototype._stepEnd = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!this._available) {
                    return [2 /*return*/, Promise.reject(this._stopper)];
                }
                this._state = 'step-end';
                return [2 /*return*/];
            });
        });
    };
    Sequencer.prototype._continue = function () {
        return __awaiter(this, void 0, void 0, function () {
            var elements;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this._available) {
                            return [2 /*return*/, Promise.reject(this._stopper)];
                        }
                        elements = this.elements;
                        if (!this._onBeforeContinueHandler) return [3 /*break*/, 2];
                        return [4 /*yield*/, this._onBeforeContinueHandler(this._getEventObject())];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        if (!this._available) {
                            return [2 /*return*/, Promise.reject(this._stopper)];
                        }
                        this._state = 'continue';
                        this._currentStepIndex += 1;
                        if (elements.length <= this._currentStepIndex) {
                            this._currentStepIndex = 0;
                        }
                        if (!this._onContinueHandler) {
                            return [2 /*return*/, Promise.resolve()];
                        }
                        return [4 /*yield*/, this._onContinueHandler(this._getEventObject())];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Sequencer.prototype._finish = function () {
        this._state = 'stop';
        if (this._onFinishHandler) {
            this._onFinishHandler(this._getEventObject());
        }
    };
    Sequencer.prototype._getEventObject = function () {
        var elements = this.elements;
        return {
            current: elements[this._currentStepIndex],
            prev: elements[this._currentStepIndex - 1] || elements[elements.length - 1] || null,
            next: elements[this._currentStepIndex + 1] || elements[0] || null,
            index: this._currentStepIndex,
            list: elements,
            rate: this._progressRate,
            state: this._state,
        };
    };
    Sequencer.prototype._uncontinuable = function () {
        return this.elements.length - 1 <= this._currentStepIndex && !this.isRepeat;
    };
    return Sequencer;
}());
exports.default = Sequencer;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(setImmediate, clearImmediate) {
Object.defineProperty(exports, "__esModule", { value: true });
var CANCEL_REASON = '__baser_timer_reject__';
/**
 * タイマークラス
 *
 * @version 1.0.0
 * @since 1.0.0
 *
 */
var Timer = (function () {
    function Timer(time) {
        if (!Number.isSafeInteger(time)) {
            throw new RangeError("An argument is invalid number. 0 < time <= MAX_SAFE_INTEGER");
        }
        this.time = time;
    }
    /**
     * 指定ミリ秒待機するPromiseを返す
     *
     * キャンセル不可
     *
     * ex.) then
     * ```
     * Promise.resolve(result1)
     * .then(Timer.delay(500))
     * .then((result2) => {
     * 	result1 === result2; // true
     * });
     * ```
     *
     * ex.2) await
     * ```
     * const result2 = await Timer.delay(500)(result1);
     * result1 === result2; // true
     * ```
     */
    Timer.delay = function (time) {
        return function (returnValue) { return new Timer(time).wait(returnValue); };
    };
    Timer.prototype.wait = function (returnValue) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this._reject = reject;
            if (_this.time === 0) {
                _this._timerId = setImmediate(function () {
                    resolve(returnValue);
                });
            }
            else {
                _this._timerId = setTimeout(function () {
                    resolve(returnValue);
                }, _this.time);
            }
        });
    };
    Timer.prototype.cancel = function () {
        clearImmediate(this._timerId);
        clearTimeout(this._timerId);
        if (this._reject) {
            this._reject(CANCEL_REASON);
        }
    };
    return Timer;
}());
Timer.CANCEL_REASON = CANCEL_REASON;
exports.default = Timer;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5).setImmediate, __webpack_require__(5).clearImmediate))

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var qs = __webpack_require__(23);
var BaserElement_1 = __webpack_require__(0);
var arrayShuffle_1 = __webpack_require__(15);
var scriptLoad_1 = __webpack_require__(20);
var PLAYER_URL = 'https://www.youtube.com/embed/';
var API_URL = 'https://www.youtube.com/player_api';
/**
 * YouTube要素
 *
 * @version 1.0.0
 * @since 0.0.7
 *
 */
var YouTube = (function (_super) {
    __extends(YouTube, _super);
    function YouTube() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * ムービーのID
         *
         * @version 1.0.0
         * @since 0.0.7
         *
         */
        _this.movieId = [];
        /**
         * data-{*}-state属性のキー
         */
        _this.stateKeyName = 'youtube';
        /**
         * APIスクリプトがロード済みで YTオブジェクトが使用可能かどうか
         */
        _this._apiIsLoaded = false;
        return _this;
    }
    /**
     * YouTubeのサムネイル画像を取得する
     *
     * @version 0.10.0
     * @since 0.9.1
     *
     */
    YouTube.getPosterImage = function (movieId, highQuality) {
        if (highQuality === void 0) { highQuality = false; }
        var THUMB_URL = highQuality ? '//i.ytimg.com/vi/' : '//img.youtube.com/vi/';
        var THUMB_FILE_NAME = highQuality ? '/maxresdefault.jpg' : '/0.jpg';
        return "https:" + THUMB_URL + movieId + THUMB_FILE_NAME;
    };
    // /**
    //  * 再設定する
    //  *
    //  * @version 0.0.7
    //  * @since 0.0.7
    //  * @param options オプション
    //  *
    //  */
    // public reload (options?: YouTubeOption): void {
    // 	this._init(options);
    // }
    /**
     * ミュートする
     *
     * @version 0.8.0
     * @since 0.5.0
     *
     */
    YouTube.prototype.mute = function () {
        this.player.mute();
        this._isMuted = true;
        this.trigger('onmute', [this.player]);
    };
    /**
     * ミュートを解除する
     *
     * @version 0.8.0
     * @since 0.5.0
     *
     */
    YouTube.prototype.unMute = function () {
        this.player.unMute();
        this._isMuted = false;
        this.trigger('onunmute', [this.player]);
    };
    // /**
    //  * ミュートのオンオフを要素にアサインする
    //  *
    //  * TODO: 別のクラスにする
    //  *
    //  * @version 0.9.0
    //  * @since 0.5.0
    //  * @param $el アサインするDOM要素のjQueryオブジェクト
    //  * @param options オプション
    //  *
    //  */
    // public muteController (el: HTMLElement, options: {} /* YoutubeMuteControllerOptions */) {
    // 	// const $el: JQuery = $(el);
    // 	// const defaults: YoutubeMuteControllerOptions = {
    // 	// 	eventType: 'click',
    // 	// 	mutedClass: 'is-muted',
    // 	// 	unmutedClass: 'is-unmuted',
    // 	// 	baseClass: 'youtube-mute-ctrl',
    // 	// };
    // 	// const conf: YoutubeMuteControllerOptions = $.extend(defaults, options);
    // 	// BaserElement.addClassTo($el, conf.baseClass);
    // 	// const update: () => void = (): void => {
    // 	// 	if (this._isMuted) {
    // 	// 		BaserElement.addClassTo($el, conf.baseClass, '', conf.mutedClass);
    // 	// 		BaserElement.removeClassFrom($el, conf.baseClass, '', conf.unmutedClass);
    // 	// 	} else {
    // 	// 		BaserElement.addClassTo($el, conf.baseClass, '', conf.unmutedClass);
    // 	// 		BaserElement.removeClassFrom($el, conf.baseClass, '', conf.mutedClass);
    // 	// 	}
    // 	// };
    // 	// const bindCtrl: () => void = (): void => {
    // 	// 	$el.on(conf.eventType, (e: JQueryEventObject): any => {
    // 	// 		if (this._isMuted) {
    // 	// 			this.unMute();
    // 	// 		} else {
    // 	// 			this.mute();
    // 	// 		}
    // 	// 		update();
    // 	// 	});
    // 	// 	update();
    // 	// };
    // 	// this.on('onmute onunmute', (): void => {
    // 	// 	update();
    // 	// });
    // 	// if (this.isEmbeded) {
    // 	// 	bindCtrl();
    // 	// } else {
    // 	// 	this.on('embeded', (e: DispatchEvent, ytp: YT.Player): void => {
    // 	// 		this.off(e.type);
    // 	// 		bindCtrl();
    // 	// 	});
    // 	// }
    // }
    YouTube.prototype._create = function () {
        _super.prototype._create.call(this, {
            videoId: '',
            rel: false,
            autoplay: true,
            stopOnInactive: false,
            controls: false,
            loop: true,
            showinfo: false,
            mute: false,
            width: 400,
            height: 300,
            index: 0,
            poster: undefined,
            posterHighQuality: false,
            startSeconds: 0,
            suggestedQuality: 'default',
            shuffle: false,
            preEmbed: true,
        });
        this._init();
    };
    /**
     * 初期化
     *
     * use: jQuery
     *
     * TODO: 長いので分割
     *
     * ※ `this.$el` の `embeddedyoutubeplay` イベント非推奨
     *
     * @version 1.0.0
     * @since 0.0.7
     * @param options オプション
     *
     */
    YouTube.prototype._init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var movieIdList, param;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this._apiIsLoaded = 'YT' in window;
                        if (!this._config.videoId) {
                            throw new TypeError("Invalid option \"videoId\".");
                        }
                        movieIdList = this._config.videoId.split(/\s*,\s*/);
                        if (this._config.shuffle) {
                            movieIdList = arrayShuffle_1.default(movieIdList);
                        }
                        param = {
                            autoplay: 0,
                            color: 'red',
                            controls: this._config.controls ? 1 : 0,
                            disablekb: 1,
                            enablejsapi: 1,
                            end: 0,
                            fs: 1,
                            // hl: undefined, // TODO: YouTubeOptionから操作可能にする
                            iv_load_policy: 3,
                            // list: ... // TODO: YouTubeOptionから操作可能にする
                            // listType: ... // TODO: YouTubeOptionから操作可能にする
                            loop: this._config.loop ? 1 : 0,
                            modestbranding: 1,
                            // origin: undefined // 指定しない
                            // playlist: ... // 別実装する
                            playsinline: 0,
                            rel: this._config.rel ? 1 : 0,
                            showinfo: this._config.showinfo ? 1 : 0,
                            start: 0,
                        };
                        this.movieId = movieIdList;
                        this._src = "" + PLAYER_URL + this.movieId[0] + "?" + qs.stringify(param);
                        this.playerDomId = this.id + "-player";
                        this.changeState('unavailable');
                        this._createPosterImage();
                        this._createPlayerFrame();
                        if (!!this._apiIsLoaded) return [3 /*break*/, 3];
                        return [4 /*yield*/, scriptLoad_1.default(API_URL)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this._enableYTObject()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [4 /*yield*/, this._createPlayer()];
                    case 4:
                        _a.sent();
                        this._onEmbeded();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * ポスターイメージの生成
     *
     * data-poster属性の中からポスター画像を生成する
     *
     * data-posterが 値なし もしくは 空文字 の場合、YouTubeのサムネイル画像を参照する
     * それ以外の場合は パスと見なして画像を参照する
     *
     * @version 1.0.0
     * @since 0.9.1
     * @param movieId 動画のID
     *
     */
    YouTube.prototype._createPosterImage = function () {
        var posterUrl = this._config.poster || YouTube.getPosterImage(this.movieId[0], this._config.posterHighQuality);
        this.el.style.backgroundImage = "url(\"" + encodeURI(posterUrl) + "\")";
    };
    /**
     * プレイヤーフレームを生成する
     *
     * @version 0.10.3
     * @since 0.9.1
     */
    YouTube.prototype._createPlayerFrame = function () {
        var iframe = document.createElement('iframe');
        iframe.frameBorder = '0';
        iframe.allowFullscreen = true;
        iframe.src = this._src;
        iframe.id = this.playerDomId;
        iframe.style.position = 'relative';
        iframe.style.display = 'block';
        iframe.style.width = '100%';
        iframe.style.height = '100%';
        this._iframe = new BaserElement_1.default(iframe);
        this.detachChildren();
        this.el.appendChild(iframe);
    };
    /**
     * プレイヤーを生成する
     *
     * use: jQuery
     *
     * @version 1.0.0
     * @since 0.8.0
     * @param playerID プレイヤーのDOM ID
     *
     */
    YouTube.prototype._createPlayer = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var player = new YT.Player(_this._iframe.el, {
                            videoId: _this.movieId[0],
                            events: {
                                onStateChange: _this._onStateChange.bind(_this),
                                onReady: function () {
                                    _this.player = player;
                                    player.playVideo();
                                    resolve();
                                },
                            },
                        });
                    })];
            });
        });
    };
    /**
     * enableYTObject
     */
    YouTube.prototype._enableYTObject = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        window.onYouTubeIframeAPIReady = function () {
                            window.onYouTubeIframeAPIReady = undefined;
                            _this._apiIsLoaded = true;
                            resolve();
                        };
                    })];
            });
        });
    };
    /**
     *
     */
    YouTube.prototype._onStateChange = function (e) {
        switch (e.data) {
            case YT.PlayerState.UNSTARTED: {
                this.changeState('unstarted');
                this.trigger('unstarted', [this.player]);
                var listIndex = this.player.getPlaylistIndex();
                if (this.currentCueIndex !== listIndex) {
                    this.trigger('changecue', [this.player]);
                }
                this.currentCueIndex = listIndex;
                break;
            }
            case YT.PlayerState.BUFFERING: {
                this.changeState('buffering');
                this.trigger('buffering', [this.player]);
                break;
            }
            case YT.PlayerState.CUED: {
                this.changeState('cued');
                this.trigger('cued', [this.player]);
                break;
            }
            case YT.PlayerState.ENDED: {
                this.changeState('ended');
                this.trigger('ended', [this.player]);
                if (this.movieId.length > 1 && this._config.loop && this.currentCueIndex === this.movieId.length - 1) {
                    this.player.playVideoAt(0);
                }
                else if (this._config.loop) {
                    this.player.playVideo();
                }
                break;
            }
            case YT.PlayerState.PAUSED: {
                this.changeState('paused');
                this.trigger('paused', [this.player]);
                break;
            }
            case YT.PlayerState.PLAYING: {
                this.changeState('playing');
                this.trigger('playing', [this.player]);
                this.currentCueIndex = this.player.getPlaylistIndex();
                break;
            }
            default: {
                if ('console' in window) {
                    console.warn('YouTube Player state is unknown.');
                }
            }
        }
    };
    /**
     * プレイヤーの生成が完了して実行可能になったときに呼ばれる処理
     *
     * @version 1.0.0
     * @since 0.8.0
     *
     */
    YouTube.prototype._onEmbeded = function () {
        var _this = this;
        this._isMuted = this.player.isMuted();
        if (this._config.mute) {
            this.mute();
        }
        if (this._config.stopOnInactive) {
            window.addEventListener('focusout', function () {
                _this.player.pauseVideo();
            });
            window.addEventListener('focusin', function () {
                _this.player.playVideo();
            });
        }
        // if (this.movieId.length >= 2) {
        // 	// TODO: youtube.d.ts に loadPlaylist() と cuePlaylist() が登録されていない
        // 	const _player: any = this.player;
        // 	if (this._config.autoplay) {
        // 		_player.loadPlaylist(this.movieId, this._config.index, this._config.startSeconds, this._config.suggestedQuality);
        // 	} else {
        // 		_player.cuePlaylist(this.movieId, this._config.index, this._config.startSeconds, this._config.suggestedQuality);
        // 	}
        // } else if (this._config.autoplay) {
        // 	this.player.playVideo();
        // }
        this.trigger('embeded', [this.player]);
    };
    return YouTube;
}(BaserElement_1.default));
YouTube.STATE_KEY_NAME = 'youtube';
exports.default = YouTube;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var baser = __webpack_require__(6);
window.baser = baser;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 配列をランダムに入れ替えて返す
 *
 * Fisher-Yates法
 *
 * @version 1.0.0
 * @since 0.10.0
 * @param array 対象の配列
 * @return ランダムに入れ替えられた配列
 *
 */
function arraySuffle(array) {
    var newArray = array.concat();
    var n = newArray.length;
    for (var i = n - 1; i >= 0; i--) {
        var random = Math.floor(Math.random() * (i + 1));
        var tmp = newArray[i];
        newArray[i] = newArray[random];
        newArray[random] = tmp;
    }
    return newArray;
}
exports.default = arraySuffle;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * キャメルケースをハイフンケースに変換
 *
 * @version 1.0.0
 * @since 1.0.0
 * @param str 対象の文字列
 * @return 変換後の文字列
 *
 */
function hyphenize(str) {
    return str.replace(/[A-Z]/g, function ($) { return "-" + $.toLowerCase(); });
}
exports.default = hyphenize;


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * DOMインターフェイスの値に近い型かどうか判定する
 *
 * 単純に`null` `boolean` `number` `string`のいずれかの型かどうか
 *
 * - `null`は値がないがプロパティは存在するとみなして真
 * - `boolean` `number` `string` は有効な値なので真
 * - `undefined`はプロパティが存在しないとみなして偽
 * - `object`や`function` `symbol` は機能や構造に関するものとみなして偽
 *
 * @version 1.0.0
 * @since 1.0.0
 * @param obj 対象のオブジェクト
 * @return `null` `boolean` `number` `string` いずれかであれば真
 *
 */
function isDOMValue(obj) {
    return (obj === null
        ||
            typeof obj === 'boolean'
        ||
            typeof obj === 'number'
        ||
            typeof obj === 'string');
}
exports.default = isDOMValue;


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var parse_1 = __webpack_require__(2);
/**
 * 文字列が論理値の偽相等であるかどうか
 *
 * @version 1.0.0
 * @since 0.2.0
 * @param str 対象の文字列
 * @return 文字列が論理値の偽相等であるかどうか
 *
 */
function isFalsy(str) {
    return !parse_1.default(str);
}
exports.default = isFalsy;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 指定したURLへ移動する
 *
 * @version 1.0.0
 * @since 1.0.0
 * @param href URI/URL/パス
 * @param blank
 *
 */
function linkTo(href, blank) {
    if (blank === void 0) { blank = false; }
    return function () {
        if (blank) {
            window.open(href);
        }
        else {
            location.href = href;
        }
    };
}
exports.default = linkTo;


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * JSファイルをscriptタグを利用して読み込む
 *
 * @version 1.0.0
 * @since 1.0.0
 * @param scriptFile scriptファイル
 * @return ランダムに入れ替えられた配列
 *
 */
function scriptLoad(scriptFile) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    var tag = document.createElement('script');
                    document.head.appendChild(tag);
                    tag.async = true;
                    tag.src = scriptFile;
                    tag.addEventListener('load', function () {
                        resolve();
                    });
                    tag.addEventListener('error', function (e) {
                        reject(e);
                    });
                })];
        });
    });
}
exports.default = scriptLoad;


/***/ }),
/* 21 */
/***/ (function(module, exports) {

/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

(function(window, document) {
'use strict';


// Exits early if all IntersectionObserver and IntersectionObserverEntry
// features are natively supported.
if ('IntersectionObserver' in window &&
    'IntersectionObserverEntry' in window &&
    'intersectionRatio' in window.IntersectionObserverEntry.prototype) {
  return;
}


// Use :root element of the document for .contains() calls because older IEs
// support Node.prototype.contains only on Element nodes.
var docElement = document.documentElement;


/**
 * An IntersectionObserver registry. This registry exists to hold a strong
 * reference to IntersectionObserver instances currently observering a target
 * element. Without this registry, instances without another reference may be
 * garbage collected.
 */
var registry = [];


/**
 * Creates the global IntersectionObserverEntry constructor.
 * https://wicg.github.io/IntersectionObserver/#intersection-observer-entry
 * @param {Object} entry A dictionary of instance properties.
 * @constructor
 */
function IntersectionObserverEntry(entry) {
  this.time = entry.time;
  this.target = entry.target;
  this.rootBounds = entry.rootBounds;
  this.boundingClientRect = entry.boundingClientRect;
  this.intersectionRect = entry.intersectionRect || getEmptyRect();
  this.isIntersecting = !!entry.intersectionRect;

  // Calculates the intersection ratio. Sets it to 0 if the target area is 0.
  var targetRect = this.boundingClientRect;
  var targetArea = targetRect.width * targetRect.height;
  var intersectionRect = this.intersectionRect;
  var intersectionArea = intersectionRect.width * intersectionRect.height;
  this.intersectionRatio = targetArea ? (intersectionArea / targetArea) : 0;
}


/**
 * Creates the global IntersectionObserver constructor.
 * https://wicg.github.io/IntersectionObserver/#intersection-observer-interface
 * @param {Function} callback The function to be invoked after intersection
 *     changes have queued. The function is not invoked if the queue has
 *     been emptied by calling the `takeRecords` method.
 * @param {Object=} opt_options Optional configuration options.
 * @constructor
 */
function IntersectionObserver(callback, opt_options) {

  var options = opt_options || {};

  if (typeof callback != 'function') {
    throw new Error('callback must be a function');
  }

  if (options.root && options.root.nodeType != 1) {
    throw new Error('root must be an Element');
  }

  // Binds and throttles `this._checkForIntersections`.
  this._checkForIntersections = throttle(
      this._checkForIntersections.bind(this), this.THROTTLE_TIMEOUT);

  // Private properties.
  this._callback = callback;
  this._observationTargets = [];
  this._queuedEntries = [];
  this._rootMarginValues = this._parseRootMargin(options.rootMargin);

  // Public properties.
  this.thresholds = this._initThresholds(options.threshold);
  this.root = options.root || null;
  this.rootMargin = this._rootMarginValues.map(function(margin) {
    return margin.value + margin.unit;
  }).join(' ');
}


/**
 * The minimum interval within which the document will be checked for
 * intersection changes.
 */
IntersectionObserver.prototype.THROTTLE_TIMEOUT = 100;


/**
 * The frequency in which the polyfill polls for intersection changes.
 * this can be updated on a per instance basis and must be set prior to
 * calling `observe` on the first target.
 */
IntersectionObserver.prototype.POLL_INTERVAL = null;


/**
 * Starts observing a target element for intersection changes based on
 * the thresholds values.
 * @param {Element} target The DOM element to observe.
 */
IntersectionObserver.prototype.observe = function(target) {
  // If the target is already being observed, do nothing.
  if (this._observationTargets.some(function(item) {
    return item.element == target;
  })) {
    return;
  }

  if (!(target && target.nodeType == 1)) {
    throw new Error('target must be an Element');
  }

  this._registerInstance();
  this._observationTargets.push({element: target, entry: null});
  this._monitorIntersections();
};


/**
 * Stops observing a target element for intersection changes.
 * @param {Element} target The DOM element to observe.
 */
IntersectionObserver.prototype.unobserve = function(target) {
  this._observationTargets =
      this._observationTargets.filter(function(item) {

    return item.element != target;
  });
  if (!this._observationTargets.length) {
    this._unmonitorIntersections();
    this._unregisterInstance();
  }
};


/**
 * Stops observing all target elements for intersection changes.
 */
IntersectionObserver.prototype.disconnect = function() {
  this._observationTargets = [];
  this._unmonitorIntersections();
  this._unregisterInstance();
};


/**
 * Returns any queue entries that have not yet been reported to the
 * callback and clears the queue. This can be used in conjunction with the
 * callback to obtain the absolute most up-to-date intersection information.
 * @return {Array} The currently queued entries.
 */
IntersectionObserver.prototype.takeRecords = function() {
  var records = this._queuedEntries.slice();
  this._queuedEntries = [];
  return records;
};


/**
 * Accepts the threshold value from the user configuration object and
 * returns a sorted array of unique threshold values. If a value is not
 * between 0 and 1 and error is thrown.
 * @private
 * @param {Array|number=} opt_threshold An optional threshold value or
 *     a list of threshold values, defaulting to [0].
 * @return {Array} A sorted list of unique and valid threshold values.
 */
IntersectionObserver.prototype._initThresholds = function(opt_threshold) {
  var threshold = opt_threshold || [0];
  if (!Array.isArray(threshold)) threshold = [threshold];

  return threshold.sort().filter(function(t, i, a) {
    if (typeof t != 'number' || isNaN(t) || t < 0 || t > 1) {
      throw new Error('threshold must be a number between 0 and 1 inclusively');
    }
    return t !== a[i - 1];
  });
};


/**
 * Accepts the rootMargin value from the user configuration object
 * and returns an array of the four margin values as an object containing
 * the value and unit properties. If any of the values are not properly
 * formatted or use a unit other than px or %, and error is thrown.
 * @private
 * @param {string=} opt_rootMargin An optional rootMargin value,
 *     defaulting to '0px'.
 * @return {Array<Object>} An array of margin objects with the keys
 *     value and unit.
 */
IntersectionObserver.prototype._parseRootMargin = function(opt_rootMargin) {
  var marginString = opt_rootMargin || '0px';
  var margins = marginString.split(/\s+/).map(function(margin) {
    var parts = /^(-?\d*\.?\d+)(px|%)$/.exec(margin);
    if (!parts) {
      throw new Error('rootMargin must be specified in pixels or percent');
    }
    return {value: parseFloat(parts[1]), unit: parts[2]};
  });

  // Handles shorthand.
  margins[1] = margins[1] || margins[0];
  margins[2] = margins[2] || margins[0];
  margins[3] = margins[3] || margins[1];

  return margins;
};


/**
 * Starts polling for intersection changes if the polling is not already
 * happening, and if the page's visibilty state is visible.
 * @private
 */
IntersectionObserver.prototype._monitorIntersections = function() {
  if (!this._monitoringIntersections) {
    this._monitoringIntersections = true;

    this._checkForIntersections();

    // If a poll interval is set, use polling instead of listening to
    // resize and scroll events or DOM mutations.
    if (this.POLL_INTERVAL) {
      this._monitoringInterval = setInterval(
          this._checkForIntersections, this.POLL_INTERVAL);
    }
    else {
      addEvent(window, 'resize', this._checkForIntersections, true);
      addEvent(document, 'scroll', this._checkForIntersections, true);

      if ('MutationObserver' in window) {
        this._domObserver = new MutationObserver(this._checkForIntersections);
        this._domObserver.observe(document, {
          attributes: true,
          childList: true,
          characterData: true,
          subtree: true
        });
      }
    }
  }
};


/**
 * Stops polling for intersection changes.
 * @private
 */
IntersectionObserver.prototype._unmonitorIntersections = function() {
  if (this._monitoringIntersections) {
    this._monitoringIntersections = false;

    clearInterval(this._monitoringInterval);
    this._monitoringInterval = null;

    removeEvent(window, 'resize', this._checkForIntersections, true);
    removeEvent(document, 'scroll', this._checkForIntersections, true);

    if (this._domObserver) {
      this._domObserver.disconnect();
      this._domObserver = null;
    }
  }
};


/**
 * Scans each observation target for intersection changes and adds them
 * to the internal entries queue. If new entries are found, it
 * schedules the callback to be invoked.
 * @private
 */
IntersectionObserver.prototype._checkForIntersections = function() {
  var rootIsInDom = this._rootIsInDom();
  var rootRect = rootIsInDom ? this._getRootRect() : getEmptyRect();

  this._observationTargets.forEach(function(item) {
    var target = item.element;
    var targetRect = getBoundingClientRect(target);
    var rootContainsTarget = this._rootContainsTarget(target);
    var oldEntry = item.entry;
    var intersectionRect = rootIsInDom && rootContainsTarget &&
        this._computeTargetAndRootIntersection(target, rootRect);

    var newEntry = item.entry = new IntersectionObserverEntry({
      time: now(),
      target: target,
      boundingClientRect: targetRect,
      rootBounds: rootRect,
      intersectionRect: intersectionRect
    });

    if (rootIsInDom && rootContainsTarget) {
      // If the new entry intersection ratio has crossed any of the
      // thresholds, add a new entry.
      if (this._hasCrossedThreshold(oldEntry, newEntry)) {
        this._queuedEntries.push(newEntry);
      }
    } else {
      // If the root is not in the DOM or target is not contained within
      // root but the previous entry for this target had an intersection,
      // add a new record indicating removal.
      if (oldEntry && oldEntry.isIntersecting) {
        this._queuedEntries.push(newEntry);
      }
    }
  }, this);

  if (this._queuedEntries.length) {
    this._callback(this.takeRecords(), this);
  }
};


/**
 * Accepts a target and root rect computes the intersection between then
 * following the algorithm in the spec.
 * TODO(philipwalton): at this time clip-path is not considered.
 * https://wicg.github.io/IntersectionObserver/#calculate-intersection-rect-algo
 * @param {Element} target The target DOM element
 * @param {Object} rootRect The bounding rect of the root after being
 *     expanded by the rootMargin value.
 * @return {?Object} The final intersection rect object or undefined if no
 *     intersection is found.
 * @private
 */
IntersectionObserver.prototype._computeTargetAndRootIntersection =
    function(target, rootRect) {

  // If the element isn't displayed, an intersection can't happen.
  if (window.getComputedStyle(target).display == 'none') return;

  var targetRect = getBoundingClientRect(target);
  var intersectionRect = targetRect;
  var parent = target.parentNode;
  var atRoot = false;

  while (!atRoot) {
    var parentRect = null;

    // If we're at the root element, set parentRect to the already
    // calculated rootRect.
    if (parent == this.root || parent.nodeType != 1) {
      atRoot = true;
      parentRect = rootRect;
    }
    // Otherwise check to see if the parent element hides overflow,
    // and if so update parentRect.
    else {
      if (window.getComputedStyle(parent).overflow != 'visible') {
        parentRect = getBoundingClientRect(parent);
      }
    }
    // If either of the above conditionals set a new parentRect,
    // calculate new intersection data.
    if (parentRect) {
      intersectionRect = computeRectIntersection(parentRect, intersectionRect);

      if (!intersectionRect) break;
    }
    parent = parent.parentNode;
  }
  return intersectionRect;
};


/**
 * Returns the root rect after being expanded by the rootMargin value.
 * @return {Object} The expanded root rect.
 * @private
 */
IntersectionObserver.prototype._getRootRect = function() {
  var rootRect;
  if (this.root) {
    rootRect = getBoundingClientRect(this.root);
  } else {
    // Use <html>/<body> instead of window since scroll bars affect size.
    var html = document.documentElement;
    var body = document.body;
    rootRect = {
      top: 0,
      left: 0,
      right: html.clientWidth || body.clientWidth,
      width: html.clientWidth || body.clientWidth,
      bottom: html.clientHeight || body.clientHeight,
      height: html.clientHeight || body.clientHeight
    };
  }
  return this._expandRectByRootMargin(rootRect);
};


/**
 * Accepts a rect and expands it by the rootMargin value.
 * @param {Object} rect The rect object to expand.
 * @return {Object} The expanded rect.
 * @private
 */
IntersectionObserver.prototype._expandRectByRootMargin = function(rect) {
  var margins = this._rootMarginValues.map(function(margin, i) {
    return margin.unit == 'px' ? margin.value :
        margin.value * (i % 2 ? rect.width : rect.height) / 100;
  });
  var newRect = {
    top: rect.top - margins[0],
    right: rect.right + margins[1],
    bottom: rect.bottom + margins[2],
    left: rect.left - margins[3]
  };
  newRect.width = newRect.right - newRect.left;
  newRect.height = newRect.bottom - newRect.top;

  return newRect;
};


/**
 * Accepts an old and new entry and returns true if at least one of the
 * threshold values has been crossed.
 * @param {?IntersectionObserverEntry} oldEntry The previous entry for a
 *    particular target element or null if no previous entry exists.
 * @param {IntersectionObserverEntry} newEntry The current entry for a
 *    particular target element.
 * @return {boolean} Returns true if a any threshold has been crossed.
 * @private
 */
IntersectionObserver.prototype._hasCrossedThreshold =
    function(oldEntry, newEntry) {

  // To make comparing easier, an entry that has a ratio of 0
  // but does not actually intersect is given a value of -1
  var oldRatio = oldEntry && oldEntry.isIntersecting ?
      oldEntry.intersectionRatio || 0 : -1;
  var newRatio = newEntry.isIntersecting ?
      newEntry.intersectionRatio || 0 : -1;

  // Ignore unchanged ratios
  if (oldRatio === newRatio) return;

  for (var i = 0; i < this.thresholds.length; i++) {
    var threshold = this.thresholds[i];

    // Return true if an entry matches a threshold or if the new ratio
    // and the old ratio are on the opposite sides of a threshold.
    if (threshold == oldRatio || threshold == newRatio ||
        threshold < oldRatio !== threshold < newRatio) {
      return true;
    }
  }
};


/**
 * Returns whether or not the root element is an element and is in the DOM.
 * @return {boolean} True if the root element is an element and is in the DOM.
 * @private
 */
IntersectionObserver.prototype._rootIsInDom = function() {
  return !this.root || docElement.contains(this.root);
};


/**
 * Returns whether or not the target element is a child of root.
 * @param {Element} target The target element to check.
 * @return {boolean} True if the target element is a child of root.
 * @private
 */
IntersectionObserver.prototype._rootContainsTarget = function(target) {
  return (this.root || docElement).contains(target);
};


/**
 * Adds the instance to the global IntersectionObserver registry if it isn't
 * already present.
 * @private
 */
IntersectionObserver.prototype._registerInstance = function() {
  if (registry.indexOf(this) < 0) {
    registry.push(this);
  }
};


/**
 * Removes the instance from the global IntersectionObserver registry.
 * @private
 */
IntersectionObserver.prototype._unregisterInstance = function() {
  var index = registry.indexOf(this);
  if (index != -1) registry.splice(index, 1);
};


/**
 * Returns the result of the performance.now() method or null in browsers
 * that don't support the API.
 * @return {number} The elapsed time since the page was requested.
 */
function now() {
  return window.performance && performance.now && performance.now();
}


/**
 * Throttles a function and delays its executiong, so it's only called at most
 * once within a given time period.
 * @param {Function} fn The function to throttle.
 * @param {number} timeout The amount of time that must pass before the
 *     function can be called again.
 * @return {Function} The throttled function.
 */
function throttle(fn, timeout) {
  var timer = null;
  return function () {
    if (!timer) {
      timer = setTimeout(function() {
        fn();
        timer = null;
      }, timeout);
    }
  };
}


/**
 * Adds an event handler to a DOM node ensuring cross-browser compatibility.
 * @param {Node} node The DOM node to add the event handler to.
 * @param {string} event The event name.
 * @param {Function} fn The event handler to add.
 * @param {boolean} opt_useCapture Optionally adds the even to the capture
 *     phase. Note: this only works in modern browsers.
 */
function addEvent(node, event, fn, opt_useCapture) {
  if (typeof node.addEventListener == 'function') {
    node.addEventListener(event, fn, opt_useCapture || false);
  }
  else if (typeof node.attachEvent == 'function') {
    node.attachEvent('on' + event, fn);
  }
}


/**
 * Removes a previously added event handler from a DOM node.
 * @param {Node} node The DOM node to remove the event handler from.
 * @param {string} event The event name.
 * @param {Function} fn The event handler to remove.
 * @param {boolean} opt_useCapture If the event handler was added with this
 *     flag set to true, it should be set to true here in order to remove it.
 */
function removeEvent(node, event, fn, opt_useCapture) {
  if (typeof node.removeEventListener == 'function') {
    node.removeEventListener(event, fn, opt_useCapture || false);
  }
  else if (typeof node.detatchEvent == 'function') {
    node.detatchEvent('on' + event, fn);
  }
}


/**
 * Returns the intersection between two rect objects.
 * @param {Object} rect1 The first rect.
 * @param {Object} rect2 The second rect.
 * @return {?Object} The intersection rect or undefined if no intersection
 *     is found.
 */
function computeRectIntersection(rect1, rect2) {
  var top = Math.max(rect1.top, rect2.top);
  var bottom = Math.min(rect1.bottom, rect2.bottom);
  var left = Math.max(rect1.left, rect2.left);
  var right = Math.min(rect1.right, rect2.right);
  var width = right - left;
  var height = bottom - top;

  return (width >= 0 && height >= 0) && {
    top: top,
    bottom: bottom,
    left: left,
    right: right,
    width: width,
    height: height
  };
}


/**
 * Shims the native getBoundingClientRect for compatibility with older IE.
 * @param {Element} el The element whose bounding rect to get.
 * @return {Object} The (possibly shimmed) rect of the element.
 */
function getBoundingClientRect(el) {
  var rect = el.getBoundingClientRect();
  if (!rect) return;

  // Older IE
  if (!rect.width || !rect.height) {
    rect = {
      top: rect.top,
      right: rect.right,
      bottom: rect.bottom,
      left: rect.left,
      width: rect.right - rect.left,
      height: rect.bottom - rect.top
    };
  }
  return rect;
}


/**
 * Returns an empty rect object. An empty rect is returned when an element
 * is not in the DOM.
 * @return {Object} The empty rect.
 */
function getEmptyRect() {
  return {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: 0,
    height: 0
  };
}


// Exposes the constructors globally.
window.IntersectionObserver = IntersectionObserver;
window.IntersectionObserverEntry = IntersectionObserverEntry;

}(window, document));


/***/ }),
/* 22 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var stringify = __webpack_require__(25);
var parse = __webpack_require__(24);
var formats = __webpack_require__(3);

module.exports = {
    formats: formats,
    parse: parse,
    stringify: stringify
};


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(4);

var has = Object.prototype.hasOwnProperty;

var defaults = {
    allowDots: false,
    allowPrototypes: false,
    arrayLimit: 20,
    decoder: utils.decode,
    delimiter: '&',
    depth: 5,
    parameterLimit: 1000,
    plainObjects: false,
    strictNullHandling: false
};

var parseValues = function parseQueryStringValues(str, options) {
    var obj = {};
    var parts = str.split(options.delimiter, options.parameterLimit === Infinity ? undefined : options.parameterLimit);

    for (var i = 0; i < parts.length; ++i) {
        var part = parts[i];
        var pos = part.indexOf(']=') === -1 ? part.indexOf('=') : part.indexOf(']=') + 1;

        var key, val;
        if (pos === -1) {
            key = options.decoder(part);
            val = options.strictNullHandling ? null : '';
        } else {
            key = options.decoder(part.slice(0, pos));
            val = options.decoder(part.slice(pos + 1));
        }
        if (has.call(obj, key)) {
            obj[key] = [].concat(obj[key]).concat(val);
        } else {
            obj[key] = val;
        }
    }

    return obj;
};

var parseObject = function parseObjectRecursive(chain, val, options) {
    if (!chain.length) {
        return val;
    }

    var root = chain.shift();

    var obj;
    if (root === '[]') {
        obj = [];
        obj = obj.concat(parseObject(chain, val, options));
    } else {
        obj = options.plainObjects ? Object.create(null) : {};
        var cleanRoot = root.charAt(0) === '[' && root.charAt(root.length - 1) === ']' ? root.slice(1, -1) : root;
        var index = parseInt(cleanRoot, 10);
        if (
            !isNaN(index) &&
            root !== cleanRoot &&
            String(index) === cleanRoot &&
            index >= 0 &&
            (options.parseArrays && index <= options.arrayLimit)
        ) {
            obj = [];
            obj[index] = parseObject(chain, val, options);
        } else {
            obj[cleanRoot] = parseObject(chain, val, options);
        }
    }

    return obj;
};

var parseKeys = function parseQueryStringKeys(givenKey, val, options) {
    if (!givenKey) {
        return;
    }

    // Transform dot notation to bracket notation
    var key = options.allowDots ? givenKey.replace(/\.([^.[]+)/g, '[$1]') : givenKey;

    // The regex chunks

    var brackets = /(\[[^[\]]*])/;
    var child = /(\[[^[\]]*])/g;

    // Get the parent

    var segment = brackets.exec(key);
    var parent = segment ? key.slice(0, segment.index) : key;

    // Stash the parent if it exists

    var keys = [];
    if (parent) {
        // If we aren't using plain objects, optionally prefix keys
        // that would overwrite object prototype properties
        if (!options.plainObjects && has.call(Object.prototype, parent)) {
            if (!options.allowPrototypes) {
                return;
            }
        }

        keys.push(parent);
    }

    // Loop through children appending to the array until we hit depth

    var i = 0;
    while ((segment = child.exec(key)) !== null && i < options.depth) {
        i += 1;
        if (!options.plainObjects && has.call(Object.prototype, segment[1].slice(1, -1))) {
            if (!options.allowPrototypes) {
                return;
            }
        }
        keys.push(segment[1]);
    }

    // If there's a remainder, just add whatever is left

    if (segment) {
        keys.push('[' + key.slice(segment.index) + ']');
    }

    return parseObject(keys, val, options);
};

module.exports = function (str, opts) {
    var options = opts || {};

    if (options.decoder !== null && options.decoder !== undefined && typeof options.decoder !== 'function') {
        throw new TypeError('Decoder has to be a function.');
    }

    options.delimiter = typeof options.delimiter === 'string' || utils.isRegExp(options.delimiter) ? options.delimiter : defaults.delimiter;
    options.depth = typeof options.depth === 'number' ? options.depth : defaults.depth;
    options.arrayLimit = typeof options.arrayLimit === 'number' ? options.arrayLimit : defaults.arrayLimit;
    options.parseArrays = options.parseArrays !== false;
    options.decoder = typeof options.decoder === 'function' ? options.decoder : defaults.decoder;
    options.allowDots = typeof options.allowDots === 'boolean' ? options.allowDots : defaults.allowDots;
    options.plainObjects = typeof options.plainObjects === 'boolean' ? options.plainObjects : defaults.plainObjects;
    options.allowPrototypes = typeof options.allowPrototypes === 'boolean' ? options.allowPrototypes : defaults.allowPrototypes;
    options.parameterLimit = typeof options.parameterLimit === 'number' ? options.parameterLimit : defaults.parameterLimit;
    options.strictNullHandling = typeof options.strictNullHandling === 'boolean' ? options.strictNullHandling : defaults.strictNullHandling;

    if (str === '' || str === null || typeof str === 'undefined') {
        return options.plainObjects ? Object.create(null) : {};
    }

    var tempObj = typeof str === 'string' ? parseValues(str, options) : str;
    var obj = options.plainObjects ? Object.create(null) : {};

    // Iterate over the keys and setup the new object

    var keys = Object.keys(tempObj);
    for (var i = 0; i < keys.length; ++i) {
        var key = keys[i];
        var newObj = parseKeys(key, tempObj[key], options);
        obj = utils.merge(obj, newObj, options);
    }

    return utils.compact(obj);
};


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(4);
var formats = __webpack_require__(3);

var arrayPrefixGenerators = {
    brackets: function brackets(prefix) { // eslint-disable-line func-name-matching
        return prefix + '[]';
    },
    indices: function indices(prefix, key) { // eslint-disable-line func-name-matching
        return prefix + '[' + key + ']';
    },
    repeat: function repeat(prefix) { // eslint-disable-line func-name-matching
        return prefix;
    }
};

var toISO = Date.prototype.toISOString;

var defaults = {
    delimiter: '&',
    encode: true,
    encoder: utils.encode,
    encodeValuesOnly: false,
    serializeDate: function serializeDate(date) { // eslint-disable-line func-name-matching
        return toISO.call(date);
    },
    skipNulls: false,
    strictNullHandling: false
};

var stringify = function stringify( // eslint-disable-line func-name-matching
    object,
    prefix,
    generateArrayPrefix,
    strictNullHandling,
    skipNulls,
    encoder,
    filter,
    sort,
    allowDots,
    serializeDate,
    formatter,
    encodeValuesOnly
) {
    var obj = object;
    if (typeof filter === 'function') {
        obj = filter(prefix, obj);
    } else if (obj instanceof Date) {
        obj = serializeDate(obj);
    } else if (obj === null) {
        if (strictNullHandling) {
            return encoder && !encodeValuesOnly ? encoder(prefix) : prefix;
        }

        obj = '';
    }

    if (typeof obj === 'string' || typeof obj === 'number' || typeof obj === 'boolean' || utils.isBuffer(obj)) {
        if (encoder) {
            var keyValue = encodeValuesOnly ? prefix : encoder(prefix);
            return [formatter(keyValue) + '=' + formatter(encoder(obj))];
        }
        return [formatter(prefix) + '=' + formatter(String(obj))];
    }

    var values = [];

    if (typeof obj === 'undefined') {
        return values;
    }

    var objKeys;
    if (Array.isArray(filter)) {
        objKeys = filter;
    } else {
        var keys = Object.keys(obj);
        objKeys = sort ? keys.sort(sort) : keys;
    }

    for (var i = 0; i < objKeys.length; ++i) {
        var key = objKeys[i];

        if (skipNulls && obj[key] === null) {
            continue;
        }

        if (Array.isArray(obj)) {
            values = values.concat(stringify(
                obj[key],
                generateArrayPrefix(prefix, key),
                generateArrayPrefix,
                strictNullHandling,
                skipNulls,
                encoder,
                filter,
                sort,
                allowDots,
                serializeDate,
                formatter,
                encodeValuesOnly
            ));
        } else {
            values = values.concat(stringify(
                obj[key],
                prefix + (allowDots ? '.' + key : '[' + key + ']'),
                generateArrayPrefix,
                strictNullHandling,
                skipNulls,
                encoder,
                filter,
                sort,
                allowDots,
                serializeDate,
                formatter,
                encodeValuesOnly
            ));
        }
    }

    return values;
};

module.exports = function (object, opts) {
    var obj = object;
    var options = opts || {};

    if (options.encoder !== null && options.encoder !== undefined && typeof options.encoder !== 'function') {
        throw new TypeError('Encoder has to be a function.');
    }

    var delimiter = typeof options.delimiter === 'undefined' ? defaults.delimiter : options.delimiter;
    var strictNullHandling = typeof options.strictNullHandling === 'boolean' ? options.strictNullHandling : defaults.strictNullHandling;
    var skipNulls = typeof options.skipNulls === 'boolean' ? options.skipNulls : defaults.skipNulls;
    var encode = typeof options.encode === 'boolean' ? options.encode : defaults.encode;
    var encoder = typeof options.encoder === 'function' ? options.encoder : defaults.encoder;
    var sort = typeof options.sort === 'function' ? options.sort : null;
    var allowDots = typeof options.allowDots === 'undefined' ? false : options.allowDots;
    var serializeDate = typeof options.serializeDate === 'function' ? options.serializeDate : defaults.serializeDate;
    var encodeValuesOnly = typeof options.encodeValuesOnly === 'boolean' ? options.encodeValuesOnly : defaults.encodeValuesOnly;
    if (typeof options.format === 'undefined') {
        options.format = formats.default;
    } else if (!Object.prototype.hasOwnProperty.call(formats.formatters, options.format)) {
        throw new TypeError('Unknown format option provided.');
    }
    var formatter = formats.formatters[options.format];
    var objKeys;
    var filter;

    if (typeof options.filter === 'function') {
        filter = options.filter;
        obj = filter('', obj);
    } else if (Array.isArray(options.filter)) {
        filter = options.filter;
        objKeys = filter;
    }

    var keys = [];

    if (typeof obj !== 'object' || obj === null) {
        return '';
    }

    var arrayFormat;
    if (options.arrayFormat in arrayPrefixGenerators) {
        arrayFormat = options.arrayFormat;
    } else if ('indices' in options) {
        arrayFormat = options.indices ? 'indices' : 'repeat';
    } else {
        arrayFormat = 'indices';
    }

    var generateArrayPrefix = arrayPrefixGenerators[arrayFormat];

    if (!objKeys) {
        objKeys = Object.keys(obj);
    }

    if (sort) {
        objKeys.sort(sort);
    }

    for (var i = 0; i < objKeys.length; ++i) {
        var key = objKeys[i];

        if (skipNulls && obj[key] === null) {
            continue;
        }

        keys = keys.concat(stringify(
            obj[key],
            key,
            generateArrayPrefix,
            strictNullHandling,
            skipNulls,
            encode ? encoder : null,
            filter,
            sort,
            allowDots,
            serializeDate,
            formatter,
            encodeValuesOnly
        ));
    }

    return keys.join(delimiter);
};


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(27), __webpack_require__(22)))

/***/ }),
/* 27 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ })
/******/ ]);
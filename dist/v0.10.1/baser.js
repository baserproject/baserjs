/**!
* baserjs - v0.10.1 r271
* update: 2016-01-20
* Author: baserCMS Users Community [https://github.com/baserproject/]
* Github: https://github.com/baserproject/baserjs
* License: Licensed under the MIT License
*/

/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/// <reference path="../typings/bundle.d.ts" />
	var baser = __webpack_require__(1);
	window['baser'] = baser;
	var JQueryAdapter = __webpack_require__(28);
	$.extend($, JQueryAdapter);
	$.extend($.fn, JQueryAdapter.prototype);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var _ClassNameSeparatorForBEM = __webpack_require__(2);
	var _ElementClassNameCase = __webpack_require__(3);
	/* tslint:disable: variable-name */
	exports.ClassNameSeparatorForBEM = _ClassNameSeparatorForBEM;
	exports.ElementClassNameCase = _ElementClassNameCase;
	/* tslint:enable: variable-name */
	var _AlignedBoxes = __webpack_require__(4);
	var _AnimationFrames = __webpack_require__(13);
	var _BaserElement = __webpack_require__(12);
	var _BreakPoints = __webpack_require__(11);
	var _Browser = __webpack_require__(9);
	var _CheckableElement = __webpack_require__(14);
	var _Checkbox = __webpack_require__(16);
	var _DispatchEvent = __webpack_require__(7);
	var _EventDispatcher = __webpack_require__(6);
	var _EventHandler = __webpack_require__(8);
	var _FormElement = __webpack_require__(15);
	var _GoogleMaps = __webpack_require__(17);
	var _Locational = __webpack_require__(10);
	var _Radio = __webpack_require__(18);
	var _RadioGroup = __webpack_require__(19);
	var _Scroll = __webpack_require__(20);
	var _Select = __webpack_require__(22);
	var _Sequence = __webpack_require__(23);
	var _TextField = __webpack_require__(24);
	var _Timer = __webpack_require__(21);
	var _UtilArray = __webpack_require__(25);
	var _UtilMath = __webpack_require__(26);
	var _UtilString = __webpack_require__(5);
	var _YouTube = __webpack_require__(27);
	/* tslint:disable: variable-name */
	exports.AlignedBoxes = _AlignedBoxes;
	exports.AnimationFrames = _AnimationFrames;
	exports.BaserElement = _BaserElement;
	exports.BreakPoints = _BreakPoints;
	exports.Browser = _Browser;
	exports.CheckableElement = _CheckableElement;
	exports.Checkbox = _Checkbox;
	exports.DispatchEvent = _DispatchEvent;
	exports.EventDispatcher = _EventDispatcher;
	exports.EventHandler = _EventHandler;
	exports.FormElement = _FormElement;
	exports.GoogleMaps = _GoogleMaps;
	exports.Locational = _Locational;
	exports.Radio = _Radio;
	exports.RadioGroup = _RadioGroup;
	exports.Scroll = _Scroll;
	exports.Select = _Select;
	exports.Sequence = _Sequence;
	exports.TextField = _TextField;
	exports.Timer = _Timer;
	exports.UtilArray = _UtilArray;
	exports.UtilMath = _UtilMath;
	exports.UtilString = _UtilString;
	exports.YouTube = _YouTube;
	/* tslint:enable: variable-name */


/***/ },
/* 2 */
/***/ function(module, exports) {

	/**
	 * BEM式のクラス名の接続形式
	 *
	 * @version 0.1.0
	 * @since 0.1.0
	 *
	 */
	var ClassNameSeparatorForBEM;
	(function (ClassNameSeparatorForBEM) {
	    ClassNameSeparatorForBEM[ClassNameSeparatorForBEM["HYPHEN"] = 0] = "HYPHEN";
	    ClassNameSeparatorForBEM[ClassNameSeparatorForBEM["DOUBLE_HYPHEN"] = 1] = "DOUBLE_HYPHEN";
	    ClassNameSeparatorForBEM[ClassNameSeparatorForBEM["UNDERSCORE"] = 2] = "UNDERSCORE";
	    ClassNameSeparatorForBEM[ClassNameSeparatorForBEM["DOUBLE_UNDERSCORE"] = 3] = "DOUBLE_UNDERSCORE";
	    ClassNameSeparatorForBEM[ClassNameSeparatorForBEM["CAMEL_CASE"] = 4] = "CAMEL_CASE";
	})(ClassNameSeparatorForBEM || (ClassNameSeparatorForBEM = {}));
	module.exports = ClassNameSeparatorForBEM;


/***/ },
/* 3 */
/***/ function(module, exports) {

	/**
	 * クラス名の形式
	 *
	 * @version 0.1.0
	 * @since 0.0.1
	 *
	 */
	var ElementClassNameCase;
	(function (ElementClassNameCase) {
	    ElementClassNameCase[ElementClassNameCase["HYPHEN_DELIMITED"] = 0] = "HYPHEN_DELIMITED";
	    ElementClassNameCase[ElementClassNameCase["SNAKE_CASE"] = 1] = "SNAKE_CASE";
	    ElementClassNameCase[ElementClassNameCase["CAMEL_CASE"] = 2] = "CAMEL_CASE";
	})(ElementClassNameCase || (ElementClassNameCase = {}));
	module.exports = ElementClassNameCase;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var UtilString = __webpack_require__(5);
	var EventDispatcher = __webpack_require__(6);
	var Browser = __webpack_require__(9);
	var BreakPoints = __webpack_require__(11);
	var BaserElement = __webpack_require__(12);
	/**
	 * 高さ揃えをするボックスを管理するクラス
	 *
	 * @version 0.9.0
	 * @since 0.7.0
	 *
	 */
	var AlignedBoxes = (function (_super) {
	    __extends(AlignedBoxes, _super);
	    /**
	     * コンストラクタ
	     *
	     * use: jQuery
	     *
	     * @version 0.9.0
	     * @since 0.7.0
	     * @param $el 対象のボックス要素
	     * @param column カラム数もしくはブレークポイントに寄るカラム数 `0`の場合すべての要素の高さを揃える
	     * @param callback ボックスの高さ揃えるときのコールバック
	     */
	    function AlignedBoxes($el, column, callback) {
	        var _this = this;
	        if (column === void 0) { column = 0; }
	        _super.call(this);
	        this.$el = $el;
	        AlignedBoxes.boot();
	        var uid = this.$el.data(AlignedBoxes.DATA_KEY_ID);
	        if (uid) {
	            this.destroy();
	        }
	        uid = UtilString.UID();
	        this.$el.data(AlignedBoxes.DATA_KEY_ID, uid);
	        this.$el.data(AlignedBoxes.DATA_KEY, this);
	        AlignedBoxes.groups[uid] = this;
	        var columnInfo;
	        if (typeof column === 'number') {
	            columnInfo = {
	                Infinity: column
	            };
	        }
	        else {
	            columnInfo = column;
	        }
	        this._columns = new BreakPoints(columnInfo, function (column, breakPoint, windowWidth) {
	            _this._currentColumn = column;
	            _this._align();
	        });
	        this._callback = callback;
	        this._align();
	        this.on('realign', function () {
	            _this._align();
	        });
	    }
	    /**
	     * 基準の文字要素を生成する
	     *
	     * use: jQuery
	     *
	     * @version 0.9.0
	     * @since 0.7.0
	     *
	     */
	    AlignedBoxes.createChar = function () {
	        var $dummyChar = $('<del>M</del>').css({
	            display: 'block',
	            visibility: 'hidden',
	            position: 'absolute',
	            padding: 0,
	            top: 0,
	            zIndex: -1
	        });
	        $dummyChar.appendTo('body');
	        AlignedBoxes.dummyCharElement = $dummyChar[0];
	        AlignedBoxes.currentFontSize = AlignedBoxes.dummyCharElement.offsetHeight;
	    };
	    /**
	     * 文字の大きさが変わったかどうか
	     *
	     * TODO: 破壊的変更を加えていて単純な評価関数ではない
	     *
	     * @version 0.7.0
	     * @since 0.7.0
	     * @return 文字の大きさが変わったかどうか
	     *
	     */
	    AlignedBoxes.isChanged = function () {
	        if (AlignedBoxes.currentFontSize === AlignedBoxes.dummyCharElement.offsetHeight) {
	            return false;
	        }
	        AlignedBoxes.currentFontSize = AlignedBoxes.dummyCharElement.offsetHeight;
	        return true;
	    };
	    /**
	     * 文字の大きさが変わったかどうかを監視するルーチン
	     *
	     * 文字の大きさが変わればボックスのサイズを再設定する
	     *
	     * @version 0.7.0
	     * @since 0.7.0
	     *
	     */
	    AlignedBoxes.observerForFontSize = function () {
	        if (AlignedBoxes.isChanged()) {
	            AlignedBoxes.reAlign();
	        }
	        return;
	    };
	    /**
	     * ボックスのサイズを再設定する
	     *
	     * @version 0.9.0
	     * @since 0.7.0
	     *
	     */
	    AlignedBoxes.reAlign = function () {
	        for (var uid in AlignedBoxes.groups) {
	            if (AlignedBoxes.groups.hasOwnProperty(uid)) {
	                AlignedBoxes.groups[uid].trigger('realign');
	            }
	        }
	        return;
	    };
	    /**
	     * 監視タイマーを起動する
	     *
	     * use: jQuery
	     *
	     * @version 0.9.0
	     * @since 0.7.0
	     *
	     */
	    AlignedBoxes.boot = function () {
	        if (!AlignedBoxes.isBooted) {
	            $(window).on('load', AlignedBoxes.reAlign);
	            Browser.browser.on('resizeend', AlignedBoxes.reAlign);
	            AlignedBoxes.isBooted = true;
	            AlignedBoxes.createChar();
	            // TODO: タイマーによる監視をオプションでオフにできるようにする
	            AlignedBoxes.watchTimer = setInterval(AlignedBoxes.observerForFontSize, AlignedBoxes.watchInterval);
	        }
	    };
	    /**
	     * 高さ揃えを解除する
	     *
	     * use: jQuery
	     *
	     * @version 0.9.0
	     * @since 0.7.0
	     *
	     */
	    AlignedBoxes.prototype.destroy = function () {
	        this.$el.each(function (i, elem) {
	            var $this = $(elem);
	            var uid = $this.data(AlignedBoxes.DATA_KEY_ID);
	            $this.removeData(AlignedBoxes.DATA_KEY_ID);
	            if (uid in AlignedBoxes.groups) {
	                delete AlignedBoxes.groups[uid];
	            }
	        });
	    };
	    /**
	     * ボックスの高さ揃える
	     *
	     * use: jQuery
	     *
	     * @version 0.10.0
	     * @since 0.8.1
	     *
	     */
	    AlignedBoxes.prototype._align = function () {
	        var _this = this;
	        var $boxArray = [];
	        var maxHeight = 0;
	        var lastIndex = this.$el.length - 1;
	        this.$el.each(function (i, elem) {
	            var $box = $(elem);
	            // 要素の高さを強制に無効にする
	            BaserElement.removeCSSPropertyFromDOMElement('height', elem);
	            // column が 0 だと最初の要素の意味
	            var column = i % _this._currentColumn;
	            if (column === 0) {
	                // 配列をリセットする
	                $boxArray = [];
	            }
	            // 配列に追加
	            $boxArray[column] = $box;
	            // 現在の高さと最大の高さを比べて最大の高さを更新
	            // column が 0 ならばリセットさせるので最大の高さもリセット
	            var currentHeight = $box.height();
	            if (column === 0 || currentHeight > maxHeight) {
	                maxHeight = currentHeight;
	            }
	            if (i === lastIndex || column === _this._currentColumn - 1) {
	                for (var _i = 0; _i < $boxArray.length; _i++) {
	                    var $box_1 = $boxArray[_i];
	                    if ($box_1) {
	                        var cancel = false;
	                        // コールバックを実行
	                        if (_this._callback) {
	                            cancel = !_this._callback(maxHeight, currentHeight, _this);
	                        }
	                        // コールバックの戻り値がfalseでなければ高さを変更
	                        if (!cancel) {
	                            $box_1.height(maxHeight);
	                        }
	                    }
	                }
	            }
	        });
	    };
	    /**
	     * jQuery dataに自信のインスタンスを登録するキー
	     *
	     * @version 0.7.0
	     * @since 0.7.0
	     *
	     */
	    AlignedBoxes.DATA_KEY = 'bc-box';
	    /**
	     * jQuery dataにUIDを登録するキー
	     *
	     * @version 0.7.0
	     * @since 0.7.0
	     *
	     */
	    AlignedBoxes.DATA_KEY_ID = AlignedBoxes.DATA_KEY + '-id';
	    /**
	     * 監視の間隔
	     *
	     * @version 0.7.0
	     * @since 0.7.0
	     *
	     */
	    AlignedBoxes.watchInterval = 1000;
	    /**
	     * 監視タイマーが起動しているかどうか
	     *
	     * @version 0.7.0
	     * @since 0.7.0
	     *
	     */
	    AlignedBoxes.isBooted = false;
	    /**
	     * 監視対象のボックスグループ
	     *
	     * @version 0.7.0
	     * @since 0.7.0
	     *
	     */
	    AlignedBoxes.groups = {};
	    return AlignedBoxes;
	})(EventDispatcher);
	module.exports = AlignedBoxes;


/***/ },
/* 5 */
/***/ function(module, exports) {

	/**
	 * ユーティリティ文字列クラス
	 *
	 * @version 0.9.0
	 * @since 0.0.2
	 *
	 */
	var UtilString = (function () {
	    function UtilString() {
	    }
	    /**
	     * ユニークIDを発行する
	     *
	     * @version 0.9.0
	     * @since 0.0.1
	     * @param prefix 接頭辞
	     * @return ユニークID
	     *
	     */
	    UtilString.UID = function (prefix) {
	        if (prefix === void 0) { prefix = 'uid'; }
	        var random = Math.random() * 1e8;
	        var seed = new Date().valueOf();
	        var uniqueNumber = Math.abs(Math.floor(random + seed));
	        if (prefix) {
	            prefix += '-';
	        }
	        return "" + prefix + uniqueNumber.toString(24);
	    };
	    /**
	     * ハイフンチェインケース化
	     *
	     * @version 0.9.0
	     * @since 0.1.0
	     * @param str 対象の文字列
	     * @return ハイフンチェインケース化された文字列
	     *
	     */
	    UtilString.hyphenDelimited = function (str) {
	        var result = [];
	        var words = str.replace(/[A-Z]/g, function ($1) {
	            return " " + $1.toLowerCase();
	        }).split(/[^a-z0-9]+/ig);
	        for (var _i = 0; _i < words.length; _i++) {
	            var word = words[_i];
	            if (word) {
	                result.push(word.toLowerCase());
	            }
	        }
	        return result.join('-');
	    };
	    /**
	     * スネークケース化
	     *
	     * @version 0.1.0
	     * @since 0.1.0
	     * @param str 対象の文字列
	     * @return スネークケース化された文字列
	     *
	     */
	    UtilString.snakeCase = function (str) {
	        return UtilString.hyphenDelimited(str).replace(/-/g, '_');
	    };
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
	    UtilString.camelCase = function (str, upperCase) {
	        if (upperCase === void 0) { upperCase = false; }
	        var result = UtilString.hyphenDelimited(str);
	        if (upperCase && /^[a-z]/.test(result)) {
	            result = "-" + result;
	        }
	        return result.replace(/-([a-z])/g, function ($1, $2) {
	            return $2.toUpperCase();
	        });
	    };
	    /**
	     * 文字列が論理値の偽相等であるかどうか
	     *
	     * @version 0.9.0
	     * @since 0.2.0
	     * @param str 対象の文字列
	     * @return 文字列が論理値の偽相等であるかどうか
	     *
	     */
	    UtilString.isFalsy = function (str) {
	        var FALSY_PATTERN = /^\s*(?:false|null|undefined|0|0?(?:\.0+)?)?\s*$/i;
	        return FALSY_PATTERN.test(str.toLowerCase());
	    };
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
	    UtilString.divide = function (str, separator) {
	        var splited = str.split(separator);
	        var prefix;
	        var suffix;
	        if (splited) {
	            prefix = splited.shift();
	            if (splited.length) {
	                suffix = splited.join(separator);
	            }
	        }
	        return [prefix, suffix];
	    };
	    return UtilString;
	})();
	module.exports = UtilString;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var DispatchEvent = __webpack_require__(7);
	var EventHandler = __webpack_require__(8);
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
	    EventDispatcher.prototype.on = function (type, handler) {
	        var types;
	        if (typeof type === 'string') {
	            types = type.split(/\s+/g);
	        }
	        else {
	            types = type;
	        }
	        for (var _i = 0; _i < types.length; _i++) {
	            var type_1 = types[_i];
	            var eventHandler = new EventHandler(this, type_1, handler);
	            EventDispatcher.eventHandlers[eventHandler.id] = eventHandler;
	            if (!EventDispatcher.types[type_1]) {
	                EventDispatcher.types[type_1] = [];
	            }
	            EventDispatcher.types[type_1].push(eventHandler);
	        }
	        return this;
	    };
	    /**
	     * イベントハンドラを削除する
	     *
	     * @version 0.9.0
	     * @since 0.0.10
	     * @param type イベントのタイプ（複数可）
	     * @return インスタンス自身
	     *
	     */
	    EventDispatcher.prototype.off = function (type) {
	        var types;
	        if (typeof type === 'string') {
	            types = type.split(/\s+/g);
	        }
	        else {
	            types = type;
	        }
	        for (var _i = 0; _i < types.length; _i++) {
	            var type_2 = types[_i];
	            delete EventDispatcher.types[type_2];
	        }
	        return this;
	    };
	    /**
	     * イベントハンドラを発火させる
	     *
	     * @version 0.9.0
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
	            e = new DispatchEvent(type);
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
	                if (eventHandler.context === this) {
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
	    /**
	     * イベント駆動できるクラス
	     *
	     * @version 0.7.0
	     * @since 0.7.0
	     *
	     */
	    EventDispatcher.eventHandlers = {};
	    /**
	     * イベント駆動できるクラス
	     *
	     * @version 0.7.0
	     * @since 0.7.0
	     *
	     */
	    EventDispatcher.types = {};
	    return EventDispatcher;
	})();
	module.exports = EventDispatcher;


/***/ },
/* 7 */
/***/ function(module, exports) {

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
	})();
	module.exports = DispatchEvent;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var UtilString = __webpack_require__(5);
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
	     * @version 0.9.0
	     * @since 0.0.10
	     * @param context 紐づくディスパッチャーオブジェクト
	     * @param type イベントのタイプ
	     * @param handler ハンドラ
	     *
	     */
	    function EventHandler(context, type, handler) {
	        this.context = context;
	        this.id = UtilString.UID();
	        this.type = type;
	        this._handler = handler;
	    }
	    /**
	     * ハンドラを実行する
	     *
	     * @version 0.9.0
	     * @since 0.0.10
	     * @param context 紐づくディスパッチャーオブジェクト
	     * @param type イベントのタイプ
	     * @param handler ハンドラ
	     * @return イベントの伝達を止めるかどうか
	     *
	     */
	    EventHandler.prototype.fire = function (context, e, args) {
	        var handlerReturn = this._handler.apply(context, [e].concat(args));
	        return handlerReturn !== undefined && !handlerReturn;
	    };
	    return EventHandler;
	})();
	module.exports = EventHandler;


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var EventDispatcher = __webpack_require__(6);
	var Locational = __webpack_require__(10);
	/**
	 * ブラウザの情報を管理するクラス
	 *
	 * TODO: テストを書く（テストフレームワークの選定から）
	 *
	 * @version 0.9.0
	 * @since 0.0.2
	 *
	 */
	var Browser = (function (_super) {
	    __extends(Browser, _super);
	    /**
	     * コンストラクタ
	     *
	     * use jQuery
	     *
	     * @version 0.9.0
	     * @since 0.0.2
	     *
	     */
	    function Browser() {
	        var _this = this;
	        _super.call(this);
	        /**
	         * リサイズイベントからリサイズエンドイベントまでのインターバル
	         *
	         * @version 0.0.2
	         * @since 0.0.2
	         *
	         */
	        this.resizeEndInterval = 100;
	        /**
	         * スクロールイベントからスクロールエンドイベントまでのインターバル
	         *
	         * @version 0.0.2
	         * @since 0.0.2
	         *
	         */
	        this.scrollEndInterval = 100;
	        /**
	         * 現在リサイズ中かどうか
	         *
	         * @version 0.0.2
	         * @since 0.0.2
	         *
	         */
	        this.isResize = false;
	        /**
	         * 現在スクロール中かどうか
	         *
	         * @version 0.0.2
	         * @since 0.0.2
	         *
	         */
	        this.isScroll = false;
	        var $window = $(window);
	        // リサイズイベント
	        var resizeEndTimer;
	        $window.on('resize', function (e) {
	            if (!_this.isResize) {
	                _this.trigger('resizestart');
	            }
	            _this.isResize = true;
	            _this.trigger('resize');
	            window.clearTimeout(resizeEndTimer);
	            resizeEndTimer = window.setTimeout(function () {
	                _this.isResize = false;
	                _this.trigger('resize');
	                _this.trigger('resizeend');
	            }, _this.resizeEndInterval);
	        });
	        // スクロールイベント
	        var scrollEndTimer;
	        $window.on('scroll', function (e) {
	            if (!_this.isScroll) {
	                _this.trigger('scrollstart');
	            }
	            _this.isScroll = true;
	            _this.trigger('scroll');
	            window.clearTimeout(scrollEndTimer);
	            scrollEndTimer = window.setTimeout(function () {
	                _this.isScroll = false;
	                _this.trigger('scroll');
	                _this.trigger('scrollend');
	            }, _this.resizeEndInterval);
	        });
	    }
	    /**
	     * ページ遷移する
	     *
	     * @version 0.9.0
	     * @since 0.1.0
	     *
	     */
	    Browser.jumpTo = function (path, isBlank) {
	        if (isBlank === void 0) { isBlank = false; }
	        var href;
	        if (typeof path === 'string') {
	            href = path;
	        }
	        else {
	            href = path.href;
	        }
	        if (!isBlank) {
	            window.location.href = href;
	        }
	        else {
	            window.open(href, null);
	        }
	    };
	    /**
	     * ユーザーエージェント情報を取得する
	     *
	     * @version 0.9.0
	     * @since 0.0.1
	     *
	     */
	    Browser.getUA = function () {
	        var ua = navigator.userAgent;
	        var bua = {
	            iOS: false,
	            android: /android/i.test(ua),
	            iPad: /ipad/i.test(ua),
	            iPhone: /iphone/i.test(ua),
	            iPod: /ipod/i.test(ua),
	            safari: /safari/i.test(ua),
	            chrome: /crios|chrome/i.test(ua),
	            edge: /edge/i.test(ua),
	            ie: /msie/.test(ua)
	        };
	        bua.iOS = bua.iPad || bua.iPhone || bua.iPod || false;
	        if (bua.chrome) {
	            bua.safari = false;
	        }
	        if (bua.edge) {
	            bua.safari = false;
	            bua.chrome = false;
	        }
	        return bua;
	    };
	    /**
	     * 現在のURLのパラメータをリンク先へ引き継がせる
	     *
	     * use: jQuery
	     *
	     * @version 0.9.0
	     * @since 0.7.0
	     *
	     */
	    Browser.inheritParams = function (targetParam) {
	        var $target = $('a, area').filter('[href]');
	        var thisLocation = new Locational(location);
	        if (!(targetParam in thisLocation.params)) {
	            return;
	        }
	        var query = targetParam;
	        var value = thisLocation.params[targetParam];
	        $target.each(function (i, elem) {
	            var targetElem = elem;
	            var loc = new Locational(targetElem);
	            if (thisLocation.host === loc.host) {
	                loc.addParam(query, value);
	                targetElem.href = loc.href;
	            }
	        });
	    };
	    /**
	     * ブラウザ
	     *
	     * @version 0.0.10
	     * @since 0.0.10
	     *
	     */
	    Browser.browser = new Browser();
	    /**
	     * デバイス・OS・ブラウザの情報
	     *
	     * @version 0.4.0
	     * @since 0.0.1
	     *
	     */
	    Browser.spec = {
	        isTouchable: 'ontouchstart' in window,
	        ua: Browser.getUA()
	    };
	    /**
	     * 参照するAPIのスキーム
	     *
	     * @version 0.9.1
	     * @since 0.9.1
	     *
	     */
	    Browser.apiScheme = /https?:/i.test(location.protocol) ? '' : 'http:';
	    return Browser;
	})(EventDispatcher);
	module.exports = Browser;


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var UtilString = __webpack_require__(5);
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
	            for (var _i = 0; _i < queries.length; _i++) {
	                var query = queries[_i];
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
	            for (var _i = 0; _i < value.length; _i++) {
	                var val = value[_i];
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
	})();
	module.exports = Locational;


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var EventDispatcher = __webpack_require__(6);
	var Browser = __webpack_require__(9);
	/**
	 * ブレークポイントの変化に応じた処理をする管理することができるクラス
	 *
	 * @version 0.9.0
	 * @since 0.7.0
	 *
	 * ```
	 * new BreakPoints({
	 * 	340: 'sp',
	 * 	768: 'tab',
	 * 	1200: 'pc',
	 * 	'default': 'bigger'
	 * }, (value, breakPoint, windowWidth) => {
	 * 	// ブレークポイントが340以下なら value = 'sp' など
	 *  // 指定のブレークポイントを跨いだ際にしか発火しない
	 * });
	 * ```
	 *
	 */
	var BreakPoints = (function (_super) {
	    __extends(BreakPoints, _super);
	    /**
	     * コンストラクタ
	     *
	     * @version 0.9.1
	     * @since 0.7.0
	     * @param breakPoints ブレークポイントとコールバックに渡す値を設定する
	     * @param callback 変化に応じたコールバック
	     *
	     */
	    function BreakPoints(breakPoints, callback) {
	        var _this = this;
	        _super.call(this);
	        /**
	         * 現在のブレークポイント（ウィンドウの幅）
	         *
	         * @version 0.8.1
	         * @since 0.7.0
	         *
	         */
	        this.currentPoint = 0;
	        /**
	         * ブレークポイント
	         *
	         * @version 0.8.1
	         * @since 0.7.0
	         *
	         */
	        this.breakPoints = [];
	        /**
	         * ブレークポイントに対してハンドラに渡す値
	         *
	         * @version 0.8.1
	         * @since 0.7.0
	         *
	         */
	        this._values = {};
	        this._setBreakPoints(breakPoints);
	        Browser.browser.on('resizeend', function () {
	            var wW = Math.max(window.document.documentElement.clientWidth, window.innerWidth);
	            for (var _i = 0, _a = _this.breakPoints; _i < _a.length; _i++) {
	                var overPoint = _a[_i];
	                if (wW <= overPoint) {
	                    if (_this.currentPoint !== overPoint) {
	                        _this.currentPoint = overPoint;
	                        var value = _this._values[overPoint];
	                        if (callback) {
	                            callback(value, overPoint, wW);
	                        }
	                        _this.trigger('breakpoint', [value, overPoint, wW], _this);
	                        _this.trigger("breakpoint:" + overPoint, [value, wW], _this);
	                    }
	                    break;
	                }
	            }
	        });
	        Browser.browser.trigger('resizeend');
	    }
	    /**
	     * ブレークポイントを追加する
	     *
	     * @version 0.7.0
	     * @since 0.7.0
	     * @param breakPoints ブレークポイントとコールバックに渡す値を設定する
	     *
	     */
	    BreakPoints.prototype.add = function (breakPoints) {
	        this._setBreakPoints(breakPoints);
	    };
	    /**
	     * ブレークポイントの登録処理
	     *
	     * @version 0.8.1
	     * @since 0.7.0
	     * @param breakPoints ブレークポイントとコールバックに渡す値を設定する
	     *
	     */
	    BreakPoints.prototype._setBreakPoints = function (breakPoints) {
	        for (var breakPointStr in breakPoints) {
	            if (breakPoints.hasOwnProperty(breakPointStr)) {
	                var breakPoint = void 0;
	                if (/^defaults?$/i.test(breakPointStr)) {
	                    breakPoint = Infinity;
	                }
	                else {
	                    breakPoint = parseFloat(breakPointStr);
	                }
	                if (breakPoint >= 1) {
	                    this.breakPoints.push(breakPoint);
	                    var value = breakPoints[breakPointStr];
	                    this._values[breakPoint] = value;
	                }
	            }
	        }
	        this.breakPoints.sort(function (a, b) { return a - b; });
	    };
	    return BreakPoints;
	})(EventDispatcher);
	module.exports = BreakPoints;


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var UtilString = __webpack_require__(5);
	var EventDispatcher = __webpack_require__(6);
	var ElementClassNameCase = __webpack_require__(3);
	var ClassNameSeparatorForBEM = __webpack_require__(2);
	var HYPHEN = '-';
	var DOUBLE_HYPHEN = '--';
	var UNDERSCORE = '_';
	var DOUBLE_UNDERSCORE = '__';
	/**
	 * DOM要素の抽象クラス
	 *
	 * DOM要素操作に関するjQueryのメソッドは極力ここに集約したい
	 * 脱jQueryの際にこのクラスを改修するだけで済むようにする
	 *
	 * @version 0.9.0
	 * @since 0.0.1
	 *
	 */
	var BaserElement = (function (_super) {
	    __extends(BaserElement, _super);
	    /**
	     * コンストラクタ
	     *
	     * use: jQuery
	     *
	     * TODO: クラス名のつき方の規則をきちんと決める
	     * TODO: コンストラクタの引数をネイティブのDOM要素にする
	     *
	     * @version 0.9.0
	     * @since 0.0.1
	     * @param $el 管理するDOM要素
	     *
	     */
	    function BaserElement(el) {
	        _super.call(this);
	        /**
	         * 管理するDOM要素のname属性値
	         *
	         * @version 0.0.1
	         * @since 0.0.1
	         *
	         */
	        this.name = '';
	        /**
	         * baserJSのエレメント化してたかどうか
	         *
	         * @version 0.8.0
	         * @since 0.8.0
	         *
	         */
	        this._elementized = false;
	        this.el = el;
	        this.$el = $(el);
	        // 既にbaserJSのエレメント化している場合
	        if (this.$el.data('bc-element')) {
	            if ('console' in window) {
	                console.warn('This element is elementized of baserJS.');
	            }
	            this._elementized = true;
	            return;
	        }
	        this.$el.data('bc-element', this);
	        // ID・nameの抽出 & 生成
	        var id = el.id || UtilString.UID();
	        var name = el.getAttribute('name');
	        el.id = id;
	        this.id = id;
	        this.name = name;
	        // 共通クラスの付加
	        this.addClass(BaserElement.classNameElementCommon);
	    }
	    /**
	     * BEMベースでクラス名文字列を生成する
	     *
	     * @version 0.9.0
	     * @since 0.1.0
	     * @param blockName ブロック名
	     * @param elementName 要素名
	     * @param modifierName 状態名
	     * @return 生成されたクラス名
	     *
	     */
	    BaserElement.createClassName = function (blockNames, elementNames, modifierName) {
	        if (elementNames === void 0) { elementNames = ''; }
	        if (modifierName === void 0) { modifierName = ''; }
	        var className = '';
	        var prefix;
	        var separator;
	        var elementSeparator;
	        var modifierSeparator;
	        switch (BaserElement.classNameDefaultCase) {
	            case ElementClassNameCase.HYPHEN_DELIMITED:
	                {
	                    separator = HYPHEN;
	                    blockNames = UtilString.hyphenDelimited(blockNames);
	                    elementNames = UtilString.hyphenDelimited(elementNames);
	                    modifierName = UtilString.hyphenDelimited(modifierName);
	                }
	                break;
	            case ElementClassNameCase.SNAKE_CASE:
	                {
	                    separator = UNDERSCORE;
	                    blockNames = UtilString.snakeCase(blockNames);
	                    elementNames = UtilString.snakeCase(elementNames);
	                    modifierName = UtilString.snakeCase(modifierName);
	                }
	                break;
	            case ElementClassNameCase.CAMEL_CASE:
	                {
	                    separator = '';
	                    blockNames = UtilString.camelCase(blockNames, true);
	                    elementNames = UtilString.camelCase(elementNames);
	                    modifierName = UtilString.camelCase(modifierName);
	                }
	                break;
	            default: {
	            }
	        }
	        switch (BaserElement.classNameDefaultSeparatorForElement) {
	            case ClassNameSeparatorForBEM.HYPHEN:
	                {
	                    elementSeparator = HYPHEN;
	                }
	                break;
	            case ClassNameSeparatorForBEM.DOUBLE_HYPHEN:
	                {
	                    elementSeparator = DOUBLE_HYPHEN;
	                }
	                break;
	            case ClassNameSeparatorForBEM.UNDERSCORE:
	                {
	                    elementSeparator = UNDERSCORE;
	                }
	                break;
	            case ClassNameSeparatorForBEM.DOUBLE_UNDERSCORE:
	                {
	                    elementSeparator = DOUBLE_UNDERSCORE;
	                }
	                break;
	            case ClassNameSeparatorForBEM.CAMEL_CASE:
	                {
	                    elementSeparator = '';
	                }
	                break;
	            default: {
	            }
	        }
	        switch (BaserElement.classNameDefaultSeparatorForModifier) {
	            case ClassNameSeparatorForBEM.HYPHEN:
	                {
	                    modifierSeparator = HYPHEN;
	                }
	                break;
	            case ClassNameSeparatorForBEM.DOUBLE_HYPHEN:
	                {
	                    modifierSeparator = DOUBLE_HYPHEN;
	                }
	                break;
	            case ClassNameSeparatorForBEM.UNDERSCORE:
	                {
	                    modifierSeparator = UNDERSCORE;
	                }
	                break;
	            case ClassNameSeparatorForBEM.DOUBLE_UNDERSCORE:
	                {
	                    modifierSeparator = DOUBLE_UNDERSCORE;
	                }
	                break;
	            case ClassNameSeparatorForBEM.CAMEL_CASE:
	                {
	                    modifierSeparator = '';
	                }
	                break;
	            default: {
	            }
	        }
	        if (BaserElement.classNameDefaultPrefix) {
	            prefix = BaserElement.classNameDefaultPrefix;
	            prefix = prefix
	                .replace(/^[^a-z_-]/i, '')
	                .replace(/[^a-z0-9_-]+/ig, '')
	                .replace(/^--+/, '-');
	            className += prefix;
	        }
	        className += separator + blockNames;
	        if (elementNames) {
	            className += elementSeparator + elementNames;
	        }
	        if (modifierName) {
	            className += modifierSeparator + modifierName;
	        }
	        return className;
	    };
	    /**
	     * 要素の属性の真偽を判定する
	     *
	     * DOM APIの標準で判定できるものはそれで判断
	     * 値なし属性の場合は存在すれば真
	     * 値あり属性の場合は偽相等の文字列でなければ全て真とする
	     * ただし値なし属性の場合は値が空文字列のため、偽相等の文字列の例外とする
	     *
	     * @version 0.10.0
	     * @since 0.2.0
	     * @param elem 対象のDOM要素
	     * @param attrName 確認したい属性名
	     * @return 結果
	     *
	     */
	    BaserElement.getBoolAttr = function (elem, attrName) {
	        var value;
	        // DOM APIの標準で判定できるものはそれで判断
	        value = elem[attrName];
	        if (value === true) {
	            return true;
	        }
	        var attr = elem.attributes.getNamedItem(attrName);
	        if (attr) {
	            value = attr.value;
	            if (value === '') {
	                // 値なし属性の場合は存在すれば真
	                return true;
	            }
	            else {
	                return !UtilString.isFalsy("" + value);
	            }
	        }
	        else {
	            // 属性がない場合は偽
	            return false;
	        }
	    };
	    /**
	     * クラス名を付加する
	     *
	     * use: jQuery
	     *
	     * @version 0.9.0
	     * @since 0.1.0
	     * @param elem 対象のDOM要素
	     * @param blockName ブロック名
	     * @param elementName 要素名
	     * @param modifierName 状態名
	     *
	     */
	    BaserElement.addClass = function (elem, blockNames, elementNames, modifierName) {
	        if (elementNames === void 0) { elementNames = ''; }
	        if (modifierName === void 0) { modifierName = ''; }
	        var $elem = $(elem);
	        var className = BaserElement.createClassName(blockNames, elementNames, modifierName);
	        $elem.addClass(className);
	    };
	    /**
	     * 【廃止予定】クラス名を付加する
	     *
	     * use: jQuery
	     *
	     * @deprecated
	     * @version 0.1.0
	     * @since 0.1.0
	     * @param $elem 対象のDOM要素
	     * @param blockName ブロック名
	     * @param elementName 要素名
	     * @param modifierName 状態名
	     *
	     */
	    BaserElement.addClassTo = function ($elem, blockNames, elementNames, modifierName) {
	        if (elementNames === void 0) { elementNames = ''; }
	        if (modifierName === void 0) { modifierName = ''; }
	        var className = BaserElement.createClassName(blockNames, elementNames, modifierName);
	        $elem.addClass(className);
	    };
	    /**
	     * クラス名を取り除く
	     *
	     * use: jQuery
	     *
	     * @version 0.9.0
	     * @since 0.1.0
	     * @param elem 対象のDOM要素
	     * @param blockName ブロック名
	     * @param elementName 要素名
	     * @param modifierName 状態名
	     *
	     */
	    BaserElement.removeClass = function (elem, blockNames, elementNames, modifierName) {
	        if (elementNames === void 0) { elementNames = ''; }
	        if (modifierName === void 0) { modifierName = ''; }
	        var $elem = $(elem);
	        var className = BaserElement.createClassName(blockNames, elementNames, modifierName);
	        $elem.removeClass(className);
	    };
	    /**
	     * 【廃止予定】クラス名を取り除く
	     *
	     * use: jQuery
	     *
	     * @deprecated
	     * @version 0.1.0
	     * @since 0.1.0
	     * @param $elem 対象のDOM要素
	     * @param blockName ブロック名
	     * @param elementName 要素名
	     * @param modifierName 状態名
	     *
	     */
	    BaserElement.removeClassFrom = function ($elem, blockNames, elementNames, modifierName) {
	        if (elementNames === void 0) { elementNames = ''; }
	        if (modifierName === void 0) { modifierName = ''; }
	        var className = BaserElement.createClassName(blockNames, elementNames, modifierName);
	        $elem.removeClass(className);
	    };
	    /**
	     * CSSプロパティをDOM要素から取り除く
	     *
	     * @version 0.9.0
	     * @since 0.2.2
	     * @param elem 対象のDOM要素
	     * @param propName 取り除くCSSプロパティ
	     *
	     */
	    BaserElement.removeCSSProp = function (elem, propName) {
	        var style = elem.style;
	        // IE8以下はCSSStyleDeclarationのインターフェイスが標準でないのでメソッド定義チェックでエラーになる
	        if (style) {
	            var styleIE8lt = style;
	            if (style.removeProperty) {
	                style.removeProperty(propName);
	            }
	            else if (styleIE8lt.removeAttribute) {
	                styleIE8lt.removeAttribute(propName);
	            }
	        }
	    };
	    /**
	     * 【廃止予定】CSSプロパティをDOM要素から取り除く
	     *
	     * use: jQuery
	     *
	     * @deprecated
	     * @version 0.9.0
	     * @since 0.2.2
	     * @param propName 取り除くCSSプロパティ
	     * @param elem 対象のDOM要素
	     *
	     */
	    BaserElement.removeCSSPropertyFromDOMElement = function (propertyName, elem) {
	        BaserElement.removeCSSProp(elem, propertyName);
	    };
	    /**
	     * 【廃止予定】CSSプロパティを取り除く
	     *
	     * use: jQuery
	     *
	     * @version 0.9.0
	     * @since 0.2.2
	     * @param propName 取り除くCSSプロパティ
	     * @param $elem 対象のDOM要素
	     *
	     */
	    BaserElement.removeCSSProperty = function (propertyName, $elem) {
	        $elem.each(function (i, elem) {
	            BaserElement.removeCSSProp(elem, propertyName);
	        });
	    };
	    /**
	     * クラス名を付加する
	     *
	     * @version 0.9.0
	     * @since 0.1.0
	     *
	     */
	    BaserElement.prototype.addClass = function (blockNames, elementNames, modifierName) {
	        if (elementNames === void 0) { elementNames = ''; }
	        if (modifierName === void 0) { modifierName = ''; }
	        BaserElement.addClass(this.el, blockNames, elementNames, modifierName);
	    };
	    /**
	     * 要素の属性の真偽を判定する
	     *
	     * `BaserElement.getBoolAttr` のインスタンスメソッド版
	     *
	     * @version 0.9.0
	     * @since 0.2.0
	     *
	     */
	    BaserElement.prototype.getBoolAttr = function (attrName) {
	        return BaserElement.getBoolAttr(this.el, attrName);
	    };
	    /**
	     * オプションとdata属性の値、属性の値をマージする
	     *
	     * use: jQuery
	     *
	     * TODO: テストを書く
	     * TODO: サブクラスに反映させる
	     *
	     * @version 0.9.1
	     * @since 0.8.0
	     *
	     */
	    BaserElement.prototype.mergeOptions = function (defaultOptions, options) {
	        var attrs = {};
	        var dataAttrs = {};
	        for (var optName in defaultOptions) {
	            if (defaultOptions.hasOwnProperty(optName)) {
	                // 属性はidとclassは除外する
	                switch (optName) {
	                    case 'id':
	                    case 'class':
	                        break;
	                    default: {
	                        attrs[optName] = this.$el.attr(optName);
	                    }
	                }
	                dataAttrs[optName] = this.$el.data(optName);
	            }
	        }
	        return $.extend({}, defaultOptions, options, dataAttrs, attrs);
	    };
	    /**
	     * クラス名のデフォルトのプレフィックス
	     *
	     * @version 0.1.0
	     * @since 0.1.0
	     *
	     */
	    BaserElement.classNameDefaultPrefix = '-bc';
	    /**
	     * インスタンスに付加するデフォルトのクラス名
	     *
	     * @version 0.1.0
	     * @since 0.1.0
	     *
	     */
	    BaserElement.classNameElementCommon = 'element';
	    /**
	     * クラス名のデフォルトの単語繋ぎの形式
	     *
	     * @version 0.1.0
	     * @since 0.1.0
	     *
	     */
	    BaserElement.classNameDefaultCase = ElementClassNameCase.HYPHEN_DELIMITED;
	    /**
	     * BEMのエレメントのクラス名の繋ぎ文字
	     *
	     * @version 0.1.0
	     * @since 0.1.0
	     *
	     */
	    BaserElement.classNameDefaultSeparatorForElement = ClassNameSeparatorForBEM.DOUBLE_UNDERSCORE;
	    /**
	     * BEMのモディファイアのクラス名の繋ぎ文字
	     *
	     * @version 0.1.0
	     * @since 0.1.0
	     *
	     */
	    BaserElement.classNameDefaultSeparatorForModifier = ClassNameSeparatorForBEM.DOUBLE_HYPHEN;
	    return BaserElement;
	})(EventDispatcher);
	module.exports = BaserElement;


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var DispatchEvent = __webpack_require__(7);
	var EventDispatcher = __webpack_require__(6);
	/**
	 * アニメーションフレームを管理するクラス
	 *
	 * @version 0.9.0
	 * @since 0.0.10
	 *
	 */
	var AnimationFrames = (function (_super) {
	    __extends(AnimationFrames, _super);
	    /**
	     * フレーム毎のに実行するコールバックを登録する
	     *
	     * @version 0.9.0
	     * @since 0.0.10
	     * @param callback コールバック関数
	     *
	     */
	    function AnimationFrames(callback) {
	        _super.call(this);
	        /**
	         * 停止状態かどうか
	         *
	         * @version 0.9.0
	         * @since 0.9.0
	         *
	         */
	        this._isStop = true;
	        this._callback = callback;
	        this._isPolyfill = !('requestAnimationFrame' in window && 'cancelAnimationFrame' in window);
	    }
	    /**
	     * フレーム処理を開始する
	     *
	     * @version 0.9.0
	     * @since 0.0.10
	     * @param context コンテキスト
	     * @return インスタンス自身
	     *
	     */
	    AnimationFrames.prototype.start = function (context) {
	        var _this = this;
	        context = context || this;
	        this._isStop = false;
	        var START_TIMESTAMP = new Date().getTime();
	        if (!this._isPolyfill) {
	            // call: 0 define function
	            var onEnterFrame = function (timestamp) {
	                cancelAnimationFrame(_this._requestId);
	                // call: 3 fire callback
	                var e = _this._enterFrame(context, timestamp, START_TIMESTAMP);
	                // call: 4 cancel continue
	                if (!e.isDefaultPrevented() && !_this._isStop) {
	                    // continue
	                    _this._requestId = requestAnimationFrame(onEnterFrame);
	                }
	                else {
	                    var e_1 = new DispatchEvent('stop');
	                    _this.trigger(e_1, [timestamp, START_TIMESTAMP, context], context);
	                }
	            };
	            this._requestId = requestAnimationFrame(onEnterFrame);
	        }
	        else {
	            var interval = 1000 / AnimationFrames.FRAME_RATE;
	            var onEnterFrame = function () {
	                clearTimeout(_this._requestId);
	                var timestamp = new Date().getTime();
	                var e = _this._enterFrame(context, timestamp, START_TIMESTAMP);
	                if (!e.isDefaultPrevented() && !_this._isStop) {
	                    _this._requestId = setTimeout(onEnterFrame, interval);
	                }
	                else {
	                    var e_2 = new DispatchEvent('stop');
	                    _this.trigger(e_2, [timestamp, START_TIMESTAMP, context], context);
	                }
	            };
	            this._requestId = setTimeout(onEnterFrame, interval);
	        }
	        return this;
	    };
	    /**
	     * リクエストしたコールバックを停止する
	     *
	     * @version 0.9.0
	     * @since 0.0.10
	     * @return インスタンス自身
	     *
	     */
	    AnimationFrames.prototype.stop = function () {
	        this._isStop = true;
	        if (!this._isPolyfill) {
	            cancelAnimationFrame(this._requestId);
	        }
	        else {
	            clearTimeout(this._requestId);
	        }
	        return this;
	    };
	    /**
	     * フレーム毎の処理
	     *
	     * @version 0.9.0
	     * @since 0.9.0
	     * @param context コンテキスト
	     * @return イベント
	     *
	     */
	    AnimationFrames.prototype._enterFrame = function (context, now, startTimestamp) {
	        if (this._callback) {
	            this._callback.call(context, now, startTimestamp, context);
	        }
	        var e = new DispatchEvent('enterframe');
	        this.trigger(e, [now, startTimestamp, context], this);
	        return e;
	    };
	    /**
	     * フレームレート
	     * 単位: FPS
	     *
	     * @version 0.0.10
	     * @since 0.0.10
	     *
	     */
	    AnimationFrames.FRAME_RATE = 60;
	    return AnimationFrames;
	})(EventDispatcher);
	module.exports = AnimationFrames;


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var BaserElement = __webpack_require__(12);
	var FormElement = __webpack_require__(15);
	/**
	 * ラジオボタンとチェックボックスの抽象クラス
	 *
	 * @version 0.9.0
	 * @since 0.0.1
	 *
	 */
	var CheckableElement = (function (_super) {
	    __extends(CheckableElement, _super);
	    /**
	     * コンストラクタ
	     *
	     * use: jQuery
	     *
	     * @version 0.9.0
	     * @since 0.0.1
	     * @param el 管理するDOM要素
	     * @param options オプション
	     *
	     */
	    function CheckableElement(el, options) {
	        var _this = this;
	        _super.call(this, el, $.extend({}, CheckableElement.defaultOption, options));
	        // 既にエレメント化されていた場合は何もしない
	        if (this._elementized) {
	            return;
	        }
	        // IE6・7は反映させない
	        if (!el.querySelector) {
	            return;
	        }
	        this._checkedClass = this._config.checkedClass;
	        this.checked = this.el.checked;
	        this.defaultChecked = this.el.defaultChecked;
	        this._update();
	        this.$el.on('change.bcCheckableElement', function () {
	            _this._onchenge();
	        });
	    }
	    /**
	     * 要素の状態を更新する
	     *
	     * use: jQuery
	     *
	     * @version 0.0.1
	     * @since 0.0.1
	     *
	     */
	    CheckableElement.prototype.update = function () {
	        if (this.$el.prop('checked') !== this.checked) {
	            this._update();
	        }
	    };
	    /**
	     * 要素の状態を更新する
	     *
	     * @version 0.0.1
	     * @since 0.0.1
	     *
	     */
	    CheckableElement.prototype._onchenge = function () {
	        this.checked = !this.checked;
	        this._update();
	    };
	    /**
	     * 要素の状態を更新する
	     *
	     * use: jQuery
	     *
	     * @version 0.10.0
	     * @since 0.0.1
	     *
	     */
	    CheckableElement.prototype._update = function () {
	        var checked = this.el.checked;
	        // WAI-ARIA属性
	        this.$el.attr('aria-checked', "" + checked);
	        if (checked) {
	            this.$el.addClass(this._checkedClass);
	            this.$label.addClass(this._checkedClass);
	            this.$wrapper.addClass(this._checkedClass);
	            BaserElement.addClass(this.el, FormElement.classNameFormElementCommon, '', CheckableElement.classNameStateChecked);
	            BaserElement.addClassTo(this.$label, FormElement.classNameFormElementCommon, FormElement.classNameLabel, CheckableElement.classNameStateChecked);
	            BaserElement.addClassTo(this.$wrapper, FormElement.classNameWrapper, '', CheckableElement.classNameStateChecked);
	            BaserElement.removeClass(this.el, FormElement.classNameFormElementCommon, '', CheckableElement.classNameStateUnchecked);
	            BaserElement.removeClassFrom(this.$label, FormElement.classNameFormElementCommon, FormElement.classNameLabel, CheckableElement.classNameStateUnchecked);
	            BaserElement.removeClassFrom(this.$wrapper, FormElement.classNameWrapper, '', CheckableElement.classNameStateUnchecked);
	        }
	        else {
	            this.$el.removeClass(this._checkedClass);
	            this.$label.removeClass(this._checkedClass);
	            this.$wrapper.removeClass(this._checkedClass);
	            BaserElement.addClass(this.el, FormElement.classNameFormElementCommon, '', CheckableElement.classNameStateUnchecked);
	            BaserElement.addClassTo(this.$label, FormElement.classNameFormElementCommon, FormElement.classNameLabel, CheckableElement.classNameStateUnchecked);
	            BaserElement.addClassTo(this.$wrapper, FormElement.classNameWrapper, '', CheckableElement.classNameStateUnchecked);
	            BaserElement.removeClass(this.el, FormElement.classNameFormElementCommon, '', CheckableElement.classNameStateChecked);
	            BaserElement.removeClassFrom(this.$label, FormElement.classNameFormElementCommon, FormElement.classNameLabel, CheckableElement.classNameStateChecked);
	            BaserElement.removeClassFrom(this.$wrapper, FormElement.classNameWrapper, '', CheckableElement.classNameStateChecked);
	        }
	        this.checked = checked;
	    };
	    /**
	     * オプションのデフォルト値
	     *
	     * @since 0.0.1
	     *
	     */
	    CheckableElement.defaultOption = {
	        checkedClass: ''
	    };
	    /**
	     * CheckableElement関連の要素のチェック時に付加されるクラス
	     *
	     * @version 0.1.0
	     * @since 0.1.0
	     *
	     */
	    CheckableElement.classNameStateChecked = 'checked';
	    /**
	     * CheckableElement関連の要素のチェックがはずれた時に付加されるクラス
	     *
	     * @version 0.1.0
	     * @since 0.1.0
	     *
	     */
	    CheckableElement.classNameStateUnchecked = 'unchecked';
	    return CheckableElement;
	})(FormElement);
	module.exports = CheckableElement;


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var BaserElement = __webpack_require__(12);
	/**
	 * フォーム要素の抽象クラス
	 *
	 * @version 0.9.0
	 * @since 0.0.1
	 *
	 */
	var FormElement = (function (_super) {
	    __extends(FormElement, _super);
	    /**
	     * コンストラクタ
	     *
	     * use: jQuery
	     *
	     * @version 0.9.0
	     * @since 0.0.1
	     * @param el 管理するDOM要素
	     * @param options オプション
	     *
	     */
	    function FormElement(el, options) {
	        _super.call(this, el);
	        /**
	         * フォーカスがあたっている状態かどうか
	         *
	         * @since 0.1.0
	         *
	         */
	        this.hasFocus = false;
	        // 既にエレメント化されていた場合は何もしない
	        if (this._elementized) {
	            return;
	        }
	        // IE6・7は反映させない
	        if (!el.querySelector) {
	            return;
	        }
	        this._config = $.extend({}, FormElement.defaultOption, options);
	        // クラス名を設定す
	        this._setClassName();
	        // ラベル要素の割り当て
	        this._asignLabel();
	        // ラベルテキストの設定
	        this._setLabelText();
	        // ラップ要素の割り当て
	        this._createWrapper();
	        // 擬似要素生成
	        this._createPsuedoElements();
	        // イベントを登録
	        this._bindEvents();
	        // 初期状態を設定
	        this.defaultValue = this.$el.val();
	        this.setDisabled(this.$el.prop('disabled'));
	        this._onblur();
	        // フォーム要素に登録
	        // TODO: 有要な処理か検討
	        FormElement.elements.push(this);
	    }
	    /**
	     * 値を設定する
	     *
	     * use: jQuery
	     *
	     * @version 0.9.0
	     * @since 0.4.0
	     * @param value 設定する値
	     * @param isSilent イベントを伝達しない
	     *
	     */
	    FormElement.prototype.setValue = function (value, isSilent) {
	        if (isSilent === void 0) { isSilent = false; }
	        var valueString = "" + value;
	        var currentValue = this.$el.val();
	        if (!this.disabled && currentValue !== valueString) {
	            this.$el.val(valueString);
	            this._fireChangeEvent(isSilent);
	        }
	    };
	    /**
	     * 無効状態を設定する
	     *
	     * use: jQuery
	     *
	     * @version 0.9.0
	     * @since 0.4.0
	     * @param 無効状態かどうか
	     *
	     */
	    FormElement.prototype.setDisabled = function (isDisabled) {
	        this.disabled = isDisabled;
	        this.el.disabled = isDisabled;
	        if (this.disabled) {
	            BaserElement.addClass(this.el, FormElement.classNameFormElementCommon, '', FormElement.classNameStateDisabled);
	            BaserElement.addClassTo(this.$label, FormElement.classNameFormElementCommon, FormElement.classNameLabel, FormElement.classNameStateDisabled);
	            BaserElement.addClassTo(this.$wrapper, FormElement.classNameWrapper, '', FormElement.classNameStateDisabled);
	        }
	        else {
	            BaserElement.removeClass(this.el, FormElement.classNameFormElementCommon, '', FormElement.classNameStateDisabled);
	            BaserElement.removeClassFrom(this.$label, FormElement.classNameFormElementCommon, FormElement.classNameLabel, FormElement.classNameStateDisabled);
	            BaserElement.removeClassFrom(this.$wrapper, FormElement.classNameWrapper, '', FormElement.classNameStateDisabled);
	        }
	    };
	    /**
	     * クラス名を設定する
	     *
	     * @version 0.4.0
	     * @since 0.4.0
	     *
	     */
	    FormElement.prototype._setClassName = function () {
	        // 共通のクラスを付加
	        this.addClass(FormElement.classNameFormElementCommon);
	    };
	    /**
	     * ラップ要素を生成
	     *
	     * use: jQuery
	     *
	     * @version 0.9.0
	     * @since 0.4.0
	     *
	     */
	    FormElement.prototype._createWrapper = function () {
	        var wrapperHtml = '<span />';
	        var $wrapper = $(wrapperHtml);
	        BaserElement.addClassTo($wrapper, FormElement.classNameFormElementCommon);
	        BaserElement.addClassTo($wrapper, FormElement.classNameWrapper);
	        if (this.isWrappedByLabel) {
	            this.$label.wrapAll($wrapper);
	            this.$wrapper = this.$label.parent('span');
	        }
	        else if (this.hasLabelByForAttr) {
	            this.$el.wrapAll($wrapper);
	            this.$wrapper = this.$el.parent('span');
	        }
	        else {
	            this.$el.add(this.$label).wrapAll($wrapper);
	            this.$wrapper = this.$el.parent('span');
	        }
	    };
	    /**
	     * 擬似要素を生成する
	     *
	     * @version 0.4.1
	     * @since 0.4.0
	     *
	     */
	    FormElement.prototype._createPsuedoElements = function () {
	        // void
	    };
	    /**
	     * イベントの登録
	     *
	     * use: jQuery
	     *
	     * @version 0.9.0
	     * @since 0.4.0
	     *
	     */
	    FormElement.prototype._bindEvents = function () {
	        var _this = this;
	        this.$el.on('focus.bcFormElement', function () {
	            if (!_this.disabled) {
	                _this._onfocus();
	            }
	        });
	        this.$el.on('blur.bcFormElement', function () {
	            _this._onblur();
	        });
	        this.$el.on('change.bcFormElement', function (e, arg) {
	            if (arg && arg.isSilent) {
	                _this._onSilentChange();
	            }
	            else {
	                _this.trigger('change', null, _this);
	            }
	        });
	    };
	    /**
	     * 他のオブジェクトにchangeイベントを発火・伝達せずに実行されるチェンジ処理
	     *
	     * @version 0.4.0
	     * @since 0.4.0
	     *
	     */
	    FormElement.prototype._onSilentChange = function () {
	        // void
	    };
	    /**
	     * フォーカスがあたった時の処理
	     *
	     * use: jQuery
	     *
	     * @version 0.9.0
	     * @since 0.0.1
	     *
	     */
	    FormElement.prototype._onfocus = function () {
	        this.hasFocus = true;
	        BaserElement.addClass(this.el, FormElement.classNameFormElementCommon, '', FormElement.classNameStateFocus);
	        BaserElement.addClassTo(this.$label, FormElement.classNameFormElementCommon, FormElement.classNameLabel, FormElement.classNameStateFocus);
	        BaserElement.addClassTo(this.$wrapper, FormElement.classNameWrapper, '', FormElement.classNameStateFocus);
	        BaserElement.removeClass(this.el, FormElement.classNameFormElementCommon, '', FormElement.classNameStateBlur);
	        BaserElement.removeClassFrom(this.$label, FormElement.classNameFormElementCommon, FormElement.classNameLabel, FormElement.classNameStateBlur);
	        BaserElement.removeClassFrom(this.$wrapper, FormElement.classNameWrapper, '', FormElement.classNameStateBlur);
	    };
	    /**
	     * フォーカスがはずれた時の処理
	     *
	     * use: jQuery
	     *
	     * @version 0.9.0
	     * @since 0.0.1
	     *
	     */
	    FormElement.prototype._onblur = function () {
	        this.hasFocus = false;
	        BaserElement.addClass(this.el, FormElement.classNameFormElementCommon, '', FormElement.classNameStateBlur);
	        BaserElement.addClassTo(this.$label, FormElement.classNameFormElementCommon, FormElement.classNameLabel, FormElement.classNameStateBlur);
	        BaserElement.addClassTo(this.$wrapper, FormElement.classNameWrapper, '', FormElement.classNameStateBlur);
	        BaserElement.removeClass(this.el, FormElement.classNameFormElementCommon, '', FormElement.classNameStateFocus);
	        BaserElement.removeClassFrom(this.$label, FormElement.classNameFormElementCommon, FormElement.classNameLabel, FormElement.classNameStateFocus);
	        BaserElement.removeClassFrom(this.$wrapper, FormElement.classNameWrapper, '', FormElement.classNameStateFocus);
	    };
	    /**
	     * changeイベントを発火する
	     *
	     * use: jQuery
	     *
	     * @version 0.9.0
	     * @since 0.4.0
	     * @param isSilent イベントを伝達しない
	     *
	     */
	    FormElement.prototype._fireChangeEvent = function (isSilent) {
	        if (isSilent === void 0) { isSilent = false; }
	        if (isSilent) {
	            this.$el.trigger('change.bcFormElement', [{ isSilent: true }]);
	        }
	        else if ('createEvent' in document) {
	            var e = document.createEvent('Event');
	            e.initEvent('change', true, true);
	            this.el.dispatchEvent(e);
	        }
	        else {
	            // IE8
	            var legacyElement = this.el;
	            legacyElement.fireEvent('onchange');
	        }
	    };
	    /**
	     * ラベル要素内のテキストを取得する
	     *
	     * use: jQuery
	     *
	     * @version 0.9.0
	     * @since 0.4.0
	     *
	     */
	    FormElement.prototype._setLabelText = function () {
	        var _this = this;
	        if (this._config.label) {
	            this.$label.prepend(this._config.label);
	            this.labelBeforeText = this._config.label;
	            this.labelAfterText = '';
	        }
	        else {
	            var $labelContents = this.$label.contents();
	            var $before = $();
	            var $after = $();
	            var isBefore = true;
	            $labelContents.each(function (i, node) {
	                if (node === _this.$el[0]) {
	                    isBefore = false;
	                    return;
	                }
	                if (isBefore) {
	                    $before = $before.add($(node));
	                }
	                else {
	                    $after = $after.add($(node));
	                }
	            });
	            $before.text(function (i, text) {
	                return $.trim(text);
	            });
	            $after.text(function (i, text) {
	                return $.trim(text);
	            });
	            this.labelBeforeText = $before.text() || this.$el.attr('title') || '';
	            this.labelAfterText = $after.text() || '';
	            if (this.labelBeforeText) {
	                this.$label.prepend($before);
	            }
	            if (this.labelAfterText) {
	                this.$label.append($after);
	            }
	        }
	        this.label = this.labelBeforeText + this.labelAfterText;
	    };
	    /**
	     * ラベル要素を割り当てる
	     *
	     * use: jQuery
	     *
	     * @version 0.9.0
	     * @since 0.4.0
	     *
	     */
	    FormElement.prototype._asignLabel = function () {
	        this.hasLabelByForAttr = false;
	        // 祖先のlabel要素を検索
	        var $label = this.$el.closest('label');
	        // label要素の存在
	        var hasLabel = !!$label.length;
	        // labelでネストされていたかどうか
	        this.isWrappedByLabel = hasLabel;
	        // for属性に関連づいたlabel要素を取得
	        if (!hasLabel) {
	            $label = $("label[for=\"" + this.id + "\"]");
	            hasLabel = !!$label.length;
	            this.hasLabelByForAttr = hasLabel;
	        }
	        // ラベルがないときにラベル要素を生成する
	        if (this._config.autoLabeling && !hasLabel) {
	            // label(もしくは別の)要素の生成
	            $label = $("<" + this._config.labelTag.toLowerCase() + " />");
	            $label.insertAfter(this.$el);
	            if (this._config.labelClass) {
	                $label.addClass(this._config.labelClass);
	            }
	            if (this._config.labelTag.toLowerCase() === 'label') {
	                // labelを生成したのならfor属性にidを紐付ける
	                $label.attr('for', this.id);
	            }
	        }
	        // console.log({
	        // 	hasLabel: hasLabel,
	        // 	isWrappedByLabel: this.isWrappedByLabel,
	        // 	hasLabelByForAttr: this.hasLabelByForAttr
	        // });
	        BaserElement.addClassTo($label, FormElement.classNameFormElementCommon);
	        BaserElement.addClassTo($label, FormElement.classNameFormElementCommon, FormElement.classNameLabel);
	        this.$label = $label;
	    };
	    /**
	     * オプションのデフォルト値
	     *
	     * @version 0.0.5
	     * @since 0.0.1
	     *
	     */
	    FormElement.defaultOption = {
	        label: '',
	        labelTag: 'label',
	        labelClass: '',
	        autoLabeling: true
	    };
	    /**
	     * FormElement関連の要素の共通のクラス
	     *
	     * @version 0.1.0
	     * @since 0.1.0
	     *
	     */
	    FormElement.classNameFormElementCommon = 'form-element';
	    /**
	     * FormElement関連のラッパー要素の共通のクラス
	     *
	     * @version 0.1.0
	     * @since 0.1.0
	     *
	     */
	    FormElement.classNameWrapper = 'wrapper';
	    /**
	     * FormElement関連のラベル要素の共通のクラス
	     *
	     * @version 0.1.0
	     * @since 0.1.0
	     *
	     */
	    FormElement.classNameLabel = 'label';
	    /**
	     * FormElement関連の要素のフォーカス時に付加されるクラス
	     *
	     * @version 0.1.0
	     * @since 0.1.0
	     *
	     */
	    FormElement.classNameStateFocus = 'focus';
	    /**
	     * FormElement関連の要素のフォーカスがはずれた時に付加されるクラス
	     *
	     * @version 0.1.0
	     * @since 0.1.0
	     *
	     */
	    FormElement.classNameStateBlur = 'blur';
	    /**
	     * FormElement関連の要素の無効状態の時に付加されるクラス
	     *
	     * @version 0.4.0
	     * @since 0.4.0
	     *
	     */
	    FormElement.classNameStateDisabled = 'disabled';
	    /**
	     * フォーム関連要素リスト
	     *
	     * @version 0.7.0
	     * @since 0.7.0
	     *
	     */
	    FormElement.elements = [];
	    return FormElement;
	})(BaserElement);
	module.exports = FormElement;


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var BaserElement = __webpack_require__(12);
	var FormElement = __webpack_require__(15);
	var CheckableElement = __webpack_require__(14);
	/**
	 * チェックボックスの拡張クラス
	 *
	 * @version 0.9.0
	 * @since 0.0.1
	 *
	 */
	var Checkbox = (function (_super) {
	    __extends(Checkbox, _super);
	    /**
	     * コンストラクタ
	     *
	     * use: jQuery
	     *
	     * @version 0.9.0
	     * @since 0.0.1
	     * @param el 管理するDOM要素
	     * @param options オプション
	     *
	     */
	    function Checkbox(el, options) {
	        _super.call(this, el, options);
	        // 既にエレメント化されていた場合は何もしない
	        if (this._elementized) {
	            return;
	        }
	        // IE6・7は反映させない
	        if (!el.querySelector) {
	            return;
	        }
	        this.addClass(Checkbox.classNameCheckbox);
	        BaserElement.addClassTo(this.$label, Checkbox.classNameCheckbox, FormElement.classNameLabel);
	        BaserElement.addClassTo(this.$wrapper, Checkbox.classNameCheckbox + '-' + FormElement.classNameWrapper);
	    }
	    /**
	     * Checkbox要素のクラス
	     *
	     * @version 0.1.0
	     * @since 0.1.0
	     *
	     */
	    Checkbox.classNameCheckbox = 'form-checkbox';
	    return Checkbox;
	})(CheckableElement);
	module.exports = Checkbox;


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var BaserElement = __webpack_require__(12);
	/**
	 * マップ要素
	 *
	 * @version 0.9.0
	 * @since 0.0.6
	 *
	 */
	var GoogleMaps = (function (_super) {
	    __extends(GoogleMaps, _super);
	    /**
	     * コンストラクタ
	     *
	     * use: jQuery
	     *
	     * @version 0.9.0
	     * @since 0.0.6
	     * @param el 管理するDOM要素
	     * @param options マップオプション
	     *
	     */
	    function GoogleMaps(el, options) {
	        _super.call(this, el);
	        // 既にエレメント化されていた場合は何もしない
	        if (this._elementized) {
	            return;
	        }
	        // IE6・7は反映させない
	        if (!el.querySelector) {
	            return;
	        }
	        if ('google' in window && google.maps) {
	            this.$el.addClass(GoogleMaps.className);
	            this.mapOption = $.extend({}, options);
	            this._init();
	            // TODO: 必要な処理か検討
	            GoogleMaps.maps.push(this);
	            this.$el.data(GoogleMaps.className, this);
	        }
	        else {
	            if ('console' in window) {
	                console.warn('ReferenceError: "//maps.google.com/maps/api/js" を先に読み込む必要があります。');
	                return;
	            }
	        }
	    }
	    /**
	     * 住所文字列から座標を非同期で取得
	     *
	     * @version 0.10.0
	     * @since 0.2.0
	     *
	     */
	    GoogleMaps.getLatLngByAddress = function (address, callback) {
	        var geocoder = new google.maps.Geocoder();
	        geocoder.geocode({
	            address: address
	        }, function (results, status) {
	            switch (status) {
	                case google.maps.GeocoderStatus.OK:
	                    {
	                        var lat = results[0].geometry.location.lat();
	                        var lng = results[0].geometry.location.lng();
	                        callback(lat, lng);
	                    }
	                    break;
	                case google.maps.GeocoderStatus.INVALID_REQUEST:
	                case google.maps.GeocoderStatus.ZERO_RESULTS:
	                case google.maps.GeocoderStatus.OVER_QUERY_LIMIT:
	                    {
	                        if (console && console.warn) {
	                            console.warn("ReferenceError: \"" + address + "\u306F\u4E0D\u6B63\u306A\u4F4F\u6240\u306E\u3060\u3063\u305F\u305F\u3081\u7D50\u679C\u3092\u8FD4\u3059\u3053\u3068\u304C\u3067\u304D\u307E\u305B\u3093\u3067\u3057\u305F\u3002\"");
	                        }
	                    }
	                    break;
	                case google.maps.GeocoderStatus.ERROR:
	                case google.maps.GeocoderStatus.UNKNOWN_ERROR:
	                    {
	                        if (console && console.warn) {
	                            console.warn('Error: "エラーが発生しました。"');
	                        }
	                    }
	                    break;
	                default: {
	                }
	            }
	        });
	    };
	    /**
	     * 再読み込み・再設定
	     *
	     * use: jQuery
	     *
	     * @version 0.6.0
	     * @since 0.2.0
	     *
	     */
	    GoogleMaps.prototype.reload = function (options) {
	        this.mapOption = options ? $.extend({}, options) : this.mapOption;
	        this._init();
	    };
	    /**
	     * 初期化
	     *
	     * use: jQuery
	     *
	     * @version 0.9.0
	     * @since 0.0.6
	     *
	     */
	    GoogleMaps.prototype._init = function () {
	        var _this = this;
	        // data-*属性からの継承
	        this.mapOption = $.extend(this.mapOption, {
	            zoom: this.$el.data('zoom'),
	            fitBounds: this.$el.data('fit-bounds')
	        });
	        this.markerBounds = new google.maps.LatLngBounds();
	        var mapCenterLat = this.$el.data('lat') || GoogleMaps.defaultLat;
	        var mapCenterLng = this.$el.data('lng') || GoogleMaps.defaultLng;
	        var mapCenterAddress = this.$el.data('address') || '';
	        if (mapCenterAddress) {
	            // 住所から緯度・経度を検索する（非同期）
	            GoogleMaps.getLatLngByAddress(mapCenterAddress, function (lat, lng) {
	                _this._render(lat, lng);
	            });
	        }
	        else {
	            this._render(mapCenterLat, mapCenterLng);
	        }
	    };
	    /**
	     * レンダリング
	     *
	     * use: jQuery
	     *
	     * @version 0.9.0
	     * @since 0.2.0
	     * @param mapCenterLat 緯度
	     * @param mapCenterLng 経度
	     *
	     */
	    GoogleMaps.prototype._render = function (mapCenterLat, mapCenterLng) {
	        var _this = this;
	        this.$coordinates = this.$coordinates || this.$el.find('[data-lat][data-lng], [data-address]').detach();
	        if (this.$coordinates.length <= 0) {
	            this.$coordinates = this.$el;
	        }
	        var coordinates = [];
	        this.$coordinates.each(function (i, el) {
	            var coordinate = new Coordinate(el, _this);
	            coordinates.push(coordinate);
	        });
	        this.mapOption = $.extend({
	            zoom: 14,
	            mapTypeControlOptions: {
	                mapTypeIds: [
	                    google.maps.MapTypeId.HYBRID,
	                    google.maps.MapTypeId.ROADMAP,
	                ]
	            },
	            scrollwheel: false,
	            center: new google.maps.LatLng(mapCenterLat, mapCenterLng),
	            styles: null
	        }, this.mapOption);
	        this.info = new google.maps.InfoWindow({
	            disableAutoPan: true
	        });
	        this.gmap = new google.maps.Map(this.el, $.extend({}, this.mapOption, {
	            fitBounds: google.maps.Map.prototype.fitBounds
	        }));
	        $.each(coordinates, function (i, coordinate) {
	            coordinate.markTo(function (coordinate) {
	                if (_this.mapOption.fitBounds) {
	                    _this.markerBounds.extend(coordinate.position);
	                    _this.gmap.fitBounds(_this.markerBounds);
	                }
	            });
	        });
	    };
	    /**
	     * 初期設定用の緯度
	     * 東京都庁
	     *
	     * @version 0.0.6
	     * @since 0.0.6
	     *
	     */
	    GoogleMaps.defaultLat = 35.681382;
	    /**
	     * 初期設定用の経度
	     * 東京都庁
	     *
	     * @version 0.0.6
	     * @since 0.0.6
	     *
	     */
	    GoogleMaps.defaultLng = 139.766084;
	    /**
	     * 管理対象の要素に付加するclass属性値のプレフィックス
	     *
	     * @version 0.0.6
	     * @since 0.0.6
	     *
	     */
	    GoogleMaps.className = '-bc-map-element';
	    /**
	     * 管理するマップ要素リスト
	     *
	     * @version 0.0.6
	     * @since 0.0.6
	     *
	     */
	    GoogleMaps.maps = [];
	    return GoogleMaps;
	})(BaserElement);
	/**
	 * 座標要素
	 *
	 * @version 0.9.0
	 * @since 0.0.6
	 *
	 */
	var Coordinate = (function () {
	    /**
	     * コンストラクタ
	     *
	     * use: jQuery
	     *
	     * @version 0.9.0
	     * @since 0.0.6
	     * @param el 対象のDOM要素
	     * @param map GoogleMaps要素
	     *
	     */
	    function Coordinate(el, map) {
	        var _this = this;
	        this.icon = null;
	        this.el = el;
	        this.$el = $(el);
	        this._map = map;
	        var address = this.$el.data('address');
	        var dfd = $.Deferred();
	        if (address) {
	            GoogleMaps.getLatLngByAddress(address, function (lat, lng) {
	                _this.lat = lat;
	                _this.lng = lng;
	                _this.position = new google.maps.LatLng(_this.lat, _this.lng);
	                dfd.resolve();
	            });
	        }
	        else {
	            this.lat = +this.$el.data('lat');
	            this.lng = +this.$el.data('lng');
	            this.position = new google.maps.LatLng(this.lat, this.lng);
	            dfd.resolve();
	        }
	        this._promiseLatLng = dfd.promise();
	    }
	    /**
	     * ピンをマップに立てる
	     *
	     * @version 0.8.0
	     * @since 0.0.6
	     * @param callback 位置情報が取得できた後に実行するコールバック
	     *
	     */
	    Coordinate.prototype.markTo = function (callback) {
	        var _this = this;
	        this._promiseLatLng.done(function () {
	            _this._markTo();
	            if (callback) {
	                callback(_this);
	            }
	        });
	    };
	    /**
	     * インフォウィンドウを開く
	     *
	     * use: jQuery
	     *
	     * @version 0.9.0
	     * @since 0.8.0
	     *
	     */
	    Coordinate.prototype.openInfoWindow = function () {
	        this._map.info.setContent(this.el);
	        this._map.info.open(this._map.gmap, this.marker);
	        this.marker.setZIndex(google.maps.Marker.MAX_ZINDEX + 1);
	        // マップの中心を移動する
	        var content = this._map.info.getContent();
	        var proj = this._map.gmap.getProjection();
	        var currentPoint = proj.fromLatLngToPoint(this.position);
	        var scale = Math.pow(2, this._map.gmap.getZoom());
	        var height = $(content).height();
	        var y = (currentPoint.y * scale - height) / scale;
	        var newPoint = new google.maps.Point(currentPoint.x, y);
	        var newPosition = proj.fromPointToLatLng(newPoint);
	        this._map.gmap.panTo(newPosition);
	    };
	    /**
	     * ピンをマップに立てる
	     *
	     * use: jQuery
	     *
	     * @version 0.9.0
	     * @since 0.0.6
	     *
	     */
	    Coordinate.prototype._markTo = function () {
	        var _this = this;
	        this.title = this.$el.attr('title') || this.$el.data('title') || this.$el.find('h1,h2,h3,h4,h5,h6').text() || null;
	        var iconURL = this.$el.data('icon');
	        var iconSize = this.$el.data('iconSize');
	        if (iconURL) {
	            this.icon = {};
	            this.icon.url = iconURL;
	            if (iconSize) {
	                var sizeQ = ("" + iconSize).split(/\s+/);
	                var width = +sizeQ[0] || null;
	                if (width) {
	                    var height = +sizeQ[1] || width;
	                    var size = new google.maps.Size(width, height);
	                    this.icon.size = size;
	                    this.icon.scaledSize = size;
	                }
	            }
	        }
	        this.marker = new google.maps.Marker({
	            position: this.position,
	            title: this.title,
	            icon: this.icon,
	            map: this._map.gmap
	        });
	        if (this._map.$coordinates !== this._map.$el) {
	            google.maps.event.addListener(this.marker, 'click', function () {
	                _this.openInfoWindow();
	            });
	        }
	    };
	    return Coordinate;
	})();
	module.exports = GoogleMaps;


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var BaserElement = __webpack_require__(12);
	var FormElement = __webpack_require__(15);
	var CheckableElement = __webpack_require__(14);
	var RadioGroup = __webpack_require__(19);
	/**
	 * ラジオボタンの拡張クラス
	 *
	 * @version 0.9.0
	 * @since 0.0.1
	 *
	 */
	var Radio = (function (_super) {
	    __extends(Radio, _super);
	    /**
	     * コンストラクタ
	     *
	     * use: jQuery
	     *
	     * @version 0.9.0
	     * @since 0.0.1
	     * @param el 管理するDOM要素
	     * @param options オプション
	     *
	     */
	    function Radio(el, options) {
	        _super.call(this, el, options);
	        // 既にエレメント化されていた場合は何もしない
	        if (this._elementized) {
	            return;
	        }
	        // IE6・7は反映させない
	        if (!el.querySelector) {
	            return;
	        }
	        this.addClass(Radio.classNameRadio);
	        BaserElement.addClassTo(this.$label, Radio.classNameRadio, FormElement.classNameLabel);
	        BaserElement.addClassTo(this.$wrapper, Radio.classNameRadio + '-' + FormElement.classNameWrapper);
	        // ラジオボタングループに登録
	        // TODO: APIをRadioGroup.add(name, elem)にする
	        if (!RadioGroup.groups[this.name]) {
	            RadioGroup.groups[this.name] = new RadioGroup(this.name);
	        }
	        RadioGroup.groups[this.name].add(this);
	    }
	    /**
	     * チェンジイベントのハンドラ
	     *
	     * use: jQuery
	     *
	     * @version 0.7.0
	     * @since 0.0.1
	     *
	     */
	    Radio.prototype._onchenge = function () {
	        _super.prototype._onchenge.call(this);
	        // 同じname属性のラジオボタン要素も同時に変更をする
	        // TODO: APIをRadioGroup.update(name, elem)にする
	        RadioGroup.groups[this.name].update(this);
	    };
	    /**
	     * Radio要素のクラス
	     *
	     * @version 0.1.0
	     * @since 0.1.0
	     *
	     */
	    Radio.classNameRadio = 'form-radio';
	    return Radio;
	})(CheckableElement);
	module.exports = Radio;


/***/ },
/* 19 */
/***/ function(module, exports) {

	/**
	 * ラジオボタンのname属性値で紐付いたブループを管理するクラス
	 *
	 * @since 0.9.0
	 *
	 */
	var RadioGroup = (function () {
	    /**
	     * コンストラクタ
	     *
	     * @since 0.0.1
	     * @param name 紐づくname属性値
	     *
	     */
	    function RadioGroup(name) {
	        /**
	         * ラジオボタンのリスト
	         *
	         * @version 0.9.0
	         * @since 0.0.1
	         *
	         */
	        this._radioButtons = [];
	        this.name = name;
	    }
	    /**
	     * 紐づくラジオボタンを追加する
	     *
	     * @version 0.9.0
	     * @since 0.0.1
	     * @param radio 拡張ラジオボタン
	     *
	     */
	    RadioGroup.prototype.add = function (radio) {
	        for (var _i = 0, _a = this._radioButtons; _i < _a.length; _i++) {
	            var radioButton = _a[_i];
	            if (radioButton === radio) {
	                return;
	            }
	        }
	        this._radioButtons.push(radio);
	    };
	    /**
	     * 管理するラジオボタンの状態を更新する
	     *
	     * @version 0.9.0
	     * @since 0.0.1
	     * @param ignoreRadio 対象外のラジオボタン
	     *
	     */
	    RadioGroup.prototype.update = function (ignoreRadio) {
	        for (var _i = 0, _a = this._radioButtons; _i < _a.length; _i++) {
	            var radioButton = _a[_i];
	            if (radioButton !== ignoreRadio) {
	                radioButton.update();
	            }
	        }
	    };
	    /**
	     * ラジオボタンのグループを保管するオブジェクト
	     *
	     * @version 0.9.0
	     * @since 0.7.0
	     *
	     */
	    RadioGroup.groups = {};
	    return RadioGroup;
	})();
	module.exports = RadioGroup;


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var Timer = __webpack_require__(21);
	/**
	 * スクロールを管理するクラス
	 *
	 * @version 0.9.0
	 * @since 0.0.8
	 *
	 */
	var Scroll = (function () {
	    function Scroll() {
	        this.timer = new Timer();
	    }
	    /**
	     * 対象の要素もしくは位置にスクロールを移動させる
	     *
	     * @version 0.9.0
	     * @since 0.0.8
	     * @param selector 対象の要素のセレクタ・HTMLオブジェクト・jQueryオブジェクトもしくはスクロール位置
	     * @param options オプション
	     * @return インスタンス自信
	     *
	     */
	    Scroll.prototype.to = function (selector, options) {
	        var _this = this;
	        this.options = options || {};
	        var offset = this.options.offset || 0;
	        if (this.options.wheelCancel) {
	            // TODO: IE8 wheelイベント対応検討
	            $(document).on('wheel', function () {
	                if (_this.isScroll) {
	                    _this._finish();
	                    if ($.isFunction(_this.options.onScrollCancel)) {
	                        _this.options.onScrollCancel.call(_this, new $.Event('scrollcancel'));
	                    }
	                }
	                return;
	            });
	        }
	        // 第一引数が数値だった場合はその値のy軸へスクロール
	        if (typeof selector === 'number') {
	            offset += selector || 0;
	            this.targetX = 0;
	            this.targetY = offset;
	        }
	        else if (selector) {
	            var $target = $(selector);
	            if (!$target.length) {
	                return this;
	            }
	            var elem = $target[0];
	            // スクロール先座標をセットする
	            var x = 0;
	            var y = 0;
	            // 親のオフセットを足していって自身の座標を確定
	            while (elem) {
	                x += elem.offsetLeft;
	                y += elem.offsetTop;
	                elem = elem.offsetParent;
	            }
	            var winWidth = document.documentElement.clientWidth;
	            var winHeight = document.documentElement.clientHeight;
	            var docWidth = document.documentElement.scrollWidth;
	            var docHeight = document.documentElement.scrollHeight;
	            var maxScrollX = Math.max(winWidth, docWidth);
	            var maxScrollY = Math.max(winHeight, docHeight);
	            this.targetX = Math.min(x, maxScrollX) + offset;
	            this.targetY = Math.min(y, maxScrollY) + offset;
	        }
	        else {
	            var $target = $(window.location.hash);
	            if ($target.length) {
	                Timer.wait(Scroll.delayWhenURLHashTarget, function () {
	                    window.scrollTo(0, 0);
	                    _this.to($target, {
	                        offset: offset
	                    });
	                    return;
	                });
	            }
	            return this;
	        }
	        // スクロール停止中ならスクロール開始
	        if (!this.isScroll) {
	            this.isScroll = true;
	            if ($.isFunction(this.options.onScrollStart)) {
	                this.options.onScrollStart.call(this, new $.Event('scrollstart'));
	            }
	            this._progress();
	        }
	        return this;
	    };
	    /**
	     * スクロール
	     *
	     * @version 0.9.0
	     * @since 0.0.8
	     *
	     */
	    Scroll.prototype._progress = function () {
	        var currentX = this._getX();
	        var currentY = this._getY();
	        var vx = (this.targetX - currentX) / Scroll.speed;
	        var vy = (this.targetY - currentY) / Scroll.speed;
	        if ((Math.abs(vx) < 1 && Math.abs(vy) < 1) || (this.prevX === currentX && this.prevY === currentY)) {
	            // 目標座標付近に到達していたら終了
	            window.scrollTo(this.targetX, this.targetY);
	            this._finish();
	            if ($.isFunction(this.options.onScrollEnd)) {
	                this.options.onScrollEnd.call(this, new $.Event('scrollend'));
	            }
	        }
	        else {
	            var nextX = Math.floor(currentX + vx);
	            var nextY = Math.floor(currentY + vy);
	            // 繰り返し
	            window.scrollTo(nextX, nextY);
	            this.prevX = currentX;
	            this.prevY = currentY;
	            if ($.isFunction(this.options.onScrollProgress)) {
	                this.options.onScrollProgress.call(this, new $.Event('scrollprogress'));
	            }
	            this.timer.wait(Scroll.interval, this._progress, this);
	        }
	    };
	    /**
	     * x位置の取得
	     *
	     * @version 0.9.0
	     * @since 0.0.8
	     * @return x位置
	     *
	     */
	    Scroll.prototype._getX = function () {
	        return (window.pageXOffset !== undefined) ? window.pageXOffset : (document.documentElement.scrollLeft || document.body.scrollLeft);
	    };
	    /**
	     * y位置の取得
	     *
	     * @version 0.9.0
	     * @since 0.0.8
	     * @return y位置
	     *
	     */
	    Scroll.prototype._getY = function () {
	        return (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement.scrollTop || document.body.scrollTop);
	    };
	    /**
	     * スクロールの終了
	     *
	     * @version 0.9.0
	     * @since 0.0.8
	     *
	     */
	    Scroll.prototype._finish = function () {
	        this.isScroll = false;
	        this.prevX = null;
	        this.prevY = null;
	        this.timer.stop();
	    };
	    Scroll.speed = 4;
	    Scroll.interval = 20;
	    Scroll.delayWhenURLHashTarget = 30;
	    return Scroll;
	})();
	module.exports = Scroll;


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var DispatchEvent = __webpack_require__(7);
	var EventDispatcher = __webpack_require__(6);
	/**
	 * 時間管理クラス
	 *
	 * @version 0.9.0
	 * @since 0.0.1
	 *
	 */
	var Timer = (function (_super) {
	    __extends(Timer, _super);
	    /**
	     * コンストラクタ
	     *
	     * @version 0.9.0
	     * @since 0.0.1
	     *
	     */
	    function Timer() {
	        _super.call(this);
	        /**
	         * インターバル
	         *
	         * `13`は[jQuery](http://jquery.com/)を参考
	         *
	         * @version 0.0.8
	         * @since 0.0.8
	         *
	         */
	        this.interval = 13;
	        /**
	         * タイマーID
	         *
	         * @version 0.9.0
	         * @since 0.0.8
	         *
	         */
	        this._timerId = null;
	        this.now();
	    }
	    /**
	     * 遅延処理
	     *
	     * `wait`メソッドを実行したインスタンスを返す
	     * そのインスタンスは`stop`メソッドで止めることが可能
	     *
	     * @version 0.9.0
	     * @since 0.0.8
	     * @param delay 遅延時間
	     * @param callback 遅延後の処理
	     * @param context コンテクスト
	     * @return `wait`メソッドを実行したインスタンス
	     *
	     */
	    Timer.wait = function (time, callback, context) {
	        return new Timer().wait(time, callback, context);
	    };
	    /**
	     * 暗黙の型変換時の振る舞い
	     *
	     * @version 0.0.1
	     * @since 0.0.1
	     * @return 保持しているタイムスタンプ
	     *
	     */
	    Timer.prototype.valueOf = function () {
	        return this._currentTime.valueOf();
	    };
	    /**
	     * 時間を現在に更新する
	     *
	     * @version 0.0.1
	     * @since 0.0.1
	     * @return 更新した時間のタイムスタンプ
	     *
	     */
	    Timer.prototype.now = function () {
	        this._currentTime = new Date();
	        return this.valueOf();
	    };
	    /**
	     * タイマーをスタートする
	     * 継続中`progress`イベントを発行し続ける
	     * 継続時間を指定しなければずっと作動する
	     *
	     * 継続時間を指定して`stop`イベントだけを利用するようなケースでは
	     * `wait`メソッドを利用したほうが効率がよい
	     *
	     * @version 0.9.0
	     * @since 0.0.8
	     * @param time 継続時間
	     * @return インスタンス自身
	     *
	     * ```
	     * let timer = new Timer();
	     * timer.on('progress', (e, currentTime, startTime, context) => {
	     * 	context.stop();
	     * }).start();
	     * ```
	     *
	     */
	    Timer.prototype.start = function (time) {
	        var _this = this;
	        if (time === void 0) { time = Infinity; }
	        // call: 0
	        var START_TIMESTAMP = this.now();
	        clearTimeout(this._timerId);
	        // call: 1
	        var tick = function (time) {
	            // call: 3, 7, 12... onTick
	            _this._timerId = setTimeout(function () {
	                // call: 5, 10... onProgress
	                var now = _this.now();
	                var period = now - START_TIMESTAMP;
	                if (period < time) {
	                    // call: 6, 11... onKickTick
	                    tick(time);
	                    // call: 9, 14... onFireProgressHandler
	                    var e = new DispatchEvent('progress');
	                    _this.trigger(e, [now, START_TIMESTAMP, _this], _this);
	                    if (e.isDefaultPrevented()) {
	                        _this.stop();
	                    }
	                }
	                else {
	                    _this.stop();
	                }
	            }, _this.interval);
	            // call: 4, 8, 13... onStacked
	        };
	        // call: 2
	        tick(time);
	        return this;
	    };
	    /**
	     * タイマーをストップする
	     *
	     * @version 0.9.0
	     * @since 0.0.8
	     * @return インスタンス自身
	     *
	     */
	    Timer.prototype.stop = function () {
	        var now = this.now();
	        var e = new DispatchEvent('stop');
	        this.trigger(e, [now, this._timerId, this], this);
	        if (!e.isDefaultPrevented()) {
	            clearTimeout(this._timerId);
	            this._timerId = null;
	        }
	        return this;
	    };
	    /**
	     * 遅延処理
	     * `stop`メソッドで止めることが可能
	     *
	     * @version 0.9.0
	     * @since 0.0.8
	     * @param delay 遅延時間
	     * @param callback 遅延後の処理
	     * @param context コンテクスト
	     * @return インスタンス自身
	     *
	     * ```
	     * let timer = new Timer();
	     * timer.wait( (currentTime, startTime, context) => {
	     * 	context.stop();
	     * }).start();
	     * ```
	     *
	     */
	    Timer.prototype.wait = function (delay, callback, context) {
	        var _this = this;
	        context = context || this;
	        var START_TIMESTAMP = this.now();
	        clearTimeout(this._timerId);
	        this._timerId = setTimeout(function () {
	            _this.stop();
	            var now = _this.now();
	            callback.call(context, now, START_TIMESTAMP, context);
	        }, delay);
	        return this;
	    };
	    return Timer;
	})(EventDispatcher);
	module.exports = Timer;


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var BaserElement = __webpack_require__(12);
	var FormElement = __webpack_require__(15);
	var Browser = __webpack_require__(9);
	/**
	 * セレクトボックスの拡張クラス
	 *
	 * @version 0.9.0
	 * @since 0.0.1
	 *
	 */
	var Select = (function (_super) {
	    __extends(Select, _super);
	    /**
	     * コンストラクタ
	     *
	     * use: jQuery
	     *
	     * @version 0.9.0
	     * @since 0.0.1
	     * @param el 管理するDOM要素
	     * @param options オプション
	     *
	     */
	    function Select(el, options) {
	        _super.call(this, el, $.extend({}, Select.defaultOption, options));
	        // 既にエレメント化されていた場合は何もしない
	        if (this._elementized) {
	            return;
	        }
	        // IE6・7は反映させない
	        if (!el.querySelector) {
	            return;
	        }
	        this._update();
	    }
	    /**
	     * クラス名を設定する
	     *
	     * @version 0.4.0
	     * @since 0.4.0
	     * @override
	     *
	     */
	    Select.prototype._setClassName = function () {
	        _super.prototype._setClassName.call(this);
	        // セレクトボックス用のクラス名を設定
	        this.addClass(Select.classNameSelect);
	    };
	    /**
	     * ラップ要素を生成
	     *
	     * use: jQuery
	     *
	     * @version 0.9.0
	     * @since 0.4.0
	     * @override
	     *
	     */
	    Select.prototype._createWrapper = function () {
	        _super.prototype._createWrapper.call(this);
	        BaserElement.addClassTo(this.$wrapper, Select.classNameSelect + "-" + FormElement.classNameWrapper);
	    };
	    /**
	     * 擬似セレクトボックス要素を生成する
	     *
	     * use: jQuery
	     *
	     * @version 0.9.0
	     * @since 0.4.0
	     * @override
	     *
	     */
	    Select.prototype._createPsuedoElements = function () {
	        var _this = this;
	        this.$pseudo = $('<a />');
	        this.$pseudo.attr('href', '#'); // href属性がないとフォーカスを当てることができない
	        this.$pseudo.insertAfter(this.$el);
	        BaserElement.addClassTo(this.$pseudo, FormElement.classNameFormElementCommon);
	        BaserElement.addClassTo(this.$pseudo, Select.classNamePseudoSelect);
	        this.$selected = $('<span />');
	        this.$selected.appendTo(this.$pseudo);
	        BaserElement.addClassTo(this.$selected, FormElement.classNameFormElementCommon);
	        BaserElement.addClassTo(this.$selected, Select.classNamePseudoSelect, Select.classNamePseudoSelectedDisplay);
	        if (!this._config.useDefaultOptionList) {
	            this.$options = $('<ul />');
	            this.$options.appendTo(this.$pseudo);
	            BaserElement.addClassTo(this.$options, FormElement.classNameFormElementCommon);
	            BaserElement.addClassTo(this.$options, Select.classNamePseudoSelect, Select.classNameSelectOptionList);
	            this.$el.find('option').each(function (i, opt) {
	                var $opt = $(opt);
	                var value = $opt.val();
	                var text = $opt.text();
	                var $psuedoOpt = $('<li />');
	                $psuedoOpt.appendTo(_this.$options);
	                $psuedoOpt.data('value', value);
	                $psuedoOpt.text(text);
	                BaserElement.addClassTo($psuedoOpt, FormElement.classNameFormElementCommon);
	                BaserElement.addClassTo($psuedoOpt, Select.classNameSelectOptionList, Select.classNameSelectOption);
	            });
	        }
	        if (Browser.spec.isTouchable) {
	            if (Browser.spec.ua.iPhone || Browser.spec.ua.iPod) {
	                this.addClass(Select.classNameOsIOs);
	                BaserElement.addClassTo(this.$wrapper, Select.classNameOsIOs);
	                BaserElement.addClassTo(this.$label, Select.classNameOsIOs);
	            }
	            else if (Browser.spec.ua.android) {
	                this.addClass(Select.classNameOsAndroid);
	                BaserElement.addClassTo(this.$wrapper, Select.classNameOsAndroid);
	                BaserElement.addClassTo(this.$label, Select.classNameOsAndroid);
	            }
	        }
	        if (this._config.useDefaultOptionList) {
	            this.addClass(Select.classNameUseDefaultOptionList);
	            BaserElement.addClassTo(this.$wrapper, Select.classNameUseDefaultOptionList);
	            BaserElement.addClassTo(this.$label, Select.classNameUseDefaultOptionList);
	        }
	    };
	    /**
	     * イベントの登録
	     *
	     * use: jQuery
	     *
	     * @version 0.9.0
	     * @since 0.4.0
	     * @override
	     *
	     */
	    Select.prototype._bindEvents = function () {
	        var _this = this;
	        _super.prototype._bindEvents.call(this);
	        // changeイベントが起こった場合に実行するルーチン
	        this.$el.on('change.bcSelect', function () {
	            _this._update();
	        });
	        // 擬似option要素を選択した時に実行する
	        this.$pseudo.on('click.bcSelect', 'li', function (e) {
	            var $li = $(e.target);
	            var index = $li.index();
	            _this._onblur();
	            _this.setIndex(index);
	            e.stopPropagation();
	            e.preventDefault();
	        });
	        this.$pseudo.on('click.bcSelect', function (e) {
	            e.preventDefault();
	        });
	        if (!this._config.useDefaultOptionList) {
	            this._psuedoFocusEvent();
	        }
	        else {
	            // href属性を削除することでフォーカスがあたらなくなる
	            this.$pseudo.removeAttr('href');
	        }
	    };
	    /**
	     * 他のオブジェクトにchangeイベントを発火・伝達せずに実行されるチェンジ処理
	     *
	     * @version 0.4.0
	     * @since 0.4.0
	     *
	     */
	    Select.prototype._onSilentChange = function () {
	        this._update();
	    };
	    /**
	     * 要素の状態を更新する
	     *
	     * @version 0.8.0
	     * @since 0.0.1
	     * @return インスタンス自身
	     *
	     */
	    Select.prototype.update = function () {
	        this._update();
	        return this;
	    };
	    /**
	     * 値を設定する
	     *
	     * use: jQuery
	     *
	     * @version 0.9.0
	     * @since 0.4.0
	     * @override
	     * @param value 設定したい値
	     *
	     */
	    Select.prototype.setValue = function (value) {
	        var valueString = "" + value;
	        var $targetOption = this.$el.find("option[value=\"" + valueString + "\"]");
	        if ($targetOption.length && !$targetOption.prop('selected')) {
	            $targetOption.prop('selected', true);
	            this._fireChangeEvent();
	        }
	    };
	    /**
	     * インデックス番号から選択する
	     *
	     * use: jQuery
	     *
	     * @version 0.9.0
	     * @since 0.4.0
	     * @param index 対象のインデックス番号
	     * @param isSilent イベントを伝達しない
	     *
	     */
	    Select.prototype.setIndex = function (index, isSilent) {
	        if (isSilent === void 0) { isSilent = false; }
	        var $targetOption = this.$el.find('option').eq(index);
	        if ($targetOption.length && !$targetOption.prop('selected') && !$targetOption.prop('disabled')) {
	            $targetOption.prop('selected', true);
	            this._fireChangeEvent(isSilent);
	        }
	    };
	    /**
	     * 現在の選択中のインデックス番号を取得する
	     *
	     * use: jQuery
	     *
	     * @version 0.9.0
	     * @since 0.4.0
	     * @return インデックス番号
	     *
	     */
	    Select.prototype.getIndex = function () {
	        var currentIndex = 0;
	        this.$el.find('option').each(function (i, el) {
	            var $opt = $(el);
	            if ($opt.prop('selected')) {
	                currentIndex = $opt.index();
	            }
	        });
	        return currentIndex;
	    };
	    /**
	     * 次の項目を選択する
	     *
	     * @version 0.9.0
	     * @since 0.4.0
	     * @param isSilent イベントを伝達しない
	     *
	     */
	    Select.prototype.next = function (isSilent) {
	        var currentIndex = this.getIndex();
	        var max = this.$el.find('option').length;
	        var nextIndex = currentIndex + 1;
	        this.setIndex(Math.min(nextIndex, max), isSilent);
	    };
	    /**
	     * 前の項目を選択する
	     *
	     * @version 0.9.0
	     * @since 0.4.0
	     * @param isSilent イベントを伝達しない
	     *
	     */
	    Select.prototype.prev = function (isSilent) {
	        var currentIndex = this.getIndex();
	        var prevIndex = currentIndex - 1;
	        this.setIndex(Math.max(prevIndex, 0), isSilent);
	    };
	    /**
	     * 無効状態を設定する
	     *
	     * use: jQuery
	     *
	     * @version 0.9.0
	     * @since 0.4.1
	     * @override
	     *
	     */
	    Select.prototype.setDisabled = function (isDisabled) {
	        _super.prototype.setDisabled.call(this, isDisabled);
	        if (this.disabled) {
	            this.$pseudo.attr('tabindex', -1);
	        }
	        else {
	            this.$pseudo.removeAttr('tabindex');
	        }
	    };
	    /**
	     * フォーカスがあたった時の処理
	     *
	     * use: jQuery
	     *
	     * @version 0.4.1
	     * @since 0.0.1
	     * @override
	     *
	     */
	    Select.prototype._onfocus = function () {
	        if (!this.hasFocus) {
	            // 全体のフォーカスを外す
	            $(document).triggerHandler('click.bcSelect');
	            // 親クラスのフォーカスを実行
	            _super.prototype._onfocus.call(this);
	            // DOMのclassを制御
	            BaserElement.addClassTo(this.$pseudo, Select.classNamePseudoSelect, '', FormElement.classNameStateFocus);
	            BaserElement.removeClassFrom(this.$pseudo, Select.classNamePseudoSelect, '', FormElement.classNameStateBlur);
	            // スクロール位置を調整する
	            this._scrollToSelectedPosition();
	            // 一覧を開いた時のインデックス番号を記録する
	            this._currentIndex = this.getIndex();
	        }
	    };
	    /**
	     * フォーカスがはずれた時の処理
	     *
	     * use: jQuery
	     *
	     * @version 0.1.0
	     * @since 0.0.1
	     *
	     */
	    Select.prototype._onblur = function () {
	        // 一旦 コンストラクタのsuper()の中で_onblur()が$pseudoプロパティを作成する前に呼び出されるため
	        if (this.$pseudo) {
	            _super.prototype._onblur.call(this);
	            BaserElement.addClassTo(this.$pseudo, Select.classNamePseudoSelect, '', FormElement.classNameStateBlur);
	            BaserElement.removeClassFrom(this.$pseudo, Select.classNamePseudoSelect, '', FormElement.classNameStateFocus);
	        }
	    };
	    /**
	     * 要素の状態を更新する
	     *
	     * use: jQuery
	     *
	     * FIXME: 要素が足りない場合の考慮が不足している気がする
	     *
	     * @version 0.9.0
	     * @since 0.0.1
	     *
	     */
	    Select.prototype._update = function () {
	        var _this = this;
	        var $psuedoOptList;
	        if (this.$options) {
	            $psuedoOptList = this.$options.find('li');
	        }
	        this.$el.find('option').each(function (i, opt) {
	            var $opt = $(opt);
	            var isSelected = $opt.prop('selected');
	            if (isSelected) {
	                _this.$selected.text($opt.text());
	            }
	            if (_this.$options) {
	                var isDisabled = $opt.prop('disabled');
	                var $psuedoOpt = $psuedoOptList.eq(i);
	                $psuedoOpt.attr('aria-selected', "" + isSelected);
	                $psuedoOpt.attr('aria-disabled', "" + isDisabled);
	                if (isSelected) {
	                    BaserElement.addClassTo($psuedoOpt, Select.classNameSelectOptionList, Select.classNameSelectOption, Select.classNameStateSelected);
	                    BaserElement.removeClassFrom($psuedoOpt, Select.classNameSelectOptionList, Select.classNameSelectOption, Select.classNameStateUnselected);
	                }
	                else {
	                    BaserElement.addClassTo($psuedoOpt, Select.classNameSelectOptionList, Select.classNameSelectOption, Select.classNameStateUnselected);
	                    BaserElement.removeClassFrom($psuedoOpt, Select.classNameSelectOptionList, Select.classNameSelectOption, Select.classNameStateSelected);
	                }
	                if (isDisabled) {
	                    BaserElement.addClassTo($psuedoOpt, Select.classNameSelectOptionList, Select.classNameSelectOption, Select.classNameStateDisabled);
	                }
	                else {
	                    BaserElement.removeClassFrom($psuedoOpt, Select.classNameSelectOptionList, Select.classNameSelectOption, Select.classNameStateDisabled);
	                }
	            }
	        });
	    };
	    /**
	     * スクロール位置を調整する
	     *
	     * use: jQuery
	     *
	     * @version 0.9.0
	     * @since 0.1.0
	     *
	     */
	    Select.prototype._scrollToSelectedPosition = function () {
	        if (this.$options) {
	            var $selectedPsuedoOpt;
	            var $psuedoOptList = this.$options.find('li');
	            this.$el.find('option').each(function (i, opt) {
	                var $opt = $(opt);
	                var isSelected = $opt.prop('selected');
	                if (isSelected) {
	                    $selectedPsuedoOpt = $psuedoOptList.eq(i);
	                }
	            });
	            // ポジションを正しく取得するために一度スクロール位置をリセットする
	            this.$options.scrollTop(0);
	            var optPos = $selectedPsuedoOpt.offset();
	            var cntPos = this.$options.offset();
	            if (optPos && cntPos) {
	                this.$options.scrollTop(optPos.top - cntPos.top);
	            }
	        }
	    };
	    /**
	     * 擬似要素にフォーカスがあったった時のイベントと伝達を制御する
	     *
	     * use: jQuery
	     *
	     * @version 0.4.0
	     * @since 0.0.1
	     *
	     */
	    Select.prototype._psuedoFocusEvent = function () {
	        var _this = this;
	        this.$el.off('focus.bcFormElement');
	        this.$el.off('blur.bcFormElement');
	        // セレクトボックス本体にフォーカスがあたったら、
	        // 擬似要素のほうへフォーカスを即座に移動させる
	        this.$el.on('focus.bcSelect', function (e) {
	            if (!_this.disabled) {
	                _this.$pseudo.focus();
	            }
	            e.stopPropagation();
	            e.preventDefault();
	        });
	        // ドキュメントのどこかをフォーカスorクリックしたらフォーカスがはずれる
	        // ※_onfocus()からも呼び出される
	        $(document).on('click.bcSelect', function (e) {
	            _this._onblur();
	        });
	        // documentへ伝達するフォーカスは focusin イベント
	        $(document).on('focusin', function (e) {
	            _this._onblur();
	        });
	        // 擬似セレクトボックスにフォーカスorクリックが起こった時に発火する
	        this.$pseudo
	            .on('focus.bcSelect', function (e) {
	            if (!_this.disabled) {
	                _this._onfocus();
	            }
	            else {
	                _this.$pseudo.blur();
	            }
	            // ドキュメントに伝達しない
	            e.stopPropagation();
	        })
	            .on('click.bcSelect', function (e) {
	            if (!_this.disabled) {
	                _this._onfocus();
	            }
	            // ドキュメントに伝達しない
	            e.stopPropagation();
	            // href="#"なのでデフォルトイベントを抑制
	            e.preventDefault();
	        });
	        // ドキュメントへのフォーカスorクリック伝達を抑制
	        this.$label.on('click.bcSelect focus.bcSelect', function (e) {
	            // ドキュメントに伝達しない
	            e.stopPropagation();
	        });
	        this._bindKeybordEvent();
	    };
	    /**
	     * フォーカス時のキーボードイベント
	     *
	     * use: jQuery
	     *
	     * TODO: KeyCodeの数値をマジックナンバーにせずに定数から参照するようにする
	     *
	     * @version 0.4.0
	     * @since 0.4.0
	     *
	     */
	    Select.prototype._bindKeybordEvent = function () {
	        var _this = this;
	        $(document).on('keydown', function (e) {
	            if (_this.hasFocus) {
	                switch (e.keyCode) {
	                    case 38:
	                        {
	                            // keyUp
	                            _this.prev(true);
	                            _this._scrollToSelectedPosition();
	                            e.preventDefault();
	                        }
	                        break;
	                    case 40:
	                        {
	                            // keyDown
	                            _this.next(true);
	                            _this._scrollToSelectedPosition();
	                            e.preventDefault();
	                        }
	                        break;
	                    case 13:
	                        {
	                            // Return (Enter)
	                            if (_this._currentIndex !== _this.getIndex()) {
	                                _this._fireChangeEvent();
	                            }
	                            _this._onblur();
	                            e.preventDefault();
	                        }
	                        break;
	                    default: {
	                    }
	                }
	            }
	        });
	    };
	    /**
	     * オプションのデフォルト値
	     *
	     * @version 0.4.0
	     * @since 0.4.0
	     *
	     */
	    Select.defaultOption = {
	        useDefaultOptionList: Browser.spec.isTouchable && Browser.spec.ua.iPhone || Browser.spec.ua.iPod || Browser.spec.ua.android
	    };
	    /**
	     * Select要素のクラス
	     *
	     * @version 0.1.0
	     * @since 0.1.0
	     *
	     */
	    Select.classNameSelect = 'form-select';
	    /**
	     * Select要素の擬似要素のクラス
	     *
	     * @version 0.1.0
	     * @since 0.1.0
	     *
	     */
	    Select.classNamePseudoSelect = 'pseudo-select';
	    /**
	     * Select要素の選択した値を表示する擬似要素のクラス
	     *
	     * @version 0.1.0
	     * @since 0.1.0
	     *
	     */
	    Select.classNamePseudoSelectedDisplay = 'selected-display';
	    /**
	     * Select要素のoption要素をのクラス
	     *
	     * @version 0.1.0
	     * @since 0.1.0
	     *
	     */
	    Select.classNameSelectOptionList = 'option-list';
	    /**
	     * Select要素のoption要素のクラス
	     *
	     * @version 0.1.0
	     * @since 0.1.0
	     *
	     */
	    Select.classNameSelectOption = 'item';
	    /**
	     * iOSの場合に付加されるクラス
	     *
	     * @version 0.1.0
	     * @since 0.1.0
	     *
	     */
	    Select.classNameOsIOs = 'os-i-os';
	    /**
	     * Androidの場合に付加されるクラス
	     *
	     * @version 0.1.0
	     * @since 0.1.0
	     *
	     */
	    Select.classNameOsAndroid = 'os-android';
	    /**
	     * ブラウザデフォルトの選択リストを使用する場合に付加されるクラス
	     *
	     * @version 0.4.0
	     * @since 0.4.0
	     *
	     */
	    Select.classNameUseDefaultOptionList = 'use-default-option-list';
	    /**
	     * Select要素の擬似option要素の選択時に付加されるクラス
	     *
	     * @version 0.1.0
	     * @since 0.1.0
	     *
	     */
	    Select.classNameStateSelected = 'selected';
	    /**
	     * Select要素の擬似option要素の選択がはずれた時に付加されるクラス
	     *
	     * @version 0.1.0
	     * @since 0.1.0
	     *
	     */
	    Select.classNameStateUnselected = 'unselected';
	    return Select;
	})(FormElement);
	module.exports = Select;


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var EventDispatcher = __webpack_require__(6);
	var Timer = __webpack_require__(21);
	/**
	 * 非同期逐次処理クラス
	 *
	 * @version 0.9.0
	 * @since 0.4.0
	 *
	 */
	var Sequence = (function (_super) {
	    __extends(Sequence, _super);
	    /**
	     * コンストラクタ
	     *
	     * @version 0.9.0
	     * @since 0.4.0
	     * @param tasks タスク
	     *
	     */
	    function Sequence(tasks) {
	        _super.call(this);
	        /**
	         * シーケンスの持つタスク
	         *
	         * @version 0.4.0
	         * @since 0.4.0
	         *
	         */
	        this._tasks = [];
	        /**
	         * 現在実行中のタスク番号
	         *
	         * @version 0.9.0
	         * @since 0.4.0
	         *
	         */
	        this._currentTaskIndex = 0;
	        /**
	         * タスクを実行したトータルカウント数
	         *
	         * @version 0.4.0
	         * @since 0.4.0
	         *
	         */
	        this._iterator = 0;
	        /**
	         * シーケンスのプロミスオブジェクト
	         *
	         * @version 0.4.0
	         * @since 0.4.0
	         *
	         */
	        this._promise = null;
	        /**
	         * シーケンスのリゾルバ
	         *
	         * @version 0.4.0
	         * @since 0.4.0
	         *
	         */
	        this._resolver = null;
	        /**
	         * 遅延時間
	         *
	         * @version 0.4.0
	         * @since 0.4.0
	         *
	         */
	        this._waitingTime = 0;
	        /**
	         * 遅延用タイマー
	         *
	         * @version 0.9.0
	         * @since 0.4.0
	         *
	         */
	        this._waitTimer = new Timer();
	        /**
	         * 停止状態
	         *
	         * @version 0.4.0
	         * @since 0.4.0
	         *
	         */
	        this._isStop = true;
	        for (var _i = 0; _i < tasks.length; _i++) {
	            var task = tasks[_i];
	            this._tasks.push(new Task(task, this));
	        }
	    }
	    /**
	     * タスクの実行
	     * TODO: ネイティブのPromiseを使う
	     *
	     * @version 0.9.0
	     * @since 0.4.0
	     * @param value タスクに渡すデータ
	     * @param isLoop 最後のタスクが終了したあとに最初に戻ってループ処理をするかどうか
	     * @return インスタンス自身
	     *
	     */
	    Sequence.prototype.act = function (value, isLoop) {
	        var _this = this;
	        if (isLoop === void 0) { isLoop = false; }
	        // ストップ状態解除
	        this._isStop = false;
	        // TODO: 引数の設計とテスト書く
	        this.trigger('beforeact');
	        // タスク取得
	        var task = this._tasks[this._currentTaskIndex];
	        // タスク実行
	        var result = task.act(value);
	        // 戻り値によるプロミスの設定
	        this._setPromiseFrom(result);
	        // プロミスの結果から次のタスクを実行
	        this._promise.done(function (doneResult) {
	            _this._reset();
	            _this._currentTaskIndex += 1;
	            _this._iterator += 1;
	            if (!_this._isStop && (_this._currentTaskIndex < _this._tasks.length || isLoop)) {
	                if (_this._currentTaskIndex >= _this._tasks.length && isLoop) {
	                    _this._currentTaskIndex = 0;
	                }
	                _this.act(doneResult, isLoop);
	            }
	            else {
	                // TODO: 引数の設計とテスト書く
	                _this.trigger('stop');
	            }
	        }).fail(function () {
	            _this._reset();
	            // TODO: 引数の設計とテスト書く
	            _this.trigger('exit');
	            _this.trigger('stop');
	        });
	        return this;
	    };
	    /**
	     * ループでタスクの実行
	     *
	     * @version 0.4.0
	     * @since 0.4.0
	     *
	     */
	    Sequence.prototype.loop = function (value) {
	        return this.act(value, true);
	    };
	    /**
	     * シーケンス処理から抜ける
	     *
	     * @version 0.9.0
	     * @since 0.4.0
	     *
	     */
	    Sequence.prototype.exit = function () {
	        this._isStop = true;
	        if (this._resolver) {
	            this._resolver.reject();
	        }
	        return this;
	    };
	    /**
	     * 遅延時間を設定する
	     *
	     * @version 0.4.0
	     * @since 0.4.0
	     *
	     */
	    Sequence.prototype.wait = function (watingTime) {
	        this._waitingTime = watingTime;
	    };
	    /**
	     * タスクを実行したトータルカウント数を取得
	     *
	     * @version 0.9.0
	     * @since 0.9.0
	     *
	     */
	    Sequence.prototype.getCount = function () {
	        return this._iterator;
	    };
	    /**
	     * プロミスの設定
	     * TODO: ネイティブのPromiseを使う
	     * TODO: this._waitTimerのTimerクラスにcancelイベントを実装してリゾルバのリジェクトを実装する
	     *
	     * @version 0.9.0
	     * @since 0.9.0
	     *
	     */
	    Sequence.prototype._setPromiseFrom = function (value) {
	        var _this = this;
	        if (this._isJQueryPromiseLikeObject(value)) {
	            // 値がプロミスであればそのままそれを設定
	            this._promise = value.promise();
	        }
	        else {
	            // 値がプロミスでない場合は
	            // プロミスを生成してリゾルバへ一時的に設定
	            this._resolver = $.Deferred();
	            this._promise = this._resolver.promise();
	            // タイマーを使い遅延実行後リゾルバからプロミスを解決
	            this._waitTimer.wait(this._waitingTime, function () {
	                _this._resolver.resolve(value);
	            });
	            // TODO: Timerクラス側が未実装
	            this._waitTimer.on('cencel', function () {
	                _this._resolver.reject(value);
	            });
	        }
	    };
	    /**
	     * 次のタスクを実行するために一時的なオブジェクトをリセットする
	     *
	     * @version 0.9.0
	     * @since 0.9.0
	     *
	     */
	    Sequence.prototype._reset = function () {
	        this._waitTimer.stop();
	        this._promise = null;
	        this._resolver = null;
	        this._waitingTime = 0;
	    };
	    /**
	     * jQuery Promiseに近いオブジェクト化どうかを判定する
	     *
	     * @version 0.9.0
	     * @since 0.4.0
	     * @param object 対象のオブジェクト
	     * @return 判定結果
	     *
	     */
	    Sequence.prototype._isJQueryPromiseLikeObject = function (object) {
	        // 以下列挙したプロパティのみをメンバにもち、かつ全て関数オブジェクトであること
	        var PROPS = [
	            'always',
	            'done',
	            'fail',
	            'pipe',
	            'progress',
	            'promise',
	            'state',
	            'then',
	        ];
	        if (object instanceof jQuery) {
	            return !!object.promise;
	        }
	        else {
	            object = Object(object);
	            while (PROPS.length) {
	                var propsName = PROPS.shift();
	                if (!(propsName in object && $.isFunction(object[propsName]))) {
	                    return false;
	                }
	            }
	            return true;
	        }
	    };
	    return Sequence;
	})(EventDispatcher);
	/**
	 * タスクのクラス
	 *
	 * @private
	 * @version 0.9.0
	 * @since 0.4.0
	 *
	 */
	var Task = (function () {
	    /**
	     * コンストラクタ
	     *
	     * @version 0.9.0
	     * @since 0.4.0
	     *
	     */
	    function Task(func, sequencer) {
	        this._func = func;
	        this._sequencer = sequencer;
	    }
	    /**
	     * タスクの実行
	     *
	     * @version 0.9.0
	     * @since 0.4.0
	     * @param value タスクに渡すデータ
	     * @return 実行したタスクの戻り値
	     *
	     */
	    Task.prototype.act = function (value) {
	        var result = this._func.call(this._sequencer, this._sequencer.getCount(), value);
	        return result;
	    };
	    return Task;
	})();
	module.exports = Sequence;


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var BaserElement = __webpack_require__(12);
	var FormElement = __webpack_require__(15);
	/**
	 * テキストフィールドの拡張クラス
	 *
	 * @version 0.9.0
	 * @since 0.4.0
	 *
	 */
	var TextField = (function (_super) {
	    __extends(TextField, _super);
	    /**
	     * コンストラクタ
	     *
	     * use: jQuery
	     *
	     * @version 0.9.0
	     * @since 0.4.0
	     * @param el 管理するDOM要素
	     * @param options オプション
	     *
	     */
	    function TextField(el, options) {
	        _super.call(this, el, $.extend({}, TextField.defaultOption, options));
	        /**
	         * プレースホルダーテキスト
	         *
	         * @version 0.4.0
	         * @since 0.4.0
	         *
	         */
	        this.placeholder = '';
	        // 既にエレメント化されていた場合は何もしない
	        if (this._elementized) {
	            return;
	        }
	        // IE6・7は反映させない
	        if (!el.querySelector) {
	            return;
	        }
	        this.placeholder = this.$el.attr('placeholder') || '';
	        this.hasPlaceholder = !!this.placeholder;
	        this._update();
	    }
	    /**
	     * クラス名を設定する
	     *
	     * @version 0.4.0
	     * @since 0.4.0
	     * @override
	     *
	     */
	    TextField.prototype._setClassName = function () {
	        _super.prototype._setClassName.call(this);
	        // セレクトボックス用のクラス名を設定
	        this.addClass(TextField.classNameTextField);
	    };
	    /**
	     * ラップ要素を生成
	     *
	     * use: jQuery
	     *
	     * @version 0.4.0
	     * @since 0.4.0
	     * @override
	     *
	     */
	    TextField.prototype._createWrapper = function () {
	        _super.prototype._createWrapper.call(this);
	        BaserElement.addClassTo(this.$wrapper, TextField.classNameTextField + '-' + FormElement.classNameWrapper);
	    };
	    /**
	     * イベントの登録
	     *
	     * use: jQuery
	     *
	     * @version 0.4.1
	     * @since 0.4.0
	     * @override
	     *
	     */
	    TextField.prototype._bindEvents = function () {
	        var _this = this;
	        _super.prototype._bindEvents.call(this);
	        // keyupイベントが起こった場合に実行するルーチン
	        $(document).on('keyup.bcTextField-' + this.id, function (e) {
	            if (_this.hasFocus) {
	                _this._update();
	            }
	        });
	        // プレースホルダーをサポートしていない時のイベント処理
	        if (!TextField.supportPlaceholder) {
	            // フォーカスを当てた時・クリックをしたときにプレースホルダーと値が同じだった場合
	            // カーソル（キャレット）を先頭に持っていく
	            this.$el.on('focus.bcTextField click.bcTextField', function () {
	                if (_this._equalPlaceholder()) {
	                    _this._msCaretMoveToTop();
	                }
	            });
	            // キーボードを押した瞬間に、プレースホルダーと値が同じだった場合
	            // プレースホルダーの値を消して、空にする
	            // TODO: 文字以外のキーを押すと一瞬値が消える（クリティカルでないため保留）
	            $(document).on('keydown.bcTextField-' + this.id, function (e) {
	                if (_this.hasFocus) {
	                    if (_this._equalPlaceholder()) {
	                        _this.$el.val('');
	                    }
	                }
	            });
	        }
	    };
	    /**
	     * 要素の状態を更新する
	     *
	     * use: jQuery
	     *
	     * @version 0.9.0
	     * @since 0.4.0
	     *
	     */
	    TextField.prototype._update = function () {
	        var currentValue = this.$el.val() || '';
	        var isEmpty = !currentValue;
	        if (TextField.supportPlaceholder) {
	            if (isEmpty) {
	                this._setStateUninputted();
	            }
	            else {
	                this._setStateInputted();
	            }
	        }
	        else {
	            if (this._equalPlaceholder()) {
	                this._setStateUninputted();
	            }
	            else {
	                if (isEmpty) {
	                    this._setStateUninputted();
	                    this._setPlaceholderValue();
	                }
	                else {
	                    this._setStateInputted();
	                }
	            }
	        }
	    };
	    /**
	     * 入力されている状態を設定する
	     *
	     * use: jQuery
	     *
	     * @version 0.9.0
	     * @since 0.4.0
	     *
	     */
	    TextField.prototype._setStateInputted = function () {
	        this.isEmpty = false;
	        BaserElement.removeClass(this.el, FormElement.classNameFormElementCommon, '', TextField.classNameStateUninput);
	        BaserElement.removeClassFrom(this.$label, FormElement.classNameFormElementCommon, FormElement.classNameLabel, TextField.classNameStateUninput);
	        BaserElement.removeClassFrom(this.$wrapper, FormElement.classNameWrapper, '', TextField.classNameStateUninput);
	    };
	    /**
	     * 入力されていない状態を設定する
	     *
	     * use: jQuery
	     *
	     * @version 0.9.0
	     * @since 0.4.0
	     *
	     */
	    TextField.prototype._setStateUninputted = function () {
	        this.isEmpty = true;
	        BaserElement.addClass(this.el, FormElement.classNameFormElementCommon, '', TextField.classNameStateUninput);
	        BaserElement.addClassTo(this.$label, FormElement.classNameFormElementCommon, FormElement.classNameLabel, TextField.classNameStateUninput);
	        BaserElement.addClassTo(this.$wrapper, FormElement.classNameWrapper, '', TextField.classNameStateUninput);
	    };
	    /**
	     * プレースホルダーと値が同じかどうか
	     *
	     * use: jQuery
	     *
	     * @version 0.9.0
	     * @since 0.4.0
	     *
	     */
	    TextField.prototype._equalPlaceholder = function () {
	        var currentValue = this.$el.val() || '';
	        return this.placeholder === currentValue;
	    };
	    /**
	     * プレースホルダーの値を設定する
	     *
	     * use: jQuery
	     *
	     * @version 0.4.0
	     * @since 0.4.0
	     *
	     */
	    TextField.prototype._setPlaceholderValue = function () {
	        this.$el.val(this.placeholder);
	        this._msCaretMoveToTop();
	    };
	    /**
	     * 【IE用】カーソル（キャレット）を先頭に持っていく
	     *
	     * @version 0.9.0
	     * @since 0.4.0
	     *
	     */
	    TextField.prototype._msCaretMoveToTop = function () {
	        // TODO: MS用の型を調査して定義
	        var input = this.el;
	        var range = input.createTextRange();
	        range.collapse();
	        range.moveStart('character', 0);
	        range.moveEnd('character', 0);
	        range.select();
	    };
	    /**
	     * オプションのデフォルト値
	     *
	     * @version 0.4.0
	     * @since 0.4.0
	     *
	     */
	    TextField.defaultOption = {};
	    /**
	     * TextField要素のクラス
	     *
	     * @version 0.4.0
	     * @since 0.4.0
	     *
	     */
	    TextField.classNameTextField = 'form-text-field';
	    /**
	     * 未入力状態に付加されるクラス
	     *
	     * @version 0.4.0
	     * @since 0.4.0
	     *
	     */
	    TextField.classNameStateUninput = 'uninput';
	    /**
	     * プレースホルダー属性に対応しているかどうか
	     *
	     * @version 0.4.0
	     * @since 0.4.0
	     *
	     */
	    TextField.supportPlaceholder = $('<input />').prop('placeholder') !== undefined;
	    return TextField;
	})(FormElement);
	module.exports = TextField;


/***/ },
/* 25 */
/***/ function(module, exports) {

	/**
	 * ユーティリティ配列クラス
	 *
	 * @version 0.9.0
	 * @since 0.2.0
	 *
	 */
	var UtilArray = (function () {
	    function UtilArray() {
	    }
	    /**
	     * 配列中の対象の要素が一番最初に存在するインデックス番号を返す
	     * 存在しない場合は -1 を返す
	     *
	     * IE8のためのpolyfill
	     * ※Array.prototype.indexOfを完全に再現しているわけではない
	     *
	     * @version 0.9.0
	     * @since 0.2.0
	     * @param array 対象の配列
	     * @param searchElement 検索対象
	     * @return 検索結果の番号
	     *
	     */
	    UtilArray.indexOf = function (array, searchElement) {
	        if (Array.prototype.indexOf) {
	            return array.indexOf(searchElement);
	        }
	        var i = 0;
	        for (var _i = 0; _i < array.length; _i++) {
	            var item = array[_i];
	            if (searchElement === item) {
	                return i;
	            }
	            i++;
	        }
	        return -1;
	    };
	    /**
	     * 配列中の指定の番号の要素を削除して詰める
	     *
	     * @version 0.2.0
	     * @since 0.2.0
	     * @param array 対象の配列
	     * @param index 削除する番号
	     * @return 削除された配列
	     *
	     */
	    UtilArray.remove = function (array, index) {
	        array.splice(index, 1);
	        return array;
	    };
	    /**
	     * 配列をランダムに入れ替えて返す
	     *
	     * Fisher-Yates法
	     *
	     * @version 0.10.0
	     * @since 0.10.0
	     * @param array 対象の配列
	     * @return ランダムに入れ替えられた配列
	     *
	     */
	    UtilArray.shuffle = function (array) {
	        var newArray = array.concat();
	        var n = newArray.length;
	        for (var i = (n - 1); i >= 0; i--) {
	            var random = Math.floor(Math.random() * (i + 1));
	            var tmp = newArray[i];
	            newArray[i] = newArray[random];
	            newArray[random] = tmp;
	        }
	        return newArray;
	    };
	    return UtilArray;
	})();
	module.exports = UtilArray;


/***/ },
/* 26 */
/***/ function(module, exports) {

	/**
	 * ユーティリティ算術クラス
	 *
	 * @version 0.9.0
	 * @since 0.0.2
	 *
	 */
	var UtilMath = (function () {
	    function UtilMath() {
	    }
	    /**
	     * 指定の範囲のランダムな数を返す
	     *
	     * @version 0.9.0
	     * @since 0.2.0
	     * @param base 基準の数
	     * @param dist 基準からこの数までの範囲の乱数になる
	     * @return 乱数
	     *
	     */
	    UtilMath.random = function (base, dist) {
	        if (base === void 0) { base = 1; }
	        if (dist === void 0) { dist = 0; }
	        var random = Math.random();
	        var from = Math.min(base, dist);
	        var to = Math.max(base, dist);
	        return random * (to - from) + from;
	    };
	    /**
	     * 配列内の数値の合計を算出する
	     *
	     * @version 0.9.0
	     * @since 0.2.0
	     * @param numberList 数の配列
	     * @return 合計値
	     *
	     */
	    UtilMath.sum = function (numberList) {
	        var numbers = numberList.slice();
	        var result = 0;
	        while (numbers.length) {
	            result += numbers.shift();
	        }
	        return result;
	    };
	    /**
	     * 均等に分割する
	     *
	     * @version 0.9.0
	     * @since 0.2.0
	     * @param n 分割される数
	     * @param devide 分割する数
	     * @return 分割された数値で構成された配列
	     *
	     */
	    UtilMath.split = function (n, devide) {
	        var result = [];
	        n = Math.floor(n);
	        devide = Math.floor(devide);
	        // 分割した数
	        var splited = Math.floor(n / devide);
	        if (0 < devide) {
	            var i = devide;
	            // 余り
	            var rem = n % devide;
	            // 余りの数だけ+1される
	            var addtion = rem;
	            while (i--) {
	                if (0 < addtion || rem < 0 && 0 === addtion) {
	                    result.push(splited + 1);
	                }
	                else {
	                    result.push(splited);
	                }
	                addtion += rem < 0 ? 1 : -1;
	            }
	        }
	        return result;
	    };
	    return UtilMath;
	})();
	module.exports = UtilMath;


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var UtilArray = __webpack_require__(25);
	var BaserElement = __webpack_require__(12);
	var Browser = __webpack_require__(9);
	/**
	 * YouTube要素
	 *
	 * TODO: YouTubeのURLパラメータのinterfaceをつくる
	 *
	 * @version 0.10.0
	 * @since 0.0.7
	 *
	 */
	var YouTube = (function (_super) {
	    __extends(YouTube, _super);
	    /**
	     * コンストラクタ
	     *
	     * use: jQuery
	     *
	     * @version 0.9.0
	     * @since 0.0.7
	     * @param el 管理するDOM要素
	     * @param options オプション
	     *
	     */
	    function YouTube(el, options) {
	        _super.call(this, el);
	        /**
	         * プレイヤーが有効になっているかどうか
	         *
	         * @version 0.5.0
	         * @since 0.5.0
	         *
	         */
	        this.isEmbeded = false;
	        // 既にエレメント化されていた場合は何もしない
	        if (this._elementized) {
	            return;
	        }
	        // IE6・7は反映させない
	        if (!el.querySelector) {
	            return;
	        }
	        if (this._init(options)) {
	            YouTube.movies.push(this);
	            this.$el.addClass(YouTube.className);
	            this.$el.data(YouTube.className, this);
	        }
	    }
	    /**
	     * YouTubeのiframeのソースURIを生成する
	     *
	     * @version 0.9.1
	     * @since 0.9.1
	     */
	    YouTube.getURI = function (movieId, param) {
	        var paramQuery = $.param(param);
	        return "" + Browser.apiScheme + YouTube.PLAYER_URL + movieId + "?" + paramQuery;
	    };
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
	        return "" + Browser.apiScheme + THUMB_URL + movieId + THUMB_FILE_NAME;
	    };
	    /**
	     * 再設定する
	     *
	     * @version 0.0.7
	     * @since 0.0.7
	     * @param options オプション
	     *
	     */
	    YouTube.prototype.reload = function (options) {
	        this._init(options);
	    };
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
	    /**
	     * ミュートのオンオフを要素にアサインする
	     *
	     * TODO: 別のクラスにする
	     *
	     * use: jQuery
	     *
	     * @version 0.9.0
	     * @since 0.5.0
	     * @param $el アサインするDOM要素のjQueryオブジェクト
	     * @param options オプション
	     *
	     */
	    YouTube.prototype.muteController = function (el, options) {
	        var _this = this;
	        var $el = $(el);
	        var defaults = {
	            eventType: 'click',
	            mutedClass: 'is-muted',
	            unmutedClass: 'is-unmuted',
	            baseClass: 'youtube-mute-ctrl'
	        };
	        var conf = $.extend(defaults, options);
	        BaserElement.addClassTo($el, conf.baseClass);
	        var update = function () {
	            if (_this._isMuted) {
	                BaserElement.addClassTo($el, conf.baseClass, '', conf.mutedClass);
	                BaserElement.removeClassFrom($el, conf.baseClass, '', conf.unmutedClass);
	            }
	            else {
	                BaserElement.addClassTo($el, conf.baseClass, '', conf.unmutedClass);
	                BaserElement.removeClassFrom($el, conf.baseClass, '', conf.mutedClass);
	            }
	        };
	        var bindCtrl = function () {
	            $el.on(conf.eventType, function (e) {
	                if (_this._isMuted) {
	                    _this.unMute();
	                }
	                else {
	                    _this.mute();
	                }
	                update();
	            });
	            update();
	        };
	        this.on('onmute onunmute', function () {
	            update();
	        });
	        if (this.isEmbeded) {
	            bindCtrl();
	        }
	        else {
	            this.on('embeded', function (e, ytp) {
	                _this.off(e.type);
	                bindCtrl();
	            });
	        }
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
	     * @version 0.10.0
	     * @since 0.0.7
	     * @param $el 管理するDOM要素のjQueryオブジェクト
	     * @param options オプション
	     * @return 初期化が成功したかどうか
	     *
	     */
	    YouTube.prototype._init = function (options) {
	        this.movieOption = this.mergeOptions({
	            rel: false,
	            autoplay: true,
	            stopOnInactive: false,
	            controls: false,
	            loop: true,
	            showinfo: false,
	            mute: false,
	            id: '',
	            width: 400,
	            height: 300,
	            index: 0,
	            poster: null,
	            posterHighQuality: false,
	            startSeconds: 0,
	            suggestedQuality: 'default',
	            shuffle: false
	        }, options);
	        var movieIdList = this.movieOption.id.split(/\s*,\s*/);
	        if (this.movieOption.shuffle) {
	            movieIdList = UtilArray.shuffle(movieIdList);
	        }
	        var movieId = movieIdList[this.movieOption.index];
	        var param = {
	            version: 3,
	            rel: this.movieOption.rel ? 1 : 0,
	            autoplay: 0,
	            controls: this.movieOption.controls ? 1 : 0,
	            disablekb: 1,
	            iv_load_policy: 3,
	            loop: this.movieOption.loop ? 1 : 0,
	            modestbranding: 1,
	            showinfo: this.movieOption.showinfo ? 1 : 0,
	            wmode: 'transparent',
	            enablejsapi: 1
	        };
	        this.src = YouTube.getURI(movieId, param);
	        this.movieId = movieIdList;
	        this.playerDomId = this.id + '-Player';
	        if (this.movieOption.poster !== null && !this.movieOption.autoplay) {
	            this._createPosterImage(movieId);
	        }
	        else {
	            this._createPlayerFrame();
	            this._loadYouTubeAPI();
	        }
	        return true;
	    };
	    /**
	     * ポスターイメージの生成
	     *
	     * use: JQuery
	     *
	     * data-poster属性の中からポスター画像を生成する
	     *
	     * data-posterが 値なし もしくは 空文字 の場合、YouTubeのサムネイル画像を参照する
	     * data-posterの値が `/^@contents?$/i` にマッチする場合、要素の中身をそのまま使う
	     * それ以外の場合は パスと見なして画像を参照する
	     *
	     * @version 0.10.1
	     * @since 0.9.1
	     * @param movieId 動画のID
	     *
	     */
	    YouTube.prototype._createPosterImage = function (movieId) {
	        var _this = this;
	        var $posterContainer = $('<div class="-bc-element -bc-youtube-pseudo-poster-element" />');
	        if (this.movieOption.width) {
	            $posterContainer.width(this.movieOption.width);
	        }
	        if (this.movieOption.height) {
	            $posterContainer.height(this.movieOption.height);
	        }
	        if (/^@contents?$/i.test(this.movieOption.poster)) {
	            this.$el.wrapInner($posterContainer);
	            this._createPlayerFrame();
	            this._loadYouTubeAPI();
	            // 要素を一番最後に移動
	            this.$el.find('.-bc-youtube-pseudo-poster-element').appendTo(this.$el);
	        }
	        else {
	            if (this.movieOption.poster === '') {
	                this.movieOption.poster = YouTube.getPosterImage(movieId, this.movieOption.posterHighQuality);
	            }
	            this.$el.empty();
	            this._createPlayerFrame();
	            this._loadYouTubeAPI();
	            $posterContainer.appendTo(this.$el);
	            $posterContainer.css({
	                position: 'absolute',
	                top: 0,
	                left: 0,
	                width: '100%',
	                height: '100%',
	                backgroundImage: "url(\"" + this.movieOption.poster + "\")",
	                backgroundRepeat: 'no-repeat',
	                backgroundSize: 'cover',
	                backgroundPosition: 'center center',
	                backgroundColor: '#000',
	                pointerEvents: 'none',
	                cursor: 'pointer'
	            });
	            // pointer-eventsが効かないIE9の対応
	            $posterContainer.on('click', function () {
	                if (_this.player) {
	                    _this.player.playVideo();
	                }
	            });
	            if (this.movieOption.width) {
	                $posterContainer.width(this.movieOption.width);
	            }
	            if (this.movieOption.height) {
	                $posterContainer.height(this.movieOption.height);
	            }
	        }
	        this._$posterContainer = $posterContainer;
	    };
	    /**
	     * プレイヤーフレームを生成する
	     *
	     * @version 0.10.0
	     * @since 0.9.1
	     */
	    YouTube.prototype._createPlayerFrame = function () {
	        var $frame = $('<iframe class="-bc-youtube-player-frame-element" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen />');
	        $frame.prop({
	            src: this.src,
	            id: this.playerDomId
	        });
	        $frame.css({
	            position: 'relative',
	            display: 'block',
	            width: '100%',
	            height: '100%'
	        });
	        this.$el.empty();
	        $frame.appendTo(this.$el);
	        if (this.movieOption.width) {
	            $frame.width(this.movieOption.width);
	            $frame.data('width', this.movieOption.width);
	        }
	        if (this.movieOption.height) {
	            $frame.height(this.movieOption.height);
	            $frame.data('height', this.movieOption.height);
	        }
	        this._$frame = $frame;
	    };
	    /**
	     * YouTube APIをロードする
	     *
	     * @version 0.10.1
	     * @since 0.9.1
	     */
	    YouTube.prototype._loadYouTubeAPI = function () {
	        var _this = this;
	        if (!this.player && 'YT' in window && YT.Player) {
	            return;
	        }
	        $.getScript("" + Browser.apiScheme + YouTube.API_URL);
	        var intervalTimer = setInterval(function () {
	            if (!_this.player && 'YT' in window && YT.Player) {
	                _this._createPlayer(_this.playerDomId);
	            }
	            if (_this.player && _this.player.pauseVideo && _this.player.playVideo) {
	                clearInterval(intervalTimer);
	                _this._onEmbeded();
	            }
	        }, 300);
	    };
	    /**
	     * プレイヤーを生成する
	     *
	     * use: jQuery
	     *
	     * @version 0.9.0
	     * @since 0.8.0
	     * @param playerID プレイヤーのDOM ID
	     *
	     */
	    YouTube.prototype._createPlayer = function (playerID) {
	        var _this = this;
	        this.player = new YT.Player(playerID, {
	            events: {
	                onStateChange: function (e) {
	                    switch (e.data) {
	                        case -1:
	                            {
	                                _this.trigger('unstarted', [_this.player]);
	                                var listIndex = _this.player.getPlaylistIndex();
	                                if (_this.currentCueIndex !== listIndex) {
	                                    _this.trigger('changecue', [_this.player]);
	                                }
	                                _this.currentCueIndex = listIndex;
	                            }
	                            break;
	                        case YT.PlayerState.BUFFERING:
	                            {
	                                _this.trigger('buffering', [_this.player]);
	                            }
	                            break;
	                        case YT.PlayerState.CUED:
	                            {
	                                _this.trigger('cued', [_this.player]);
	                            }
	                            break;
	                        case YT.PlayerState.ENDED:
	                            {
	                                _this.trigger('ended', [_this.player]);
	                                if (_this.movieId.length > 1 && _this.movieOption.loop && _this.currentCueIndex === _this.movieId.length - 1) {
	                                    _this.player.playVideoAt(0);
	                                }
	                                else if (_this.movieOption.loop) {
	                                    _this.player.playVideo();
	                                }
	                            }
	                            break;
	                        case YT.PlayerState.PAUSED:
	                            {
	                                _this.trigger('paused', [_this.player]);
	                            }
	                            break;
	                        case YT.PlayerState.PLAYING:
	                            {
	                                _this._hidePoster();
	                                _this.trigger('playing', [_this.player]);
	                                _this.currentCueIndex = _this.player.getPlaylistIndex();
	                            }
	                            break;
	                        default: {
	                            if ('console' in window) {
	                                console.warn('YouTube Player state is unknown.');
	                            }
	                        }
	                    }
	                }
	            }
	        });
	    };
	    /**
	     * プレイヤーの生成が完了して実行可能になったときに呼ばれる処理
	     *
	     * use: jQuery
	     *
	     * TODO: embeddedyoutubeplayイベント廃止予定(v1.0.0)
	     *
	     * @version 0.10.0
	     * @since 0.8.0
	     *
	     */
	    YouTube.prototype._onEmbeded = function () {
	        var _this = this;
	        this.isEmbeded = true;
	        this._isMuted = this.player.isMuted();
	        if (this.movieOption.mute) {
	            this.mute();
	        }
	        if (this.movieOption.stopOnInactive) {
	            $(window).on('blur', function () {
	                _this.player.pauseVideo();
	            }).on('focus', function () {
	                _this.player.playVideo();
	            });
	        }
	        // TODO: youtube.d.ts に loadPlaylist() と cuePlaylist() が登録されていない
	        var _player = this.player;
	        if (this.movieId.length >= 2) {
	            if (this.movieOption.autoplay) {
	                _player.loadPlaylist(this.movieId, this.movieOption.index, this.movieOption.startSeconds, this.movieOption.suggestedQuality);
	            }
	            else {
	                _player.cuePlaylist(this.movieId, this.movieOption.index, this.movieOption.startSeconds, this.movieOption.suggestedQuality);
	            }
	        }
	        else if (this.movieOption.autoplay) {
	            this.player.playVideo();
	        }
	        this.$el.trigger('embeddedyoutubeplay', [this.player]); // TODO: 廃止予定(v1.0.0)
	        this.trigger('embeded', [this.player]);
	    };
	    /**
	     * ポスター要素を非表示にする
	     *
	     * @version 0.10.0
	     * @since 0.10.0
	     */
	    YouTube.prototype._hidePoster = function () {
	        if (this._$posterContainer) {
	            this._$posterContainer.detach();
	        }
	    };
	    /**
	     * 管理対象の要素に付加するclass属性値のプレフィックス
	     *
	     * @version 0.0.7
	     * @since 0.0.7
	     *
	     */
	    YouTube.className = '-bc-youtube-element';
	    /**
	     * Player URL
	     *
	     * @version 0.0.7
	     * @since 0.0.7
	     *
	     */
	    YouTube.PLAYER_URL = '//www.youtube.com/embed/';
	    /**
	     * API URL
	     *
	     * @version 0.0.7
	     * @since 0.0.7
	     *
	     */
	    YouTube.API_URL = '//www.youtube.com/player_api';
	    /**
	     * 管理対象の要素
	     *
	     * @version 0.0.7
	     * @since 0.0.7
	     *
	     */
	    YouTube.movies = [];
	    return YouTube;
	})(BaserElement);
	module.exports = YouTube;


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	var UtilMath = __webpack_require__(26);
	var Timer = __webpack_require__(21);
	var AnimationFrames = __webpack_require__(13);
	var Browser = __webpack_require__(9);
	var BaserElement = __webpack_require__(12);
	var AlignedBoxes = __webpack_require__(4);
	var Checkbox = __webpack_require__(16);
	var Radio = __webpack_require__(18);
	var Select = __webpack_require__(22);
	var Scroll = __webpack_require__(20);
	var GoogleMaps = __webpack_require__(17);
	var YouTube = __webpack_require__(27);
	var JQueryAdapter = (function () {
	    function JQueryAdapter() {
	    }
	    JQueryAdapter.bcScrollTo = function (selector, options) {
	        var scroll = new Scroll();
	        scroll.to(selector, options);
	    };
	    /**
	     * 自信の要素を基準に、指定の子要素を背景のように扱う
	     *
	     * TODO: BaserElement化する
	     *
	     * CSSの`background-size`の`contain`と`cover`の振る舞いに対応
	     *
	     * 基準も縦横のセンター・上下・左右に指定可能
	     *
	     * @version 0.2.0
	     * @since 0.0.9
	     * @param {Object} options オプション
	     *
	     * * * *
	     *
	     * ## Sample
	     *
	     * ### Target HTML
	     *
	     * ```html
	     * <div class="sample" data-id="rb0zOstIiyU" data-width="3840" data-height="2160"></div>
	     * ```
	     *
	     * ### Execute
	     *
	     * ```js
	     * $('.sample').bcYoutube().find('iframe').bcKeepAspectRatio();
	     * ```
	     *
	     * ### Result
	     *
	     * comming soon...
	     *
	     */
	    JQueryAdapter.prototype.bcBackground = function (options) {
	        var self = $(this);
	        return self.each(function (i, elem) {
	            var config = $.extend({
	                align: 'center',
	                valign: 'center',
	                size: 'contain',
	                child: '>*:first',
	                outer: false
	            }, options);
	            var $elem = $(elem);
	            var $child = $elem.find(config.child);
	            var objectWidth = +($elem.data('width') || $child.data('width') || $child.attr('width') || $child.width()) || 400;
	            var objectHeight = +($elem.data('height') || $child.data('height') || $child.attr('height') || $child.height()) || 300;
	            var objectAspectRatio = objectWidth / objectHeight;
	            var currentCSSPosition = $elem.css('position');
	            if (currentCSSPosition === 'static' || currentCSSPosition === '' || currentCSSPosition == null) {
	                $elem.css('position', 'relative');
	            }
	            $child.css({
	                position: 'absolute',
	                top: 0,
	                left: 0
	            });
	            var css = {};
	            var calc = function () {
	                var scale = 1;
	                var containerWidth;
	                var containerHeight;
	                if (config.outer) {
	                    containerWidth = $elem.outerWidth();
	                    containerHeight = $elem.outerHeight();
	                }
	                else {
	                    containerWidth = $elem.width();
	                    containerHeight = $elem.height();
	                }
	                var containerAspectRatio = containerWidth / containerHeight;
	                // 画像の拡縮率の算出
	                // アス比が1以上なら横長/1以下なら縦長
	                // コンテナが横長
	                switch (config.size) {
	                    case 'contain':
	                        if (1 < containerAspectRatio) {
	                            // 画像が横長 もしくは コンテナのアス比の方が大きい
	                            if (1 < objectWidth && objectAspectRatio < containerAspectRatio) {
	                                scale = containerWidth / objectWidth;
	                            }
	                            else {
	                                scale = containerHeight / objectHeight;
	                            }
	                        }
	                        else {
	                            // 画像が横長 もしくは 画像のアス比の方が大きい
	                            if (1 < objectHeight && containerAspectRatio < objectAspectRatio) {
	                                scale = containerHeight / objectHeight;
	                            }
	                            else {
	                                scale = containerWidth / objectWidth;
	                            }
	                        }
	                        break;
	                    case 'cover':
	                        if (1 < containerAspectRatio) {
	                            // 画像が横長 もしくは コンテナのアス比の方が大きい
	                            if (1 < objectWidth && objectAspectRatio < containerAspectRatio) {
	                                scale = containerHeight / objectHeight;
	                            }
	                            else {
	                                scale = containerWidth / objectWidth;
	                            }
	                        }
	                        else {
	                            // 画像が横長 もしくは 画像のアス比の方が大きい
	                            if (1 < objectHeight && containerAspectRatio < objectAspectRatio) {
	                                scale = containerWidth / objectWidth;
	                            }
	                            else {
	                                scale = containerHeight / objectHeight;
	                            }
	                        }
	                        break;
	                    default:
	                        return;
	                }
	                // 画像の幅と高さ
	                var newWidth = objectWidth * scale;
	                var newHeight = objectHeight * scale;
	                var top;
	                switch (config.valign) {
	                    case 'top':
	                        {
	                            top = 0;
	                        }
	                        break;
	                    case 'bottom':
	                        {
	                            top = containerHeight - newHeight;
	                        }
	                        break;
	                    default: {
	                        top = (containerHeight / 2) - (newHeight / 2);
	                    }
	                }
	                var left;
	                switch (config.align) {
	                    case 'left':
	                        {
	                            left = 0;
	                        }
	                        break;
	                    case 'right':
	                        {
	                            left = containerWidth - newWidth;
	                        }
	                        break;
	                    default: {
	                        left = (containerWidth / 2) - (newWidth / 2);
	                    }
	                }
	                css.width = newWidth;
	                css.height = newHeight;
	                css.maxWidth = 'none';
	                css.minWidth = 0;
	                css.maxHeight = 'none';
	                css.minHeight = 0;
	                css.top = top;
	                css.left = left;
	            };
	            // 初期計算
	            calc();
	            // 初期反映
	            $child.css(css);
	            // 計算結果をアニメーションフレーム毎にDOMに反映
	            var animation = new AnimationFrames(function () {
	                $child.css(css);
	            });
	            Browser.browser.on('resizestart', function () {
	                animation.start();
	            }).on('resize', function () {
	                // リサイズ時にサイズを計算
	                calc();
	            }).on('resizeend', function () {
	                animation.stop();
	            });
	            animation.start();
	            Timer.wait(300, function () {
	                animation.stop();
	            });
	        });
	    };
	    /**
	     * 要素の高さを揃える
	     *
	     * @version 0.7.0
	     * @since 0.0.15
	     *
	     */
	    JQueryAdapter.prototype.bcBoxAlignHeight = function (columnOrKeyword, detailTarget, callback) {
	        if (columnOrKeyword === void 0) { columnOrKeyword = 0; }
	        var self = $(this);
	        if (typeof columnOrKeyword === 'string') {
	            var keyword = columnOrKeyword;
	            switch (keyword) {
	                case 'destroy':
	                    {
	                        var boxes = self.data(AlignedBoxes.DATA_KEY);
	                        boxes.destroy();
	                    }
	                    break;
	                default: {
	                }
	            }
	        }
	        else {
	            var column = columnOrKeyword;
	            // 要素群の高さを揃え、setsに追加
	            if (detailTarget) {
	                var $detailTarget = self.find(detailTarget);
	                if ($detailTarget.length) {
	                    self.each(function () {
	                        var $split = $(this).find(detailTarget);
	                        /* tslint:disable */
	                        new AlignedBoxes($split, column, callback);
	                        /* tslint:enable */
	                    });
	                }
	            }
	            else {
	                /* tslint:disable */
	                new AlignedBoxes(self, column, callback);
	            }
	        }
	        return self;
	    };
	    // @version 0.9.0
	    // @since 0.1.0
	    JQueryAdapter.prototype.bcBoxLink = function () {
	        return $(self).on('click', function (e) {
	            var $elem = $(this);
	            var $link = $elem.find('a, area').eq(0);
	            var href = $link.prop('href');
	            if ($link.length && href) {
	                var isBlank = $link.prop('target') === '_blank';
	                Browser.jumpTo(href, isBlank);
	                e.preventDefault();
	            }
	        });
	    };
	    /**
	     * WAI-ARIAに対応した装飾可能な汎用要素でラップしたチェックボックスに変更する
	     *
	     * @version 0.9.0
	     * @since 0.0.1
	     *
	     * * * *
	     *
	     * ## Sample
	     *
	     * comming soon...
	     *
	     */
	    JQueryAdapter.prototype.bcCheckbox = function (options) {
	        var self = $(this);
	        return self.each(function (i, elem) {
	            if (elem.nodeName === 'INPUT') {
	                /* tslint:disable */
	                new Checkbox(elem, options);
	            }
	            else if ('console' in window) {
	                console.warn('TypeError: A Node is not HTMLInputElement');
	            }
	        });
	    };
	    /**
	     * WAI-ARIAに対応した装飾可能な汎用要素でラップしたラジオボタンに変更する
	     *
	     * @version 0.9.0
	     * @since 0.0.1
	     *
	     * * * *
	     *
	     * ## Sample
	     *
	     * comming soon...
	     *
	     */
	    JQueryAdapter.prototype.bcRadio = function (options) {
	        var self = $(this);
	        return self.each(function (i, elem) {
	            if (elem.nodeName === 'INPUT') {
	                /* tslint:disable */
	                new Radio(elem, options);
	            }
	            else if ('console' in window) {
	                console.warn('TypeError: A Node is not HTMLInputElement');
	            }
	        });
	    };
	    /**
	     * WAI-ARIAに対応した装飾可能な汎用要素でラップしたセレクトボックスに変更する
	     *
	     * @version 0.9.2
	     * @since 0.0.1
	     *
	     * * * *
	     *
	     * ## Sample
	     *
	     * comming soon...
	     *
	     */
	    JQueryAdapter.prototype.bcSelect = function (options) {
	        var self = $(this);
	        return self.each(function (i, elem) {
	            var $elem = $(elem);
	            if (typeof options === 'string') {
	                switch (options) {
	                    case 'update':
	                        {
	                            var select = $elem.data('bc-element');
	                            select.update();
	                        }
	                        break;
	                    default: {
	                    }
	                }
	            }
	            else if (elem.nodeName === 'SELECT') {
	                /* tslint:disable */
	                new Select(elem, options);
	            }
	            else if ('console' in window) {
	                console.warn('TypeError: A Node is not HTMLSelectElement');
	            }
	        });
	    };
	    /**
	     * 要素内の画像の読み込みが完了してからコールバックを実行する
	     *
	     * @version 0.9.0
	     * @since 0.0.9
	     *
	     * * * *
	     *
	     * ## Sample
	     *
	     * comming soon...
	     *
	     */
	    JQueryAdapter.prototype.bcImageLoaded = function (success, error) {
	        var self = $(this);
	        return self.each(function (i, elem) {
	            var $elem = $(elem);
	            var manifest = [];
	            var $imgs = $elem.filter('img').add($elem.find('img'));
	            if ($imgs.length) {
	                $imgs.hide();
	                $imgs.each(function () {
	                    var loaded = $.Deferred();
	                    var img = new Image();
	                    img.onload = function () {
	                        loaded.resolve();
	                        img.onload = null; // GC
	                        img = null; // GC
	                    };
	                    img.onabort = img.onerror = function (e) {
	                        loaded.reject(e);
	                        img.onload = null; // GC
	                        img = null; // GC
	                    };
	                    img.src = this.src;
	                    manifest.push(loaded.promise());
	                });
	                $.when.apply($, manifest).done(function () {
	                    $imgs.show();
	                    success.call(elem);
	                }).fail(function (e) {
	                    if (error) {
	                        error.call(elem, e);
	                    }
	                });
	            }
	            else {
	                success.call(elem);
	            }
	        });
	    };
	    /**
	     * 親のコンテナ要素の幅に合わせて、自信の縦横比を保ったまま幅の変更に対応する
	     *
	     * iframeなどの縦横比を保ちたいが、幅を変更しても高さが変化しない要素などに有効
	     *
	     * @version 0.0.9
	     * @since 0.0.9
	     *
	     * * * *
	     *
	     * ## Sample
	     *
	     * ### Target HTML
	     *
	     * ```html
	     * <div class="sample" data-id="rb0zOstIiyU" data-width="3840" data-height="2160"></div>
	     * ```
	     *
	     * ### Execute
	     *
	     * ```js
	     * $('.sample').bcYoutube().find('iframe').bcKeepAspectRatio();
	     * ```
	     *
	     * ### Result
	     *
	     * comming soon...
	     *
	     */
	    JQueryAdapter.prototype.bcKeepAspectRatio = function () {
	        var $w = $(window);
	        var self = $(this);
	        self.each(function (i, elem) {
	            var $elem = $(elem);
	            var baseWidth = +$elem.data('width');
	            var baseHeight = +$elem.data('height');
	            var aspectRatio = baseWidth / baseHeight;
	            $w.on('resize', function () {
	                var width = $elem.width();
	                $elem.css({
	                    width: '100%',
	                    height: width / aspectRatio
	                });
	            }).trigger('resize');
	        });
	        Timer.wait(30, function () {
	            $w.trigger('resize');
	        });
	        return self;
	    };
	    /**
	     * リンク要素からのアンカーまでスムーズにスクロールをさせる
	     *
	     * @version 0.1.0
	     * @since 0.0.8
	     *
	     * * * *
	     *
	     * ## Sample
	     *
	     * comming soon...
	     *
	     */
	    JQueryAdapter.prototype.bcScrollTo = function (options) {
	        var self = $(this);
	        return self.on('click', function (e) {
	            var $this = $(this);
	            var href = $this.attr('href');
	            var scroll = new Scroll();
	            if (href) {
	                // キーワードを一番に優先する
	                if (options && $.isPlainObject(options.keywords)) {
	                    for (var keyword in options.keywords) {
	                        if (options.keywords.hasOwnProperty(keyword)) {
	                            var target = options.keywords[keyword];
	                            if (keyword === href) {
	                                scroll.to(target, options);
	                                e.preventDefault();
	                                return;
	                            }
	                        }
	                    }
	                }
	                // 「/pathname/#hash」のリンクパターンの場合
	                // 「/pathname/」が現在のURLだった場合「#hash」に飛ばすようにする
	                var absPath = $this.prop('href');
	                var currentReferer = location.protocol + '//' + location.host + location.pathname + location.search;
	                href = absPath.replace(currentReferer, '');
	                // #top はHTML5ではページトップを意味する
	                if (href === '#top') {
	                    scroll.to(0, options);
	                    e.preventDefault();
	                    return;
	                }
	                // セレクタとして要素が存在する場合はその要素に移動
	                // 「/」で始まるなどセレクターとして不正な場合、例外を投げることがあるので無視する
	                try {
	                    var target = $(href);
	                    if (target.length) {
	                        scroll.to(target, options);
	                        e.preventDefault();
	                        return;
	                    }
	                }
	                catch (err) { }
	            }
	            return;
	        });
	    };
	    /**
	     * リストを均等に分割する
	     *
	     * @version 0.2.0
	     * @since 0.0.14
	     *
	     */
	    JQueryAdapter.prototype.bcSplitList = function (columnSize, options) {
	        var self = $(this);
	        var CLASS_NAME = 'splited-list';
	        var CLASS_NAME_NTH = 'nth';
	        var CLASS_NAME_ITEM = 'item';
	        var config = $.extend({
	            dataKey: '-bc-split-list-index',
	            splitChildren: true
	        }, options);
	        self.each(function (index, elem) {
	            var $container = $(elem);
	            var $list = $container.find('>ul');
	            var $items;
	            if (!config.splitChildren) {
	                // 直下のliのみ取得
	                $items = $list.find('>li').detach();
	            }
	            else {
	                // 入れ子のliも含めて全て取得
	                $items = $list.find('li').detach();
	                // 入れ子のulの削除
	                $items.find('ul').remove();
	            }
	            // リストアイテムの総数
	            var size = $items.length;
	            var splited = UtilMath.split(size, columnSize);
	            var itemArray = $items.toArray();
	            for (var i = 0; i < columnSize; i++) {
	                var sizeByColumn = splited[i];
	                var $col = $('<ul></ul>');
	                BaserElement.addClassTo($col, CLASS_NAME);
	                BaserElement.addClassTo($col, CLASS_NAME, '', CLASS_NAME_NTH + columnSize);
	                $col.appendTo($container);
	                for (var j = 0; j < sizeByColumn; j++) {
	                    var $item = $(itemArray.shift());
	                    $item.appendTo($col);
	                    $item.data(config.dataKey, i);
	                    BaserElement.addClassTo($item, CLASS_NAME, CLASS_NAME_ITEM);
	                    BaserElement.addClassTo($item, CLASS_NAME, CLASS_NAME_ITEM, CLASS_NAME_NTH + i);
	                }
	            }
	            $list.remove();
	        });
	        return self;
	    };
	    /**
	     * マウスオーバー時に一瞬透明になるエフェクトをかける
	     *
	     * @version 0.0.14
	     * @since 0.0.14
	     *
	     */
	    JQueryAdapter.prototype.bcWink = function (options) {
	        var self = $(this);
	        var config = $.extend({
	            close: 50,
	            open: 200,
	            opacity: 0.4,
	            target: null,
	            stopOnTouch: true
	        }, options);
	        self.each(function (i, elem) {
	            var $this = $(elem);
	            var $target;
	            if (config.target) {
	                $target = $this.find(config.target);
	            }
	            else {
	                $target = $this;
	            }
	            $this.on('mouseenter', function (e) {
	                if (config.stopOnTouch && $this.data('-bc-is-touchstarted')) {
	                    $this.data('-bc-is-touchstarted', false);
	                    return true;
	                }
	                $target
	                    .stop(true, false)
	                    .fadeTo(config.close, config.opacity)
	                    .fadeTo(config.open, 1);
	                return true;
	            });
	            if (config.stopOnTouch) {
	                $this.on('touchstart', function (e) {
	                    $this.data('-bc-is-touchstarted', true);
	                    return true;
	                });
	            }
	        });
	        return self;
	    };
	    /**
	     * マップを埋め込む
	     *
	     * 現在の対応はGoogleMapsのみ
	     *
	     * @version 0.9.0
	     * @since 0.0.8
	     *
	     * * * *
	     *
	     * ## Sample
	     *
	     * ### Target HTML
	     *
	     * ```html
	     * <div class="sample" data-lat="33.606785" data-lng="130.418314"></div>
	     * ```
	     *
	     * ### Execute
	     *
	     * ```js
	     * $('.sample').bcMaps();
	     * ```
	     *
	     * ### Result
	     *
	     * comming soon...
	     *
	     */
	    JQueryAdapter.prototype.bcMaps = function (options) {
	        var self = $(this);
	        return self.each(function (i, elem) {
	            var $elem = $(elem);
	            var data = $elem.data(GoogleMaps.className);
	            if (data) {
	                data.reload(options);
	            }
	            else {
	                /* tslint:disable */
	                new GoogleMaps(elem, options);
	            }
	        });
	    };
	    /**
	     * YouTubeを埋め込む
	     *
	     * @version 0.9.0
	     * @since 0.0.8
	     *
	     * * * *
	     *
	     * ## Sample
	     *
	     * ### Target HTML
	     *
	     * ```html
	     * <div class="sample" data-id="rb0zOstIiyU" data-width="720" data-height="480"></div>
	     * ```
	     *
	     * ### Execute
	     *
	     * ```js
	     * $('.sample').bcYoutube();
	     * ```
	     *
	     */
	    JQueryAdapter.prototype.bcYoutube = function (options) {
	        var self = $(this);
	        return self.each(function (i, elem) {
	            var $elem = $(elem);
	            var data = $elem.data(YouTube.className);
	            if (data) {
	                data.reload(options);
	            }
	            else {
	                /* tslint:disable */
	                new YouTube(elem, options);
	            }
	        });
	    };
	    /**
	     * マウスオーバー時に画像を切り替える
	     *
	     * 【使用非推奨】できるかぎり CSS の `:hover` と `background-image` を使用するべきです。
	     *
	     * @deprecated
	     * @version 0.0.15
	     * @since 0.0.15
	     *
	     */
	    JQueryAdapter.prototype.bcRollover = function (options) {
	        var self = $(this);
	        var config = $.extend({
	            pattern: /_off(\.(?:[a-z0-9]{1,6}))$/i,
	            replace: '_on$1',
	            dataPrefix: '-bc-rollover-',
	            ignore: '',
	            filter: null,
	            stopOnTouch: true
	        }, options);
	        var dataKeyOff = config.dataPrefix + 'off';
	        var dataKeyOn = config.dataPrefix + 'on';
	        self.each(function (i, elem) {
	            var nodeName = elem.nodeName.toLowerCase();
	            var $img = $(elem).not(config.ignore);
	            if ($img.length && nodeName === 'img' || (nodeName === 'input' && $img.prop('type') === 'image')) {
	                var avail = true;
	                if ($.isFunction(config.filter)) {
	                    avail = !!config.filter.call(elem);
	                }
	                else if (config.filter) {
	                    avail = !!$img.filter(config.filter).length;
	                }
	                if (avail) {
	                    var src = $img.attr('src');
	                    if (src.match(config.pattern)) {
	                        var onSrc = src.replace(config.pattern, config.replace);
	                        $img.data(dataKeyOff, src);
	                        $img.data(dataKeyOn, onSrc);
	                    }
	                }
	            }
	        });
	        self.on('mouseenter', function (e) {
	            var $this = $(this);
	            if (config.stopOnTouch && $this.data('-bc-is-touchstarted')) {
	                $this.data('-bc-is-touchstarted', false);
	                return true;
	            }
	            var onSrc = $this.data(dataKeyOn);
	            $this.prop('src', onSrc);
	            return true;
	        });
	        self.on('mouseleave', function (e) {
	            var $this = $(this);
	            if (config.stopOnTouch && $this.data('-bc-is-touchstarted')) {
	                $this.data('-bc-is-touchstarted', false);
	                return true;
	            }
	            var offSrc = $this.data(dataKeyOff);
	            $this.prop('src', offSrc);
	            return true;
	        });
	        if (config.stopOnTouch) {
	            self.on('touchstart', function (e) {
	                var $this = $(this);
	                $this.data('-bc-is-touchstarted', true);
	                return true;
	            });
	        }
	        return self;
	    };
	    /**
	     * マウスオーバー時に半透明になるエフェクトをかける
	     *
	     * 【使用非推奨】できるかぎり CSS の `:hover` と `opacity`、そして `transition` を使用するべきです。
	     *
	     * @deprecated
	     * @version 0.0.15
	     * @since 0.0.15
	     *
	     */
	    JQueryAdapter.prototype.bcShy = function (options) {
	        var self = $(this);
	        var config = $.extend({
	            close: 300,
	            open: 300,
	            opacity: 0.6,
	            target: null,
	            stopOnTouch: true
	        }, options);
	        self.each(function (i, elem) {
	            var $this = $(elem);
	            var $target;
	            if (config.target) {
	                $target = $this.find(config.target);
	            }
	            else {
	                $target = $this;
	            }
	            $this.on('mouseenter', function (e) {
	                if (config.stopOnTouch && $this.data('-bc-is-touchstarted')) {
	                    $this.data('-bc-is-touchstarted', false);
	                    return true;
	                }
	                $target
	                    .stop(true, false)
	                    .fadeTo(config.close, config.opacity);
	                return true;
	            });
	            $this.on('mouseleave', function (e) {
	                if (config.stopOnTouch && $this.data('-bc-is-touchstarted')) {
	                    $this.data('-bc-is-touchstarted', false);
	                    return true;
	                }
	                $target
	                    .stop(true, false)
	                    .fadeTo(config.open, 1);
	                return true;
	            });
	            if (config.stopOnTouch) {
	                $this.on('touchstart', function (e) {
	                    $this.data('-bc-is-touchstarted', true);
	                    return true;
	                });
	            }
	        });
	        return self;
	    };
	    ;
	    return JQueryAdapter;
	})();
	module.exports = JQueryAdapter;


/***/ }
/******/ ]);
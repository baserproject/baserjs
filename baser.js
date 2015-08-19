/**
 * baserjs - v0.8.0 r263
 * update: 2015-08-19
 * Author: baserCMS Users Community [https://github.com/baserproject/]
 * Github: https://github.com/baserproject/baserjs
 * License: Licensed under the MIT License
 */

(function () {
	"use strict";

	var global = this;

	var isBrowser = 'document' in global;
	var isWebWorkers = 'WorkerLocation' in global;
	var isNode = 'process' in global;

	var jQuery, $;

	if (isBrowser) {
		$ = jQuery = global.jQuery;
	} else if (isNode) {
		$ = jQuery = require('jquery');
	}

	if (!isBrowser) {
		throw new Error('baserJS requires a window with a document');
	}

/*!
 * jQuery Cookie Plugin v1.4.1
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2006, 2014 Klaus Hartl
 * Released under the MIT license
 */
(function (factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD (Register as an anonymous module)
		define(['jquery'], factory);
	} else if (typeof exports === 'object') {
		// Node/CommonJS
		module.exports = factory(require('jquery'));
	} else {
		// Browser globals
		factory(jQuery);
	}
}(function ($) {

	var pluses = /\+/g;

	function encode(s) {
		return config.raw ? s : encodeURIComponent(s);
	}

	function decode(s) {
		return config.raw ? s : decodeURIComponent(s);
	}

	function stringifyCookieValue(value) {
		return encode(config.json ? JSON.stringify(value) : String(value));
	}

	function parseCookieValue(s) {
		if (s.indexOf('"') === 0) {
			// This is a quoted cookie as according to RFC2068, unescape...
			s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
		}

		try {
			// Replace server-side written pluses with spaces.
			// If we can't decode the cookie, ignore it, it's unusable.
			// If we can't parse the cookie, ignore it, it's unusable.
			s = decodeURIComponent(s.replace(pluses, ' '));
			return config.json ? JSON.parse(s) : s;
		} catch(e) {}
	}

	function read(s, converter) {
		var value = config.raw ? s : parseCookieValue(s);
		return $.isFunction(converter) ? converter(value) : value;
	}

	var config = $.cookie = function (key, value, options) {

		// Write

		if (arguments.length > 1 && !$.isFunction(value)) {
			options = $.extend({}, config.defaults, options);

			if (typeof options.expires === 'number') {
				var days = options.expires, t = options.expires = new Date();
				t.setMilliseconds(t.getMilliseconds() + days * 864e+5);
			}

			return (document.cookie = [
				encode(key), '=', stringifyCookieValue(value),
				options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
				options.path    ? '; path=' + options.path : '',
				options.domain  ? '; domain=' + options.domain : '',
				options.secure  ? '; secure' : ''
			].join(''));
		}

		// Read

		var result = key ? undefined : {},
			// To prevent the for loop in the first place assign an empty array
			// in case there are no cookies at all. Also prevents odd result when
			// calling $.cookie().
			cookies = document.cookie ? document.cookie.split('; ') : [],
			i = 0,
			l = cookies.length;

		for (; i < l; i++) {
			var parts = cookies[i].split('='),
				name = decode(parts.shift()),
				cookie = parts.join('=');

			if (key === name) {
				// If second argument (value) is a function it's a converter...
				result = read(cookie, value);
				break;
			}

			// Prevent storing a cookie that we couldn't decode.
			if (!key && (cookie = read(cookie)) !== undefined) {
				result[name] = cookie;
			}
		}

		return result;
	};

	config.defaults = {};

	$.removeCookie = function (key, options) {
		// Must not alter options, thus extending a fresh object...
		$.cookie(key, '', $.extend({}, options, { expires: -1 }));
		return !$.cookie(key);
	};

}));

/*!
 * jQuery Mousewheel 3.1.13
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 */

(function (factory) {
    if ( typeof define === 'function' && define.amd ) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // Node/CommonJS style for Browserify
        module.exports = factory;
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {

    var toFix  = ['wheel', 'mousewheel', 'DOMMouseScroll', 'MozMousePixelScroll'],
        toBind = ( 'onwheel' in document || document.documentMode >= 9 ) ?
                    ['wheel'] : ['mousewheel', 'DomMouseScroll', 'MozMousePixelScroll'],
        slice  = Array.prototype.slice,
        nullLowestDeltaTimeout, lowestDelta;

    if ( $.event.fixHooks ) {
        for ( var i = toFix.length; i; ) {
            $.event.fixHooks[ toFix[--i] ] = $.event.mouseHooks;
        }
    }

    var special = $.event.special.mousewheel = {
        version: '3.1.12',

        setup: function() {
            if ( this.addEventListener ) {
                for ( var i = toBind.length; i; ) {
                    this.addEventListener( toBind[--i], handler, false );
                }
            } else {
                this.onmousewheel = handler;
            }
            // Store the line height and page height for this particular element
            $.data(this, 'mousewheel-line-height', special.getLineHeight(this));
            $.data(this, 'mousewheel-page-height', special.getPageHeight(this));
        },

        teardown: function() {
            if ( this.removeEventListener ) {
                for ( var i = toBind.length; i; ) {
                    this.removeEventListener( toBind[--i], handler, false );
                }
            } else {
                this.onmousewheel = null;
            }
            // Clean up the data we added to the element
            $.removeData(this, 'mousewheel-line-height');
            $.removeData(this, 'mousewheel-page-height');
        },

        getLineHeight: function(elem) {
            var $elem = $(elem),
                $parent = $elem['offsetParent' in $.fn ? 'offsetParent' : 'parent']();
            if (!$parent.length) {
                $parent = $('body');
            }
            return parseInt($parent.css('fontSize'), 10) || parseInt($elem.css('fontSize'), 10) || 16;
        },

        getPageHeight: function(elem) {
            return $(elem).height();
        },

        settings: {
            adjustOldDeltas: true, // see shouldAdjustOldDeltas() below
            normalizeOffset: true  // calls getBoundingClientRect for each event
        }
    };

    $.fn.extend({
        mousewheel: function(fn) {
            return fn ? this.bind('mousewheel', fn) : this.trigger('mousewheel');
        },

        unmousewheel: function(fn) {
            return this.unbind('mousewheel', fn);
        }
    });


    function handler(event) {
        var orgEvent   = event || window.event,
            args       = slice.call(arguments, 1),
            delta      = 0,
            deltaX     = 0,
            deltaY     = 0,
            absDelta   = 0,
            offsetX    = 0,
            offsetY    = 0;
        event = $.event.fix(orgEvent);
        event.type = 'mousewheel';

        // Old school scrollwheel delta
        if ( 'detail'      in orgEvent ) { deltaY = orgEvent.detail * -1;      }
        if ( 'wheelDelta'  in orgEvent ) { deltaY = orgEvent.wheelDelta;       }
        if ( 'wheelDeltaY' in orgEvent ) { deltaY = orgEvent.wheelDeltaY;      }
        if ( 'wheelDeltaX' in orgEvent ) { deltaX = orgEvent.wheelDeltaX * -1; }

        // Firefox < 17 horizontal scrolling related to DOMMouseScroll event
        if ( 'axis' in orgEvent && orgEvent.axis === orgEvent.HORIZONTAL_AXIS ) {
            deltaX = deltaY * -1;
            deltaY = 0;
        }

        // Set delta to be deltaY or deltaX if deltaY is 0 for backwards compatabilitiy
        delta = deltaY === 0 ? deltaX : deltaY;

        // New school wheel delta (wheel event)
        if ( 'deltaY' in orgEvent ) {
            deltaY = orgEvent.deltaY * -1;
            delta  = deltaY;
        }
        if ( 'deltaX' in orgEvent ) {
            deltaX = orgEvent.deltaX;
            if ( deltaY === 0 ) { delta  = deltaX * -1; }
        }

        // No change actually happened, no reason to go any further
        if ( deltaY === 0 && deltaX === 0 ) { return; }

        // Need to convert lines and pages to pixels if we aren't already in pixels
        // There are three delta modes:
        //   * deltaMode 0 is by pixels, nothing to do
        //   * deltaMode 1 is by lines
        //   * deltaMode 2 is by pages
        if ( orgEvent.deltaMode === 1 ) {
            var lineHeight = $.data(this, 'mousewheel-line-height');
            delta  *= lineHeight;
            deltaY *= lineHeight;
            deltaX *= lineHeight;
        } else if ( orgEvent.deltaMode === 2 ) {
            var pageHeight = $.data(this, 'mousewheel-page-height');
            delta  *= pageHeight;
            deltaY *= pageHeight;
            deltaX *= pageHeight;
        }

        // Store lowest absolute delta to normalize the delta values
        absDelta = Math.max( Math.abs(deltaY), Math.abs(deltaX) );

        if ( !lowestDelta || absDelta < lowestDelta ) {
            lowestDelta = absDelta;

            // Adjust older deltas if necessary
            if ( shouldAdjustOldDeltas(orgEvent, absDelta) ) {
                lowestDelta /= 40;
            }
        }

        // Adjust older deltas if necessary
        if ( shouldAdjustOldDeltas(orgEvent, absDelta) ) {
            // Divide all the things by 40!
            delta  /= 40;
            deltaX /= 40;
            deltaY /= 40;
        }

        // Get a whole, normalized value for the deltas
        delta  = Math[ delta  >= 1 ? 'floor' : 'ceil' ](delta  / lowestDelta);
        deltaX = Math[ deltaX >= 1 ? 'floor' : 'ceil' ](deltaX / lowestDelta);
        deltaY = Math[ deltaY >= 1 ? 'floor' : 'ceil' ](deltaY / lowestDelta);

        // Normalise offsetX and offsetY properties
        if ( special.settings.normalizeOffset && this.getBoundingClientRect ) {
            var boundingRect = this.getBoundingClientRect();
            offsetX = event.clientX - boundingRect.left;
            offsetY = event.clientY - boundingRect.top;
        }

        // Add information to the event object
        event.deltaX = deltaX;
        event.deltaY = deltaY;
        event.deltaFactor = lowestDelta;
        event.offsetX = offsetX;
        event.offsetY = offsetY;
        // Go ahead and set deltaMode to 0 since we converted to pixels
        // Although this is a little odd since we overwrite the deltaX/Y
        // properties with normalized deltas.
        event.deltaMode = 0;

        // Add event and delta to the front of the arguments
        args.unshift(event, delta, deltaX, deltaY);

        // Clearout lowestDelta after sometime to better
        // handle multiple device types that give different
        // a different lowestDelta
        // Ex: trackpad = 3 and mouse wheel = 120
        if (nullLowestDeltaTimeout) { clearTimeout(nullLowestDeltaTimeout); }
        nullLowestDeltaTimeout = setTimeout(nullLowestDelta, 200);

        return ($.event.dispatch || $.event.handle).apply(this, args);
    }

    function nullLowestDelta() {
        lowestDelta = null;
    }

    function shouldAdjustOldDeltas(orgEvent, absDelta) {
        // If this is an older event and the delta is divisable by 120,
        // then we are assuming that the browser is treating this as an
        // older mouse wheel event and that we should divide the deltas
        // by 40 to try and get a more usable deltaFactor.
        // Side note, this actually impacts the reported scroll distance
        // in older browsers and can cause scrolling to be slower than native.
        // Turn this off by setting $.event.special.mousewheel.settings.adjustOldDeltas to false.
        return special.settings.adjustOldDeltas && orgEvent.type === 'mousewheel' && absDelta % 120 === 0;
    }

}));

var baser;
(function (baser) {
    var utility;
    (function (utility) {
        /**
         * ユーティリティ文字列クラス
         *
         * @version 0.0.2
         * @since 0.0.2
         *
         */
        var String = (function () {
            function String() {
            }
            /**
             * ユニークIDを発行する
             *
             * @version 0.0.1
             * @since 0.0.1
             *
             */
            String.UID = function (seed) {
                var random = Math.floor(Math.random() * 1e8);
                if (!seed) {
                    seed = new Date().valueOf();
                }
                var uniqueNumber = random + seed;
                var uid = 'uid-' + uniqueNumber.toString(24);
                return uid;
            };
            /**
             * ハイフン チェインケース化
             *
             * @version 0.1.0
             * @since 0.1.0
             *
             */
            String.hyphenDelimited = function (str) {
                var words = str.replace(/[A-Z]/g, function ($1) {
                    return ' ' + $1.toLowerCase();
                }).split(/[^a-z0-9]+/ig);
                var result = [];
                var i = 0;
                var l = words.length;
                for (; i < l; i++) {
                    if (words[i]) {
                        result.push(words[i].toLowerCase());
                    }
                }
                return result.join('-');
            };
            /**
             * スネークケース化
             *
             * @version 0.1.0
             * @since 0.1.0
             *
             */
            String.snakeCase = function (str) {
                return String.hyphenDelimited(str).replace(/-/g, '_');
            };
            /**
             * キャメルケース化
             *
             * @version 0.1.0
             * @since 0.1.0
             *
             */
            String.camelCase = function (str, upperCase) {
                if (upperCase === void 0) { upperCase = false; }
                var hdStr = String.hyphenDelimited(str);
                if (upperCase && /^[a-z]/.test(hdStr)) {
                    hdStr = '-' + hdStr;
                }
                return hdStr.replace(/-([a-z])/g, function ($1, $2) {
                    return $2.toUpperCase();
                });
            };
            /**
             * 文字列が論理値の偽相等であるかどうか
             *
             * @version 0.2.0
             * @since 0.2.0
             *
             */
            String.isFalsy = function (str) {
                str = str.toLowerCase();
                var rFalsy = /^\s*(?:false|null|undefined|0|0?(?:\.0+)?)?\s*$/i;
                return rFalsy.test(str);
            };
            /**
             * 最初に登場する文字列の部分を分割する
             *
             * @version 0.7.0
             * @since 0.7.0
             *
             */
            String.divide = function (str, separator) {
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
            return String;
        })();
        utility.String = String;
    })(utility = baser.utility || (baser.utility = {}));
})(baser || (baser = {}));
var baser;
(function (baser) {
    var utility;
    (function (utility) {
        /**
         * ユーティリティ配列クラス
         *
         * @version 0.2.0
         * @since 0.2.0
         *
         */
        var Array = (function () {
            function Array() {
            }
            /**
             * 配列中の対象の要素が一番最初に存在するインデックス番号を返す
             *
             * @version 0.2.0
             * @since 0.2.0
             *
             */
            Array.indexOf = function (array, element) {
                var i = 0;
                var l = array.length;
                for (; i < l; i++) {
                    if (element === array[i]) {
                        return i;
                    }
                }
                return -1;
            };
            /**
             * 配列中の対象のインデックスを削除する
             *
             * @version 0.2.0
             * @since 0.2.0
             *
             */
            Array.remove = function (array, index) {
                array.splice(index, 1);
                return array;
            };
            return Array;
        })();
        utility.Array = Array;
    })(utility = baser.utility || (baser.utility = {}));
})(baser || (baser = {}));
var baser;
(function (baser) {
    var utility;
    (function (utility) {
        /**
         * ユーティリティ算術クラス
         *
         * @version 0.2.0
         * @since 0.0.2
         *
         */
        var Mathematics = (function () {
            function Mathematics() {
            }
            /**
             * 指定の範囲のランダムな数を返す
             *
             * @version 0.2.0
             * @since 0.2.0
             *
             * @param base 基準の数
             * @param dist 基準からこの数までの範囲の乱数になる
             * @return 乱数
             *
             */
            Mathematics.random = function (base, dist) {
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
             * @version 0.2.0
             * @since 0.2.0
             *
             * @param numberList 数の配列
             * @return 合計値
             *
             */
            Mathematics.sam = function (numberList) {
                var result = 0;
                var i = 0;
                var l = numberList.length;
                for (; i < l; i++) {
                    result += numberList[i];
                }
                return result;
            };
            /**
             * 均等に分割する
             *
             * @version 0.2.0
             * @since 0.2.0
             *
             * @param n 分割される数
             * @param devide 分割する数
             * @param returnInfo 詳細情報を返すかどうか
             * @return `returnInfo`が真の場合 分割された数値で構成された配列を、偽の場合 詳細情報と結果を返す
             *
             */
            Mathematics.split = function (n, devide, returnInfo) {
                if (returnInfo === void 0) { returnInfo = false; }
                n = Math.floor(n);
                devide = Math.floor(devide);
                // 分割した数
                var splited = Math.floor(n / devide);
                // 余り
                var rem = n % devide;
                // 余りの数だけ+1される
                var addtion = rem;
                var result = [];
                var i = devide;
                if (!(devide <= 0)) {
                    while (i--) {
                        if (0 < addtion || rem < 0 && 0 === addtion) {
                            result.push(splited + 1);
                        }
                        else {
                            result.push(splited);
                        }
                        addtion -= rem < 0 ? -1 : 1;
                    }
                }
                if (returnInfo) {
                    return {
                        result: result,
                        commonNumber: splited,
                        addtion: rem
                    };
                }
                else {
                    return result;
                }
            };
            return Mathematics;
        })();
        utility.Mathematics = Mathematics;
    })(utility = baser.utility || (baser.utility = {}));
})(baser || (baser = {}));
var baser;
(function (baser) {
    var ui;
    (function (ui) {
        var event;
        (function (event) {
            /**
             * イベント駆動できるクラス
             *
             * @version 0.0.10
             * @since 0.0.10
             *
             */
            var EventDispacher = (function () {
                /**
                 * コンストラクタ
                 *
                 * @version 0.0.10
                 * @since 0.0.10
                 *
                 */
                function EventDispacher() {
                    // void
                }
                /**
                 * イベントハンドラを登録する
                 *
                 * @version 0.8.0
                 * @since 0.0.10
                 *
                 */
                EventDispacher.prototype.on = function (type, handler) {
                    var types;
                    if (typeof type === 'string') {
                        types = type.split(/\s+/g);
                    }
                    else {
                        types = type;
                    }
                    var i = 0;
                    var l = types.length;
                    for (; i < l; i++) {
                        var eventHandler = new event.EventHandler(this, types[i], handler);
                        EventDispacher.eventHandlers[eventHandler.id] = eventHandler;
                        if (!EventDispacher.types[types[i]]) {
                            EventDispacher.types[types[i]] = [];
                        }
                        EventDispacher.types[types[i]].push(eventHandler);
                    }
                    return this;
                };
                /**
                 * イベントハンドラを削除する
                 *
                 * @version 0.0.10
                 * @since 0.0.10
                 *
                 */
                EventDispacher.prototype.off = function (type) {
                    var types;
                    if (typeof type === 'string') {
                        types = type.split(/\s+/g);
                    }
                    else {
                        types = type;
                    }
                    var i = 0;
                    var l = types.length;
                    for (; i < l; i++) {
                        delete EventDispacher.types[types[i]];
                    }
                    return this;
                };
                /**
                 * イベントハンドラを発火させる
                 *
                 * @version 0.5.0
                 * @since 0.0.10
                 *
                 */
                EventDispacher.prototype.trigger = function (type, args, context) {
                    if (args === void 0) { args = []; }
                    var handlers;
                    var eventHandler;
                    var e;
                    context = context || this;
                    if (EventDispacher.types[type]) {
                        handlers = EventDispacher.types[type].slice(); // clone
                        while (handlers.length) {
                            eventHandler = handlers.shift();
                            if (eventHandler.context === this) {
                                e = new event.DispacheEvent(type);
                                eventHandler.handler.apply(context, [e].concat(args));
                                if (e.isImmediatePropagationStopped()) {
                                    break;
                                }
                            }
                        }
                    }
                    return this;
                };
                EventDispacher.eventHandlers = {};
                EventDispacher.types = {};
                return EventDispacher;
            })();
            event.EventDispacher = EventDispacher;
        })(event = ui.event || (ui.event = {}));
    })(ui = baser.ui || (baser.ui = {}));
})(baser || (baser = {}));
var baser;
(function (baser) {
    var ui;
    (function (ui) {
        var event;
        (function (event) {
            /**
             * イベントオブジェクトのクラス
             *
             * @version 0.3.0
             * @since 0.0.10
             *
             */
            var DispacheEvent = (function () {
                function DispacheEvent(type) {
                    this._isImmediatePropagationStopped = false;
                    this.type = type;
                }
                DispacheEvent.prototype.isImmediatePropagationStopped = function () {
                    return this._isImmediatePropagationStopped;
                };
                DispacheEvent.prototype.stopImmediatePropagation = function () {
                    this._isImmediatePropagationStopped = true;
                };
                return DispacheEvent;
            })();
            event.DispacheEvent = DispacheEvent;
        })(event = ui.event || (ui.event = {}));
    })(ui = baser.ui || (baser.ui = {}));
})(baser || (baser = {}));
var baser;
(function (baser) {
    var ui;
    (function (ui) {
        var event;
        (function (event) {
            /**
             * イベントハンドラのラッパークラス
             *
             * @version 0.0.10
             * @since 0.0.10
             *
             */
            var EventHandler = (function () {
                function EventHandler(context, type, handler) {
                    this.context = context;
                    this.id = baser.utility.String.UID();
                    this.type = type;
                    this.handler = handler;
                }
                return EventHandler;
            })();
            event.EventHandler = EventHandler;
        })(event = ui.event || (ui.event = {}));
    })(ui = baser.ui || (baser.ui = {}));
})(baser || (baser = {}));
var baser;
(function (baser) {
    var ui;
    (function (ui) {
        /**
         * 非同期逐次処理クラス
         *
         * @version 0.4.0
         * @since 0.4.0
         *
         */
        var Sequence = (function () {
            function Sequence(tasks) {
                this._tasks = [];
                this._index = 0;
                this._iterator = 0;
                this._promise = null;
                this._resolver = null;
                this._waitingTime = 0;
                this._waitTimer = 0;
                this._toExit = false;
                var i = 0;
                var l = tasks.length;
                for (; i < l; i++) {
                    this._tasks.push(new Task(tasks[i]));
                }
            }
            // TODO: ネイティブのPromiseを使う
            Sequence.prototype.act = function (value, isLoop) {
                var _this = this;
                if (isLoop === void 0) { isLoop = false; }
                var task = this._tasks[this._index];
                var result = task.act(this, this._iterator, value);
                // Type like JQueryDeferred
                if (isJQueryPromiseLikeObject(result)) {
                    this._promise = result.promise();
                }
                else {
                    this._resolver = $.Deferred();
                    this._waitTimer = setTimeout(function () {
                        _this._resolver.resolve(result);
                    }, this._waitingTime);
                    // promised
                    this._promise = this._resolver.promise();
                }
                this._promise.done(function (doneResult) {
                    clearTimeout(_this._waitTimer);
                    _this._promise = null;
                    _this._resolver = null;
                    _this._waitTimer = null;
                    _this._waitingTime = 0;
                    _this._index += 1;
                    _this._iterator += 1;
                    if (!_this._toExit && (_this._index < _this._tasks.length || isLoop)) {
                        if (_this._index >= _this._tasks.length && isLoop) {
                            _this._index = 0;
                        }
                        _this.act(doneResult, isLoop);
                    }
                }).fail(function () {
                    clearTimeout(_this._waitTimer);
                    _this._promise = null;
                    _this._resolver = null;
                    _this._waitTimer = null;
                    _this._waitingTime = 0;
                });
                return this;
            };
            Sequence.prototype.loop = function (value) {
                return this.act(value, true);
            };
            Sequence.prototype.exit = function () {
                this._toExit = true;
                if (this._resolver) {
                    this._resolver.reject();
                }
                return this;
            };
            Sequence.prototype.wait = function (watingTime) {
                this._waitingTime = watingTime;
            };
            return Sequence;
        })();
        ui.Sequence = Sequence;
        var Task = (function () {
            function Task(func) {
                this.status = TaskState.yet;
                this._func = func;
            }
            Task.prototype.act = function (sequence, sequenceIndex, value) {
                var result = this._func.call(sequence, sequenceIndex, value);
                this.status = TaskState.done;
                return result;
            };
            return Task;
        })();
        var TaskState;
        (function (TaskState) {
            TaskState[TaskState["done"] = 0] = "done";
            TaskState[TaskState["yet"] = 1] = "yet";
        })(TaskState || (TaskState = {}));
        function isJQueryPromiseLikeObject(object) {
            var props = [
                'always',
                'done',
                'fail',
                'pipe',
                'progress',
                'promise',
                'state',
                'then'
            ];
            if (object instanceof jQuery) {
                return !!object.promise;
            }
            else {
                while (props.length) {
                    if (!(props.shift() in Object(object))) {
                        return false;
                    }
                }
                return true;
            }
        }
    })(ui = baser.ui || (baser.ui = {}));
})(baser || (baser = {}));
var baser;
(function (baser) {
    var ui;
    (function (ui) {
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
             * クエリーストリングをハッシュにして返す
             *
             * @version 0.7.0
             * @since 0.7.0
             *
             */
            Locational.parseQueryString = function (queryString) {
                var params = {};
                var queries;
                if (queryString) {
                    queries = queryString.split(/&/g);
                    $.each(queries, function (i, query) {
                        var keyValue = baser.utility.String.divide(query, '=');
                        var key = keyValue[0];
                        var value = keyValue[1];
                        if (key) {
                            if (/\[\]$/.test(key)) {
                                key = key.replace(/\[\]$/, '');
                                if (params[key] && params[key].push) {
                                    params[key].push(value);
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
        ui.Locational = Locational;
    })(ui = baser.ui || (baser.ui = {}));
})(baser || (baser = {}));
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var baser;
(function (baser) {
    var ui;
    (function (ui) {
        /**
         * ブラウザの情報を管理するクラス
         *
         * @version 0.0.2
         * @since 0.0.2
         *
         */
        var Browser = (function (_super) {
            __extends(Browser, _super);
            /**
             * コンストラクタ
             *
             * @version 0.0.2
             * @since 0.0.2
             *
             */
            function Browser() {
                var _this = this;
                _super.call(this);
                this.resizeEndInterval = 100;
                this.scrollEndInterval = 100;
                this.isResize = false;
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
             * @version 0.7.0
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
             * @version 0.4.0
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
                    chrome: /crios|chrome/i.test(ua)
                };
                bua.iOS = bua.iPad || bua.iPhone || bua.iPod || false;
                if (bua.chrome) {
                    bua.safari = false;
                }
                return bua;
            };
            /**
             * 現在のURLのパラメータをリンク先へ引き継がせる
             *
             * @version 0.7.0
             * @since 0.7.0
             *
             */
            Browser.inheritParams = function (targetParam) {
                var $target = $('a, area').filter('[href]');
                var thisLocation = new ui.Locational(location);
                if (!(targetParam in thisLocation.params)) {
                    return;
                }
                var query = targetParam;
                var value = thisLocation.params[targetParam];
                $target.each(function (i, elem) {
                    var targetElem = elem;
                    var loc = new ui.Locational(targetElem);
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
            return Browser;
        })(ui.event.EventDispacher);
        ui.Browser = Browser;
    })(ui = baser.ui || (baser.ui = {}));
})(baser || (baser = {}));
var baser;
(function (baser) {
    var ui;
    (function (ui) {
        /**
         * ブレークポイントの変化に応じた処理をする管理することができるクラス
         *
         * @version 0.7.0
         * @since 0.7.0
         *
         */
        var BreakPoints = (function (_super) {
            __extends(BreakPoints, _super);
            /**
             * コンストラクタ
             *
             * @param breakPoints ブレークポイントとコールバックに渡す値を設定する
             * @param callback 変化に応じたコールバック
             */
            function BreakPoints(breakPoints, callback) {
                var _this = this;
                _super.call(this);
                this.currentPoint = 0;
                this.breakPoints = [];
                this._values = {};
                this._setBreakPoints(breakPoints);
                ui.Browser.browser.on('resizeend', function () {
                    var i = 0;
                    var l = _this.breakPoints.length;
                    var wW = window.document.documentElement.clientWidth;
                    var overPoint;
                    var value;
                    for (; i < l; i++) {
                        overPoint = _this.breakPoints[i];
                        if (wW <= overPoint) {
                            if (_this.currentPoint !== overPoint) {
                                _this.currentPoint = overPoint;
                                value = _this._values[overPoint + ''];
                                if (callback) {
                                    callback(value, overPoint, wW);
                                }
                                _this.trigger('breakpoint', [value, overPoint, wW], _this);
                                _this.trigger('breakpoint:' + overPoint, [value, wW], _this);
                            }
                            break;
                        }
                    }
                });
            }
            /**
             * ブレークポイントの登録処理
             *
             * @param breakPoints ブレークポイントとコールバックに渡す値を設定する
             */
            BreakPoints.prototype._setBreakPoints = function (breakPoints) {
                var breakPointStr;
                var breakPoint;
                var value;
                for (breakPointStr in breakPoints) {
                    if (breakPoints.hasOwnProperty(breakPointStr)) {
                        breakPoint = parseFloat(breakPointStr);
                        if (breakPoint >= 1) {
                            this.breakPoints.push(breakPoint);
                            value = breakPoints[breakPointStr];
                            this._values[breakPoint + ''] = value;
                        }
                    }
                }
                this.breakPoints.sort(function (a, b) { return a - b; });
            };
            /**
             * ブレークポイントを追加する
             *
             * @param breakPoints ブレークポイントとコールバックに渡す値を設定する
             */
            BreakPoints.prototype.add = function (breakPoints) {
                this._setBreakPoints(breakPoints);
            };
            return BreakPoints;
        })(ui.event.EventDispacher);
        ui.BreakPoints = BreakPoints;
    })(ui = baser.ui || (baser.ui = {}));
})(baser || (baser = {}));
var baser;
(function (baser) {
    var ui;
    (function (ui) {
        /**
         * 時間管理クラス
         *
         * @version 0.0.8
         * @since 0.0.1
         *
         */
        var Timer = (function () {
            /**
             * コンストラクタ
             *
             * @version 0.0.8
             * @since 0.0.1
             *
             */
            function Timer() {
                /**
                 * タイマーID
                 *
                 * @version 0.0.8
                 * @since 0.0.8
                 *
                 */
                this.timerId = null;
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
                 * プログレスイベントのコールバック
                 *
                 * @version 0.0.8
                 * @since 0.0.8
                 *
                 */
                this._onProgress = null;
                this.now();
            }
            /**
             * 暗黙の型変換時の振る舞い
             *
             * @version 0.0.1
             * @since 0.0.1
             *
             */
            Timer.prototype.valueOf = function () {
                return this.datetime.valueOf();
            };
            /**
             * 時間を現在に更新する
             *
             * @version 0.0.1
             * @since 0.0.1
             *
             */
            Timer.prototype.now = function () {
                this.datetime = new Date();
                return this.valueOf();
            };
            /**
             * タイマーをスタートする
             *
             * @version 0.0.8
             * @since 0.0.8
             *
             */
            Timer.prototype.start = function (time) {
                var _this = this;
                var startTimestamp = this.now();
                this.stop();
                var tick = function () {
                    _this.timerId = window.setTimeout(function () {
                        var period = _this.now() - startTimestamp;
                        if (period < time) {
                            if (_this._onProgress) {
                                _this._onProgress.call(_this);
                            }
                            tick();
                        }
                        else {
                            _this.stop();
                        }
                    }, _this.interval);
                };
                return this;
            };
            /**
             * タイマーをストップする
             *
             * @version 0.0.8
             * @since 0.0.8
             *
             */
            Timer.prototype.stop = function () {
                clearTimeout(this.timerId);
                this.timerId = null;
                return this;
            };
            /**
             * 遅延処理
             *
             * @version 0.0.8
             * @since 0.0.8
             *
             */
            Timer.prototype.wait = function (time, callback, context) {
                var _this = this;
                if (context == null) {
                    context = this;
                }
                this.stop();
                this.timerId = window.setTimeout(function () {
                    _this.stop();
                    callback.call(context);
                }, time);
                return this;
            };
            /**
             * プログレスイベントを登録
             *
             * @version 0.0.8
             * @since 0.0.8
             *
             */
            Timer.prototype.progress = function (callback) {
                if ($.isFunction(callback)) {
                    this._onProgress = callback;
                }
                return this;
            };
            /**
             * 遅延処理
             *
             * @version 0.0.8
             * @since 0.0.8
             *
             */
            Timer.wait = function (time, callback, context) {
                return new Timer().wait(time, callback, context);
            };
            return Timer;
        })();
        ui.Timer = Timer;
    })(ui = baser.ui || (baser.ui = {}));
})(baser || (baser = {}));
var baser;
(function (baser) {
    var ui;
    (function (ui) {
        /**
         * アニメーションフレームを管理するクラス
         *
         * @version 0.0.10
         * @since 0.0.10
         *
         */
        var AnimationFrames = (function () {
            /**
             * フレーム毎のに実行するコールバックを登録する
             *
             * @version 0.0.10
             * @since 0.0.10
             * @return {number} リクエストIDを返す
             *
             */
            function AnimationFrames(callback) {
                this.callback = callback;
            }
            AnimationFrames.prototype.start = function (context) {
                var _this = this;
                var interval;
                context = context || this;
                if ('requestAnimationFrame' in window) {
                    this.requestId = requestAnimationFrame(function () {
                        cancelAnimationFrame(_this.requestId);
                        _this.callback.call(context);
                        _this.start(context);
                    });
                }
                else {
                    interval = 1000 / AnimationFrames.FRAME_RATE;
                    this.requestId = window.setTimeout(function () {
                        window.clearTimeout(_this.requestId);
                        _this.callback.call(context);
                        _this.start(context);
                    }, interval);
                }
            };
            /**
             * リクエストしたコールバックを停止する
             *
             * @version 0.0.10
             * @since 0.0.10
             * @return {number} リクエストIDを返す
             *
             */
            AnimationFrames.prototype.stop = function () {
                if ('cancelAnimationFrame' in window) {
                    cancelAnimationFrame(this.requestId);
                }
                else {
                    window.clearTimeout(this.requestId);
                }
            };
            /**
             * フレームレート
             *
             * @version 0.0.10
             * @since 0.0.10
             *
             */
            AnimationFrames.FRAME_RATE = 60;
            return AnimationFrames;
        })();
        ui.AnimationFrames = AnimationFrames;
    })(ui = baser.ui || (baser.ui = {}));
})(baser || (baser = {}));
var baser;
(function (baser) {
    var ui;
    (function (ui) {
        /**
         * スクロールを管理するクラス
         *
         * @version 0.0.8
         * @since 0.0.8
         *
         */
        var Scroll = (function () {
            function Scroll() {
                this.timer = new ui.Timer();
            }
            /**
             * 対象の要素もしくは位置にスクロールを移動させる
             *
             * @version 0.3.2
             * @since 0.0.8
             * @param {string | HTMLElement | JQuery | number} 対象の要素のセレクタ・HTMLオブジェクト・jQueryオブジェクトもしくはスクロール位置
             * @param {ScrollOptions} オプション
             * @return {Scroll} 自信のスクロールオブジェクト
             *
             */
            Scroll.prototype.to = function (selector, options) {
                var _this = this;
                var ele;
                var x;
                var y;
                var docWidth;
                var docHeight;
                var winWidth;
                var winHeight;
                var maxScrollX;
                var maxScrollY;
                var $target;
                var offset = 0;
                this.options = options || {};
                offset += this.options.offset || 0;
                if (this.options.wheelCancel) {
                    $(document).on('mousewheel', function () {
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
                    $target = $(selector);
                    if (!$target.length) {
                        return this;
                    }
                    ele = $target[0];
                    // スクロール先座標をセットする
                    x = 0;
                    y = 0;
                    // 親のオフセットを足していって自身の座標を確定
                    while (ele) {
                        x += ele.offsetLeft;
                        y += ele.offsetTop;
                        ele = ele.offsetParent;
                    }
                    winWidth = document.documentElement.clientWidth;
                    winHeight = document.documentElement.clientHeight;
                    docWidth = document.documentElement.scrollWidth;
                    docHeight = document.documentElement.scrollHeight;
                    maxScrollX = Math.max(winWidth, docWidth);
                    maxScrollY = Math.max(winHeight, docHeight);
                    this.targetX = Math.min(x, maxScrollX) + offset;
                    this.targetY = Math.min(y, maxScrollY) + offset;
                }
                else {
                    $target = $(window.location.hash);
                    if ($target.length) {
                        ui.Timer.wait(Scroll.delayWhenURLHashTarget, function () {
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
                    this._scroll();
                }
                return this;
            };
            Scroll.prototype._scroll = function () {
                var currentX = this._getX();
                var currentY = this._getY();
                var vx = (this.targetX - currentX) / Scroll.speed;
                var vy = (this.targetY - currentY) / Scroll.speed;
                var nextX = Math.floor(currentX + vx);
                var nextY = Math.floor(currentY + vy);
                if ((Math.abs(vx) < 1 && Math.abs(vy) < 1) || (this.prevX === currentX && this.prevY === currentY)) {
                    // 目標座標付近に到達していたら終了
                    window.scrollTo(this.targetX, this.targetY);
                    this._finish();
                    if ($.isFunction(this.options.onScrollEnd)) {
                        this.options.onScrollEnd.call(this, new $.Event('scrollend'));
                    }
                }
                else {
                    // 繰り返し
                    window.scrollTo(nextX, nextY);
                    this.prevX = currentX;
                    this.prevY = currentY;
                    if ($.isFunction(this.options.onScrollProgress)) {
                        this.options.onScrollProgress.call(this, new $.Event('scrollprogress'));
                    }
                    this.timer.wait(Scroll.interval, this._scroll, this);
                }
            };
            Scroll.prototype._getX = function () {
                return (window.pageXOffset !== undefined) ? window.pageXOffset : (document.documentElement.scrollLeft || document.body.scrollLeft);
            };
            Scroll.prototype._getY = function () {
                return (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement.scrollTop || document.body.scrollTop);
            };
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
        ui.Scroll = Scroll;
    })(ui = baser.ui || (baser.ui = {}));
})(baser || (baser = {}));
var baser;
(function (baser) {
    var ui;
    (function (ui) {
        var element;
        (function (element) {
            /**
             * クラス名の形式
             *
             * @version 0.1.0
             * @since 0.0.1
             *
             */
            (function (ElementClassNameCase) {
                ElementClassNameCase[ElementClassNameCase["HYPHEN_DELIMITED"] = 0] = "HYPHEN_DELIMITED";
                ElementClassNameCase[ElementClassNameCase["SNAKE_CASE"] = 1] = "SNAKE_CASE";
                ElementClassNameCase[ElementClassNameCase["CAMEL_CASE"] = 2] = "CAMEL_CASE";
            })(element.ElementClassNameCase || (element.ElementClassNameCase = {}));
            var ElementClassNameCase = element.ElementClassNameCase;
            /**
             * BEM式のクラス名の接続形式
             *
             * @version 0.1.0
             * @since 0.1.0
             *
             */
            (function (ClassNameSeparatorForBEM) {
                ClassNameSeparatorForBEM[ClassNameSeparatorForBEM["HYPHEN"] = 0] = "HYPHEN";
                ClassNameSeparatorForBEM[ClassNameSeparatorForBEM["DOUBLE_HYPHEN"] = 1] = "DOUBLE_HYPHEN";
                ClassNameSeparatorForBEM[ClassNameSeparatorForBEM["UNDERSCORE"] = 2] = "UNDERSCORE";
                ClassNameSeparatorForBEM[ClassNameSeparatorForBEM["DOUBLE_UNDERSCORE"] = 3] = "DOUBLE_UNDERSCORE";
                ClassNameSeparatorForBEM[ClassNameSeparatorForBEM["CAMEL_CASE"] = 4] = "CAMEL_CASE";
            })(element.ClassNameSeparatorForBEM || (element.ClassNameSeparatorForBEM = {}));
            var ClassNameSeparatorForBEM = element.ClassNameSeparatorForBEM;
            var HYPHEN = '-';
            var DOUBLE_HYPHEN = '--';
            var UNDERSCORE = '_';
            var DOUBLE_UNDERSCORE = '__';
            /**
             * DOM要素の抽象クラス
             *
             * @version 0.3.0
             * @since 0.0.1
             *
             */
            var Element = (function (_super) {
                __extends(Element, _super);
                /**
                 * コンストラクタ
                 *
                 * @version 0.8.0
                 * @since 0.0.1
                 * @param $el 管理するDOM要素のjQueryオブジェクト
                 *
                 */
                function Element($el) {
                    _super.call(this);
                    /**
                     * 管理するDOM要素のname属性値
                     *
                     * @since 0.0.1
                     *
                     */
                    this.name = '';
                    /**
                     * baserJSのエレメント化してたかどうか
                     */
                    this._elementized = false;
                    // 既にbaserJSのエレメント化している場合
                    if ($el.data('bc-element')) {
                        if ('console' in window) {
                            console.warn('This element is elementized of baserJS.');
                        }
                        this._elementized = true;
                        return;
                    }
                    $el.data('bc-element', this);
                    this.$el = $el;
                    // ID・nameの抽出 & 生成
                    var ids = [];
                    var names = [];
                    this.$el.each(function (i, el) {
                        var id = el.id || baser.utility.String.UID();
                        var name = el.getAttribute('name');
                        el.id = id;
                        ids.push(id);
                        names.push(name);
                    });
                    this.id = ids.join(' ');
                    this.name = names.join(' ');
                    // 共通クラスの付加
                    this.addClass(Element.classNameElementCommon);
                }
                /**
                 * クラス名文字列を生成する
                 *
                 * @version 0.1.0
                 * @since 0.1.0
                 *
                 */
                Element.createClassName = function (blockNames, elementNames, modifierName) {
                    if (elementNames === void 0) { elementNames = ''; }
                    if (modifierName === void 0) { modifierName = ''; }
                    var className = '';
                    var prefix;
                    var separator;
                    var elementSeparator;
                    var modifierSeparator;
                    switch (Element.classNameDefaultCase) {
                        case ElementClassNameCase.HYPHEN_DELIMITED:
                            separator = HYPHEN;
                            blockNames = baser.utility.String.hyphenDelimited(blockNames);
                            elementNames = baser.utility.String.hyphenDelimited(elementNames);
                            modifierName = baser.utility.String.hyphenDelimited(modifierName);
                            break;
                        case ElementClassNameCase.SNAKE_CASE:
                            separator = UNDERSCORE;
                            blockNames = baser.utility.String.snakeCase(blockNames);
                            elementNames = baser.utility.String.snakeCase(elementNames);
                            modifierName = baser.utility.String.snakeCase(modifierName);
                            break;
                        case ElementClassNameCase.CAMEL_CASE:
                            separator = '';
                            blockNames = baser.utility.String.camelCase(blockNames, true);
                            elementNames = baser.utility.String.camelCase(elementNames);
                            modifierName = baser.utility.String.camelCase(modifierName);
                            break;
                    }
                    switch (Element.classNameDefaultSeparatorForElement) {
                        case ClassNameSeparatorForBEM.HYPHEN:
                            elementSeparator = HYPHEN;
                            break;
                        case ClassNameSeparatorForBEM.DOUBLE_HYPHEN:
                            elementSeparator = DOUBLE_HYPHEN;
                            break;
                        case ClassNameSeparatorForBEM.UNDERSCORE:
                            elementSeparator = UNDERSCORE;
                            break;
                        case ClassNameSeparatorForBEM.DOUBLE_UNDERSCORE:
                            elementSeparator = DOUBLE_UNDERSCORE;
                            break;
                        case ClassNameSeparatorForBEM.CAMEL_CASE:
                            elementSeparator = '';
                            break;
                    }
                    switch (Element.classNameDefaultSeparatorForModifier) {
                        case ClassNameSeparatorForBEM.HYPHEN:
                            modifierSeparator = HYPHEN;
                            break;
                        case ClassNameSeparatorForBEM.DOUBLE_HYPHEN:
                            modifierSeparator = DOUBLE_HYPHEN;
                            break;
                        case ClassNameSeparatorForBEM.UNDERSCORE:
                            modifierSeparator = UNDERSCORE;
                            break;
                        case ClassNameSeparatorForBEM.DOUBLE_UNDERSCORE:
                            modifierSeparator = DOUBLE_UNDERSCORE;
                            break;
                        case ClassNameSeparatorForBEM.CAMEL_CASE:
                            modifierSeparator = '';
                            break;
                    }
                    if (Element.classNameDefaultPrefix) {
                        prefix = Element.classNameDefaultPrefix;
                        // 先頭のアルファベット・アンダースコア・ハイフン以外を削除
                        prefix = prefix.replace(/^[^a-z_-]/i, '');
                        // アルファベット・数字・アンダースコア・ハイフン以外を削除
                        prefix = prefix.replace(/[^a-z0-9_-]+/ig, '');
                        // 先頭の2個以上連続するハイフンを削除
                        prefix = prefix.replace(/^--+/, '-');
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
                 *
                 * 値なし属性の場合は存在すれば真
                 *
                 * 値あり属性の場合は偽相等の文字列でなければ全て真とする
                 *
                 * ただし値なし属性の場合は値が空文字列のため、偽相等の文字列の例外とする
                 *
                 * @version 0.2.0
                 * @since 0.2.0
                 *
                 */
                Element.getBoolAttr = function ($elem, attrName) {
                    // DOM APIの標準で判定できるものはそれで判断
                    var propValue = $elem.prop(attrName);
                    if (propValue === true) {
                        return true;
                    }
                    // 属性の値の取得 値なし属性の場合は 存在しない場合 undefined を返す
                    var value = $elem.attr(attrName);
                    if (value === undefined) {
                        return false;
                    }
                    // 値なし属性の場合は値が空文字列 （偽相等の文字列の例外）
                    if (value === '') {
                        return true;
                    }
                    // 値あり属性の場合は偽相等の文字列でなければ全て真とする
                    return !baser.utility.String.isFalsy(value);
                };
                /**
                 * クラス名を付加する
                 *
                 * @version 0.1.0
                 * @since 0.1.0
                 *
                 */
                Element.addClassTo = function ($elem, blockNames, elementNames, modifierName) {
                    if (elementNames === void 0) { elementNames = ''; }
                    if (modifierName === void 0) { modifierName = ''; }
                    var className = Element.createClassName(blockNames, elementNames, modifierName);
                    $elem.addClass(className);
                };
                /**
                 * クラス名を取り除く
                 *
                 * @version 0.1.0
                 * @since 0.1.0
                 *
                 */
                Element.removeClassFrom = function ($elem, blockNames, elementNames, modifierName) {
                    if (elementNames === void 0) { elementNames = ''; }
                    if (modifierName === void 0) { modifierName = ''; }
                    var className = Element.createClassName(blockNames, elementNames, modifierName);
                    $elem.removeClass(className);
                };
                /**
                 * CSSプロパティをDOM要素から取り除く
                 *
                 * @version 0.2.2
                 * @since 0.2.2
                 *
                 */
                Element.removeCSSPropertyFromDOMElement = function (propertyName, elem) {
                    var style = elem.style;
                    // IE8以下はCSSStyleDeclarationのインターフェイスが標準でないのでメソッド定義チェックでエラーになる
                    var styleIE8lt = style;
                    if (style) {
                        if (style.removeProperty) {
                            style.removeProperty(propertyName);
                        }
                        else if (styleIE8lt.removeAttribute) {
                            styleIE8lt.removeAttribute(propertyName);
                        }
                    }
                };
                /**
                 * CSSプロパティを取り除く
                 *
                 * @version 0.2.2
                 * @since 0.2.2
                 *
                 */
                Element.removeCSSProperty = function (propertyName, $elem) {
                    $elem.each(function (i, elem) {
                        Element.removeCSSPropertyFromDOMElement(propertyName, elem);
                    });
                };
                /**
                 * クラス名を付加する
                 *
                 * @version 0.1.0
                 * @since 0.1.0
                 *
                 */
                Element.prototype.addClass = function (blockNames, elementNames, modifierName) {
                    if (elementNames === void 0) { elementNames = ''; }
                    if (modifierName === void 0) { modifierName = ''; }
                    var className = Element.createClassName(blockNames, elementNames, modifierName);
                    this.$el.addClass(className);
                };
                /**
                 * 要素の属性の真偽を判定する
                 *
                 * `baser.ui.element.Element.getBoolAttr` のインスタンスメソッド版
                 *
                 * @version 0.2.0
                 * @since 0.2.0
                 *
                 */
                Element.prototype.getBoolAttr = function (attrName) {
                    return Element.getBoolAttr(this.$el, attrName);
                };
                /**
                 * オプションとdata属性の値、属性の値をマージする
                 *
                 * TODO: テストを書く
                 * TODO: サブクラスに反映させる
                 *
                 * @version 0.8.0
                 * @since 0.8.0
                 *
                 */
                Element.prototype.mergeOptions = function (defaultOptions, options) {
                    var optName;
                    var attrs = {};
                    var dataAttrs = {};
                    for (optName in defaultOptions) {
                        if (defaultOptions.hasOwnProperty(optName)) {
                            // 属性はidとclassは除外する
                            switch (optName) {
                                case 'id':
                                case 'class': {
                                    break;
                                }
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
                Element.classNameDefaultPrefix = '-bc';
                /**
                 * インスタンスに付加するデフォルトのクラス名
                 *
                 * @version 0.1.0
                 * @since 0.1.0
                 *
                 */
                Element.classNameElementCommon = 'element';
                /**
                 * クラス名のデフォルトの単語繋ぎの形式
                 *
                 * @version 0.1.0
                 * @since 0.1.0
                 *
                 */
                Element.classNameDefaultCase = ElementClassNameCase.HYPHEN_DELIMITED;
                /**
                 * BEMのエレメントのクラス名の繋ぎ文字
                 *
                 * @version 0.1.0
                 * @since 0.1.0
                 *
                 */
                Element.classNameDefaultSeparatorForElement = ClassNameSeparatorForBEM.DOUBLE_UNDERSCORE;
                /**
                 * BEMのモディファイアのクラス名の繋ぎ文字
                 *
                 * @version 0.1.0
                 * @since 0.1.0
                 *
                 */
                Element.classNameDefaultSeparatorForModifier = ClassNameSeparatorForBEM.DOUBLE_HYPHEN;
                return Element;
            })(ui.event.EventDispacher);
            element.Element = Element;
        })(element = ui.element || (ui.element = {}));
    })(ui = baser.ui || (baser.ui = {}));
})(baser || (baser = {}));
var baser;
(function (baser) {
    var ui;
    (function (ui) {
        var element;
        (function (element) {
            /**
             * フォーム要素の抽象クラス
             *
             * @version 0.1.0
             * @since 0.0.1
             *
             */
            var FormElement = (function (_super) {
                __extends(FormElement, _super);
                /**
                 * コンストラクタ
                 *
                 * @version 0.8.0
                 * @since 0.0.1
                 * @param $el 管理するDOM要素のjQueryオブジェクト
                 * @param options オプション
                 *
                 */
                function FormElement($el, options) {
                    _super.call(this, $el);
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
                    if (!$el[0].querySelector) {
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
                    this.setDisabled($el.prop('disabled'));
                    this._onblur();
                    // フォーム要素に登録
                    FormElement.elements.push(this);
                }
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
                 * ラベル要素内のテキストを取得する
                 *
                 * @version 0.4.1
                 * @since 0.4.0
                 *
                 */
                FormElement.prototype._setLabelText = function () {
                    var _this = this;
                    var $labelContents = this.$label.contents();
                    var $before = $();
                    var $after = $();
                    var isBefore = true;
                    if (this._config.label) {
                        this.$label.prepend(this._config.label);
                        this.labelBeforeText = this._config.label;
                        this.labelAfterText = '';
                    }
                    else {
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
                 * @version 0.5.1
                 * @since 0.4.0
                 *
                 */
                FormElement.prototype._asignLabel = function () {
                    var $label;
                    var hasLabel;
                    this.hasLabelByForAttr = false;
                    // 祖先のlabel要素を検索
                    $label = this.$el.closest('label');
                    // label要素の存在
                    hasLabel = !!$label.length;
                    // labelでネストされていたかどうか
                    this.isWrappedByLabel = hasLabel;
                    // for属性に関連づいたlabel要素を取得
                    if (!hasLabel) {
                        $label = $('label[for="' + this.id + '"]');
                        hasLabel = !!$label.length;
                        this.hasLabelByForAttr = hasLabel;
                    }
                    // ラベルがないときにラベル要素を生成する
                    if (this._config.autoLabeling && !hasLabel) {
                        // label(もしくは別の)要素の生成
                        $label = $('<' + this._config.labelTag.toLowerCase() + ' />');
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
                    element.Element.addClassTo($label, FormElement.classNameFormElementCommon);
                    element.Element.addClassTo($label, FormElement.classNameFormElementCommon, FormElement.classNameLabel);
                    this.$label = $label;
                };
                /**
                 * ラップ要素を生成
                 *
                 * @version 0.5.1
                 * @since 0.4.0
                 *
                 */
                FormElement.prototype._createWrapper = function () {
                    var wrapperHtml = '<span />';
                    var $wrapper = $(wrapperHtml);
                    element.Element.addClassTo($wrapper, FormElement.classNameFormElementCommon);
                    element.Element.addClassTo($wrapper, FormElement.classNameWrapper);
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
                 * @version 0.4.1
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
                 * @version 0.1.0
                 * @since 0.0.1
                 *
                 */
                FormElement.prototype._onfocus = function () {
                    this.hasFocus = true;
                    element.Element.addClassTo(this.$el, FormElement.classNameFormElementCommon, '', FormElement.classNameStateFocus);
                    element.Element.addClassTo(this.$label, FormElement.classNameFormElementCommon, FormElement.classNameLabel, FormElement.classNameStateFocus);
                    element.Element.addClassTo(this.$wrapper, FormElement.classNameWrapper, '', FormElement.classNameStateFocus);
                    element.Element.removeClassFrom(this.$el, FormElement.classNameFormElementCommon, '', FormElement.classNameStateBlur);
                    element.Element.removeClassFrom(this.$label, FormElement.classNameFormElementCommon, FormElement.classNameLabel, FormElement.classNameStateBlur);
                    element.Element.removeClassFrom(this.$wrapper, FormElement.classNameWrapper, '', FormElement.classNameStateBlur);
                };
                /**
                 * フォーカスがはずれた時の処理
                 *
                 * @version 0.1.0
                 * @since 0.0.1
                 *
                 */
                FormElement.prototype._onblur = function () {
                    this.hasFocus = false;
                    element.Element.addClassTo(this.$el, FormElement.classNameFormElementCommon, '', FormElement.classNameStateBlur);
                    element.Element.addClassTo(this.$label, FormElement.classNameFormElementCommon, FormElement.classNameLabel, FormElement.classNameStateBlur);
                    element.Element.addClassTo(this.$wrapper, FormElement.classNameWrapper, '', FormElement.classNameStateBlur);
                    element.Element.removeClassFrom(this.$el, FormElement.classNameFormElementCommon, '', FormElement.classNameStateFocus);
                    element.Element.removeClassFrom(this.$label, FormElement.classNameFormElementCommon, FormElement.classNameLabel, FormElement.classNameStateFocus);
                    element.Element.removeClassFrom(this.$wrapper, FormElement.classNameWrapper, '', FormElement.classNameStateFocus);
                };
                /**
                 * changeイベントを発火する
                 *
                 * @version 0.4.0
                 * @since 0.4.0
                 *
                 */
                FormElement.prototype._fireChangeEvent = function (isSilent) {
                    if (isSilent === void 0) { isSilent = false; }
                    var e;
                    var legacyElement;
                    if (isSilent) {
                        this.$el.trigger('change.bcFormElement', [{ isSilent: true }]);
                    }
                    else if ('createEvent' in document) {
                        e = document.createEvent('Event');
                        e.initEvent('change', true, true);
                        this.$el[0].dispatchEvent(e);
                    }
                    else {
                        // IE8
                        legacyElement = this.$el[0];
                        legacyElement.fireEvent('onchange');
                    }
                };
                /**
                 * 値を設定する
                 *
                 * @version 0.4.1
                 * @since 0.4.0
                 *
                 */
                FormElement.prototype.setValue = function (value, isSilent) {
                    if (isSilent === void 0) { isSilent = false; }
                    var valueString = String(value);
                    var currentValue = this.$el.val();
                    if (!this.disabled && currentValue !== valueString) {
                        this.$el.val(valueString);
                        this._fireChangeEvent(isSilent);
                    }
                };
                /**
                 * 無効状態を設定する
                 *
                 * @version 0.4.0
                 * @since 0.4.0
                 *
                 */
                FormElement.prototype.setDisabled = function (isDisabled) {
                    this.disabled = isDisabled;
                    this.$el.prop('disabled', isDisabled);
                    if (this.disabled) {
                        element.Element.addClassTo(this.$el, FormElement.classNameFormElementCommon, '', FormElement.classNameStateDisabled);
                        element.Element.addClassTo(this.$label, FormElement.classNameFormElementCommon, FormElement.classNameLabel, FormElement.classNameStateDisabled);
                        element.Element.addClassTo(this.$wrapper, FormElement.classNameWrapper, '', FormElement.classNameStateDisabled);
                    }
                    else {
                        element.Element.removeClassFrom(this.$el, FormElement.classNameFormElementCommon, '', FormElement.classNameStateDisabled);
                        element.Element.removeClassFrom(this.$label, FormElement.classNameFormElementCommon, FormElement.classNameLabel, FormElement.classNameStateDisabled);
                        element.Element.removeClassFrom(this.$wrapper, FormElement.classNameWrapper, '', FormElement.classNameStateDisabled);
                    }
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
            })(element.Element);
            element.FormElement = FormElement;
        })(element = ui.element || (ui.element = {}));
    })(ui = baser.ui || (baser.ui = {}));
})(baser || (baser = {}));
var baser;
(function (baser) {
    var ui;
    (function (ui) {
        var element;
        (function (element) {
            /**
             * テキストフィールドの拡張クラス
             *
             * @version 0.4.0
             * @since 0.4.0
             *
             */
            var TextField = (function (_super) {
                __extends(TextField, _super);
                /**
                 * コンストラクタ
                 *
                 * @version 0.8.0
                 * @since 0.4.0
                 * @param $el 管理するDOM要素のjQueryオブジェクト
                 * @param options オプション
                 *
                 */
                function TextField($el, options) {
                    _super.call(this, $el, $.extend({}, TextField.defaultOption, options));
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
                    if (!$el[0].querySelector) {
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
                 * @version 0.4.0
                 * @since 0.4.0
                 * @override
                 *
                 */
                TextField.prototype._createWrapper = function () {
                    _super.prototype._createWrapper.call(this);
                    element.Element.addClassTo(this.$wrapper, TextField.classNameTextField + '-' + element.FormElement.classNameWrapper);
                };
                /**
                 * イベントの登録
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
                 * @version 0.4.0
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
                 * @version 0.4.0
                 * @since 0.4.0
                 *
                 */
                TextField.prototype._setStateInputted = function () {
                    this.isEmpty = false;
                    element.Element.removeClassFrom(this.$el, element.FormElement.classNameFormElementCommon, '', TextField.classNameStateUninput);
                    element.Element.removeClassFrom(this.$label, element.FormElement.classNameFormElementCommon, element.FormElement.classNameLabel, TextField.classNameStateUninput);
                    element.Element.removeClassFrom(this.$wrapper, element.FormElement.classNameWrapper, '', TextField.classNameStateUninput);
                };
                /**
                 * 入力されていない状態を設定する
                 *
                 * @version 0.4.0
                 * @since 0.4.0
                 *
                 */
                TextField.prototype._setStateUninputted = function () {
                    this.isEmpty = true;
                    element.Element.addClassTo(this.$el, element.FormElement.classNameFormElementCommon, '', TextField.classNameStateUninput);
                    element.Element.addClassTo(this.$label, element.FormElement.classNameFormElementCommon, element.FormElement.classNameLabel, TextField.classNameStateUninput);
                    element.Element.addClassTo(this.$wrapper, element.FormElement.classNameWrapper, '', TextField.classNameStateUninput);
                };
                /**
                 * プレースホルダーと値が同じかどうか
                 *
                 * @version 0.4.0
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
                 * @version 0.4.0
                 * @since 0.4.0
                 *
                 */
                TextField.prototype._msCaretMoveToTop = function () {
                    // TODO: MS用の型を調査して定義
                    var input = this.$el[0];
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
            })(element.FormElement);
            element.TextField = TextField;
        })(element = ui.element || (ui.element = {}));
    })(ui = baser.ui || (baser.ui = {}));
})(baser || (baser = {}));
var baser;
(function (baser) {
    var ui;
    (function (ui) {
        var element;
        (function (element) {
            /**
             * セレクトボックスの拡張クラス
             *
             * @version 0.1.0
             * @since 0.0.1
             *
             */
            var Select = (function (_super) {
                __extends(Select, _super);
                /**
                 * コンストラクタ
                 *
                 * @version 0.8.0
                 * @since 0.0.1
                 * @param $el 管理するDOM要素のjQueryオブジェクト
                 * @param options オプション
                 *
                 */
                function Select($el, options) {
                    _super.call(this, $el, $.extend({}, Select.defaultOption, options));
                    // 既にエレメント化されていた場合は何もしない
                    if (this._elementized) {
                        return;
                    }
                    // IE6・7は反映させない
                    if (!$el[0].querySelector) {
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
                 * @version 0.4.0
                 * @since 0.4.0
                 * @override
                 *
                 */
                Select.prototype._createWrapper = function () {
                    _super.prototype._createWrapper.call(this);
                    element.Element.addClassTo(this.$wrapper, Select.classNameSelect + '-' + element.FormElement.classNameWrapper);
                };
                /**
                 * 擬似セレクトボックス要素を生成する
                 *
                 * @version 0.4.1
                 * @since 0.4.0
                 * @override
                 *
                 */
                Select.prototype._createPsuedoElements = function () {
                    var _this = this;
                    this.$pseudo = $('<a />');
                    this.$pseudo.attr('href', '#'); // Focusable
                    this.$pseudo.insertAfter(this.$el);
                    element.Element.addClassTo(this.$pseudo, element.FormElement.classNameFormElementCommon);
                    element.Element.addClassTo(this.$pseudo, Select.classNamePseudoSelect);
                    this.$selected = $('<span />');
                    this.$selected.appendTo(this.$pseudo);
                    element.Element.addClassTo(this.$selected, element.FormElement.classNameFormElementCommon);
                    element.Element.addClassTo(this.$selected, Select.classNamePseudoSelect, Select.classNamePseudoSelectedDisplay);
                    if (!this._config.useDefaultOptionList) {
                        this.$options = $('<ul />');
                        this.$options.appendTo(this.$pseudo);
                        element.Element.addClassTo(this.$options, element.FormElement.classNameFormElementCommon);
                        element.Element.addClassTo(this.$options, Select.classNamePseudoSelect, Select.classNameSelectOptionList);
                        this.$el.find('option').each(function (i, opt) {
                            var $opt = $(opt);
                            var value = $opt.val();
                            var text = $opt.text();
                            var $psuedoOpt = $('<li />');
                            $psuedoOpt.appendTo(_this.$options);
                            $psuedoOpt.data('value', value);
                            $psuedoOpt.text(text);
                            element.Element.addClassTo($psuedoOpt, element.FormElement.classNameFormElementCommon);
                            element.Element.addClassTo($psuedoOpt, Select.classNameSelectOptionList, Select.classNameSelectOption);
                        });
                    }
                    if (ui.Browser.spec.isTouchable) {
                        if (ui.Browser.spec.ua.iPhone || ui.Browser.spec.ua.iPod) {
                            this.addClass(Select.classNameOsIOs);
                            element.Element.addClassTo(this.$wrapper, Select.classNameOsIOs);
                            element.Element.addClassTo(this.$label, Select.classNameOsIOs);
                        }
                        else if (ui.Browser.spec.ua.android) {
                            this.addClass(Select.classNameOsAndroid);
                            element.Element.addClassTo(this.$wrapper, Select.classNameOsAndroid);
                            element.Element.addClassTo(this.$label, Select.classNameOsAndroid);
                        }
                    }
                    if (this._config.useDefaultOptionList) {
                        this.addClass(Select.classNameUseDefaultOptionList);
                        element.Element.addClassTo(this.$wrapper, Select.classNameUseDefaultOptionList);
                        element.Element.addClassTo(this.$label, Select.classNameUseDefaultOptionList);
                    }
                };
                /**
                 * イベントの登録
                 *
                 * @version 0.4.1
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
                 * スクロール位置を調整する
                 *
                 * @version 0.1.0
                 * @since 0.1.0
                 *
                 */
                Select.prototype._scrollToSelectedPosition = function () {
                    var $psuedoOptList;
                    var $psuedoOpt;
                    var optPos;
                    var cntPos;
                    if (this.$options) {
                        $psuedoOptList = this.$options.find('li');
                        this.$el.find('option').each(function (i, opt) {
                            var $opt = $(opt);
                            var isSelected = $opt.prop('selected');
                            if (isSelected) {
                                $psuedoOpt = $psuedoOptList.eq(i);
                            }
                        });
                        // ポジションを正しく取得するために一度スクロール位置をリセットする
                        this.$options.scrollTop(0);
                        optPos = $psuedoOpt.offset();
                        cntPos = this.$options.offset();
                        if (optPos && cntPos) {
                            this.$options.scrollTop(optPos.top - cntPos.top);
                        }
                    }
                };
                /**
                 * 擬似要素にフォーカスがあったった時のイベントと伝達を制御する
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
                 * @version 0.4.0
                 * @since 0.4.0
                 *
                 * TODO: KeyCodeの数値をマジックナンバーにせずに定数から参照するようにする
                 *
                 */
                Select.prototype._bindKeybordEvent = function () {
                    var _this = this;
                    $(document).on('keydown', function (e) {
                        if (_this.hasFocus) {
                            switch (e.keyCode) {
                                // keyUp
                                case 38: {
                                    _this.prev(true);
                                    _this._scrollToSelectedPosition();
                                    e.preventDefault();
                                    break;
                                }
                                // keyDown
                                case 40: {
                                    _this.next(true);
                                    _this._scrollToSelectedPosition();
                                    e.preventDefault();
                                    break;
                                }
                                // Return (Enter)
                                case 13: {
                                    if (_this._currentIndex !== _this.getIndex()) {
                                        _this._fireChangeEvent();
                                    }
                                    _this._onblur();
                                    e.preventDefault();
                                    break;
                                }
                            }
                        }
                    });
                };
                /**
                 * フォーカスがあたった時の処理
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
                        element.Element.addClassTo(this.$pseudo, Select.classNamePseudoSelect, '', element.FormElement.classNameStateFocus);
                        element.Element.removeClassFrom(this.$pseudo, Select.classNamePseudoSelect, '', element.FormElement.classNameStateBlur);
                        // スクロール位置を調整する
                        this._scrollToSelectedPosition();
                        // 一覧を開いた時のインデックス番号を記録する
                        this._currentIndex = this.getIndex();
                    }
                };
                /**
                 * フォーカスがはずれた時の処理
                 *
                 * @version 0.1.0
                 * @since 0.0.1
                 *
                 */
                Select.prototype._onblur = function () {
                    // 一旦 コンストラクタのsuper()の中で_onblur()が$pseudoプロパティを作成する前に呼び出されるため
                    if (this.$pseudo) {
                        _super.prototype._onblur.call(this);
                        element.Element.addClassTo(this.$pseudo, Select.classNamePseudoSelect, '', element.FormElement.classNameStateBlur);
                        element.Element.removeClassFrom(this.$pseudo, Select.classNamePseudoSelect, '', element.FormElement.classNameStateFocus);
                    }
                };
                /**
                 * 要素の状態を更新する
                 *
                 * @version 0.8.0
                 * @since 0.0.1
                 *
                 */
                Select.prototype.update = function () {
                    this._update();
                    return this;
                };
                /**
                 * 要素の状態を更新する
                 *
                 * @version 0.8.0
                 * @since 0.0.1
                 *
                 */
                Select.prototype._update = function () {
                    var _this = this;
                    var $selectedOption;
                    var $psuedoOptList;
                    $selectedOption = this.$el.find(':selected');
                    if (this.$options) {
                        $psuedoOptList = this.$options.find('li');
                    }
                    this.$el.find('option').each(function (i, opt) {
                        var $opt = $(opt);
                        var isSelected;
                        var isDisabled;
                        var $psuedoOpt;
                        isSelected = $opt.prop('selected');
                        isDisabled = $opt.prop('disabled');
                        if (isSelected) {
                            _this.$selected.text($opt.text());
                        }
                        if (_this.$options) {
                            $psuedoOpt = $psuedoOptList.eq(i);
                            $psuedoOpt.attr('aria-selected', '' + isSelected);
                            $psuedoOpt.attr('aria-disabled', '' + isDisabled);
                            if (isSelected) {
                                element.Element.addClassTo($psuedoOpt, Select.classNameSelectOptionList, Select.classNameSelectOption, Select.classNameStateSelected);
                                element.Element.removeClassFrom($psuedoOpt, Select.classNameSelectOptionList, Select.classNameSelectOption, Select.classNameStateUnselected);
                            }
                            else {
                                element.Element.addClassTo($psuedoOpt, Select.classNameSelectOptionList, Select.classNameSelectOption, Select.classNameStateUnselected);
                                element.Element.removeClassFrom($psuedoOpt, Select.classNameSelectOptionList, Select.classNameSelectOption, Select.classNameStateSelected);
                            }
                            if (isDisabled) {
                                element.Element.addClassTo($psuedoOpt, Select.classNameSelectOptionList, Select.classNameSelectOption, Select.classNameStateDisabled);
                            }
                            else {
                                element.Element.removeClassFrom($psuedoOpt, Select.classNameSelectOptionList, Select.classNameSelectOption, Select.classNameStateDisabled);
                            }
                        }
                    });
                };
                /**
                 * 値を設定する
                 *
                 * @version 0.4.0
                 * @since 0.4.0
                 * @override
                 *
                 */
                Select.prototype.setValue = function (value) {
                    var valueString = String(value);
                    var $targetOption = this.$el.find('option[value="' + valueString + '"]');
                    if ($targetOption.length && !$targetOption.prop('selected')) {
                        $targetOption.prop('selected', true);
                        this._fireChangeEvent();
                    }
                };
                /**
                 * 値をインデックス番号から設定する
                 *
                 * @version 0.8.0
                 * @since 0.4.0
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
                 * @version 0.4.0
                 * @since 0.4.0
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
                 * @version 0.4.0
                 * @since 0.4.0
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
                 * @version 0.4.0
                 * @since 0.4.0
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
                 * @version 0.4.1
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
                 * オプションのデフォルト値
                 *
                 * @version 0.4.0
                 * @since 0.4.0
                 *
                 */
                Select.defaultOption = {
                    useDefaultOptionList: ui.Browser.spec.isTouchable && ui.Browser.spec.ua.iPhone || ui.Browser.spec.ua.iPod || ui.Browser.spec.ua.android
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
            })(element.FormElement);
            element.Select = Select;
        })(element = ui.element || (ui.element = {}));
    })(ui = baser.ui || (baser.ui = {}));
})(baser || (baser = {}));
var baser;
(function (baser) {
    var ui;
    (function (ui) {
        var element;
        (function (element) {
            /**
             * ラジオボタンとチェックボックスの抽象クラス
             *
             * @version 0.1.0
             * @since 0.0.1
             *
             */
            var CheckableElement = (function (_super) {
                __extends(CheckableElement, _super);
                /**
                 * コンストラクタ
                 *
                 * @version 0.8.0
                 * @since 0.0.1
                 * @param $el 管理するDOM要素のjQueryオブジェクト
                 * @param options オプション
                 *
                 */
                function CheckableElement($el, options) {
                    var _this = this;
                    _super.call(this, $el, $.extend({}, CheckableElement.defaultOption, options));
                    // 既にエレメント化されていた場合は何もしない
                    if (this._elementized) {
                        return;
                    }
                    // IE6・7は反映させない
                    if (!$el[0].querySelector) {
                        return;
                    }
                    this._checkedClass = this._config.checkedClass;
                    this.checked = this.$el.prop('checked');
                    this.defaultChecked = this.$el.prop('defaultChecked');
                    this._update();
                    this.$el.on('change.bcCheckableElement', function () {
                        _this._onchenge();
                    });
                }
                /**
                 * 要素の状態を更新する
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
                 * @version 0.1.0
                 * @since 0.0.1
                 *
                 */
                CheckableElement.prototype._update = function () {
                    var checked = this.$el.prop('checked');
                    // WAI-ARIA属性
                    this.$el.attr('aria-checked', '' + checked);
                    if (checked) {
                        this.$el.addClass(this._checkedClass);
                        this.$label.addClass(this._checkedClass);
                        this.$wrapper.addClass(this._checkedClass);
                        element.Element.addClassTo(this.$el, element.FormElement.classNameFormElementCommon, '', CheckableElement.classNameStateChecked);
                        element.Element.addClassTo(this.$label, element.FormElement.classNameFormElementCommon, element.FormElement.classNameLabel, CheckableElement.classNameStateChecked);
                        element.Element.addClassTo(this.$wrapper, element.FormElement.classNameWrapper, '', CheckableElement.classNameStateChecked);
                        element.Element.removeClassFrom(this.$el, element.FormElement.classNameFormElementCommon, '', CheckableElement.classNameStateUnchecked);
                        element.Element.removeClassFrom(this.$label, element.FormElement.classNameFormElementCommon, element.FormElement.classNameLabel, CheckableElement.classNameStateUnchecked);
                        element.Element.removeClassFrom(this.$wrapper, element.FormElement.classNameWrapper, '', CheckableElement.classNameStateUnchecked);
                    }
                    else {
                        this.$el.removeClass(this._checkedClass);
                        this.$label.removeClass(this._checkedClass);
                        this.$wrapper.removeClass(this._checkedClass);
                        element.Element.addClassTo(this.$el, element.FormElement.classNameFormElementCommon, '', CheckableElement.classNameStateUnchecked);
                        element.Element.addClassTo(this.$label, element.FormElement.classNameFormElementCommon, element.FormElement.classNameLabel, CheckableElement.classNameStateUnchecked);
                        element.Element.addClassTo(this.$wrapper, element.FormElement.classNameWrapper, '', CheckableElement.classNameStateUnchecked);
                        element.Element.removeClassFrom(this.$el, element.FormElement.classNameFormElementCommon, '', CheckableElement.classNameStateChecked);
                        element.Element.removeClassFrom(this.$label, element.FormElement.classNameFormElementCommon, element.FormElement.classNameLabel, CheckableElement.classNameStateChecked);
                        element.Element.removeClassFrom(this.$wrapper, element.FormElement.classNameWrapper, '', CheckableElement.classNameStateChecked);
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
            })(element.FormElement);
            element.CheckableElement = CheckableElement;
        })(element = ui.element || (ui.element = {}));
    })(ui = baser.ui || (baser.ui = {}));
})(baser || (baser = {}));
var baser;
(function (baser) {
    var ui;
    (function (ui) {
        var element;
        (function (element) {
            /**
             * ラジオボタンの拡張クラス
             *
             * @version 0.1.0
             * @since 0.0.1
             *
             */
            var Radio = (function (_super) {
                __extends(Radio, _super);
                /**
                 * コンストラクタ
                 *
                 * @version 0.8.0
                 * @since 0.0.1
                 * @param $el 管理するDOM要素のjQueryオブジェクト
                 * @param options オプション
                 *
                 */
                function Radio($el, options) {
                    _super.call(this, $el, options);
                    // 既にエレメント化されていた場合は何もしない
                    if (this._elementized) {
                        return;
                    }
                    // IE6・7は反映させない
                    if (!$el[0].querySelector) {
                        return;
                    }
                    this.addClass(Radio.classNameRadio);
                    element.Element.addClassTo(this.$label, Radio.classNameRadio, element.FormElement.classNameLabel);
                    element.Element.addClassTo(this.$wrapper, Radio.classNameRadio + '-' + element.FormElement.classNameWrapper);
                    // ラジオボタングループに登録
                    if (!element.RadioGroup.groups[this.name]) {
                        element.RadioGroup.groups[this.name] = new element.RadioGroup(this.name);
                    }
                    element.RadioGroup.groups[this.name].add(this);
                }
                /**
                 * チェンジイベントのハンドラ
                 *
                 * @version 0.7.0
                 * @since 0.0.1
                 *
                 */
                Radio.prototype._onchenge = function () {
                    _super.prototype._onchenge.call(this);
                    // 同じname属性のラジオボタン要素も同時に変更をする
                    element.RadioGroup.groups[this.name].update(this);
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
            })(element.CheckableElement);
            element.Radio = Radio;
        })(element = ui.element || (ui.element = {}));
    })(ui = baser.ui || (baser.ui = {}));
})(baser || (baser = {}));
var baser;
(function (baser) {
    var ui;
    (function (ui) {
        var element;
        (function (element) {
            /**
             * チェックボックスの拡張クラス
             *
             * @version 0.1.0
             * @since 0.0.1
             *
             */
            var Checkbox = (function (_super) {
                __extends(Checkbox, _super);
                /**
                 * コンストラクタ
                 *
                 * @version 0.8.0
                 * @since 0.0.1
                 * @param $el 管理するDOM要素のjQueryオブジェクト
                 * @param options オプション
                 *
                 */
                function Checkbox($el, options) {
                    _super.call(this, $el, options);
                    // 既にエレメント化されていた場合は何もしない
                    if (this._elementized) {
                        return;
                    }
                    // IE6・7は反映させない
                    if (!$el[0].querySelector) {
                        return;
                    }
                    this.addClass(Checkbox.classNameCheckbox);
                    element.Element.addClassTo(this.$label, Checkbox.classNameCheckbox, element.FormElement.classNameLabel);
                    element.Element.addClassTo(this.$wrapper, Checkbox.classNameCheckbox + '-' + element.FormElement.classNameWrapper);
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
            })(element.CheckableElement);
            element.Checkbox = Checkbox;
        })(element = ui.element || (ui.element = {}));
    })(ui = baser.ui || (baser.ui = {}));
})(baser || (baser = {}));
var baser;
(function (baser) {
    var ui;
    (function (ui) {
        var element;
        (function (element) {
            /**
             * ラジオボタンのname属性値で紐付いたブループを管理するクラス
             *
             * @since 0.0.1
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
                     * @since 0.0.1
                     *
                     */
                    this.radioButtons = [];
                    this.name = name;
                }
                /**
                 * 紐づくラジオボタンを追加する
                 *
                 * @version 0.0.1
                 * @since 0.0.1
                 * @param radio 拡張ラジオボタン
                 *
                 */
                RadioGroup.prototype.add = function (radio) {
                    var i = 0;
                    var l = this.radioButtons.length;
                    for (; i < l; i++) {
                        if (this.radioButtons[i] === radio) {
                            return;
                        }
                    }
                    this.radioButtons.push(radio);
                };
                /**
                 * 管理するラジオボタンの状態を更新する
                 *
                 * @version 0.0.1
                 * @since 0.0.1
                 * @param ignoreRadio 対象外のラジオボタン
                 *
                 */
                RadioGroup.prototype.update = function (ignoreRadio) {
                    var i = 0;
                    var l = this.radioButtons.length;
                    for (; i < l; i++) {
                        if (this.radioButtons[i] !== ignoreRadio) {
                            this.radioButtons[i].update();
                        }
                    }
                };
                /**
                 * ラジオボタンのグループを保管するオブジェクト
                 *
                 * @since 0.7.0
                 *
                 */
                RadioGroup.groups = {};
                return RadioGroup;
            })();
            element.RadioGroup = RadioGroup;
        })(element = ui.element || (ui.element = {}));
    })(ui = baser.ui || (baser.ui = {}));
})(baser || (baser = {}));
var baser;
(function (baser) {
    var ui;
    (function (ui) {
        var element;
        (function (element) {
            /**
             * 高さ揃えをするボックスを管理するクラス
             *
             * @version 0.7.0
             * @since 0.7.0
             *
             */
            var AlignedBoxes = (function (_super) {
                __extends(AlignedBoxes, _super);
                /**
                 * コンストラクタ
                 *
                 * @version 0.7.0
                 * @since 0.7.0
                 * @param $el 対象のボックス要素
                 * @param column カラム数もしくはブレークポイントに寄るカラム数 `0`の場合すべての要素の高さを揃える
                 * @param callback ボックスの高さ揃えるときのコールバック
                 */
                function AlignedBoxes($el, column, callback) {
                    var _this = this;
                    if (column === void 0) { column = 0; }
                    _super.call(this, $el);
                    AlignedBoxes.boot();
                    var uid = this.$el.data(AlignedBoxes.DATA_KEY_ID);
                    if (uid) {
                        this.destroy();
                    }
                    uid = baser.utility.String.UID();
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
                    this._columns = new ui.BreakPoints(columnInfo, function (column, breakPoint, windowWidth) {
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
                 * @version 0.7.0
                 * @since 0.7.0
                 *
                 */
                AlignedBoxes.createChar = function () {
                    var dummyChar;
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
                 * @version 0.7.0
                 * @since 0.7.0
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
                 * @version 0.7.0
                 * @since 0.7.0
                 *
                 */
                AlignedBoxes.reAlign = function () {
                    var uid;
                    for (uid in AlignedBoxes.groups) {
                        AlignedBoxes.groups[uid].trigger('realign');
                    }
                    return;
                };
                /**
                 * 監視タイマーを起動する
                 *
                 * @version 0.7.0
                 * @since 0.7.0
                 *
                 */
                AlignedBoxes.boot = function () {
                    var $w;
                    if (!AlignedBoxes.isBooted) {
                        $w = $(window);
                        $w.on('load', AlignedBoxes.reAlign);
                        ui.Browser.browser.on('resizeend', AlignedBoxes.reAlign);
                        AlignedBoxes.isBooted = true;
                        AlignedBoxes.createChar();
                        AlignedBoxes.watchTimer = window.setInterval(AlignedBoxes.observerForFontSize, AlignedBoxes.watchInterval);
                    }
                };
                /**
                 * ボックスの高さ揃える
                 *
                 * @version 0.7.0
                 * @since 0.7.0
                 *
                 */
                AlignedBoxes.prototype._align = function () {
                    var _this = this;
                    var tiles;
                    var max;
                    var c;
                    var h;
                    var last = this.$el.length - 1;
                    if (!this._currentColumn) {
                        this._currentColumn = this.$el.length;
                    }
                    this.$el.each(function (i, elem) {
                        var tile;
                        var j, l;
                        var cancel = false;
                        element.Element.removeCSSPropertyFromDOMElement('height', elem);
                        c = i % _this._currentColumn;
                        if (c === 0) {
                            tiles = [];
                        }
                        tile = tiles[c] = $(elem);
                        h = tile.height();
                        if (c === 0 || h > max) {
                            max = h;
                        }
                        if (i === last || c === _this._currentColumn - 1) {
                            l = tiles.length;
                            for (j = 0; j < l; j++) {
                                if (tiles[j]) {
                                    if ($.isFunction(_this._callback)) {
                                        cancel = !_this._callback(max, h, _this);
                                    }
                                    if (!cancel) {
                                        tiles[j].height(max);
                                    }
                                }
                            }
                        }
                    });
                };
                /**
                 * 高さ揃えを解除する
                 *
                 * @version 0.7.0
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
            })(element.Element);
            element.AlignedBoxes = AlignedBoxes;
        })(element = ui.element || (ui.element = {}));
    })(ui = baser.ui || (baser.ui = {}));
})(baser || (baser = {}));
var baser;
(function (baser) {
    var ui;
    (function (ui) {
        var element;
        (function (element) {
            /**
             * マップ要素
             *
             * @version 0.8.0
             * @since 0.0.6
             *
             */
            var Map = (function (_super) {
                __extends(Map, _super);
                /**
                 * コンストラクタ
                 *
                 * @version 0.8.0
                 * @since 0.0.6
                 * @param $el 管理するDOM要素のjQueryオブジェクト
                 * @param options マップオプション
                 *
                 */
                function Map($el, options) {
                    _super.call(this, $el);
                    // 既にエレメント化されていた場合は何もしない
                    if (this._elementized) {
                        return;
                    }
                    // IE6・7は反映させない
                    if (!$el[0].querySelector) {
                        return;
                    }
                    this.$el.addClass(Map.className);
                    if ('google' in window && google.maps) {
                        this.mapOption = $.extend({}, options);
                        this._init();
                    }
                    else {
                        if (console && console.warn) {
                            console.warn('ReferenceError: "//maps.google.com/maps/api/js" を先に読み込む必要があります。');
                        }
                    }
                    Map.maps.push(this);
                    $el.data(Map.className, this);
                }
                /**
                 * 初期化
                 *
                 * @version 0.6.0
                 * @since 0.0.6
                 *
                 */
                Map.prototype._init = function () {
                    var _this = this;
                    // data-*属性からの継承
                    this.mapOption = $.extend(this.mapOption, {
                        zoom: this.$el.data('zoom'),
                        fitBounds: this.$el.data('fit-bounds')
                    });
                    this.markerBounds = new google.maps.LatLngBounds();
                    var mapCenterLat = this.$el.data('lat') || Map.defaultLat;
                    var mapCenterLng = this.$el.data('lng') || Map.defaultLng;
                    var mapCenterAddress = this.$el.data('address') || '';
                    if (mapCenterAddress) {
                        // 住所から緯度・経度を検索する（非同期）
                        Map.getLatLngByAddress(mapCenterAddress, function (lat, lng) {
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
                 * @version 0.8.0
                 * @since 0.2.0
                 * @param mapCenterLat 緯度
                 * @param mapCenterLng 経度
                 *
                 */
                Map.prototype._render = function (mapCenterLat, mapCenterLng) {
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
                                google.maps.MapTypeId.ROADMAP
                            ]
                        },
                        scrollwheel: false,
                        center: new google.maps.LatLng(mapCenterLat, mapCenterLng),
                        styles: null
                    }, this.mapOption);
                    this.info = new google.maps.InfoWindow({
                        disableAutoPan: true
                    });
                    this.gmap = new google.maps.Map(this.$el[0], $.extend({}, this.mapOption, {
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
                 * 再読み込み・再設定
                 *
                 * @version 0.6.0
                 * @since 0.2.0
                 *
                 */
                Map.prototype.reload = function (options) {
                    this.mapOption = options ? $.extend({}, options) : this.mapOption;
                    this._init();
                };
                /**
                 * 住所文字列から座標を非同期で取得
                 *
                 * @version 0.2.0
                 * @since 0.2.0
                 *
                 */
                Map.getLatLngByAddress = function (address, callback) {
                    var geocoder = new google.maps.Geocoder();
                    geocoder.geocode({
                        address: address
                    }, function (results, status) {
                        var lat;
                        var lng;
                        switch (status) {
                            case google.maps.GeocoderStatus.OK:
                                lat = results[0].geometry.location.lat();
                                lng = results[0].geometry.location.lng();
                                break;
                            case google.maps.GeocoderStatus.INVALID_REQUEST:
                            case google.maps.GeocoderStatus.ZERO_RESULTS:
                            case google.maps.GeocoderStatus.OVER_QUERY_LIMIT:
                                if (console && console.warn) {
                                    console.warn('ReferenceError: "' + address + 'は不正な住所のだったため結果を返すことができませんでした。"');
                                }
                                break;
                            case google.maps.GeocoderStatus.ERROR:
                            case google.maps.GeocoderStatus.UNKNOWN_ERROR:
                                if (console && console.warn) {
                                    console.warn('Error: "エラーが発生しました。"');
                                }
                                break;
                        }
                        callback(lat, lng);
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
                Map.defaultLat = 35.681382;
                /**
                 * 初期設定用の経度
                 * 東京都庁
                 *
                 * @version 0.0.6
                 * @since 0.0.6
                 *
                 */
                Map.defaultLng = 139.766084;
                /**
                 * 管理対象の要素に付加するclass属性値のプレフィックス
                 *
                 * @version 0.0.6
                 * @since 0.0.6
                 *
                 */
                Map.className = '-bc-map-element';
                /**
                 * 管理するマップ要素リスト
                 *
                 * @version 0.0.6
                 * @since 0.0.6
                 *
                 */
                Map.maps = [];
                return Map;
            })(element.Element);
            element.Map = Map;
            /**
             * 座標要素
             *
             * @version 0.8.0
             * @since 0.0.6
             *
             */
            var Coordinate = (function () {
                /**
                 * コンストラクタ
                 *
                 * @version 0.8.0
                 * @since 0.0.6
                 *
                 */
                function Coordinate(el, map) {
                    var _this = this;
                    this.$el = $(el);
                    this._map = map;
                    var address = this.$el.data('address');
                    var dfd = $.Deferred();
                    if (address) {
                        Map.getLatLngByAddress(address, function (lat, lng) {
                            _this.lat = lat;
                            _this.lng = lng;
                            _this.position = new google.maps.LatLng(_this.lat, _this.lng);
                            dfd.resolve();
                        });
                    }
                    else {
                        this.lat = this.$el.data('lat');
                        this.lng = this.$el.data('lng');
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
                 * ピンをマップに立てる
                 *
                 * @version 0.8.0
                 * @since 0.0.6
                 *
                 */
                Coordinate.prototype._markTo = function () {
                    var _this = this;
                    this.title = this.$el.attr('title') || this.$el.data('title') || this.$el.find('h1,h2,h3,h4,h5,h6').text() || null;
                    this.icon = this.$el.data('icon') || null;
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
                /**
                 * インフォウィンドウを開く
                 *
                 * @version 0.8.0
                 * @since 0.8.0
                 *
                 */
                Coordinate.prototype.openInfoWindow = function () {
                    this._map.info.setContent(this.$el[0]);
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
                return Coordinate;
            })();
        })(element = ui.element || (ui.element = {}));
    })(ui = baser.ui || (baser.ui = {}));
})(baser || (baser = {}));
var baser;
(function (baser) {
    var ui;
    (function (ui) {
        var element;
        (function (element) {
            /**
             * YouTube要素
             *
             * @version 0.8.0
             * @since 0.0.7
             *
             */
            var Youtube = (function (_super) {
                __extends(Youtube, _super);
                /**
                 * コンストラクタ
                 *
                 * @version 0.8.0
                 * @since 0.0.7
                 * @param $el 管理するDOM要素のjQueryオブジェクト
                 *
                 */
                function Youtube($el, options) {
                    _super.call(this, $el);
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
                    if (!$el[0].querySelector) {
                        return;
                    }
                    if (this._init(options)) {
                        Youtube.movies.push(this);
                        this.$el.addClass(Youtube.className);
                        $el.data(Youtube.className, this);
                    }
                }
                /**
                 * 初期化
                 *
                 * ※ `this.$el` の `embeddedyoutubeplay` イベント非推奨
                 *
                 * @version 0.8.0
                 * @since 0.0.7
                 * @param $el 管理するDOM要素のjQueryオブジェクト
                 * @return {booelan} 初期化が成功したかどうか
                 *
                 */
                Youtube.prototype._init = function (options) {
                    var _this = this;
                    var protocol = location.protocol === 'file:' ? 'http:' : '';
                    var defaultOptions = {
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
                        startSeconds: 0,
                        suggestedQuality: 'default'
                    };
                    this.movieOption = this.mergeOptions(defaultOptions, options);
                    this.$el.empty();
                    this.movieId = this.movieOption.id.split(/\s*,\s*/);
                    var $mov = $('<iframe frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen>');
                    var param = $.param({
                        version: 3,
                        rel: this.movieOption.rel ? 1 : 0,
                        autoplay: this.movieOption.autoplay ? 1 : 0,
                        controls: this.movieOption.controls ? 1 : 0,
                        disablekb: 1,
                        iv_load_policy: 3,
                        loop: this.movieOption.loop ? 1 : 0,
                        modestbranding: 1,
                        showinfo: this.movieOption.showinfo ? 1 : 0,
                        wmode: 'transparent',
                        enablejsapi: 1
                    });
                    var id = this.movieId[this.movieOption.index];
                    var src = protocol + Youtube.PLAYER_URL + id + '?' + param;
                    $mov.prop('src', src);
                    var playerID = this.id + '-Player';
                    $mov.prop('id', playerID);
                    $mov.css({
                        position: 'relative',
                        display: 'block',
                        width: '100%',
                        height: '100%'
                    });
                    $mov.appendTo(this.$el);
                    if (this.movieOption.width) {
                        $mov.width(this.movieOption.width);
                        $mov.data('width', this.movieOption.width);
                    }
                    if (this.movieOption.height) {
                        $mov.height(this.movieOption.height);
                        $mov.data('height', this.movieOption.height);
                    }
                    $.getScript(protocol + Youtube.API_URL);
                    var intervalTimer;
                    intervalTimer = window.setInterval(function () {
                        if (!_this.player && 'YT' in window && YT.Player) {
                            _this._createPlayer(playerID);
                        }
                        if (_this.player && _this.player.pauseVideo && _this.player.playVideo) {
                            window.clearInterval(intervalTimer);
                            _this._onEmbeded();
                        }
                    }, 300);
                    return true;
                };
                /**
                 * プレイヤーを生成する
                 *
                 * @version 0.8.0
                 * @since 0.8.0
                 * @param playerID プレイヤーのDOM ID
                 *
                 */
                Youtube.prototype._createPlayer = function (playerID) {
                    var _this = this;
                    this.player = new YT.Player(playerID, {
                        events: {
                            onStateChange: function (e) {
                                switch (e.data) {
                                    case -1: {
                                        _this.trigger('unstarted', [_this.player]);
                                        var listIndex = _this.player.getPlaylistIndex();
                                        if (_this.currentCueIndex !== listIndex) {
                                            _this.trigger('changecue', [_this.player]);
                                        }
                                        _this.currentCueIndex = listIndex;
                                        break;
                                    }
                                    case YT.PlayerState.BUFFERING: {
                                        _this.trigger('buffering', [_this.player]);
                                        break;
                                    }
                                    case YT.PlayerState.CUED: {
                                        _this.trigger('cued', [_this.player]);
                                        break;
                                    }
                                    case YT.PlayerState.ENDED: {
                                        _this.trigger('ended', [_this.player]);
                                        if (_this.movieId.length > 1 && _this.movieOption.loop && _this.currentCueIndex === _this.movieId.length - 1) {
                                            _this.player.playVideoAt(0);
                                        }
                                        else if (_this.movieOption.loop) {
                                            _this.player.playVideo();
                                        }
                                        break;
                                    }
                                    case YT.PlayerState.PAUSED: {
                                        _this.trigger('paused', [_this.player]);
                                        break;
                                    }
                                    case YT.PlayerState.PLAYING: {
                                        _this.trigger('playing', [_this.player]);
                                        _this.currentCueIndex = _this.player.getPlaylistIndex();
                                        break;
                                    }
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
                 * @version 0.8.0
                 * @since 0.8.0
                 *
                 */
                Youtube.prototype._onEmbeded = function () {
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
                    this.$el.trigger('embeddedyoutubeplay', [this.player]); // TODO: 廃止予定(v1.0.0)
                    this.trigger('embeded', [this.player]);
                };
                /**
                 * 再設定する
                 *
                 * @version 0.0.7
                 * @since 0.0.7
                 *
                 */
                Youtube.prototype.reload = function (options) {
                    this._init(options);
                };
                /**
                 * ミュートする
                 *
                 * @version 0.8.0
                 * @since 0.5.0
                 *
                 */
                Youtube.prototype.mute = function () {
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
                Youtube.prototype.unMute = function () {
                    this.player.unMute();
                    this._isMuted = false;
                    this.trigger('onunmute', [this.player]);
                };
                /**
                 * ミュートのオンオフを要素にアサインする
                 *
                 * @version 0.8.0
                 * @since 0.5.0
                 * @param $el アサインするDOM要素のjQueryオブジェクト
                 * @param options オプション
                 *
                 */
                Youtube.prototype.muteController = function ($el, options) {
                    var _this = this;
                    var defaults = {
                        eventType: 'click',
                        mutedClass: 'is-muted',
                        unmutedClass: 'is-unmuted',
                        baseClass: 'youtube-mute-ctrl'
                    };
                    var conf = $.extend(defaults, options);
                    element.Element.addClassTo($el, conf.baseClass);
                    var update = function () {
                        if (_this._isMuted) {
                            element.Element.addClassTo($el, conf.baseClass, '', conf.mutedClass);
                            element.Element.removeClassFrom($el, conf.baseClass, '', conf.unmutedClass);
                        }
                        else {
                            element.Element.addClassTo($el, conf.baseClass, '', conf.unmutedClass);
                            element.Element.removeClassFrom($el, conf.baseClass, '', conf.mutedClass);
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
                 * 管理対象の要素に付加するclass属性値のプレフィックス
                 *
                 * @version 0.0.7
                 * @since 0.0.7
                 *
                 */
                Youtube.className = '-bc-youtube-element';
                /**
                 * Player URL
                 *
                 * @version 0.0.7
                 * @since 0.0.7
                 *
                 */
                Youtube.PLAYER_URL = '//www.youtube.com/embed/';
                /**
                 * API URL
                 *
                 * @version 0.0.7
                 * @since 0.0.7
                 *
                 */
                Youtube.API_URL = '//www.youtube.com/player_api';
                /**
                 * 管理対象の要素
                 *
                 * @version 0.0.7
                 * @since 0.0.7
                 *
                 */
                Youtube.movies = [];
                return Youtube;
            })(element.Element);
            element.Youtube = Youtube;
        })(element = ui.element || (ui.element = {}));
    })(ui = baser.ui || (baser.ui = {}));
})(baser || (baser = {}));
var baser;
(function (baser) {
    /**
     * YouTubeを埋め込む
     *
     * @version 0.0.8
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
     * ### Result
     *
     * <div data-height="400"
         data-theme-id="9760"
         data-slug-hash="pboIt"
         data-default-tab="result"
         data-user="YusukeHirao"
         class='codepen'>
         <pre>
           <code>$(&#39;.sample&#39;).bcYoutube();</code>
         </pre>
         <p>See the Pen <a href='http://codepen.io/YusukeHirao/pen/pboIt/'>bcYoutube</a>
         by Yusuke Hirao (<a href='http://codepen.io/YusukeHirao'>@YusukeHirao</a>)
         on <a href='http://codepen.io'>CodePen</a>.</p>
       </div>
       <script async src="//assets.codepen.io/assets/embed/ei.js"></script>
     *
     */
    function bcYoutube(options) {
        return this.each(function (i, elem) {
            var $elem = $(elem);
            var data = $elem.data(baser.ui.element.Youtube.className);
            if (data) {
                data.reload(options);
            }
            else {
                new baser.ui.element.Youtube($elem, options);
            }
        });
    }
    // jQueryのインスタンスメソッドとしてprototypeに登録
    $.fn.bcYoutube = bcYoutube;
})(baser || (baser = {}));
var baser;
(function (baser) {
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
    function bcScrollTo(options) {
        return this.on('click', function (e) {
            var $this = $(this);
            var href = $this.attr('href');
            var keyword;
            var target;
            var scroll = new baser.ui.Scroll();
            var absPath;
            var currentReferer;
            if (href) {
                // キーワードを一番に優先する
                if (options && $.isPlainObject(options.keywords)) {
                    for (keyword in options.keywords) {
                        if (options.keywords.hasOwnProperty(keyword)) {
                            target = options.keywords[keyword];
                            if (keyword === href) {
                                scroll.to(target, options);
                                e.preventDefault();
                                return;
                            }
                        }
                    }
                }
                // 「/pathname/#hash」のリンクパターンの場合
                //「/pathname/」が現在のURLだった場合「#hash」に飛ばすようにする
                absPath = $this.prop('href');
                currentReferer = location.protocol + '//' + location.host + location.pathname + location.search;
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
                    target = $(href);
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
    }
    $.fn.bcScrollTo = bcScrollTo;
})(baser || (baser = {}));
$.bcScrollTo = function (selector, options) {
    var scroll = new baser.ui.Scroll();
    scroll.to(selector, options);
};
var baser;
(function (baser) {
    /**
     * WAI-ARIAに対応した装飾可能な汎用要素でラップしたラジオボタンに変更する
     *
     * @version 0.7.0
     * @since 0.0.1
     *
     * * * *
     *
     * ## Sample
     *
     * comming soon...
     *
     */
    function bcRadio(options) {
        return this.each(function (i, elem) {
            var $elem = $(elem);
            new baser.ui.element.Radio($elem, options);
        });
    }
    $.fn.bcRadio = bcRadio;
})(baser || (baser = {}));
var baser;
(function (baser) {
    /**
     * WAI-ARIAに対応した装飾可能な汎用要素でラップしたチェックボックスに変更する
     *
     * @version 0.7.0
     * @since 0.0.1
     *
     * * * *
     *
     * ## Sample
     *
     * comming soon...
     *
     */
    function bcCheckbox(options) {
        return this.each(function (i, elem) {
            var $elem = $(elem);
            new baser.ui.element.Checkbox($elem, options);
        });
    }
    $.fn.bcCheckbox = bcCheckbox;
})(baser || (baser = {}));
var baser;
(function (baser) {
    /**
     * WAI-ARIAに対応した装飾可能な汎用要素でラップしたセレクトボックスに変更する
     *
     * @version 0.8.0
     * @since 0.0.1
     *
     * * * *
     *
     * ## Sample
     *
     * comming soon...
     *
     */
    function bcSelect(options) {
        return this.each(function (i, elem) {
            var $elem = $(elem);
            if (typeof options === 'string') {
                switch (options) {
                    case 'update': {
                        var select = $elem.data('bc-element');
                        select.update();
                    }
                }
            }
            else {
                new baser.ui.element.Select($elem, options);
            }
        });
    }
    $.fn.bcSelect = bcSelect;
})(baser || (baser = {}));
var baser;
(function (baser) {
    /**
     * マップを埋め込む
     *
     * 現在の対応はGoogle Mapsのみ
     *
     * @version 0.0.8
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
    function bcMaps(options) {
        return this.each(function (i, elem) {
            var $elem = $(elem);
            var data = $elem.data(baser.ui.element.Map.className);
            if (data) {
                data.reload(options);
            }
            else {
                new baser.ui.element.Map($elem, options);
            }
        });
    }
    $.fn.bcMaps = bcMaps;
})(baser || (baser = {}));
var baser;
(function (baser) {
    /**
     * 要素の高さを揃える
     *
     * @version 0.7.0
     * @since 0.0.15
     *
     */
    function bcBoxAlignHeight(columnOrKeyword, detailTarget, callback) {
        if (columnOrKeyword === void 0) { columnOrKeyword = 0; }
        var keyword;
        var column;
        var boxes;
        if (typeof columnOrKeyword === 'string') {
            keyword = columnOrKeyword;
            switch (keyword) {
                case 'destroy': {
                    boxes = this.data(baser.ui.element.AlignedBoxes.DATA_KEY);
                    boxes.destroy();
                    break;
                }
            }
        }
        else {
            column = columnOrKeyword;
            var $detailTarget;
            // 要素群の高さを揃え、setsに追加
            if (detailTarget) {
                $detailTarget = this.find(detailTarget);
                if ($detailTarget.length) {
                    this.each(function () {
                        var $split = $(this).find(detailTarget);
                        new baser.ui.element.AlignedBoxes($split, column, callback);
                    });
                }
            }
            else {
                new baser.ui.element.AlignedBoxes(this, column, callback);
            }
        }
        return this;
    }
    // jQueryのインスタンスメソッドとしてprototypeに登録
    $.fn.bcBoxAlignHeight = bcBoxAlignHeight;
})(baser || (baser = {}));
// @version 0.5.0
// @since 0.1.0
$.fn.bcBoxLink = function () {
    this.on('click', function (e) {
        var $elem = $(this);
        var $link = $elem.find('a, area').eq(0);
        var href = $link.prop('href');
        var isBlank;
        if ($link.length && href) {
            isBlank = $link.prop('target') === '_blank';
            baser.ui.Browser.jumpTo(href, isBlank);
            e.preventDefault();
        }
    });
    return this;
};
var baser;
(function (baser) {
    /**
     * マウスオーバー時に画像を切り替える
     *
     * 【使用非推奨】できるかぎり CSS の `:hover` と `background-image` を使用するべきです。
     *
     * @version 0.0.15
     * @since 0.0.15
     *
     */
    var bcRollover = function (options) {
        var config = $.extend({
            pattern: /_off(\.(?:[a-z0-9]{1,6}))$/i,
            replace: '_on$1',
            dataPrefix: '-bc-rollover-',
            ignore: '',
            filter: null,
            stopOnTouch: true
        }, options);
        var $doc = $(document);
        var dataKeyOff = config.dataPrefix + 'off';
        var dataKeyOn = config.dataPrefix + 'on';
        this.each(function (i, elem) {
            var nodeName = elem.nodeName.toLowerCase();
            var avail;
            var src;
            var onSrc;
            var $img = $(elem).not(config.ignore);
            if ($img.length && nodeName === 'img' || (nodeName === 'input' && $img.prop('type') === 'image')) {
                avail = true;
                if ($.isFunction(config.filter)) {
                    avail = !!config.filter.call(elem);
                }
                else if (config.filter) {
                    avail = !!$img.filter(config.filter).length;
                }
                if (avail) {
                    src = $img.attr('src');
                    if (src.match(config.pattern)) {
                        onSrc = src.replace(config.pattern, config.replace);
                        $img.data(dataKeyOff, src);
                        $img.data(dataKeyOn, onSrc);
                    }
                }
            }
        });
        this.on('mouseenter', function (e) {
            var $this = $(this);
            var onSrc;
            if (config.stopOnTouch && $this.data('-bc-is-touchstarted')) {
                $this.data('-bc-is-touchstarted', false);
                return true;
            }
            onSrc = $this.data(dataKeyOn);
            $this.prop('src', onSrc);
            return true;
        });
        this.on('mouseleave', function (e) {
            var $this = $(this);
            var offSrc;
            if (config.stopOnTouch && $this.data('-bc-is-touchstarted')) {
                $this.data('-bc-is-touchstarted', false);
                return true;
            }
            offSrc = $this.data(dataKeyOff);
            $this.prop('src', offSrc);
            return true;
        });
        if (config.stopOnTouch) {
            this.on('touchstart', function (e) {
                var $this = $(this);
                $this.data('-bc-is-touchstarted', true);
                return true;
            });
        }
        return this;
    };
    // jQueryのインスタンスメソッドとしてprototypeに登録
    $.fn.bcRollover = bcRollover;
})(baser || (baser = {}));
var baser;
(function (baser) {
    /**
     * マウスオーバー時に半透明になるエフェクトをかける
     *
     * 【使用非推奨】できるかぎり CSS の `:hover` と `opacity`、そして `transition` を使用するべきです。
     *
     * @version 0.0.15
     * @since 0.0.15
     *
     */
    var bcShy = function (options) {
        var config = $.extend({
            close: 300,
            open: 300,
            opacity: 0.6,
            target: null,
            stopOnTouch: true
        }, options);
        this.each(function (i, elem) {
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
        return this;
    };
    // jQueryのインスタンスメソッドとしてprototypeに登録
    $.fn.bcShy = bcShy;
})(baser || (baser = {}));
var baser;
(function (baser) {
    /**
     * マウスオーバー時に一瞬透明になるエフェクトをかける
     *
     * @version 0.0.14
     * @since 0.0.14
     *
     */
    var bcWink = function (options) {
        var config = $.extend({
            close: 50,
            open: 200,
            opacity: 0.4,
            target: null,
            stopOnTouch: true
        }, options);
        this.each(function (i, elem) {
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
        return this;
    };
    // jQueryのインスタンスメソッドとしてprototypeに登録
    $.fn.bcWink = bcWink;
})(baser || (baser = {}));
var baser;
(function (baser) {
    /**
     * リストを均等に分割する
     *
     * @version 0.2.0
     * @since 0.0.14
     *
     */
    var bcSplitList = function (columnSize, options) {
        var CLASS_NAME = 'splited-list';
        var CLASS_NAME_NTH = 'nth';
        var CLASS_NAME_ITEM = 'item';
        var config = $.extend({
            dataKey: '-bc-split-list-index',
            splitChildren: true
        }, options);
        this.each(function (i, elem) {
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
            var splited = baser.utility.Mathematics.split(size, columnSize);
            var i;
            var j;
            var sizeByColumn;
            var itemArray = $items.toArray();
            var $col;
            var $item;
            for (i = 0; i < columnSize; i++) {
                sizeByColumn = splited[i];
                $col = $('<ul></ul>');
                baser.ui.element.Element.addClassTo($col, CLASS_NAME);
                baser.ui.element.Element.addClassTo($col, CLASS_NAME, '', CLASS_NAME_NTH + columnSize);
                $col.appendTo($container);
                for (j = 0; j < sizeByColumn; j++) {
                    $item = $(itemArray.shift());
                    $item.appendTo($col);
                    $item.data(config.dataKey, i);
                    baser.ui.element.Element.addClassTo($item, CLASS_NAME, CLASS_NAME_ITEM);
                    baser.ui.element.Element.addClassTo($item, CLASS_NAME, CLASS_NAME_ITEM, CLASS_NAME_NTH + i);
                }
                $col = null;
            }
            $list.remove();
        });
        return this;
    };
    // jQueryのインスタンスメソッドとしてprototypeに登録
    $.fn.bcSplitList = bcSplitList;
})(baser || (baser = {}));
var baser;
(function (baser) {
    /**
     * 要素内の画像の読み込みが完了してからコールバックを実行する
     *
     * @version 0.0.9
     * @since 0.0.9
     *
     * * * *
     *
     * ## Sample
     *
     * comming soon...
     *
     */
    function bcImageLoaded(callback) {
        return this.each(function (i, elem) {
            var $elem = $(elem);
            var manifest = [];
            var $imgs = $elem.find('img');
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
                    img.src = this.src;
                    manifest.push(loaded.promise());
                });
                $.when.apply($, manifest).done(function () {
                    $imgs.show();
                    callback.call(elem);
                });
            }
            else {
                callback.call(elem);
            }
        });
    }
    $.fn.bcImageLoaded = bcImageLoaded;
})(baser || (baser = {}));
var baser;
(function (baser) {
    /**
     * 自信の要素を基準に、指定の子要素を背景のように扱う
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
    function bcBackground(options) {
        return this.each(function (i, elem) {
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
                var containerWidth;
                var containerHeight;
                var containerAspectRatio;
                var scale;
                if (config.outer) {
                    containerWidth = $elem.outerWidth();
                    containerHeight = $elem.outerHeight();
                }
                else {
                    containerWidth = $elem.width();
                    containerHeight = $elem.height();
                }
                containerAspectRatio = containerWidth / containerHeight;
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
                        top = 0;
                        break;
                    case 'bottom':
                        top = containerHeight - newHeight;
                        break;
                    case 'center':
                    default: {
                        top = (containerHeight / 2) - (newHeight / 2);
                    }
                }
                var left;
                switch (config.align) {
                    case 'left':
                        left = 0;
                        break;
                    case 'right':
                        left = containerWidth - newWidth;
                        break;
                    case 'center':
                    default: {
                        left = (containerWidth / 2) - (newWidth / 2);
                    }
                }
                var none = 'none';
                css = {
                    width: newWidth,
                    height: newHeight,
                    maxWidth: none,
                    minWidth: 0,
                    maxHeight: none,
                    minHeight: 0,
                    top: top,
                    left: left
                };
            };
            // 初期計算
            calc();
            // 初期反映
            $child.css(css);
            // 計算結果をアニメーションフレーム毎にDOMに反映
            var animation = new baser.ui.AnimationFrames(function () {
                $child.css(css);
            });
            baser.ui.Browser.browser.on('resizestart', function () {
                animation.start();
            }).on('resize', function () {
                // リサイズ時にサイズを計算
                calc();
            }).on('resizeend', function () {
                animation.stop();
            });
            animation.start();
            baser.ui.Timer.wait(300, function () {
                animation.stop();
            });
        });
    }
    ;
    $.fn.bcBackground = bcBackground;
})(baser || (baser = {}));
var baser;
(function (baser) {
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
    function bcKeepAspectRatio() {
        var $w = $(window);
        this.each(function (i, elem) {
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
        baser.ui.Timer.wait(30, function () {
            $w.trigger('resize');
        });
        return this;
    }
    $.fn.bcKeepAspectRatio = bcKeepAspectRatio;
})(baser || (baser = {}));
/* 外部ライブラリ d.ts
================================================================= */
/// <reference path="../typings/bundle.d.ts" />
/* ユーティリティ
================================================================= */
/// <reference path="baser/utility/String.ts" />
/// <reference path="baser/utility/Array.ts" />
/// <reference path="baser/utility/Mathematics.ts" />
/* UI/イベント
================================================================= */
/// <reference path="baser/ui/event/IEventDispacher.ts" />
/// <reference path="baser/ui/event/EventDispacher.ts" />
/// <reference path="baser/ui/event/DispacheEvent.ts" />
/// <reference path="baser/ui/event/EventHandler.ts" />
/* UI
================================================================= */
/// <reference path="baser/ui/Sequence.ts" />
/// <reference path="baser/ui/Locational.ts" />
/// <reference path="baser/ui/Browser.ts" />
/// <reference path="baser/ui/BreakPoints.ts" />
/// <reference path="baser/ui/Timer.ts" />
/// <reference path="baser/ui/AnimationFrames.ts" />
/// <reference path="baser/ui/Scroll.ts" />
/* UI/エレメント
================================================================= */
/// <reference path="baser/ui/element/IElement.ts" />
/// <reference path="baser/ui/element/Element.ts" />
/// <reference path="baser/ui/element/IFormElement.ts" />
/// <reference path="baser/ui/element/FormElement.ts" />
/// <reference path="baser/ui/element/ITextField.ts" />
/// <reference path="baser/ui/element/TextField.ts" />
/// <reference path="baser/ui/element/ISelect.ts" />
/// <reference path="baser/ui/element/Select.ts" />
/// <reference path="baser/ui/element/ICheckableElement.ts" />
/// <reference path="baser/ui/element/CheckableElement.ts" />
/// <reference path="baser/ui/element/IRadio.ts" />
/// <reference path="baser/ui/element/Radio.ts" />
/// <reference path="baser/ui/element/ICheckbox.ts" />
/// <reference path="baser/ui/element/Checkbox.ts" />
/// <reference path="baser/ui/element/RadioGroup.ts" />
/// <reference path="baser/ui/element/AlignedBoxes.ts" />
/// <reference path="baser/ui/element/Map.ts" />
/// <reference path="baser/ui/element/Youtube.ts" />
/* jQueryプラグイン
================================================================= */
/// <reference path="jquery/bcYoutube.ts" />
/// <reference path="jquery/bcScrollTo.ts" />
/// <reference path="jquery/bcRadio.ts" />
/// <reference path="jquery/bcCheckbox.ts" />
/// <reference path="jquery/bcSelect.ts" />
/// <reference path="jquery/bcMaps.ts" />
/// <reference path="jquery/bcBoxAlignHeight.ts" />
/// <reference path="jquery/bcBoxLink.ts" />
// <reference path="jquery/bcExtendLink.ts" /> // 未実装のため読み込まない
/// <reference path="jquery/bcRollover.ts" />
/// <reference path="jquery/bcShy.ts" />
/// <reference path="jquery/bcWink.ts" />
/// <reference path="jquery/bcSplitList.ts" />
/// <reference path="jquery/bcImageLoaded.ts" />
/// <reference path="jquery/bcBackground.ts" />
/// <reference path="jquery/bcKeepAspectRatio.ts" />

	if (isNode) {
		module.exports = baser;
	} else {
		global.baser = baser;
	}
}).call((this || 0).self || global);
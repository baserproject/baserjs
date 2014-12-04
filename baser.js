/**
 * baserjs - v0.1.0-alpha r183
 * update: 2014-12-05
 * Author: baserCMS Users Community [https://github.com/baserproject/]
 * Github: https://github.com/baserproject/baserjs
 * License: Licensed under the MIT License
 */

(function () {
"use strict";

var window = this;
var document = window.document;
var location = window.location;
var $ = jQuery;


/*!
 * jQuery Cookie Plugin v1.4.1
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2006, 2014 Klaus Hartl
 * Released under the MIT license
 */
(function (factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD
		define(['jquery'], factory);
	} else if (typeof exports === 'object') {
		// CommonJS
		factory(require('jquery'));
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
				t.setTime(+t + days * 864e+5);
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

		var result = key ? undefined : {};

		// To prevent the for loop in the first place assign an empty array
		// in case there are no cookies at all. Also prevents odd result when
		// calling $.cookie().
		var cookies = document.cookie ? document.cookie.split('; ') : [];

		for (var i = 0, l = cookies.length; i < l; i++) {
			var parts = cookies[i].split('=');
			var name = decode(parts.shift());
			var cookie = parts.join('=');

			if (key && key === name) {
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
		if ($.cookie(key) === undefined) {
			return false;
		}

		// Must not alter options, thus extending a fresh object...
		$.cookie(key, '', $.extend({}, options, { expires: -1 }));
		return !$.cookie(key);
	};

}));

/*!
 * jQuery Mousewheel 3.1.12
 *
 * Copyright 2014 jQuery Foundation and other contributors
 * Released under the MIT license.
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
            return String;
        })();
        utility.String = String;
    })(utility = baser.utility || (baser.utility = {}));
})(baser || (baser = {}));
var baser;
(function (baser) {
    var eventHandlers = {};
    var types = {};
    var ui;
    (function (ui) {
        /**
         * イベント駆動できるクラス
         *
         * @version 0.0.10
         * @since 0.0.10
         *
         */
        var EventDispacher = (function () {
            function EventDispacher() {
            }
            EventDispacher.prototype.on = function (type, handler) {
                var eventHandler = new EventHandler(this, type, handler);
                eventHandlers[eventHandler.id] = eventHandler;
                if (!types[type]) {
                    types[type] = [];
                }
                types[type].push(eventHandler);
                return this;
            };
            EventDispacher.prototype.off = function (type) {
                delete types[type];
                return this;
            };
            EventDispacher.prototype.trigger = function (type, context) {
                var eventHandler;
                var e;
                context = context || this;
                var i = 0;
                var l;
                if (types[type]) {
                    l = types[type].length;
                    for (; i < l; i++) {
                        eventHandler = types[type][i];
                        if (eventHandler.context === this) {
                            e = new DispacheEvent(type);
                            eventHandler.handler.call(context, e);
                            if (e.isImmediatePropagationStopped()) {
                                break;
                            }
                        }
                    }
                }
                return this;
            };
            return EventDispacher;
        })();
        ui.EventDispacher = EventDispacher;
        var EventHandler = (function () {
            function EventHandler(context, type, handler) {
                this.context = context;
                this.id = baser.utility.String.UID();
                this.type = type;
                this.handler = handler;
            }
            return EventHandler;
        })();
        ui.EventHandler = EventHandler;
        var DispacheEvent = (function () {
            function DispacheEvent(type) {
                this._isImmediatePropagationStopped = false;
            }
            DispacheEvent.prototype.isImmediatePropagationStopped = function () {
                return this._isImmediatePropagationStopped;
            };
            DispacheEvent.prototype.stopImmediatePropagation = function () {
                this._isImmediatePropagationStopped = true;
            };
            return DispacheEvent;
        })();
        ui.DispacheEvent = DispacheEvent;
    })(ui = baser.ui || (baser.ui = {}));
})(baser || (baser = {}));
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var baser;
(function (baser) {
    var ui;
    (function (ui) {
        var flexibleWindowObject = window;
        /**
         * ブラウザの情報を管理するクラス
         *
         * @version 0.0.2
         * @since 0.0.2
         *
         */
        var Browser = (function (_super) {
            __extends(Browser, _super);
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
             * ユーザーエージェント情報を取得する
             *
             * @version 0.0.2
             * @since 0.0.1
             *
             */
            Browser.getUA = function () {
                var ua = navigator.userAgent;
                var result = {
                    iOS: /ios/i.test(ua),
                    iPad: /ipad/i.test(ua),
                    iPhone: /iphone/i.test(ua),
                    iPod: /ipod/i.test(ua),
                    android: /android/i.test(ua)
                };
                return result;
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
             * @version 0.0.1
             * @since 0.0.1
             *
             */
            Browser.spec = {
                isTouchable: flexibleWindowObject.ontouchstart !== undefined,
                ua: Browser.getUA()
            };
            return Browser;
        })(ui.EventDispacher);
        ui.Browser = Browser;
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
                if ($.isNumeric(selector)) {
                    offset += (parseFloat(selector) || 0);
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
                            _this.to($target, offset);
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
        /**
         * 要素の寸法(幅・高さ)を管理するクラス
         *
         * @version 0.0.9
         * @since 0.0.9
         *
         */
        var Dimension = (function () {
            /**
             * コンストラクタ
             *
             * @version 0.0.9
             * @since 0.0.9
             *
             */
            function Dimension(el) {
                if (el) {
                    this.el = el;
                }
            }
            return Dimension;
        })();
        ui.Dimension = Dimension;
    })(ui = baser.ui || (baser.ui = {}));
})(baser || (baser = {}));
var baser;
(function (baser) {
    var ui;
    (function (ui) {
        /**
         * Box管理を担うクラス
         *
         * @version 0.1.0
         * @since 0.0.15
         *
         */
        var Box = (function () {
            function Box() {
            }
            Box.alignment = function ($target, columns, callback, breakPoint) {
                if (breakPoint === void 0) { breakPoint = 0; }
                var tiles = null;
                var max = null;
                var c = null;
                var h = null;
                var last = $target.length - 1;
                var s = null;
                if (!columns) {
                    columns = $target.length;
                }
                $target.each(function (i) {
                    var s;
                    var tile;
                    var j, l;
                    var cancel = false;
                    if (breakPoint < window.document.documentElement.clientWidth) {
                        s = this.style;
                        s.removeProperty('height');
                        c = i % columns;
                        if (c === 0) {
                            tiles = [];
                        }
                        tile = tiles[c] = $(this);
                        h = tile.height();
                        if (c === 0 || h > max) {
                            max = h;
                        }
                        if (i === last || c === columns - 1) {
                            l = tiles.length;
                            for (j = 0; j < l; j++) {
                                if (tiles[j]) {
                                    if ($.isFunction(callback)) {
                                        cancel = !callback.call($target, max, h, tiles);
                                    }
                                    if (!cancel) {
                                        tiles[j].height(max);
                                    }
                                }
                            }
                        }
                    }
                });
                return $target;
            };
            // 文字の大きさを確認するためのdummyChar要素
            Box.createChar = function () {
                var dummyChar;
                var $dummyChar = $('<p>M</p>').css({
                    display: 'block',
                    visibility: 'hidden',
                    position: 'absolute',
                    padding: 0,
                    top: 0
                });
                $dummyChar.appendTo('body');
                Box.settings.dummyChar = $dummyChar[0];
                Box.settings.currentSize = Box.settings.dummyChar.offsetHeight;
            };
            // 文字の大きさが変わったか
            Box.isChanged = function () {
                if (Box.settings.currentSize === Box.settings.dummyChar.offsetHeight) {
                    return false;
                }
                Box.settings.currentSize = Box.settings.dummyChar.offsetHeight;
                return true;
            };
            // 文書を読み込んだ時点で
            // 文字の大きさを確認しておく
            // 文字の大きさが変わっていたら、
            // handlers中の関数を順に実行
            Box.observer = function () {
                if (Box.isChanged()) {
                    Box.reflatting();
                }
                return;
            };
            // 高さ揃えを再実行する処理
            Box.reflatting = function () {
                var settings = Box.settings;
                var i;
                var l = settings.sets.length;
                var set;
                for (i = 0; i < l; i++) {
                    set = Box.settings.sets[i];
                    set.height('auto');
                    Box.alignment(set, settings.columns[i], settings.callbacks[i], settings.breakPoints[i]);
                }
                return;
            };
            Box.init = function () {
                var $w;
                if (!Box.isInitialized) {
                    $w = $(window);
                    $w.load(Box.reflatting);
                    $w.resize(Box.reflatting);
                    Box.isInitialized = true;
                    Box.createChar();
                    // TODO: オプションでタイマーを回すのを制御できるようにする
                    // TODO: ストップする関数を作る
                    window.setInterval(Box.observer, Box.settings.interval);
                }
            };
            Box.isInitialized = false;
            Box.settings = {
                handlers: [],
                interval: 1000,
                currentSize: 0,
                dummyChar: null,
                sets: [],
                columns: [],
                callbacks: [],
                breakPoints: []
            };
            return Box;
        })();
        ui.Box = Box;
    })(ui = baser.ui || (baser.ui = {}));
})(baser || (baser = {}));
var baser;
(function (baser) {
    var ui;
    (function (ui) {
        /**
         * フォームのバリデーションを担うクラス
         *
         * @version 0.0.x
         * @since 0.0.x
         *
         */
        var Validation = (function () {
            function Validation() {
            }
            return Validation;
        })();
        ui.Validation = Validation;
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
             * @version 0.1.0
             * @since 0.0.1
             *
             */
            var Element = (function () {
                /**
                 * コンストラクタ
                 *
                 * @version 0.1.0
                 * @since 0.0.1
                 * @param $el 管理するDOM要素のjQueryオブジェクト
                 *
                 */
                function Element($el) {
                    /**
                     * 管理するDOM要素のname属性値
                     *
                     * @since 0.0.1
                     *
                     */
                    this.name = '';
                    this.$el = $el;
                    // IDの抽出 & 生成
                    this.id = this.$el.attr('id');
                    if (!this.id) {
                        this.id = baser.utility.String.UID();
                        this.$el.attr('id', this.id);
                    }
                    // name属性の抽出
                    var name = this.$el.attr('name');
                    if (name) {
                        this.name = name;
                    }
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
                        case 0 /* HYPHEN_DELIMITED */:
                            separator = HYPHEN;
                            blockNames = baser.utility.String.hyphenDelimited(blockNames);
                            elementNames = baser.utility.String.hyphenDelimited(elementNames);
                            modifierName = baser.utility.String.hyphenDelimited(modifierName);
                            break;
                        case 1 /* SNAKE_CASE */:
                            separator = UNDERSCORE;
                            blockNames = baser.utility.String.snakeCase(blockNames);
                            elementNames = baser.utility.String.snakeCase(elementNames);
                            modifierName = baser.utility.String.snakeCase(modifierName);
                            break;
                        case 2 /* CAMEL_CASE */:
                            separator = '';
                            blockNames = baser.utility.String.camelCase(blockNames, true);
                            elementNames = baser.utility.String.camelCase(elementNames);
                            modifierName = baser.utility.String.camelCase(modifierName);
                            break;
                    }
                    switch (Element.classNameDefaultSeparatorForElement) {
                        case 0 /* HYPHEN */:
                            elementSeparator = HYPHEN;
                            break;
                        case 1 /* DOUBLE_HYPHEN */:
                            elementSeparator = DOUBLE_HYPHEN;
                            break;
                        case 2 /* UNDERSCORE */:
                            elementSeparator = UNDERSCORE;
                            break;
                        case 3 /* DOUBLE_UNDERSCORE */:
                            elementSeparator = DOUBLE_UNDERSCORE;
                            break;
                        case 4 /* CAMEL_CASE */:
                            elementSeparator = '';
                            break;
                    }
                    switch (Element.classNameDefaultSeparatorForModifier) {
                        case 0 /* HYPHEN */:
                            modifierSeparator = HYPHEN;
                            break;
                        case 1 /* DOUBLE_HYPHEN */:
                            modifierSeparator = DOUBLE_HYPHEN;
                            break;
                        case 2 /* UNDERSCORE */:
                            modifierSeparator = UNDERSCORE;
                            break;
                        case 3 /* DOUBLE_UNDERSCORE */:
                            modifierSeparator = DOUBLE_UNDERSCORE;
                            break;
                        case 4 /* CAMEL_CASE */:
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
                Element.classNameDefaultCase = 0 /* HYPHEN_DELIMITED */;
                /**
                 * BEMのエレメントのクラス名の繋ぎ文字
                 *
                 * @version 0.1.0
                 * @since 0.1.0
                 *
                 */
                Element.classNameDefaultSeparatorForElement = 3 /* DOUBLE_UNDERSCORE */;
                /**
                 * BEMのモディファイアのクラス名の繋ぎ文字
                 *
                 * @version 0.1.0
                 * @since 0.1.0
                 *
                 */
                Element.classNameDefaultSeparatorForModifier = 1 /* DOUBLE_HYPHEN */;
                return Element;
            })();
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
             * フォーム要素を扱う静的クラス
             *
             * @version 0.1.0
             * @since 0.0.1
             *
             */
            var Form = (function () {
                function Form() {
                }
                /**
                 * ラジオボタンを拡張する
                 *
                 * @version 0.0.1
                 * @since 0.0.1
                 * @param $elem 管理するDOM要素のjQueryオブジェクト
                 * @param options オプション
                 *
                 */
                Form.radio = function ($elem, options) {
                    var radio = new element.Radio($elem, options);
                    return $elem;
                };
                /**
                 * チェックボックスを拡張する
                 *
                 * @version 0.0.1
                 * @since 0.0.1
                 * @param $elem 管理するDOM要素のjQueryオブジェクト
                 * @param options オプション
                 *
                 */
                Form.checkbox = function ($elem, options) {
                    var checkbox = new element.Checkbox($elem, options);
                    return $elem;
                };
                /**
                 * セレクトボックスを拡張する
                 *
                 * @version 0.0.1
                 * @since 0.0.1
                 * @param $elem 管理するDOM要素のjQueryオブジェクト
                 * @param options オプション
                 *
                 */
                Form.select = function ($elem, options) {
                    var select = new element.Select($elem, options);
                    return $elem;
                };
                /**
                 * 管理対象要素リスト
                 *
                 * @since 0.0.1
                 *
                 */
                Form.elements = [];
                /**
                 * ラジオボタンのname属性値で紐付いたブループを管理するリスト
                 *
                 * @since 0.0.1
                 *
                 */
                Form.radioGroups = {};
                return Form;
            })();
            element.Form = Form;
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
                 * @version 0.1.0
                 * @since 0.0.1
                 * @param $el 管理するDOM要素のjQueryオブジェクト
                 * @param options オプション
                 *
                 */
                function FormElement($el, options) {
                    var _this = this;
                    _super.call(this, $el);
                    /**
                     * フォーカスがあたっている状態かどうか
                     *
                     * @since 0.0.1
                     *
                     */
                    this.isFocus = false;
                    var config = $.extend(FormElement.defaultOption, options);
                    // 共通のクラスを付加
                    this.addClass(FormElement.classNameFormElementCommon);
                    // label要素の検索 & 生成
                    var $label;
                    // 祖先のlabel要素を検索
                    $label = this.$el.closest('label');
                    // labelでネストされていたかどうか
                    this.isWrappedByLabel = !!$label.length;
                    if (!$label.length) {
                        // for属性に関連づいたlabel要素を検索
                        $label = $('[for="' + this.id + '"]');
                    }
                    if (config.autoLabeling && !$label.length) {
                        // label(もしくは別の)要素の生成
                        this.label = this.$el.attr('title') || config.label || this.$el.attr('name');
                        $label = $('<' + config.labelTag.toLowerCase() + ' />');
                        $label.insertAfter(this.$el);
                        if (config.labelClass) {
                            $label.addClass(config.labelClass);
                        }
                        if (this.label) {
                            $label.text(this.label);
                        }
                        if (config.labelTag.toLowerCase() === 'label') {
                            // labelを生成したのならfor属性にidを紐付ける
                            $label.attr('for', this.id);
                        }
                    }
                    this.$label = $label;
                    element.Element.addClassTo($label, FormElement.classNameFormElementCommon);
                    element.Element.addClassTo($label, FormElement.classNameFormElementCommon, FormElement.classNameLabel);
                    var wrapperHtml = '<span />';
                    var $wrapper = $(wrapperHtml);
                    element.Element.addClassTo($wrapper, FormElement.classNameFormElementCommon);
                    element.Element.addClassTo($wrapper, FormElement.classNameWrapper);
                    if (this.isWrappedByLabel) {
                        this.$label.wrapAll($wrapper);
                        this.$wrapper = this.$label.parent('span');
                    }
                    else {
                        this.$el.add(this.$label).wrapAll($wrapper);
                        this.$wrapper = this.$el.parent('span');
                    }
                    this.$el.on('focus.bcFormElement', function () {
                        _this._onfocus();
                    });
                    this.$el.on('blur.bcFormElement', function () {
                        _this._onblur();
                    });
                    this._onblur();
                    // フォーム要素に登録
                    element.Form.elements.push(this);
                }
                /**
                 * フォーカスがあたった時の処理
                 *
                 * @version 0.1.0
                 * @since 0.0.1
                 *
                 */
                FormElement.prototype._onfocus = function () {
                    this.isFocus = true;
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
                    this.isFocus = false;
                    element.Element.addClassTo(this.$el, FormElement.classNameFormElementCommon, '', FormElement.classNameStateBlur);
                    element.Element.addClassTo(this.$label, FormElement.classNameFormElementCommon, FormElement.classNameLabel, FormElement.classNameStateBlur);
                    element.Element.addClassTo(this.$wrapper, FormElement.classNameWrapper, '', FormElement.classNameStateBlur);
                    element.Element.removeClassFrom(this.$el, FormElement.classNameFormElementCommon, '', FormElement.classNameStateFocus);
                    element.Element.removeClassFrom(this.$label, FormElement.classNameFormElementCommon, FormElement.classNameLabel, FormElement.classNameStateFocus);
                    element.Element.removeClassFrom(this.$wrapper, FormElement.classNameWrapper, '', FormElement.classNameStateFocus);
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
            var $document = $(document);
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
                 * @version 0.1.0
                 * @since 0.0.1
                 * @param $el 管理するDOM要素のjQueryオブジェクト
                 * @param options オプション
                 *
                 */
                function Select($el, options) {
                    var _this = this;
                    _super.call(this, $el, options);
                    this.addClass(Select.classNameSelect);
                    element.Element.addClassTo(this.$wrapper, Select.classNameSelect + '-' + element.FormElement.classNameWrapper);
                    var $elements = this.$label.children().detach();
                    this.$label.empty();
                    this.$label.append($elements);
                    element.Element.addClassTo(this.$label, Select.classNameSelect, element.FormElement.classNameLabel);
                    this.$pseudo = $('<a />'); // Focusable
                    this.$pseudo.attr('href', '#');
                    this.$pseudo.appendTo(this.$label);
                    element.Element.addClassTo(this.$pseudo, element.FormElement.classNameFormElementCommon);
                    element.Element.addClassTo(this.$pseudo, Select.classNamePseudoSelect);
                    this.$selected = $('<span />');
                    this.$selected.text(this.label);
                    this.$selected.appendTo(this.$pseudo);
                    element.Element.addClassTo(this.$selected, element.FormElement.classNameFormElementCommon);
                    element.Element.addClassTo(this.$selected, Select.classNamePseudoSelect, Select.classNamePseudoSelectedDisplay);
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
                    this._update();
                    this.$el.on('change.bcSelect', function () {
                        _this._onchange();
                    });
                    this.$options.on('click.bcSelect', 'li', function (e) {
                        var $li = $(e.target);
                        var index = $li.index();
                        _this.$el.find('option').eq(index).prop('selected', true);
                        e.stopPropagation();
                        e.preventDefault();
                        // 標準の select 要素に登録されたイベントを発火
                        _this.$el.trigger('change');
                    });
                    this.$pseudo.on('click.bcSelect', function (e) {
                        e.preventDefault();
                    });
                    if (ui.Browser.spec.isTouchable) {
                        if (ui.Browser.spec.ua.iPhone) {
                            this.$pseudo.on('click.bcSelect', function (e) {
                                _this.$label.focus();
                            });
                            this.addClass(Select.classNameOsIOs);
                        }
                        else if (ui.Browser.spec.ua.android) {
                            this.addClass(Select.classNameOsAndroid);
                        }
                    }
                    else {
                        this._psuedoFocusEvent();
                    }
                }
                /**
                 * 擬似要素にフォーカスがあったった時のイベント伝達を制御する
                 *
                 * @version 0.0.1
                 * @since 0.0.1
                 *
                 */
                Select.prototype._psuedoFocusEvent = function () {
                    var _this = this;
                    this.$el.off('focus.bcFormElement');
                    this.$el.off('blur.bcFormElement');
                    this.$el.on('focus.bcSelect', function () {
                        _this.$pseudo.focus();
                    });
                    this.$pseudo.on('focus.bcSelect', function (e) {
                        e.stopPropagation();
                        $document.trigger('click.bcSelect');
                        _this._onfocus();
                    });
                    this.$selected.on('click.bcSelect', function (e) {
                        $document.trigger('click.bcSelect');
                        _this._onfocus();
                        e.stopPropagation();
                        e.preventDefault();
                    });
                    $document.on('click.bcSelect', function () {
                        _this._onblur();
                    });
                };
                /**
                 * チェンジイベントのハンドラ
                 *
                 * @version 0.0.1
                 * @since 0.0.1
                 *
                 */
                Select.prototype._onchange = function () {
                    this._update();
                    this._onblur();
                };
                /**
                 * フォーカスがあたった時の処理
                 *
                 * @version 0.1.0
                 * @since 0.0.1
                 *
                 */
                Select.prototype._onfocus = function () {
                    _super.prototype._onfocus.call(this);
                    element.Element.addClassTo(this.$pseudo, Select.classNamePseudoSelect, '', element.FormElement.classNameStateFocus);
                    element.Element.removeClassFrom(this.$pseudo, Select.classNamePseudoSelect, '', element.FormElement.classNameStateBlur);
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
                 * @version 0.1.0
                 * @since 0.0.1
                 *
                 */
                Select.prototype._update = function () {
                    var _this = this;
                    var $selectedOption = this.$el.find(':selected');
                    var $psuedoOptList = this.$options.find('li');
                    this.$el.find('option').each(function (i, opt) {
                        var $opt = $(opt);
                        var isSelected = $opt.prop('selected');
                        var $psuedoOpt = $psuedoOptList.eq(i);
                        if (isSelected) {
                            _this.$selected.text($opt.text());
                        }
                        $psuedoOpt.attr('aria-selected', '' + isSelected);
                        if (isSelected) {
                            element.Element.addClassTo($psuedoOpt, Select.classNameSelectOptionList, Select.classNameSelectOption, Select.classNameStateSelected);
                            element.Element.removeClassFrom($psuedoOpt, Select.classNameSelectOptionList, Select.classNameSelectOption, Select.classNameStateUnselected);
                        }
                        else {
                            element.Element.addClassTo($psuedoOpt, Select.classNameSelectOptionList, Select.classNameSelectOption, Select.classNameStateUnselected);
                            element.Element.removeClassFrom($psuedoOpt, Select.classNameSelectOptionList, Select.classNameSelectOption, Select.classNameStateSelected);
                        }
                    });
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
                 * @version 0.0.1
                 * @since 0.0.1
                 * @param $el 管理するDOM要素のjQueryオブジェクト
                 * @param options オプション
                 *
                 */
                function CheckableElement($el, options) {
                    var _this = this;
                    _super.call(this, $el, options);
                    var config = $.extend(element.FormElement.defaultOption, CheckableElement.defaultOption, options);
                    this._checkedClass = config.checkedClass;
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
                 * @protected プロテクテッド想定
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
                 * @version 0.1.0
                 * @since 0.0.1
                 * @param $el 管理するDOM要素のjQueryオブジェクト
                 * @param options オプション
                 *
                 */
                function Radio($el, options) {
                    _super.call(this, $el, options);
                    this.addClass(Radio.classNameRadio);
                    element.Element.addClassTo(this.$label, Radio.classNameRadio, element.FormElement.classNameLabel);
                    element.Element.addClassTo(this.$wrapper, Radio.classNameRadio + '-' + element.FormElement.classNameWrapper);
                    // ラジオボタングループに登録
                    if (!element.Form.radioGroups[this.name]) {
                        element.Form.radioGroups[this.name] = new element.RadioGroup(this.name);
                    }
                    element.Form.radioGroups[this.name].add(this);
                }
                /**
                 * チェンジイベントのハンドラ
                 *
                 * @version 0.0.1
                 * @since 0.0.1
                 *
                 */
                Radio.prototype._onchenge = function () {
                    _super.prototype._onchenge.call(this);
                    // 同じname属性のラジオボタン要素も同時に変更をする
                    element.Form.radioGroups[this.name].update(this);
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
                 * @version 0.1.0
                 * @since 0.0.1
                 * @param $el 管理するDOM要素のjQueryオブジェクト
                 * @param options オプション
                 *
                 */
                function Checkbox($el, options) {
                    _super.call(this, $el, options);
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
             * マップ要素
             *
             * @version 0.0.6
             * @since 0.0.6
             *
             */
            var Map = (function (_super) {
                __extends(Map, _super);
                /**
                 * コンストラクタ
                 *
                 * @version 0.0.9
                 * @since 0.0.6
                 * @param $el 管理するDOM要素のjQueryオブジェクト
                 *
                 */
                function Map($el, options) {
                    _super.call(this, $el);
                    this.$el.addClass(Map.className);
                    if ('google' in window && google.maps) {
                        this._init(options);
                    }
                    else {
                        if (console && console.warn) {
                            console.warn('ReferenceError: "//maps.google.com/maps/api/js" を先に読み込む必要があります。');
                        }
                    }
                    Map.maps.push(this);
                    $el.data(Map.className, this);
                }
                Map.prototype._init = function (options) {
                    var _this = this;
                    var mapCenterLat = this.$el.data('lat') || Map.lat;
                    var mapCenterLng = this.$el.data('lng') || Map.lng;
                    this.$coordinates = this.$coordinates || this.$el.find('[data-lat][data-lng]').detach();
                    if (this.$coordinates.length <= 0) {
                        this.$coordinates = this.$el;
                    }
                    var coordinates = [];
                    this.$coordinates.each(function (i, el) {
                        var $this = $(el);
                        var coordinate = new Coordinate($this);
                        coordinates.push(coordinate);
                    });
                    this.mapOption = this.mapOption || $.extend({
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
                    }, options);
                    this.info = new google.maps.InfoWindow({
                        disableAutoPan: true
                    });
                    this.gmap = new google.maps.Map(this.$el[0], this.mapOption);
                    $.each(coordinates, function (i, coordinate) {
                        coordinate.markTo(_this);
                    });
                };
                Map.prototype.reload = function () {
                    this._init();
                };
                /**
                 * 初期設定用の緯度
                 * 東京都庁
                 *
                 * @version 0.0.6
                 * @since 0.0.6
                 *
                 */
                Map.lat = 35.681382;
                /**
                 * 初期設定用の経度
                 * 東京都庁
                 *
                 * @version 0.0.6
                 * @since 0.0.6
                 *
                 */
                Map.lng = 139.766084;
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
             * @version 0.0.6
             * @since 0.0.6
             *
             */
            var Coordinate = (function () {
                function Coordinate($el) {
                    this.$el = $el;
                    this.lat = $el.data('lat');
                    this.lng = $el.data('lng');
                    this.title = $el.attr('title') || $el.data('title') || $el.find('h1,h2,h3,h4,h5,h6').text() || null;
                    this.icon = $el.data('icon') || null;
                }
                Coordinate.prototype.markTo = function (map) {
                    var _this = this;
                    this.marker = new google.maps.Marker({
                        position: new google.maps.LatLng(this.lat, this.lng),
                        title: this.title,
                        icon: this.icon,
                        map: map.gmap
                    });
                    if (map.$coordinates !== map.$el) {
                        google.maps.event.addListener(this.marker, 'click', function () {
                            map.info.setContent(_this.$el[0]);
                            map.info.open(map.gmap, _this.marker);
                            _this.marker.setZIndex(google.maps.Marker.MAX_ZINDEX + 1);
                        });
                    }
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
             * @version 0.0.7
             * @since 0.0.7
             *
             */
            var Youtube = (function (_super) {
                __extends(Youtube, _super);
                /**
                 * コンストラクタ
                 *
                 * @version 0.0.7
                 * @since 0.0.7
                 * @param $el 管理するDOM要素のjQueryオブジェクト
                 *
                 */
                function Youtube($el, options) {
                    _super.call(this, $el);
                    if (this._init(options)) {
                        Youtube.movies.push(this);
                        this.$el.addClass(Youtube.className);
                        $el.data(Youtube.className, this);
                    }
                }
                /**
                 * 初期化
                 *
                 * @version 0.0.7
                 * @since 0.0.7
                 * @param $el 管理するDOM要素のjQueryオブジェクト
                 * @return {booelan} 初期化が成功したかどうか
                 *
                 */
                Youtube.prototype._init = function (options) {
                    var _this = this;
                    var id = this.$el.data('id');
                    var width = +(this.$el.data('width') || this.$el.attr('width') || NaN);
                    var height = +(this.$el.data('height') || this.$el.attr('height') || NaN);
                    var protocol = location.protocol === 'file:' ? 'http:' : '';
                    this.movieOption = $.extend({
                        rel: false,
                        autoplay: true,
                        stopOnInactive: false,
                        controls: false,
                        loop: true,
                        showinfo: false
                    }, options);
                    this.$el.empty();
                    var ids = id.split(/\s*,\s*/);
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
                    if (ids.length >= 2 || this.movieOption.loop) {
                        param += '&amp;playlist=' + ids.join(',');
                    }
                    var src = protocol + Youtube.PLAYER_URL + id + '?' + param;
                    this.movieId = id;
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
                    if (width) {
                        $mov.width(width);
                        $mov.data('width', width);
                    }
                    if (height) {
                        $mov.height(height);
                        $mov.data('height', height);
                    }
                    $.getScript(protocol + Youtube.API_URL);
                    var y;
                    var intervalTimer;
                    if (this.movieOption.stopOnInactive) {
                        intervalTimer = window.setInterval(function () {
                            if (!y && 'YT' in window && YT.Player) {
                                y = new YT.Player(playerID, null);
                            }
                            if (y && y.pauseVideo && y.playVideo) {
                                window.clearInterval(intervalTimer);
                                _this.$el.trigger('embeddedyoutubeplay', [y]);
                                $(window).on('blur', function () {
                                    y.pauseVideo();
                                }).on('focus', function () {
                                    y.playVideo();
                                });
                            }
                        }, 300);
                    }
                    return true;
                };
                Youtube.prototype.reload = function (options) {
                    this._init(options);
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
this.baser = baser;
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
     * <div data-height="400" data-theme-id="9760" data-slug-hash="pboIt" data-default-tab="result" data-user="YusukeHirao" class='codepen'><pre><code>$(&#39;.sample&#39;).bcYoutube();</code></pre>
    <p>See the Pen <a href='http://codepen.io/YusukeHirao/pen/pboIt/'>bcYoutube</a> by Yusuke Hirao (<a href='http://codepen.io/YusukeHirao'>@YusukeHirao</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
    </div><script async src="//assets.codepen.io/assets/embed/ei.js"></script>
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
     * @version 0.0.8
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
                                scroll.to(target, this.options);
                                e.preventDefault();
                                console.log(href);
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
                try {
                    target = $(href);
                    if (target.length) {
                        scroll.to(target, this.options);
                        e.preventDefault();
                        return;
                    }
                }
                catch (err) {
                }
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
     * @version 0.0.1
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
            baser.ui.element.Form.radio($elem, options);
        });
    }
    $.fn.bcRadio = bcRadio;
})(baser || (baser = {}));
var baser;
(function (baser) {
    /**
     * WAI-ARIAに対応した装飾可能な汎用要素でラップしたチェックボックスに変更する
     *
     * @version 0.0.1
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
            baser.ui.element.Form.checkbox($elem, options);
        });
    }
    $.fn.bcCheckbox = bcCheckbox;
})(baser || (baser = {}));
var baser;
(function (baser) {
    /**
     * WAI-ARIAに対応した装飾可能な汎用要素でラップしたセレクトボックスに変更する
     *
     * @version 0.0.1
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
            baser.ui.element.Form.select($elem, options);
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
                data.reload();
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
     * TODO: 計算ロジックとDOMアクセスのロジックを分ける
     *
     * @version 0.0.15
     * @since 0.0.15
     *
     */
    function bcBoxAlignHeight(column, detailTarget, callback, breakPoint) {
        if (breakPoint === void 0) { breakPoint = 0; }
        baser.ui.Box.init();
        var $detailTarget;
        var settings = baser.ui.Box.settings;
        // 要素群の高さを揃え、setsに追加
        if (detailTarget) {
            $detailTarget = this.find(detailTarget);
            if ($detailTarget.length) {
                this.each(function () {
                    var $split = $(this).find(detailTarget);
                    baser.ui.Box.alignment($split, column, callback, breakPoint);
                    settings.sets.push($split);
                    settings.columns.push(column);
                    settings.callbacks.push(callback);
                    settings.breakPoints.push(breakPoint);
                });
            }
        }
        else {
            baser.ui.Box.alignment(this, column, callback, breakPoint);
            settings.sets.push(this);
            settings.columns.push(column);
            settings.callbacks.push(callback);
            settings.breakPoints.push(breakPoint);
        }
        return this;
    }
    // jQueryのインスタンスメソッドとしてprototypeに登録
    $.fn.bcBoxAlignHeight = bcBoxAlignHeight;
})(baser || (baser = {}));
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
                $target.stop(true, false).fadeTo(config.close, config.opacity);
                return true;
            });
            $this.on('mouseleave', function (e) {
                if (config.stopOnTouch && $this.data('-bc-is-touchstarted')) {
                    $this.data('-bc-is-touchstarted', false);
                    return true;
                }
                $target.stop(true, false).fadeTo(config.open, 1);
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
                $target.stop(true, false).fadeTo(config.close, config.opacity).fadeTo(config.open, 1);
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
     * @version 0.0.14
     * @since 0.0.14
     *
     */
    var bcSplitList = function (columnSize, options) {
        var CLASS_NAME = '-bc-splited-list';
        var CLASS_NAME_NTH = '-bc-splited-list--nth';
        var CLASS_NAME_ITEM = '-bc-splited-list__item';
        var config = $.extend({
            dataKey: '-bc-split-list-index'
        }, options);
        this.each(function (i, elem) {
            var $container = $(elem);
            var $list = $container.find('ul');
            var $items = $list.find('li');
            var size = $items.length;
            var sizeParCol = Math.floor(size / columnSize);
            var sizeRem = size % columnSize;
            var $col;
            var remShift = sizeRem;
            var row = 1;
            var col = 1;
            $items.each(function (itemIndex, itemEl) {
                var $item = $(itemEl);
                itemIndex += 1; // 0からでなく1からのカウント
                var colByCurrentRow;
                if (0 < remShift) {
                    colByCurrentRow = sizeParCol + 1;
                }
                else {
                    colByCurrentRow = sizeParCol;
                }
                if (!$col) {
                    $col = $('<ul></ul>');
                    $col.addClass(CLASS_NAME);
                    $col.addClass(CLASS_NAME_NTH + col);
                    $col.appendTo($container);
                }
                $item.appendTo($col);
                $item.data(config.dataKey, itemIndex - 1);
                $item.addClass(CLASS_NAME_ITEM);
                $item.addClass(CLASS_NAME_ITEM + '--nth' + (itemIndex - 1));
                if (colByCurrentRow === row) {
                    col += 1;
                    row = 0;
                    remShift -= 1;
                    $col = null;
                }
                row += 1;
            });
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
     * @version 0.0.10
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
                child: '>*:first'
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
                var containerWidth = $elem.width();
                var containerHeight = $elem.height();
                var containerAspectRatio = containerWidth / containerHeight;
                var scale;
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
                    default:
                        {
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
                    default:
                        {
                            left = (containerWidth / 2) - (newWidth / 2);
                        }
                }
                css = {
                    width: newWidth,
                    height: newHeight,
                    top: top,
                    left: left
                };
            };
            calc();
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
/// <reference path="../typings/tsd.d.ts" />

}).call(this);
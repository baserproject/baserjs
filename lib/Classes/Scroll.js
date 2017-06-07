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
var BezierEasing = require("bezier-easing");
var EventDispatcher_1 = require("./EventDispatcher");
var Progressive_1 = require("./Progressive");
var Timer_1 = require("./Timer");
var addEventListenerWithOptions_1 = require("../fn/addEventListenerWithOptions");
var singleton = null;
/**
 * スクロールを管理するクラス
 *
 * @version 0.9.0
 * @since 0.0.8
 *
 */
var Scroll = (function (_super) {
    __extends(Scroll, _super);
    function Scroll() {
        var _this = _super.call(this) || this;
        _this._progressive = new Progressive_1.default(_this._progress.bind(_this));
        return _this;
    }
    Scroll.to = function (selector, options) {
        if (options === void 0) { options = {}; }
        if (!singleton) {
            singleton = new Scroll();
        }
        return singleton.to(selector, options);
    };
    /**
     * 対象の要素もしくは位置にスクロールを移動させる
     *
     * @version 1.0.0
     * @since 0.0.8
     * @param selector 対象の要素のセレクタ・DOMもしくはスクロール位置
     * @param options オプション
     * @return インスタンス自信
     *
     */
    Scroll.prototype.to = function (selector, options) {
        if (options === void 0) { options = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.options = options;
                        this.offset = this.options.offset || 0;
                        if (this.options.wheelCancel !== false) {
                            addEventListenerWithOptions_1.default(window, 'wheel', function () {
                                if (_this.isScroll) {
                                    _this._cancel();
                                }
                            }, {
                                passive: true,
                                once: true,
                            });
                        }
                        if (!(selector == null)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this._toHash()];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2: return [4 /*yield*/, this._to(selector)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Scroll.prototype._to = function (selector) {
        return __awaiter(this, void 0, void 0, function () {
            var currentY, el, rect;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        currentY = this.y;
                        // 第一引数が数値だった場合はその値のy軸へスクロール
                        if (typeof selector === 'number') {
                            this.offset += selector || 0;
                            this._dest = this.offset;
                        }
                        else if (selector) {
                            el = (selector instanceof Element) ? selector : document.querySelector(selector);
                            if (el) {
                                rect = el.getBoundingClientRect();
                                this._dest = rect.top + currentY + this.offset + Scroll.offset;
                            }
                            else {
                                this._dest = this.offset + Scroll.offset;
                            }
                        }
                        if (this._dest === currentY) {
                            return [2 /*return*/];
                        }
                        this._start = currentY;
                        this._dist = this._dest - currentY;
                        return [4 /*yield*/, this._scrollStart()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Scroll.prototype._toHash = function () {
        return __awaiter(this, void 0, void 0, function () {
            var target;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        target = document.querySelector(window.location.hash);
                        if (!target) return [3 /*break*/, 3];
                        return [4 /*yield*/, Timer_1.default.delay(Scroll.delayWhenURLHashTarget)()];
                    case 1:
                        _a.sent();
                        window.scrollTo(0, 0);
                        return [4 /*yield*/, this._to(target)];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Scroll.prototype._scrollStart = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // スクロール停止中ならスクロール開始
                        if (this.isScroll) {
                            return [2 /*return*/, Promise.resolve()];
                        }
                        this.isScroll = true;
                        this._progressive.stop();
                        return [4 /*yield*/, this._progressive.start(Scroll.duration)];
                    case 1:
                        _a.sent();
                        this._finish();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * スクロール
     *
     * @version 1.0.0
     * @since 0.0.8
     *
     */
    Scroll.prototype._progress = function (rate) {
        var progress = this._start + this._dist * Scroll.easing(rate);
        window.scrollTo(0, progress);
        this.trigger('scrollprogress', [{
                y: progress,
            }]);
    };
    Object.defineProperty(Scroll.prototype, "y", {
        /**
         * y位置の取得
         *
         * @version 1.0.0
         * @since 0.0.8
         * @return y位置
         *
         */
        get: function () {
            return window.scrollY || window.pageYOffset;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * スクロールの終了
     *
     * @version 1.0.0
     * @since 0.0.8
     *
     */
    Scroll.prototype._finish = function () {
        this.isScroll = false;
        this.trigger('scrollend', [{
                y: this.y,
            }]);
    };
    /**
     * スクロールの終了
     *
     * @version 1.0.0
     * @since 1.0.0
     *
     */
    Scroll.prototype._cancel = function () {
        this.trigger('scrollcancel', [{
                y: this.y,
            }]);
        this._finish();
    };
    return Scroll;
}(EventDispatcher_1.default));
Scroll.duration = 300;
Scroll.easing = BezierEasing(0, 0, 0.58, 1); // tslint:disable-line:no-magic-numbers
Scroll.delayWhenURLHashTarget = 30;
/**
 * Default global offset
 */
Scroll.offset = 0;
exports.default = Scroll;

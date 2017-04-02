"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _scrollHandlerIsDefined = false;
var _rqfId = 0;
var ratio = 0.5;
var scrollHandlers = new Set();
var scrollSpyReturns = new WeakMap();
var observer = null;
/**
 * DOM要素の抽象クラス
 *
 * @version 1.0.0
 * @since 0.0.1
 *
 */
var ScrollSpy = (function () {
    function ScrollSpy(returnValue) {
        this._returnValue = returnValue;
    }
    ScrollSpy.return = function (returnValue) {
        return new ScrollSpy(returnValue);
    };
    ScrollSpy.by = function (bEl) {
        return new ScrollSpy(undefined).by(bEl);
    };
    ScrollSpy.prototype.by = function (bEl) {
        var _this = this;
        _define();
        return new Promise(function (resolve, reject) {
            if (observer) {
                var resolver = function () { return resolve(_this._returnValue); };
                scrollSpyReturns.set(bEl.el, resolver);
                observer.observe(bEl.el);
            }
            else {
                /**
                 * - scrollEvent -> requestAnimationFrame
                 *   の定義は一箇所で、呼び出しも1回
                 * - リストに登録されたhandlerだけ実行される
                 * - resolveしたものはリストから除外して実行しない
                 */
                var handlerWrapper = function () {
                    var windowHeight = window.innerHeight;
                    var boundingRect = bEl.el.getBoundingClientRect();
                    var intersectionTouchTop = boundingRect.top - windowHeight;
                    var intersectionPoint = intersectionTouchTop + boundingRect.height * ratio;
                    if (intersectionPoint < 0) {
                        resolve(_this._returnValue);
                        return true;
                    }
                    return false;
                };
                scrollHandlers.add(handlerWrapper);
            }
        });
    };
    return ScrollSpy;
}());
exports.default = ScrollSpy;
function _define() {
    if ('IntersectionObserver' in window && !observer) {
        var threshold = [ratio];
        observer = new IntersectionObserver(function (entries) {
            for (var _i = 0, _a = Array.from(entries); _i < _a.length; _i++) {
                var entry = _a[_i];
                if (observer) {
                    observer.unobserve(entry.target);
                }
                var resolver = scrollSpyReturns.get(entry.target);
                if (resolver) {
                    scrollSpyReturns.delete(entry.target);
                    resolver();
                }
            }
        }, { threshold: threshold });
    }
    else {
        if (_scrollHandlerIsDefined) {
            return;
        }
        _scrollHandlerIsDefined = true;
        window.addEventListener('scroll', _onScroll, { passive: true });
    }
}
function _onScroll(e) {
    cancelAnimationFrame(_rqfId);
    _rqfId = requestAnimationFrame(_onFrame);
}
function _onFrame() {
    scrollHandlers.forEach(function (handler) {
        var resolved = handler();
        if (resolved) {
            scrollHandlers.delete(handler);
        }
    });
}

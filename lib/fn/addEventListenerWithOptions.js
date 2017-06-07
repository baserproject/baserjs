"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var supportsPassive = false;
try {
    // getter として opts.passive を定義して、 addEventListener 内で呼ばれたことがわかるようにする
    var opts = Object.defineProperty({}, 'passive', {
        get: function () {
            // 内部で opts.passive が呼ばれたら対応ブラウザ
            // 用意しておいたフラグを有効にする
            supportsPassive = true;
        },
    });
    // 試しに適当なイベントを補足し、 opts.passive が呼ばれるか試す
    window.addEventListener('test', function (_) { return _; }, opts);
}
catch (e) {
    // void
}
/**
 *
 * @param target
 * @param type
 * @param listener
 * @param options
 */
// tslint:disable-next-line:no-any
function addEventListenerWithOptions(target, type, listener, options) {
    var optionsOrCapture = options;
    if (!supportsPassive) {
        optionsOrCapture = options.capture || false;
    }
    target.addEventListener(type, listener, optionsOrCapture); // ⚠️ type hack
}
exports.default = addEventListenerWithOptions;

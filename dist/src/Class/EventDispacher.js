var DispacheEvent = require('./DispacheEvent');
var EventHandler = require('./EventHandler');
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
            var eventHandler = new EventHandler(this, types[i], handler);
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
                    e = new DispacheEvent(type);
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
module.exports = EventDispacher;

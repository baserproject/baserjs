var DispatchEvent = require('./DispatchEvent');
var EventHandler = require('./EventHandler');
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
        for (var i = 0, l = types.length; i < l; i++) {
            var eventHandler = new EventHandler(this, types[i], handler);
            EventDispatcher.eventHandlers[eventHandler.id] = eventHandler;
            if (!EventDispatcher.types[types[i]]) {
                EventDispatcher.types[types[i]] = [];
            }
            EventDispatcher.types[types[i]].push(eventHandler);
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
        for (var i = 0, l = types.length; i < l; i++) {
            delete EventDispatcher.types[types[i]];
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
                    console.log(isCancel, e);
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

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DispatchEvent_1 = require("./DispatchEvent");
var EventHandler_1 = require("./EventHandler");
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
        for (var _i = 0, types_1 = types; _i < types_1.length; _i++) {
            var type_1 = types_1[_i];
            var eventHandler = new EventHandler_1.default(this, type_1, handler);
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
     * @version 1.0.0
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
        for (var _i = 0, types_2 = types; _i < types_2.length; _i++) {
            var type_2 = types_2[_i];
            delete EventDispatcher.types[type_2];
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
EventDispatcher.eventHandlers = {};
/**
 * イベント駆動できるクラス
 *
 * @version 0.7.0
 * @since 0.7.0
 *
 */
EventDispatcher.types = {};
exports.default = EventDispatcher;

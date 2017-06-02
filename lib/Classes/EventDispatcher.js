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

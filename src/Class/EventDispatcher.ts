import DispatchEvent = require('./DispatchEvent');
import EventHandler = require('./EventHandler');
import IEventDispatcher = require('../Interface/IEventDispatcher');

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
class EventDispatcher implements IEventDispatcher {

	/**
	 * イベント駆動できるクラス
	 *
	 * @version 0.7.0
	 * @since 0.7.0
	 *
	 */
	public static eventHandlers: { [id: string]: EventHandler } = {};

	/**
	 * イベント駆動できるクラス
	 *
	 * @version 0.7.0
	 * @since 0.7.0
	 *
	 */
	public static types: { [type: string]: EventHandler[] } = {};

	/**
	 * コンストラクタ
	 *
	 * @version 0.0.10
	 * @since 0.0.10
	 *
	 */
	constructor () {
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
	public on (type: string | string[], handler: Function): EventDispatcher {
		let types: string[];
		if (typeof type === 'string') {
			types = type.split(/\s+/g);
		} else {
			types = type;
		}
		for (const type of types) {
			const eventHandler: EventHandler = new EventHandler(this, type, handler);
			EventDispatcher.eventHandlers[eventHandler.id] = eventHandler;
			if (!EventDispatcher.types[type]) {
				EventDispatcher.types[type] = [];
			}
			EventDispatcher.types[type].push(eventHandler);
		}
		return this;
	}

	/**
	 * イベントハンドラを削除する
	 *
	 * @version 0.9.0
	 * @since 0.0.10
	 * @param type イベントのタイプ（複数可）
	 * @return インスタンス自身
	 *
	 */
	public off (type?: string | string[]): EventDispatcher {
		let types: string[];
		if (typeof type === 'string') {
			types = type.split(/\s+/g);
		} else {
			types = type;
		}
		for (const type of types) {
			delete EventDispatcher.types[type];
		}
		return this;
	}

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
	public trigger (type: string | DispatchEvent, args: any[] = [], context?: any): EventDispatcher {
		context = context || this;
		let typeName: string;
		let e: DispatchEvent;
		if (typeof type === 'string') {
			typeName = type;
			e = new DispatchEvent(type);
		} else {
			e = type;
			typeName = e.type;
		}
		if (EventDispatcher.types[typeName]) {
			// sliceをつかってオブジェクトのコピーを渡し参照を切る
			const handlers: EventHandler[] = EventDispatcher.types[typeName].slice();
			while (handlers.length) {
				const eventHandler: EventHandler = handlers.shift();
				if (eventHandler.context === this) {
					const isCancel: boolean = eventHandler.fire(context, e, args);
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
	}
}

export = EventDispatcher;

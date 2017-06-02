import DispatchEvent from './DispatchEvent';
import EventHandler from './EventHandler';

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
export default class EventDispatcher {

	/**
	 * イベント駆動できるクラス
	 *
	 * @version 0.7.0
	 * @since 0.7.0
	 *
	 */
	public static eventHandlers: { [id: string]: EventHandler<any> } = {}; // tslint:disable-line:no-any

	/**
	 * イベント駆動できるクラス
	 *
	 * @version 0.7.0
	 * @since 0.7.0
	 *
	 */
	public static types: { [type: string]: EventHandler<any>[] } = {}; // tslint:disable-line:no-any

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
	public on<T = {}> (types: string | string[], handler: (e: DispatchEvent, ...args: T[]) => boolean | void): EventDispatcher {
		const typeList: string[] = typeof types === 'string' ? types.split(/\s+/g) : types;
		for (const type of typeList) {
			const eventHandler: EventHandler<T> = new EventHandler<T>(this, type, handler);
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
	 * @version 1.0.0
	 * @since 0.0.10
	 * @param type イベントのタイプ（複数可）
	 * @return インスタンス自身
	 *
	 */
	public off (types: string | string[]): EventDispatcher {
		const typeList: string[] = typeof types === 'string' ? types.split(/\s+/g) : types;
		for (const type of typeList) {
			delete EventDispatcher.types[type];
		}
		return this;
	}

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
	public trigger<T = {}> (type: string | DispatchEvent, args: T[] = [], context?: EventDispatcher): EventDispatcher {
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
			const handlers: EventHandler<T>[] = EventDispatcher.types[typeName].slice();
			while (handlers.length) {
				const eventHandler: EventHandler<T> | undefined = handlers.shift();
				if (eventHandler && eventHandler.context === this) {
					const isCancel = eventHandler.fire(context, e, args);
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

import createUID from '../fn/createUID';

import DispatchEvent from './DispatchEvent';
import EventDispatcher from './EventDispatcher';

/**
 * イベントハンドラのラッパークラス
 *
 * @version 0.9.0
 * @since 0.0.10
 *
 */
export default class EventHandler<T> {

	/**
	 * イベントハンドラのユニークID
	 *
	 * @version 0.0.10
	 * @since 0.0.10
	 *
	 */
	public id: string;

	/**
	 * 紐づくディスパッチャーオブジェクト
	 *
	 * @version 0.0.10
	 * @since 0.0.10
	 *
	 */
	public context: EventDispatcher;

	/**
	 * イベントのタイプ
	 *
	 * @version 0.0.10
	 * @since 0.0.10
	 *
	 */
	public type: string;

	/**
	 * ハンドラ
	 *
	 * @version 1.0.0
	 * @since 0.0.10
	 *
	 */
	private _handler: (e: DispatchEvent, ...args: T[]) => boolean | void;

	/**
	 * ハンドラ
	 *
	 * @version 1.0.0
	 * @since 0.0.10
	 * @param context 紐づくディスパッチャーオブジェクト
	 * @param type イベントのタイプ
	 * @param handler ハンドラ
	 */
	constructor (context: EventDispatcher, type: string, handler: (e: DispatchEvent, ...args: T[]) => boolean | void) {
		this.context = context;
		this.id = createUID();
		this.type = type;
		this._handler = handler;
	}

	/**
	 * ハンドラを実行する
	 *
	 * @version 1.0.0
	 * @since 0.0.10
	 * @param context 紐づくディスパッチャーオブジェクト
	 * @param type イベントのタイプ
	 * @param handler ハンドラ
	 * @return イベントの伝達を止めるかどうか
	 */
	public fire (context: EventDispatcher, e: DispatchEvent, args: T[]): boolean {
		let applyArgs: (DispatchEvent | T)[] = [];
		applyArgs.push(e);
		applyArgs = applyArgs.concat(args);
		const handlerReturn: boolean | void = this._handler.apply(context, applyArgs);
		return handlerReturn !== undefined && !handlerReturn;
	}

}

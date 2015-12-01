import UtilString = require('./UtilString');
import DispatchEvent = require('./DispatchEvent');
import EventDispatcher = require('./EventDispatcher');

/**
 * イベントハンドラのラッパークラス
 *
 * @version 0.9.0
 * @since 0.0.10
 *
 */
class EventHandler {

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
	 * @version 0.9.0
	 * @since 0.0.10
	 *
	 */
	private _handler: Function;

	/**
	 * ハンドラ
	 *
	 * @version 0.9.0
	 * @since 0.0.10
	 * @param context 紐づくディスパッチャーオブジェクト
	 * @param type イベントのタイプ
	 * @param handler ハンドラ
	 *
	 */
	constructor (context: EventDispatcher, type: string, handler: Function) {
		this.context = context;
		this.id = UtilString.UID();
		this.type = type;
		this._handler = handler;
	}

	/**
	 * ハンドラを実行する
	 *
	 * @version 0.9.0
	 * @since 0.0.10
	 * @param context 紐づくディスパッチャーオブジェクト
	 * @param type イベントのタイプ
	 * @param handler ハンドラ
	 * @return イベントの伝達を止めるかどうか
	 *
	 */
	public fire (context: any, e: DispatchEvent, args: any[]): boolean {
		let handlerReturn: boolean | void = this._handler.apply(context, [e].concat(args));
		return handlerReturn !== undefined && !handlerReturn;
	}

}

export = EventHandler;

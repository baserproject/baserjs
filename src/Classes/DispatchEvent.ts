/**
 * イベントオブジェクトのクラス
 *
 * @version 0.9.0
 * @since 0.0.10
 *
 */
export default class DispatchEvent {

	/**
	 * イベントのタイプ
	 *
	 * @version 0.3.0
	 * @since 0.0.10
	 *
	 */
	public type: string;

	/**
	 * イベントの伝達が止められているかどうか
	 *
	 * @version 0.0.10
	 * @since 0.0.10
	 *
	 */
	private _isImmediatePropagationStopped = false;

	/**
	 * デフォルトのイベントの発火が止められているかどうか
	 *
	 * @version 0.9.0
	 * @since 0.9.0
	 *
	 */
	private _isDefaultPrevented = false;

	/**
	 * コンストラクタ
	 *
	 * @version 0.3.0
	 * @since 0.0.10
	 *
	 */
	constructor (type: string) {
		this.type = type;
	}

	/**
	 * イベントの伝達を止める
	 *
	 * @version 0.0.10
	 * @since 0.0.10
	 *
	 */
	public stopImmediatePropagation (): void {
		this._isImmediatePropagationStopped = true;
	}

	/**
	 * イベントの伝達が止められているかどうか
	 *
	 * @version 0.0.10
	 * @since 0.0.10
	 * @return イベントの伝達が止められているかどうか
	 *
	 */
	public isImmediatePropagationStopped (): boolean {
		return this._isImmediatePropagationStopped;
	}

	/**
	 * デフォルトのイベントの発火を止める
	 * ※EventDispatcher.triggerでの実装に依る
	 *
	 * @version 0.9.0
	 * @since 0.9.0
	 *
	 */
	public preventDefault (): void {
		this._isDefaultPrevented = true;
	}

	/**
	 * デフォルトのイベントの発火が止められているかどうか
	 *
	 * @version 0.9.0
	 * @since 0.9.0
	 * @return デフォルトのイベントの発火が止められているかどうか
	 *
	 */
	public isDefaultPrevented (): boolean {
		return this._isDefaultPrevented;
	}

}

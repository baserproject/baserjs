import DispatchEvent = require('./DispatchEvent');
import EventDispatcher = require('./EventDispatcher');

/**
 * アニメーションフレームを管理するクラス
 *
 * @version 0.9.0
 * @since 0.0.10
 *
 */
class AnimationFrames extends EventDispatcher {

	/**
	 * フレームレート
	 * 単位: FPS
	 *
	 * @version 0.0.10
	 * @since 0.0.10
	 *
	 */
	static FRAME_RATE = 60;

	/**
	 * フレーム毎に実行するコールバック
	 *
	 * @version 0.9.0
	 * @since 0.0.10
	 *
	 */
	private _callback: Function;

	/**
	 * フレームのリクエストID
	 *
	 * @version 0.9.0
	 * @since 0.0.10
	 *
	 */
	private _requestId: number;

	/**
	 * 停止状態かどうか
	 *
	 * @version 0.9.0
	 * @since 0.9.0
	 *
	 */
	private _isStop: boolean = true;

	/**
	 * ネイティブのrequestAnimationFrameを使用するかどうか
	 *
	 * @version 0.9.0
	 * @since 0.9.0
	 *
	 */
	private _isPolyfill: boolean;

	/**
	 * フレーム毎のに実行するコールバックを登録する
	 *
	 * @version 0.9.0
	 * @since 0.0.10
	 * @param callback コールバック関数
	 *
	 */
	constructor (callback?: Function) {
		super();
		this._callback = callback;
		this._isPolyfill = !('requestAnimationFrame' in window && 'cancelAnimationFrame' in window);
	}

	/**
	 * フレーム処理を開始する
	 *
	 * @version 0.9.0
	 * @since 0.0.10
	 * @param context コンテキスト
	 * @return インスタンス自身
	 *
	 */
	public start (context?: any): AnimationFrames {
		context = context || this;
		this._isStop = false;
		const START_TIMESTAMP: number = new Date().getTime();
		if (!this._isPolyfill) {
			// call: 0 define function
			let onEnterFrame: { (timestamp: number): void } = (timestamp: number): void => {
				cancelAnimationFrame(this._requestId);
				// call: 3 fire callback
				let e: DispatchEvent = this._enterFrame(context, timestamp, START_TIMESTAMP);
				// call: 4 cancel continue
				if (!e.isDefaultPrevented() && !this._isStop) {
					// continue
					this._requestId = requestAnimationFrame(onEnterFrame);
					// call 5: stack continue
				} else {
					let e: DispatchEvent = new DispatchEvent('stop');
					this.trigger(e, [timestamp, START_TIMESTAMP, context], context);
				}
			}
			this._requestId = requestAnimationFrame(onEnterFrame);
			// call: 1 first stacked
		} else {
			let interval: number = 1000 / AnimationFrames.FRAME_RATE;
			let onEnterFrame: { (): void } = (): void => {
				clearTimeout(this._requestId);
				let timestamp: number = new Date().getTime();
				let e: DispatchEvent = this._enterFrame(context, timestamp, START_TIMESTAMP);
				if (!e.isDefaultPrevented() && !this._isStop) {
					this._requestId = setTimeout(onEnterFrame, interval);
				} else {
					let e: DispatchEvent = new DispatchEvent('stop');
					this.trigger(e, [timestamp, START_TIMESTAMP, context], context);
				}
			};
			this._requestId = setTimeout(onEnterFrame, interval);
		}
		return this;
	}

	/**
	 * フレーム毎の処理
	 *
	 * @version 0.9.0
	 * @since 0.9.0
	 * @param context コンテキスト
	 * @return イベント
	 *
	 */
	private _enterFrame (context: any, now: number, startTimestamp): DispatchEvent {
		if (this._callback) {
			this._callback.call(context, now, startTimestamp, context);
		}
		let e: DispatchEvent = new DispatchEvent('enterframe');
		this.trigger(e, [now, startTimestamp, context], this);
		return e;
	}

	/**
	 * リクエストしたコールバックを停止する
	 *
	 * @version 0.9.0
	 * @since 0.0.10
	 * @return インスタンス自身
	 *
	 */
	public stop (): AnimationFrames {
		this._isStop = true;
		if (!this._isPolyfill) {
			cancelAnimationFrame(this._requestId);
		} else {
			clearTimeout(this._requestId);
		}
		return this;
	}

}

export = AnimationFrames;

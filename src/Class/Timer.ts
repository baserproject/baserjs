import DispatchEvent = require('./DispatchEvent');
import EventDispatcher = require('./EventDispatcher');

/**
 * 時間管理クラス
 *
 * @version 0.9.0
 * @since 0.0.1
 *
 */
class Timer extends EventDispatcher {

	/**
	 * インスタンスの最終更新時間
	 *
	 * @version 0.0.1
	 * @since 0.0.1
	 *
	 */
	private _currentTime: Date;

	/**
	 * タイマーID
	 *
	 * @version 0.9.0
	 * @since 0.0.8
	 *
	 */
	private _timerId: number = null;

	/**
	 * インターバル
	 *
	 * `13`は[jQuery](http://jquery.com/)を参考
	 *
	 * @version 0.0.8
	 * @since 0.0.8
	 *
	 */
	public interval: number = 13;

	/**
	 * コンストラクタ
	 *
	 * @version 0.9.0
	 * @since 0.0.1
	 *
	 */
	constructor () {
		super();
		this.now();
	}

	/**
	 * 暗黙の型変換時の振る舞い
	 *
	 * @version 0.0.1
	 * @since 0.0.1
	 * @return 保持しているタイムスタンプ
	 *
	 */
	public valueOf (): number {
		return this._currentTime.valueOf();
	}

	/**
	 * 時間を現在に更新する
	 *
	 * @version 0.0.1
	 * @since 0.0.1
	 * @return 更新した時間のタイムスタンプ
	 *
	 */
	public now (): number {
		this._currentTime = new Date();
		return this.valueOf();
	}

	/**
	 * タイマーをスタートする
	 * 継続中 'progress' イベントを発行し続ける
	 * 継続時間を指定しなければずっと作動する
	 *
	 * @version 0.9.0
	 * @since 0.0.8
	 * @param time 継続時間
	 * @return インスタンス自身
	 * 
	 * ```
	 * let timer = new Timer();
	 * timer.on('progress', (e, currentTime, startTime, context) => {
	 * 	context.stop();
	 * }).start();
	 * ```
	 *
	 */
	public start (time: number = Infinity): Timer {
		const START_TIMESTAMP: number = this.now();
		this.stop();
		let tick = (time: number): void => {
			this._timerId = setTimeout( (): void => {
				let now: number = this.now();
				let period: number = now - START_TIMESTAMP;
				if (period < time) {
					this.trigger('progress', [now, START_TIMESTAMP, this], this);
					tick(time);
				} else {
					this.stop();
				}
			}, this.interval);
		};
		tick(time);
		return this;
	}

	/**
	 * タイマーをストップする
	 *
	 * @version 0.9.0
	 * @since 0.0.8
	 * @return インスタンス自身
	 *
	 */
	public stop (): Timer {
		let now: number = this.now();
		let e: DispatchEvent = new DispatchEvent('stop');
		this.trigger(e, [now, this._timerId, this], this);
		if (!e.isDefaultPrevented()) {
			clearTimeout(this._timerId);
			console.log('とめたで' + e.type);
			this._timerId = null;
		}
		return this;
	}

	/**
	 * 遅延処理
	 * `stop`メソッドで止めることが可能
	 *
	 * @version 0.0.8
	 * @since 0.0.8
	 *
	 */
	public wait (time: number, callback: Function, context?: any): Timer {
		if (context == null) {
			context = this;
		}
		this.stop();
		this._timerId = window.setTimeout( (): void => {
			this.stop();
			callback.call(context);
		}, time);
		return this;
	}

	/**
	 * 遅延処理
	 *
	 * @version 0.0.8
	 * @since 0.0.8
	 *
	 */
	static wait (time: number, callback: Function, context?: any): Timer {
		return new Timer().wait(time, callback, context);
	}

}

export = Timer;

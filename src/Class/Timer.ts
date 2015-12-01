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
	 * 遅延処理
	 *
	 * `wait`メソッドを実行したインスタンスを返す
	 * そのインスタンスは`stop`メソッドで止めることが可能
	 *
	 * @version 0.9.0
	 * @since 0.0.8
	 * @param delay 遅延時間
	 * @param callback 遅延後の処理
	 * @param context コンテクスト
	 * @return `wait`メソッドを実行したインスタンス
	 *
	 */
	public static wait (time: number, callback: { (currentTime: number, startTime: number, context?: any): void }, context?: any): Timer {
		return new Timer().wait(time, callback, context);
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
	 * 継続中`progress`イベントを発行し続ける
	 * 継続時間を指定しなければずっと作動する
	 *
	 * 継続時間を指定して`stop`イベントだけを利用するようなケースでは
	 * `wait`メソッドを利用したほうが効率がよい
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
		// call: 0
		const START_TIMESTAMP: number = this.now();
		clearTimeout(this._timerId);
		// call: 1
		let tick = (time: number): void => {
			// call: 3, 7, 12... onTick
			this._timerId = setTimeout(
				(): void => {
					// call: 5, 10... onProgress
					let now: number = this.now();
					let period: number = now - START_TIMESTAMP;
					if (period < time) {
						// call: 6, 11... onKickTick
						tick(time);
						// call: 9, 14... onFireProgressHandler
						let e: DispatchEvent = new DispatchEvent('progress');
						this.trigger(e, [now, START_TIMESTAMP, this], this);
						if (e.isDefaultPrevented()) {
							this.stop();
							// didn't calling onProgress
						}
					} else {
						this.stop();
					}
				},
				this.interval
			);
			// call: 4, 8, 13... onStacked
		};
		// call: 2
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
			this._timerId = null;
		}
		return this;
	}

	/**
	 * 遅延処理
	 * `stop`メソッドで止めることが可能
	 *
	 * @version 0.9.0
	 * @since 0.0.8
	 * @param delay 遅延時間
	 * @param callback 遅延後の処理
	 * @param context コンテクスト
	 * @return インスタンス自身
	 *
	 * ```
	 * let timer = new Timer();
	 * timer.wait( (currentTime, startTime, context) => {
	 * 	context.stop();
	 * }).start();
	 * ```
	 *
	 */
	public wait (delay: number, callback: { (currentTime: number, startTime: number, context?: any): void }, context?: any): Timer {
		context = context || this;
		const START_TIMESTAMP: number = this.now();
		clearTimeout(this._timerId);
		this._timerId = setTimeout(
			(): void => {
				this.stop();
				let now: number = this.now();
				callback.call(context, now, START_TIMESTAMP, context);
			},
			delay
		);
		return this;
	}

}

export = Timer;

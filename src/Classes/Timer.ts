const CANCEL_REASON = '__baser_timer_reject__';

/**
 * タイマークラス
 *
 * @version 1.0.0
 * @since 1.0.0
 *
 */
export default class Timer {

	public static CANCEL_REASON = CANCEL_REASON;

	/**
	 * 指定ミリ秒待機するPromiseを返す
	 *
	 * キャンセル不可
	 *
	 * ex.) then
	 * ```
	 * Promise.resolve(result1)
	 * .then(Timer.delay(500))
	 * .then((result2) => {
	 * 	result1 === result2; // true
	 * });
	 * ```
	 *
	 * ex.2) await
	 * ```
	 * const result2 = await Timer.delay(500)(result1);
	 * result1 === result2; // true
	 * ```
	 */
	public static delay<R> (time: number) {
		return (returnValue?: R) => new Timer(time).wait(returnValue);
	}

	public time: number;

	private _reject: (reason: typeof CANCEL_REASON) => void;

	private _timerId: NodeJS.Timer;

	constructor (time: number) {
		if (!Number.isSafeInteger(time)) {
			throw new RangeError(`An argument is invalid number. 0 < time <= MAX_SAFE_INTEGER`);
		}
		this.time = time;
	}

	public wait<R> (returnValue: R) {
		return new Promise<R>((resolve, reject) => {
			this._reject = reject;
			if (this.time === 0) {
				this._timerId = setImmediate(() => {
					resolve(returnValue);
				});
			} else {
				this._timerId = setTimeout(
					() => {
						resolve(returnValue);
					},
					this.time,
				);
			}
		});
	}

	public cancel () {
		clearImmediate(this._timerId);
		clearTimeout(this._timerId);
		if (this._reject) {
			this._reject(CANCEL_REASON);
		}
	}

}

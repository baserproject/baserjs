/**
 * タイマークラス
 *
 * @version 1.0.0
 * @since 1.0.0
 *
 */
export default class Timer {
    static CANCEL_REASON: string;
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
    static delay<R>(time: number): (returnValue?: R | undefined) => Promise<R | undefined>;
    time: number;
    private _reject;
    private _timerId;
    constructor(time: number);
    wait<R>(returnValue: R): Promise<R>;
    cancel(): void;
}

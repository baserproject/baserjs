/**
 * 時間管理クラス
 *
 * @version 0.0.8
 * @since 0.0.1
 *
 */
declare class Timer {
    /**
     * コアとなるDateオブジェクト
     *
     * @version 0.0.1
     * @since 0.0.1
     *
     */
    datetime: Date;
    /**
     * タイマーID
     *
     * @version 0.0.8
     * @since 0.0.8
     *
     */
    timerId: number;
    /**
     * インターバル
     *
     * `13`は[jQuery](http://jquery.com/)を参考
     *
     * @version 0.0.8
     * @since 0.0.8
     *
     */
    interval: number;
    /**
     * プログレスイベントのコールバック
     *
     * @version 0.0.8
     * @since 0.0.8
     *
     */
    private _onProgress;
    /**
     * コンストラクタ
     *
     * @version 0.0.8
     * @since 0.0.1
     *
     */
    constructor();
    /**
     * 暗黙の型変換時の振る舞い
     *
     * @version 0.0.1
     * @since 0.0.1
     *
     */
    valueOf(): number;
    /**
     * 時間を現在に更新する
     *
     * @version 0.0.1
     * @since 0.0.1
     *
     */
    now(): number;
    /**
     * タイマーをスタートする
     *
     * @version 0.0.8
     * @since 0.0.8
     *
     */
    start(time: number): Timer;
    /**
     * タイマーをストップする
     *
     * @version 0.0.8
     * @since 0.0.8
     *
     */
    stop(): Timer;
    /**
     * 遅延処理
     *
     * @version 0.0.8
     * @since 0.0.8
     *
     */
    wait(time: number, callback: Function, context?: any): Timer;
    /**
     * プログレスイベントを登録
     *
     * @version 0.0.8
     * @since 0.0.8
     *
     */
    progress(callback: Function): Timer;
    /**
     * 遅延処理
     *
     * @version 0.0.8
     * @since 0.0.8
     *
     */
    static wait(time: number, callback: Function, context?: any): Timer;
}
export = Timer;

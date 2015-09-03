/**
 * アニメーションフレームを管理するクラス
 *
 * @version 0.0.10
 * @since 0.0.10
 *
 */
declare class AnimationFrames {
    /**
     * フレームレート
     *
     * @version 0.0.10
     * @since 0.0.10
     *
     */
    static FRAME_RATE: number;
    /**
     * フレーム毎に実行するコールバック
     *
     * @version 0.0.10
     * @since 0.0.10
     *
     */
    callback: Function;
    /**
     * フレームのリクエストID
     *
     * @version 0.0.10
     * @since 0.0.10
     *
     */
    requestId: number;
    /**
     * フレーム毎のに実行するコールバックを登録する
     *
     * @version 0.0.10
     * @since 0.0.10
     * @return {number} リクエストIDを返す
     *
     */
    constructor(callback: Function);
    start(context?: any): void;
    /**
     * リクエストしたコールバックを停止する
     *
     * @version 0.0.10
     * @since 0.0.10
     * @return {number} リクエストIDを返す
     *
     */
    stop(): void;
}
export = AnimationFrames;

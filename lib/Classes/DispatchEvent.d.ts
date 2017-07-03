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
    type: string;
    /**
     * イベントの伝達が止められているかどうか
     *
     * @version 0.0.10
     * @since 0.0.10
     *
     */
    private _isImmediatePropagationStopped;
    /**
     * デフォルトのイベントの発火が止められているかどうか
     *
     * @version 0.9.0
     * @since 0.9.0
     *
     */
    private _isDefaultPrevented;
    /**
     * コンストラクタ
     *
     * @version 0.3.0
     * @since 0.0.10
     *
     */
    constructor(type: string);
    /**
     * イベントの伝達を止める
     *
     * @version 0.0.10
     * @since 0.0.10
     *
     */
    stopImmediatePropagation(): void;
    /**
     * イベントの伝達が止められているかどうか
     *
     * @version 0.0.10
     * @since 0.0.10
     * @return イベントの伝達が止められているかどうか
     *
     */
    isImmediatePropagationStopped(): boolean;
    /**
     * デフォルトのイベントの発火を止める
     * ※EventDispatcher.triggerでの実装に依る
     *
     * @version 0.9.0
     * @since 0.9.0
     *
     */
    preventDefault(): void;
    /**
     * デフォルトのイベントの発火が止められているかどうか
     *
     * @version 0.9.0
     * @since 0.9.0
     * @return デフォルトのイベントの発火が止められているかどうか
     *
     */
    isDefaultPrevented(): boolean;
}

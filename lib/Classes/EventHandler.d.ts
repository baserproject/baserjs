import DispatchEvent from './DispatchEvent';
import EventDispatcher from './EventDispatcher';
/**
 * イベントハンドラのラッパークラス
 *
 * @version 0.9.0
 * @since 0.0.10
 *
 */
export default class EventHandler<T> {
    /**
     * イベントハンドラのユニークID
     *
     * @version 0.0.10
     * @since 0.0.10
     *
     */
    id: string;
    /**
     * 紐づくディスパッチャーオブジェクト
     *
     * @version 0.0.10
     * @since 0.0.10
     *
     */
    context: EventDispatcher;
    /**
     * イベントのタイプ
     *
     * @version 0.0.10
     * @since 0.0.10
     *
     */
    type: string;
    /**
     * ハンドラ
     *
     * @version 1.0.0
     * @since 0.0.10
     *
     */
    private _handler;
    /**
     * ハンドラ
     *
     * @version 1.0.0
     * @since 0.0.10
     * @param context 紐づくディスパッチャーオブジェクト
     * @param type イベントのタイプ
     * @param handler ハンドラ
     */
    constructor(context: EventDispatcher, type: string, handler: (e: DispatchEvent, ...args: T[]) => boolean | void);
    /**
     * ハンドラを実行する
     *
     * @version 1.0.0
     * @since 0.0.10
     * @param context 紐づくディスパッチャーオブジェクト
     * @param type イベントのタイプ
     * @param handler ハンドラ
     * @return イベントの伝達を止めるかどうか
     */
    fire(context: EventDispatcher, e: DispatchEvent, args: T[]): boolean;
}

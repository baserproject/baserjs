import DispatchEvent from './DispatchEvent';
import EventHandler from './EventHandler';
/**
 * イベントを検知してハンドラを発火させることができるクラス
 *
 * @version 0.9.0
 * @since 0.0.10
 *
 * ```
 * let dispatcher = new EventDispatcher();
 *
 * dispatcher.on('event', (e) -> {
 * 	// handler
 * });
 *
 * dispatcher.trigger('event');
 * ```
 *
 */
export default class EventDispatcher {
    /**
     * イベント駆動できるクラス
     *
     * @version 0.7.0
     * @since 0.7.0
     *
     */
    static eventHandlers: {
        [id: string]: EventHandler<any>;
    };
    /**
     * イベント駆動できるクラス
     *
     * @version 0.7.0
     * @since 0.7.0
     *
     */
    static types: {
        [type: string]: EventHandler<any>[];
    };
    /**
     * コンストラクタ
     *
     * @version 0.0.10
     * @since 0.0.10
     *
     */
    constructor();
    /**
     * イベントハンドラを登録する
     *
     * @version 0.9.0
     * @since 0.0.10
     * @param type イベントのタイプ（複数可）
     * @param handler
     * @return インスタンス自身
     *
     */
    on<T = {}>(types: string | string[], handler: (e: DispatchEvent, ...args: T[]) => boolean | void): EventDispatcher;
    /**
     * イベントハンドラを削除する
     *
     * @version 1.0.0
     * @since 0.0.10
     * @param type イベントのタイプ（複数可）
     * @return インスタンス自身
     *
     */
    off(types: string | string[]): EventDispatcher;
    /**
     * イベントハンドラを発火させる
     *
     * @version 1.0.0
     * @since 0.0.10
     * @param type イベントのタイプ
     * @param args イベントハンドラに渡す引数
     * @param context イベントハンドラのコンテキスト
     * @return インスタンス自身
     *
     */
    trigger<T = {}>(type: string | DispatchEvent, args?: T[], context?: EventDispatcher): EventDispatcher;
}

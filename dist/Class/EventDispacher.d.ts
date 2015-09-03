import EventHandler = require('./EventHandler');
import IEventDispacher = require('../Interface/IEventDispacher');
/**
 * イベント駆動できるクラス
 *
 * @version 0.0.10
 * @since 0.0.10
 *
 */
declare class EventDispacher implements IEventDispacher {
    static eventHandlers: {
        [index: string]: EventHandler;
    };
    static types: {
        [index: string]: EventHandler[];
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
     * @version 0.8.0
     * @since 0.0.10
     *
     */
    on(type: string | string[], handler: Function): EventDispacher;
    /**
     * イベントハンドラを削除する
     *
     * @version 0.0.10
     * @since 0.0.10
     *
     */
    off(type?: string | string[]): EventDispacher;
    /**
     * イベントハンドラを発火させる
     *
     * @version 0.5.0
     * @since 0.0.10
     *
     */
    trigger(type: string, args?: any[], context?: any): EventDispacher;
}
export = EventDispacher;

import EventDispacher = require('./EventDispacher');
/**
 * イベントハンドラのラッパークラス
 *
 * @version 0.0.10
 * @since 0.0.10
 *
 */
declare class EventHandler {
    id: string;
    context: EventDispacher;
    type: string;
    handler: Function;
    constructor(context: EventDispacher, type: string, handler: Function);
}
export = EventHandler;

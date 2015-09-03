/**
 * イベントオブジェクトのクラス
 *
 * @version 0.3.0
 * @since 0.0.10
 *
 */
declare class DispacheEvent {
    type: string;
    private _isImmediatePropagationStopped;
    constructor(type: string);
    isImmediatePropagationStopped(): boolean;
    stopImmediatePropagation(): void;
}
export = DispacheEvent;

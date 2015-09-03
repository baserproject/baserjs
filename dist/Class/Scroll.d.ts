import Timer = require('./Timer');
import ScrollOptions = require('../Interface/ScrollOptions');
/**
 * スクロールを管理するクラス
 *
 * @version 0.0.8
 * @since 0.0.8
 *
 */
declare class Scroll {
    static speed: number;
    static interval: number;
    static delayWhenURLHashTarget: number;
    targetX: number;
    targetY: number;
    prevX: number;
    prevY: number;
    isScroll: boolean;
    timer: Timer;
    options: ScrollOptions;
    /**
     * 対象の要素もしくは位置にスクロールを移動させる
     *
     * @version 0.3.2
     * @since 0.0.8
     * @param {string | HTMLElement | JQuery | number} 対象の要素のセレクタ・HTMLオブジェクト・jQueryオブジェクトもしくはスクロール位置
     * @param {ScrollOptions} オプション
     * @return {Scroll} 自信のスクロールオブジェクト
     *
     */
    to(selector: string | HTMLElement | JQuery | number, options?: ScrollOptions): Scroll;
    private _scroll();
    private _getX();
    private _getY();
    private _finish();
}
export = Scroll;

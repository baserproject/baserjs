import * as BezierEasing from 'bezier-easing';
import EventDispatcher from './EventDispatcher';
export interface ScrollOptions {
    offset?: number;
    wheelCancel?: boolean;
}
/**
 * スクロールを管理するクラス
 *
 * @version 0.9.0
 * @since 0.0.8
 *
 */
export default class Scroll extends EventDispatcher {
    static duration: number;
    static easing: BezierEasing.Easing;
    static delayWhenURLHashTarget: number;
    /**
     * Default global offset
     */
    static offset: number;
    static to(selector?: string | Element | number, options?: ScrollOptions): Promise<void>;
    offset: number;
    isScroll: boolean;
    options: ScrollOptions;
    private _dest;
    private _dist;
    private _start;
    private _progressive;
    constructor();
    /**
     * 対象の要素もしくは位置にスクロールを移動させる
     *
     * @version 1.0.0
     * @since 0.0.8
     * @param selector 対象の要素のセレクタ・DOMもしくはスクロール位置
     * @param options オプション
     * @return インスタンス自信
     *
     */
    to(selector?: string | Element | number, options?: ScrollOptions): Promise<void>;
    private _to(selector);
    private _toHash();
    private _scrollStart();
    /**
     * スクロール
     *
     * @version 1.0.0
     * @since 0.0.8
     *
     */
    private _progress(rate);
    /**
     * y位置の取得
     *
     * @version 1.0.0
     * @since 0.0.8
     * @return y位置
     *
     */
    private readonly y;
    /**
     * スクロールの終了
     *
     * @version 1.0.0
     * @since 0.0.8
     *
     */
    private _finish();
    /**
     * スクロールの終了
     *
     * @version 1.0.0
     * @since 1.0.0
     *
     */
    private _cancel();
}

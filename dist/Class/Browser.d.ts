import EventDispacher = require('./EventDispacher');
import Locational = require('./Locational');
import BrowserUserAgent = require('../Interface/BrowserUserAgent');
/**
 * ブラウザの情報を管理するクラス
 *
 * @version 0.0.2
 * @since 0.0.2
 *
 */
declare class Browser extends EventDispacher {
    /**
     * ブラウザ
     *
     * @version 0.0.10
     * @since 0.0.10
     *
     */
    static browser: Browser;
    /**
     * デバイス・OS・ブラウザの情報
     *
     * @version 0.4.0
     * @since 0.0.1
     *
     */
    static spec: {
        isTouchable: boolean;
        ua: BrowserUserAgent;
    };
    /**
     * ページ遷移する
     *
     * @version 0.7.0
     * @since 0.1.0
     *
     */
    static jumpTo(path: string | Locational, isBlank?: boolean): void;
    /**
     * ユーザーエージェント情報を取得する
     *
     * @version 0.4.0
     * @since 0.0.1
     *
     */
    static getUA(): BrowserUserAgent;
    /**
     * 現在のURLのパラメータをリンク先へ引き継がせる
     *
     * @version 0.7.0
     * @since 0.7.0
     *
     */
    static inheritParams(targetParam: string): void;
    resizeEndInterval: number;
    scrollEndInterval: number;
    isResize: boolean;
    isScroll: boolean;
    /**
     * コンストラクタ
     *
     * @version 0.0.2
     * @since 0.0.2
     *
     */
    constructor();
}
export = Browser;

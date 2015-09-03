import BaserElement = require('./BaserElement');
import AlignedBoxCallback = require('../Interface/AlignedBoxCallback');
import BreakPointsOption = require('../Interface/BreakPointsOption');
/**
 * 高さ揃えをするボックスを管理するクラス
 *
 * @version 0.7.0
 * @since 0.7.0
 *
 */
declare class AlignedBoxes extends BaserElement {
    /**
     * jQuery dataに自信のインスタンスを登録するキー
     *
     * @version 0.7.0
     * @since 0.7.0
     *
     */
    static DATA_KEY: string;
    /**
     * jQuery dataにUIDを登録するキー
     *
     * @version 0.7.0
     * @since 0.7.0
     *
     */
    static DATA_KEY_ID: string;
    /**
     * 監視タイマーID
     *
     * @version 0.7.0
     * @since 0.7.0
     *
     */
    static watchTimer: number;
    /**
     * 監視の間隔
     *
     * @version 0.7.0
     * @since 0.7.0
     *
     */
    static watchInterval: number;
    /**
     * 監視タイマーが起動しているかどうか
     *
     * @version 0.7.0
     * @since 0.7.0
     *
     */
    static isBooted: boolean;
    /**
     * 現在の基準のフォントサイズ
     *
     * @version 0.7.0
     * @since 0.7.0
     *
     */
    static currentFontSize: number;
    /**
     * 監視対象のボックスグループ
     *
     * @version 0.7.0
     * @since 0.7.0
     *
     */
    static groups: {
        [id: string]: AlignedBoxes;
    };
    /**
     * 基準の文字要素
     *
     * @version 0.7.0
     * @since 0.7.0
     *
     */
    static dummyCharElement: HTMLElement;
    /**
     * 基準の文字要素を生成する
     *
     * @version 0.7.0
     * @since 0.7.0
     *
     */
    static createChar(): void;
    /**
     * 文字の大きさが変わったかどうか
     *
     * @version 0.7.0
     * @since 0.7.0
     *
     */
    static isChanged(): boolean;
    /**
     * 文字の大きさが変わったかどうかを監視するルーチン
     *
     * 文字の大きさが変わればボックスのサイズを再設定する
     *
     * @version 0.7.0
     * @since 0.7.0
     *
     */
    static observerForFontSize(): void;
    /**
     * ボックスのサイズを再設定する
     *
     * @version 0.7.0
     * @since 0.7.0
     *
     */
    static reAlign(): void;
    /**
     * 監視タイマーを起動する
     *
     * @version 0.7.0
     * @since 0.7.0
     *
     */
    static boot(): void;
    /**
     * ブレークポイントに寄るカラム数
     *
     * @version 0.7.0
     * @since 0.7.0
     *
     */
    private _columns;
    /**
     * ボックスの高さ揃えるときのコールバック
     *
     * @version 0.7.0
     * @since 0.7.0
     *
     */
    private _callback;
    /**
     * 現在のカラム
     *
     * @version 0.7.0
     * @since 0.7.0
     *
     */
    private _currentColumn;
    /**
     * コンストラクタ
     *
     * @version 0.7.0
     * @since 0.7.0
     * @param $el 対象のボックス要素
     * @param column カラム数もしくはブレークポイントに寄るカラム数 `0`の場合すべての要素の高さを揃える
     * @param callback ボックスの高さ揃えるときのコールバック
     */
    constructor($el: JQuery, column?: number | BreakPointsOption<number>, callback?: AlignedBoxCallback);
    /**
     * ボックスの高さ揃える
     *
     * @version 0.8.1
     * @since 0.8.1
     *
     */
    private _align();
    /**
     * 高さ揃えを解除する
     *
     * @version 0.7.0
     * @since 0.7.0
     *
     */
    destroy(): void;
}
export = AlignedBoxes;

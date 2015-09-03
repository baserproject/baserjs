import EventDispacher = require('./EventDispacher');
import BreakPointsOption = require('../Interface/BreakPointsOption');
/**
 * ブレークポイントの変化に応じた処理をする管理することができるクラス
 *
 * @version 0.8.1
 * @since 0.8.1
 *
 */
declare class BreakPoints<T> extends EventDispacher {
    currentPoint: number;
    breakPoints: number[];
    private _values;
    /**
     * コンストラクタ
     *
     * @param breakPoints ブレークポイントとコールバックに渡す値を設定する
     * @param callback 変化に応じたコールバック
     */
    constructor(breakPoints: BreakPointsOption<T>, callback?: {
        (value: T, breakPoint: number, windowWidth: number): void;
    });
    /**
     * ブレークポイントの登録処理
     *
     * @version 0.8.1
     * @since 0.7.0
     * @param breakPoints ブレークポイントとコールバックに渡す値を設定する
     */
    private _setBreakPoints<T>(breakPoints);
    /**
     * ブレークポイントを追加する
     *
     * @param breakPoints ブレークポイントとコールバックに渡す値を設定する
     */
    add<T>(breakPoints: BreakPointsOption<T>): void;
}
export = BreakPoints;

/**
 * ユーティリティ算術クラス
 *
 * @version 0.2.0
 * @since 0.0.2
 *
 */
declare class UtilMath {
    /**
     * 指定の範囲のランダムな数を返す
     *
     * @version 0.2.0
     * @since 0.2.0
     *
     * @param base 基準の数
     * @param dist 基準からこの数までの範囲の乱数になる
     * @return 乱数
     *
     */
    static random(base?: number, dist?: number): number;
    /**
     * 配列内の数値の合計を算出する
     *
     * @version 0.2.0
     * @since 0.2.0
     *
     * @param numberList 数の配列
     * @return 合計値
     *
     */
    static sum(numberList: number[]): number;
    /**
     * 均等に分割する
     *
     * @version 0.2.0
     * @since 0.2.0
     *
     * @param n 分割される数
     * @param devide 分割する数
     * @param returnInfo 詳細情報を返すかどうか
     * @return `returnInfo`が真の場合 分割された数値で構成された配列を、偽の場合 詳細情報と結果を返す
     *
     */
    static split(n: number, devide: number, returnInfo?: boolean): any;
}
export = UtilMath;

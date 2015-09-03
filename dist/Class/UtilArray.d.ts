/**
 * ユーティリティ配列クラス
 *
 * @version 0.2.0
 * @since 0.2.0
 *
 */
declare class UtilArray {
    /**
     * 配列中の対象の要素が一番最初に存在するインデックス番号を返す
     *
     * @version 0.2.0
     * @since 0.2.0
     *
     */
    static indexOf<T>(array: any[], element: T): number;
    /**
     * 配列中の対象のインデックスを削除する
     *
     * @version 0.2.0
     * @since 0.2.0
     *
     */
    static remove(array: any[], index: number): any[];
}
export = UtilArray;

/**
 * ユーティリティ文字列クラス
 *
 * @version 0.0.2
 * @since 0.0.2
 *
 */
declare class UtilString {
    /**
     * ユニークIDを発行する
     *
     * @version 0.0.1
     * @since 0.0.1
     *
     */
    static UID(seed?: number): string;
    /**
     * ハイフン チェインケース化
     *
     * @version 0.1.0
     * @since 0.1.0
     *
     */
    static hyphenDelimited(str: string): string;
    /**
     * スネークケース化
     *
     * @version 0.1.0
     * @since 0.1.0
     *
     */
    static snakeCase(str: string): string;
    /**
     * キャメルケース化
     *
     * @version 0.1.0
     * @since 0.1.0
     *
     */
    static camelCase(str: string, upperCase?: boolean): string;
    /**
     * 文字列が論理値の偽相等であるかどうか
     *
     * @version 0.2.0
     * @since 0.2.0
     *
     */
    static isFalsy(str: string): boolean;
    /**
     * 最初に登場する文字列の部分を分割する
     *
     * @version 0.7.0
     * @since 0.7.0
     *
     */
    static divide(str: string, separator: string): string[];
}
export = UtilString;

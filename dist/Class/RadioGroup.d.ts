import Radio = require('./Radio');
/**
 * ラジオボタンのname属性値で紐付いたブループを管理するクラス
 *
 * @since 0.0.1
 *
 */
declare class RadioGroup {
    /**
     * ラジオボタンのグループを保管するオブジェクト
     *
     * @since 0.7.0
     *
     */
    static groups: {
        [index: string]: RadioGroup;
    };
    /**
     * ラジオボタンのリスト
     *
     * @since 0.0.1
     *
     */
    radioButtons: Radio[];
    /**
     * 紐づくname属性値
     *
     * @since 0.0.1
     *
     */
    name: string;
    /**
     * コンストラクタ
     *
     * @since 0.0.1
     * @param name 紐づくname属性値
     *
     */
    constructor(name: string);
    /**
     * 紐づくラジオボタンを追加する
     *
     * @version 0.0.1
     * @since 0.0.1
     * @param radio 拡張ラジオボタン
     *
     */
    add(radio: Radio): void;
    /**
     * 管理するラジオボタンの状態を更新する
     *
     * @version 0.0.1
     * @since 0.0.1
     * @param ignoreRadio 対象外のラジオボタン
     *
     */
    update(ignoreRadio: Radio): void;
}
export = RadioGroup;

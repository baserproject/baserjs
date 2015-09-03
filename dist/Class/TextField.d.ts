import FormElement = require('./FormElement');
import ITextField = require('../Interface/ITextField');
import TextFieldOption = require('../Interface/TextFieldOption');
/**
 * テキストフィールドの拡張クラス
 *
 * @version 0.4.0
 * @since 0.4.0
 *
 */
declare class TextField extends FormElement implements ITextField {
    /**
     * オプションのデフォルト値
     *
     * @version 0.4.0
     * @since 0.4.0
     *
     */
    static defaultOption: TextFieldOption;
    /**
     * TextField要素のクラス
     *
     * @version 0.4.0
     * @since 0.4.0
     *
     */
    static classNameTextField: string;
    /**
     * 未入力状態に付加されるクラス
     *
     * @version 0.4.0
     * @since 0.4.0
     *
     */
    static classNameStateUninput: string;
    /**
     * プレースホルダー属性に対応しているかどうか
     *
     * @version 0.4.0
     * @since 0.4.0
     *
     */
    static supportPlaceholder: boolean;
    /**
     * 空かどうか
     *
     * @version 0.4.0
     * @since 0.4.0
     *
     */
    isEmpty: boolean;
    /**
     * プレースホルダーテキスト
     *
     * @version 0.4.0
     * @since 0.4.0
     *
     */
    placeholder: string;
    /**
     * プレースホルダーをもっているかどうか
     *
     * @version 0.4.0
     * @since 0.4.0
     *
     */
    hasPlaceholder: boolean;
    /**
     * オプション情報
     *
     * @since 0.4.1
     *
     */
    protected _config: TextFieldOption;
    /**
     * コンストラクタ
     *
     * @version 0.8.0
     * @since 0.4.0
     * @param $el 管理するDOM要素のjQueryオブジェクト
     * @param options オプション
     *
     */
    constructor($el: JQuery, options: TextFieldOption);
    /**
     * クラス名を設定する
     *
     * @version 0.4.0
     * @since 0.4.0
     * @override
     *
     */
    protected _setClassName(): void;
    /**
     * ラップ要素を生成
     *
     * @version 0.4.0
     * @since 0.4.0
     * @override
     *
     */
    protected _createWrapper(): void;
    /**
     * イベントの登録
     *
     * @version 0.4.1
     * @since 0.4.0
     * @override
     *
     */
    protected _bindEvents(): void;
    /**
     * 要素の状態を更新する
     *
     * @version 0.4.0
     * @since 0.4.0
     *
     */
    private _update();
    /**
     * 入力されている状態を設定する
     *
     * @version 0.4.0
     * @since 0.4.0
     *
     */
    private _setStateInputted();
    /**
     * 入力されていない状態を設定する
     *
     * @version 0.4.0
     * @since 0.4.0
     *
     */
    private _setStateUninputted();
    /**
     * プレースホルダーと値が同じかどうか
     *
     * @version 0.4.0
     * @since 0.4.0
     *
     */
    private _equalPlaceholder();
    /**
     * プレースホルダーの値を設定する
     *
     * @version 0.4.0
     * @since 0.4.0
     *
     */
    private _setPlaceholderValue();
    /**
     * 【IE用】カーソル（キャレット）を先頭に持っていく
     *
     * @version 0.4.0
     * @since 0.4.0
     *
     */
    private _msCaretMoveToTop();
}
export = TextField;

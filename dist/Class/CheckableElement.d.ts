import FormElement = require('./FormElement');
import ICheckableElement = require('../Interface/ICheckableElement');
import CheckableElementOption = require('../Interface/CheckableElementOption');
/**
 * ラジオボタンとチェックボックスの抽象クラス
 *
 * @version 0.1.0
 * @since 0.0.1
 *
 */
declare class CheckableElement extends FormElement implements ICheckableElement {
    /**
     * オプションのデフォルト値
     *
     * @since 0.0.1
     *
     */
    static defaultOption: CheckableElementOption;
    /**
     * CheckableElement関連の要素のチェック時に付加されるクラス
     *
     * @version 0.1.0
     * @since 0.1.0
     *
     */
    static classNameStateChecked: string;
    /**
     * CheckableElement関連の要素のチェックがはずれた時に付加されるクラス
     *
     * @version 0.1.0
     * @since 0.1.0
     *
     */
    static classNameStateUnchecked: string;
    /**
     * チェック状態
     *
     * @since 0.0.1
     *
     */
    checked: boolean;
    /**
     * 初期のチェック状態
     *
     * @since 0.0.1
     *
     */
    defaultChecked: boolean;
    /**
     * チェック状態の時に付加されるclass属性値
     *
     * @since 0.0.1
     *
     */
    private _checkedClass;
    /**
     * オプション情報
     *
     * @since 0.4.1
     *
     */
    protected _config: CheckableElementOption;
    /**
     * コンストラクタ
     *
     * @version 0.8.0
     * @since 0.0.1
     * @param $el 管理するDOM要素のjQueryオブジェクト
     * @param options オプション
     *
     */
    constructor($el: JQuery, options: CheckableElementOption);
    /**
     * 要素の状態を更新する
     *
     * @version 0.0.1
     * @since 0.0.1
     *
     */
    update(): void;
    /**
     * 要素の状態を更新する
     *
     * @version 0.0.1
     * @since 0.0.1
     *
     */
    protected _onchenge(): void;
    /**
     * 要素の状態を更新する
     *
     * @version 0.1.0
     * @since 0.0.1
     *
     */
    private _update();
}
export = CheckableElement;

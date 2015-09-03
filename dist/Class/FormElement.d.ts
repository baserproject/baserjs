import BaserElement = require('./BaserElement');
import IFormElement = require('../Interface/IFormElement');
import FormElementOption = require('../Interface/FormElementOption');
/**
 * フォーム要素の抽象クラス
 *
 * @version 0.1.0
 * @since 0.0.1
 *
 */
declare class FormElement extends BaserElement implements IFormElement {
    /**
     * オプションのデフォルト値
     *
     * @version 0.0.5
     * @since 0.0.1
     *
     */
    static defaultOption: FormElementOption;
    /**
     * FormElement関連の要素の共通のクラス
     *
     * @version 0.1.0
     * @since 0.1.0
     *
     */
    static classNameFormElementCommon: string;
    /**
     * FormElement関連のラッパー要素の共通のクラス
     *
     * @version 0.1.0
     * @since 0.1.0
     *
     */
    static classNameWrapper: string;
    /**
     * FormElement関連のラベル要素の共通のクラス
     *
     * @version 0.1.0
     * @since 0.1.0
     *
     */
    static classNameLabel: string;
    /**
     * FormElement関連の要素のフォーカス時に付加されるクラス
     *
     * @version 0.1.0
     * @since 0.1.0
     *
     */
    static classNameStateFocus: string;
    /**
     * FormElement関連の要素のフォーカスがはずれた時に付加されるクラス
     *
     * @version 0.1.0
     * @since 0.1.0
     *
     */
    static classNameStateBlur: string;
    /**
     * FormElement関連の要素の無効状態の時に付加されるクラス
     *
     * @version 0.4.0
     * @since 0.4.0
     *
     */
    static classNameStateDisabled: string;
    /**
     * フォーム関連要素リスト
     *
     * @version 0.7.0
     * @since 0.7.0
     *
     */
    static elements: FormElement[];
    /**
     * ラベルのテキスト
     *
     * @since 0.0.1
     *
     */
    label: string;
    /**
     * 前にあるラベルのテキスト
     *
     * @since 0.4.0
     *
     */
    labelBeforeText: string;
    /**
     * 後ろにあるラベルのテキスト
     *
     * @since 0.4.0
     *
     */
    labelAfterText: string;
    /**
     * フォーカスがあたっている状態かどうか
     *
     * @since 0.1.0
     *
     */
    hasFocus: boolean;
    /**
     * 無効状態
     *
     * @since 0.4.0
     *
     */
    disabled: boolean;
    /**
     * 初期の値
     *
     * @since 0.4.0
     *
     */
    defaultValue: string;
    /**
     * ラベル要素にラップされているかどうか
     *
     * @since 0.0.4
     *
     */
    isWrappedByLabel: boolean;
    /**
     * for属性に基づくラベル要素に属しているかどうか
     *
     * @since 0.5.1
     *
     */
    hasLabelByForAttr: boolean;
    /**
     * ラベル要素のjQueryオブジェクト
     *
     * @since 0.0.1
     *
     */
    $label: JQuery;
    /**
     * ラッパー要素のjQueryオブジェクト
     *
     * @since 0.0.4
     *
     */
    $wrapper: JQuery;
    /**
     * オプション情報
     *
     * @since 0.4.1
     *
     */
    protected _config: FormElementOption;
    /**
     * コンストラクタ
     *
     * @version 0.8.0
     * @since 0.0.1
     * @param $el 管理するDOM要素のjQueryオブジェクト
     * @param options オプション
     *
     */
    constructor($el: JQuery, options: FormElementOption);
    /**
     * クラス名を設定する
     *
     * @version 0.4.0
     * @since 0.4.0
     *
     */
    protected _setClassName(): void;
    /**
     * ラベル要素内のテキストを取得する
     *
     * @version 0.4.1
     * @since 0.4.0
     *
     */
    private _setLabelText();
    /**
     * ラベル要素を割り当てる
     *
     * @version 0.5.1
     * @since 0.4.0
     *
     */
    private _asignLabel();
    /**
     * ラップ要素を生成
     *
     * @version 0.5.1
     * @since 0.4.0
     *
     */
    protected _createWrapper(): void;
    /**
     * 擬似要素を生成する
     *
     * @version 0.4.1
     * @since 0.4.0
     *
     */
    protected _createPsuedoElements(): void;
    /**
     * イベントの登録
     *
     * @version 0.4.1
     * @since 0.4.0
     *
     */
    protected _bindEvents(): void;
    /**
     * 他のオブジェクトにchangeイベントを発火・伝達せずに実行されるチェンジ処理
     *
     * @version 0.4.0
     * @since 0.4.0
     *
     */
    protected _onSilentChange(): void;
    /**
     * フォーカスがあたった時の処理
     *
     * @version 0.1.0
     * @since 0.0.1
     *
     */
    protected _onfocus(): void;
    /**
     * フォーカスがはずれた時の処理
     *
     * @version 0.1.0
     * @since 0.0.1
     *
     */
    protected _onblur(): void;
    /**
     * changeイベントを発火する
     *
     * @version 0.4.0
     * @since 0.4.0
     *
     */
    protected _fireChangeEvent(isSilent?: boolean): void;
    /**
     * 値を設定する
     *
     * @version 0.4.1
     * @since 0.4.0
     *
     */
    setValue(value: string | number | boolean, isSilent?: boolean): void;
    /**
     * 無効状態を設定する
     *
     * @version 0.4.0
     * @since 0.4.0
     *
     */
    setDisabled(isDisabled: boolean): void;
}
export = FormElement;

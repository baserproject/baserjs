import FormElement = require('./FormElement');
import ISelect = require('../Interface/ISelect');
import SelectOption = require('../Interface/SelectOption');
/**
 * セレクトボックスの拡張クラス
 *
 * @version 0.1.0
 * @since 0.0.1
 *
 */
declare class Select extends FormElement implements ISelect {
    /**
     * オプションのデフォルト値
     *
     * @version 0.4.0
     * @since 0.4.0
     *
     */
    static defaultOption: SelectOption;
    /**
     * Select要素のクラス
     *
     * @version 0.1.0
     * @since 0.1.0
     *
     */
    static classNameSelect: string;
    /**
     * Select要素の擬似要素のクラス
     *
     * @version 0.1.0
     * @since 0.1.0
     *
     */
    static classNamePseudoSelect: string;
    /**
     * Select要素の選択した値を表示する擬似要素のクラス
     *
     * @version 0.1.0
     * @since 0.1.0
     *
     */
    static classNamePseudoSelectedDisplay: string;
    /**
     * Select要素のoption要素をのクラス
     *
     * @version 0.1.0
     * @since 0.1.0
     *
     */
    static classNameSelectOptionList: string;
    /**
     * Select要素のoption要素のクラス
     *
     * @version 0.1.0
     * @since 0.1.0
     *
     */
    static classNameSelectOption: string;
    /**
     * iOSの場合に付加されるクラス
     *
     * @version 0.1.0
     * @since 0.1.0
     *
     */
    static classNameOsIOs: string;
    /**
     * Androidの場合に付加されるクラス
     *
     * @version 0.1.0
     * @since 0.1.0
     *
     */
    static classNameOsAndroid: string;
    /**
     * ブラウザデフォルトの選択リストを使用する場合に付加されるクラス
     *
     * @version 0.4.0
     * @since 0.4.0
     *
     */
    static classNameUseDefaultOptionList: string;
    /**
     * Select要素の擬似option要素の選択時に付加されるクラス
     *
     * @version 0.1.0
     * @since 0.1.0
     *
     */
    static classNameStateSelected: string;
    /**
     * Select要素の擬似option要素の選択がはずれた時に付加されるクラス
     *
     * @version 0.1.0
     * @since 0.1.0
     *
     */
    static classNameStateUnselected: string;
    /**
     * 初期の選択されているオプションのインデックス番号
     *
     * @since 0.4.0
     *
     */
    defaultSelectedIndex: number;
    /**
     * 選択されたオプションを表示する表示領域のjQueryオブジェクト
     *
     * @since 0.0.1
     *
     */
    $selected: JQuery;
    /**
     * デザイン適応要の擬似要素のjQueryオブジェクト
     *
     * @since 0.0.1
     *
     */
    $pseudo: JQuery;
    /**
     * オプション要素の擬似要素のjQueryコレクション
     *
     * @since 0.0.1
     *
     */
    $options: JQuery;
    /**
     * オプション情報
     *
     * @since 0.4.1
     *
     */
    protected _config: SelectOption;
    /**
     * 現在選択されているインデックス
     *
     * @since 0.4.1
     *
     */
    private _currentIndex;
    /**
     * コンストラクタ
     *
     * @version 0.8.0
     * @since 0.0.1
     * @param $el 管理するDOM要素のjQueryオブジェクト
     * @param options オプション
     *
     */
    constructor($el: JQuery, options: SelectOption);
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
     * 擬似セレクトボックス要素を生成する
     *
     * @version 0.4.1
     * @since 0.4.0
     * @override
     *
     */
    protected _createPsuedoElements(): void;
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
     * 他のオブジェクトにchangeイベントを発火・伝達せずに実行されるチェンジ処理
     *
     * @version 0.4.0
     * @since 0.4.0
     *
     */
    protected _onSilentChange(): void;
    /**
     * スクロール位置を調整する
     *
     * @version 0.1.0
     * @since 0.1.0
     *
     */
    private _scrollToSelectedPosition();
    /**
     * 擬似要素にフォーカスがあったった時のイベントと伝達を制御する
     *
     * @version 0.4.0
     * @since 0.0.1
     *
     */
    private _psuedoFocusEvent();
    /**
     * フォーカス時のキーボードイベント
     *
     * @version 0.4.0
     * @since 0.4.0
     *
     * TODO: KeyCodeの数値をマジックナンバーにせずに定数から参照するようにする
     *
     */
    private _bindKeybordEvent();
    /**
     * フォーカスがあたった時の処理
     *
     * @version 0.4.1
     * @since 0.0.1
     * @override
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
     * 要素の状態を更新する
     *
     * @version 0.8.0
     * @since 0.0.1
     *
     */
    update(): Select;
    /**
     * 要素の状態を更新する
     *
     * @version 0.8.0
     * @since 0.0.1
     *
     */
    private _update();
    /**
     * 値を設定する
     *
     * @version 0.4.0
     * @since 0.4.0
     * @override
     *
     */
    setValue(value: string | number | boolean): void;
    /**
     * 値をインデックス番号から設定する
     *
     * @version 0.8.0
     * @since 0.4.0
     *
     */
    setIndex(index: number, isSilent?: boolean): void;
    /**
     * 現在の選択中のインデックス番号を取得する
     *
     * @version 0.4.0
     * @since 0.4.0
     *
     */
    getIndex(): number;
    /**
     * 次の項目を選択する
     *
     * @version 0.4.0
     * @since 0.4.0
     *
     */
    next(isSilent: boolean): void;
    /**
     * 前の項目を選択する
     *
     * @version 0.4.0
     * @since 0.4.0
     *
     */
    prev(isSilent: boolean): void;
    /**
     * 無効状態を設定する
     *
     * @version 0.4.1
     * @since 0.4.1
     * @override
     *
     */
    setDisabled(isDisabled: boolean): void;
}
export = Select;

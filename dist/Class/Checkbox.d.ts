import CheckableElement = require('./CheckableElement');
import ICheckbox = require('../Interface/ICheckbox');
import CheckableElementOption = require('../Interface/CheckableElementOption');
/**
 * チェックボックスの拡張クラス
 *
 * @version 0.1.0
 * @since 0.0.1
 *
 */
declare class Checkbox extends CheckableElement implements ICheckbox {
    /**
     * Checkbox要素のクラス
     *
     * @version 0.1.0
     * @since 0.1.0
     *
     */
    static classNameCheckbox: string;
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
}
export = Checkbox;

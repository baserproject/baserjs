import CheckableElement = require('./CheckableElement');
import IRadio = require('../Interface/IRadio');
import CheckableElementOption = require('../Interface/CheckableElementOption');
/**
 * ラジオボタンの拡張クラス
 *
 * @version 0.1.0
 * @since 0.0.1
 *
 */
declare class Radio extends CheckableElement implements IRadio {
    /**
     * Radio要素のクラス
     *
     * @version 0.1.0
     * @since 0.1.0
     *
     */
    static classNameRadio: string;
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
     * チェンジイベントのハンドラ
     *
     * @version 0.7.0
     * @since 0.0.1
     *
     */
    _onchenge(): void;
}
export = Radio;

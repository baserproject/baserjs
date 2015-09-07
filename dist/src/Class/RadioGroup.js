/**
 * ラジオボタンのname属性値で紐付いたブループを管理するクラス
 *
 * @since 0.9.0
 *
 */
var RadioGroup = (function () {
    /**
     * コンストラクタ
     *
     * @since 0.0.1
     * @param name 紐づくname属性値
     *
     */
    function RadioGroup(name) {
        /**
         * ラジオボタンのリスト
         *
         * @version 0.9.0
         * @since 0.0.1
         *
         */
        this._radioButtons = [];
        this.name = name;
    }
    /**
     * 紐づくラジオボタンを追加する
     *
     * @version 0.9.0
     * @since 0.0.1
     * @param radio 拡張ラジオボタン
     *
     */
    RadioGroup.prototype.add = function (radio) {
        for (var _i = 0, _a = this._radioButtons; _i < _a.length; _i++) {
            var radioButton = _a[_i];
            if (radioButton === radio) {
                return;
            }
        }
        this._radioButtons.push(radio);
    };
    /**
     * 管理するラジオボタンの状態を更新する
     *
     * @version 0.9.0
     * @since 0.0.1
     * @param ignoreRadio 対象外のラジオボタン
     *
     */
    RadioGroup.prototype.update = function (ignoreRadio) {
        for (var _i = 0, _a = this._radioButtons; _i < _a.length; _i++) {
            var radioButton = _a[_i];
            if (radioButton !== ignoreRadio) {
                radioButton.update();
            }
        }
    };
    /**
     * ラジオボタンのグループを保管するオブジェクト
     *
     * @version 0.9.0
     * @since 0.7.0
     *
     */
    RadioGroup.groups = {};
    return RadioGroup;
})();
module.exports = RadioGroup;

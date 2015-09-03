/**
 * ラジオボタンのname属性値で紐付いたブループを管理するクラス
 *
 * @since 0.0.1
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
         * @since 0.0.1
         *
         */
        this.radioButtons = [];
        this.name = name;
    }
    /**
     * 紐づくラジオボタンを追加する
     *
     * @version 0.0.1
     * @since 0.0.1
     * @param radio 拡張ラジオボタン
     *
     */
    RadioGroup.prototype.add = function (radio) {
        var i = 0;
        var l = this.radioButtons.length;
        for (; i < l; i++) {
            if (this.radioButtons[i] === radio) {
                return;
            }
        }
        this.radioButtons.push(radio);
    };
    /**
     * 管理するラジオボタンの状態を更新する
     *
     * @version 0.0.1
     * @since 0.0.1
     * @param ignoreRadio 対象外のラジオボタン
     *
     */
    RadioGroup.prototype.update = function (ignoreRadio) {
        var i = 0;
        var l = this.radioButtons.length;
        for (; i < l; i++) {
            if (this.radioButtons[i] !== ignoreRadio) {
                this.radioButtons[i].update();
            }
        }
    };
    /**
     * ラジオボタンのグループを保管するオブジェクト
     *
     * @since 0.7.0
     *
     */
    RadioGroup.groups = {};
    return RadioGroup;
})();
module.exports = RadioGroup;

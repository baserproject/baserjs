var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var UtilString = require('./UtilString');
var EventDispatcher = require('./EventDispatcher');
var Browser = require('./Browser');
var BreakPoints = require('./BreakPoints');
var BaserElement = require('./BaserElement');
/**
 * 高さ揃えをするボックスを管理するクラス
 *
 * @version 0.9.0
 * @since 0.7.0
 *
 */
var AlignedBoxes = (function (_super) {
    __extends(AlignedBoxes, _super);
    /**
     * コンストラクタ
     *
     * use: jQuery
     *
     * @version 0.9.0
     * @since 0.7.0
     * @param $el 対象のボックス要素
     * @param column カラム数もしくはブレークポイントに寄るカラム数 `0`の場合すべての要素の高さを揃える
     * @param callback ボックスの高さ揃えるときのコールバック
     */
    function AlignedBoxes($el, column, callback) {
        var _this = this;
        if (column === void 0) { column = 0; }
        _super.call(this);
        this.$el = $el;
        AlignedBoxes.boot();
        var uid = this.$el.data(AlignedBoxes.DATA_KEY_ID);
        if (uid) {
            this.destroy();
        }
        uid = UtilString.UID();
        this.$el.data(AlignedBoxes.DATA_KEY_ID, uid);
        this.$el.data(AlignedBoxes.DATA_KEY, this);
        AlignedBoxes.groups[uid] = this;
        var columnInfo;
        if (typeof column === 'number') {
            columnInfo = {
                Infinity: column
            };
        }
        else {
            columnInfo = column;
        }
        this._columns = new BreakPoints(columnInfo, function (column, breakPoint, windowWidth) {
            _this._currentColumn = column;
            _this._align();
        });
        this._callback = callback;
        this._align();
        this.on('realign', function () {
            _this._align();
        });
    }
    /**
     * 基準の文字要素を生成する
     *
     * use: jQuery
     *
     * @version 0.9.0
     * @since 0.7.0
     *
     */
    AlignedBoxes.createChar = function () {
        var $dummyChar = $('<del>M</del>').css({
            display: 'block',
            visibility: 'hidden',
            position: 'absolute',
            padding: 0,
            top: 0,
            zIndex: -1
        });
        $dummyChar.appendTo('body');
        AlignedBoxes.dummyCharElement = $dummyChar[0];
        AlignedBoxes.currentFontSize = AlignedBoxes.dummyCharElement.offsetHeight;
    };
    /**
     * 文字の大きさが変わったかどうか
     *
     * TODO: 破壊的変更を加えていて単純な評価関数ではない
     *
     * @version 0.7.0
     * @since 0.7.0
     * @return 文字の大きさが変わったかどうか
     *
     */
    AlignedBoxes.isChanged = function () {
        if (AlignedBoxes.currentFontSize === AlignedBoxes.dummyCharElement.offsetHeight) {
            return false;
        }
        AlignedBoxes.currentFontSize = AlignedBoxes.dummyCharElement.offsetHeight;
        return true;
    };
    /**
     * 文字の大きさが変わったかどうかを監視するルーチン
     *
     * 文字の大きさが変わればボックスのサイズを再設定する
     *
     * @version 0.7.0
     * @since 0.7.0
     *
     */
    AlignedBoxes.observerForFontSize = function () {
        if (AlignedBoxes.isChanged()) {
            AlignedBoxes.reAlign();
        }
        return;
    };
    /**
     * ボックスのサイズを再設定する
     *
     * @version 0.9.0
     * @since 0.7.0
     *
     */
    AlignedBoxes.reAlign = function () {
        for (var uid in AlignedBoxes.groups) {
            AlignedBoxes.groups[uid].trigger('realign');
        }
        return;
    };
    /**
     * 監視タイマーを起動する
     *
     * use: jQuery
     *
     * @version 0.9.0
     * @since 0.7.0
     *
     */
    AlignedBoxes.boot = function () {
        if (!AlignedBoxes.isBooted) {
            $(window).on('load', AlignedBoxes.reAlign);
            Browser.browser.on('resizeend', AlignedBoxes.reAlign);
            AlignedBoxes.isBooted = true;
            AlignedBoxes.createChar();
            // TODO: タイマーによる監視をオプションでオフにできるようにする
            AlignedBoxes.watchTimer = setInterval(AlignedBoxes.observerForFontSize, AlignedBoxes.watchInterval);
        }
    };
    /**
     * ボックスの高さ揃える
     *
     * use: jQuery
     *
     * @version 0.9.0
     * @since 0.8.1
     *
     */
    AlignedBoxes.prototype._align = function () {
        var _this = this;
        var $box_array = [];
        var maxHeight = 0;
        var lastIndex = this.$el.length - 1;
        this.$el.each(function (i, elem) {
            var $box = $(elem);
            // 要素の高さを強制に無効にする
            BaserElement.removeCSSPropertyFromDOMElement('height', elem);
            // column が 0 だと最初の要素の意味
            var column = i % _this._currentColumn;
            if (column === 0) {
                // 配列をリセットする
                $box_array = [];
            }
            // 配列に追加
            $box_array[column] = $box;
            // 現在の高さと最大の高さを比べて最大の高さを更新
            // column が 0 ならばリセットさせるので最大の高さもリセット
            var currentHeight = $box.height();
            if (column === 0 || currentHeight > maxHeight) {
                maxHeight = currentHeight;
            }
            if (i === lastIndex || column === _this._currentColumn - 1) {
                for (var _i = 0; _i < $box_array.length; _i++) {
                    var $box_1 = $box_array[_i];
                    if ($box_1) {
                        var cancel = void 0;
                        // コールバックを実行
                        if (_this._callback) {
                            cancel = !_this._callback(maxHeight, currentHeight, _this);
                        }
                        // コールバックの戻り値がfalseでなければ高さを変更
                        if (!cancel) {
                            $box_1.height(maxHeight);
                        }
                    }
                }
            }
        });
    };
    /**
     * 高さ揃えを解除する
     *
     * use: jQuery
     *
     * @version 0.9.0
     * @since 0.7.0
     *
     */
    AlignedBoxes.prototype.destroy = function () {
        this.$el.each(function (i, elem) {
            var $this = $(elem);
            var uid = $this.data(AlignedBoxes.DATA_KEY_ID);
            $this.removeData(AlignedBoxes.DATA_KEY_ID);
            if (uid in AlignedBoxes.groups) {
                delete AlignedBoxes.groups[uid];
            }
        });
    };
    /**
     * jQuery dataに自信のインスタンスを登録するキー
     *
     * @version 0.7.0
     * @since 0.7.0
     *
     */
    AlignedBoxes.DATA_KEY = 'bc-box';
    /**
     * jQuery dataにUIDを登録するキー
     *
     * @version 0.7.0
     * @since 0.7.0
     *
     */
    AlignedBoxes.DATA_KEY_ID = AlignedBoxes.DATA_KEY + '-id';
    /**
     * 監視の間隔
     *
     * @version 0.7.0
     * @since 0.7.0
     *
     */
    AlignedBoxes.watchInterval = 1000;
    /**
     * 監視タイマーが起動しているかどうか
     *
     * @version 0.7.0
     * @since 0.7.0
     *
     */
    AlignedBoxes.isBooted = false;
    /**
     * 監視対象のボックスグループ
     *
     * @version 0.7.0
     * @since 0.7.0
     *
     */
    AlignedBoxes.groups = {};
    return AlignedBoxes;
})(EventDispatcher);
module.exports = AlignedBoxes;

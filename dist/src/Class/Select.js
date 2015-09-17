var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaserElement = require('./BaserElement');
var FormElement = require('./FormElement');
var Browser = require('./Browser');
/**
 * セレクトボックスの拡張クラス
 *
 * @version 0.9.0
 * @since 0.0.1
 *
 */
var Select = (function (_super) {
    __extends(Select, _super);
    /**
     * コンストラクタ
     *
     * use: jQuery
     *
     * @version 0.9.0
     * @since 0.0.1
     * @param el 管理するDOM要素
     * @param options オプション
     *
     */
    function Select(el, options) {
        _super.call(this, el, $.extend({}, Select.defaultOption, options));
        // 既にエレメント化されていた場合は何もしない
        if (this._elementized) {
            return;
        }
        // IE6・7は反映させない
        if (!el.querySelector) {
            return;
        }
        this._update();
    }
    /**
     * クラス名を設定する
     *
     * @version 0.4.0
     * @since 0.4.0
     * @override
     *
     */
    Select.prototype._setClassName = function () {
        _super.prototype._setClassName.call(this);
        // セレクトボックス用のクラス名を設定
        this.addClass(Select.classNameSelect);
    };
    /**
     * ラップ要素を生成
     *
     * use: jQuery
     *
     * @version 0.9.0
     * @since 0.4.0
     * @override
     *
     */
    Select.prototype._createWrapper = function () {
        _super.prototype._createWrapper.call(this);
        BaserElement.addClassTo(this.$wrapper, Select.classNameSelect + "-" + FormElement.classNameWrapper);
    };
    /**
     * 擬似セレクトボックス要素を生成する
     *
     * use: jQuery
     *
     * @version 0.9.0
     * @since 0.4.0
     * @override
     *
     */
    Select.prototype._createPsuedoElements = function () {
        var _this = this;
        this.$pseudo = $('<a />');
        this.$pseudo.attr('href', '#'); // href属性がないとフォーカスを当てることができない
        this.$pseudo.insertAfter(this.$el);
        BaserElement.addClassTo(this.$pseudo, FormElement.classNameFormElementCommon);
        BaserElement.addClassTo(this.$pseudo, Select.classNamePseudoSelect);
        this.$selected = $('<span />');
        this.$selected.appendTo(this.$pseudo);
        BaserElement.addClassTo(this.$selected, FormElement.classNameFormElementCommon);
        BaserElement.addClassTo(this.$selected, Select.classNamePseudoSelect, Select.classNamePseudoSelectedDisplay);
        if (!this._config.useDefaultOptionList) {
            this.$options = $('<ul />');
            this.$options.appendTo(this.$pseudo);
            BaserElement.addClassTo(this.$options, FormElement.classNameFormElementCommon);
            BaserElement.addClassTo(this.$options, Select.classNamePseudoSelect, Select.classNameSelectOptionList);
            this.$el.find('option').each(function (i, opt) {
                var $opt = $(opt);
                var value = $opt.val();
                var text = $opt.text();
                var $psuedoOpt = $('<li />');
                $psuedoOpt.appendTo(_this.$options);
                $psuedoOpt.data('value', value);
                $psuedoOpt.text(text);
                BaserElement.addClassTo($psuedoOpt, FormElement.classNameFormElementCommon);
                BaserElement.addClassTo($psuedoOpt, Select.classNameSelectOptionList, Select.classNameSelectOption);
            });
        }
        if (Browser.spec.isTouchable) {
            if (Browser.spec.ua.iPhone || Browser.spec.ua.iPod) {
                this.addClass(Select.classNameOsIOs);
                BaserElement.addClassTo(this.$wrapper, Select.classNameOsIOs);
                BaserElement.addClassTo(this.$label, Select.classNameOsIOs);
            }
            else if (Browser.spec.ua.android) {
                this.addClass(Select.classNameOsAndroid);
                BaserElement.addClassTo(this.$wrapper, Select.classNameOsAndroid);
                BaserElement.addClassTo(this.$label, Select.classNameOsAndroid);
            }
        }
        if (this._config.useDefaultOptionList) {
            this.addClass(Select.classNameUseDefaultOptionList);
            BaserElement.addClassTo(this.$wrapper, Select.classNameUseDefaultOptionList);
            BaserElement.addClassTo(this.$label, Select.classNameUseDefaultOptionList);
        }
    };
    /**
     * イベントの登録
     *
     * use: jQuery
     *
     * @version 0.9.0
     * @since 0.4.0
     * @override
     *
     */
    Select.prototype._bindEvents = function () {
        var _this = this;
        _super.prototype._bindEvents.call(this);
        // changeイベントが起こった場合に実行するルーチン
        this.$el.on('change.bcSelect', function () {
            _this._update();
        });
        // 擬似option要素を選択した時に実行する
        this.$pseudo.on('click.bcSelect', 'li', function (e) {
            var $li = $(e.target);
            var index = $li.index();
            _this._onblur();
            _this.setIndex(index);
            e.stopPropagation();
            e.preventDefault();
        });
        this.$pseudo.on('click.bcSelect', function (e) {
            e.preventDefault();
        });
        if (!this._config.useDefaultOptionList) {
            this._psuedoFocusEvent();
        }
        else {
            // href属性を削除することでフォーカスがあたらなくなる
            this.$pseudo.removeAttr('href');
        }
    };
    /**
     * 他のオブジェクトにchangeイベントを発火・伝達せずに実行されるチェンジ処理
     *
     * @version 0.4.0
     * @since 0.4.0
     *
     */
    Select.prototype._onSilentChange = function () {
        this._update();
    };
    /**
     * スクロール位置を調整する
     *
     * use: jQuery
     *
     * @version 0.9.0
     * @since 0.1.0
     *
     */
    Select.prototype._scrollToSelectedPosition = function () {
        if (this.$options) {
            var $selectedPsuedoOpt;
            var $psuedoOptList = this.$options.find('li');
            this.$el.find('option').each(function (i, opt) {
                var $opt = $(opt);
                var isSelected = $opt.prop('selected');
                if (isSelected) {
                    $selectedPsuedoOpt = $psuedoOptList.eq(i);
                }
            });
            // ポジションを正しく取得するために一度スクロール位置をリセットする
            this.$options.scrollTop(0);
            var optPos = $selectedPsuedoOpt.offset();
            var cntPos = this.$options.offset();
            if (optPos && cntPos) {
                this.$options.scrollTop(optPos.top - cntPos.top);
            }
        }
    };
    /**
     * 擬似要素にフォーカスがあったった時のイベントと伝達を制御する
     *
     * use: jQuery
     *
     * @version 0.4.0
     * @since 0.0.1
     *
     */
    Select.prototype._psuedoFocusEvent = function () {
        var _this = this;
        this.$el.off('focus.bcFormElement');
        this.$el.off('blur.bcFormElement');
        // セレクトボックス本体にフォーカスがあたったら、
        // 擬似要素のほうへフォーカスを即座に移動させる
        this.$el.on('focus.bcSelect', function (e) {
            if (!_this.disabled) {
                _this.$pseudo.focus();
            }
            e.stopPropagation();
            e.preventDefault();
        });
        // ドキュメントのどこかをフォーカスorクリックしたらフォーカスがはずれる
        // ※_onfocus()からも呼び出される
        $(document).on('click.bcSelect', function (e) {
            _this._onblur();
        });
        // documentへ伝達するフォーカスは focusin イベント
        $(document).on('focusin', function (e) {
            _this._onblur();
        });
        // 擬似セレクトボックスにフォーカスorクリックが起こった時に発火する
        this.$pseudo
            .on('focus.bcSelect', function (e) {
            if (!_this.disabled) {
                _this._onfocus();
            }
            else {
                _this.$pseudo.blur();
            }
            // ドキュメントに伝達しない
            e.stopPropagation();
        })
            .on('click.bcSelect', function (e) {
            if (!_this.disabled) {
                _this._onfocus();
            }
            // ドキュメントに伝達しない
            e.stopPropagation();
            // href="#"なのでデフォルトイベントを抑制
            e.preventDefault();
        });
        // ドキュメントへのフォーカスorクリック伝達を抑制
        this.$label.on('click.bcSelect focus.bcSelect', function (e) {
            // ドキュメントに伝達しない
            e.stopPropagation();
        });
        this._bindKeybordEvent();
    };
    /**
     * フォーカス時のキーボードイベント
     *
     * use: jQuery
     *
     * TODO: KeyCodeの数値をマジックナンバーにせずに定数から参照するようにする
     *
     * @version 0.4.0
     * @since 0.4.0
     *
     */
    Select.prototype._bindKeybordEvent = function () {
        var _this = this;
        $(document).on('keydown', function (e) {
            if (_this.hasFocus) {
                switch (e.keyCode) {
                    // keyUp
                    case 38: {
                        _this.prev(true);
                        _this._scrollToSelectedPosition();
                        e.preventDefault();
                        break;
                    }
                    // keyDown
                    case 40: {
                        _this.next(true);
                        _this._scrollToSelectedPosition();
                        e.preventDefault();
                        break;
                    }
                    // Return (Enter)
                    case 13: {
                        if (_this._currentIndex !== _this.getIndex()) {
                            _this._fireChangeEvent();
                        }
                        _this._onblur();
                        e.preventDefault();
                        break;
                    }
                }
            }
        });
    };
    /**
     * フォーカスがあたった時の処理
     *
     * use: jQuery
     *
     * @version 0.4.1
     * @since 0.0.1
     * @override
     *
     */
    Select.prototype._onfocus = function () {
        if (!this.hasFocus) {
            // 全体のフォーカスを外す
            $(document).triggerHandler('click.bcSelect');
            // 親クラスのフォーカスを実行
            _super.prototype._onfocus.call(this);
            // DOMのclassを制御
            BaserElement.addClassTo(this.$pseudo, Select.classNamePseudoSelect, '', FormElement.classNameStateFocus);
            BaserElement.removeClassFrom(this.$pseudo, Select.classNamePseudoSelect, '', FormElement.classNameStateBlur);
            // スクロール位置を調整する
            this._scrollToSelectedPosition();
            // 一覧を開いた時のインデックス番号を記録する
            this._currentIndex = this.getIndex();
        }
    };
    /**
     * フォーカスがはずれた時の処理
     *
     * use: jQuery
     *
     * @version 0.1.0
     * @since 0.0.1
     *
     */
    Select.prototype._onblur = function () {
        // 一旦 コンストラクタのsuper()の中で_onblur()が$pseudoプロパティを作成する前に呼び出されるため
        if (this.$pseudo) {
            _super.prototype._onblur.call(this);
            BaserElement.addClassTo(this.$pseudo, Select.classNamePseudoSelect, '', FormElement.classNameStateBlur);
            BaserElement.removeClassFrom(this.$pseudo, Select.classNamePseudoSelect, '', FormElement.classNameStateFocus);
        }
    };
    /**
     * 要素の状態を更新する
     *
     * @version 0.8.0
     * @since 0.0.1
     * @return インスタンス自身
     *
     */
    Select.prototype.update = function () {
        this._update();
        return this;
    };
    /**
     * 要素の状態を更新する
     *
     * use: jQuery
     *
     * @version 0.9.0
     * @since 0.0.1
     *
     */
    Select.prototype._update = function () {
        var _this = this;
        var $selectedOption = this.$el.find(':selected');
        var $psuedoOptList;
        if (this.$options) {
            $psuedoOptList = this.$options.find('li');
        }
        this.$el.find('option').each(function (i, opt) {
            var $opt = $(opt);
            var isSelected = $opt.prop('selected');
            if (isSelected) {
                _this.$selected.text($opt.text());
            }
            if (_this.$options) {
                var isDisabled = $opt.prop('disabled');
                var $psuedoOpt = $psuedoOptList.eq(i);
                $psuedoOpt.attr('aria-selected', '' + isSelected);
                $psuedoOpt.attr('aria-disabled', '' + isDisabled);
                if (isSelected) {
                    BaserElement.addClassTo($psuedoOpt, Select.classNameSelectOptionList, Select.classNameSelectOption, Select.classNameStateSelected);
                    BaserElement.removeClassFrom($psuedoOpt, Select.classNameSelectOptionList, Select.classNameSelectOption, Select.classNameStateUnselected);
                }
                else {
                    BaserElement.addClassTo($psuedoOpt, Select.classNameSelectOptionList, Select.classNameSelectOption, Select.classNameStateUnselected);
                    BaserElement.removeClassFrom($psuedoOpt, Select.classNameSelectOptionList, Select.classNameSelectOption, Select.classNameStateSelected);
                }
                if (isDisabled) {
                    BaserElement.addClassTo($psuedoOpt, Select.classNameSelectOptionList, Select.classNameSelectOption, Select.classNameStateDisabled);
                }
                else {
                    BaserElement.removeClassFrom($psuedoOpt, Select.classNameSelectOptionList, Select.classNameSelectOption, Select.classNameStateDisabled);
                }
            }
        });
    };
    /**
     * 値を設定する
     *
     * use: jQuery
     *
     * @version 0.9.0
     * @since 0.4.0
     * @override
     * @param value 設定したい値
     *
     */
    Select.prototype.setValue = function (value) {
        var valueString = '' + value;
        var $targetOption = this.$el.find("option[value=\"" + valueString + "\"]");
        if ($targetOption.length && !$targetOption.prop('selected')) {
            $targetOption.prop('selected', true);
            this._fireChangeEvent();
        }
    };
    /**
     * インデックス番号から選択する
     *
     * use: jQuery
     *
     * @version 0.9.0
     * @since 0.4.0
     * @param index 対象のインデックス番号
     * @param isSilent イベントを伝達しない
     *
     */
    Select.prototype.setIndex = function (index, isSilent) {
        if (isSilent === void 0) { isSilent = false; }
        var $targetOption = this.$el.find('option').eq(index);
        if ($targetOption.length && !$targetOption.prop('selected') && !$targetOption.prop('disabled')) {
            $targetOption.prop('selected', true);
            this._fireChangeEvent(isSilent);
        }
    };
    /**
     * 現在の選択中のインデックス番号を取得する
     *
     * use: jQuery
     *
     * @version 0.9.0
     * @since 0.4.0
     * @return インデックス番号
     *
     */
    Select.prototype.getIndex = function () {
        var currentIndex = 0;
        this.$el.find('option').each(function (i, el) {
            var $opt = $(el);
            if ($opt.prop('selected')) {
                currentIndex = $opt.index();
            }
        });
        return currentIndex;
    };
    /**
     * 次の項目を選択する
     *
     * @version 0.9.0
     * @since 0.4.0
     * @param isSilent イベントを伝達しない
     *
     */
    Select.prototype.next = function (isSilent) {
        var currentIndex = this.getIndex();
        var max = this.$el.find('option').length;
        var nextIndex = currentIndex + 1;
        this.setIndex(Math.min(nextIndex, max), isSilent);
    };
    /**
     * 前の項目を選択する
     *
     * @version 0.9.0
     * @since 0.4.0
     * @param isSilent イベントを伝達しない
     *
     */
    Select.prototype.prev = function (isSilent) {
        var currentIndex = this.getIndex();
        var prevIndex = currentIndex - 1;
        this.setIndex(Math.max(prevIndex, 0), isSilent);
    };
    /**
     * 無効状態を設定する
     *
     * use: jQuery
     *
     * @version 0.9.0
     * @since 0.4.1
     * @override
     *
     */
    Select.prototype.setDisabled = function (isDisabled) {
        _super.prototype.setDisabled.call(this, isDisabled);
        if (this.disabled) {
            this.$pseudo.attr('tabindex', -1);
        }
        else {
            this.$pseudo.removeAttr('tabindex');
        }
    };
    /**
     * オプションのデフォルト値
     *
     * @version 0.4.0
     * @since 0.4.0
     *
     */
    Select.defaultOption = {
        useDefaultOptionList: Browser.spec.isTouchable && Browser.spec.ua.iPhone || Browser.spec.ua.iPod || Browser.spec.ua.android
    };
    /**
     * Select要素のクラス
     *
     * @version 0.1.0
     * @since 0.1.0
     *
     */
    Select.classNameSelect = 'form-select';
    /**
     * Select要素の擬似要素のクラス
     *
     * @version 0.1.0
     * @since 0.1.0
     *
     */
    Select.classNamePseudoSelect = 'pseudo-select';
    /**
     * Select要素の選択した値を表示する擬似要素のクラス
     *
     * @version 0.1.0
     * @since 0.1.0
     *
     */
    Select.classNamePseudoSelectedDisplay = 'selected-display';
    /**
     * Select要素のoption要素をのクラス
     *
     * @version 0.1.0
     * @since 0.1.0
     *
     */
    Select.classNameSelectOptionList = 'option-list';
    /**
     * Select要素のoption要素のクラス
     *
     * @version 0.1.0
     * @since 0.1.0
     *
     */
    Select.classNameSelectOption = 'item';
    /**
     * iOSの場合に付加されるクラス
     *
     * @version 0.1.0
     * @since 0.1.0
     *
     */
    Select.classNameOsIOs = 'os-i-os';
    /**
     * Androidの場合に付加されるクラス
     *
     * @version 0.1.0
     * @since 0.1.0
     *
     */
    Select.classNameOsAndroid = 'os-android';
    /**
     * ブラウザデフォルトの選択リストを使用する場合に付加されるクラス
     *
     * @version 0.4.0
     * @since 0.4.0
     *
     */
    Select.classNameUseDefaultOptionList = 'use-default-option-list';
    /**
     * Select要素の擬似option要素の選択時に付加されるクラス
     *
     * @version 0.1.0
     * @since 0.1.0
     *
     */
    Select.classNameStateSelected = 'selected';
    /**
     * Select要素の擬似option要素の選択がはずれた時に付加されるクラス
     *
     * @version 0.1.0
     * @since 0.1.0
     *
     */
    Select.classNameStateUnselected = 'unselected';
    return Select;
})(FormElement);
module.exports = Select;

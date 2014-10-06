/**
 * baserjs - v0.0.6-alpha r84
 * update: 2014-10-06
 * Author: baserCMS Users Community [https://github.com/baserproject/]
 * Github: https://github.com/baserproject/baserjs
 * License: Licensed under the MIT License
 */

(function () {
"use strict";

var window = this;
var document = window.document;
var location = window.location;
var $ = jQuery;


var baser;
(function (baser) {
    (function (utility) {
        /**
        * ユーティリティ文字列クラス
        *
        * @version 0.0.2
        * @since 0.0.2
        *
        */
        var String = (function () {
            function String() {
            }
            /**
            * ユニークIDを発行する
            *
            * @version 0.0.1
            * @since 0.0.1
            *
            */
            String.UID = function (seed) {
                var random = Math.floor(Math.random() * 1e8);

                if (!seed) {
                    seed = new Date().valueOf();
                }

                var uniqueNumber = random + seed;

                var uid = 'uid-' + uniqueNumber.toString(24);

                return uid;
            };
            return String;
        })();
        utility.String = String;
    })(baser.utility || (baser.utility = {}));
    var utility = baser.utility;
})(baser || (baser = {}));
var baser;
(function (baser) {
    (function (ui) {
        var flexibleWindowObject = window;

        /**
        * ブラウザの情報を管理するクラス
        *
        * @version 0.0.2
        * @since 0.0.2
        *
        */
        var Browser = (function () {
            function Browser() {
            }
            /**
            * デバイス・OS・ブラウザを管理する
            *
            * @version 0.0.2
            * @since 0.0.1
            *
            */
            Browser.getUA = function () {
                var ua = navigator.userAgent;
                var result = {
                    iOS: /ios/i.test(ua),
                    iPad: /ipad/i.test(ua),
                    iPhone: /iphone/i.test(ua),
                    iPod: /ipod/i.test(ua),
                    android: /android/i.test(ua)
                };
                return result;
            };
            Browser.spec = {
                isTouchable: flexibleWindowObject.ontouchstart !== undefined,
                ua: Browser.getUA()
            };
            return Browser;
        })();
        ui.Browser = Browser;
    })(baser.ui || (baser.ui = {}));
    var ui = baser.ui;
})(baser || (baser = {}));
var baser;
(function (baser) {
    (function (ui) {
        /**
        * 時間管理クラス
        *
        * @version 0.0.2
        * @since 0.0.1
        *
        */
        var Timer = (function () {
            /**
            * コンストラクタ
            *
            * @version 0.0.1
            * @since 0.0.1
            *
            */
            function Timer() {
                this.datetime = new Date();
            }
            /**
            * 暗黙の型変換時の振る舞い
            *
            * @version 0.0.1
            * @since 0.0.1
            *
            */
            Timer.prototype.valueOf = function () {
                return this.datetime.valueOf();
            };

            /**
            * 時間を現在に更新する
            *
            * @version 0.0.1
            * @since 0.0.1
            *
            */
            Timer.prototype.now = function () {
                this.datetime = new Date();
                return this.valueOf();
            };
            return Timer;
        })();
        ui.Timer = Timer;
    })(baser.ui || (baser.ui = {}));
    var ui = baser.ui;
})(baser || (baser = {}));
var baser;
(function (baser) {
    (function (ui) {
        (function (element) {
            /**
            * DOM要素の抽象クラス
            *
            * @version 0.0.2
            * @since 0.0.1
            *
            */
            var Element = (function () {
                /**
                * コンストラクタ
                *
                * @version 0.0.1
                * @since 0.0.1
                * @param $el 管理するDOM要素のjQueryオブジェクト
                *
                */
                function Element($el) {
                    /**
                    * 管理するDOM要素のname属性値
                    *
                    * @since 0.0.1
                    *
                    */
                    this.name = '';
                    this.$el = $el;

                    // IDの抽出 & 生成
                    this.id = this.$el.attr('id');
                    if (!this.id) {
                        this.id = baser.utility.String.UID();
                        this.$el.attr('id', this.id);
                    }

                    var name = this.$el.attr('name');
                    if (name) {
                        this.name = name;
                    }
                }
                return Element;
            })();
            element.Element = Element;
        })(ui.element || (ui.element = {}));
        var element = ui.element;
    })(baser.ui || (baser.ui = {}));
    var ui = baser.ui;
})(baser || (baser = {}));
var baser;
(function (baser) {
    (function (ui) {
        (function (element) {
            /**
            * フォーム要素を扱う静的クラス
            *
            * @version 0.0.2
            * @since 0.0.1
            *
            */
            var Form = (function () {
                function Form() {
                }
                /**
                * ラジオボタンを拡張する
                *
                * @version 0.0.1
                * @since 0.0.1
                * @param $elem 管理するDOM要素のjQueryオブジェクト
                * @param options オプション
                *
                */
                Form.radio = function ($elem, options) {
                    var radio = new element.Radio($elem, options);

                    return $elem;
                };

                /**
                * チェックボックスを拡張する
                *
                * @version 0.0.1
                * @since 0.0.1
                * @param $elem 管理するDOM要素のjQueryオブジェクト
                * @param options オプション
                *
                */
                Form.checkbox = function ($elem, options) {
                    var checkbox = new element.Checkbox($elem, options);

                    return $elem;
                };

                /**
                * セレクトボックスを拡張する
                *
                * @version 0.0.1
                * @since 0.0.1
                * @param $elem 管理するDOM要素のjQueryオブジェクト
                * @param options オプション
                *
                */
                Form.select = function ($elem, options) {
                    var select = new element.Select($elem, options);

                    return $elem;
                };

                /**
                * [未実装] 複数選択可セレクトボックスを拡張する
                *
                * @param $elem 管理するDOM要素のjQueryオブジェクト
                * @param options オプション
                *
                */
                Form.selectMultiple = function ($elem) {
                    return $elem;
                };

                /**
                * [未実装] 妥当性チェックを拡張する
                *
                * @param $elem 管理するDOM要素のjQueryオブジェクト
                * @param options オプション
                *
                */
                Form.valid = function ($elem, options) {
                    return $elem;
                };
                Form.className = '-bc-form-element';

                Form.elements = [];

                Form.radioGroups = {};
                return Form;
            })();
            element.Form = Form;
        })(ui.element || (ui.element = {}));
        var element = ui.element;
    })(baser.ui || (baser.ui = {}));
    var ui = baser.ui;
})(baser || (baser = {}));
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var baser;
(function (baser) {
    (function (ui) {
        (function (element) {
            var CLASS_WRAPPER = '-wrapper';
            var CLASS_LABEL = '-label';
            var CLASS_FOCUS = '-focus';
            var CLASS_BLUR = '-blur';

            

            /**
            * フォーム要素の抽象クラス
            *
            * @version 0.0.5
            * @since 0.0.1
            *
            */
            var FormElement = (function (_super) {
                __extends(FormElement, _super);
                /**
                * コンストラクタ
                *
                * @version 0.0.5
                * @since 0.0.1
                * @param $el 管理するDOM要素のjQueryオブジェクト
                * @param options オプション
                *
                */
                function FormElement($el, options) {
                    var _this = this;
                    _super.call(this, $el);
                    /**
                    * フォーカスがあたっている状態かどうか
                    *
                    * @since 0.0.1
                    *
                    */
                    this.isFocus = false;

                    this.$el.addClass(element.Form.className);

                    var config = $.extend(FormElement.defaultOption, options);

                    // label要素の検索 & 生成
                    var $label;

                    // 祖先のlabel要素を検索
                    $label = this.$el.closest('label');

                    this.isWrappedByLabel = !!$label.length;

                    if (!$label.length) {
                        // for属性に関連づいたlabel要素を検索
                        $label = $('[for="' + this.id + '"]');
                    }
                    if (config.autoLabeling && !$label.length) {
                        // label(もしくは別の)要素の生成
                        this.label = this.$el.attr('title') || config.label || this.$el.attr('name');
                        $label = $('<' + config.labelTag.toLowerCase() + ' />');
                        $label.insertAfter(this.$el);
                        if (config.labelClass) {
                            $label.addClass(config.labelClass);
                        }
                        if (this.label) {
                            $label.text(this.label);
                        }
                        if (config.labelTag.toLowerCase() === 'label') {
                            // labelを生成したのならfor属性にidを紐付ける
                            $label.attr('for', this.id);
                        }
                    }
                    this.$label = $label;

                    $label.addClass(element.Form.className);
                    $label.addClass(element.Form.className + CLASS_LABEL);

                    var wrapperHtml = '<span />';
                    var $wrapper = $(wrapperHtml);
                    $wrapper.addClass(element.Form.className + CLASS_WRAPPER);
                    if (this.isWrappedByLabel) {
                        this.$label.wrapAll($wrapper);
                    } else {
                        this.$el.add(this.$label).wrapAll($wrapper);
                    }
                    this.$wrapper = this.$el.closest('.' + element.Form.className + CLASS_WRAPPER);

                    this.$el.on('focus.bcFormElement', function () {
                        _this._onfocus();
                    });

                    this.$el.on('blur.bcFormElement', function () {
                        _this._onblur();
                    });

                    this._onblur();

                    // フォーム要素に登録
                    element.Form.elements.push(this);
                }
                /**
                * フォーカスがあたった時のルーチン
                *
                * @version 0.0.1
                * @since 0.0.1
                * @protected プロテクテッドメソッド想定
                *
                */
                FormElement.prototype._onfocus = function () {
                    this.isFocus = true;
                    this.$el.addClass(element.Form.className + CLASS_FOCUS);
                    this.$el.removeClass(element.Form.className + CLASS_BLUR);
                    this.$label.addClass(element.Form.className + CLASS_FOCUS);
                    this.$label.removeClass(element.Form.className + CLASS_BLUR);
                };

                /**
                * フォーカスがはずれた時のルーチン
                *
                * @version 0.0.1
                * @since 0.0.1
                * @protected プロテクテッドメソッド想定
                *
                */
                FormElement.prototype._onblur = function () {
                    this.isFocus = false;
                    this.$el.addClass(element.Form.className + CLASS_BLUR);
                    this.$el.removeClass(element.Form.className + CLASS_FOCUS);
                    this.$label.addClass(element.Form.className + CLASS_BLUR);
                    this.$label.removeClass(element.Form.className + CLASS_FOCUS);
                };
                FormElement.defaultOption = {
                    label: '',
                    labelTag: 'label',
                    labelClass: '',
                    autoLabeling: true
                };
                return FormElement;
            })(element.Element);
            element.FormElement = FormElement;
        })(ui.element || (ui.element = {}));
        var element = ui.element;
    })(baser.ui || (baser.ui = {}));
    var ui = baser.ui;
})(baser || (baser = {}));
var baser;
(function (baser) {
    (function (ui) {
        (function (element) {
            var CLASS_SELECT = '-select';
            var CLASS_OPTION = '-option';
            var CLASS_PSEUDO = '-pseudo';
            var CLASS_FOCUS = '-focus';
            var CLASS_BLUR = '-blur';

            var $document = $(document);

            /**
            * セレクトボックスの拡張クラス
            *
            * @version 0.0.1
            * @since 0.0.1
            *
            */
            var Select = (function (_super) {
                __extends(Select, _super);
                /**
                * コンストラクタ
                *
                * @version 0.0.4
                * @since 0.0.1
                * @param $el 管理するDOM要素のjQueryオブジェクト
                * @param options オプション
                *
                */
                function Select($el, options) {
                    var _this = this;
                    _super.call(this, $el, options);

                    this.$el.addClass(element.Form.className + CLASS_SELECT);
                    this.$wrapper.addClass(element.Form.className + CLASS_SELECT + '-wrapper');

                    var $elements = this.$label.children().detach();
                    this.$label.empty();
                    this.$label.append($elements);
                    this.$label.addClass(element.Form.className);
                    this.$label.addClass(element.Form.className + CLASS_SELECT + '-label');

                    this.$pseudo = $('<a />'); // Focusable
                    this.$pseudo.attr('href', '#');
                    this.$pseudo.appendTo(this.$label);
                    this.$pseudo.addClass(element.Form.className);
                    this.$pseudo.addClass(element.Form.className + CLASS_SELECT + CLASS_PSEUDO);

                    this.$selected = $('<span />');
                    this.$selected.text(this.label);
                    this.$selected.appendTo(this.$pseudo);
                    this.$selected.addClass(element.Form.className);
                    this.$selected.addClass(element.Form.className + CLASS_SELECT + CLASS_PSEUDO + '-selected');

                    this.$options = $('<ul />');
                    this.$options.appendTo(this.$pseudo);
                    this.$options.addClass(element.Form.className);
                    this.$options.addClass(element.Form.className + CLASS_SELECT + CLASS_PSEUDO + CLASS_OPTION + '-list');
                    this.$el.find('option').each(function (i, opt) {
                        var $opt = $(opt);
                        var value = $opt.val();
                        var text = $opt.text();
                        var $psuedoOpt = $('<li />');
                        $psuedoOpt.appendTo(_this.$options);
                        $psuedoOpt.data('value', value);
                        $psuedoOpt.text(text);
                        $psuedoOpt.addClass(element.Form.className);
                        $psuedoOpt.addClass(element.Form.className + CLASS_SELECT + CLASS_PSEUDO + CLASS_OPTION);
                    });

                    this._update();

                    this.$el.on('change.bcSelect', function () {
                        _this._onchange();
                    });

                    this.$options.on('click.bcSelect', 'li', function (e) {
                        var $li = $(e.target);
                        var index = $li.index();
                        _this.$el.find('option').eq(index).prop('selected', true);
                        e.stopPropagation();
                        e.preventDefault();
                        _this._onchange();
                    });

                    this.$pseudo.on('click.bcSelect', function (e) {
                        e.preventDefault();
                    });

                    if (ui.Browser.spec.isTouchable) {
                        if (ui.Browser.spec.ua.iPhone) {
                            this.$pseudo.on('click.bcSelect', function (e) {
                                _this.$label.focus();
                            });
                            this.$el.addClass(element.Form.className + CLASS_SELECT + '-os-iphone');
                            this.$label.addClass(element.Form.className + CLASS_SELECT + '-os-iphone');
                        } else if (ui.Browser.spec.ua.android) {
                            this.$el.addClass(element.Form.className + CLASS_SELECT + '-os-android');
                            this.$label.addClass(element.Form.className + CLASS_SELECT + '-os-android');
                        }
                    } else {
                        this._psuedoFocusEvent();
                    }
                }
                /**
                * 擬似要素にフォーカスがあったった時のイベント伝達を制御する
                *
                * @version 0.0.1
                * @since 0.0.1
                *
                */
                Select.prototype._psuedoFocusEvent = function () {
                    var _this = this;
                    this.$el.off('focus.bcFormElement');
                    this.$el.off('blur.bcFormElement');

                    this.$el.on('focus.bcSelect', function () {
                        _this.$pseudo.focus();
                    });

                    this.$pseudo.on('focus.bcSelect', function (e) {
                        e.stopPropagation();
                        $document.trigger('click.bcSelect');
                        _this._onfocus();
                    });

                    this.$selected.on('click.bcSelect', function (e) {
                        $document.trigger('click.bcSelect');
                        _this._onfocus();
                        e.stopPropagation();
                        e.preventDefault();
                    });

                    $document.on('click.bcSelect', function () {
                        _this._onblur();
                    });
                };

                /**
                * チェンジイベントのハンドラ
                *
                * @version 0.0.1
                * @since 0.0.1
                *
                */
                Select.prototype._onchange = function () {
                    this._update();

                    this._onblur();
                };

                /**
                * フォーカスがあたった時のルーチン
                *
                * @version 0.0.1
                * @since 0.0.1
                * @protected プロテクテッドメソッド想定
                *
                */
                Select.prototype._onfocus = function () {
                    _super.prototype._onfocus.call(this);
                    this.$pseudo.addClass(element.Form.className + CLASS_FOCUS);
                    this.$pseudo.removeClass(element.Form.className + CLASS_BLUR);
                };

                /**
                * フォーカスがはずれた時のルーチン
                *
                * @version 0.0.1
                * @since 0.0.1
                * @protected プロテクテッドメソッド想定
                *
                */
                Select.prototype._onblur = function () {
                    // 一旦 コンストラクタのsuper()の中で_onblur()が$pseudoプロパティを作成する前に呼び出されるため
                    if (this.$pseudo) {
                        _super.prototype._onblur.call(this);
                        this.$pseudo.addClass(element.Form.className + CLASS_BLUR);
                        this.$pseudo.removeClass(element.Form.className + CLASS_FOCUS);
                    }
                };

                /**
                * 要素の状態を更新する
                *
                * @version 0.0.1
                * @since 0.0.1
                *
                */
                Select.prototype._update = function () {
                    var _this = this;
                    var $selectedOption = this.$el.find(':selected');
                    var $psuedoOptList = this.$options.find('li');

                    this.$el.find('option').each(function (i, opt) {
                        var $opt = $(opt);
                        var isSelected = $opt.prop('selected');
                        var $psuedoOpt = $psuedoOptList.eq(i);
                        if (isSelected) {
                            _this.$selected.text($opt.text());
                        }
                        $psuedoOpt.attr('aria-selected', '' + isSelected);
                        if (isSelected) {
                            $psuedoOpt.addClass(element.Form.className + CLASS_SELECT + CLASS_PSEUDO + CLASS_OPTION + '-selected');
                            $psuedoOpt.removeClass(element.Form.className + CLASS_SELECT + CLASS_PSEUDO + CLASS_OPTION + '-unselected');
                        } else {
                            $psuedoOpt.addClass(element.Form.className + CLASS_SELECT + CLASS_PSEUDO + CLASS_OPTION + '-unselected');
                            $psuedoOpt.removeClass(element.Form.className + CLASS_SELECT + CLASS_PSEUDO + CLASS_OPTION + '-selected');
                        }
                    });
                };
                return Select;
            })(element.FormElement);
            element.Select = Select;
        })(ui.element || (ui.element = {}));
        var element = ui.element;
    })(baser.ui || (baser.ui = {}));
    var ui = baser.ui;
})(baser || (baser = {}));
var baser;
(function (baser) {
    (function (ui) {
        (function (element) {
            var CLASS_STATE_CHECKED = '-state-checked';
            var CLASS_STATE_UNCHECKED = '-state-unchecked';

            

            /**
            * ラジオボタンとチェックボックスの抽象クラス
            *
            * @version 0.0.3
            * @since 0.0.1
            *
            */
            var CheckableElement = (function (_super) {
                __extends(CheckableElement, _super);
                /**
                * コンストラクタ
                *
                * @version 0.0.1
                * @since 0.0.1
                * @param $el 管理するDOM要素のjQueryオブジェクト
                * @param options オプション
                *
                */
                function CheckableElement($el, options) {
                    var _this = this;
                    _super.call(this, $el, options);

                    var config = $.extend(element.FormElement.defaultOption, CheckableElement.defaultOption, options);

                    this._checkedClass = config.checkedClass;

                    this.checked = this.$el.prop('checked');
                    this.defaultChecked = this.$el.prop('defaultChecked');

                    this._update();

                    this.$el.on('change.bcCheckableElement', function () {
                        _this._onchenge();
                    });
                }
                /**
                * 要素の状態を更新する
                *
                * @version 0.0.1
                * @since 0.0.1
                *
                */
                CheckableElement.prototype.update = function () {
                    if (this.$el.prop('checked') !== this.checked) {
                        this._update();
                    }
                };

                /**
                * 要素の状態を更新する
                *
                * @version 0.0.1
                * @since 0.0.1
                * @protected プロテクテッド想定
                *
                */
                CheckableElement.prototype._onchenge = function () {
                    this.checked = !this.checked;

                    this._update();
                };

                /**
                * 要素の状態を更新する
                *
                * @version 0.0.3
                * @since 0.0.1
                *
                */
                CheckableElement.prototype._update = function () {
                    var checked = this.$el.prop('checked');

                    var checkedClass = element.Form.className + CLASS_STATE_CHECKED;
                    var uncheckedClass = element.Form.className + CLASS_STATE_UNCHECKED;

                    // WAI-ARIA属性
                    this.$el.attr('aria-checked', '' + checked);

                    if (checked) {
                        this.$el.removeClass(uncheckedClass);
                        this.$el.addClass(checkedClass);
                        this.$el.addClass(this._checkedClass);
                        this.$label.removeClass(uncheckedClass);
                        this.$label.addClass(checkedClass);
                        this.$label.addClass(this._checkedClass);
                    } else {
                        this.$el.addClass(uncheckedClass);
                        this.$el.removeClass(checkedClass);
                        this.$el.removeClass(this._checkedClass);
                        this.$label.addClass(uncheckedClass);
                        this.$label.removeClass(checkedClass);
                        this.$label.removeClass(this._checkedClass);
                    }

                    this.checked = checked;
                };
                CheckableElement.defaultOption = {
                    checkedClass: ''
                };
                return CheckableElement;
            })(element.FormElement);
            element.CheckableElement = CheckableElement;
        })(ui.element || (ui.element = {}));
        var element = ui.element;
    })(baser.ui || (baser.ui = {}));
    var ui = baser.ui;
})(baser || (baser = {}));
var baser;
(function (baser) {
    (function (ui) {
        (function (element) {
            var CLASS_RADIO = '-radio';

            /**
            * ラジオボタンの拡張クラス
            *
            * @version 0.0.1
            * @since 0.0.1
            *
            */
            var Radio = (function (_super) {
                __extends(Radio, _super);
                /**
                * コンストラクタ
                *
                * @version 0.0.4
                * @since 0.0.1
                * @param $el 管理するDOM要素のjQueryオブジェクト
                * @param options オプション
                *
                */
                function Radio($el, options) {
                    _super.call(this, $el, options);

                    this.$el.addClass(element.Form.className + CLASS_RADIO);
                    this.$wrapper.addClass(element.Form.className + CLASS_RADIO + '-wrapper');
                    this.$label.addClass(element.Form.className + CLASS_RADIO + '-label');

                    // ラジオボタングループに登録
                    if (!element.Form.radioGroups[this.name]) {
                        element.Form.radioGroups[this.name] = new element.RadioGroup(this.name);
                    }
                    element.Form.radioGroups[this.name].add(this);
                }
                /**
                * チェンジイベントのハンドラ
                *
                * @version 0.0.1
                * @since 0.0.1
                *
                */
                Radio.prototype._onchenge = function () {
                    _super.prototype._onchenge.call(this);

                    element.Form.radioGroups[this.name].update(this);
                };
                return Radio;
            })(element.CheckableElement);
            element.Radio = Radio;
        })(ui.element || (ui.element = {}));
        var element = ui.element;
    })(baser.ui || (baser.ui = {}));
    var ui = baser.ui;
})(baser || (baser = {}));
var baser;
(function (baser) {
    (function (ui) {
        (function (element) {
            var CLASS_CHECKBOX = '-checkbox';

            /**
            * チェックボックスの拡張クラス
            *
            * @version 0.0.1
            * @since 0.0.1
            *
            */
            var Checkbox = (function (_super) {
                __extends(Checkbox, _super);
                /**
                * コンストラクタ
                *
                * @version 0.0.4
                * @since 0.0.1
                * @param $el 管理するDOM要素のjQueryオブジェクト
                * @param options オプション
                *
                */
                function Checkbox($el, options) {
                    _super.call(this, $el, options);

                    this.$el.addClass(element.Form.className + CLASS_CHECKBOX);
                    this.$wrapper.addClass(element.Form.className + CLASS_CHECKBOX + '-wrapper');
                    if (this.$label) {
                        this.$label.addClass(element.Form.className + CLASS_CHECKBOX + '-label');
                    }
                }
                return Checkbox;
            })(element.CheckableElement);
            element.Checkbox = Checkbox;
        })(ui.element || (ui.element = {}));
        var element = ui.element;
    })(baser.ui || (baser.ui = {}));
    var ui = baser.ui;
})(baser || (baser = {}));
var baser;
(function (baser) {
    (function (ui) {
        (function (element) {
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
                return RadioGroup;
            })();
            element.RadioGroup = RadioGroup;
        })(ui.element || (ui.element = {}));
        var element = ui.element;
    })(baser.ui || (baser.ui = {}));
    var ui = baser.ui;
})(baser || (baser = {}));
var baser;
(function (baser) {
    (function (ui) {
        (function (element) {
            /**
            * ボックス要素の抽象クラス
            *
            * @version 0.0.5
            * @since 0.0.5
            *
            */
            var Box = (function (_super) {
                __extends(Box, _super);
                /**
                * コンストラクタ
                *
                * @version 0.0.5
                * @since 0.0.5
                * @param $el 管理するDOM要素のjQueryオブジェクト
                *
                */
                function Box($el) {
                    _super.call(this, $el);

                    this.$el.addClass(Box.className);
                }
                /**
                * ラジオボタンを拡張する
                *
                * @version 0.0.5
                * @since 0.0.5
                * @param $elem 管理するDOM要素のjQueryオブジェクト
                * @param options オプション
                *
                */
                Box.alignHeight = function ($elem, options) {
                    var box = new Box($elem);

                    box.alignHeight(options);

                    return $elem;
                };

                /**
                * 高さをそろえる
                *
                * @version 0.0.5
                * @since 0.0.5
                * @param $el 管理するDOM要素のjQueryオブジェクト
                * @param options オプション
                *
                */
                Box.prototype.alignHeight = function (options) {
                    return this;
                };
                Box.className = '-bc-box-element';

                Box.boxes = [];
                return Box;
            })(element.Element);
            element.Box = Box;
        })(ui.element || (ui.element = {}));
        var element = ui.element;
    })(baser.ui || (baser.ui = {}));
    var ui = baser.ui;
})(baser || (baser = {}));
var baser;
(function (baser) {
    (function (ui) {
        (function (element) {
            /**
            * マップ要素
            *
            * @version 0.0.6
            * @since 0.0.6
            *
            */
            var Map = (function (_super) {
                __extends(Map, _super);
                /**
                * コンストラクタ
                *
                * @version 0.0.6
                * @since 0.0.6
                * @param $el 管理するDOM要素のjQueryオブジェクト
                *
                */
                function Map($el, options) {
                    _super.call(this, $el);

                    this.$el.addClass(Map.className);

                    if ('google' in window && google.maps) {
                        this._init(options);
                    } else {
                        if (console && console.warn) {
                            console.warn('ReferenceError: google.maps, Must load script "//maps.google.com/maps/api/js"');
                        }
                    }

                    Map.maps.push(this);

                    $el.data(Map.className, this);
                }
                Map.prototype._init = function (options) {
                    var _this = this;
                    var mapCenterLat = this.$el.data('lat') || Map.lat;
                    var mapCenterLng = this.$el.data('lng') || Map.lng;

                    this.$coordinates = this.$coordinates || this.$el.find('[data-lat][data-lng]').detach();

                    var coordinates = [];

                    this.$coordinates.each(function (i, el) {
                        var $this = $(el);
                        coordinates.push(new Coordinate($this));
                    });

                    this.mapOption = this.mapOption || $.extend({
                        zoom: 14,
                        mapTypeControlOptions: {
                            mapTypeIds: [
                                google.maps.MapTypeId.HYBRID,
                                google.maps.MapTypeId.ROADMAP
                            ]
                        },
                        scrollwheel: false,
                        center: new google.maps.LatLng(mapCenterLat, mapCenterLng)
                    }, options);

                    this.info = new google.maps.InfoWindow({
                        disableAutoPan: false
                    });

                    this.gmap = new google.maps.Map(this.$el[0], this.mapOption);

                    $.each(coordinates, function (i, coordinate) {
                        coordinate.markTo(_this);
                    });
                };

                Map.prototype.reload = function () {
                    this._init();
                };
                Map.lat = 35.681382;

                Map.lng = 139.766084;

                Map.className = '-bc-map-element';

                Map.maps = [];
                return Map;
            })(element.Element);
            element.Map = Map;

            var Coordinate = (function () {
                function Coordinate($el) {
                    this.$el = $el;
                    this.lat = $el.data('lat');
                    this.lng = $el.data('lng');
                    this.title = $el.attr('title') || $el.data('title') || $el.find('h1,h2,h3,h4,h5,h6').text() || null;
                    this.icon = $el.data('icon') || null;
                }
                Coordinate.prototype.markTo = function (map) {
                    var _this = this;
                    this.marker = new google.maps.Marker({
                        position: new google.maps.LatLng(this.lat, this.lng),
                        title: this.title,
                        icon: this.icon,
                        map: map.gmap
                    });
                    google.maps.event.addListener(this.marker, 'click', function () {
                        map.info.setContent(_this.$el[0]);
                        map.info.open(map.gmap, _this.marker);
                        _this.marker.setZIndex(google.maps.Marker.MAX_ZINDEX + 1);
                    });
                };
                return Coordinate;
            })();
        })(ui.element || (ui.element = {}));
        var element = ui.element;
    })(baser.ui || (baser.ui = {}));
    var ui = baser.ui;
})(baser || (baser = {}));
var baser;
(function (baser) {
    (function (ui) {
        /**
        * フォームのバリデーションを担うクラス
        *
        * @version 0.0.2
        * @since 0.0.1
        *
        */
        var Validation = (function () {
            function Validation() {
            }
            return Validation;
        })();
        ui.Validation = Validation;
    })(baser.ui || (baser.ui = {}));
    var ui = baser.ui;
})(baser || (baser = {}));
this.baser = baser;
$.fn.bcRadio = function (options) {
    return this.each(function (i, elem) {
        var $elem = $(elem);
        baser.ui.element.Form.radio($elem, options);
    });
};

$.fn.bcCheckbox = function (options) {
    return this.each(function (i, elem) {
        var $elem = $(elem);
        baser.ui.element.Form.checkbox($elem, options);
    });
};

$.fn.bcSelect = function (options) {
    return this.each(function (i, elem) {
        var $elem = $(elem);
        baser.ui.element.Form.select($elem, options);
    });
};

$.fn.bcBoxAlignHeight = function () {
    baser.ui.element.Box.alignHeight(this);
    return this;
};

$.fn.bcMaps = function () {
    return this.each(function (i, elem) {
        var $elem = $(elem);
        var data = $elem.data(baser.ui.element.Map.className);
        if (data) {
            data.reload();
        } else {
            new baser.ui.element.Map($elem);
        }
    });
};
/// <reference path="../typings/tsd.d.ts" />
/// <reference path="baser/utility/String.ts" />
/// <reference path="baser/ui/Browser.ts" />
/// <reference path="baser/ui/Timer.ts" />
/// <reference path="baser/ui/element/Element.ts" />
/// <reference path="baser/ui/element/Form.ts" />
/// <reference path="baser/ui/element/FormElement.ts" />
/// <reference path="baser/ui/element/Select.ts" />
/// <reference path="baser/ui/element/CheckableElement.ts" />
/// <reference path="baser/ui/element/Radio.ts" />
/// <reference path="baser/ui/element/Checkbox.ts" />
/// <reference path="baser/ui/element/RadioGroup.ts" />
/// <reference path="baser/ui/element/Box.ts" />
/// <reference path="baser/ui/element/Map.ts" />
/// <reference path="baser/ui/Validation.ts" />
/// <reference path="baser.ts" />
/// <reference path="jquery.baser.ts" />

}).call(this);
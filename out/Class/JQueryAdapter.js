"use strict";
var UtilMath = require('./UtilMath');
var Timer = require('./Timer');
var Browser = require('./Browser');
var BaserElement = require('./BaserElement');
var AlignedBoxes = require('./AlignedBoxes');
var BackgroundContainer = require('./BackgroundContainer');
var Checkbox = require('./Checkbox');
var Radio = require('./Radio');
var Select = require('./Select');
var Scroll = require('./Scroll');
var GoogleMaps = require('./GoogleMaps');
var YouTube = require('./YouTube');
var JQueryAdapter = (function () {
    function JQueryAdapter() {
    }
    JQueryAdapter.bcScrollTo = function (selector, options) {
        var scroll = new Scroll();
        scroll.to(selector, options);
    };
    /**
     * 自信の要素を基準に、指定の子要素を背景のように扱う
     *
     * TODO: BaserElement化する
     *
     * CSSの`background-size`の`contain`と`cover`の振る舞いに対応
     *
     * 基準も縦横のセンター・上下・左右に指定可能
     *
     * @version 0.11.0
     * @since 0.0.9
     * @param {Object} options オプション
     *
     * * * *
     *
     * ## Sample
     *
     * ### Target HTML
     *
     * ```html
     * <div class="sample" data-id="rb0zOstIiyU" data-width="3840" data-height="2160"></div>
     * ```
     *
     * ### Execute
     *
     * ```js
     * $('.sample').bcYoutube().find('iframe').bcKeepAspectRatio();
     * ```
     *
     * ### Result
     *
     * comming soon...
     *
     */
    JQueryAdapter.prototype.bcBackground = function (options) {
        var self = $(this);
        return self.each(function (i, elem) {
            /* tslint:disable */
            new BackgroundContainer(elem, options);
            /* tslint:enable */
        });
    };
    /**
     * 要素の高さを揃える
     *
     * @version 0.7.0
     * @since 0.0.15
     *
     */
    JQueryAdapter.prototype.bcBoxAlignHeight = function (columnOrKeyword, detailTarget, callback) {
        if (columnOrKeyword === void 0) { columnOrKeyword = 0; }
        var self = $(this);
        if (typeof columnOrKeyword === 'string') {
            var keyword = columnOrKeyword;
            switch (keyword) {
                case 'destroy':
                    {
                        var boxes = self.data(AlignedBoxes.DATA_KEY);
                        boxes.destroy();
                    }
                    break;
                default: {
                }
            }
        }
        else {
            var column_1 = columnOrKeyword;
            // 要素群の高さを揃え、setsに追加
            if (detailTarget) {
                var $detailTarget = self.find(detailTarget);
                if ($detailTarget.length) {
                    self.each(function () {
                        var $split = $(this).find(detailTarget);
                        /* tslint:disable */
                        new AlignedBoxes($split, column_1, callback);
                        /* tslint:enable */
                    });
                }
            }
            else {
                /* tslint:disable */
                new AlignedBoxes(self, column_1, callback);
            }
        }
        return self;
    };
    // @version 0.12.1
    // @since 0.1.0
    JQueryAdapter.prototype.bcBoxLink = function () {
        return $(this).on('click', function (e) {
            var $elem = $(this);
            var $link = $elem.find('a, area').eq(0);
            var href = $link.prop('href');
            if ($link.length && href) {
                var isBlank = $link.prop('target') === '_blank';
                Browser.jumpTo(href, isBlank);
                e.preventDefault();
            }
        });
    };
    /**
     * WAI-ARIAに対応した装飾可能な汎用要素でラップしたチェックボックスに変更する
     *
     * @version 0.9.0
     * @since 0.0.1
     *
     * * * *
     *
     * ## Sample
     *
     * comming soon...
     *
     */
    JQueryAdapter.prototype.bcCheckbox = function (options) {
        var self = $(this);
        return self.each(function (i, elem) {
            if (elem.nodeName === 'INPUT') {
                /* tslint:disable */
                new Checkbox(elem, options);
            }
            else if ('console' in window) {
                console.warn('TypeError: A Node is not HTMLInputElement');
            }
        });
    };
    /**
     * WAI-ARIAに対応した装飾可能な汎用要素でラップしたラジオボタンに変更する
     *
     * @version 0.9.0
     * @since 0.0.1
     *
     * * * *
     *
     * ## Sample
     *
     * comming soon...
     *
     */
    JQueryAdapter.prototype.bcRadio = function (options) {
        var self = $(this);
        return self.each(function (i, elem) {
            if (elem.nodeName === 'INPUT') {
                /* tslint:disable */
                new Radio(elem, options);
            }
            else if ('console' in window) {
                console.warn('TypeError: A Node is not HTMLInputElement');
            }
        });
    };
    /**
     * WAI-ARIAに対応した装飾可能な汎用要素でラップしたセレクトボックスに変更する
     *
     * @version 0.9.2
     * @since 0.0.1
     *
     * * * *
     *
     * ## Sample
     *
     * comming soon...
     *
     */
    JQueryAdapter.prototype.bcSelect = function (options) {
        var self = $(this);
        return self.each(function (i, elem) {
            var $elem = $(elem);
            if (typeof options === 'string') {
                switch (options) {
                    case 'update':
                        {
                            var select = $elem.data('bc-element');
                            select.update();
                        }
                        break;
                    default: {
                    }
                }
            }
            else if (elem.nodeName === 'SELECT') {
                /* tslint:disable */
                new Select(elem, options);
            }
            else if ('console' in window) {
                console.warn('TypeError: A Node is not HTMLSelectElement');
            }
        });
    };
    /**
     * 要素内の画像の読み込みが完了してからコールバックを実行する
     *
     * @version 0.9.0
     * @since 0.0.9
     *
     * * * *
     *
     * ## Sample
     *
     * comming soon...
     *
     */
    JQueryAdapter.prototype.bcImageLoaded = function (success, error) {
        var self = $(this);
        return self.each(function (i, elem) {
            var $elem = $(elem);
            var manifest = [];
            var $imgs = $elem.filter('img').add($elem.find('img'));
            if ($imgs.length) {
                $imgs.hide();
                $imgs.each(function () {
                    var loaded = $.Deferred();
                    var img = new Image();
                    img.onload = function () {
                        loaded.resolve();
                        img.onload = null; // GC
                        img = null; // GC
                    };
                    img.onabort = img.onerror = function (e) {
                        loaded.reject(e);
                        img.onload = null; // GC
                        img = null; // GC
                    };
                    img.src = this.src;
                    manifest.push(loaded.promise());
                });
                $.when.apply($, manifest).done(function () {
                    $imgs.show();
                    success.call(elem);
                }).fail(function (e) {
                    if (error) {
                        error.call(elem, e);
                    }
                });
            }
            else {
                success.call(elem);
            }
        });
    };
    /**
     * 親のコンテナ要素の幅に合わせて、自信の縦横比を保ったまま幅の変更に対応する
     *
     * iframeなどの縦横比を保ちたいが、幅を変更しても高さが変化しない要素などに有効
     *
     * @version 0.0.9
     * @since 0.0.9
     *
     * * * *
     *
     * ## Sample
     *
     * ### Target HTML
     *
     * ```html
     * <div class="sample" data-id="rb0zOstIiyU" data-width="3840" data-height="2160"></div>
     * ```
     *
     * ### Execute
     *
     * ```js
     * $('.sample').bcYoutube().find('iframe').bcKeepAspectRatio();
     * ```
     *
     * ### Result
     *
     * comming soon...
     *
     */
    JQueryAdapter.prototype.bcKeepAspectRatio = function () {
        var $w = $(window);
        var self = $(this);
        self.each(function (i, elem) {
            var $elem = $(elem);
            var baseWidth = +$elem.data('width');
            var baseHeight = +$elem.data('height');
            var aspectRatio = baseWidth / baseHeight;
            $w.on('resize', function () {
                var width = $elem.width();
                $elem.css({
                    width: '100%',
                    height: width / aspectRatio,
                });
            }).trigger('resize');
        });
        Timer.wait(30, function () {
            $w.trigger('resize');
        });
        return self;
    };
    /**
     * リンク要素からのアンカーまでスムーズにスクロールをさせる
     *
     * @version 0.1.0
     * @since 0.0.8
     *
     * * * *
     *
     * ## Sample
     *
     * comming soon...
     *
     */
    JQueryAdapter.prototype.bcScrollTo = function (options) {
        var self = $(this);
        return self.on('click', function (e) {
            var $this = $(this);
            var href = $this.attr('href');
            var scroll = new Scroll();
            if (href) {
                // キーワードを一番に優先する
                if (options && $.isPlainObject(options.keywords)) {
                    for (var keyword in options.keywords) {
                        if (options.keywords.hasOwnProperty(keyword)) {
                            var target = options.keywords[keyword];
                            if (keyword === href) {
                                scroll.to(target, options);
                                e.preventDefault();
                                return;
                            }
                        }
                    }
                }
                // 「/pathname/#hash」のリンクパターンの場合
                // 「/pathname/」が現在のURLだった場合「#hash」に飛ばすようにする
                var absPath = $this.prop('href');
                var currentReferer = location.protocol + '//' + location.host + location.pathname + location.search;
                href = absPath.replace(currentReferer, '');
                // #top はHTML5ではページトップを意味する
                if (href === '#top') {
                    scroll.to(0, options);
                    e.preventDefault();
                    return;
                }
                // セレクタとして要素が存在する場合はその要素に移動
                // 「/」で始まるなどセレクターとして不正な場合、例外を投げることがあるので無視する
                try {
                    var target = $(href);
                    if (target.length) {
                        scroll.to(target, options);
                        e.preventDefault();
                        return;
                    }
                }
                catch (err) { }
            }
            return;
        });
    };
    /**
     * リストを均等に分割する
     *
     * @version 0.2.0
     * @since 0.0.14
     *
     */
    JQueryAdapter.prototype.bcSplitList = function (columnSize, options) {
        var self = $(this);
        var CLASS_NAME = 'splited-list';
        var CLASS_NAME_NTH = 'nth';
        var CLASS_NAME_ITEM = 'item';
        var config = $.extend({
            dataKey: '-bc-split-list-index',
            splitChildren: true,
        }, options);
        self.each(function (index, elem) {
            var $container = $(elem);
            var $list = $container.find('>ul');
            var $items;
            if (!config.splitChildren) {
                // 直下のliのみ取得
                $items = $list.find('>li').detach();
            }
            else {
                // 入れ子のliも含めて全て取得
                $items = $list.find('li').detach();
                // 入れ子のulの削除
                $items.find('ul').remove();
            }
            // リストアイテムの総数
            var size = $items.length;
            var splited = UtilMath.split(size, columnSize);
            var itemArray = $items.toArray();
            for (var i = 0; i < columnSize; i++) {
                var sizeByColumn = splited[i];
                var $col = $('<ul></ul>');
                BaserElement.addClassTo($col, CLASS_NAME);
                BaserElement.addClassTo($col, CLASS_NAME, '', CLASS_NAME_NTH + columnSize);
                $col.appendTo($container);
                for (var j = 0; j < sizeByColumn; j++) {
                    var $item = $(itemArray.shift());
                    $item.appendTo($col);
                    $item.data(config.dataKey, i);
                    BaserElement.addClassTo($item, CLASS_NAME, CLASS_NAME_ITEM);
                    BaserElement.addClassTo($item, CLASS_NAME, CLASS_NAME_ITEM, CLASS_NAME_NTH + i);
                }
            }
            $list.remove();
        });
        return self;
    };
    /**
     * マウスオーバー時に一瞬透明になるエフェクトをかける
     *
     * @version 0.0.14
     * @since 0.0.14
     *
     */
    JQueryAdapter.prototype.bcWink = function (options) {
        var self = $(this);
        var config = $.extend({
            close: 50,
            open: 200,
            opacity: 0.4,
            target: null,
            stopOnTouch: true,
        }, options);
        self.each(function (i, elem) {
            var $this = $(elem);
            var $target;
            if (config.target) {
                $target = $this.find(config.target);
            }
            else {
                $target = $this;
            }
            $this.on('mouseenter', function (e) {
                if (config.stopOnTouch && $this.data('-bc-is-touchstarted')) {
                    $this.data('-bc-is-touchstarted', false);
                    return true;
                }
                $target
                    .stop(true, false)
                    .fadeTo(config.close, config.opacity)
                    .fadeTo(config.open, 1);
                return true;
            });
            if (config.stopOnTouch) {
                $this.on('touchstart', function (e) {
                    $this.data('-bc-is-touchstarted', true);
                    return true;
                });
            }
        });
        return self;
    };
    /**
     * マップを埋め込む
     *
     * 現在の対応はGoogleMapsのみ
     *
     * @version 0.9.0
     * @since 0.0.8
     *
     * * * *
     *
     * ## Sample
     *
     * ### Target HTML
     *
     * ```html
     * <div class="sample" data-lat="33.606785" data-lng="130.418314"></div>
     * ```
     *
     * ### Execute
     *
     * ```js
     * $('.sample').bcMaps();
     * ```
     *
     * ### Result
     *
     * comming soon...
     *
     */
    JQueryAdapter.prototype.bcMaps = function (options) {
        var self = $(this);
        return self.each(function (i, elem) {
            var $elem = $(elem);
            var data = $elem.data(GoogleMaps.className);
            if (data) {
                data.reload(options);
            }
            else {
                /* tslint:disable */
                new GoogleMaps(elem, options);
            }
        });
    };
    /**
     * YouTubeを埋め込む
     *
     * @version 0.9.0
     * @since 0.0.8
     *
     * * * *
     *
     * ## Sample
     *
     * ### Target HTML
     *
     * ```html
     * <div class="sample" data-id="rb0zOstIiyU" data-width="720" data-height="480"></div>
     * ```
     *
     * ### Execute
     *
     * ```js
     * $('.sample').bcYoutube();
     * ```
     *
     */
    JQueryAdapter.prototype.bcYoutube = function (options) {
        var self = $(this);
        return self.each(function (i, elem) {
            var $elem = $(elem);
            var data = $elem.data(YouTube.className);
            if (data) {
                data.reload(options);
            }
            else {
                /* tslint:disable */
                new YouTube(elem, options);
            }
        });
    };
    /**
     * マウスオーバー時に画像を切り替える
     *
     * 【使用非推奨】できるかぎり CSS の `:hover` と `background-image` を使用するべきです。
     *
     * @deprecated
     * @version 0.0.15
     * @since 0.0.15
     *
     */
    JQueryAdapter.prototype.bcRollover = function (options) {
        var self = $(this);
        var config = $.extend({
            pattern: /_off(\.(?:[a-z0-9]{1,6}))$/i,
            replace: '_on$1',
            dataPrefix: '-bc-rollover-',
            ignore: '',
            filter: null,
            stopOnTouch: true,
        }, options);
        var dataKeyOff = config.dataPrefix + 'off';
        var dataKeyOn = config.dataPrefix + 'on';
        self.each(function (i, elem) {
            var nodeName = elem.nodeName.toLowerCase();
            var $img = $(elem).not(config.ignore);
            if ($img.length && nodeName === 'img' || (nodeName === 'input' && $img.prop('type') === 'image')) {
                var avail = true;
                if ($.isFunction(config.filter)) {
                    avail = !!config.filter.call(elem);
                }
                else if (config.filter) {
                    avail = !!$img.filter(config.filter).length;
                }
                if (avail) {
                    var src = $img.attr('src');
                    if (src.match(config.pattern)) {
                        var onSrc = src.replace(config.pattern, config.replace);
                        $img.data(dataKeyOff, src);
                        $img.data(dataKeyOn, onSrc);
                    }
                }
            }
        });
        self.on('mouseenter', function (e) {
            var $this = $(this);
            if (config.stopOnTouch && $this.data('-bc-is-touchstarted')) {
                $this.data('-bc-is-touchstarted', false);
                return true;
            }
            var onSrc = $this.data(dataKeyOn);
            $this.prop('src', onSrc);
            return true;
        });
        self.on('mouseleave', function (e) {
            var $this = $(this);
            if (config.stopOnTouch && $this.data('-bc-is-touchstarted')) {
                $this.data('-bc-is-touchstarted', false);
                return true;
            }
            var offSrc = $this.data(dataKeyOff);
            $this.prop('src', offSrc);
            return true;
        });
        if (config.stopOnTouch) {
            self.on('touchstart', function (e) {
                var $this = $(this);
                $this.data('-bc-is-touchstarted', true);
                return true;
            });
        }
        return self;
    };
    /**
     * マウスオーバー時に半透明になるエフェクトをかける
     *
     * 【使用非推奨】できるかぎり CSS の `:hover` と `opacity`、そして `transition` を使用するべきです。
     *
     * @deprecated
     * @version 0.0.15
     * @since 0.0.15
     *
     */
    JQueryAdapter.prototype.bcShy = function (options) {
        var self = $(this);
        var config = $.extend({
            close: 300,
            open: 300,
            opacity: 0.6,
            target: null,
            stopOnTouch: true,
        }, options);
        self.each(function (i, elem) {
            var $this = $(elem);
            var $target;
            if (config.target) {
                $target = $this.find(config.target);
            }
            else {
                $target = $this;
            }
            $this.on('mouseenter', function (e) {
                if (config.stopOnTouch && $this.data('-bc-is-touchstarted')) {
                    $this.data('-bc-is-touchstarted', false);
                    return true;
                }
                $target
                    .stop(true, false)
                    .fadeTo(config.close, config.opacity);
                return true;
            });
            $this.on('mouseleave', function (e) {
                if (config.stopOnTouch && $this.data('-bc-is-touchstarted')) {
                    $this.data('-bc-is-touchstarted', false);
                    return true;
                }
                $target
                    .stop(true, false)
                    .fadeTo(config.open, 1);
                return true;
            });
            if (config.stopOnTouch) {
                $this.on('touchstart', function (e) {
                    $this.data('-bc-is-touchstarted', true);
                    return true;
                });
            }
        });
        return self;
    };
    ;
    return JQueryAdapter;
}());
module.exports = JQueryAdapter;

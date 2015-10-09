var UtilMath = require('./UtilMath');
var Timer = require('./Timer');
var AnimationFrames = require('./AnimationFrames');
var Browser = require('./Browser');
var BaserElement = require('./BaserElement');
var AlignedBoxes = require('./AlignedBoxes');
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
     * @version 0.2.0
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
            var config = $.extend({
                align: 'center',
                valign: 'center',
                size: 'contain',
                child: '>*:first',
                outer: false
            }, options);
            var $elem = $(elem);
            var $child = $elem.find(config.child);
            var objectWidth = +($elem.data('width') || $child.data('width') || $child.attr('width') || $child.width()) || 400;
            var objectHeight = +($elem.data('height') || $child.data('height') || $child.attr('height') || $child.height()) || 300;
            var objectAspectRatio = objectWidth / objectHeight;
            var currentCSSPosition = $elem.css('position');
            if (currentCSSPosition === 'static' || currentCSSPosition === '' || currentCSSPosition == null) {
                $elem.css('position', 'relative');
            }
            $child.css({
                position: 'absolute',
                top: 0,
                left: 0
            });
            var css = {};
            var calc = function () {
                var containerWidth;
                var containerHeight;
                var containerAspectRatio;
                var scale;
                if (config.outer) {
                    containerWidth = $elem.outerWidth();
                    containerHeight = $elem.outerHeight();
                }
                else {
                    containerWidth = $elem.width();
                    containerHeight = $elem.height();
                }
                containerAspectRatio = containerWidth / containerHeight;
                // 画像の拡縮率の算出
                // アス比が1以上なら横長/1以下なら縦長
                // コンテナが横長
                switch (config.size) {
                    case 'contain':
                        if (1 < containerAspectRatio) {
                            // 画像が横長 もしくは コンテナのアス比の方が大きい
                            if (1 < objectWidth && objectAspectRatio < containerAspectRatio) {
                                scale = containerWidth / objectWidth;
                            }
                            else {
                                scale = containerHeight / objectHeight;
                            }
                        }
                        else {
                            // 画像が横長 もしくは 画像のアス比の方が大きい
                            if (1 < objectHeight && containerAspectRatio < objectAspectRatio) {
                                scale = containerHeight / objectHeight;
                            }
                            else {
                                scale = containerWidth / objectWidth;
                            }
                        }
                        break;
                    case 'cover':
                        if (1 < containerAspectRatio) {
                            // 画像が横長 もしくは コンテナのアス比の方が大きい
                            if (1 < objectWidth && objectAspectRatio < containerAspectRatio) {
                                scale = containerHeight / objectHeight;
                            }
                            else {
                                scale = containerWidth / objectWidth;
                            }
                        }
                        else {
                            // 画像が横長 もしくは 画像のアス比の方が大きい
                            if (1 < objectHeight && containerAspectRatio < objectAspectRatio) {
                                scale = containerWidth / objectWidth;
                            }
                            else {
                                scale = containerHeight / objectHeight;
                            }
                        }
                        break;
                    default:
                        return;
                }
                // 画像の幅と高さ
                var newWidth = objectWidth * scale;
                var newHeight = objectHeight * scale;
                var top;
                switch (config.valign) {
                    case 'top':
                        top = 0;
                        break;
                    case 'bottom':
                        top = containerHeight - newHeight;
                        break;
                    case 'center':
                    default: {
                        top = (containerHeight / 2) - (newHeight / 2);
                    }
                }
                var left;
                switch (config.align) {
                    case 'left':
                        left = 0;
                        break;
                    case 'right':
                        left = containerWidth - newWidth;
                        break;
                    case 'center':
                    default: {
                        left = (containerWidth / 2) - (newWidth / 2);
                    }
                }
                var none = 'none';
                css = {
                    width: newWidth,
                    height: newHeight,
                    maxWidth: none,
                    minWidth: 0,
                    maxHeight: none,
                    minHeight: 0,
                    top: top,
                    left: left
                };
            };
            // 初期計算
            calc();
            // 初期反映
            $child.css(css);
            // 計算結果をアニメーションフレーム毎にDOMに反映
            var animation = new AnimationFrames(function () {
                $child.css(css);
            });
            Browser.browser.on('resizestart', function () {
                animation.start();
            }).on('resize', function () {
                // リサイズ時にサイズを計算
                calc();
            }).on('resizeend', function () {
                animation.stop();
            });
            animation.start();
            Timer.wait(300, function () {
                animation.stop();
            });
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
        var keyword;
        var column;
        var boxes;
        if (typeof columnOrKeyword === 'string') {
            keyword = columnOrKeyword;
            switch (keyword) {
                case 'destroy': {
                    boxes = self.data(AlignedBoxes.DATA_KEY);
                    boxes.destroy();
                    break;
                }
            }
        }
        else {
            column = columnOrKeyword;
            var $detailTarget;
            // 要素群の高さを揃え、setsに追加
            if (detailTarget) {
                $detailTarget = self.find(detailTarget);
                if ($detailTarget.length) {
                    self.each(function () {
                        var $split = $(this).find(detailTarget);
                        new AlignedBoxes($split, column, callback);
                    });
                }
            }
            else {
                new AlignedBoxes(self, column, callback);
            }
        }
        return self;
    };
    // @version 0.9.0
    // @since 0.1.0
    JQueryAdapter.prototype.bcBoxLink = function () {
        return $(self).on('click', function (e) {
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
    JQueryAdapter.prototype.bcSelect = function (options) {
        var self = $(this);
        return self.each(function (i, elem) {
            var $elem = $(elem);
            if (typeof options === 'string') {
                switch (options) {
                    case 'update': {
                        var select = $elem.data('bc-element');
                        select.update();
                    }
                }
            }
            if (elem.nodeName === 'SELECT') {
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
            var $imgs;
            $imgs = $elem.filter('img').add($elem.find('img'));
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
                    height: width / aspectRatio
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
            var keyword;
            var target;
            var scroll = new Scroll();
            var absPath;
            var currentReferer;
            if (href) {
                // キーワードを一番に優先する
                if (options && $.isPlainObject(options.keywords)) {
                    for (keyword in options.keywords) {
                        if (options.keywords.hasOwnProperty(keyword)) {
                            target = options.keywords[keyword];
                            if (keyword === href) {
                                scroll.to(target, options);
                                e.preventDefault();
                                return;
                            }
                        }
                    }
                }
                // 「/pathname/#hash」のリンクパターンの場合
                //「/pathname/」が現在のURLだった場合「#hash」に飛ばすようにする
                absPath = $this.prop('href');
                currentReferer = location.protocol + '//' + location.host + location.pathname + location.search;
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
                    target = $(href);
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
            splitChildren: true
        }, options);
        self.each(function (i, elem) {
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
            var i;
            var j;
            var sizeByColumn;
            var itemArray = $items.toArray();
            var $col;
            var $item;
            for (i = 0; i < columnSize; i++) {
                sizeByColumn = splited[i];
                $col = $('<ul></ul>');
                BaserElement.addClassTo($col, CLASS_NAME);
                BaserElement.addClassTo($col, CLASS_NAME, '', CLASS_NAME_NTH + columnSize);
                $col.appendTo($container);
                for (j = 0; j < sizeByColumn; j++) {
                    $item = $(itemArray.shift());
                    $item.appendTo($col);
                    $item.data(config.dataKey, i);
                    BaserElement.addClassTo($item, CLASS_NAME, CLASS_NAME_ITEM);
                    BaserElement.addClassTo($item, CLASS_NAME, CLASS_NAME_ITEM, CLASS_NAME_NTH + i);
                }
                $col = null;
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
            stopOnTouch: true
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
     * ### Result
     *
     * <div data-height="400"
         data-theme-id="9760"
         data-slug-hash="pboIt"
         data-default-tab="result"
         data-user="YusukeHirao"
         class='codepen'>
         <pre>
           <code>$(&#39;.sample&#39;).bcYoutube();</code>
         </pre>
         <p>See the Pen <a href='http://codepen.io/YusukeHirao/pen/pboIt/'>bcYoutube</a>
         by Yusuke Hirao (<a href='http://codepen.io/YusukeHirao'>@YusukeHirao</a>)
         on <a href='http://codepen.io'>CodePen</a>.</p>
       </div>
       <script async src="//assets.codepen.io/assets/embed/ei.js"></script>
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
            stopOnTouch: true
        }, options);
        var $doc = $(document);
        var dataKeyOff = config.dataPrefix + 'off';
        var dataKeyOn = config.dataPrefix + 'on';
        self.each(function (i, elem) {
            var nodeName = elem.nodeName.toLowerCase();
            var avail;
            var src;
            var onSrc;
            var $img = $(elem).not(config.ignore);
            if ($img.length && nodeName === 'img' || (nodeName === 'input' && $img.prop('type') === 'image')) {
                avail = true;
                if ($.isFunction(config.filter)) {
                    avail = !!config.filter.call(elem);
                }
                else if (config.filter) {
                    avail = !!$img.filter(config.filter).length;
                }
                if (avail) {
                    src = $img.attr('src');
                    if (src.match(config.pattern)) {
                        onSrc = src.replace(config.pattern, config.replace);
                        $img.data(dataKeyOff, src);
                        $img.data(dataKeyOn, onSrc);
                    }
                }
            }
        });
        self.on('mouseenter', function (e) {
            var $this = $(this);
            var onSrc;
            if (config.stopOnTouch && $this.data('-bc-is-touchstarted')) {
                $this.data('-bc-is-touchstarted', false);
                return true;
            }
            onSrc = $this.data(dataKeyOn);
            $this.prop('src', onSrc);
            return true;
        });
        self.on('mouseleave', function (e) {
            var $this = $(this);
            var offSrc;
            if (config.stopOnTouch && $this.data('-bc-is-touchstarted')) {
                $this.data('-bc-is-touchstarted', false);
                return true;
            }
            offSrc = $this.data(dataKeyOff);
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
            stopOnTouch: true
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
})();
module.exports = JQueryAdapter;

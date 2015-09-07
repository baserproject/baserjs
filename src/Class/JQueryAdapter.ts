import UtilMath = require('./UtilMath');
import Timer = require('./Timer');
import AnimationFrames = require('./AnimationFrames');
import Browser = require('./Browser');
import BaserElement = require('./BaserElement');
import AlignedBoxes = require('./AlignedBoxes');
import Checkbox = require('./Checkbox');
import Radio = require('./Radio');
import Select = require('./Select');
import Scroll = require('./Scroll');
import GoogleMaps = require('./GoogleMaps');
import YouTube = require('./YouTube');
import BreakPointsOption = require('../Interface/BreakPointsOption');
import AlignedBoxCallback = require('../Interface/AlignedBoxCallback');
import CheckableElementOption = require('../Interface/CheckableElementOption');
import SelectOption = require('../Interface/SelectOption');
import ScrollOptions = require('../Interface/ScrollOptions');
import GoogleMapsOption = require('../Interface/GoogleMapsOption');
import YouTubeOption = require('../Interface/YouTubeOption');

class JQueryAdapter {

	static bcScrollTo (selector: any, options?: ScrollOptions): void {
		var scroll: Scroll = new Scroll();
		scroll.to(selector, options);
	}

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
	public bcBackground (options: any): JQuery {
		var self: JQuery = $(this);
		return self.each( (i: number, elem: HTMLElement): void => {
			var config: any = $.extend({
				align: 'center',
				valign: 'center',
				size: 'contain',
				child: '>*:first',
				outer: false
			}, options);

			var $elem: JQuery = $(elem);
			var $child: JQuery = $elem.find(config.child);

			var objectWidth: number = +($elem.data('width') || $child.data('width') || $child.attr('width') || $child.width()) || 400;
			var objectHeight: number = +($elem.data('height') || $child.data('height') || $child.attr('height') || $child.height()) || 300;
			var objectAspectRatio: number = objectWidth / objectHeight;

			var currentCSSPosition: string = $elem.css('position');
			if (currentCSSPosition === 'static' || currentCSSPosition === '' || currentCSSPosition == null) {
				$elem.css('position', 'relative');
			}

			$child.css({
				position: 'absolute',
				top: 0,
				left: 0
			});

			var css: any = {};

			var calc: Function = function (): void {
				var containerWidth: number;
				var containerHeight: number;
				var containerAspectRatio: number;
				var scale: number;

				if (config.outer) {
					containerWidth = $elem.outerWidth();
					containerHeight = $elem.outerHeight();
				} else {
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
							} else {
								scale = containerHeight / objectHeight;
							}
						// コンテナが縦長
						} else {
							// 画像が横長 もしくは 画像のアス比の方が大きい
							if (1 < objectHeight && containerAspectRatio < objectAspectRatio) {
								scale = containerHeight / objectHeight;
							} else {
								scale = containerWidth / objectWidth;
							}
						}
						break;
					case 'cover':
						if (1 < containerAspectRatio) {
							// 画像が横長 もしくは コンテナのアス比の方が大きい
							if (1 < objectWidth && objectAspectRatio < containerAspectRatio) {
								scale = containerHeight / objectHeight;
							} else {
								scale = containerWidth / objectWidth;
							}
						// コンテナが縦長
						} else {
							// 画像が横長 もしくは 画像のアス比の方が大きい
							if (1 < objectHeight && containerAspectRatio < objectAspectRatio) {
								scale = containerWidth / objectWidth;
							} else {
								scale = containerHeight / objectHeight;
							}
						}
						break;
					default:
						return;
				}
				// 画像の幅と高さ
				var newWidth: number = objectWidth * scale;
				var newHeight: number = objectHeight * scale;

				var top: number;
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

				var left: number;
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

				var none: string = 'none';
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
			var animation: AnimationFrames = new AnimationFrames( (): void => {
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
			Timer.wait(300, (): void => {
				animation.stop();
			});

		});
	}

	/**
	 * 要素の高さを揃える
	 *
	 * @version 0.7.0
	 * @since 0.0.15
	 *
	 */
	public bcBoxAlignHeight (columnOrKeyword: string | number | BreakPointsOption<number> = 0, detailTarget?: string, callback?: AlignedBoxCallback): JQuery {

		var self: JQuery = $(this);

		var keyword: string;
		var column: number | BreakPointsOption<number>;
		
		var boxes: AlignedBoxes;

		if (typeof columnOrKeyword === 'string') {

			keyword = columnOrKeyword;

			switch (keyword) {
				case 'destroy': {
					boxes = <AlignedBoxes> self.data(AlignedBoxes.DATA_KEY);
					boxes.destroy();
					break;
				}
			}

		} else {
			
			column = columnOrKeyword;

			var $detailTarget: JQuery;

			// 要素群の高さを揃え、setsに追加
			if (detailTarget) {
				$detailTarget = self.find(detailTarget);
				if ($detailTarget.length) {
					self.each(function () {
						var $split: JQuery = $(this).find(detailTarget);
						new AlignedBoxes($split, column, callback);
					});
				}
			} else {
				new AlignedBoxes(self, column, callback);
			}
		}

		return self;

	}

	// @version 0.9.0
	// @since 0.1.0
	public bcBoxLink (): JQuery {
		return $(self).on('click', function (e: JQueryEventObject): void {
			let $elem: JQuery = $(this);
			let $link: JQuery = $elem.find('a, area').eq(0);
			let href: string = $link.prop('href');
			if ($link.length && href) {
				let isBlank: boolean = $link.prop('target') === '_blank';
				Browser.jumpTo(href, isBlank);
				e.preventDefault();
			}
		});
	}

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
	public bcCheckbox (options: CheckableElementOption): JQuery {
		var self = $(this);
		return self.each( (i: number, elem: HTMLInputElement): void => {
			if (elem.nodeName === 'INPUT') {
				new Checkbox(elem, options);
			} else if ('console' in window) {
				console.warn('TypeError: A Node is not HTMLInputElement');
			}
		});
	}

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
	public bcRadio (options: CheckableElementOption): JQuery {
		var self = $(this);
		return self.each( (i: number, elem: HTMLInputElement): void => {
			if (elem.nodeName === 'INPUT') {
				new Radio(elem, options);
			} else if ('console' in window) {
				console.warn('TypeError: A Node is not HTMLInputElement');
			}
		});
	}

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
	public bcSelect (options: string | SelectOption): JQuery {
		var self = $(this);
		return self.each( (i: number, elem: HTMLSelectElement): void => {
			var $elem: JQuery = $(elem);
			if (typeof options === 'string') {
				switch (options) {
					case 'update': {
						var select: Select = <Select> $elem.data('bc-element');
						select.update();
					}
				}
			} if (elem.nodeName === 'SELECT') {
				new Select(elem, options);
			} else if ('console' in window) {
				console.warn('TypeError: A Node is not HTMLSelectElement');
			}
		});
	}

	/**
	 * 要素内の画像の読み込みが完了してからコールバックを実行する
	 *
	 * @version 0.0.9
	 * @since 0.0.9
	 *
	 * * * *
	 *
	 * ## Sample
	 *
	 * comming soon...
	 *
	 */
	public bcImageLoaded (callback: () => any): JQuery {
		var self = $(this);
		return self.each( (i: number, elem: HTMLElement): void => {
			var $elem: JQuery = $(elem);
			var manifest: JQueryPromise<any>[] = [];
			var $imgs: JQuery = $elem.find('img');
			if ($imgs.length) {
				$imgs.hide();
				$imgs.each(function (): void {
					var loaded: JQueryDeferred<any> = $.Deferred();
					var img: HTMLImageElement = new Image();
					img.onload = function (): any {
						loaded.resolve();
						img.onload = null; // GC
						img = null; // GC
					};
					img.src = this.src;
					manifest.push(loaded.promise());
				});
				$.when.apply($, manifest).done( (): void => {
					$imgs.show();
					callback.call(elem);
				});
			} else {
				callback.call(elem);
			}
		});
	}

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
	public bcKeepAspectRatio (): JQuery {
		var $w: JQuery = $(window);
		var self = $(this);
		self.each( (i: number, elem: HTMLElement): void => {
			var $elem: JQuery = $(elem);
			var baseWidth: number = <number> +$elem.data('width');
			var baseHeight: number = <number> +$elem.data('height');
			var aspectRatio: number = baseWidth / baseHeight;
			$w.on('resize', (): void => {
				var width: number = $elem.width();
				$elem.css({
					width: '100%',
					height: width / aspectRatio
				});
			}).trigger('resize');
		});

		Timer.wait(30, () => {
			$w.trigger('resize');
		});
		return self;
	}


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
	public bcScrollTo (options?: ScrollOptions): JQuery {
		var self = $(this);
		return self.on('click', function (e: JQueryMouseEventObject): void {
			var $this: JQuery = $(this);
			var href: string = $this.attr('href');
			var keyword: string;
			var target: any;
			var scroll: Scroll = new Scroll();
			var absPath: string;
			var currentReferer: string;
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
				} catch (err) { /* void */ }
			}
			return;
		});
	}

	/**
	 * リストを均等に分割する
	 *
	 * @version 0.2.0
	 * @since 0.0.14
	 *
	 */
	public bcSplitList (columnSize: number, options: any): JQuery {
		var self = $(this);
		var CLASS_NAME: string = 'splited-list';
		var CLASS_NAME_NTH: string = 'nth';
		var CLASS_NAME_ITEM: string = 'item';
		var config: any = $.extend({
			dataKey: '-bc-split-list-index',
			splitChildren: true
		}, options);
		self.each( (i: number, elem: HTMLElement): void => {

			var $container: JQuery = $(elem);
			var $list: JQuery = $container.find('>ul');
			var $items: JQuery;
			if (!config.splitChildren) {
				// 直下のliのみ取得
				$items = $list.find('>li').detach();
			} else {
				// 入れ子のliも含めて全て取得
				$items = $list.find('li').detach();
				// 入れ子のulの削除
				$items.find('ul').remove();
			}

			// リストアイテムの総数
			var size: number = $items.length;

			var splited: number[] = UtilMath.split(size, columnSize);

			var i: number;
			var j: number;
			var sizeByColumn: number;

			var itemArray: HTMLElement[] = $items.toArray();
			var $col: JQuery;
			var $item: JQuery;

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
	}

	/**
	 * マウスオーバー時に一瞬透明になるエフェクトをかける
	 *
	 * @version 0.0.14
	 * @since 0.0.14
	 *
	 */
	public bcWink (options: any): JQuery {
		var self = $(this);
		var config: any = $.extend({
			close: 50,
			open: 200,
			opacity: 0.4,
			target: null,
			stopOnTouch: true
		}, options);
		self.each( (i: number, elem: HTMLElement): void => {

			var $this: JQuery = $(elem);
			var $target: JQuery;

			if (config.target) {
				$target = $this.find(config.target);
			} else {
				$target = $this;
			}

			$this.on('mouseenter', (e: JQueryEventObject): boolean => {
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
				$this.on('touchstart', (e: JQueryEventObject): boolean => {
					$this.data('-bc-is-touchstarted', true);
					return true;
				});
			}

		});
		return self;
	}

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
	public bcMaps (options?: GoogleMapsOption): JQuery {
		var self = $(this);
		return self.each( (i: number, elem: HTMLElement): void => {
			var $elem: JQuery = $(elem);
			var data: GoogleMaps = $elem.data(GoogleMaps.className);
			if (data) {
				data.reload(options);
			} else {
				new GoogleMaps(elem, options);
			}
		});
	}

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
	public bcYoutube (options?: YouTubeOption): JQuery {
		var self = $(this);
		return self.each( (i: number, elem: HTMLElement): void => {
			var $elem: JQuery = $(elem);
			var data: YouTube = $elem.data(YouTube.className);
			if (data) {
				data.reload(options);
			} else {
				new YouTube(elem, options);
			}
		});
	}

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
	public bcRollover (options: any): JQuery {
		
		var self = $(this);
		
		var config: any = $.extend({
			pattern: /_off(\.(?:[a-z0-9]{1,6}))$/i,
			replace: '_on$1',
			dataPrefix: '-bc-rollover-',
			ignore: '',
			filter: null,
			stopOnTouch: true
		}, options);

		var $doc: JQuery = $(document);

		var dataKeyOff: string = config.dataPrefix + 'off';
		var dataKeyOn: string = config.dataPrefix + 'on';

		self.each( (i: number, elem: HTMLElement): void => {

			var nodeName: string = elem.nodeName.toLowerCase();

			var avail: boolean;
			var src: string;
			var onSrc: string;
			var $img: JQuery = $(elem).not(config.ignore);

			if ($img.length && nodeName === 'img' || (nodeName === 'input' && $img.prop('type') === 'image')) {

				avail = true;

				if ($.isFunction(config.filter)) {
					avail = !!config.filter.call(elem);
				} else if (config.filter) {
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

		self.on('mouseenter', function (e: JQueryEventObject): boolean {
			var $this: JQuery = $(this);
			var onSrc: string;
			if (config.stopOnTouch && $this.data('-bc-is-touchstarted')) {
				$this.data('-bc-is-touchstarted', false);
				return true;
			}
			onSrc = <string> $this.data(dataKeyOn);
			$this.prop('src', onSrc);
			return true;
		});
		self.on('mouseleave', function (e: JQueryEventObject): boolean {
			var $this: JQuery = $(this);
			var offSrc: string;
			if (config.stopOnTouch && $this.data('-bc-is-touchstarted')) {
				$this.data('-bc-is-touchstarted', false);
				return true;
			}
			offSrc = <string> $this.data(dataKeyOff);
			$this.prop('src', offSrc);
			return true;
		});

		if (config.stopOnTouch) {
			self.on('touchstart', function (e: JQueryEventObject): boolean {
				var $this: JQuery = $(this);
				$this.data('-bc-is-touchstarted', true);
				return true;
			});
		}

		return self;
	}

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
	public bcShy (options: any): JQuery {
		var self = $(this);
		var config: any = $.extend({
			close: 300,
			open: 300,
			opacity: 0.6,
			target: null,
			stopOnTouch: true
		}, options);
		self.each( (i: number, elem: HTMLElement): void => {

			var $this: JQuery = $(elem);
			var $target: JQuery;

			if (config.target) {
				$target = $this.find(config.target);
			} else {
				$target = $this;
			}

			$this.on('mouseenter', (e: JQueryEventObject): boolean => {
				if (config.stopOnTouch && $this.data('-bc-is-touchstarted')) {
					$this.data('-bc-is-touchstarted', false);
					return true;
				}
				$target
					.stop(true, false)
					.fadeTo(config.close, config.opacity);
				return true;
			});
			$this.on('mouseleave', (e: JQueryEventObject): boolean => {
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
				$this.on('touchstart', (e: JQueryEventObject): boolean => {
					$this.data('-bc-is-touchstarted', true);
					return true;
				});
			}

		});
		return self;
	};

}

export = JQueryAdapter;
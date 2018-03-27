import UtilMath = require('./UtilMath');
import Timer = require('./Timer');
import Browser = require('./Browser');
import BaserElement = require('./BaserElement');
import AlignedBoxes = require('./AlignedBoxes');
import BackgroundContainer = require('./BackgroundContainer');
import Checkbox = require('./Checkbox');
import Radio = require('./Radio');
import Select = require('./Select');
import Scroll = require('./Scroll');
import GoogleMaps = require('./GoogleMaps');
import YouTube = require('./YouTube');
import BreakPointsOption = require('../Interface/BreakPointsOption');
import BackgroundContainerOption = require('../Interface/BackgroundContainerOption');
import AlignedBoxCallback = require('../Interface/AlignedBoxCallback');
import CheckableElementOption = require('../Interface/CheckableElementOption');
import SelectOption = require('../Interface/SelectOption');
import ScrollOptions = require('../Interface/ScrollOptions');
import GoogleMapsOption = require('../Interface/GoogleMapsOption');
import YouTubeOption = require('../Interface/YouTubeOption');

class JQueryAdapter {

	public static bcScrollTo (selector: any, options?: ScrollOptions): void {
		const scroll: Scroll = new Scroll();
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
	public bcBackground (options: BackgroundContainerOption): JQuery {

		const self: JQuery = $(this);
		return self.each( (i: number, elem: HTMLElement): void => {
			/* tslint:disable */
			new BackgroundContainer(elem, options);
			/* tslint:enable */
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

		const self: JQuery = $(this);
		if (typeof columnOrKeyword === 'string') {
			const keyword: string = columnOrKeyword;
			switch (keyword) {
				case 'destroy': {
					const boxes: AlignedBoxes = <AlignedBoxes> self.data(AlignedBoxes.DATA_KEY);
					boxes.destroy();
					break;
				}
				default: {
					// void
				}
			}

		} else {
			const column: number | BreakPointsOption<number> = columnOrKeyword;
			// 要素群の高さを揃え、setsに追加
			if (detailTarget) {
				const $detailTarget: JQuery = self.find(detailTarget);
				if ($detailTarget.length) {
					self.each(function () {
						const $split: JQuery = $(this).find(detailTarget);
						/* tslint:disable */
						new AlignedBoxes($split, column, callback);
						/* tslint:enable */
					});
				}
			} else {
				/* tslint:disable */
				new AlignedBoxes(self, column, callback);
				/* tslint:enable */
			}
		}

		return self;

	}

	// @version 0.12.1
	// @since 0.1.0
	public bcBoxLink (): JQuery {
		return $(this).on('click', function (e: JQueryEventObject): void {
			const $elem: JQuery = $(this);
			const $link: JQuery = $elem.find('a, area').eq(0);
			const href: string = $link.prop('href');
			if ($link.length && href) {
				const isBlank: boolean = $link.prop('target') === '_blank';
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
		const self: JQuery = $(this);
		return self.each( (i: number, elem: HTMLInputElement): void => {
			if (elem.nodeName === 'INPUT') {
				/* tslint:disable */
				new Checkbox(elem, options);
				/* tslint:enable */
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
		const self: JQuery = $(this);
		return self.each( (i: number, elem: HTMLInputElement): void => {
			if (elem.nodeName === 'INPUT') {
				/* tslint:disable */
				new Radio(elem, options);
				/* tslint:enable */
			} else if ('console' in window) {
				console.warn('TypeError: A Node is not HTMLInputElement');
			}
		});
	}

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
	public bcSelect (options: string | SelectOption): JQuery {
		const self: JQuery = $(this);
		return self.each( (i: number, elem: HTMLSelectElement): void => {
			const $elem: JQuery = $(elem);
			if (typeof options === 'string') {
				switch (options) {
					case 'update': {
						const select: Select = <Select> $elem.data('bc-element');
						select.update();
						break;
					}
					default: {
						// void
					}
				}
			} else if (elem.nodeName === 'SELECT') {
				/* tslint:disable */
				new Select(elem, options);
				/* tslint:enable */
			} else if ('console' in window) {
				console.warn('TypeError: A Node is not HTMLSelectElement');
			}
		});
	}

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
	public bcImageLoaded (success: () => any, error?: (e: Event) => any): JQuery {
		const self: JQuery = $(this);
		return self.each( (i: number, elem: HTMLElement): void => {
			const $elem: JQuery = $(elem);
			const manifest: JQueryPromise<any>[] = [];
			const $imgs: JQuery = $elem.filter('img').add($elem.find('img'));
			if ($imgs.length) {
				$imgs.each(function (): void {
					const loaded: JQueryDeferred<any> = $.Deferred();
					let img: HTMLImageElement = new Image();
					img.onload = function (): any {
						loaded.resolve();
						img.onload = null; // GC
						img = null; // GC
					};
					img.onabort = img.onerror = function (e: Event): any {
						loaded.reject(e);
						img.onload = null; // GC
						img = null; // GC
					};
					img.src = this.src;
					manifest.push(loaded.promise());
				});
				$.when.apply($, manifest).done( (): void => {
					success.call(elem);
				}).fail( (e: Event): void => {
					if (error) {
						error.call(elem, e);
					}
				});
			} else {
				success.call(elem);
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
		const $w: JQuery = $(window);
		const self: JQuery = $(this);
		self.each( (i: number, elem: HTMLElement): void => {
			const $elem: JQuery = $(elem);
			const baseWidth: number = <number> +$elem.data('width');
			const baseHeight: number = <number> +$elem.data('height');
			const aspectRatio: number = baseWidth / baseHeight;
			$w.on('resize', (): void => {
				const width: number = $elem.width();
				$elem.css({
					width: '100%',
					height: width / aspectRatio,
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
		const self: JQuery = $(this);
		return self.on('click', function (e: JQueryMouseEventObject): void {
			const $this: JQuery = $(this);
			let href: string = $this.attr('href');
			const scroll: Scroll = new Scroll();
			if (href) {
				// キーワードを一番に優先する
				if (options && $.isPlainObject(options.keywords)) {
					for (const keyword in options.keywords) {
						if (options.keywords.hasOwnProperty(keyword)) {
							const target: string = options.keywords[keyword];
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
				const absPath: string = $this.prop('href');
				const currentReferer: string = location.protocol + '//' + location.host + location.pathname + location.search;
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
					const target: JQuery = $(href);
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
		const self: JQuery = $(this);
		const CLASS_NAME: string = 'splited-list';
		const CLASS_NAME_NTH: string = 'nth';
		const CLASS_NAME_ITEM: string = 'item';
		const config: any = $.extend(
			{
				dataKey: '-bc-split-list-index',
				splitChildren: true,
			},
			options,
		);
		self.each( (index: number, elem: HTMLElement): void => {

			const $container: JQuery = $(elem);
			const $list: JQuery = $container.find('>ul');
			let $items: JQuery;
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
			const size: number = $items.length;
			const splited: number[] = UtilMath.split(size, columnSize);
			const itemArray: HTMLElement[] = $items.toArray();

			for (let i: number = 0; i < columnSize; i++) {
				const sizeByColumn: number = splited[i];
				const $col: JQuery = $('<ul></ul>');
				BaserElement.addClassTo($col, CLASS_NAME);
				BaserElement.addClassTo($col, CLASS_NAME, '', CLASS_NAME_NTH + columnSize);
				$col.appendTo($container);
				for (let j: number = 0; j < sizeByColumn; j++) {
					const $item: JQuery = $(itemArray.shift());
					$item.appendTo($col);
					$item.data(config.dataKey, i);
					BaserElement.addClassTo($item, CLASS_NAME, CLASS_NAME_ITEM);
					BaserElement.addClassTo($item, CLASS_NAME, CLASS_NAME_ITEM, CLASS_NAME_NTH + i);
				}
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
		const self: JQuery = $(this);
		const config: any = $.extend(
			{
				close: 50,
				open: 200,
				opacity: 0.4,
				target: null,
				stopOnTouch: true,
			},
			options,
		);
		self.each( (i: number, elem: HTMLElement): void => {

			const $this: JQuery = $(elem);

			let $target: JQuery;
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
		const self: JQuery = $(this);
		return self.each( (i: number, elem: HTMLElement): void => {
			const $elem: JQuery = $(elem);
			const data: GoogleMaps = $elem.data(GoogleMaps.className);
			if (data) {
				data.reload(options);
			} else {
				/* tslint:disable */
				new GoogleMaps(elem, options);
				/* tslint:enable */
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
	 */
	public bcYoutube (options?: YouTubeOption): JQuery {
		const self: JQuery = $(this);
		return self.each( (i: number, elem: HTMLElement): void => {
			const $elem: JQuery = $(elem);
			const data: YouTube = $elem.data(YouTube.className);
			if (data) {
				data.reload(options);
			} else {
				/* tslint:disable */
				new YouTube(elem, options);
				/* tslint:enable */
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

		const self: JQuery = $(this);

		const config: any = $.extend(
			{
				pattern: /_off(\.(?:[a-z0-9]{1,6}))$/i,
				replace: '_on$1',
				dataPrefix: '-bc-rollover-',
				ignore: '',
				filter: null,
				stopOnTouch: true,
			},
			options,
		);

		const dataKeyOff: string = config.dataPrefix + 'off';
		const dataKeyOn: string = config.dataPrefix + 'on';

		self.each( (i: number, elem: HTMLElement): void => {

			const nodeName: string = elem.nodeName.toLowerCase();
			const $img: JQuery = $(elem).not(config.ignore);

			if ($img.length && nodeName === 'img' || (nodeName === 'input' && $img.prop('type') === 'image')) {

				let avail: boolean = true;
				if ($.isFunction(config.filter)) {
					avail = !!config.filter.call(elem);
				} else if (config.filter) {
					avail = !!$img.filter(config.filter).length;
				}

				if (avail) {
					const src: string = $img.attr('src');
					if (src.match(config.pattern)) {
						const onSrc: string = src.replace(config.pattern, config.replace);
						$img.data(dataKeyOff, src);
						$img.data(dataKeyOn, onSrc);
					}
				}

			}

		});

		self.on('mouseenter', function (e: JQueryEventObject): boolean {
			const $this: JQuery = $(this);
			if (config.stopOnTouch && $this.data('-bc-is-touchstarted')) {
				$this.data('-bc-is-touchstarted', false);
				return true;
			}
			const onSrc: string = <string> $this.data(dataKeyOn);
			$this.prop('src', onSrc);
			return true;
		});
		self.on('mouseleave', function (e: JQueryEventObject): boolean {
			const $this: JQuery = $(this);
			if (config.stopOnTouch && $this.data('-bc-is-touchstarted')) {
				$this.data('-bc-is-touchstarted', false);
				return true;
			}
			const offSrc: string = <string> $this.data(dataKeyOff);
			$this.prop('src', offSrc);
			return true;
		});

		if (config.stopOnTouch) {
			self.on('touchstart', function (e: JQueryEventObject): boolean {
				const $this: JQuery = $(this);
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
		const self: JQuery = $(this);
		const config: any = $.extend(
			{
				close: 300,
				open: 300,
				opacity: 0.6,
				target: null,
				stopOnTouch: true,
			},
			options,
		);
		self.each( (i: number, elem: HTMLElement): void => {

			const $this: JQuery = $(elem);

			let $target: JQuery;
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
	}

}

export = JQueryAdapter;

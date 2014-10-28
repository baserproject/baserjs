$.fn.bcRadio = function (options: baser.ui.element.CheckableElementOption): JQuery {
	return this.each( (i: number, elem: HTMLElement): void => {
		var $elem: JQuery = $(elem);
		baser.ui.element.Form.radio($elem, options);
	});
};

$.fn.bcCheckbox = function (options: baser.ui.element.CheckableElementOption): JQuery {
	return this.each( (i: number, elem: HTMLElement): void => {
		var $elem: JQuery = $(elem);
		baser.ui.element.Form.checkbox($elem, options);
	});
};

$.fn.bcSelect = function (options: baser.ui.element.FormElementOption): JQuery {
	return this.each( (i: number, elem: HTMLElement): void => {
		var $elem: JQuery = $(elem);
		baser.ui.element.Form.select($elem, options);
	});
};

$.fn.bcBoxAlignHeight = function (): JQuery {
	baser.ui.element.Box.alignHeight(this);
	return this;
};

$.fn.bcMaps = function (): JQuery {
	return this.each( (i: number, elem: HTMLElement): void => {
		var $elem: JQuery = $(elem);
		var data: baser.ui.element.Map = $elem.data(baser.ui.element.Map.className);
		if (data) {
			data.reload();
		} else {
			new baser.ui.element.Map($elem);
		}
	});
};

$.fn.bcYoutube = function (): JQuery {
	return this.each( (i: number, elem: HTMLElement): void => {
		var $elem: JQuery = $(elem);
		var data: baser.ui.element.Youtube = $elem.data(baser.ui.element.Youtube.className);
		if (data) {
			data.reload();
		} else {
			new baser.ui.element.Youtube($elem);
		}
	});
};

// クラスAPI化予定
// since 0.0.7
$.fn.bcBackground = function (options: any): JQuery {
	return this.each( (i: number, elem: HTMLElement): void => {
		var config: any = $.extend({
			align: 'center',
			valign: 'center',
			size: 'contain',
			child: '>*:first'
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

		var exec: Function = function (): void {
			var containerWidth: number = $elem.width();
			var containerHeight: number = $elem.height();
			var containerAspectRatio: number = containerWidth / containerHeight;

			var scale: number;
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
			switch (config.align) {
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
			switch (config.valign) {
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

			$child.css({
				width: newWidth,
				height: newHeight,
				top: top,
				left: left
			});
		};
		exec();

		// リサイズ時に動画サイズを変更
		$(window).on('resize', function () {
			exec();
		});

	});
};

// since 0.0.8
$.fn.bcScrollTo = function (options?: baser.ui.ScrollOptions): JQuery {
	return this.on('click', function (e: JQueryMouseEventObject): void {
		var $this: JQuery = $(this);
		var href: string = $this.attr('href');
		var keyword: string;
		var target: any;
		var scroll: baser.ui.Scroll = new baser.ui.Scroll();
		var absPath: string;
		var currentReferer: string;
		if (href) {
			// キーワードを一番に優先する
			if (options && $.isPlainObject(options.keywords)) {
				for (keyword in options.keywords) {
					if (options.keywords.hasOwnProperty(keyword)) {
						target = options.keywords[keyword];
						if (keyword === href) {
							scroll.to(target, this.options);
							e.preventDefault();
							console.log(href);
							return;
						}
					}
				}
			}
			// 「/pathname/#hash」のリンクパターンの場合
			//「/pathname/」が現在のURLだった場合「#hash」に飛ばすようにする
			absPath = $this.prop('href');
			currentReferer = location.protocol + '//' + location.host + location.pathname;
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
					scroll.to(target, this.options);
					e.preventDefault();
					return;
				}
			} catch (err) {}
		}
		e.preventDefault();
		return;
	});
};

interface JQueryStatic {
	// since 0.0.8
	bcScroll: baser.ui.Scroll;
	// since 0.0.8
	bcScrollTo(selector: string, options?: baser.ui.ScrollOptions): baser.ui.Scroll;
	bcScrollTo(selector: HTMLElement, options?: baser.ui.ScrollOptions): baser.ui.Scroll;
	bcScrollTo(selector: JQuery, options?: baser.ui.ScrollOptions): baser.ui.Scroll;
	bcScrollTo(selector: number, options?: baser.ui.ScrollOptions): baser.ui.Scroll;
}

// since 0.0.8
$.bcScroll = new baser.ui.Scroll();
// since 0.0.8
$.bcScrollTo = $.bcScroll.to;

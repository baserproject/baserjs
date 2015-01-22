module baser {

	/**
	 * 自信の要素を基準に、指定の子要素を背景のように扱う
	 *
	 * CSSの`background-size`の`contain`と`cover`の振る舞いに対応
	 *
	 * 基準も縦横のセンター・上下・左右に指定可能
	 *
	 * @version 0.0.10
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
	function bcBackground (options: any): JQuery {
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

			var css: any = {};

			var calc: Function = function (): void {
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

				css = {
					width: newWidth,
					height: newHeight,
					top: top,
					left: left
				};
			};
			calc();

			// 計算結果をアニメーションフレーム毎にDOMに反映
			var animation: baser.ui.AnimationFrames = new baser.ui.AnimationFrames( (): void => {
				$child.css(css);
			});

			baser.ui.Browser.browser.on('resizestart', function () {
				animation.start();
			}).on('resize', function () {
				// リサイズ時にサイズを計算
				calc();
			}).on('resizeend', function () {
				animation.stop();
			});

			animation.start();
			baser.ui.Timer.wait(300, (): void => {
				animation.stop();
			});

		});
	};

	$.fn.bcBackground = bcBackground;

}

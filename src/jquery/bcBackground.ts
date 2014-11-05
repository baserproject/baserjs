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

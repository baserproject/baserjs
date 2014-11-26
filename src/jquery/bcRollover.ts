module baser {

	/**
	 * マウスオーバー時に画像を切り替える
	 *
	 * 【使用非推奨】できるかぎり CSS の `:hover` と `background-image` を使用するべきです。
	 *
	 * @version 0.0.15
	 * @since 0.0.15
	 *
	 */
	var bcRollover = function (options: any): JQuery {
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

		this.each( (i: number, elem: HTMLElement): void => {

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

		this.on('mouseenter', function (e: JQueryEventObject): boolean {
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
		this.on('mouseleave', function (e: JQueryEventObject): boolean {
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
			this.on('touchstart', function (e: JQueryEventObject): boolean {
				var $this: JQuery = $(this);
				$this.data('-bc-is-touchstarted', true);
				return true;
			});
		}

		return this;
	};

	// jQueryのインスタンスメソッドとしてprototypeに登録
	$.fn.bcRollover = bcRollover;

}

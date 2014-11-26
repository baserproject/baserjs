module baser {

	/**
	 * マウスオーバー時に半透明になるエフェクトをかける
	 *
	 * 【使用非推奨】できるかぎり CSS の `:hover` と `opacity`、そして `transition` を使用するべきです。
	 *
	 * @version 0.0.15
	 * @since 0.0.15
	 *
	 */
	var bcShy = function (options: any): JQuery {
		var config: any = $.extend({
			close: 300,
			open: 300,
			opacity: 0.6,
			target: null,
			stopOnTouch: true
		}, options);
		this.each( (i: number, elem: HTMLElement): void => {

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
		return this;
	};

	// jQueryのインスタンスメソッドとしてprototypeに登録
	$.fn.bcShy = bcShy;

}

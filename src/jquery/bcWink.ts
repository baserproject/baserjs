module baser {

	/**
	 * マウスオーバー時に一瞬透明になるエフェクトをかける
	 *
	 * @version 0.0.14
	 * @since 0.0.14
	 *
	 */
	var bcWink = function (options: any): JQuery {
		var config: any = $.extend({
			close: 50,
			open: 200,
			opacity: 0.4,
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
		return this;
	};

	// jQueryのインスタンスメソッドとしてprototypeに登録
	$.fn.bcWink = bcWink;

}

module baser {

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
	function bcKeepAspectRatio (): JQuery {
		var $w: JQuery = $(window);

		this.each( (i: number, elem: HTMLElement): void => {
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

		baser.ui.Timer.wait(30, () => {
			$w.trigger('resize');
		});
		return this;
	}

	$.fn.bcKeepAspectRatio = bcKeepAspectRatio;

}

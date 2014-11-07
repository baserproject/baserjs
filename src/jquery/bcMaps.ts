module baser {

	/**
	 * マップを埋め込む
	 *
	 * 現在の対応はGoogle Mapsのみ
	 *
	 * @version 0.0.8
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
	function bcMaps (options?: baser.ui.element.MapOption): JQuery {
		return this.each( (i: number, elem: HTMLElement): void => {
			var $elem: JQuery = $(elem);
			var data: baser.ui.element.Map = $elem.data(baser.ui.element.Map.className);
			if (data) {
				data.reload();
			} else {
				new baser.ui.element.Map($elem, options);
			}
		});
	}

	$.fn.bcMaps = bcMaps;

}
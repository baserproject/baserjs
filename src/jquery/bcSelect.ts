module baser {

	/**
	 * WAI-ARIAに対応した装飾可能な汎用要素でラップしたセレクトボックスに変更する
	 *
	 * @version 0.7.0
	 * @since 0.0.1
	 *
	 * * * *
	 *
	 * ## Sample
	 *
	 * comming soon...
	 *
	 */
	function bcSelect (options: baser.ui.element.FormElementOption): JQuery {
		return this.each( (i: number, elem: HTMLElement): void => {
			var $elem: JQuery = $(elem);
			new baser.ui.element.Select($elem, options);
		});
	}

	$.fn.bcSelect = bcSelect;

}

module baser {

	/**
	 * WAI-ARIAに対応した装飾可能な汎用要素でラップしたチェックボックスに変更する
	 *
	 * @version 0.0.1
	 * @since 0.0.1
	 *
	 * * * *
	 *
	 * ## Sample
	 *
	 * comming soon...
	 *
	 */
	function bcCheckbox (options: baser.ui.element.CheckableElementOption): JQuery {
		return this.each( (i: number, elem: HTMLElement): void => {
			var $elem: JQuery = $(elem);
			baser.ui.element.Form.checkbox($elem, options);
		});
	}

	$.fn.bcCheckbox = bcCheckbox;

}

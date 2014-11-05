$.fn.bcCheckbox = function (options: baser.ui.element.CheckableElementOption): JQuery {
	return this.each( (i: number, elem: HTMLElement): void => {
		var $elem: JQuery = $(elem);
		baser.ui.element.Form.checkbox($elem, options);
	});
};
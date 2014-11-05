$.fn.bcYoutube = function (): JQuery {
	return this.each( (i: number, elem: HTMLElement): void => {
		var $elem: JQuery = $(elem);
		var data: baser.ui.element.Youtube = $elem.data(baser.ui.element.Youtube.className);
		if (data) {
			data.reload();
		} else {
			new baser.ui.element.Youtube($elem);
		}
	});
};
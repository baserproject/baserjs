$.fn.bcMaps = function (options?: baser.ui.element.MapOption): JQuery {
	return this.each( (i: number, elem: HTMLElement): void => {
		var $elem: JQuery = $(elem);
		var data: baser.ui.element.Map = $elem.data(baser.ui.element.Map.className);
		if (data) {
			data.reload();
		} else {
			new baser.ui.element.Map($elem, options);
		}
	});
};
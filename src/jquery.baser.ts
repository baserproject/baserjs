$.fn.bcRadio = function (options: baser.ui.element.CheckableElementOption): JQuery {

	return this.each( (i: number, elem: HTMLElement): void => {

		var $elem: JQuery = $(elem);

		baser.ui.element.Form.radio($elem, options);

	});

};

$.fn.bcCheckbox = function (options: baser.ui.element.CheckableElementOption): JQuery {

	return this.each( (i: number, elem: HTMLElement): void => {

		var $elem: JQuery = $(elem);

		baser.ui.element.Form.checkbox($elem, options);

	});

};

$.fn.bcSelect = function (options: baser.ui.element.FormElementOption): JQuery {

	return this.each( (i: number, elem: HTMLElement): void => {

		var $elem: JQuery = $(elem);

		baser.ui.element.Form.select($elem, options);

	});

};

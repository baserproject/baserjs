$.fn.bcBoxLink = function (): JQuery {
	this.on('click', function (e: MouseEvent): void {
		var $elem: JQuery = $(this);
		var $link: JQuery = $elem.find('a, area').eq(0);
		var href:string = $link.prop('href');
		var isBlank: boolean = $link.prop('target') === '_blank';
		baser.ui.Browser.jumpTo(href, isBlank);
		e.preventDefault();
	});
	return this;
};
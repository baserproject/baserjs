// @version 0.5.0
// @since 0.1.0
$.fn.bcBoxLink = function (): JQuery {
	this.on('click', function (e: MouseEvent): void {
		var $elem: JQuery = $(this);
		var $link: JQuery = $elem.find('a, area').eq(0);
		var href: string = $link.prop('href');
		var isBlank: boolean;
		if ($link.length && href) {
			isBlank = $link.prop('target') === '_blank';
			baser.ui.Browser.jumpTo(href, isBlank);
			e.preventDefault();
		}
	});
	return this;
};

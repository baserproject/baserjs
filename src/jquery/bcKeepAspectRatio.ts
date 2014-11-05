// クラスAPI化予定
// since 0.0.9
$.fn.bcKeepAspectRatio = function (): JQuery {
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
};
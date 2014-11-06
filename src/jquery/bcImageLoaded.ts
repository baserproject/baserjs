module baser {

	/**
	 * 要素内の画像の読み込みが完了してからコールバックを実行する
	 *
	 * @version 0.0.9
	 * @since 0.0.9
	 *
	 * * * *
	 *
	 * ## Sample
	 *
	 * comming soon...
	 *
	 */
	function bcImageLoaded (callback: () => any): JQuery {
		return this.each( (i: number, elem: HTMLElement): void => {
			var $elem: JQuery = $(elem);
			var manifest: JQueryPromise<any>[] = [];
			var $imgs: JQuery = $elem.find('img');
			if ($imgs.length) {
				$imgs.hide();
				$imgs.each(function (): void {
					var loaded: JQueryDeferred<any> = $.Deferred();
					var img: HTMLImageElement = new Image();
					img.onload = function (): any {
						loaded.resolve();
						img.onload = null; // GC
						img = null; // GC
					};
					img.src = this.src;
					manifest.push(loaded.promise());
				});
				$.when.apply($, manifest).done( (): void => {
					$imgs.show();
					callback.call(elem);
				});
			} else {
				callback.call(elem);
			}
		});
	}

	$.fn.bcImageLoaded = bcImageLoaded;

}
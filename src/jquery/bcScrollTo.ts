module baser {

	/**
	 * リンク要素からのアンカーまでスムーズにスクロールをさせる
	 *
	 * @version 0.1.0
	 * @since 0.0.8
	 *
	 * * * *
	 *
	 * ## Sample
	 *
	 * comming soon...
	 *
	 */
	function bcScrollTo (options?: baser.ui.ScrollOptions): JQuery {
		return this.on('click', function (e: JQueryMouseEventObject): void {
			var $this: JQuery = $(this);
			var href: string = $this.attr('href');
			var keyword: string;
			var target: any;
			var scroll: baser.ui.Scroll = new baser.ui.Scroll();
			var absPath: string;
			var currentReferer: string;
			if (href) {
				// キーワードを一番に優先する
				if (options && $.isPlainObject(options.keywords)) {
					for (keyword in options.keywords) {
						if (options.keywords.hasOwnProperty(keyword)) {
							target = options.keywords[keyword];
							if (keyword === href) {
								scroll.to(target, options);
								e.preventDefault();
								return;
							}
						}
					}
				}
				// 「/pathname/#hash」のリンクパターンの場合
				//「/pathname/」が現在のURLだった場合「#hash」に飛ばすようにする
				absPath = $this.prop('href');
				currentReferer = location.protocol + '//' + location.host + location.pathname + location.search;
				href = absPath.replace(currentReferer, '');
				// #top はHTML5ではページトップを意味する
				if (href === '#top') {
					scroll.to(0, options);
					e.preventDefault();
					return;
				}
				// セレクタとして要素が存在する場合はその要素に移動
				// 「/」で始まるなどセレクターとして不正な場合、例外を投げることがあるので無視する
				try {
					target = $(href);
					if (target.length) {
						scroll.to(target, options);
						e.preventDefault();
						return;
					}
				} catch (err) { /* void */ }
			}
			return;
		});
	}

	$.fn.bcScrollTo = bcScrollTo;

}

/**
 * 指定の要素、もしくはy座標までスムーズにスクロールをさせる
 *
 * @version 0.0.8
 * @since 0.0.8
 *
 * * * *
 *
 * ## Sample
 *
 * comming soon...
 *
 */
interface JQueryStatic {
	bcScrollTo(selector: string, options?: baser.ui.ScrollOptions): void;
	bcScrollTo(selector: HTMLElement, options?: baser.ui.ScrollOptions): void;
	bcScrollTo(selector: JQuery, options?: baser.ui.ScrollOptions): void;
	bcScrollTo(selector: number, options?: baser.ui.ScrollOptions): void;
}
$.bcScrollTo = function (selector: any, options?: baser.ui.ScrollOptions): void {
	var scroll: baser.ui.Scroll = new baser.ui.Scroll();
	scroll.to(selector, options);
};

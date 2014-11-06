module baser {

	/**
	 * YouTubeを埋め込む
	 *
	 * @version 0.0.8
	 * @since 0.0.8
	 *
	 * * * *
	 *
	 * ## Sample
	 *
	 * ### Target HTML
	 *
	 * ```html
	 * <div class="sample" data-id="rb0zOstIiyU" data-width="3840" data-height="2160"></div>
	 * ```
	 *
	 * ### Execute
	 *
	 * ```js
	 * $('.sample').bcYoutube();
	 * ```
	 *
	 * ### Result
	 *
	 * <div data-height="400" data-theme-id="9760" data-slug-hash="pboIt" data-default-tab="result" data-user="YusukeHirao" class='codepen'><pre><code>$(&#39;.sample&#39;).bcYoutube();</code></pre>
	<p>See the Pen <a href='http://codepen.io/YusukeHirao/pen/pboIt/'>bcYoutube</a> by Yusuke Hirao (<a href='http://codepen.io/YusukeHirao'>@YusukeHirao</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
	</div><script async src="//assets.codepen.io/assets/embed/ei.js"></script>
	 *
	 */
	function bcYoutube (): JQuery {
		return this.each( (i: number, elem: HTMLElement): void => {
			var $elem: JQuery = $(elem);
			var data: baser.ui.element.Youtube = $elem.data(baser.ui.element.Youtube.className);
			if (data) {
				data.reload();
			} else {
				new baser.ui.element.Youtube($elem);
			}
		});
	}

	// jQueryのインスタンスメソッドとしてprototypeに登録
	$.fn.bcYoutube = bcYoutube;

}

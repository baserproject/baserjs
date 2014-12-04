module baser {

	/**
	 * 要素の高さを揃える
	 *
	 * TODO: 計算ロジックとDOMアクセスのロジックを分ける
	 *
	 * @version 0.0.15
	 * @since 0.0.15
	 *
	 */
	function bcBoxAlignHeight (column: number, detailTarget: string, callback: Function, breakPoint: number = 0): JQuery {

		baser.ui.Box.init();

		var $detailTarget: JQuery;
		var settings = baser.ui.Box.settings;

		// 要素群の高さを揃え、setsに追加
		if (detailTarget) {
			$detailTarget = this.find(detailTarget);
			if ($detailTarget.length) {
				this.each(function () {
					var $split: JQuery = $(this).find(detailTarget);
					baser.ui.Box.alignment($split, column, callback, breakPoint);
					settings.sets.push($split);
					settings.columns.push(column);
					settings.callbacks.push(callback);
					settings.breakPoints.push(breakPoint);
				});
			}
		} else {
			baser.ui.Box.alignment(this, column, callback, breakPoint);
			settings.sets.push(this);
			settings.columns.push(column);
			settings.callbacks.push(callback);
			settings.breakPoints.push(breakPoint);
		}

		return this;

	}

	// jQueryのインスタンスメソッドとしてprototypeに登録
	$.fn.bcBoxAlignHeight = bcBoxAlignHeight;

}
